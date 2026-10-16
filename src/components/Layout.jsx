import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { VideoProvider } from "@/lib/VideoPlayback";
import { loadProjects } from "@/hooks/useSiteData";

export default function Layout() {
  // Warm the project list while the visitor is on any page, so the projects
  // gallery opens with data already available.
  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <VideoProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </VideoProvider>
  );
}