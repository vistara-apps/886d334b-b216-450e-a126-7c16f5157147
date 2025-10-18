import type { Metadata } from 'next'
import { Providers } from './components/Providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sentinel Stream - Verifiable Drone Inspection Data',
  description: 'Transparent, immutable, and community-verified industrial asset health records on Base',
  openGraph: {
    title: 'Sentinel Stream',
    description: 'Verifiable drone inspection data, onchain, with Farcaster expert insights',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_APP_URL}/splash-200x200.png`,
    'fc:frame:button:1': 'View Dashboard',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
