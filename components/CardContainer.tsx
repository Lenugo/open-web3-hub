import ProjectCard from "@/components/ProjectCard"
import { ProjectCardSkeleton } from "./Skeleton"
import { Project, CardContainerProps } from "@/helpers/interfaces"
import { Button } from "@/components/ui/button"

export default function CardContainer({ projects, isLoading, loadProjects }: CardContainerProps) {

  return (
    <div>
      {projects?.items?.length === 0 && !isLoading && <h2 className="text-center text-muted-foreground font-bold">No projects to show.</h2>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(!projects?.items && isLoading) ? (
          Array.from({ length: 8 }).map((_, index) => <ProjectCardSkeleton key={index} />)
        ) : (
          projects?.items?.map((project: Project) => <ProjectCard key={project.id} project={project} />)
        )}
      </div>

      {(projects?.items) ? (
        <Button
          className="w-full my-6 py-6 text-xl bg-primary hover:dark:bg-primary"
          onClick={loadProjects}
          disabled={isLoading || projects?.items?.length >= projects?.total_count}
        >
          {isLoading ? 'Loading...' :
            projects?.items?.length >= projects?.total_count ? 'No more projects' : 'Load more'}
        </Button>
      ) : null}

    </div>
  )
}