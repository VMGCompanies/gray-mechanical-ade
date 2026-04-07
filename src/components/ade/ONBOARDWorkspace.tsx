import { useState } from 'react'
import { ONBOARDING } from '../../data'

const STAGES = ['Application', 'Screening', 'Offer', 'Pre-Start', 'Active']

const pipeline: Record<string, { name: string; role: string; trade: string; date: string; note: string }[]> = {
  Application: [
    { name: 'Kevin Tran', role: 'Sheet Metal Apprentice', trade: 'Sheet Metal', date: 'Apr 5', note: 'Applied via Indeed — strong NCCER background' },
    { name: 'Sandra Pierce', role: 'Project Admin', trade: 'Admin', date: 'Apr 4', note: 'Referred by Bryan O\'Neal — resume under review' },
  ],
  Screening: [
    { name: 'Marcus Webb', role: 'Pipefitter Apprentice', trade: 'Piping', date: 'Apr 3', note: 'Phone screen scheduled Apr 8 — 3 yrs experience' },
  ],
  Offer: [
    { name: 'Maria Gutierrez', role: 'Admin Coordinator', trade: 'Admin', date: 'Apr 1', note: 'Offer letter sent Apr 1 — awaiting signature' },
    { name: 'Omar Hassan', role: 'Sheet Metal Foreman', trade: 'Sheet Metal', date: 'Mar 30', note: 'Verbal accept — formal offer in DocuSign' },
  ],
  'Pre-Start': [
    { name: 'Carlos Mendez', role: 'Pipefitter Journeyman', trade: 'Piping', date: 'Apr 14', note: 'Background cleared — benefits enrollment in progress' },
    { name: 'Denzel Parker', role: 'HVAC Technician II', trade: 'HVAC', date: 'Apr 21', note: 'I-9 pending — drug screen cleared' },
  ],
  Active: [
    { name: 'Jose Reyes', role: 'Sheet Metal Journeyman', trade: 'Sheet Metal', date: 'Mar 10', note: 'Started Mar 10 — assigned Memorial Hermann' },
    { name: 'Alicia Chen', role: 'Project Coordinator', trade: 'Admin', date: 'Mar 3', note: 'Started Mar 3 — fully onboarded' },
  ],
}

const roster = [
  { name: 'Tom Nguyen', title: 'General Foreman', trade: 'HVAC', start: 'Jan 8, 2018', certs: 'OSHA-30, NCCER L4', status: 'Active' },
  { name: 'Ray Castillo', title: 'Foreman', trade: 'Piping', start: 'Mar 15, 2019', certs: 'OSHA-30, MPL', status: 'Active' },
  { name: 'Josh Harris', title: 'Lead Tech / TACLA', trade: 'HVAC', start: 'Jun 2, 2020', certs: 'TACLA, OSHA-10, EPA 608', status: 'Active' },
  { name: 'Jose Reyes', title: 'Sheet Metal Journeyman', trade: 'Sheet Metal', start: 'Mar 10, 2025', certs: 'NCCER L3, OSHA-10', status: 'Active' },
  { name: 'Marcus Davis', title: 'Pipefitter Foreman', trade: 'Piping', start: 'Sep 12, 2021', certs: 'OSHA-30, NCCER L4, TACLA', status: 'Active' },
  { name: 'Juan Morales', title: 'Journeyman HVAC Tech', trade: 'HVAC', start: 'Feb 1, 2022', certs: 'OSHA-10, EPA 608', status: 'Active' },
  { name: 'Terry Chen', title: 'Service Tech II', trade: 'HVAC', start: 'Apr 15, 2023', certs: 'EPA 608, OSHA-10', status: 'Active' },
  { name: 'Alicia Chen', title: 'Project Coordinator', trade: 'Admin', start: 'Mar 3, 2025', certs: '—', status: 'Active' },
  { name: 'David Kim', title: 'Project Manager', trade: 'PM', start: 'Aug 1, 2019', certs: 'PMP, OSHA-30', status: 'Active' },
  { name: 'Bryan O\'Neal', title: 'Master Plumber', trade: 'Plumbing', start: 'May 7, 2017', certs: 'MPL, OSHA-30', status: 'Active' },
  { name: 'Carlos Mendez', title: 'Pipefitter Journeyman', trade: 'Piping', start: 'Apr 14, 2025', certs: 'NCCER L3 (pending)', status: 'Pre-Start' },
  { name: 'Denzel Parker', title: 'HVAC Technician II', trade: 'HVAC', start: 'Apr 21, 2025', certs: 'EPA 608 (pending)', status: 'Pre-Start' },
]

