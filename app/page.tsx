import ErrorView from "@/components/ErrorView"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import ProjectsWrapper from "@/components/ProjectsWrapper"
import { getInitialProjectsData } from "@/services/projectService"

export default async function Page() {
  const initialProjects = await getInitialProjectsData()

  if (initialProjects === null || 'error' in initialProjects) return <ErrorView message={initialProjects?.error || 'Something went wrong getting the data. Please try again later.'} />
  
  return (
    <main className="container mx-auto px-6 lg:px-28 py-8 min-h-screen">
      <Header />
      <ProjectsWrapper initialProjects={initialProjects} />
      <Footer />
    </main>
  )
}