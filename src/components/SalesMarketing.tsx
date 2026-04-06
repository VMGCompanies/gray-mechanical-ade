import { useState } from 'react'
import { BID_PIPELINE, PROSPECTS, CONTENT_CALENDAR, PM_CONTRACTS } from '../data'

type SMTab = 'pipeline' | 'prospects' | 'content' | 'pm-contracts'

export default function SalesMarketing() {
  const [tab, setTab] = useState<SMTab>('pipeline')
  const [selected, setSelected] = useState<any>(null)
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000 }}>{toast}</div>}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0B1E3D' }}>Sales & Marketing</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#5A6A7A' }}>CANVAS · SCOUT · SIGNAL · PULSE · Revenue growth and client development</p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Pipeline Value', value: '$7.95M', sub: '5 active bids', color: '#0B1E3D' },
          { label: 'Win Rate (12mo)', value: '67%', sub: 'industry avg: 42%', color: '#166534' },
          { label: 'PM Revenue/Yr', value: '$308K', sub: '5 active contracts', color: '#1e40af' },
          { label: 'LinkedIn Impressions', value: '14,200', sub: 'MTD April 2025', color: '#7c3aed' },
        ].map(k => (
          <div key={k.label} className="kpi-card">
            <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>{k.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: k.color }}>{k.value}</div>
            <div style={{ fontSize: 12, color: '#5A6A7A', marginTop: 4 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="tab-bar">
        <div className={`tab ${tab === 'pipeline' ? 'active' : ''}`} onClick={() => setTab('pipeline')}>Bid Pipeline (CANVAS)</div>
        <div className={`tab ${tab === 'prospects' ? 'active' : ''}`} onClick={() => setTab('prospects')}>BD Prospects (SCOUT)</div>
        <div className={`tab ${tab === 'content' ? 'active' : ''}`} onClick={() => setTab('content')}>Content Calendar (SIGNAL)</div>
        <div className={`tab ${tab === 'pm-contracts' ? 'active' : ''}`} onClick={() => setTab('pm-contracts')}>PM Contracts (PULSE)</div>
      </div>

      {tab === 'pipeline' && (
        <div>
          <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
            <table>
              <thead><tr><th>Opportunity</th><th>GC / Client</th><th>Mech. Value</th><th>Bid Date</th><th>Stage</th><th>Win Prob.</th><th>Action</th></tr></thead>
              <tbody>
                {BID_PIPELINE.map(b => (
                  <tr key={b.opportunity} onClick={() => setSelected(b)}>
                    <td style={{ fontWeight: 600 }}>{b.opportunity}</td>
                    <td style={{ color: '#5A6A7A' }}>{b.gc}</td>
                    <td style={{ fontWeight: 700, color: '#0B1E3D' }}>${b.value.toLocaleString()}</td>
                    <td style={{ color: '#5A6A7A' }}>{b.bidDate}</td>
                    <td><span className={`badge ${b.stage === 'Won' ? 'badge-green' : b.stage === 'Final Review' ? 'badge-amber' : 'badge-blue'}`}>{b.stage}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 60, background: '#e2e8f0', borderRadius: 999, height: 6 }}>
                          <div style={{ width: `${b.winProb}%`, height: '100%', borderRadius: 999, background: b.winProb > 70 ? '#22c55e' : b.winProb > 50 ? '#f59e0b' : '#94a3b8' }}></div>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: b.winProb > 70 ? '#166534' : b.winProb > 50 ? '#92400e' : '#5A6A7A' }}>{b.winProb}%</span>
                      </div>
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      <button className={b.stage === 'Final Review' ? 'btn-gold' : 'btn-secondary'} style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => showToast(b.stage === 'Final Review' ? '✓ Bid released' : '📊 Opportunity opened')}>
                        {b.stage === 'Won' ? 'Contract' : b.stage === 'Final Review' ? 'Release Bid' : 'Open'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 12 }}>Win/Loss Summary (Last 12 Months)</div>
              {[
                { label: 'Total Bids Submitted', value: 18 },
                { label: 'Won', value: 12, color: '#166534' },
                { label: 'Lost', value: 4, color: '#dc2626' },
                { label: 'Pending', value: 2, color: '#92400e' },
                { label: 'Win Rate', value: '67%', color: '#166534' },
                { label: 'Avg. Bid Value (Won)', value: '$1.42M' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(11,30,61,0.05)', fontSize: 13 }}>
                  <span style={{ color: '#5A6A7A' }}>{s.label}</span>
                  <span style={{ fontWeight: 700, color: s.color || '#0B1E3D' }}>{s.value}</span>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 12 }}>Pre-Qualification Status</div>
              {[
                { gc: 'Tellepsen Builders', status: 'Approved', date: 'Valid through Dec 2025' },
                { gc: 'McCarthy Building Companies', status: 'Approved', date: 'Valid through Jun 2025' },
                { gc: 'Hensel Phelps', status: 'Approved', date: 'Valid through Sep 2025' },
                { gc: 'Turner Construction', status: 'Approved', date: 'Valid through Mar 2026' },
                { gc: 'Skanska USA', status: 'Pending', date: 'Application Apr 4' },
                { gc: 'DPR Construction', status: 'Not Applied', date: '—' },
              ].map(p => (
                <div key={p.gc} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid rgba(11,30,61,0.05)', fontSize: 12 }}>
                  <span>{p.gc}</span>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: '#5A6A7A', fontSize: 11 }}>{p.date}</span>
                    <span className={`badge ${p.status === 'Approved' ? 'badge-green' : p.status === 'Pending' ? 'badge-amber' : 'badge-navy'}`} style={{ fontSize: 9 }}>{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'prospects' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>BD Prospect Pipeline — SCOUT ADE</span>
            <button style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer' }} onClick={() => showToast('🔭 SCOUT research task initiated')}>+ Add Prospect</button>
          </div>
          <table>
            <thead><tr><th>Company</th><th>Contact</th><th>Title</th><th>Vertical</th><th>Region</th><th>Status</th><th>Next Action</th><th>Actions</th></tr></thead>
            <tbody>
              {PROSPECTS.map(p => (
                <tr key={p.company}>
                  <td style={{ fontWeight: 600 }}>{p.company}</td>
                  <td>{p.contact}</td>
                  <td style={{ color: '#5A6A7A', fontSize: 12 }}>{p.title}</td>
                  <td><span className="badge badge-blue" style={{ fontSize: 10 }}>{p.vertical}</span></td>
                  <td style={{ color: '#5A6A7A' }}>{p.region}</td>
                  <td><span className={`badge ${p.temp === 'hot' ? 'badge-red' : p.temp === 'warm' ? 'badge-amber' : 'badge-navy'}`}>{p.status}</span></td>
                  <td style={{ fontSize: 12, color: '#1e40af' }}>{p.nextAction}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn-secondary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('📧 Draft email created by SCOUT')}>Draft Email</button>
                      <button className="btn-secondary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('📅 Meeting logged')}>Log</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'content' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Website Visitors MTD', value: '1,842', color: '#7c3aed' },
              { label: 'LinkedIn Impressions', value: '14,200', color: '#1e40af' },
              { label: 'Avg. Proposal-to-Close', value: '54 days', color: '#0B1E3D' },
            ].map(k => (
              <div key={k.label} className="kpi-card">
                <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 4 }}>{k.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: k.color }}>{k.value}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600 }}>Content Calendar — April 2025</div>
            <table>
              <thead><tr><th>Date</th><th>Platform</th><th>Type</th><th>Topic</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {CONTENT_CALENDAR.map(c => (
                  <tr key={c.date}>
                    <td style={{ fontWeight: 600 }}>{c.date}</td>
                    <td><span className="badge badge-blue" style={{ fontSize: 10 }}>{c.platform}</span></td>
                    <td style={{ color: '#5A6A7A', fontSize: 12 }}>{c.type}</td>
                    <td>{c.topic}</td>
                    <td><span className={`badge ${c.status === 'Published' ? 'badge-green' : c.status === 'Scheduled' ? 'badge-blue' : c.status === 'In Progress' ? 'badge-amber' : 'badge-navy'}`}>{c.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn-secondary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast(`✓ ${c.status === 'Published' ? 'Post viewed' : 'Draft opened'}`)}>
                          {c.status === 'Published' ? 'View' : c.status === 'Draft' ? 'Review & Publish' : 'Edit'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'pm-contracts' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
            <span>PM Contract Portfolio — PULSE ADE</span>
            <span style={{ color: '#C89B3C' }}>Annual Revenue: $308,000</span>
          </div>
          <table>
            <thead><tr><th>Client</th><th>Site</th><th>Contract Type</th><th>Visits/Yr</th><th>Next Visit</th><th>Revenue/Yr</th><th>Renewal</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {PM_CONTRACTS.map(c => (
                <tr key={c.client}>
                  <td style={{ fontWeight: 600 }}>{c.client}</td>
                  <td style={{ color: '#5A6A7A', fontSize: 12 }}>{c.site}</td>
                  <td style={{ fontSize: 12 }}>{c.type}</td>
                  <td style={{ textAlign: 'center' }}>{c.visitsYr}</td>
                  <td style={{ color: '#1e40af', fontWeight: 600 }}>{c.nextVisit}</td>
                  <td style={{ fontWeight: 700 }}>${c.revenueYr.toLocaleString()}</td>
                  <td style={{ fontSize: 12, color: '#5A6A7A' }}>{c.renewal}</td>
                  <td><span className={`badge ${c.status === 'Active' ? 'badge-green' : 'badge-amber'}`}>{c.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn-secondary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('📅 Visit scheduled')}>Schedule</button>
                      {c.status === 'Renewal Due' && <button className="btn-gold" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('📋 Renewal proposal sent by PULSE')}>Renew</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
