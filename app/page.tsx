import Header from "@/components/Header"
import ProjectsContentHero from "@/components/ProjectsContentHero"

export default async  function Page() {

  return (
    <div className="container mx-auto px-6 py-8">
      <Header />
      
      <div className="mb-8 text-center">
        <h2 className="text-4xl text-muted-foreground">
          Discover and explore open source Web3 & AI projects.
        </h2>
        <h4 className="text-xl text-muted-foreground">Boost efficiency, cut costs, collaborate on open-source innovation.</h4>
      </div>
    
      <ProjectsContentHero />
    </div>
  )
}
