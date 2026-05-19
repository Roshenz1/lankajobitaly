import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { type Job } from '@/lib/types'
import { MapPin, Briefcase, AlertCircle } from 'lucide-react'

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const typeLabels: Record<string, string> = {
    elder: 'Elder Care',
    clean: 'Cleaning',
    baby: 'Babysitting',
    factory: 'Factory',
  }

  return (
    <Card className="hover:shadow-hover transition-shadow cursor-pointer h-full">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-lg text-ink leading-tight">
              {job.title}
            </h3>
            <p className="text-sm text-ink-3">{job.company}</p>
          </div>
          <div className="flex gap-2">
            {job.isUrgent && (
              <Badge variant="destructive" className="flex gap-1">
                <AlertCircle size={12} />
                <span>Urgent</span>
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{typeLabels[job.type]}</Badge>
          {job.isPermanent && (
            <Badge variant="success">Permanent</Badge>
          )}
          {job.isFeatured && (
            <Badge variant="warning">Featured</Badge>
          )}
        </div>

        <div className="space-y-2 text-sm text-ink-2">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-ink-3" />
            <span>{job.city}</span>
          </div>
          {job.salary && (
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-ink-3" />
              <span>{job.salary}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-ink-2 mt-3 line-clamp-2">
          {job.description}
        </p>

        {job.isNew && (
          <div className="mt-4 pt-3 border-t border-line text-xs text-blue-primary font-medium">
            ✨ New listing
          </div>
        )}
      </CardContent>
    </Card>
  )
}
