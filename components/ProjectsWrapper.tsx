'use client'

import { fetchProjectsData } from "@/app/helpers/api"
import { ProjectResult } from "@/app/helpers/interfaces"
import { useState, useEffect } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import ScrollToTop from "./ScrollToTop"
import SearchProjects, { mainTopics } from "./SearchProjects"
import CardContainer from "./CardContainer"
import ProjectHeader from "./ProjectHeader"

export default function ProjectsWrapper() {
  const PER_PAGE: number = 20
  const [projects, setProjects] = useState<ProjectResult | null>(null)
  const [perPage, setPerPage] = useState<number>(PER_PAGE)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<'stars' | 'updated'>('stars')
  const [topics, setTopics] = useState<string[]>([mainTopics[0]])
  const [debouncedSearch] = useDebounce(search, 600)

  const loadProjects = async () => {
    try {
      setIsLoading(true)
      setProjects(null)
      const data = await fetchProjectsData({
        perPage: perPage,
        search: debouncedSearch,
        sort,
        topics
      })
      setProjects(data)
    } catch (error) {
      console.error('Error loading more projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTopic = (topic: string) => {
    setTopics((prev: string[]) => {
      if (prev.includes(topic)) {
        if (prev.length === 1) return prev
        return prev.filter(t => t !== topic)
      } else {
        return [...prev, topic]
      }
    })
    setPerPage(PER_PAGE)
  }
  
  const handleMoreProjects = () => {
    setPerPage(perPage + PER_PAGE)
  }

  useEffect(() => {
    loadProjects()
  }, [debouncedSearch, sort, topics, perPage])


  return (
    <section>
      <ProjectHeader />

      <SearchProjects
        setSearch={setSearch}
        setSort={setSort}
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