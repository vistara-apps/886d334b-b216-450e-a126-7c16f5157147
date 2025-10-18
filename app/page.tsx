'use client'

import { useEffect, useState } from 'react'
import { Drone, Shield, Users, TrendingUp, ChevronRight, Activity } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="animate-pulse-slow">
          <Drone className="w-16 h-16 text-primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Drone className="w-20 h-20 text-primary" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Sentinel Stream
            </h1>
            <p className="text-xl sm:text-2xl text-fg/80 mb-4 max-w-3xl mx-auto">
              Verifiable drone inspection data, onchain, with Farcaster expert insights
            </p>
            <p className="text-base sm:text-lg text-fg/60 mb-12 max-w-2xl mx-auto">
              Transparent, immutable, and community-verified records of industrial asset health
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Launch Dashboard
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/anomalies"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-fg bg-surface rounded-lg hover:bg-surface/80 transition-all duration-200"
              >
                Explore Anomalies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Built for Trust & Transparency
            </h2>
            <p className="text-lg text-fg/70 max-w-2xl mx-auto">
              Leveraging Base blockchain and Farcaster social primitives for verifiable asset health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Verified Data"
              description="Immutable, timestamped inspection records on Base blockchain"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Expert Validation"
              description="Farcaster community validates anomalies and provides insights"
            />
            <FeatureCard
              icon={<Activity className="w-8 h-8" />}
              title="Real-time Monitoring"
              description="Live asset health tracking with instant anomaly detection"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Predictive Futures"
              description="Tokenized maintenance predictions for risk management"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard value="1,247" label="Assets Monitored" />
            <StatCard value="8,932" label="Inspections Verified" />
            <StatCard value="342" label="Expert Validators" />
            <StatCard value="99.8%" label="Uptime" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/20 to-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Asset Management?
          </h2>
          <p className="text-lg text-fg/80 mb-8 max-w-2xl mx-auto">
            Join asset owners, inspectors, and experts building the future of verifiable industrial data
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started Now
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Drone className="w-6 h-6 text-primary" />
              <span className="font-semibold">Sentinel Stream</span>
            </div>
            <div className="flex gap-6 text-sm text-fg/60">
              <Link href="/docs" className="hover:text-fg transition-colors">
                Documentation
              </Link>
              <Link href="/about" className="hover:text-fg transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-fg transition-colors">
                Contact
              </Link>
            </div>
            <div className="text-sm text-fg/60">
              Built on Base • Powered by Farcaster
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-surface rounded-lg p-6 hover:bg-surface/80 transition-all duration-200 hover:shadow-lg">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-fg/70 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{value}</div>
      <div className="text-sm text-fg/70">{label}</div>
    </div>
  )
}
