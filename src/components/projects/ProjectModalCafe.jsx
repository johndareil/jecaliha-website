import ModalFrame from "@/components/projects/ModalFrame";
import ShareMenu from "@/components/projects/ShareMenu";
import { projectShareUrl } from "@/lib/share";

export default function ProjectModalCafe({ project, onClose }) {
  return (
    <ModalFrame
      onClose={onClose}
      size="max-w-5xl"
      header={
        <>
          <span className="bg-gold px-2.5 py-1 font-heading text-[10px] font-semibold uppercase leading-none tracking-wide text-basalt">
            {project.category}
          </span>
          <ShareMenu url={projectShareUrl(project.folder)} title={project.location} />
        </>
      }
    >
      <div className="p-4 pb-10 sm:p-6">
        <div className="relative overflow-hidden rounded-lg bg-ink">
          <img
            src={project.cover}
            alt={`${project.location} cover`}
            className="h-auto w-full object-cover"
          />
          <div className="absolute bottom-5 left-5 right-5 max-w-xl">
            <p className="font-heading text-base font-semibold uppercase tracking-wide text-pearl drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] sm:text-xl">
              {project.location}
            </p>
            {project.description && (
              <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-pearl/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] sm:text-sm">
                {project.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </ModalFrame>
  );
}