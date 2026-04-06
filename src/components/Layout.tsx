import { useState, useEffect, useRef } from 'react'
import type { PageId } from '../App'
import { ADES, NOTIFICATIONS, ACTIVITY_FEED } from '../data'

interface Props {
  currentPage: PageId
  onNavigate: (p: PageId) => void
  openAde: string | null
  setOpenAde: (id: string | null) => void
  children: React.ReactNode
}

const NAV_ITEMS: { id: PageId; label: string; icon: string; adeStatus?: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'ade-command', label: 'ADE Command Center', icon: '⚡' },
  { id: 'active-projects', label: 'Active Projects', icon: '🏗️' },
  { id: 'service-ops', label: 'Service Operations', icon: '🔧' },
  { id: 'financial-ops', label: 'Financial Operations', icon: '💰' },
  { id: 'compliance', label: 'Compliance & Licensing', icon: '🛡️' },
  { id: 'field-ops', label: 'Field Operations', icon: '👷' },
  { id: 'sales-marketing', label: 'Sales & Marketing', icon: '📣' },
  { id: 'reports', label: 'Reports & Analytics', icon: '📊' },
  { id: 'settings', label: 'Settings & Integrations', icon: '⚙️' },
]

const ADE_STATUS_MAP: Record<string, 'green' | 'amber' | 'gray'> = {
  'dashboard': 'green',
  'ade-command': 'green',
  'active-projects': 'green',
  'service-ops': 'green',
  'financial-ops': 'amber',
  'compliance': 'green',
  'field-ops': 'green',
  'sales-marketing': 'green',
  'reports': 'gray',
  'settings': 'gray',
}

