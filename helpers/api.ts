import { FetchProjectReleaseDataProps, FetchProjectsDataProps, ProjectResult, Release } from "./interfaces"
import { MAIN_TOPICS } from "@/helpers/searchValues"

const headers = { 'Content-Type': 'application/json' }

export const fetchProjectsData = async ({
  perPage = 10,
  search = '',
  sort = 'starts',
  topics = [MAIN_TOPICS[0]],
  signal
}: FetchProjectsDataProps) => {
  try {
    const topicsQuery = topics.map(topic => `topic:${topic}`).join('+')
    const searchQuery = search ? `${search}+in:name+` : ''
    const query = `${searchQuery}${topicsQuery}`
    
    const getProjects = await fetch(
      `${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/search/repositories?q=${query}&sort=${sort}&per_page=${perPage}`,
      { headers, signal }
    )

    if (!getProjects.ok) {
      return { error: `Error: Something went wrong getting the data. Please try again later.` }
    }

    const projectsResult: ProjectResult = await getProjects.json()
    return projectsResult
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return { error: 'Request cancelled' }
    }
    return { error }
  }
}

export const fetchProjectReleaseData = async ({
  organization,
  repo,
  signal
}: FetchProjectReleaseDataProps) => {
  try {
    const getProject = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/repos/${organization}/${repo}/releases`, { headers, signal })
    
    if (!getProject.ok) {
      return { error: `Error: Something went wrong getting the data. Please try again later.` }
    }

    const projectResult: Release[] = await getProject.json()
    return projectResult[0] ?? []
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return { error: 'Request cancelled' }
    }
    return { error }
  }
}
