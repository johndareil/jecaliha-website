import ModalFrame from "@/components/projects/ModalFrame";
import ShareMenu from "@/components/projects/ShareMenu";
import { projectShareUrl } from "@/lib/share";

export default function ProjectModalSimple({ project, onClose }) {
  return (
    <ModalFrame
      onClose={onClose}
      size="max-w-5xl"
      header={
        <>
          <span className="font-heading text-sm font-semibold uppercase tracking-wide text-pearl">
            {project.location}
          </span>
          <ShareMenu url={projectShareUrl(project.folder)} title={project.location} />
        </>
      }
    >
      <div className="space-y-7 p-4 pb-10 sm:p-6">
        <div className="overflow-hidden rounded-lg bg-ink">
          <img
            src={project.cover}
            alt={`${project.location} cover`}
            className="max-h-[60vh] w-full object-cover"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="jbc-eyebrow text-gold/70">Location</p>
            <p className="mt-2 text-sm leading-relaxed text-pearl/85">{project.location}</p>
          </div>
          <div className="border-t border-white/10 pt-6 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <p className="jbc-eyebrow text-gold/70">Description</p>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-pearl/70">
              {project.description || project.category || "Details available on request."}
            </p>
          </div>
          <div className="border-t border-white/10 pt-6 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <p className="jbc-eyebrow text-gold/70">Status</p>
            <p className="mt-2 text-sm text-pearl/85">{project.status}</p>
          </div>
        </div>
      </div>
    </ModalFrame>
  );
}