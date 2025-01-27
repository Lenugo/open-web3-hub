import { fetchProjectsData } from "@/app/helpers/api"
import Header from "@/components/Header"
import ProjectCard from "@/components/ProjectCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Project } from "./helpers/interfaces"

export default async function Page() {
  const projects = await fetchProjectsData()

  return (
    <div className="container mx-auto px-6 py-8">
      <Header />
      
      <div className="mb-8 text-center">
        <h2 className="text-4xl text-muted-foreground">
          Discover and explore open source Web3 & AI projects.
        </h2>
        <h4 className="text-xl text-muted-foreground">Boost efficiency, cut costs, collaborate on open-source innovation.</h4>
      </div>
    
      <div className="mb-6">
        <p>
          results: {projects.total_count}
        </p>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stars">Stars</SelectItem>
            <SelectItem value="updated">Last Updated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.items.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
