import { useState } from 'react'
import { CONTENT_CALENDAR } from '../../data'

const performanceMetrics = [
  { label: 'LinkedIn Followers', value: '1,284', delta: '+38 this month', color: '#1e40af' },
  { label: 'Post Impressions (MTD)', value: '14,200', delta: '+22% vs Mar', color: '#0B1E3D' },
  { label: 'Website Sessions (MTD)', value: '1,842', delta: '+14% vs Mar', color: '#166534' },
  { label: 'Bounce Rate', value: '42.1%', delta: '▼ 3.4pts favorable', color: '#166534' },
  { label: 'Email Subscribers', value: '312', delta: '+11 this month', color: '#1e40af' },
  { label: 'Email Open Rate', value: '34%', delta: 'Industry avg 21%', color: '#166534' },
]

const topPages = [
  { page: '/services/healthcare-hvac', sessions: 284, bounce: '38%', avgTime: '2:41' },
  { page: '/projects/texas-childrens-pavilion', sessions: 211, bounce: '29%', avgTime: '3:12' },
  { page: '/about', sessions: 198, bounce: '51%', avgTime: '1:55' },
  { page: '/services/mechanical-construction', sessions: 174, bounce: '44%', avgTime: '2:18' },
  { page: '/contact', sessions: 153, bounce: '22%', avgTime: '1:44' },
  { page: '/projects/memorial-hermann-mob', sessions: 142, bounce: '33%', avgTime: '2:58' },
]

const campaigns = [
  {
    name: "Texas Children's HVAC Case Study",
    type: 'Brand / Project Showcase',
    platform: 'LinkedIn + Website',
    status: 'Active',
    startDate: 'Apr 1',
    endDate: 'Apr 30',
    reach: 8400,
    clicks: 312,
    leadsAttributed: 2,
    budget: 0,
    notes: 'Organic post series — 3 of 5 posts published. Highest performing: "Phase 2 Complete" with 4,200 impressions.',
  },
  {
    name: 'HVAC Technician II Hiring Campaign',
    type: 'Recruiting',
    platform: 'LinkedIn Jobs + Indeed',
    status: 'Active',
    startDate: 'Mar 24',
    endDate: 'May 1',
    reach: 3900,
    clicks: 187,
    leadsAttributed: 6,
    budget: 1200,
    notes: '$1,200 sponsored — 6 applications received. 2 advancing to interviews. CPA: $200.',
  },
  {
    name: 'Healthcare Vertical Authority Push',
    type: 'SEO + Content',
    platform: 'Website Blog + Email',
    status: 'In Progress',
    startDate: 'Apr 5',
    endDate: 'Jun 30',
    reach: 940,
    clicks: 78,
    leadsAttributed: 0,
    budget: 0,
    notes: 'Blog post "Why Healthcare HVAC Needs Specialty Contractors" in draft. Email campaign to 312 subscribers planned Apr 17.',
  },
  {
    name: 'Memorial Hermann MOB Announcement',
    type: 'Project Milestone',
    platform: 'LinkedIn',
    status: 'Planned',
    startDate: 'Aug 2025',
    endDate: '—',
    reach: 0,
    clicks: 0,
    leadsAttributed: 0,
    budget: 0,
    notes: 'Planned for project completion Q3 2025. Requires photo documentation on site.',
  },
]

const seoKeywords = [
  { keyword: 'Houston HVAC contractor', rank: 14, volume: '1,600/mo', delta: '+3', trend: 'up' },
  { keyword: 'Houston mechanical contractor', rank: 9, volume: '880/mo', delta: '+5', trend: 'up' },
  { keyword: 'healthcare HVAC contractor Houston', rank: 6, volume: '320/mo', delta: '+2', trend: 'up' },
  { keyword: 'commercial HVAC installation Houston', rank: 18, volume: '720/mo', delta: '-1', trend: 'down' },
  { keyword: 'TACLA licensed HVAC contractor', rank: 4, volume: '210/mo', delta: '0', trend: 'flat' },
  { keyword: 'mechanical construction Houston hospital', rank: 11, volume: '480/mo', delta: '+4', trend: 'up' },
  { keyword: 'gray mechanical HVAC', rank: 1, volume: '90/mo', delta: '0', trend: 'flat' },
  { keyword: 'hospital HVAC contractor Texas', rank: 7, volume: '390/mo', delta: '+1', trend: 'up' },
]

