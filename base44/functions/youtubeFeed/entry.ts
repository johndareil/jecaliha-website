import { cacheGet, cacheSet } from "../../shared/ttlCache.ts";
import { fetchProjects } from "../../shared/gallery.ts";

// Server-side YouTube feed for the company channel only (no API key, no search,
// no hardcoded video ids). Primary source is the channel's Atom feed, with
// RSS2JSON on the exact same feed as fallback. Valid results are cached ~5min.

const CHANNEL_ID = "UCfds56pbBe2gJOhhpEPcAJg";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const CACHE_KEY = "youtube-feed";
const CACHE_TTL = 5 * 60 * 1000;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36";
const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

type Video = { id: string; title: string; published: string };

function decodeEntities(value: string): string {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function parseAtom(xml: string): Video[] {
  const videos: Video[] = [];
  const blocks = xml.split("<entry").slice(1);
  for (const block of blocks) {
    const end = block.indexOf("</entry>");
    const body = end === -1 ? block : block.slice(0, end);
    const id = /<yt:videoId>([^<]+)<\/yt:videoId>/.exec(body)?.[1] ?? "";
    const channelId = /<yt:channelId>([^<]+)<\/yt:channelId>/.exec(body)?.[1] ?? "";
    if (!VIDEO_ID.test(id)) continue;
    // Guard against any feed that is not this channel.
    if (channelId && channelId !== CHANNEL_ID) continue;
    const title = decodeEntities(/<title>([\s\S]*?)<\/title>/.exec(body)?.[1] ?? "");
    const published = /<published>([^<]+)<\/published>/.exec(body)?.[1] ?? "";
    videos.push({ id, title, published });
  }
  return videos;
}

function parseRss2Json(payload: any): Video[] {
  const items = Array.isArray(payload?.items) ? payload.items : [];
  const videos: Video[] = [];
  for (const item of items) {
    const link = String(item?.link ?? "");
    const guid = String(item?.guid ?? "");
    const id =
      /[?&]v=([A-Za-z0-9_-]{11})/.exec(link)?.[1] ??
      /yt:video:([A-Za-z0-9_-]{11})/.exec(guid)?.[1] ??
      "";
    if (!VIDEO_ID.test(id)) continue;
    const raw = item?.pubDate ? new Date(item.pubDate) : null;
    const published = raw && !Number.isNaN(raw.getTime()) ? raw.toISOString() : "";
    videos.push({ id, title: decodeEntities(String(item?.title ?? "")), published });
  }
  return videos;
}

function normalize(videos: Video[]): Video[] {
  const seen = new Set<string>();
  const out: Video[] = [];
  for (const video of videos) {
    if (!VIDEO_ID.test(video.id) || seen.has(video.id)) continue;
    seen.add(video.id);
    out.push(video);
  }
  // Newest → oldest.
  out.sort((a, b) => (b.published || "").localeCompare(a.published || ""));
  return out;
}

export default async function (req: Request): Promise<Response> {
  try {
    const cached = cacheGet<Video[]>(CACHE_KEY);
    if (cached && cached.length) {
      return Response.json({ videos: cached, source: "cache", count: cached.length });
    }

    const problems: string[] = [];

    // Primary: the channel's own Atom feed, parsed server-side.
    try {
      const res = await fetch(FEED_URL, {
        headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" },
        signal: AbortSignal.timeout(10000),
      });
      if (res.ok) {
        const videos = normalize(parseAtom(await res.text()));
        if (videos.length) {
          cacheSet(CACHE_KEY, videos, CACHE_TTL);
          return Response.json({ videos, source: "rss", count: videos.length });
        }
        problems.push("rss: empty feed");
      } else {
        problems.push(`rss: status ${res.status}`);
      }
    } catch (error) {
      problems.push(`rss: ${String(error)}`);
    }

    // Fallback: RSS2JSON on the same feed.
    try {
      const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
      const payload = await res.json();
      const videos = normalize(parseRss2Json(payload));
      if (videos.length) {
        cacheSet(CACHE_KEY, videos, CACHE_TTL);
        return Response.json({ videos, source: "rss2json", count: videos.length });
      }
      problems.push("rss2json: empty feed");
    } catch (error) {
      problems.push(`rss2json: ${String(error)}`);
    }

    // Last resort: the company's own project videos, straight from their public
    // gallery records (their channel content, no invented ids).
    try {
      const projects = await fetchProjects();
      const videos = normalize(
        projects
          .filter((project) => project.videoId)
          .map((project) => ({
            id: String(project.videoId),
            title: project.location,
            published: project.uploaded,
          }))
      );
      if (videos.length) {
        cacheSet(CACHE_KEY, videos, CACHE_TTL);
        return Response.json({ videos, source: "gallery", count: videos.length });
      }
      problems.push("gallery: no videos");
    } catch (error) {
      problems.push(`gallery: ${String(error)}`);
    }

    // Nothing valid: never cached, so the next request retries.
    return Response.json({ videos: [], source: "unavailable", problems });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}