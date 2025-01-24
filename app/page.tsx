import { projects } from "@/app/api/projects"
import { ProjectCard } from "@/components/ProjectCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Page() {
  return (
    <div className="container mx-auto sm:px-4 py-8">
      <header className="sticky top-0 py-4 bg-transparent backdrop-blur-md mb-8">
        <img src="/web3-logo.png" alt="open web3 hub logo" className="size-1/5" />
      </header>
      
      <div className="mb-8 text-center">
        <h2 className="text-4xl text-muted-foreground">
          Discover and explore open source Web3 & AI projects.
        </h2>
        <h4 className="text-xl text-muted-foreground">Boost efficiency, cut costs, collaborate on open-source innovation.</h4>
      </div>
     
      <div className="mb-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
