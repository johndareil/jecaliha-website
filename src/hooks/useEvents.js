const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useState } from "react";

// Company events come from the same gallery worker as the projects (a slow
// cold start), so the list is cached for the session and in localStorage.
const EVENTS_CACHE_KEY = "jbc.events.v1";
const EVENTS_TTL = 5 * 60 * 1000;

function readEventsCache() {
  try {
    const raw = window.localStorage.getItem(EVENTS_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.events)) return null;
    return parsed;
  } catch (error) {
    return null;
  }
}

let eventsCache = readEventsCache();
let eventsRequest = null;

export function loadEvents() {
  if (eventsCache && Date.now() - eventsCache.at < EVENTS_TTL) {
    return Promise.resolve(eventsCache.events);
  }
  if (eventsRequest) return eventsRequest;

  eventsRequest = db.functions
    .invoke("eventsApi", { action: "list-events" })
    .then((response) => {
      const list = response?.data?.events ?? [];
      eventsCache = { at: Date.now(), events: list };
      try {
        window.localStorage.setItem(EVENTS_CACHE_KEY, JSON.stringify(eventsCache));
      } catch (error) {
        /* storage unavailable — the in-memory cache still works */
      }
      return list;
    })
    .catch(() => (eventsCache ? eventsCache.events : []))
    .finally(() => {
      eventsRequest = null;
    });

  return eventsRequest;
}

export function useEvents() {
  const [events, setEvents] = useState(() => eventsCache?.events ?? []);
  const [loading, setLoading] = useState(() => !eventsCache);

  useEffect(() => {
    let alive = true;
    loadEvents().then((list) => {
      if (!alive) return;
      setEvents(list);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  return { events, loading };
}