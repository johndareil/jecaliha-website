import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

// One shared playback slot for the whole site: at most one video id can be
// active, so at most one YouTube iframe exists at any moment. Switching videos
// or leaving the page unmounts the previous iframe completely.
const VideoPlaybackContext = createContext(null);

export function VideoProvider({ children }) {
  const [activeId, setActiveId] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setActiveId(null);
  }, [pathname]);

  useEffect(() => {
    const mediaQueries = [
      window.matchMedia("(max-width: 639px)"),
      window.matchMedia("(min-width: 640px) and (max-width: 1023px)"),
    ];
    const handleChange = () => setActiveId(null);
    mediaQueries.forEach((mq) => mq.addEventListener("change", handleChange));
    return () => mediaQueries.forEach((mq) => mq.removeEventListener("change", handleChange));
  }, []);

  const play = useCallback((videoId) => setActiveId(videoId), []);
  const stop = useCallback(() => setActiveId(null), []);

  const value = useMemo(() => ({ activeId, play, stop }), [activeId, play, stop]);

  return <VideoPlaybackContext.Provider value={value}>{children}</VideoPlaybackContext.Provider>;
}

export function useVideoPlayback() {
  const context = useContext(VideoPlaybackContext);
  if (!context) throw new Error("useVideoPlayback must be used inside VideoProvider");
  return context;
}