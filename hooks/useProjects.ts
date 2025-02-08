import { useState, useEffect, useRef } from "react"
import { fetchProjectsData } from "@/helpers/api"
import { ProjectResult } from "@/helpers/interfaces"
import { useDebounce } from "@/hooks/useDebounce"
import { PER_PAGE_INITIAL, SORT_TOPICS, MAIN_TOPICS } from "@/helpers/searchValues"

export function useProjects(initialProjects: ProjectResult | null) {
  const PER_PAGE: number = PER_PAGE_INITIAL
  const [projects, setProjects] = useState<ProjectResult | null>(initialProjects || null)
  const [perPage, setPerPage] = useState<number>(PER_PAGE)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<SORT_TOPICS>('starts')
  const [topics, setTopics] = useState<string[]>([MAIN_TOPICS[0]])
  const [debouncedSearch] = useDebounce(search, 600)
  const [loadMoreProjects, setLoadMoreProjects] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const isInitialRender = useRef(true)

  const loadProjects = async (resetProjects = true) => {
    const controller = new AbortController()

    try {
      setIsLoading(true)
      if (resetProjects) setProjects(null)

      const data = await fetchProjectsData({
        perPage,
        search: debouncedSearch,
        sort,
        topics,
        signal: controller.signal
      })

      if ('error' in data) setError(data.error as string)
      else setProjects(data)

    } catch (error) {
      console.error('Error loading more projects:', error)
      setError("Failed to load projects. Please try again later.")
    } finally {
      setIsLoading(false)
    }

    return () => controller.abort()
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

  const handleSelectChange = (value: SORT_TOPICS) => {
    setSort(value)
    setPerPage(PER_PAGE)
  }

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (loadMoreProjects) {
      loadProjects(false)
      setLoadMoreProjects(false)
    } else {
      loadProjects()
    }
  }, [debouncedSearch, sort, topics, perPage])

  return {
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
  }
}