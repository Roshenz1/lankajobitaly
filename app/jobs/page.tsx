'use client'

import { Navbar } from '@/components/layout/navbar'
import { JobCard } from '@/components/jobs/job-card'
import { JobFilters } from '@/components/jobs/job-filters'
import { type Job, type JobType } from '@/lib/types'
import { useState } from 'react'

// Mock data - will be replaced with API calls
const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: 'Caregiver for Elderly',
    company: 'Care Services Italia',
    city: 'Rome',
    type: 'elder',
    salary: '€1,200 - €1,500/month',
    description: 'Looking for compassionate caregiver for 24/7 live-in position.',
    isPermanent: true,
    isNew: true,
    isUrgent: false,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: 'Housecleaning Staff',
    company: 'Clean Pro',
    city: 'Milan',
    type: 'clean',
    salary: '€1,000 - €1,300/month',
    description: 'Daily housecleaning services for residential clients.',
    isPermanent: true,
    isNew: false,
    isUrgent: true,
    isFeatured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: 'Nanny - English Speaking',
    company: 'Family Care',
    city: 'Florence',
    type: 'baby',
    salary: '€1,100 - €1,400/month',
    description: 'Experienced nanny needed for 2 children, flexible hours.',
    isPermanent: true,
    isNew: true,
    isUrgent: false,
    isFeatured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function JobsPage() {
  const [selectedType, setSelectedType] = useState<JobType | undefined>()
  const [selectedCity, setSelectedCity] = useState<string | undefined>()

  const filteredJobs = MOCK_JOBS.filter((job) => {
    if (selectedType && job.type !== selectedType) return false
    if (selectedCity && job.city !== selectedCity) return false
    return true
  })

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg">
        {/* Hero Section */}
        <section className="container-gutter section-padding bg-gradient-to-br from-blue-light to-transparent">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4 fade-up">
              Job Opportunities in Italy
            </h1>
            <p className="text-lg text-ink-2 fade-up-2">
              Find the best jobs for Sri Lankans in Italy. Browse positions in
              elder care, cleaning, babysitting, and factory work.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="container-gutter py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <JobFilters
                selectedType={selectedType}
                selectedCity={selectedCity}
                onTypeChange={setSelectedType}
                onCityChange={setSelectedCity}
              />
            </aside>

            {/* Jobs Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-ink">
                  {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''}
                </h2>
              </div>

              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="fade-up">
                      <JobCard job={job} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-ink-3 text-lg">No jobs found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
