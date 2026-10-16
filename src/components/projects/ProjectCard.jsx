export default function ProjectCard({ project, onOpen }) {
  return (
    <article
      data-reveal
      className="group relative overflow-hidden rounded-xl bg-ink shadow-md transition-shadow duration-300 hover:shadow-gold-glow"
    >
      <img
        src={project.cover}
        alt={project.location}
        loading="lazy"
        decoding="async"
        className="block aspect-video w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-4">
        <span className="bg-gold px-2 py-1 font-heading text-[10px] font-semibold uppercase leading-none tracking-wide text-basalt">
          {project.category}
        </span>
        <span className="bg-black/55 px-3 py-1.5 text-xs text-pearl backdrop-blur-sm sm:text-sm">
          {project.location}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`View project — ${project.location}`}
        className="absolute inset-0 flex items-center justify-center bg-basalt/55 opacity-0 transition-opacity duration-300 focus-visible:opacity-100 group-hover:opacity-100"
      >
        <span className="border border-gold bg-[#101A2B] px-5 py-3 font-display text-[10px] uppercase tracking-[0.25em] text-gold">
          View Project
        </span>
      </button>
    </article>
  );
}