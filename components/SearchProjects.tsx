'use client'

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { XIcon, XCircleIcon } from "lucide-react"
import { SearchReposSkeleton } from "./Skeleton"
import { SearchProjectsProps } from "@/helpers/interfaces"
import { MAIN_TOPICS } from "@/helpers/searchValues"

export default function SearchProjects({ 
  search,
  setSearch,
  sort,
  handleSelectChange,
  topics,
  isLoading,
  totalCount,
  toggleTopic
}: SearchProjectsProps) {
  const itemsToSelect = [
    { id: 'stars', label: 'Stars' },
    { id: 'updated', label: 'Last Updated'}
  ]

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="relative w-full">
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10"
          />
          {search && (
            <XCircleIcon
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            />
          )}
        </div>
        
        <Select 
          value={sort} 
          onValueChange={handleSelectChange}
          name="sort-projects"
        >
          <SelectTrigger 
            className="w-full md:w-[180px]"
            aria-label="Sort projects by"
          >
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {itemsToSelect.map(item => (
              <SelectItem 
                key={item.id} 
                value={item.id}
                aria-label={`Sort by ${item.label}`}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

        <div className="flex flex-wrap gap-2">
          {MAIN_TOPICS.map(topic => (
            <Badge
              key={topic}
              variant={topics.includes(topic) ? 'default' : 'outline'}
              className="cursor-pointer p-2 hover:dark:bg-primary"
              onClick={() => toggleTopic(topic)}
            >
              {topic}
              {topics.includes(topic) && (
                <XIcon className="ml-1 h-3 w-3" />
              )}
            </Badge>
          ))}
        </div>

        <h3 className="text-sm text-muted-foreground">
          {(isLoading) ? <SearchReposSkeleton /> : `Found ${totalCount.toLocaleString()} repositories`}
        </h3>
      </div>
  )
}