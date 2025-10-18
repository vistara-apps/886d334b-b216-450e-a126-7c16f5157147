'use client'

import { useState } from 'react'
import { 
  Drone, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Plus,
  Search,
  Filter
} from 'lucide-react'
import Link from 'next/link'

interface Asset {
  id: string
  name: string
  type: string
  status: 'operational' | 'maintenance' | 'critical'
  lastInspection: string
  anomalyCount: number
  healthScore: number
}

const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Wind Turbine Alpha-01',
    type: 'Wind Turbine',
    status: 'operational',
    lastInspection: '2024-01-15',
    anomalyCount: 2,
    healthScore: 94,
  },
  {
    id: '2',
    name: 'Pipeline Section B-12',
    type: 'Pipeline',
    status: 'maintenance',
    lastInspection: '2024-01-14',
    anomalyCount: 5,
    healthScore: 78,
  },
  {
    id: '3',
    name: 'Solar Array Delta-03',
    type: 'Solar Panel',
    status: 'operational',
    lastInspection: '2024-01-16',
    anomalyCount: 0,
    healthScore: 98,
  },
  {
    id: '4',
    name: 'Bridge Structure C-45',
    type: 'Bridge',
    status: 'critical',
    lastInspection: '2024-01-13',
    anomalyCount: 8,
    healthScore: 62,
  },
]

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter
    return matchesSearch && matchesStatus
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
              <Link href="/dashboard" className="text-primary font-semibold">
                Dashboard
              </Link>
              <Link href="/anomalies" className="text-fg/70 hover:text-fg transition-colors">
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Drone className="w-6 h-6" />}
            label="Total Assets"
            value="24"
            trend="+3 this month"
            trendUp
          />
          <StatCard
            icon={<AlertTriangle className="w-6 h-6" />}
            label="Active Anomalies"
            value="15"
            trend="3 critical"
            trendUp={false}
          />
          <StatCard
            icon={<CheckCircle className="w-6 h-6" />}
            label="Verified Inspections"
            value="142"
            trend="+12 this week"
            trendUp
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Avg Health Score"
            value="87%"
            trend="+2.3%"
            trendUp
          />
        </div>

        {/* Assets Section */}
        <div className="bg-surface rounded-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold">Your Assets</h2>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="w-5 h-5" />
              Add Asset
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-fg/40" />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-bg border border-fg/10 rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-fg/40" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-bg border border-fg/10 rounded-lg focus:outline-none focus:border-primary transition-colors"
              >
                <option value="all">All Status</option>
                <option value="operational">Operational</option>
                <option value="maintenance">Maintenance</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Assets Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>

          {filteredAssets.length === 0 && (
            <div className="text-center py-12 text-fg/60">
              No assets found matching your criteria
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  trend,
  trendUp,
}: {
  icon: React.ReactNode
  label: string
  value: string
  trend: string
  trendUp: boolean
}) {
  return (
    <div className="bg-surface rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-primary">{icon}</div>
        <span className={`text-sm ${trendUp ? 'text-accent' : 'text-warning'}`}>
          {trend}
        </span>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-fg/60">{label}</div>
    </div>
  )
}

function AssetCard({ asset }: { asset: Asset }) {
  const statusColors = {
    operational: 'text-accent',
    maintenance: 'text-warning',
    critical: 'text-danger',
  }

  const statusBgColors = {
    operational: 'bg-accent/10',
    maintenance: 'bg-warning/10',
    critical: 'bg-danger/10',
  }

  return (
    <Link
      href={`/assets/${asset.id}`}
      className="bg-bg rounded-lg p-6 border border-fg/10 hover:border-primary/50 transition-all duration-200 hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{asset.name}</h3>
          <p className="text-sm text-fg/60">{asset.type}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusBgColors[asset.status]} ${statusColors[asset.status]}`}
        >
          {asset.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-fg/60">Health Score</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-fg/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  asset.healthScore >= 80
                    ? 'bg-accent'
                    : asset.healthScore >= 60
                    ? 'bg-warning'
                    : 'bg-danger'
                }`}
                style={{ width: `${asset.healthScore}%` }}
              />
            </div>
            <span className="font-semibold">{asset.healthScore}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-fg/60 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Last Inspection
          </span>
          <span>{new Date(asset.lastInspection).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-fg/60 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            Anomalies
          </span>
          <span className={asset.anomalyCount > 0 ? 'text-warning font-semibold' : ''}>
            {asset.anomalyCount}
          </span>
        </div>
      </div>
    </Link>
  )
}