const completedLog = [
  { time: '2:14pm', task: 'SIG-0204', desc: 'LinkedIn post published — Texas Children\'s Pavilion HVAC Complete — 4,200 impressions in 6 hrs', outcome: 'Published' },
  { time: '11:55am', task: 'SIG-0203', desc: 'Blog post draft reviewed — "Healthcare HVAC Specialty" — returned with 3 edits — routed to human review', outcome: 'In Review' },
  { time: '10:40am', task: 'SIG-0202', desc: 'Google Search Console data pulled — Apr 1–6 — 214 clicks, 3,812 impressions — weekly report created', outcome: 'Logged' },
  { time: '9:55am', task: 'SIG-0201', desc: 'LinkedIn Analytics export — Apr performance snapshot — delivered to Mike Gray and David Kim', outcome: 'Sent' },
  { time: '9:20am', task: 'SIG-0200', desc: 'Content calendar updated — TACLA Spotlight post scheduled Apr 14 — LinkedIn — copy drafted', outcome: 'Scheduled' },
  { time: '8:45am', task: 'SIG-0199', desc: 'Indeed job post updated — HVAC Technician II — refreshed listing — 2 new applications received', outcome: 'Updated' },
  { time: '8:10am', task: 'SIG-0198', desc: 'Email subscriber list cleaned — removed 14 hard bounces — 312 active subscribers remaining', outcome: 'Cleaned' },
  { time: 'Apr 5', task: 'SIG-0197', desc: 'Monthly content report compiled — Mar 2025 — emailed to leadership — LinkedIn growth +38 followers', outcome: 'Delivered' },
]

