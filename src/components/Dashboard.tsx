import { useState, useEffect, useRef } from 'react'
import type { PageId } from '../App'
import { ACTIVITY_FEED, APPROVAL_QUEUE } from '../data'

interface Props {
  onNavigate: (p: PageId) => void
}

const fmt = (n: number) => '$' + n.toLocaleString()

export default function Dashboard({ onNavigate }: Props) {
  const [feedItems, setFeedItems] = useState<{ text: string; ts: string }[]>([])
  const [queue, setQueue] = useState(APPROVAL_QUEUE)
  const [toast, setToast] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const feedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  // Seed feed
  useEffect(() => {
    const now = new Date()
    const initial = ACTIVITY_FEED.slice(0, 8).map((text, i) => ({
      text, ts: `${now.getHours()}:${String(now.getMinutes() - i * 2).padStart(2, '0')}am`
    }))
    setFeedItems(initial)
  }, [])

  // Auto-cycle feed
  useEffect(() => {
    let idx = 8
    const interval = setInterval(() => {
      const now = new Date()
      const ts = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}${now.getHours() < 12 ? 'am' : 'pm'}`
      const text = ACTIVITY_FEED[idx % ACTIVITY_FEED.length]
      setFeedItems(prev => [{ text, ts }, ...prev].slice(0, 20))
      idx++
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleApprove = (id: string) => {
    setQueue(q => q.filter(x => x.id !== id))
    showToast('✓ Item approved — audit entry logged')
  }
  const handleReject = (id: string) => {
    setQueue(q => q.filter(x => x.id !== id))
    showToast('✗ Item rejected — returned to ADE queue')
  }

  const kpis = [
    { label: 'Active Projects', value: '14', sub: '+2 this week', color: '#2E6FD9', icon: '🏗️', nav: 'active-projects' as PageId },
    { label: 'Open Service Calls', value: '31', sub: '7 emergency', color: '#dc2626', icon: '🔧', nav: 'service-ops' as PageId },
    { label: 'Revenue MTD', value: '$1,847,320', sub: '94% of target', color: '#166534', icon: '💰', nav: 'financial-ops' as PageId },
    { label: 'AR Outstanding', value: '$623,450', sub: '$87,200 past 30 days', color: '#92400e', icon: '🧾', nav: 'financial-ops' as PageId },
    { label: 'ADE Tasks Today', value: '247', sub: '18 pending review', color: '#1e40af', icon: '⚡', nav: 'ade-command' as PageId },
    { label: 'Compliance Items', value: '3 Active', sub: '1 critical', color: '#dc2626', icon: '🛡️', nav: 'compliance' as PageId },
  ]

  if (loading) {
    return (
      <div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          {[...Array(6)].map((_, i) => <div key={i} className="kpi-card skeleton" style={{ height: 100, flex: 1 }}></div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }}>
          <div className="card skeleton" style={{ height: 400 }}></div>
          <div className="card skeleton" style={{ height: 400 }}></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500, zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          {toast}
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0B1E3D' }}>Operations Dashboard</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#5A6A7A' }}>Monday, April 6, 2025 — Live view of all ADE activity and operations</p>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
        {kpis.map(k => (
          <div key={k.label} className="kpi-card" style={{ cursor: 'pointer', minWidth: 140 }} onClick={() => onNavigate(k.nav)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: '#5A6A7A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>{k.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: k.color, letterSpacing: '-0.5px' }}>{k.value}</div>
                <div style={{ fontSize: 12, color: '#5A6A7A', marginTop: 4 }}>{k.sub}</div>
              </div>
              <span style={{ fontSize: 22 }}>{k.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main content row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 20, marginBottom: 20 }}>
        {/* Activity Feed */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(11,30,61,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="live-dot green blink"></span>
            <span style={{ fontWeight: 600, fontSize: 14, color: '#0B1E3D' }}>Live ADE Activity Feed</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: '#5A6A7A' }}>Updates every 2.5s</span>
          </div>
          <div style={{ height: 380, overflowY: 'auto', padding: '8px 0' }} ref={feedRef}>
            {feedItems.map((item, i) => {
              const adeMatch = item.text.match(/^\[([A-Z]+)\]/)
              const adeName = adeMatch ? adeMatch[1] : 'SYS'
              const colorMap: Record<string, string> = {
                APEX: '#2E6FD9', DISPATCH: '#0891b2', ARIA: '#7c3aed', VECTOR: '#0B1E3D',
                SHIELD: '#166634', ECHO: '#1d4ed8', PULSE: '#0369a1', PROCURE: '#92400e',
                LEDGER: '#5b21b6', FIELD: '#065f46', ONBOARD: '#b45309', CANVAS: '#be185d',
                SCOUT: '#1e40af', SIGNAL: '#9333ea', CORA: '#c2410c', SYS: '#5A6A7A',
              }
              const color = colorMap[adeName] || '#5A6A7A'
              return (
                <div key={i} style={{ padding: '9px 18px', borderBottom: '1px solid rgba(11,30,61,0.04)', display: 'flex', gap: 10, alignItems: 'flex-start', opacity: i === 0 ? 1 : Math.max(0.4, 1 - i * 0.04) }}>
                  <span style={{ background: color, color: '#fff', borderRadius: 4, padding: '1px 6px', fontSize: 10, fontWeight: 700, whiteSpace: 'nowrap', marginTop: 1 }}>{adeName}</span>
                  <span style={{ fontSize: 12.5, color: '#1C2A3A', flex: 1, lineHeight: 1.4 }}>{item.text.replace(`[${adeName}] `, '')}</span>
                  <span style={{ fontSize: 11, color: '#94a3b8', whiteSpace: 'nowrap' }}>{item.ts}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Approval Queue */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(11,30,61,0.08)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 14, color: '#0B1E3D' }}>Human Approval Queue</span>
            <span style={{ background: '#fee2e2', color: '#991b1b', borderRadius: 999, padding: '1px 8px', fontSize: 11, fontWeight: 700 }}>{queue.length}</span>
          </div>
          <div style={{ overflowY: 'auto', maxHeight: 380 }}>
            {queue.length === 0 && (
              <div style={{ padding: 32, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
                ✓ All caught up — no items awaiting approval
              </div>
            )}
            {queue.map(item => (
              <div key={item.id} style={{ padding: '14px 16px', borderBottom: '1px solid rgba(11,30,61,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ background: '#0B1E3D', color: '#fff', borderRadius: 4, padding: '1px 7px', fontSize: 10, fontWeight: 700 }}>{item.ade}</span>
                  <span style={{ fontSize: 11, color: '#92400e', background: '#fef3c7', padding: '1px 6px', borderRadius: 4 }}>⏱ {item.waiting}</span>
                </div>
                <div style={{ fontSize: 12.5, color: '#1C2A3A', lineHeight: 1.4, margin: '6px 0 10px' }}>{item.task}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn-primary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => handleApprove(item.id)}>Approve</button>
                  <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => onNavigate('ade-command')}>Review</button>
                  <button className="btn-danger" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => handleReject(item.id)}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row — quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {/* Project Health */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: '#0B1E3D' }}>Project Health</div>
          {[
            { name: 'Memorial Hermann MOB Ph2', pct: 49, health: 'green' },
            { name: "Texas Children's Pavilion", pct: 90, health: 'green' },
            { name: 'Baylor COM Lab Reno', pct: 19, health: 'red' },
            { name: 'HCA Far West Pavilion', pct: 49, health: 'amber' },
          ].map(p => (
            <div key={p.name} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
                <span style={{ color: '#1C2A3A' }}>{p.name}</span>
                <span style={{ color: p.health === 'green' ? '#166534' : p.health === 'red' ? '#991b1b' : '#92400e', fontWeight: 600 }}>{p.pct}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${p.pct}%`, background: p.health === 'green' ? '#22c55e' : p.health === 'red' ? '#ef4444' : '#f59e0b' }}></div>
              </div>
            </div>
          ))}
          <button className="btn-secondary" style={{ width: '100%', marginTop: 8, fontSize: 12 }} onClick={() => onNavigate('active-projects')}>View All Projects →</button>
        </div>

        {/* ADE Performance Today */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: '#0B1E3D' }}>ADE Performance Today</div>
          {[
            { name: 'APEX', tasks: 14, accuracy: 99.2 },
            { name: 'DISPATCH', tasks: 31, accuracy: 97.8 },
            { name: 'ARIA', tasks: 18, accuracy: 98.5 },
            { name: 'VECTOR', tasks: 22, accuracy: 96.4 },
            { name: 'ECHO', tasks: 26, accuracy: 99.1 },
          ].map(a => (
            <div key={a.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid rgba(11,30,61,0.05)', fontSize: 12 }}>
              <span style={{ fontWeight: 600, color: '#0B1E3D', width: 70 }}>{a.name}</span>
              <span style={{ color: '#5A6A7A' }}>{a.tasks} tasks</span>
              <span style={{ color: '#166534', fontWeight: 600 }}>{a.accuracy}%</span>
            </div>
          ))}
          <button className="btn-secondary" style={{ width: '100%', marginTop: 10, fontSize: 12 }} onClick={() => onNavigate('ade-command')}>ADE Command Center →</button>
        </div>

        {/* Financial Snapshot */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: '#0B1E3D' }}>Financial Snapshot</div>
          {[
            { label: 'MTD Revenue', value: '$1,847,320', color: '#166534' },
            { label: 'MTD Target', value: '$1,960,000', color: '#5A6A7A' },
            { label: 'AR Outstanding', value: '$623,450', color: '#92400e' },
            { label: 'AP Pending', value: '$106,440', color: '#1e40af' },
            { label: 'Gross Margin MTD', value: '34.2%', color: '#166534' },
          ].map(f => (
            <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(11,30,61,0.05)', fontSize: 12 }}>
              <span style={{ color: '#5A6A7A' }}>{f.label}</span>
              <span style={{ fontWeight: 700, color: f.color }}>{f.value}</span>
            </div>
          ))}
          <button className="btn-secondary" style={{ width: '100%', marginTop: 10, fontSize: 12 }} onClick={() => onNavigate('financial-ops')}>Financial Operations →</button>
        </div>
      </div>
    </div>
  )
}
