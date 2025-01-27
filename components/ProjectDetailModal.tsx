/* eslint-disable @next/next/no-img-element */
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { StarIcon, GitBranchIcon, UsersIcon, GithubIcon, HomeIcon, TagIcon } from "lucide-react"
import { DialogDescription } from "@radix-ui/react-dialog"
import { ProjectDetailsModalProps } from "@/app/helpers/interfaces"
import ProjectDetailCard from "./ProjectDetailCard"
import { CardImgSkeleton, DetailCardSkeleton } from "./Skeleton"

export default function ProjectDetailsModal({ project, releaseData, isLoading }: ProjectDetailsModalProps) {
  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader className="space-y-2 border-b pb-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col sm:flex-row w-full items-center gap-4">
            {project.owner.avatar_url ? (
              <img src={project.owner?.avatar_url} alt={project.name} className="size-20 sm:size-16 rounded-lg shadow-md" />
            ) : <CardImgSkeleton classnames="size-20 sm:size-16 rounded-lg shadow-md" />}
            <div className="flex-1">
              <div className="flex gap-x-8">
                <DialogTitle className="text-3xl font-bold tracking-tight">{project.name}</DialogTitle>
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
            <h2 className="text-xl font-semibold mb-3">About this project</h2>
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </div>
        </DialogDescription>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <ProjectDetailCard title="Stars" description={project.stargazers_count?.toLocaleString() || 0}>
            <StarIcon size={24} stroke="#fff000" />
          </ProjectDetailCard>

          {project.language &&
            <ProjectDetailCard title="Language" description={project.language}>
              <GitBranchIcon size={24} stroke="red" />
            </ProjectDetailCard>
          }

          {project.watchers_count &&
            <ProjectDetailCard title="Watchers" description={project.watchers_count.toLocaleString()}>
              <UsersIcon size={24} stroke="gray" />
            </ProjectDetailCard>
          }

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
          <h3 className="font-semibold mb-3">Topics</h3>
          <div className="flex flex-wrap gap-4">
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