export default function Layout({ currentPage, onNavigate, openAde, setOpenAde, children }: Props) {
  const [showNotifs, setShowNotifs] = useState(false)
  const [readNotifs, setReadNotifs] = useState<string[]>([])
  const [searchVal, setSearchVal] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearch, setShowSearch] = useState(false)
  const [feedIndex, setFeedIndex] = useState(0)
  const [feedItems, setFeedItems] = useState<string[]>(ACTIVITY_FEED.slice(0, 5))
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setFeedIndex(i => {
        const next = (i + 1) % ACTIVITY_FEED.length
        return next
      })
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!searchVal.trim()) { setSearchResults([]); setShowSearch(false); return }
    const q = searchVal.toLowerCase()
    const results: any[] = []
    // Search projects
    ;['Memorial Hermann MOB Phase 2', "Texas Children's Pavilion HVAC", 'Baylor College of Medicine Lab Reno', 'Dell EMC Data Center Phase 2', 'HCA Far West Medical Pavilion', 'Harris County Admin Complex'].forEach(name => {
      if (name.toLowerCase().includes(q)) results.push({ type: 'Project', label: name, action: () => onNavigate('active-projects') })
    })
    // Search invoices
    ;['GM-4471', 'GM-4468', 'GM-4461', 'GM-4455'].forEach(inv => {
      if (inv.toLowerCase().includes(q)) results.push({ type: 'Invoice', label: inv, action: () => onNavigate('financial-ops') })
    })
    // Search clients
    ;['Tellepsen Builders', 'Vaughn Construction', 'McCarthy Building', 'Hensel Phelps', 'Turner Construction', 'Gilbane Building', 'Houston Methodist', 'Hines Properties'].forEach(c => {
      if (c.toLowerCase().includes(q)) results.push({ type: 'Client', label: c, action: () => onNavigate('active-projects') })
    })
    // Search ADEs
    ADES.forEach(a => {
      if (a.name.toLowerCase().includes(q) || a.title.toLowerCase().includes(q)) results.push({ type: 'ADE', label: `${a.name} — ${a.title}`, action: () => { setOpenAde(a.id); onNavigate('ade-command') } })
    })
    setSearchResults(results.slice(0, 8))
    setShowSearch(true)
  }, [searchVal])

  const unreadCount = NOTIFICATIONS.filter(n => !readNotifs.includes(n.id)).length

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F8FA' }}>
      {/* Sidebar */}
      <div id="sidebar" style={{ width: 240, background: '#0B1E3D', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50, overflowY: 'auto' }}>
        {/* Logo */}
        <div style={{ padding: '16px 16px 14px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <img
            src="https://www.graymechanical.com/wp-content/uploads/2017/10/logo-light@2x.png"
            alt="Gray Mechanical"
            style={{ width: '100%', maxWidth: 180, height: 'auto', display: 'block', marginBottom: 8 }}
          />
          <div style={{ fontSize: 10, color: '#C89B3C', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase' }}>ADE Operations Center</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>Powered by Neuralogic</div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '10px 8px', flex: 1 }}>
          {NAV_ITEMS.map(item => (
            <div
              key={item.id}
              className={`sidebar-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              <span className="sidebar-text" style={{ flex: 1 }}>{item.label}</span>
              <span className={`live-dot ${ADE_STATUS_MAP[item.id] || 'gray'}`}></span>
            </div>
          ))}
        </nav>

        {/* ADE sub-list under command */}
        {currentPage === 'ade-command' && (
          <div style={{ padding: '0 8px 8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', padding: '8px 8px 4px', letterSpacing: '0.8px', textTransform: 'uppercase' }}>ADEs</div>
            {ADES.map(ade => (
              <div
                key={ade.id}
                onClick={() => setOpenAde(openAde === ade.id ? null : ade.id)}
                className="sidebar-item"
                style={{ paddingLeft: 12, fontSize: 12, background: openAde === ade.id ? 'rgba(46,111,217,0.2)' : undefined }}
              >
                <span className={`live-dot ${ade.status === 'RUNNING' ? 'green' : ade.status === 'AWAITING APPROVAL' ? 'amber' : 'gray'}`}></span>
                <span className="sidebar-text">{ade.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom status */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="live-dot green blink"></span>
            <span>System Operational</span>
          </div>
          <div style={{ marginTop: 4 }}>v2.4.1 · Apr 6, 2025</div>
        </div>
      </div>

      {/* Main area */}
      <div id="main" style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <header style={{ background: '#fff', borderBottom: '1px solid rgba(11,30,61,0.08)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', gap: 16, position: 'sticky', top: 0, zIndex: 40 }}>
          {/* Search */}
          <div ref={searchRef} style={{ position: 'relative', flex: 1, maxWidth: 400 }}>
            <input
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              onFocus={() => searchVal && setShowSearch(true)}
              placeholder="Search projects, invoices, clients, ADEs..."
              style={{ width: '100%', paddingLeft: 32, background: '#F7F8FA', border: '1px solid rgba(11,30,61,0.1)', fontSize: 13 }}
            />
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 14 }}>🔍</span>
            {showSearch && searchResults.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid rgba(11,30,61,0.1)', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.12)', zIndex: 100, marginTop: 4 }}>
                {searchResults.map((r, i) => (
                  <div key={i} onClick={() => { r.action(); setSearchVal(''); setShowSearch(false) }}
                    style={{ padding: '8px 14px', cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'center', borderBottom: i < searchResults.length - 1 ? '1px solid rgba(11,30,61,0.05)' : undefined }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F7F8FA')}
                    onMouseLeave={e => (e.currentTarget.style.background = '')}
                  >
                    <span className="badge badge-blue" style={{ fontSize: 10, minWidth: 60, justifyContent: 'center' }}>{r.type}</span>
                    <span style={{ fontSize: 13 }}>{r.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Center title */}
          <div style={{ flex: 1, textAlign: 'center', fontSize: 14, fontWeight: 600, color: '#0B1E3D', letterSpacing: '-0.2px' }}>
            ADE Operations Center
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Live activity ticker */}
            <div style={{ fontSize: 11, color: '#5A6A7A', maxWidth: 280, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', display: 'none' }} className="xl-show">
              {ACTIVITY_FEED[feedIndex].substring(0, 60)}...
            </div>

            {/* Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(34,197,94,0.08)', padding: '4px 10px', borderRadius: 20, fontSize: 12 }}>
              <span className="live-dot green blink"></span>
              <span style={{ color: '#166534', fontWeight: 600 }}>16 ADEs Active</span>
              <span style={{ color: '#94a3b8' }}>|</span>
              <span style={{ color: '#5A6A7A' }}>System: Operational</span>
            </div>

            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, position: 'relative', padding: 4 }}
              >
                🔔
                {unreadCount > 0 && (
                  <span style={{ position: 'absolute', top: 0, right: 0, background: '#dc2626', color: '#fff', borderRadius: 999, width: 16, height: 16, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifs && (
                <div style={{ position: 'absolute', right: 0, top: '100%', width: 360, background: '#fff', border: '1px solid rgba(11,30,61,0.1)', borderRadius: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 200, marginTop: 8 }}>
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(11,30,61,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>Notifications</span>
                    <span onClick={() => setReadNotifs(NOTIFICATIONS.map(n => n.id))} style={{ fontSize: 12, color: '#2E6FD9', cursor: 'pointer' }}>Mark all read</span>
                  </div>
                  {NOTIFICATIONS.map(n => (
                    <div key={n.id} onClick={() => setReadNotifs(r => [...r, n.id])} style={{ padding: '12px 16px', borderBottom: '1px solid rgba(11,30,61,0.05)', cursor: 'pointer', background: readNotifs.includes(n.id) ? '#fff' : 'rgba(46,111,217,0.04)' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F7F8FA')}
                      onMouseLeave={e => (e.currentTarget.style.background = readNotifs.includes(n.id) ? '#fff' : 'rgba(46,111,217,0.04)')}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                        <span style={{ fontWeight: 600, fontSize: 13 }}>{n.title}</span>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>{n.time}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#5A6A7A' }}>{n.body}</div>
                      <div style={{ fontSize: 11, color: '#2E6FD9', marginTop: 2 }}>{n.ade}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#0B1E3D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>MG</div>
              <div style={{ fontSize: 13 }}>
                <div style={{ fontWeight: 600, color: '#1C2A3A', lineHeight: 1.2 }}>Mike Gray</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>CEO / Owner</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: 24, overflowY: 'auto' }} onClick={() => { setShowNotifs(false); if (!searchVal) setShowSearch(false) }}>
          {children}
        </main>
      </div>
    </div>
  )
}
