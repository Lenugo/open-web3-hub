import { ProjectDetailCardProps } from "@/app/helpers/interfaces";

export default function ProjectDetailCard({ children, title, description }: ProjectDetailCardProps) {
  return (
    <div className="bg-secondary/20 p-4 rounded-lg">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
        {children}
        <span className="text-nowrap">{title}</span>
      </div>
      <span className="text-lg font-semibold truncate">{description}</span>
    </div>
  )
}