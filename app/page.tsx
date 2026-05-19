'use client'

import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import Link from 'next/link'
import { Briefcase, MessageSquare, Users, Zap } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="container-gutter section-padding bg-gradient-to-b from-blue-light to-transparent">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-ink mb-6 fade-up">
              Sri Lankan Community in Italy
            </h1>
            <p className="text-xl text-ink-2 mb-8 fade-up-2">
              Find jobs, connect with community, and grow together.
              Your gateway to opportunities in Italy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-up-3">
              <Link href="/jobs">
                <Button size="lg" className="bg-red-primary hover:bg-red-dark w-full sm:w-auto">
                  <Briefcase className="mr-2" size={20} />
                  Browse Jobs
                </Button>
              </Link>
              <Link href="/forum">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <MessageSquare className="mr-2" size={20} />
                  Join Forum
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container-gutter section-padding">
          <h2 className="text-3xl font-bold text-center text-ink mb-12">
            What We Offer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                title: 'Job Listings',
                description: 'Find elder care, cleaning, babysitting, and factory jobs tailored for you.',
              },
              {
                icon: Users,
                title: 'Community Forum',
                description: 'Connect with Sri Lankans, share experiences, and get advice from others.',
              },
              {
                icon: MessageSquare,
                title: 'Direct Chat',
                description: 'Message other community members and build meaningful connections.',
              },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-lg border border-line hover:shadow-card transition-shadow fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <feature.icon className="text-blue-primary mb-4" size={32} />
                <h3 className="text-xl font-bold text-ink mb-2">{feature.title}</h3>
                <p className="text-ink-3">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container-gutter section-padding bg-gradient-to-r from-red-light to-blue-light rounded-lg">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Zap className="text-yellow-primary" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-ink mb-4">
              Site Modernization in Progress
            </h2>
            <p className="text-ink-2 mb-6">
              We're rebuilding our platform with modern tools for better performance,
              AI-powered graphics, community features, and more. Check back soon for
              forum and chat capabilities!
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-sm font-medium text-ink border border-line">
                ✨ Modern Design
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-sm font-medium text-ink border border-line">
                🤖 AI Graphics
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-sm font-medium text-ink border border-line">
                💬 Real-time Chat
              </span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container-gutter py-8 border-t border-line text-center text-ink-3 text-sm">
          <p>© 2026 Lanka Job Italy. All rights reserved.</p>
        </footer>
      </main>
    </>
  )
}
