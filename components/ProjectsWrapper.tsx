'use client'

import { useProjects } from "@/hooks/useProjects"
import ScrollToTop from "./ScrollToTop"
import SearchProjects from "./SearchProjects"
import CardContainer from "./CardContainer"
import ProjectHeader from "./ProjectHeader"
import ErrorView from "./ErrorView"
import { ProjectResult } from "@/helpers/interfaces"

export default function ProjectsWrapper({ initialProjects }: { initialProjects: ProjectResult | null }) {
  const {
    projects,
    isLoading,
    error,
    search,
    setSearch,
    sort,
    handleSelectChange,
    topics,
    toggleTopic,
    handleMoreProjects,
  } = useProjects(initialProjects)

  if (error) return <ErrorView message={error} />

  return (
    <section>
      <ProjectHeader />
      <SearchProjects
        setSearch={setSearch}
        handleSelectChange={handleSelectChange}
        search={search}
        topics={topics}
        sort={sort}
        toggleTopic={toggleTopic}
        isLoading={isLoading}
        totalCount={projects?.total_count ?? 0}
      />
      <CardContainer
        projects={projects}
        isLoading={isLoading}
        loadProjects={handleMoreProjects}
      />
      <ScrollToTop />
    </section>
  )
}