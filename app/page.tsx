import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-bg to-white">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-line">
        <div className="container-gutter h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-ink">Lanka Job Italy</div>
          <div className="flex gap-4">
            <Button variant="ghost">Home</Button>
            <Button>Sign In</Button>
          </div>
        </div>
      </nav>

      <div className="container-gutter section-padding text-center">
        <div className="max-w-2xl mx-auto fade-up">
          <h1 className="text-5xl font-bold text-ink mb-4">
            Sri Lankan Community in Italy
          </h1>
          <p className="text-xl text-ink-3 mb-8">
            Find jobs, connect with community, share resources
          </p>

          <div className="inline-flex gap-4">
            <Button size="lg" className="bg-red-primary hover:bg-red-dark">
              Browse Jobs
            </Button>
            <Button size="lg" variant="outline">
              Join Forum
            </Button>
          </div>
        </div>

        <div className="mt-16 p-8 bg-blue-light rounded-lg border border-line">
          <h2 className="text-2xl font-bold text-ink mb-2">
            Site Modernization in Progress
          </h2>
          <p className="text-ink-2">
            We're rebuilding our platform with modern tools for better performance,
            graphics, and community features. Check back soon!
          </p>
        </div>
      </div>
    </main>
  )
}
