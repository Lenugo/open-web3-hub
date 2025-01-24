import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StarIcon, GitBranchIcon, FolderOpenIcon as IssueOpenedIcon } from "lucide-react"
import type { Project } from "@/app/api/projects"

export function ProjectDetailsModal({ project }: { project: Project }) {
  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle className="text-3xl font-bold">{project.name}</DialogTitle>
        <DialogDescription className="text-lg">{project.description}</DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <StarIcon className="w-5 h-5" />
            <span className="text-lg">{project.stars.toLocaleString()} stars</span>
          </div>
          <div className="flex items-center space-x-2">
            <GitBranchIcon className="w-5 h-5" />
            <span className="text-lg">Main language: {project.language}</span>
          </div>
          <div className="flex items-center space-x-2">
            <IssueOpenedIcon className="w-5 h-5" />
            <span className="text-lg">Last updated: {new Date(project.lastUpdated).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="space-y-4">
          <Badge className="text-lg px-3 py-1">{project.language}</Badge>
          <div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-lg"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="bg-muted p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Contributing</h2>
        <p className="mb-4">
          This is an open-source project, and contributions are always welcome. Here's how you can get involved:
        </p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Fork the repository on GitHub</li>
          <li>Create a new branch for your feature or bug fix</li>
          <li>Make your changes and commit them with a clear message</li>
          <li>Push your changes to your fork</li>
          <li>Submit a pull request to the main repository</li>
        </ol>
      </div>
    </DialogContent>
  )
}
