import { Navbar } from '@/components/layout/navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function ForumPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg">
        <section className="container-gutter section-padding">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-ink mb-4">Community Forum</h1>
            <p className="text-lg text-ink-2 mb-8">
              Connect with other Sri Lankans in Italy. Ask questions, share experiences,
              and build community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Jobs & Work', posts: 234 },
              { title: 'General Discussion', posts: 567 },
              { title: 'Local Tips', posts: 189 },
            ].map((category) => (
              <Card key={category.title} className="p-6 hover:shadow-hover transition-shadow">
                <h3 className="font-bold text-lg text-ink mb-2">{category.title}</h3>
                <p className="text-sm text-ink-3 mb-4">{category.posts} posts</p>
                <Button variant="outline" size="sm">
                  View Threads
                </Button>
              </Card>
            ))}
          </div>

          <Card className="p-8 text-center bg-blue-light">
            <h2 className="text-2xl font-bold text-ink mb-3">Coming Soon</h2>
            <p className="text-ink-2">
              The forum is being redesigned with a modern interface.
              Full threading, real-time updates, and moderation tools coming in Phase 2.
            </p>
          </Card>
        </section>
      </main>
    </>
  )
}
