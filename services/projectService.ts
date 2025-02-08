import { fetchProjectsData } from "@/helpers/api"
import { ProjectResult } from "@/helpers/interfaces"
import { MAIN_TOPICS, PER_PAGE_INITIAL } from "@/helpers/searchValues"

export async function getInitialProjectsData(): Promise<ProjectResult | null | {error: string}> {
  try {
    const initialData = await fetchProjectsData({
      perPage: PER_PAGE_INITIAL,
      search: '',
      sort: 'starts',
      topics: [MAIN_TOPICS[0]],
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