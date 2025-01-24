import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"
import type { Project } from "@/app/api/projects"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ProjectDetailsModal } from "./ProjectDetailModal"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>
          <span className="cursor-pointer hover:underline">{project.name}</span>
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{project.language}</Badge>
          <div className="flex items-center">
            <StarIcon className="w-4 h-4 mr-1" />
            <span>{project.stars.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-muted-foreground">
          Updated: {new Date(project.lastUpdated).toLocaleDateString()}
        </span>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="text-sm text-blue-500 hover:underline p-0">
              View Details
            </Button>
          </DialogTrigger>
          <ProjectDetailsModal project={project} />
        </Dialog>
      </CardFooter>
    </Card>
  )
}
