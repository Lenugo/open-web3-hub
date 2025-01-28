/* eslint-disable @next/next/no-img-element */
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { StarIcon, GitBranchIcon, UsersIcon, GithubIcon, HomeIcon, TagIcon, RefreshCcw } from "lucide-react"
import { DialogDescription } from "@radix-ui/react-dialog"
import { ProjectDetailsModalProps } from "@/app/helpers/interfaces"
import ProjectDetailCard from "./ProjectDetailCard"
import { CardBlankSkeleton, DetailCardSkeleton } from "./Skeleton"

export default function ProjectDetailsModal({ project, releaseData, isLoading }: ProjectDetailsModalProps) {
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }).format(date);
  }

  return (
    <DialogContent className="h-screen sm:h-auto max-w-5xl">
      <DialogHeader className="sm:space-y-2 border-b sm:pb-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col sm:flex-row w-full items-center gap-2 sm:gap-4">
            {project.owner.avatar_url ? (
              <img src={project.owner?.avatar_url} alt={project.name} className="size-20 sm:size-16 rounded-lg shadow-md" />
            ) : <CardBlankSkeleton classnames="size-20 sm:size-16 rounded-lg bg-muted shadow-md" />}
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-8">
                <DialogTitle className="text-3xl font-bold tracking-tight max-w-[24rem] sm:max-w-max truncate">{project.name}</DialogTitle>
                <div className="flex items-center gap-3">
                  <a href={project.svn_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <GithubIcon className="size-6" fill="black" />
                  </a>
                  {project.homepage && (
                    <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      <HomeIcon className="size-6" />
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center flex-col sm:flex-row flex-wrap gap-2 mt-1">
                {project.license?.name && (
                  <div className="flex flex-col sm:flex-row items-center gap-1">
                    <span className="text-sm text-muted-foreground">License:</span>
                    <Badge variant="outline" className="text-xs">{project.license.name}</Badge>
                  </div>
                )}
                <span className="text-sm text-muted-foreground">by {project.owner.login}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogHeader>

      <div className="space-y-6 my-2">
        <DialogDescription>
          <div className="prose dark:prose-invert max-w-none">
            <span className="text-xl font-semibold mb-2 block">About this project</span>
            <span className="text-muted-foreground leading-relaxed">{project.description}</span>
          </div>
        </DialogDescription>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 w-full">
          <ProjectDetailCard title="Stars" description={project.stargazers_count?.toLocaleString()}>
            <StarIcon size={24} stroke="#fff000" />
          </ProjectDetailCard>

          {project?.language?.length > 0 &&
            <ProjectDetailCard title="Language" description={project.language}>
              <GitBranchIcon size={24} stroke="red" />
            </ProjectDetailCard>
          }

          <ProjectDetailCard title="Watchers" description={project.watchers_count.toLocaleString() || 0}>
            <UsersIcon size={24} stroke="gray" />
          </ProjectDetailCard>

          <ProjectDetailCard title="Updated" description={formatDate(project.updated_at)}>
            <RefreshCcw size={24} stroke="#ffaaaa" />
          </ProjectDetailCard>

          {(isLoading) ?
            <DetailCardSkeleton /> :
            (!isLoading && releaseData?.tag_name) ?
              <ProjectDetailCard title="Latest Release" description={releaseData?.tag_name}>
                <TagIcon size={24} color="#3e9392" />
              </ProjectDetailCard> : null
          }
        </div>
      </div>

      {project.topics && project.topics.length > 0 && (
        <div className="border-t pt-2 mt-2">
          <h4 className="font-semibold mb-3">Topics</h4>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {project.topics.map((topic) => (
              <div key={topic} className="break-inside-avoid mb-1.5">
                <Badge variant="secondary" className="inline-flex items-center rounded-lg bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                  {topic}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </DialogContent>
  )
}
