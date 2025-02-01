'use client'

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { XIcon, XCircleIcon } from "lucide-react"
import { SearchReposSkeleton } from "./Skeleton"
import { SearchProjectsProps } from "@/app/helpers/interfaces"

export const mainTopics = ['blockchain', 'web3', 'dapps', 'ai', 'artificial-intelligence', 'machine-learning', 'artificial-neural-network', 'solidity', 'ethereum', 'solana', 'cardano', 'nft', 'cryptocurrency', 'wallet', 'erc-20', 'erc-721', 'smart-contract', 'smart-contract-tools']

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
          
          <Select value={sort} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stars">Stars</SelectItem>
              <SelectItem value="updated">Last Updated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          {mainTopics.map(topic => (
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