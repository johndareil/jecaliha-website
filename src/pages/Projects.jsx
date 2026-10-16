import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectModalGallery from "@/components/projects/ProjectModalGallery";
import ProjectModalSimple from "@/components/projects/ProjectModalSimple";
import ProjectModalCafe from "@/components/projects/ProjectModalCafe";
import { useProjects } from "@/hooks/useSiteData";
import useReveal from "@/hooks/useReveal";
import { PROJECT_CATEGORY_FILTERS } from "@/lib/site";
import { cn } from "@/lib/utils";

const TABS = ["Completed", "Ongoing"];
const SORTS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "az", label: "Location A – Z" },
];

function modalKindOf(project) {
  if ((project.status ?? "").toLowerCase() === "ongoing") return "simple";
  if (project.modalType === "gallery") return "gallery";
  if (project.modalType === "cafe") return "cafe";
  return "simple";
}

export default function Projects() {
  const { projects, loading } = useProjects();
  const { search: locationSearch } = useLocation();
  const [tab, setTab] = useState("Completed");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [openProject, setOpenProject] = useState(null);

  // Deep link: /projects?project=folder-name
  useEffect(() => {
    if (!projects.length) return;
    const folder = new URLSearchParams(locationSearch).get("project");
    if (!folder) return;
    const match = projects.find((project) => project.folder === folder);
    if (!match) return;
    setTab((match.status ?? "").toLowerCase() === "ongoing" ? "Ongoing" : "Completed");
    setOpenProject(match);
  }, [projects, locationSearch]);

  const query = (search ?? "").trim().toLowerCase();

  const list = useMemo(() => {
    const filtered = projects.filter((project) => {
      const status = (project.status ?? "").toLowerCase();
      if (tab === "Completed" ? status !== "completed" : status !== "ongoing") return false;
      if (category !== "All" && (project.category ?? "") !== category) return false;
      if (!query) return true;
      return [project.location, project.category, project.description, project.folder].some((field) =>
        (field ?? "").toLowerCase().includes(query)
      );
    });

    const sorted = [...filtered];
    if (sort === "oldest") sorted.sort((a, b) => (a.uploaded ?? "").localeCompare(b.uploaded ?? ""));
    else if (sort === "az")
      sorted.sort((a, b) => (a.location ?? "").localeCompare(b.location ?? ""));
    else sorted.sort((a, b) => (b.uploaded ?? "").localeCompare(a.uploaded ?? ""));
    return sorted;
  }, [projects, tab, category, query, sort]);

  const revealRef = useReveal([tab, category, query, sort, list.length]);
  const openKind = openProject ? modalKindOf(openProject) : null;

  return (
    <>
      <section className="bg-basalt pt-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="jbc-eyebrow text-gold">Our Work</p>
          <h1 className="jbc-title mt-3 text-3xl text-pearl sm:text-4xl lg:text-5xl">Projects</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-pearl/60 sm:text-base">
            Every project is a testament to precision, quality, and lasting craftsmanship.
          </p>
        </div>
      </section>

      <section className="bg-basalt pb-20 pt-10 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-pearl/40" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by location, category, or detail…"
                aria-label="Search projects"
                className="w-full rounded-lg border border-white/12 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-pearl placeholder:text-pearl/35 outline-none transition-colors duration-300 focus:border-gold focus:ring-1 focus:ring-gold/50"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {PROJECT_CATEGORY_FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setCategory(filter)}
                  className={cn(
                    "rounded-full border px-4 py-2 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
                    category === filter
                      ? "border-gold bg-gold text-basalt"
                      : "border-white/15 text-pearl/65 hover:border-gold hover:text-gold"
                  )}
                >
                  {filter}
                </button>
              ))}

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="Sort projects"
                className="ml-auto rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2 font-heading text-[10px] uppercase tracking-[0.16em] text-pearl/80 outline-none transition-colors duration-300 focus:border-gold"
              >
                {SORTS.map((option) => (
                  <option key={option.value} value={option.value} className="bg-basalt">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-6 border-b border-white/10">
            {TABS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={cn(
                  "relative pb-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
                  tab === item ? "text-gold" : "text-pearl/45 hover:text-pearl/80"
                )}
              >
                {item}
                {tab === item && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-gold" />}
              </button>
            ))}
          </div>

          <div ref={revealRef} className="mt-8">
            {loading && (
              <div className="grid items-start gap-5 sm:grid-cols-2">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="aspect-video animate-pulse rounded-xl bg-white/[0.05]"
                  />
                ))}
              </div>
            )}

            {!loading && list.length > 0 && (
              <div className="grid items-start gap-5 sm:grid-cols-2">
                {list.map((project) => (
                  <ProjectCard
                    key={project.folder}
                    project={project}
                    onOpen={() => setOpenProject(project)}
                  />
                ))}
              </div>
            )}

            {!loading && list.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
                <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-pearl">
                  No projects found
                </p>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-pearl/55">
                  {tab === "Ongoing"
                    ? "Ongoing builds will appear here as they break ground."
                    : "Try a different search term or category filter."}
                </p>
                {(query || category !== "All") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setCategory("All");
                    }}
                    className="mt-6 rounded-lg border border-gold/50 px-5 py-2.5 font-heading text-[10px] uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gold hover:text-basalt"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center shadow-md transition-shadow duration-300 hover:shadow-gold-glow sm:px-10">
            <h2 className="jbc-title text-2xl text-pearl sm:text-3xl">Want a similar project?</h2>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-4 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-basalt transition-all duration-300 hover:bg-gold-soft hover:shadow-gold-glow"
            >
              Get a Free Quotation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {openKind === "gallery" && (
        <ProjectModalGallery project={openProject} onClose={() => setOpenProject(null)} />
      )}
      {openKind === "cafe" && (
        <ProjectModalCafe project={openProject} onClose={() => setOpenProject(null)} />
      )}
      {openKind === "simple" && (
        <ProjectModalSimple project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </>
  );
}