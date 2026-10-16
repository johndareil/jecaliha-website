import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

// The project list comes from a slow third-party gallery worker (~9s cold), so
// it is cached for the session and in localStorage: a warm cache renders
// instantly while a stale one refreshes in the background.
const PROJECTS_CACHE_KEY = "jbc.projects.v1";
const PROJECTS_TTL = 5 * 60 * 1000;

function readProjectsCache() {
  try {
    const raw = window.localStorage.getItem(PROJECTS_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.projects) || parsed.projects.length === 0) return null;
    return parsed;
  } catch (error) {
    return null;
  }
}

let projectsCache = readProjectsCache();
let projectsRequest = null;

export function loadProjects() {
  if (projectsCache && Date.now() - projectsCache.at < PROJECTS_TTL) {
    return Promise.resolve(projectsCache.projects);
  }
  if (projectsRequest) return projectsRequest;

  projectsRequest = base44.functions
    .invoke("projectsApi", { action: "list-projects" })
    .then((response) => {
      const list = response?.data?.projects ?? [];
      if (!list.length) return projectsCache ? projectsCache.projects : [];
      projectsCache = { at: Date.now(), projects: list };
      try {
        window.localStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify(projectsCache));
      } catch (error) {
        /* storage unavailable — the in-memory cache still works */
      }
      return list;
    })
    .catch(() => (projectsCache ? projectsCache.projects : []))
    .finally(() => {
      projectsRequest = null;
    });

  return projectsRequest;
}

export function useProjects() {
  const [projects, setProjects] = useState(() => projectsCache?.projects ?? []);
  const [loading, setLoading] = useState(() => !projectsCache?.projects?.length);

  useEffect(() => {
    let alive = true;
    loadProjects().then((list) => {
      if (!alive) return;
      if (list.length) setProjects(list);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  return { projects, loading };
}

export function useProjectImages(folder) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!folder) {
      setImages([]);
      return;
    }
    let alive = true;
    setLoading(true);
    base44.functions
      .invoke("projectsApi", { action: "list-images", folder })
      .then((response) => {
        if (alive) setImages(response?.data?.images ?? []);
      })
      .catch(() => {
        if (alive) setImages([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [folder]);

  return { images, loading };
}

export function useYoutubeFeed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    base44.functions
      .invoke("youtubeFeed", {})
      .then((response) => {
        if (!alive) return;
        setVideos(response?.data?.videos ?? []);
      })
      .catch((err) => {
        if (alive) setError(err);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { videos, loading, error };
}