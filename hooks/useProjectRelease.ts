import { useState } from "react"
import { fetchProjectReleaseData } from "@/helpers/api"
import { Release, Project } from "@/helpers/interfaces"

export function useProjectRelease(project: Project) {
  const [releaseData, setReleaseData] = useState<Release | null>(null)
  const [isReleaseLoading, setIsReleaseLoading] = useState<boolean>(false)

  const fetchReleaseData = async () => {
    const controller = new AbortController()

    try {
      setIsReleaseLoading(true)
      const result = await fetchProjectReleaseData({
        organization: project.owner.login,
        repo: project.name,
        signal: controller.signal
      })
      if (result && 'error' in result) {
        throw new Error("Failed to fetch project release data.")
      }
      setReleaseData(result as Release)
    } catch (error) {
      console.log("error :>> ", error)
      throw new Error("Failed to fetch project release data.")
    } finally {
      setIsReleaseLoading(false)
    }

    return () => controller.abort()
  }

  return { releaseData, isReleaseLoading, fetchReleaseData }
}