"use client"
/* eslint-disable @next/next/no-img-element */
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"
import { fetchProjectReleaseData } from "@/app/helpers/api"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import ProjectDetailsModal from "./ProjectDetailModal"
import { useState } from "react"
import { Project, Release } from "@/app/helpers/interfaces"

export default function ProjectCard({ project }: { project: Project }) {
  const [realeaseData, setReleaseData] = useState<Release | null>(null)

  const handleOpenModal = async (project: Project) => {
    const result = await fetchProjectReleaseData({ organization: project.owner.login, repo: project.name })
    setReleaseData(result)
  }

  return (
    <Dialog>
      <DialogTrigger asChild onClick={() => handleOpenModal(project)}>
        <Card className="flex rounded-3xl relative items-center h-44 p-4 hover:shadow-lg hover:cursor-pointer">
          <img src={project?.owner?.avatar_url} alt={project?.full_name} className="size-24 rounded-lg self-center" />
    
          <CardContent className="flex-grow pl-6 md:pl-8">
            <div className="my-2">
              <CardTitle className="text-xl md:w-3/4 lg:w-fit">{project?.name}</CardTitle>
              <CardDescription className="line-clamp-3 sm:line-clamp-2 lg:line-clamp-3">{project?.description}</CardDescription>
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
      <ProjectDetailsModal project={project} releaseData={realeaseData} />
    </Dialog>
  )
}
