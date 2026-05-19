import { Navbar } from '@/components/layout/navbar'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Film, Music, Tv } from 'lucide-react'

export default function EntertainmentPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg">
        <section className="container-gutter section-padding">
          <h1 className="text-4xl font-bold text-ink mb-8">Entertainment</h1>

          <Tabs defaultValue="tv" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="tv" className="flex items-center gap-2">
                <Tv size={18} />
                <span className="hidden sm:inline">TV Channels</span>
              </TabsTrigger>
              <TabsTrigger value="karaoke" className="flex items-center gap-2">
                <Music size={18} />
                <span className="hidden sm:inline">Karaoke</span>
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center gap-2">
                <Film size={18} />
                <span className="hidden sm:inline">News</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tv">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="p-4 bg-white">
                    <div className="bg-ink-2 aspect-video rounded-md mb-4 flex items-center justify-center">
                      <Tv size={48} className="text-white" />
                    </div>
                    <h3 className="font-bold text-ink">Channel {i}</h3>
                    <p className="text-sm text-ink-3">Live streaming content</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="karaoke">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="p-4 bg-white">
                    <div className="bg-ink-2 aspect-video rounded-md mb-4 flex items-center justify-center">
                      <Music size={48} className="text-white" />
                    </div>
                    <h3 className="font-bold text-ink">Song {i}</h3>
                    <p className="text-sm text-ink-3">Sinhala classic</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="news">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-6 bg-white">
                    <h3 className="font-bold text-lg text-ink mb-2">
                      News Headline {i}
                    </h3>
                    <p className="text-ink-2">
                      Latest updates from Sri Lanka and Italy community...
                    </p>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Card className="mt-12 p-8 text-center bg-green-light">
            <h2 className="text-2xl font-bold text-ink mb-3">Enhanced Coming Soon</h2>
            <p className="text-ink-2">
              Entertainment section is being redesigned with better video playback,
              community uploads, and AI-generated content recommendations.
            </p>
          </Card>
        </section>
      </main>
    </>
  )
}
