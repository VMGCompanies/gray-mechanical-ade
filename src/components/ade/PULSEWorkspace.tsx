import { useState } from 'react'
import { PM_CONTRACTS } from '../../data'

export default function PULSEWorkspace() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'schedule' | 'renewals' | 'performance'>('portfolio')
  const [selected, setSelected] = useState<typeof PM_CONTRACTS[0] | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  const totalRevenue = PM_CONTRACTS.reduce((s, c) => s + c.revenueYr, 0)
  const renewalRisk = PM_CONTRACTS.filter(c => c.status === 'Renewal Due')
  const renewalRiskValue = renewalRisk.reduce((s, c) => s + c.revenueYr, 0)

  const visitSchedule = [
    { date: 'Apr 16', client: 'Texas Medical Center', site: 'Multiple Sites', type: 'Quarterly HVAC', tech: 'Chen', duration: '6 hrs', status: 'Scheduled' },
    { date: 'Apr 18', client: 'Baylor College of Medicine', site: 'BCM Lab Complex', type: 'Semi-Annual HVAC + Plumbing', tech: 'Williams', duration: '8 hrs', status: 'Scheduled' },
    { date: 'Apr 22', client: 'Hines Properties', site: 'Energy Tower', type: 'Monthly HVAC', tech: 'Chen', duration: '4 hrs', status: 'Rescheduled' },
    { date: 'Apr 22', client: 'Greenway Medical Suites', site: 'Greenway Medical', type: 'Semi-Annual HVAC + Plumbing', tech: 'Okonkwo', duration: '6 hrs', status: 'Confirmed' },
    { date: 'May 5', client: 'Texas Medical Center', site: 'Site A — TMC Main', type: 'Monthly HVAC', tech: 'Chen', duration: '4 hrs', status: 'Planned' },
    { date: 'May 12', client: 'Hines Properties', site: 'Energy Tower', type: 'Monthly HVAC', tech: 'Chen', duration: '4 hrs', status: 'Planned' },
  ]

  const completedLog = [
    { time: '9:22am', task: 'PLS-0184', desc: 'PM renewal draft sent — Greenway Medical Suites — new 12-month HVAC + Plumbing agreement', outcome: 'Sent' },
    { time: '8:55am', task: 'PLS-0183', desc: 'Visit confirmation sent to Hines Energy Tower — Apr 22 rescheduled confirmed', outcome: 'Confirmed' },
    { time: '8:30am', task: 'PLS-0182', desc: 'PM visit report processed — Texas Medical Center Apr 5 — 8 hrs completed, all systems pass', outcome: 'Filed' },
    { time: 'Apr 5', task: 'PLS-0181', desc: 'Monthly PM invoice generated — Hines Properties — $5,350 — sent to ARIA for billing', outcome: 'Forwarded' },
    { time: 'Apr 4', task: 'PLS-0180', desc: 'Equipment coverage report — BCM Lab — 14 HVAC units, 8 plumbing assets tracked', outcome: 'Updated' },
    { time: 'Apr 3', task: 'PLS-0179', desc: 'CityCentre seasonal visit scheduled for Oct 1 — pre-season HVAC checkout', outcome: 'Scheduled' },
    { time: 'Apr 2', task: 'PLS-0178', desc: 'Annual PM contract report generated — all 5 clients — sent to Mike Gray', outcome: 'Delivered' },
  ]

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000 }}>{toast}</div>}

      {/* Renewal risk banner */}
      {renewalRisk.length > 0 && (
        <div style={{ background: '#fef3c7', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 8, padding: '12px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>⚠</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, color: '#92400e', fontSize: 13 }}>{renewalRisk.length} PM Contract{renewalRisk.length > 1 ? 's' : ''} Due for Renewal — ${renewalRiskValue.toLocaleString()} annual revenue at risk</div>
            <div style={{ fontSize: 12, color: '#b45309', marginTop: 1 }}>{renewalRisk.map(r => r.client).join(' · ')}</div>
          </div>
          <button className="btn-gold" style={{ fontSize: 11 }} onClick={() => showToast('📋 Renewal proposals drafted by PULSE')}>Draft Renewals</button>
        </div>
      )}

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'PM Revenue / Year', value: `$${(totalRevenue/1000).toFixed(0)}K`, color: '#166534' },
          { label: 'Active Contracts', value: PM_CONTRACTS.filter(c => c.status === 'Active').length, color: '#0B1E3D' },
          { label: 'Visits This Month', value: 4, color: '#1e40af' },
          { label: 'Renewal Risk', value: `$${(renewalRiskValue/1000).toFixed(0)}K`, color: '#92400e' },
          { label: 'Client Retention', value: '88%', color: '#166534' },
        ].map(k => (
          <div key={k.label} className="kpi-card">
            <div style={{ fontSize: 10, color: '#5A6A7A', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 600 }}>{k.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        <div>
          <div className="tab-bar">
            {[['portfolio', 'Contract Portfolio'], ['schedule', 'Visit Schedule'], ['renewals', 'Renewal Pipeline'], ['performance', 'Service Metrics']].map(([id, label]) => (
              <div key={id} className={`tab ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id as any)}>{label}</div>
            ))}
          </div>

          {activeTab === 'portfolio' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
                <span>PM Contract Portfolio</span>
                <span style={{ color: '#C89B3C' }}>Total ARR: ${totalRevenue.toLocaleString()}</span>
              </div>
              <table>
                <thead><tr><th>Client</th><th>Site</th><th>Contract Type</th><th>Visits/Yr</th><th>Next Visit</th><th>Annual Rev</th><th>Renewal</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {PM_CONTRACTS.map(c => (
                    <tr key={c.client} onClick={() => setSelected(c)}>
                      <td style={{ fontWeight: 600 }}>{c.client}</td>
                      <td style={{ color: '#5A6A7A', fontSize: 12 }}>{c.site}</td>
                      <td style={{ fontSize: 12 }}>{c.type}</td>
                      <td style={{ textAlign: 'center', fontWeight: 600 }}>{c.visitsYr}</td>
                      <td style={{ color: '#2E6FD9', fontWeight: 600, fontSize: 12 }}>{c.nextVisit}</td>
                      <td style={{ fontWeight: 700 }}>${c.revenueYr.toLocaleString()}</td>
                      <td style={{ fontSize: 12, color: '#5A6A7A' }}>{c.renewal}</td>
                      <td><span className={`badge ${c.status === 'Active' ? 'badge-green' : 'badge-amber'}`} style={{ fontSize: 10 }}>{c.status}</span></td>
                      <td onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn-secondary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => setSelected(c)}>View</button>
                          {c.status === 'Renewal Due' && <button className="btn-gold" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('📋 Renewal proposal sent')}>Renew</button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(11,30,61,0.08)', fontWeight: 600, fontSize: 13 }}>Upcoming Visit Schedule — April / May 2025</div>
              <table>
                <thead><tr><th>Date</th><th>Client</th><th>Site</th><th>Visit Type</th><th>Technician</th><th>Duration</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {visitSchedule.map(v => (
                    <tr key={v.date + v.client}>
                      <td style={{ fontWeight: 700, color: '#2E6FD9' }}>{v.date}</td>
                      <td style={{ fontWeight: 600 }}>{v.client}</td>
                      <td style={{ fontSize: 12, color: '#5A6A7A' }}>{v.site}</td>
                      <td style={{ fontSize: 12 }}>{v.type}</td>
                      <td>Tech {v.tech}</td>
                      <td style={{ fontSize: 12, color: '#5A6A7A' }}>{v.duration}</td>
                      <td><span className={`badge ${v.status === 'Confirmed' || v.status === 'Scheduled' ? 'badge-green' : v.status === 'Rescheduled' ? 'badge-amber' : 'badge-navy'}`} style={{ fontSize: 10 }}>{v.status}</span></td>
                      <td>
                        <button className="btn-secondary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('📅 Visit confirmed')}>Confirm</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'renewals' && (
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 14 }}>Renewal Pipeline — Next 180 Days</div>
              {PM_CONTRACTS.map(c => {
                const renewalDate = c.renewal
                const isUrgent = c.status === 'Renewal Due'
                return (
                  <div key={c.client} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(11,30,61,0.05)' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{c.client}</div>
                      <div style={{ fontSize: 11, color: '#5A6A7A', marginTop: 1 }}>{c.type} · ${c.revenueYr.toLocaleString()}/yr · Renewal: {renewalDate}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span className={`badge ${isUrgent ? 'badge-amber' : 'badge-green'}`} style={{ fontSize: 10 }}>{isUrgent ? 'Action Required' : 'On Track'}</span>
                      <button className={isUrgent ? 'btn-gold' : 'btn-secondary'} style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast(isUrgent ? '📧 Renewal proposal sent' : '📋 Contract viewed')}>
                        {isUrgent ? 'Send Renewal' : 'View Contract'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 14 }}>PM Service Performance Metrics</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { label: 'Visit Completion Rate', value: '98.2%', sub: 'MTD April 2025', color: '#166534' },
                  { label: 'On-Time Arrival Rate', value: '94.1%', sub: 'Within 30-min window', color: '#1e40af' },
                  { label: 'Issues Found Per Visit', value: '2.4', sub: 'Avg across all contracts', color: '#0B1E3D' },
                  { label: 'Emergency Calls Prevented', value: '87%', sub: 'Est. via PM detection', color: '#166534' },
                  { label: 'Client Satisfaction', value: '4.9 / 5.0', sub: 'Post-visit survey avg', color: '#166534' },
                  { label: 'Renewal Rate (12mo)', value: '88%', sub: 'All PM contracts', color: '#1e40af' },
                ].map(m => (
                  <div key={m.label} style={{ background: '#F7F8FA', borderRadius: 8, padding: 14 }}>
                    <div style={{ fontSize: 10, color: '#5A6A7A', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: m.color }}>{m.value}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{m.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Log */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', height: 'fit-content' }}>
          <div style={{ padding: '12px 16px', background: '#F7F8FA', borderBottom: '1px solid rgba(11,30,61,0.08)', fontWeight: 600, fontSize: 13 }}>Completed Task Log</div>
          {completedLog.map((l, i) => (
            <div key={i} style={{ padding: '10px 14px', borderBottom: '1px solid rgba(11,30,61,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#2E6FD9' }}>{l.task}</span>
                <span style={{ fontSize: 10, color: '#94a3b8' }}>{l.time}</span>
              </div>
              <div style={{ fontSize: 11, color: '#1C2A3A', lineHeight: 1.4, marginBottom: 3 }}>{l.desc}</div>
              <span style={{ fontSize: 10, background: '#dcfce7', color: '#166534', padding: '1px 6px', borderRadius: 4 }}>{l.outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', background: '#0B1E3D', borderRadius: '10px 10px 0 0', display: 'flex', justifyContent: 'space-between' }}>
              <div><div style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>{selected.client}</div><div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{selected.site} · {selected.type}</div></div>
              <button style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }} onClick={() => setSelected(null)}>✕</button>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                {[['Annual Revenue', `$${selected.revenueYr.toLocaleString()}`], ['Visits Per Year', String(selected.visitsYr)], ['Next Visit', selected.nextVisit], ['Renewal Date', selected.renewal], ['Contract Status', selected.status], ['Monthly Value', `$${Math.round(selected.revenueYr / 12).toLocaleString()}`]].map(([k, v]) => (
                  <div key={k}><div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 2 }}>{k}</div><div style={{ fontWeight: 700, fontSize: 14 }}>{v}</div></div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn-primary" onClick={() => { showToast('📅 Visit scheduled via DISPATCH'); setSelected(null) }}>Schedule Visit</button>
                <button className="btn-secondary" onClick={() => { showToast('📋 Contract renewal sent'); setSelected(null) }}>Send Renewal</button>
                <button className="btn-secondary" onClick={() => { showToast('📜 Contract history viewed'); setSelected(null) }}>View History</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
