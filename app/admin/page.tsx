'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit2, Trash2, Plus, LogOut, BarChart3, Users, Briefcase, MessageSquare } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Job {
  id: number
  title: string
  company: string
  city: string
  type: string
}

const MOCK_JOBS: Job[] = [
  { id: 1, title: 'Caregiver for Elderly', company: 'Care Services Italia', city: 'Rome', type: 'elder' },
  { id: 2, title: 'Housecleaning Staff', company: 'Clean Pro', city: 'Milan', type: 'clean' },
  { id: 3, title: 'Nanny - English Speaking', company: 'Family Care', city: 'Florence', type: 'baby' },
]

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'jobs' | 'restaurants' | 'forum'>('dashboard')

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      window.location.href = '/admin/login'
    } else {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    window.location.href = '/'
  }

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-line">
        <div className="container-gutter h-16 flex items-center justify-between">
          <div className="text-xl font-bold text-ink">Admin Dashboard</div>
          <Button variant="ghost" onClick={handleLogout} className="flex gap-2">
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </header>

      <div className="container-gutter py-8">
        {/* Sidebar Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <Card className="hover:shadow-hover transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Briefcase size={18} className="text-blue-primary" />
                Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-ink">{jobs.length}</div>
              <p className="text-xs text-ink-3 mt-1">Active listings</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-hover transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users size={18} className="text-green-primary" />
                Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-ink">1.2K</div>
              <p className="text-xs text-ink-3 mt-1">Registered members</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-hover transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MessageSquare size={18} className="text-yellow-primary" />
                Forum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-ink">342</div>
              <p className="text-xs text-ink-3 mt-1">Posts (Phase 2)</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-hover transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BarChart3 size={18} className="text-red-primary" />
                Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-ink">8.4K</div>
              <p className="text-xs text-ink-3 mt-1">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-line">
          {['dashboard', 'jobs', 'restaurants', 'forum'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? 'border-blue-primary text-blue-primary font-medium'
                  : 'border-transparent text-ink-2 hover:text-ink'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
                <CardDescription>Platform overview and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-ink">Database Status</p>
                    <p className="text-sm text-ink-3">Phase 2: Supabase PostgreSQL ready to integrate</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">API Integration</p>
                    <p className="text-sm text-ink-3">Next.js API routes configured and ready</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">Authentication</p>
                    <p className="text-sm text-ink-3">Supabase Auth ready for implementation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-ink">Job Management</h2>
              <Button className="flex gap-2 bg-blue-primary hover:bg-blue-primary/90">
                <Plus size={18} />
                Add Job
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="text-left text-sm text-ink-3 border-b border-line">
                      <tr>
                        <th className="pb-3 font-medium">Title</th>
                        <th className="pb-3 font-medium">Company</th>
                        <th className="pb-3 font-medium">City</th>
                        <th className="pb-3 font-medium">Type</th>
                        <th className="pb-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {jobs.map((job) => (
                        <tr key={job.id} className="hover:bg-bg transition-colors">
                          <td className="py-3 font-medium text-ink">{job.title}</td>
                          <td className="py-3 text-ink-2">{job.company}</td>
                          <td className="py-3 text-ink-2">{job.city}</td>
                          <td className="py-3">
                            <Badge variant="secondary" className="text-xs capitalize">
                              {job.type}
                            </Badge>
                          </td>
                          <td className="py-3 flex gap-2">
                            <Button variant="outline" size="sm" className="flex gap-1">
                              <Edit2 size={14} />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="flex gap-1 text-red-primary hover:text-red-dark">
                              <Trash2 size={14} />
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'restaurants' && (
          <Card>
            <CardHeader>
              <CardTitle>Restaurant Management</CardTitle>
              <CardDescription>Phase 2: Database integration required</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-ink-2">Restaurant management features will be available after database setup.</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'forum' && (
          <Card>
            <CardHeader>
              <CardTitle>Forum Moderation</CardTitle>
              <CardDescription>Phase 2: Real-time forum coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-ink-2">Forum moderation tools will be available once real-time infrastructure is set up with Supabase.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
