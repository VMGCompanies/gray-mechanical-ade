import { useState } from 'react'
import { COMPLIANCE_ITEMS } from '../../data'

export default function SHIELDWorkspace() {
  const [activeTab, setActiveTab] = useState<'compliance' | 'licenses' | 'safety' | 'permits'>('compliance')
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  const licenses = [
    { employee: 'Josh Harris', type: 'TACLA', number: 'TACLA000045915C', state: 'TX', expiry: 'Jun 14, 2025', daysLeft: 69, status: 'Active' },
    { employee: "Bryan O'Neal", type: 'TSBPE/MPL', number: 'MPL38947', state: 'TX', expiry: 'Sep 30, 2025', daysLeft: 177, status: 'Active' },
    { employee: 'Marcus Davis', type: 'TACLA', number: 'TACLA000038821C', state: 'TX', expiry: 'Jan 15, 2026', daysLeft: 284, status: 'Active' },
    { employee: 'Ray Castillo', type: 'TSBPE/MPL', number: 'MPL41023', state: 'TX', expiry: 'Mar 31, 2026', daysLeft: 359, status: 'Active' },
    { employee: 'Tom Nguyen', type: 'OSHA-30', number: 'OSHA30-TX-2021-88421', state: 'TX', expiry: 'Mar 28, 2027', daysLeft: 726, status: 'Active' },
    { employee: 'Mike Gray', type: 'B.S. ME / PE', number: 'TX-PE-128841', state: 'TX', expiry: 'Dec 31, 2025', daysLeft: 269, status: 'Active' },
  ]

  const coiData = [
    { sub: 'Premier Sheet Metal', carrier: 'Travelers', policy: 'GL-8821-44', expiry: 'Apr 1, 2025', status: 'EXPIRED', jobs: 3, daysLeft: -5 },
    { sub: 'Gulf Coast Insulation', carrier: 'Zurich', policy: 'GL-4421-99', expiry: 'Dec 31, 2025', status: 'Active', jobs: 1, daysLeft: 269 },
    { sub: 'Ace Controls Inc.', carrier: 'Hartford', policy: 'BOP-2241-77', expiry: 'Aug 31, 2025', status: 'Active', jobs: 1, daysLeft: 147 },
    { sub: 'Houston Crane & Rigging', carrier: 'Liberty Mutual', policy: 'CGL-8811-33', expiry: 'Jul 15, 2025', status: 'Active', jobs: 1, daysLeft: 100 },
  ]

  const safetyMetrics = [
    { metric: 'Total Recordable Incident Rate (TRIR)', value: '0.82', target: '< 1.50', status: 'green' },
    { metric: 'Experience Modification Rate (EMR)', value: '0.74', target: '< 1.00', status: 'green' },
    { metric: 'Recordable Incidents YTD', value: '1', target: '0 Goal', status: 'amber' },
    { metric: 'Lost Time Incidents (LTI)', value: '0', target: '0 Goal', status: 'green' },
    { metric: 'Near Miss Reports YTD', value: '4', target: 'All Reported', status: 'green' },
    { metric: 'Safety Training Hours (YTD)', value: '248 hrs', target: '200 hrs target', status: 'green' },
  ]

  const completedLog = [
    { time: '10:48am', task: 'SH-0291', desc: 'Premier Sheet Metal COI expired — AP invoices blocked — LEDGER notified', outcome: 'Escalated' },
    { time: '10:22am', task: 'SH-0290', desc: 'TDLR API check completed — Josh Harris TACLA active — 69 days to renewal', outcome: 'Monitored' },
    { time: '9:55am', task: 'SH-0289', desc: 'OSHA 300 log updated — recordable incident Apr 2 — documented and filed', outcome: 'Filed' },
    { time: '9:30am', task: 'SH-0288', desc: 'Baylor COM mechanical permit MP-2025-0041 — Apr 15 inspection reminder created', outcome: 'Scheduled' },
    { time: '8:45am', task: 'SH-0287', desc: 'Texas Mutual workers comp policy TM-8824471 — quarterly audit confirmed active', outcome: 'Confirmed' },
    { time: '8:20am', task: 'SH-0286', desc: 'Gulf Coast Insulation COI verified — 147 days remaining — no action needed', outcome: 'Logged' },
    { time: 'Apr 5', task: 'SH-0285', desc: 'Weekly compliance digest emailed to Mike Gray and David Kim — 1 critical item', outcome: 'Sent' },
    { time: 'Apr 5', task: 'SH-0284', desc: 'Ace Controls OSHA-10 certs verified — 3 workers — all current', outcome: 'Verified' },
  ]

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000 }}>{toast}</div>}

      {/* Critical alert */}
      <div style={{ background: '#fee2e2', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 8, padding: '12px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 18 }}>🚨</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: '#991b1b', fontSize: 13 }}>CRITICAL: Premier Sheet Metal COI expired Apr 1, 2025</div>
          <div style={{ fontSize: 12, color: '#dc2626', marginTop: 2 }}>3 open projects affected · AP invoice LAB-0041 ($34,200) blocked by LEDGER · Suspension notice pending human approval</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-danger" style={{ fontSize: 11 }} onClick={() => showToast('📋 COI renewal request sent via Checkr integration')}>Request COI</button>
          <button className="btn-secondary" style={{ fontSize: 11 }} onClick={() => showToast('⛔ Subcontractor suspension notice issued')}>Suspend Sub</button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Active Licenses', value: licenses.filter(l => l.status === 'Active').length, color: '#166534' },
          { label: 'COI Critical', value: coiData.filter(c => c.status === 'EXPIRED').length, color: '#991b1b' },
          { label: 'Expiring < 90 Days', value: licenses.filter(l => l.daysLeft < 90 && l.daysLeft > 0).length, color: '#92400e' },
          { label: 'EMR Rating', value: '0.74', color: '#166534' },
          { label: 'TRIR (YTD)', value: '0.82', color: '#166534' },
        ].map(k => (
          <div key={k.label} className="kpi-card">
            <div style={{ fontSize: 10, color: '#5A6A7A', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 600 }}>{k.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        <div>
          <div className="tab-bar">
            {[['compliance', 'Compliance Board'], ['licenses', 'License Matrix'], ['safety', 'Safety Metrics'], ['permits', 'Permits & Insurance']].map(([id, label]) => (
              <div key={id} className={`tab ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id as any)}>{label}</div>
            ))}
          </div>

          {activeTab === 'compliance' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table>
                <thead><tr><th>Category</th><th>Item / Entity</th><th>Status</th><th>Expiry</th><th>Days Left</th><th>Risk Level</th><th>Actions</th></tr></thead>
                <tbody>
                  {COMPLIANCE_ITEMS.map((item, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600, fontSize: 11, color: '#5A6A7A' }}>{item.category}</td>
                      <td style={{ fontWeight: 500, fontSize: 13 }}>{item.item}</td>
                      <td><span className={`badge ${item.status === 'Active' ? 'badge-green' : item.status === 'EXPIRED' ? 'badge-red' : 'badge-amber'}`} style={{ fontSize: 10 }}>{item.status}</span></td>
                      <td style={{ fontSize: 12, color: '#5A6A7A' }}>{item.expiry}</td>
                      <td style={{ fontWeight: 700, fontSize: 12, color: item.daysLeft < 0 ? '#dc2626' : item.daysLeft < 60 ? '#92400e' : '#166534' }}>
                        {item.daysLeft < 0 ? 'EXPIRED' : item.daysLeft === 999 ? '—' : `${item.daysLeft}d`}
                      </td>
                      <td><span className={`badge ${item.critical ? 'badge-red' : item.daysLeft < 90 && item.daysLeft > 0 ? 'badge-amber' : 'badge-green'}`} style={{ fontSize: 10 }}>{item.critical ? 'Critical' : item.daysLeft < 90 && item.daysLeft > 0 ? 'Watch' : 'Low'}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn-secondary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('📄 Document viewed')}>View</button>
                          {item.status === 'EXPIRED' && <button className="btn-danger" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('📧 Renewal request sent')}>Renew</button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'licenses' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13 }}>Employee License Matrix — TDLR / TSBPE Live Monitoring</div>
              <table>
                <thead><tr><th>Employee</th><th>License Type</th><th>License #</th><th>State</th><th>Expiry</th><th>Days Remaining</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {licenses.map(l => (
                    <tr key={l.number}>
                      <td style={{ fontWeight: 600 }}>{l.employee}</td>
                      <td><span className="badge badge-blue" style={{ fontSize: 10 }}>{l.type}</span></td>
                      <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#5A6A7A' }}>{l.number}</td>
                      <td style={{ textAlign: 'center' }}>{l.state}</td>
                      <td style={{ fontSize: 12 }}>{l.expiry}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 40, background: '#e2e8f0', borderRadius: 999, height: 5 }}>
                            <div style={{ width: `${Math.min((l.daysLeft/365)*100, 100)}%`, height: '100%', borderRadius: 999, background: l.daysLeft < 60 ? '#ef4444' : l.daysLeft < 120 ? '#f59e0b' : '#22c55e' }}></div>
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 700, color: l.daysLeft < 60 ? '#dc2626' : l.daysLeft < 120 ? '#92400e' : '#166534' }}>{l.daysLeft}d</span>
                        </div>
                      </td>
                      <td><span className="badge badge-green" style={{ fontSize: 10 }}>{l.status}</span></td>
                      <td><button className="btn-secondary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast(l.daysLeft < 90 ? '🔔 Renewal alert created' : '📄 License document viewed')}>
                        {l.daysLeft < 90 ? 'Alert' : 'View'}
                      </button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'safety' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="card" style={{ padding: 16 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12 }}>Safety KPI Dashboard — YTD 2025</div>
                  {safetyMetrics.map(m => (
                    <div key={m.metric} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(11,30,61,0.05)' }}>
                      <div><div style={{ fontSize: 12 }}>{m.metric}</div><div style={{ fontSize: 10, color: '#94a3b8' }}>Target: {m.target}</div></div>
                      <span style={{ fontWeight: 800, fontSize: 16, color: m.status === 'green' ? '#166534' : m.status === 'amber' ? '#92400e' : '#dc2626' }}>{m.value}</span>
                    </div>
                  ))}
                </div>
                <div className="card" style={{ padding: 16 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12 }}>Subcontractor COI Dashboard</div>
                  {coiData.map(c => (
                    <div key={c.sub} style={{ padding: '10px 0', borderBottom: '1px solid rgba(11,30,61,0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontWeight: 600, fontSize: 12 }}>{c.sub}</span>
                        <span className={`badge ${c.status === 'EXPIRED' ? 'badge-red' : 'badge-green'}`} style={{ fontSize: 10 }}>{c.status}</span>
                      </div>
                      <div style={{ fontSize: 11, color: '#5A6A7A' }}>{c.carrier} · {c.policy} · Exp: {c.expiry}</div>
                      <div style={{ fontSize: 11, color: c.daysLeft < 0 ? '#dc2626' : '#5A6A7A', marginTop: 2 }}>
                        {c.daysLeft < 0 ? `⚠ Expired ${Math.abs(c.daysLeft)} days ago · ${c.jobs} jobs affected` : `${c.daysLeft} days remaining · ${c.jobs} active job${c.jobs > 1 ? 's' : ''}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'permits' && (
            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12 }}>Active Permits & Insurance</div>
              {[
                { type: 'Mechanical Permit', project: 'Memorial Hermann MOB Ph2', number: 'BP-2024-18841', issued: 'Oct 2024', status: 'Active', nextAction: 'Final inspection at project close' },
                { type: 'Mechanical Permit', project: 'Baylor COM Lab Reno', number: 'MP-2025-0041', issued: 'Feb 2025', status: 'Pending Inspection', nextAction: 'Apr 15, 2025 — inspection scheduled' },
                { type: "Workers' Compensation", project: 'All Projects', number: 'TM-8824471', issued: 'Jul 2024', status: 'Active', nextAction: 'Renewal Jul 1, 2025' },
                { type: 'General Liability', project: 'All Projects', number: 'GL-TX-228841', issued: 'Jan 2025', status: 'Active', nextAction: 'Annual renewal Jan 2026' },
                { type: 'Professional Liability', project: 'Design-Build Projects', number: 'PL-TX-44821', issued: 'Jan 2025', status: 'Active', nextAction: 'Annual renewal Jan 2026' },
              ].map(p => (
                <div key={p.number} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid rgba(11,30,61,0.06)' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{p.type}</div>
                    <div style={{ fontSize: 11, color: '#5A6A7A', marginTop: 2 }}>{p.project} · #{p.number} · Issued {p.issued}</div>
                    <div style={{ fontSize: 11, color: '#2E6FD9', marginTop: 3 }}>Next: {p.nextAction}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className={`badge ${p.status === 'Active' ? 'badge-green' : 'badge-amber'}`} style={{ fontSize: 10 }}>{p.status}</span>
                    <button className="btn-secondary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('📄 Document opened')}>View</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed log */}
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
    </div>
  )
}
