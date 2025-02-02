import { FetchProjectReleaseDataProps, FetchProjectsDataProps, ProjectResult } from "./interfaces"
import { mainTopics } from "@/components/SearchProjects"

const headers = { 'Content-Type': 'application/json' }

export const fetchProjectsData = async ({ perPage = 10, search = '', sort = 'stars', topics = [mainTopics[0]] }: FetchProjectsDataProps = {}) => {
  try {
    const topicsQuery = topics.map(topic => `topic:${topic}`).join('+')
    const searchQuery = search ? `${search}+in:name+` : ''
    const query = `${searchQuery}${topicsQuery}`
    
    const getProjects = await fetch(
      `${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/search/repositories?q=${query}&sort=${sort}&per_page=${perPage}`,
      { headers }
    )
    if (!getProjects.ok) {
      return { error: `Error: Something went wrong getting the data. Please try again later.` }
    }
    const projectsResult: ProjectResult = await getProjects.json()
    return projectsResult
  } catch (error) {
    console.log("error :>> ", error)
    return { error: "Something went wrong getting the data. Please try again later." }
  }
}

export const fetchProjectReleaseData = async ({ organization, repo }: FetchProjectReleaseDataProps) => {
  try {
    const getProject = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/repos/${organization}/${repo}/releases`, { headers })
    if (!getProject.ok) {
      return { error: `Error: Something went wrong getting the data. Please try again later.` }
    }
    const projectResult = await getProject.json()
    
    return projectResult[0] ?? []
  } catch (error) {
    console.log("error :>> ", error)
    return { error: "Something went wrong getting the data. Please try again later." }
  }
}
