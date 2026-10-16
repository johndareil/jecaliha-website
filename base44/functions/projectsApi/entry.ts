import { cacheGet, cacheSet } from "../../shared/ttlCache.ts";
import { fetchProjects, fetchGalleryImages, isSafeFolder } from "../../shared/gallery.ts";

// Read-only proxy for the public project gallery: keeps the third-party data
// shape stable for the app, adds cache-busting to media urls, and caches valid
// responses for ~5 minutes.

export default async function (req: Request): Promise<Response> {
  try {
    const body = await req.json().catch(() => ({}) as any);
    const action = String(body?.action ?? "list-projects");

    if (action === "list-images") {
      const folder = String(body?.folder ?? "").trim();
      if (!folder || !isSafeFolder(folder)) {
        return Response.json({ error: "Invalid folder" }, { status: 400 });
      }
      const cached = cacheGet<string[]>(`images:${folder}`);
      if (cached) return Response.json({ images: cached, cached: true });
      const images = await fetchGalleryImages(folder);
      return Response.json({ images });
    }

    const cachedProjects = cacheGet("projects");
    if (cachedProjects) return Response.json({ projects: cachedProjects, cached: true });

    const projects = await fetchProjects();
    if (!projects.length) {
      return Response.json({ projects: [], error: "Gallery data unavailable" });
    }
    return Response.json({ projects });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}