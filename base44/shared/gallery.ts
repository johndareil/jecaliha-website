import { cacheGet, cacheSet } from "./ttlCache.ts";

// Shared access to the company's public project gallery.

export const GALLERY_WORKER = "https://jecaliha-gallery.quinojhondareillewis.workers.dev/";
export const GALLERY_TTL = 5 * 60 * 1000;
export const PROJECT_CACHE_KEY = "projects";

export type Project = {
  folder: string;
  location: string;
  category: string;
  description: string;
  status: string;
  modalType: string;
  videoId: string | null;
  cover: string;
  uploaded: string;
};

export function withVersion(url: unknown): string {
  const value = String(url ?? "").trim();
  if (!value) return "";
  return value.includes("?") ? value : `${value}?v=2`;
}

export function isSafeFolder(folder: string): boolean {
  return /^[\p{L}\p{N} ._-]+$/u.test(folder) && !folder.includes("..");
}

export function normalizeProjects(rows: any[]): Project[] {
  const projects: Project[] = [];
  for (const row of rows) {
    const folder = String(row?.folder ?? "").trim();
    if (!folder) continue;
    projects.push({
      folder,
      location: String(row?.location ?? folder.replace(/-/g, " ")),
      category: String(row?.category ?? ""),
      description: String(row?.description ?? ""),
      status: String(row?.status ?? "Completed"),
      modalType: String(row?.modalType ?? "simple"),
      videoId: row?.videoId ? String(row.videoId) : null,
      cover: withVersion(row?.cover),
      uploaded: String(row?.uploaded ?? ""),
    });
  }
  // Newest → oldest.
  projects.sort((a, b) => (b.uploaded || "").localeCompare(a.uploaded || ""));
  return projects;
}

export async function fetchProjects(): Promise<Project[]> {
  const cached = cacheGet<Project[]>(PROJECT_CACHE_KEY);
  if (cached) return cached;

  // The gallery worker can take ~10s on a cold instance, so allow it to finish
  // instead of aborting into an empty list.
  const res = await fetch(`${GALLERY_WORKER}?action=list-projects`, {
    signal: AbortSignal.timeout(25000),
  });
  if (!res.ok) return [];

  const rows = await res.json();
  const projects = normalizeProjects(Array.isArray(rows) ? rows : []);
  if (projects.length) cacheSet(PROJECT_CACHE_KEY, projects, GALLERY_TTL);
  return projects;
}

export async function fetchGalleryImages(folder: string): Promise<string[]> {
  const cacheKey = `images:${folder}`;
  const cached = cacheGet<string[]>(cacheKey);
  if (cached) return cached;

  const url = `${GALLERY_WORKER}?action=list-images&prefix=${encodeURIComponent(`projects/${folder}`)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!res.ok) return [];

  const rows = await res.json();
  const images = (Array.isArray(rows) ? rows : [])
    .map((row: any) => ({ key: String(row?.key ?? ""), url: withVersion(row?.url) }))
    .filter((row: any) => /\.(webp|jpe?g|png|avif)$/i.test(row.key) && !/\/cover\./i.test(row.key))
    .sort((a: any, b: any) => a.key.localeCompare(b.key, undefined, { numeric: true }))
    .map((row: any) => row.url)
    .filter((value: string) => value.length > 0);

  if (images.length) cacheSet(cacheKey, images, GALLERY_TTL);
  return images;
}