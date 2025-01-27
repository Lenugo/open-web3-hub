
// const params = {
//   q: 'topic:javascript+topic:react',
//   sort: 'stars',
//   order: 'desc',
// }

import { FetchProjectReleaseDataProps, ProjectResult } from "./interfaces";

const headers = { 'Content-Type': 'application/json' }
export const fetchProjectsData = async () => {

  try {
    const getProjects = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/search/repositories?q=topic:blockchain&per_page=20`, { headers })
    const projectsResult: ProjectResult = await getProjects.json()

    return projectsResult
  } catch (error) {
    console.log("error :>> ", error);
    throw new Error("Failed to fetch projects data.")
  }
};

export const fetchProjectReleaseData = async ({ organization, repo }: FetchProjectReleaseDataProps) => {
  try {
    const getProject = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/repos/${organization}/${repo}/releases`, { headers })
    const projectResult = await getProject.json()
    
    return projectResult[0] ?? []
  } catch (error) {
    console.log("error :>> ", error);
    throw new Error("Failed to fetch projects data.")
  }
}