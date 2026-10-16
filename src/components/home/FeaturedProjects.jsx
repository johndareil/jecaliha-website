import { Link } from "react-router-dom";
import { ArrowRight, Maximize2, ArrowUpRight } from "lucide-react";
import BentoGrid from "@/components/BentoGrid";
import SectionHeading from "@/components/SectionHeading";
import { useProjects } from "@/hooks/useSiteData";

export default function FeaturedProjects() {
  const { projects, loading } = useProjects();
  const completed = projects.filter((project) => (project.status ?? "").toLowerCase() === "completed");
  const latest = (completed.length >= 4 ? completed : projects).slice(0, 4);

  return (
    <section className="bg-basalt py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our Work" title="Featured Projects" />

        <div className="mt-14">
          {loading && <SkeletonBento />}

          {!loading && latest.length > 0 && (
            <BentoGrid
              items={latest.map((project) => ({ key: project.folder, project }))}
              renderItem={({ project }, { isWide, toggle }) =>
                isWide ? (
                  <Link
                    to={`/projects?project=${encodeURIComponent(project.folder)}`}
                    className="group relative block h-full w-full overflow-hidden rounded-xl shadow-md transition-shadow duration-300 hover:shadow-gold-glow"
                  >
                    <CardBody project={project} />
                    <span className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-gold/40 bg-basalt/60 px-4 py-2 font-display text-[9px] uppercase tracking-[0.2em] text-gold opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      View Project
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={toggle}
                    aria-label={`Rearrange featured projects grid — ${project.location}`}
                    className="group relative block h-full w-full overflow-hidden rounded-xl text-left shadow-md transition-shadow duration-300 hover:shadow-gold-glow"
                  >
                    <CardBody project={project} />
                    <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-basalt/60 text-gold opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </button>
                )
              }
            />
          )}

          {!loading && latest.length === 0 && (
            <p className="text-center text-sm text-pearl/50">
              Project gallery is unavailable right now. Please check back shortly.
            </p>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:text-gold-soft"
          >
            View All Projects
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CardBody({ project }) {
  return (
    <>
      <img
        src={project.cover}
        alt={project.location}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-basalt/92 via-basalt/35 to-basalt/20" />
      <div className="absolute inset-x-5 bottom-5 flex flex-col gap-2">
        <p className="font-display text-[10px] uppercase tracking-[0.2em] text-gold">
          {project.category || project.status}
        </p>
        <h3 className="font-heading text-base font-semibold uppercase leading-snug tracking-wide text-pearl sm:text-lg">
          {project.location}
        </h3>
      </div>
    </>
  );
}

function SkeletonBento() {
  return (
    <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:auto-rows-[260px] sm:grid-cols-2 lg:auto-rows-[380px] lg:grid-cols-3">
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={[
            "animate-pulse rounded-xl bg-white/[0.05]",
            index % 3 === 0 ? "lg:col-span-2" : "lg:col-span-1",
          ].join(" ")}
        />
      ))}
    </div>
  );
}