const certifications = [
  { name: 'Tom Nguyen', cert: 'OSHA-30', issuer: 'OSHA', issued: 'Mar 2021', expiry: 'Mar 2024', status: 'Expired — Renewal Due' },
  { name: 'Tom Nguyen', cert: 'NCCER Level 4', issuer: 'NCCER', issued: 'Jan 2019', expiry: 'N/A', status: 'Active' },
  { name: 'Josh Harris', cert: 'TACLA', issuer: 'TDLR', issued: 'Jun 2022', expiry: 'Jun 14, 2025', status: 'Active — 69 days' },
  { name: 'Josh Harris', cert: 'EPA 608 Universal', issuer: 'EPA', issued: 'May 2019', expiry: 'Lifetime', status: 'Active' },
  { name: 'Marcus Davis', cert: 'TACLA', issuer: 'TDLR', issued: 'Jan 2024', expiry: 'Jan 15, 2026', status: 'Active' },
  { name: "Bryan O'Neal", cert: 'MPL (Master Plumber)', issuer: 'TSBPE', issued: 'Oct 2021', expiry: 'Sep 30, 2025', status: 'Active — 177 days' },
  { name: 'David Kim', cert: 'PMP', issuer: 'PMI', issued: 'Feb 2021', expiry: 'Feb 2024', status: 'Expired — Renewal Due' },
  { name: 'Juan Morales', cert: 'EPA 608 Universal', issuer: 'EPA', issued: 'Apr 2022', expiry: 'Lifetime', status: 'Active' },
  { name: 'Terry Chen', cert: 'EPA 608 Universal', issuer: 'EPA', issued: 'Jun 2023', expiry: 'Lifetime', status: 'Active' },
  { name: 'Carlos Mendez', cert: 'NCCER Level 3', issuer: 'NCCER', issued: '—', expiry: '—', status: 'Pending Verification' },
  { name: 'Denzel Parker', cert: 'EPA 608 Universal', issuer: 'EPA', issued: '—', expiry: '—', status: 'Pending Verification' },
]

const benefits = [
  { name: 'Carlos Mendez', plan: 'BCBS Silver PPO', dental: 'Yes', vision: 'Yes', enrolled: false, deadline: 'Apr 12, 2025', note: 'Enrollment link sent Apr 6' },
  { name: 'Denzel Parker', plan: '—', dental: '—', vision: '—', enrolled: false, deadline: 'Apr 19, 2025', note: 'Awaiting I-9 — enrollment pending' },
  { name: 'Maria Gutierrez', plan: '—', dental: '—', vision: '—', enrolled: false, deadline: 'Apr 26, 2025', note: 'Offer not yet signed — pre-enrollment hold' },
  { name: 'Omar Hassan', plan: '—', dental: '—', vision: '—', enrolled: false, deadline: 'May 3, 2025', note: 'Pending offer finalization' },
]

const completedLog = [
  { time: '11:20am', task: 'ONB-0612', desc: 'Benefits enrollment link sent to Carlos Mendez — BCBS Silver PPO — deadline Apr 12', outcome: 'Sent' },
  { time: '10:52am', task: 'ONB-0611', desc: 'I-9 reminder sent to Denzel Parker — start date Apr 21 — must complete by Apr 11', outcome: 'Notified' },
  { time: '10:28am', task: 'ONB-0610', desc: 'Background check cleared — Carlos Mendez — Checkr returned all-clear — advancing to benefits', outcome: 'Cleared' },
  { time: '9:55am', task: 'ONB-0609', desc: 'NCCER Level 3 verification request sent to registry — Carlos Mendez — awaiting response', outcome: 'Pending' },
  { time: '9:30am', task: 'ONB-0608', desc: 'Workforce roster updated — Jose Reyes fully onboarded — assigned to Memorial Hermann team', outcome: 'Updated' },
  { time: '9:05am', task: 'ONB-0607', desc: 'Tom Nguyen OSHA-30 expiration flagged — renewal overdue — email sent to SHIELD and David Kim', outcome: 'Escalated' },
  { time: '8:40am', task: 'ONB-0606', desc: 'New applicant Kevin Tran received — Sheet Metal Apprentice — routed to screening queue', outcome: 'Routed' },
  { time: 'Apr 5', task: 'ONB-0605', desc: 'Alicia Chen orientation complete — all onboarding checklist items closed — file archived', outcome: 'Archived' },
]

