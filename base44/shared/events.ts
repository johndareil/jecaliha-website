import { cacheGet, cacheSet } from "./ttlCache.ts";
import { GALLERY_WORKER, GALLERY_TTL, isSafeFolder, withVersion } from "./gallery.ts";

// Shared access to the company's public events gallery:
// events/<folder>/{cover.webp, info.json, images/*, videos/*}

export type CompanyEvent = {
  folder: string;
  title: string;
  date: string;
  location: string;
  description: string;
  cover: string;
  images: string[];
  videos: string[];
};

const EVENTS_CACHE_KEY = "events";
const IMAGE_RE = /\.(webp|jpe?g|png|avif|gif)$/i;
const VIDEO_RE = /\.(mp4|webm|mov|m4v)$/i;

type Row = { key?: string; url?: string };

function humanize(folder: string): string {
  return folder
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function byKey(a: Row, b: Row): number {
  return String(a.key ?? "").localeCompare(String(b.key ?? ""), undefined, { numeric: true });
}

async function listPrefix(prefix: string): Promise<Row[]> {
  const res = await fetch(
    `${GALLERY_WORKER}?action=list-images&prefix=${encodeURIComponent(prefix)}`,
    { signal: AbortSignal.timeout(25000) }
  );
  if (!res.ok) return [];
  const rows = await res.json();
  return Array.isArray(rows) ? rows : [];
}

async function readInfo(url: string): Promise<any> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) return {};
    return await res.json();
  } catch (error) {
    return {};
  }
}

export async function fetchEvents(): Promise<CompanyEvent[]> {
  const cached = cacheGet<CompanyEvent[]>(EVENTS_CACHE_KEY);
  if (cached) return cached;

  const rows = await listPrefix("events/");

  const folders = new Map<string, Row[]>();
  for (const row of rows) {
    const parts = String(row?.key ?? "").split("/");
    if (parts.length < 3) continue; // events/<folder>/<file>
    const folder = parts[1];
    if (!folder || !isSafeFolder(folder)) continue;
    const files = folders.get(folder) ?? [];
    files.push(row);
    folders.set(folder, files);
  }

  const events: CompanyEvent[] = [];
  for (const [folder, files] of folders) {
    const coverFile = files.find((file) => /\/cover\.[a-z0-9]+$/i.test(String(file.key)));
    const infoFile = files.find((file) => /\/info\.json$/i.test(String(file.key)));
    const info = infoFile?.url ? await readInfo(String(infoFile.url)) : {};

    const images = files
      .filter((file) => IMAGE_RE.test(String(file.key)) && !/\/cover\./i.test(String(file.key)))
      .sort(byKey)
      .map((file) => withVersion(file.url))
      .filter((url) => url.length > 0);

    const videos = files
      .filter((file) => VIDEO_RE.test(String(file.key)))
      .sort(byKey)
      .map((file) => withVersion(file.url))
      .filter((url) => url.length > 0);

    const cover = withVersion(coverFile?.url ?? images[0] ?? "");
    if (!cover) continue; // an event without a cover image cannot be shown

    events.push({
      folder,
      title: String(info?.title ?? "").trim() || humanize(folder),
      date: String(info?.date ?? "").trim(),
      location: String(info?.location ?? "").trim(),
      description: String(info?.description ?? "").trim(),
      cover,
      images,
      videos,
    });
  }

  // Newest → oldest.
  events.sort((a, b) => b.date.localeCompare(a.date) || b.folder.localeCompare(a.folder));
  cacheSet(EVENTS_CACHE_KEY, events, GALLERY_TTL);
  return events;
}