import ProjectCard from "@/components/ProjectCard"
import { ProjectCardSkeleton } from "./Skeleton"
import { Project, CardContainerProps } from "@/helpers/interfaces"
import { Button } from "@/components/ui/button"

export default function CardContainer({ projects, isLoading, loadProjects }: CardContainerProps) {
  return (
    <div role="region" aria-label="Projects list">
      {projects?.items?.length === 0 && !isLoading && (
        <h2 className="text-center text-muted-foreground font-bold" role="status">
          No projects to show.
        </h2>
      )}
      
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6" 
        role="list"
        aria-busy={isLoading}
      >
        {(!projects?.items && isLoading) ? (
          Array.from({ length: 8 }).map((_, index) => <ProjectCardSkeleton key={index} />)
        ) : (
          projects?.items?.map((project: Project) => (
            <div key={project.id} role="listitem">
              <ProjectCard project={project} />
            </div>
          ))
        )}
      </div>

      {(projects?.items) && (
        <Button
          className="w-full my-6 py-6 text-xl bg-primary hover:dark:bg-primary"
          onClick={loadProjects}
          id="load-more-projects"
          disabled={isLoading || projects?.items?.length >= projects?.total_count}
          aria-label={isLoading ? 'Loading more projects' : 
            projects?.items?.length >= projects?.total_count ? 'No more projects available' : 'Load more projects'}
        >
          {isLoading ? 'Loading...' :
            projects?.items?.length >= projects?.total_count ? 'No more projects' : 'Load more'}
        </Button>
      )}
    </div>
  )
}