export default function ONBOARDWorkspace() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'roster' | 'certs' | 'benefits'>('pipeline')
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>{toast}</div>}

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'In Pipeline', value: Object.values(pipeline).flat().length, sub: 'across all stages', color: '#1e40af' },
          { label: 'Starting This Month', value: 2, sub: 'Mendez (Apr 14), Parker (Apr 21)', color: '#0B1E3D' },
          { label: 'Active Workforce', value: 48, sub: 'field + office', color: '#166534' },
          { label: 'Certifications Tracked', value: certifications.length, sub: `${certifications.filter(c => c.status.includes('Expired') || c.status.includes('Pending')).length} need attention`, color: '#92400e' },
          { label: 'Turnover YTD', value: '4.2%', sub: 'industry avg 12.8%', color: '#166534' },
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
            {[['pipeline', 'Onboarding Pipeline'], ['roster', 'Workforce Roster'], ['certs', 'Certifications'], ['benefits', 'Benefits']].map(([id, label]) => (
              <div key={id} className={`tab ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id as any)}>{label}</div>
            ))}
          </div>

          {/* PIPELINE — Kanban */}
          {activeTab === 'pipeline' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
              {STAGES.map(stage => (
                <div key={stage} style={{ background: '#F7F8FA', borderRadius: 8, padding: 12, minHeight: 280 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#5A6A7A', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
                    {stage}
                    <span style={{ background: '#0B1E3D', color: '#fff', borderRadius: 10, padding: '1px 7px', fontSize: 10 }}>{pipeline[stage]?.length || 0}</span>
                  </div>
                  {(pipeline[stage] || []).map(c => (
                    <div key={c.name} className="card" style={{ padding: 10, marginBottom: 8, cursor: 'pointer' }} onClick={() => showToast(`Opening ${c.name} candidate file`)}>
                      <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 2 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 4 }}>{c.role}</div>
                      <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 6 }}>{c.date}</div>
                      <div style={{ fontSize: 11, color: '#374151', lineHeight: 1.4, marginBottom: 6 }}>{c.note}</div>
                      <span className="badge badge-blue" style={{ fontSize: 10 }}>{c.trade}</span>
                    </div>
                  ))}
                  <button className="btn-secondary" style={{ width: '100%', fontSize: 11, marginTop: 6 }} onClick={() => showToast(`Add candidate to ${stage}`)}>+ Add</button>
                </div>
              ))}
            </div>
          )}

          {/* ROSTER */}
          {activeTab === 'roster' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
                <span>Active Workforce Roster — {roster.length} Employees</span>
                <button className="btn-gold" style={{ fontSize: 11, padding: '3px 10px' }} onClick={() => showToast('Export to Excel initiated')}>Export</button>
              </div>
              <table>
                <thead><tr><th>Name</th><th>Title</th><th>Trade</th><th>Start Date</th><th>Certifications</th><th>Status</th></tr></thead>
                <tbody>
                  {roster.map((r, i) => (
                    <tr key={i} onClick={() => showToast(`Opening ${r.name} employee file`)}>
                      <td style={{ fontWeight: 600, fontSize: 13 }}>{r.name}</td>
                      <td style={{ fontSize: 12 }}>{r.title}</td>
                      <td><span className="badge badge-blue" style={{ fontSize: 10 }}>{r.trade}</span></td>
                      <td style={{ fontSize: 12 }}>{r.start}</td>
                      <td style={{ fontSize: 12, color: '#5A6A7A' }}>{r.certs}</td>
                      <td><span className={`badge ${r.status === 'Active' ? 'badge-green' : 'badge-amber'}`}>{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* CERTIFICATIONS */}
          {activeTab === 'certs' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13 }}>Craft Certification Tracker — {certifications.length} Records</div>
              <table>
                <thead><tr><th>Employee</th><th>Certification</th><th>Issuer</th><th>Issued</th><th>Expiry</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {certifications.map((c, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600, fontSize: 12 }}>{c.name}</td>
                      <td style={{ fontSize: 12 }}>{c.cert}</td>
                      <td style={{ fontSize: 12, color: '#5A6A7A' }}>{c.issuer}</td>
                      <td style={{ fontSize: 12 }}>{c.issued}</td>
                      <td style={{ fontSize: 12 }}>{c.expiry}</td>
                      <td>
                        <span className={`badge ${c.status === 'Active' ? 'badge-green' : c.status.includes('Expired') ? 'badge-red' : 'badge-amber'}`} style={{ fontSize: 10 }}>
                          {c.status}
                        </span>
                      </td>
                      <td>
                        {(c.status.includes('Expired') || c.status.includes('Pending')) && (
                          <button className="btn-secondary" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => showToast(`Renewal notice sent for ${c.cert} — ${c.name}`)}>Renew</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* BENEFITS */}
          {activeTab === 'benefits' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {ONBOARDING.map(emp => (
                <div key={emp.name} className="card" style={{ padding: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{emp.name}</div>
                      <div style={{ fontSize: 12, color: '#5A6A7A', marginTop: 2 }}>{emp.role} · Start: {emp.startDate}</div>
                    </div>
                    <span className="badge badge-amber">{emp.step}</span>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, color: '#5A6A7A', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>Onboarding Checklist</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {emp.checklist.map(item => (
                        <div key={item.item} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: item.done ? '#166534' : '#94a3b8' }}>
                          <span>{item.done ? '✓' : '○'}</span>
                          <span>{item.item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-primary" style={{ fontSize: 12 }} onClick={() => showToast(`Benefits enrollment reminder sent to ${emp.name}`)}>Send Reminder</button>
                    <button className="btn-secondary" style={{ fontSize: 12 }} onClick={() => showToast(`${emp.name} checklist opened for editing`)}>Edit Checklist</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Task Log */}
        <div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13 }}>ONBOARD — Completed Tasks Today</div>
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
