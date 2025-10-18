'use client'

import { TrendingUp, DollarSign, Calendar, BarChart3, Drone } from 'lucide-react'
import Link from 'next/link'

interface Future {
  id: string
  assetName: string
  predictedEvent: string
  predictedDate: string
  tokenPrice: string
  totalStaked: string
  participants: number
  confidence: number
}

const mockFutures: Future[] = [
  {
    id: '1',
    assetName: 'Wind Turbine Alpha-01',
    predictedEvent: 'Next Blade Replacement',
    predictedDate: '2024-06-15',
    tokenPrice: '0.85 USDC',
    totalStaked: '12,450 USDC',
    participants: 87,
    confidence: 82,
  },
  {
    id: '2',
    assetName: 'Pipeline Section B-12',
    predictedEvent: 'Major Maintenance',
    predictedDate: '2024-04-20',
    tokenPrice: '1.20 USDC',
    totalStaked: '8,920 USDC',
    participants: 64,
    confidence: 75,
  },
  {
    id: '3',
    assetName: 'Bridge Structure C-45',
    predictedEvent: 'Structural Reinforcement',
    predictedDate: '2024-03-10',
    tokenPrice: '1.50 USDC',
    totalStaked: '15,780 USDC',
    participants: 112,
    confidence: 88,
  },
]

export default function FuturesPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-surface/50 border-b border-fg/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Drone className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">Sentinel Stream</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-fg/70 hover:text-fg transition-colors">
                Dashboard
              </Link>
              <Link href="/anomalies" className="text-fg/70 hover:text-fg transition-colors">
                Anomalies
              </Link>
              <Link href="/challenges" className="text-fg/70 hover:text-fg transition-colors">
                Challenges
              </Link>
              <Link href="/futures" className="text-primary font-semibold">
                Futures
              </Link>
            </nav>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Predictive Maintenance Futures</h1>
          <p className="text-fg/70">
            Stake on predicted maintenance events and manage asset risk through tokenized futures
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">How Predictive Futures Work</h3>
              <p className="text-sm text-fg/80">
                Stake tokens on predicted maintenance events based on verified inspection data. 
                When events occur as predicted, token holders receive proportional rewards from the payout pool. 
                This creates transparent financial instruments for industrial asset risk management.
              </p>
            </div>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6 text-primary" />
              <span className="text-2xl font-bold">$2,450</span>
            </div>
            <p className="text-sm text-fg/60">Total Staked</p>
          </div>
          <div className="bg-surface rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6 text-accent" />
              <span className="text-2xl font-bold">5</span>
            </div>
            <p className="text-sm text-fg/60">Active Positions</p>
          </div>
          <div className="bg-surface rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-warning" />
              <span className="text-2xl font-bold">+12.5%</span>
            </div>
            <p className="text-sm text-fg/60">Portfolio Return</p>
          </div>
        </div>

        {/* Futures Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockFutures.map((future) => (
            <FutureCard key={future.id} future={future} />
          ))}
        </div>
      </main>
    </div>
  )
}

function FutureCard({ future }: { future: Future }) {
  return (
    <div className="bg-surface rounded-lg p-6 border border-fg/10 hover:border-primary/50 transition-all duration-200">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-1">{future.assetName}</h3>
        <p className="text-sm text-fg/60">{future.predictedEvent}</p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-fg/60 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Predicted Date
          </span>
          <span>{new Date(future.predictedDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-fg/60">Token Price</span>
          <span className="font-semibold text-primary">{future.tokenPrice}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-fg/60">Total Staked</span>
          <span>{future.totalStaked}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-fg/60">Participants</span>
          <span>{future.participants}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-fg/60">Confidence</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-fg/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent"
                style={{ width: `${future.confidence}%` }}
              />
            </div>
            <span className="font-semibold">{future.confidence}%</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold">
          Stake Tokens
        </button>
        <button className="px-4 py-3 bg-bg border border-fg/10 rounded-lg hover:bg-surface transition-colors">
          <BarChart3 className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
