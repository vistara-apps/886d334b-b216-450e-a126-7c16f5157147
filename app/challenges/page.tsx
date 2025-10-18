'use client'

import { useState } from 'react'
import { Trophy, Target, Clock, Users, Drone } from 'lucide-react'
import Link from 'next/link'

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  reward: string
  participants: number
  timeRemaining: string
  completed: boolean
}

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Crack Detection Master',
    description: 'Identify 20 cracks in wind turbine blade imagery',
    difficulty: 'medium',
    reward: '50 USDC',
    participants: 234,
    timeRemaining: '3 days',
    completed: false,
  },
  {
    id: '2',
    title: 'Corrosion Expert',
    description: 'Classify corrosion severity in pipeline sections',
    difficulty: 'hard',
    reward: '100 USDC',
    participants: 156,
    timeRemaining: '5 days',
    completed: false,
  },
  {
    id: '3',
    title: 'Beginner Inspector',
    description: 'Complete basic anomaly identification training',
    difficulty: 'easy',
    reward: '25 USDC',
    participants: 512,
    timeRemaining: '7 days',
    completed: true,
  },
]

export default function ChallengesPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const filteredChallenges = mockChallenges.filter(challenge => {
    if (filter === 'all') return true
    if (filter === 'active') return !challenge.completed
    return challenge.completed
  })

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
              <Link href="/challenges" className="text-primary font-semibold">
                Challenges
              </Link>
              <Link href="/futures" className="text-fg/70 hover:text-fg transition-colors">
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
          <h1 className="text-3xl font-bold mb-2">Gamified Challenges</h1>
          <p className="text-fg/70">
            Compete to identify defects, earn rewards, and build your reputation
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6 text-primary" />
              <span className="text-2xl font-bold">12</span>
            </div>
            <p className="text-sm text-fg/60">Challenges Completed</p>
          </div>
          <div className="bg-surface rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-6 h-6 text-accent" />
              <span className="text-2xl font-bold">87%</span>
            </div>
            <p className="text-sm text-fg/60">Accuracy Rate</p>
          </div>
          <div className="bg-surface rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-warning" />
              <span className="text-2xl font-bold">#42</span>
            </div>
            <p className="text-sm text-fg/60">Global Rank</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-surface text-fg/70 hover:bg-surface/80'
            }`}
          >
            All Challenges
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'active'
                ? 'bg-primary text-white'
                : 'bg-surface text-fg/70 hover:bg-surface/80'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'completed'
                ? 'bg-primary text-white'
                : 'bg-surface text-fg/70 hover:bg-surface/80'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </main>
    </div>
  )
}

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const difficultyColors = {
    easy: 'text-accent bg-accent/10',
    medium: 'text-warning bg-warning/10',
    hard: 'text-danger bg-danger/10',
  }

  return (
    <div className="bg-surface rounded-lg p-6 border border-fg/10 hover:border-primary/50 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
          <p className="text-sm text-fg/70 mb-4">{challenge.description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            difficultyColors[challenge.difficulty]
          }`}
        >
          {challenge.difficulty}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-fg/60 flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Reward
          </span>
          <span className="font-semibold text-primary">{challenge.reward}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-fg/60 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Participants
          </span>
          <span>{challenge.participants}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-fg/60 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Time Remaining
          </span>
          <span>{challenge.timeRemaining}</span>
        </div>
      </div>

      <button
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          challenge.completed
            ? 'bg-surface border border-fg/10 text-fg/60 cursor-not-allowed'
            : 'bg-primary text-white hover:bg-primary/90'
        }`}
        disabled={challenge.completed}
      >
        {challenge.completed ? 'Completed' : 'Start Challenge'}
      </button>
    </div>
  )
}
