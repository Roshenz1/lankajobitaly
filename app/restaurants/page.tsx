import { Navbar } from '@/components/layout/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, MapPin } from 'lucide-react'

interface Restaurant {
  id: number
  name: string
  city: string
  rating: number
  reviewCount: number
  description: string
  image?: string
}

const RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: 'Sri Lanka Kitchen',
    city: 'Rome',
    rating: 4.8,
    reviewCount: 142,
    description: 'Authentic Sri Lankan cuisine in the heart of Rome',
  },
  {
    id: 2,
    name: 'Colombo Express',
    city: 'Milan',
    rating: 4.6,
    reviewCount: 98,
    description: 'Quick and delicious Sri Lankan fast food',
  },
  {
    id: 3,
    name: 'Spice Garden',
    city: 'Florence',
    rating: 4.9,
    reviewCount: 167,
    description: 'Premium Sri Lankan dining experience',
  },
  {
    id: 4,
    name: 'Island Flavors',
    city: 'Turin',
    rating: 4.5,
    reviewCount: 76,
    description: 'Traditional curry and rice specialties',
  },
]

export default function RestaurantsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg">
        <section className="container-gutter section-padding bg-gradient-to-br from-green-light to-transparent">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4 fade-up">
              Sri Lankan Restaurants
            </h1>
            <p className="text-lg text-ink-2 fade-up-2">
              Find authentic Sri Lankan cuisine across Italy. Community-reviewed
              restaurants with real ratings from people like you.
            </p>
          </div>
        </section>

        <section className="container-gutter py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESTAURANTS.map((restaurant, i) => (
              <Card key={restaurant.id} className="fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="bg-ink-2 aspect-video rounded-t-md flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-3xl">🍛</div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{restaurant.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin size={16} />
                    {restaurant.city}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-ink-2 mb-4">{restaurant.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < Math.floor(restaurant.rating)
                                ? 'fill-yellow-primary text-yellow-primary'
                                : 'text-line'
                            }
                          />
                        ))}
                      </div>
                      <span className="font-bold text-ink">{restaurant.rating}</span>
                      <span className="text-sm text-ink-3">({restaurant.reviewCount})</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline" size="sm">
                    View Reviews
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
