'use client'

import { fetchProjectsData } from "@/app/helpers/api"
import { ProjectResult } from "@/app/helpers/interfaces"
import { useState, useEffect } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import ScrollToTop from "./ScrollToTop"
import SearchProjects, { mainTopics } from "./SearchProjects"
import CardContainer from "./CardContainer"
import ProjectHeader from "./ProjectHeader"
import ErrorView from "./ErrorView"

export default function ProjectsWrapper() {
  const PER_PAGE: number = 20
  const [projects, setProjects] = useState<ProjectResult | null>(null)
  const [perPage, setPerPage] = useState<number>(PER_PAGE)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<'stars' | 'updated'>('stars')
  const [topics, setTopics] = useState<string[]>([mainTopics[0]])
  const [debouncedSearch] = useDebounce(search, 600)
  const [loadMoreProjects, setLoadMoreProjects] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const loadProjects = async (resetProjects = true) => {
    try {
      setIsLoading(true)
      if (resetProjects) setProjects(null)
      const data = await fetchProjectsData({
        perPage: perPage,
        search: debouncedSearch,
        sort,
        topics,
      })
      if ('error' in data) setError(data.error)
      else setProjects(data) 
      
    } catch (error) {
      console.error('Error loading more projects:', error)
      setError("Failed to load projects. Please try again later.")
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
    setLoadMoreProjects(true)
    setPerPage(perPage + PER_PAGE)
  }

  const handleSelectChange = (value: 'stars' | 'updated') => {
    setSort(value)
    setPerPage(PER_PAGE)
  }

  useEffect(() => {
    if (loadMoreProjects) {
      loadProjects(false)
      setLoadMoreProjects(false)
    } else {
      loadProjects()
    }
  }, [debouncedSearch, sort, topics, perPage])


  return (
    <section>
      {error ? (
        <ErrorView message={error} />
      ) : (
        <>
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
        </>
      )}
    </section>
  )
}