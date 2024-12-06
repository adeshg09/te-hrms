import { Card, CardContent } from "@/components/ui/card"
import { Users, Briefcase, Calendar, FolderKanban } from 'lucide-react'
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: number
  change: number
  updateDate: string
  type: 'employee' | 'applicant' | 'attendance' | 'projects'
  className?: string
}

export function StatsCard({ title, value, change, updateDate, type, className }: StatsCardProps) {
  const icons = {
    employee: Users,
    applicant: Briefcase,
    attendance: Calendar,
    projects: FolderKanban,
  }

  const Icon = icons[type]

  return (
    <Card className={cn("overflow-hidden bg-white border border-grey-50", className)}>
      <CardContent className="p-4 ">
        <div className="flex items-center gap-3 ">
          <div className="rounded-full bg-violet-50 p-2.5">
            <Icon className="h-5 w-5 text-primary-default" />
          </div>
          <span className="font-medium text-gray-600">{title}</span>
        </div>
        <div className="mt-6 flex items-center justify-between ">
          <span className="text-4xl font-bold text-secondary-default">{value.toLocaleString()}</span>
          <span
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-1 text-sm",
              change > 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
            )}
          >
            {change > 0 ? '▲' : '▼'}
            {Math.abs(change)}%
          </span>
        </div>
        
      </CardContent>
      <CardContent className="p-4 border-t border-grey-50">
        <div className="text-sm text-gray-500  ">
          Update: {updateDate}
        </div>
      </CardContent>
    </Card>
  )
}

