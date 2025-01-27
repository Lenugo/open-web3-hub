import { ProjectDetailCardProps } from "@/app/helpers/interfaces";

export default function ProjectDetailCard({ children, title, description }: ProjectDetailCardProps) {
  return (
    <div className="bg-secondary/20 p-4 rounded-lg">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
        {children}
        <span>{title}</span>
      </div>
      <p className="text-lg font-semibold">{description}</p>
    </div>
  )
}