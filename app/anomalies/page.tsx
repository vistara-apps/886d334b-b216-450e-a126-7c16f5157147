'use client'

import { useState } from 'react'
import { AlertTriangle, ThumbsUp, MessageSquare, ExternalLink, Drone } from 'lucide-react'
import Link from 'next/link'

interface Anomaly {
  id: string
  assetName: string
  type: string
  severity: number
  description: string
  imageUrl: string
  validationCount: number
  consensusSeverity: number
  timestamp: string
}

const mockAnomalies: Anomaly[] = [
  {
    id: '1',
    assetName: 'Wind Turbine Alpha-01',
    type: 'Crack',
    severity: 75,
    description: 'Visible crack detected on blade surface near tip',
    imageUrl: '/api/placeholder/400/300',
    validationCount: 12,
    consensusSeverity: 78,
    timestamp: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    assetName: 'Pipeline Section B-12',
    type: 'Corrosion',
    severity: 85,
    description: 'Advanced corrosion detected on external coating',
    imageUrl: '/api/placeholder/400/300',
    validationCount: 8,
    consensusSeverity: 82,
    timestamp: '2024-01-14T14:20:00Z',
  },
  {
    id: '3',
    assetName: 'Bridge Structure C-45',
    type: 'Structural Deformation',
    severity: 92,
    description: 'Significant deformation in support beam',
    imageUrl: '/api/placeholder/400/300',
    validationCount: 15,
    consensusSeverity: 90,
    timestamp: '2024-01-13T09:15:00Z',
  },
]

export default function AnomaliesPage() {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all')

  const filteredAnomalies = mockAnomalies.filter(anomaly => {
    if (selectedSeverity === 'all') return true
    if (selectedSeverity === 'critical') return anomaly.consensusSeverity >= 80
    if (selectedSeverity === 'high') return anomaly.consensusSeverity >= 60 && anomaly.consensusSeverity < 80
    if (selectedSeverity === 'medium') return anomaly.consensusSeverity >= 40 && anomaly.consensusSeverity < 60
    return anomaly.consensusSeverity < 40
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
              <Link href="/anomalies" className="text-primary font-semibold">
                Anomalies
              </Link>
              <Link href="/challenges" className="text-fg/70 hover:text-fg transition-colors">
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
          <h1 className="text-3xl font-bold mb-2">Anomaly Validation</h1>
          <p className="text-fg/70">
            Review and validate detected anomalies to earn rewards and build reputation
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <FilterTab
            label="All"
            active={selectedSeverity === 'all'}
            onClick={() => setSelectedSeverity('all')}
          />
          <FilterTab
            label="Critical"
            active={selectedSeverity === 'critical'}
            onClick={() => setSelectedSeverity('critical')}
            color="danger"
          />
          <FilterTab
            label="High"
            active={selectedSeverity === 'high'}
            onClick={() => setSelectedSeverity('high')}
            color="warning"
          />
          <FilterTab
            label="Medium"
            active={selectedSeverity === 'medium'}
            onClick={() => setSelectedSeverity('medium')}
            color="accent"
          />
          <FilterTab
            label="Low"
            active={selectedSeverity === 'low'}
            onClick={() => setSelectedSeverity('low')}
          />
        </div>

        {/* Anomalies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAnomalies.map((anomaly) => (
            <AnomalyCard key={anomaly.id} anomaly={anomaly} />
          ))}
        </div>

        {filteredAnomalies.length === 0 && (
          <div className="text-center py-12 text-fg/60">
            No anomalies found in this category
          </div>
        )}
      </main>
    </div>
  )
}

function FilterTab({
  label,
  active,
  onClick,
  color = 'primary',
}: {
  label: string
  active: boolean
  onClick: () => void
  color?: 'primary' | 'danger' | 'warning' | 'accent'
}) {
  const colorClasses = {
    primary: 'bg-primary text-white',
    danger: 'bg-danger text-white',
    warning: 'bg-warning text-white',
    accent: 'bg-accent text-white',
  }

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
        active
          ? colorClasses[color]
          : 'bg-surface text-fg/70 hover:bg-surface/80'
      }`}
    >
      {label}
    </button>
  )
}

function AnomalyCard({ anomaly }: { anomaly: Anomaly }) {
  const getSeverityColor = (severity: number) => {
    if (severity >= 80) return 'text-danger'
    if (severity >= 60) return 'text-warning'
    if (severity >= 40) return 'text-accent'
    return 'text-fg/60'
  }

  const getSeverityBg = (severity: number) => {
    if (severity >= 80) return 'bg-danger/10'
    if (severity >= 60) return 'bg-warning/10'
    if (severity >= 40) return 'bg-accent/10'
    return 'bg-fg/10'
  }

  return (
    <div className="bg-surface rounded-lg overflow-hidden border border-fg/10 hover:border-primary/50 transition-all duration-200">
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <AlertTriangle className="w-16 h-16 text-primary/40" />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityBg(
              anomaly.consensusSeverity
            )} ${getSeverityColor(anomaly.consensusSeverity)}`}
          >
            Severity: {anomaly.consensusSeverity}%
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{anomaly.assetName}</h3>
            <p className="text-sm text-fg/60">{anomaly.type}</p>
          </div>
        </div>

        <p className="text-sm text-fg/80 mb-4">{anomaly.description}</p>

        <div className="flex items-center gap-4 text-sm text-fg/60 mb-4">
          <span className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            {anomaly.validationCount} validations
          </span>
          <span>
            {new Date(anomaly.timestamp).toLocaleDateString()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Validate
          </button>
          <button className="px-4 py-2 bg-surface border border-fg/10 rounded-lg hover:bg-bg transition-colors">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 bg-surface border border-fg/10 rounded-lg hover:bg-bg transition-colors">
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
