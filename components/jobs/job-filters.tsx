'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { type JobType } from '@/lib/types'

interface JobFiltersProps {
  selectedType?: JobType
  selectedCity?: string
  onTypeChange?: (type: JobType | undefined) => void
  onCityChange?: (city: string | undefined) => void
}

const JOB_TYPES: { value: JobType; label: string }[] = [
  { value: 'elder', label: 'Elder Care' },
  { value: 'clean', label: 'Cleaning' },
  { value: 'baby', label: 'Babysitting' },
  { value: 'factory', label: 'Factory' },
]

const CITIES = ['All Cities', 'Rome', 'Milan', 'Turin', 'Florence', 'Naples']

export function JobFilters({
  selectedType,
  selectedCity,
  onTypeChange,
  onCityChange,
}: JobFiltersProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-ink mb-3">Job Type</h3>
          <div className="flex flex-wrap gap-2">
            {JOB_TYPES.map((type) => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? 'default' : 'outline'}
                size="sm"
                onClick={() =>
                  onTypeChange?.(
                    selectedType === type.value ? undefined : type.value
                  )
                }
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-ink mb-3">City</h3>
          <div className="space-y-2">
            {CITIES.map((city) => (
              <label
                key={city}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="city"
                  value={city}
                  checked={selectedCity === city}
                  onChange={(e) =>
                    onCityChange?.(
                      e.target.value === 'All Cities' ? undefined : e.target.value
                    )
                  }
                  className="cursor-pointer"
                />
                <span className="text-sm text-ink">{city}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
