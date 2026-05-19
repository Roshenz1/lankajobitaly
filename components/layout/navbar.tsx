'use client'

import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-line">
      <div className="container-gutter h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-ink">
          Lanka Job Italy
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link href="/jobs" className="text-ink-2 hover:text-ink transition">
            Jobs
          </Link>
          <Link href="/restaurants" className="text-ink-2 hover:text-ink transition">
            Restaurants
          </Link>
          <Link href="/forum" className="text-ink-2 hover:text-ink transition">
            Forum
          </Link>
          <Link href="/entertainment" className="text-ink-2 hover:text-ink transition">
            Entertainment
          </Link>
          <Button size="sm" variant="outline">
            Sign In
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-line">
          <div className="container-gutter py-4 flex flex-col gap-4">
            <Link href="/jobs" className="text-ink hover:text-ink-2">
              Jobs
            </Link>
            <Link href="/restaurants" className="text-ink hover:text-ink-2">
              Restaurants
            </Link>
            <Link href="/forum" className="text-ink hover:text-ink-2">
              Forum
            </Link>
            <Link href="/entertainment" className="text-ink hover:text-ink-2">
              Entertainment
            </Link>
            <Button size="sm" variant="outline" className="w-full">
              Sign In
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
