import ErrorView from "@/components/ErrorView"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import ProjectsWrapper from "@/components/ProjectsWrapper"
import { getInitialProjectsData } from "@/services/projectService"

export default async function Page() {
  const initialProjects = await getInitialProjectsData()

  return (
    <main className="container mx-auto px-6 lg:px-28 py-8 min-h-screen">
      <Header />
      {(initialProjects === null || 'error' in initialProjects)
        ? <ErrorView message={initialProjects?.error || 'Something went wrong. Please Try Again later.'} />
        : <ProjectsWrapper initialProjects={initialProjects} />}
      <Footer />
    </main>
  )
}