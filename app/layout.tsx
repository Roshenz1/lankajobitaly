import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lanka Job Italy – රැකියා ද්වාරය',
  description:
    'Sri Lankan job portal in Italy. Find Elder Care, Cleaning, Babysitting and Factory jobs. Free Europass CV generator.',
  openGraph: {
    title: 'Lanka Job Italy – Jobs for Sri Lankans in Italy',
    description: 'ඉතාලියේ ශ්‍රී ලාංකිකයන් සඳහා රැකියා | Lavori per Sri Lankesi in Italia',
    url: 'https://lankajobitaly.com',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
