import { fetchProjectsData } from "@/app/helpers/api"
import { ProjectResult } from "@/app/helpers/interfaces"

export async function getInitialProjectsData(): Promise<ProjectResult | null | {error: string}> {
  try {
    const initialData = await fetchProjectsData({
      perPage: 20,
      search: '',
      sort: 'stars',
      topics: ['blockchain'],
    })

    if ('error' in initialData) {
      console.error("Error fetching initial data:", initialData.error)
      return { error: 'Something went wrong getting the data. Please try again later.' }
    }

    return initialData
  } catch (error) {
    console.error("Error fetching initial data:", error)
    return { error: 'Something went wrong getting the data. Please try again later.'}
  }
}