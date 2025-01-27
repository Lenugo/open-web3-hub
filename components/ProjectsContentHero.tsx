'use client'

import { fetchProjectsData } from "@/app/helpers/api"
import ProjectCard from "@/components/ProjectCard"
import { Project, ProjectResult } from "@/app/helpers/interfaces"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProjectCardSkeleton } from "./Skeleton"

export default function ProjectsContentHero() {
  const [projects, setProjects] = useState<ProjectResult | null>(null)
  const [perPage, setPerPage] = useState(10)
  const [isLoading, setIsLoading] = useState(false)

  const loadProjects = async () => {
    try {
      setIsLoading(true)
      const newPerPage = perPage + 20
      const data = await fetchProjectsData({ perPage: newPerPage })
      setProjects(data)
      setPerPage(newPerPage)
    } catch (error) {
      console.error('Error loading more projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  return (
    <>
      <div className="mb-6">
        <p>
          results: {projects?.total_count ?? 0}
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
        {!projects ? (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </>
        ) : (
          projects.items.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>

      {projects && (
        <Button
          className="w-full my-6 text-xl bg-blue-400 hover:bg-blue-600"
          onClick={loadProjects}
          disabled={isLoading || projects.items.length >= projects.total_count}
        >
          {isLoading ? 'Loading...' :
            projects.items.length >= projects.total_count ? 'No more projects' : 'Load more'}
        </Button>
      )}
    </>
  )
}