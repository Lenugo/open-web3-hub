import Footer from "@/components/Footer"
import Header from "@/components/Header"
import ProjectsWrapper from "@/components/ProjectsWrapper"

export default function Page() {

  return (
    <main className="container mx-auto px-6 lg:px-28 py-8 min-h-screen">
      <Header />
      <ProjectsWrapper />
      <Footer />
    </main>
  )
}