export default function SIGNALWorkspace() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'metrics' | 'campaigns' | 'seo'>('calendar')
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>{toast}</div>}

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Website Visitors MTD', value: '1,842', sub: '+14% vs March', color: '#166534' },
          { label: 'LinkedIn Impressions', value: '14,200', sub: '+22% MTD', color: '#1e40af' },
          { label: 'Email Open Rate', value: '34%', sub: 'Industry avg 21%', color: '#166534' },
          { label: 'Proposals Attributed', value: 2, sub: 'Marketing sourced — Apr', color: '#0B1E3D' },
          { label: 'Avg Days to Close', value: 54, sub: 'Marketing-sourced leads', color: '#92400e' },
        ].map(k => (
          <div key={k.label} className="kpi-card">
            <div style={{ fontSize: 10, color: '#5A6A7A', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 600 }}>{k.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: k.color }}>{k.value}</div>
            <div style={{ fontSize: 11, color: '#5A6A7A', marginTop: 3 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        <div>
          <div className="tab-bar">
            {[['calendar', 'Content Calendar'], ['metrics', 'Performance Metrics'], ['campaigns', 'Campaign Tracker'], ['seo', 'SEO & Web']].map(([id, label]) => (
              <div key={id} className={`tab ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id as any)}>{label}</div>
            ))}
          </div>

          {/* CONTENT CALENDAR */}
          {activeTab === 'calendar' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
                <span>Content Calendar — April 2025</span>
                <button className="btn-gold" style={{ fontSize: 11, padding: '3px 10px' }} onClick={() => showToast('New content item form opened')}>+ Add Content</button>
              </div>
              <table>
                <thead>
                  <tr><th>Date</th><th>Platform</th><th>Type</th><th>Topic</th><th>Author</th><th>Status</th><th>Engagement</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {[
                    ...CONTENT_CALENDAR,
                    { date: 'Apr 7', platform: 'LinkedIn', type: 'Project Spotlight', topic: "Texas Children's Pavilion HVAC Complete", status: 'Published' },
                    { date: 'May 5', platform: 'LinkedIn', type: 'Credential Post', topic: "NCCER Journey — Gray Mechanical Craft Workforce", status: 'Planned' },
                  ].map((item, i) => (
                    <tr key={i}>
                      <td style={{ fontSize: 12, fontWeight: 500 }}>{item.date}</td>
                      <td>
                        <span className={`badge ${item.platform === 'LinkedIn' ? 'badge-blue' : item.platform === 'Website' ? 'badge-navy' : 'badge-amber'}`} style={{ fontSize: 10 }}>
                          {item.platform}
                        </span>
                      </td>
                      <td style={{ fontSize: 12 }}>{item.type}</td>
                      <td style={{ fontSize: 12, maxWidth: 200 }}>{item.topic}</td>
                      <td style={{ fontSize: 12, color: '#5A6A7A' }}>SIGNAL</td>
                      <td>
                        <span className={`badge ${item.status === 'Published' ? 'badge-green' : item.status === 'Scheduled' ? 'badge-blue' : item.status === 'Draft' ? 'badge-amber' : item.status === 'In Progress' ? 'badge-amber' : 'badge-navy'}`} style={{ fontSize: 10 }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: item.status === 'Published' ? '#166534' : '#94a3b8' }}>
                        {item.status === 'Published' ? '4,200 imp · 87 react' : '—'}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 5 }}>
                          <button className="btn-secondary" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => showToast(`Editing: ${item.topic}`)}>Edit</button>
                          {item.status !== 'Published' && <button className="btn-primary" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => showToast(`${item.topic} approved for publishing`)}>Approve</button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* PERFORMANCE METRICS */}
          {activeTab === 'metrics' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                {performanceMetrics.map(m => (
                  <div key={m.label} className="card" style={{ padding: '16px 18px' }}>
                    <div style={{ fontSize: 10, color: '#5A6A7A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>{m.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: m.color }}>{m.value}</div>
                    <div style={{ fontSize: 11, color: '#166534', marginTop: 4 }}>{m.delta}</div>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '10px 16px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13 }}>Top Pages — Session Performance (MTD)</div>
                <table>
                  <thead><tr><th>Page</th><th>Sessions</th><th>Bounce Rate</th><th>Avg Time on Page</th><th>Traffic Share</th></tr></thead>
                  <tbody>
                    {topPages.map((p, i) => (
                      <tr key={i}>
                        <td style={{ fontSize: 12, fontFamily: 'monospace', color: '#1e40af' }}>{p.page}</td>
                        <td style={{ fontSize: 13, fontWeight: 600 }}>{p.sessions}</td>
                        <td style={{ fontSize: 12 }}>{p.bounce}</td>
                        <td style={{ fontSize: 12 }}>{p.avgTime}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div className="progress-bar-bg" style={{ flex: 1 }}>
                              <div className="progress-bar-fill" style={{ width: `${(p.sessions / 284) * 100}%` }} />
                            </div>
                            <span style={{ fontSize: 11, color: '#5A6A7A', width: 32 }}>{Math.round((p.sessions / 1842) * 100)}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CAMPAIGNS */}
          {activeTab === 'campaigns' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {campaigns.map((c, i) => (
                <div key={i} className="card" style={{ padding: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: '#5A6A7A', marginTop: 2 }}>{c.type} · {c.platform}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span className={`badge ${c.status === 'Active' ? 'badge-green' : c.status === 'In Progress' ? 'badge-amber' : 'badge-blue'}`}>{c.status}</span>
                      {c.budget > 0 && <span className="badge badge-gold">${c.budget.toLocaleString()} budget</span>}
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
                    {[['Reach', c.reach.toLocaleString()], ['Clicks', c.clicks.toLocaleString()], ['Leads Attributed', c.leadsAttributed], ['Run Dates', `${c.startDate} – ${c.endDate}`]].map(([label, val]) => (
                      <div key={label as string} style={{ background: '#F7F8FA', borderRadius: 6, padding: '8px 10px' }}>
                        <div style={{ fontSize: 10, color: '#5A6A7A', textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>{label}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1E3D' }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.5, marginBottom: 10 }}>{c.notes}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-primary" style={{ fontSize: 12 }} onClick={() => showToast(`Opening ${c.name} campaign detail`)}>View Detail</button>
                    {c.status !== 'Planned' && <button className="btn-secondary" style={{ fontSize: 12 }} onClick={() => showToast(`${c.name} report exported`)}>Export Report</button>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SEO & WEB */}
          {activeTab === 'seo' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {[
                  { label: 'Organic Keywords', value: '48', sub: 'Top 20 positions', color: '#1e40af' },
                  { label: 'Domain Authority', value: '18', sub: 'Target: 30 by EOY', color: '#92400e' },
                  { label: 'Backlinks', value: '74', sub: '+8 this month', color: '#166534' },
                  { label: 'Avg Keyword Rank', value: '9.4', sub: '↑ from 12.1 in Jan', color: '#166534' },
                ].map(k => (
                  <div key={k.label} className="kpi-card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: '#5A6A7A', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>{k.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: k.color }}>{k.value}</div>
                    <div style={{ fontSize: 11, color: '#5A6A7A', marginTop: 2 }}>{k.sub}</div>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '10px 16px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13 }}>Search Keyword Rankings — Houston HVAC / Mechanical</div>
                <table>
                  <thead><tr><th>Keyword</th><th>Position</th><th>Search Volume</th><th>Position Change</th><th>Trend</th></tr></thead>
                  <tbody>
                    {seoKeywords.map((k, i) => (
                      <tr key={i}>
                        <td style={{ fontSize: 13, fontWeight: 500 }}>{k.keyword}</td>
                        <td>
                          <span style={{ fontWeight: 700, fontSize: 14, color: k.rank <= 5 ? '#166534' : k.rank <= 10 ? '#1e40af' : '#92400e' }}>#{k.rank}</span>
                        </td>
                        <td style={{ fontSize: 12, color: '#5A6A7A' }}>{k.volume}</td>
                        <td style={{ fontSize: 13, fontWeight: 600, color: k.delta.startsWith('+') ? '#166534' : k.delta.startsWith('-') ? '#dc2626' : '#5A6A7A' }}>{k.delta}</td>
                        <td>
                          <span className={`badge ${k.trend === 'up' ? 'badge-green' : k.trend === 'down' ? 'badge-red' : 'badge-blue'}`} style={{ fontSize: 10 }}>
                            {k.trend === 'up' ? '▲ Rising' : k.trend === 'down' ? '▼ Falling' : '→ Stable'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Completed Task Log */}
        <div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13 }}>SIGNAL — Completed Tasks Today</div>
            {completedLog.map((entry, i) => (
              <div key={i} style={{ padding: '10px 14px', borderBottom: '1px solid rgba(11,30,61,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: 11, color: '#5A6A7A' }}>{entry.time}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#0B1E3D', background: '#F0F4FF', padding: '1px 6px', borderRadius: 4 }}>{entry.task}</span>
                </div>
                <div style={{ fontSize: 12, color: '#1C2A3A', lineHeight: 1.45, marginBottom: 3 }}>{entry.desc}</div>
                <span className="badge badge-green" style={{ fontSize: 10 }}>{entry.outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
