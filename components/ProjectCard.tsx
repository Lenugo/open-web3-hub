"use client"
/* eslint-disable @next/next/no-img-element */
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import ProjectDetailsModal from "./ProjectDetailModal"
import { useState } from "react"
import { Project } from "@/app/helpers/interfaces"
import { CardBlankSkeleton } from "./Skeleton"
import { useProjectRelease } from "@/hooks/useProjectRelease"

export default function ProjectCard({ project }: { project: Project }) {
  const { releaseData, isReleaseLoading, fetchReleaseData } = useProjectRelease(project)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleDialogTrigger = () => {
    setIsDialogOpen(true)
    fetchReleaseData()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild onClick={handleDialogTrigger}>
        <Card className="flex rounded-3xl relative items-center h-44 p-4 hover:shadow-lg hover:cursor-pointer">
          {project.owner.avatar_url ? (
            <img src={project.owner.avatar_url} alt={project.full_name} className="size-24 rounded-lg self-center" loading="lazy" />
          ) : <CardBlankSkeleton classnames="size-24 rounded-lg self-center bg-gray-500/20" />}
          <CardContent className="flex-grow pl-6 md:pl-8">
            <div className="my-2">
              <CardTitle className="text-xl md:w-3/4 lg:w-fit line-clamp-1 max-w-[14rem] lg:max-w-fit text-ellipsis">{project?.name}</CardTitle>
              <CardDescription className="line-clamp-2 max-w-[12rem] lg:max-w-[29rem] text-ellipsis">{project?.description}</CardDescription>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant='secondary' className="flex py-1 rounded-2xl">
                <StarIcon fill="yellow" strokeWidth={1} className="size-4 mr-1" />
                <span>{project?.stargazers_count.toLocaleString()}</span>
              </Badge>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      {isDialogOpen && (
        <ProjectDetailsModal project={project} releaseData={releaseData} isLoading={isReleaseLoading} />
      )}
    </Dialog>
  )
}
