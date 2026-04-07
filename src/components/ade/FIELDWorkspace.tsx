import { useState } from 'react'
import { SUBS } from '../../data'

export default function FIELDWorkspace() {
  const [activeTab, setActiveTab] = useState<'directory' | 'reports' | 'manpower' | 'safety'>('directory')
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  const dailyReports = [
    {
      id: 'DR-0481', foreman: 'T. Nguyen', site: 'Memorial Hermann MOB Ph2', date: 'Apr 6, 2025',
      crew: 8, hours: 64, overtime: 8,
      summary: 'Continued ductwork rough-in Level 3 — completed 7 of 12 VAV zones. AHU-2 supply duct main trunk installed and supported per drawings. Coordination with Tellepsen electrical underway for seismic bracing at grid C-7.',
      issues: 'Concrete deck sleeve elevation at grid B-7 still unresolved (RFI-0038 open 5 days). Awaiting structural response for CHW pipe seismic brace spacing.',
      status: 'Pending',
    },
    {
      id: 'DR-0480', foreman: 'R. Castillo', site: "Texas Children's Pavilion", date: 'Apr 6, 2025',
      crew: 6, hours: 48, overtime: 0,
      summary: 'Punchlist work in progress — Zones 4A through 4F. Completed balancing adjustments on 14 of 22 VAV boxes flagged by McCarthy. Ceiling grid interference resolved with sub-contractor on Levels 2–3.',
      issues: 'Missing VAV actuator — ordered — 2-day lead. McCarthy wants punchlist closed by Apr 11.',
      status: 'Approved',
    },
    {
      id: 'DR-0479', foreman: 'J. Morales', site: 'Baylor COM Lab Reno', date: 'Apr 5, 2025',
      crew: 5, hours: 40, overtime: 4,
      summary: 'Fume hood ductwork rough-in completed — Rooms 104–108. Premier Sheet Metal coordination on exhaust fan shaft connection ongoing. Lab pressurization test scheduled for Apr 10 with commissioning agent.',
      issues: 'Premier Sheet Metal was 2 hours late to site — productivity impacted. COI expiration status must be resolved before next billing cycle.',
      status: 'Flagged',
    },
  ]

  const manpowerData = [
    { project: 'Memorial Hermann MOB Ph2', gc: 'Tellepsen', crews: 8, target: 10, week: [7, 8, 8, 9, 8] },
    { project: "Texas Children's Pavilion", gc: 'McCarthy', crews: 6, target: 6, week: [5, 6, 6, 6, 6] },
    { project: 'Baylor COM Lab', gc: 'Hensel Phelps', crews: 5, target: 7, week: [4, 4, 5, 5, 5] },
    { project: 'Dell EMC Data Center', gc: 'Hensel Phelps', crews: 4, target: 4, week: [0, 2, 3, 4, 4] },
    { project: 'HCA Far West Pavilion', gc: 'Turner', crews: 3, target: 4, week: [3, 3, 3, 3, 3] },
    { project: 'Harris County Admin', gc: 'Gilbane', crews: 2, target: 2, week: [2, 2, 2, 2, 2] },
  ]

  const safetyLog = [
    { date: 'Apr 2', type: 'Recordable', project: 'Memorial Hermann MOB', description: 'Laceration — left hand — duct edge unprotected. First aid administered. OSHA 300 filed.', severity: 'red' },
    { date: 'Mar 28', type: 'Near Miss', project: 'Baylor COM Lab', description: 'Unsecured ladder slipped — worker self-corrected. No injury. JSA review conducted same day.', severity: 'amber' },
    { date: 'Mar 21', type: 'Near Miss', project: "Texas Children's Pavilion", description: 'Overhead struck by swinging duct section — hard hat absorbed impact. No injury. Rigging procedure updated.', severity: 'amber' },
    { date: 'Mar 14', type: 'Property Damage', project: 'HCA Far West', description: 'Forklift clipped temporary wall panel — no personnel involved. Panel replaced same day.', severity: 'amber' },
  ]

  const toolboxTalks = [
    { date: 'Apr 6', topic: 'Hand & Finger Protection — Duct Edge Hazards', facilitator: 'T. Nguyen', site: 'Memorial Hermann', attendees: 8, status: 'Complete' },
    { date: 'Apr 5', topic: 'Heat Illness Prevention — Q2 Kickoff', facilitator: 'R. Castillo', site: "Texas Children's", attendees: 6, status: 'Complete' },
    { date: 'Apr 4', topic: 'Ladder Safety — Setup, Inspection, Use', facilitator: 'J. Morales', site: 'Baylor COM', attendees: 5, status: 'Complete' },
    { date: 'Apr 3', topic: 'Elevated Work Permit & Fall Protection', facilitator: 'M. Davis', site: 'Dell EMC', attendees: 4, status: 'Complete' },
    { date: 'Apr 7', topic: 'PPE Inspection — Weekly Walk', facilitator: 'TBD', site: 'All Sites', attendees: 0, status: 'Scheduled' },
  ]

  const completedLog = [
    { time: '11:34am', task: 'FLD-0481', desc: 'Daily report received — Foreman Nguyen — Memorial Hermann — 64 hrs logged — sent to VECTOR', outcome: 'Forwarded' },
    { time: '11:02am', task: 'FLD-0480', desc: 'Manpower schedule updated — Dell EMC mobilization +2 crew this week — confirmed with PM David Kim', outcome: 'Updated' },
    { time: '10:38am', task: 'FLD-0479', desc: 'Premier Sheet Metal COI alert forwarded to SHIELD — 3 open jobs flagged — AP invoice hold requested', outcome: 'Escalated' },
    { time: '10:15am', task: 'FLD-0478', desc: 'DR-0480 Texas Children\'s approved — punchlist progress noted — VECTOR schedule updated', outcome: 'Approved' },
    { time: '9:42am', task: 'FLD-0477', desc: 'Toolbox talk records uploaded — Apr 5 Heat Illness Prevention — 4 sites — 23 attendees total', outcome: 'Filed' },
    { time: '9:10am', task: 'FLD-0476', desc: 'OSHA 300 log updated — recordable incident Apr 2 — Memorial Hermann — first aid case documented', outcome: 'Filed' },
    { time: '8:48am', task: 'FLD-0475', desc: 'Weekly manpower forecast emailed to Mike Gray — 28 deployed, 6 projects active, 3 under target', outcome: 'Sent' },
    { time: 'Apr 5', task: 'FLD-0474', desc: 'Houston Crane & Rigging final rigging complete — HCA Far West — crew signed off — subcontract closed', outcome: 'Closed' },
  ]

  const totalCrew = manpowerData.reduce((s, p) => s + p.crews, 0)

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>{toast}</div>}

      {/* COI Alert Banner */}
      <div style={{ background: '#fee2e2', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 8, padding: '12px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 18 }}>⚠️</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: '#991b1b', fontSize: 13 }}>ACTION REQUIRED: Premier Sheet Metal COI expired Apr 1, 2025</div>
          <div style={{ fontSize: 12, color: '#dc2626', marginTop: 2 }}>3 active projects affected · Memorial Hermann, Baylor COM Lab · AP hold placed by LEDGER · SHIELD notified</div>
        </div>
        <button className="btn-danger" style={{ fontSize: 11 }} onClick={() => showToast('COI renewal request sent to Premier Sheet Metal via email')}>Request COI</button>
        <button className="btn-secondary" style={{ fontSize: 11 }} onClick={() => showToast('Suspension notice drafted — pending PM approval')}>Draft Suspension</button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Active Subs on Site', value: SUBS.filter(s => s.status === 'On Site').length, sub: 'of 4 contracted', color: '#0B1E3D' },
          { label: 'Total Crew Deployed', value: totalCrew, sub: '6 active projects', color: '#1e40af' },
          { label: 'Daily Reports Received', value: '2 / 3', sub: '1 pending — Baylor', color: '#92400e' },
          { label: 'Safety Alerts', value: 1, sub: 'COI expiration', color: '#991b1b' },
          { label: 'Manpower This Week', value: '180 hrs', sub: '28 deployed × 6.4 days', color: '#166534' },
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
            {[['directory', 'Sub Directory'], ['reports', 'Daily Reports'], ['manpower', 'Manpower Chart'], ['safety', 'Safety Board']].map(([id, label]) => (
              <div key={id} className={`tab ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id as any)}>{label}</div>
            ))}
          </div>

          {/* SUB DIRECTORY */}
          {activeTab === 'directory' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
                <span>Subcontractor Field Directory — Active</span>
                <button className="btn-gold" style={{ fontSize: 11, padding: '3px 10px' }} onClick={() => showToast('Add Subcontractor form opened')}>+ Add Sub</button>
              </div>
              <table>
                <thead>
                  <tr><th>Sub / Trade</th><th>Projects</th><th>Crew</th><th>Today Status</th><th>Report</th><th>Safety / COI</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {SUBS.map(s => (
                    <tr key={s.name}>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: '#5A6A7A' }}>{s.trade}</div>
                      </td>
                      <td style={{ fontSize: 12 }}>{s.projects}</td>
                      <td><span className="badge badge-blue">{s.crew} workers</span></td>
                      <td>
                        <span className={`badge ${s.status === 'On Site' ? 'badge-green' : s.status === 'Completed' ? 'badge-navy' : 'badge-amber'}`}>
                          {s.status}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: s.reportTime === '—' ? '#94a3b8' : '#1C2A3A' }}>{s.reportTime}</td>
                      <td>
                        <span className={`badge ${s.safety === 'Compliant' ? 'badge-green' : 'badge-red'}`}>{s.safety}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 8px' }} onClick={() => showToast(`Viewing ${s.name} contact file`)}>View</button>
                          <button className="btn-primary" style={{ fontSize: 11, padding: '4px 8px' }} onClick={() => showToast(`Daily report requested from ${s.name}`)}>Request Report</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* DAILY REPORTS */}
          {activeTab === 'reports' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {dailyReports.map(r => (
                <div key={r.id} className="card" style={{ padding: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{r.id} — {r.site}</div>
                      <div style={{ fontSize: 12, color: '#5A6A7A', marginTop: 2 }}>Foreman: {r.foreman} · Date: {r.date}</div>
                    </div>
                    <span className={`badge ${r.status === 'Approved' ? 'badge-green' : r.status === 'Flagged' ? 'badge-red' : 'badge-amber'}`}>{r.status}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 12 }}>
                    {[['Crew Size', r.crew], ['Total Hours', r.hours], ['Overtime Hrs', r.overtime]].map(([label, val]) => (
                      <div key={label as string} style={{ background: '#F7F8FA', borderRadius: 6, padding: '8px 12px' }}>
                        <div style={{ fontSize: 10, color: '#5A6A7A', textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#0B1E3D', marginTop: 2 }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 11, color: '#5A6A7A', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Work Summary</div>
                    <div style={{ fontSize: 12, color: '#1C2A3A', lineHeight: 1.5 }}>{r.summary}</div>
                  </div>
                  <div style={{ background: '#fef3c7', borderRadius: 6, padding: '8px 12px', marginBottom: 12 }}>
                    <div style={{ fontSize: 11, color: '#92400e', fontWeight: 600, textTransform: 'uppercase', marginBottom: 3 }}>Issues / Open Items</div>
                    <div style={{ fontSize: 12, color: '#78350f', lineHeight: 1.5 }}>{r.issues}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-primary" style={{ fontSize: 12 }} onClick={() => showToast(`${r.id} approved — VECTOR notified`)}>Approve</button>
                    <button className="btn-secondary" style={{ fontSize: 12 }} onClick={() => showToast(`Revision request sent to Foreman ${r.foreman}`)}>Request Revision</button>
                    <button className="btn-danger" style={{ fontSize: 12 }} onClick={() => showToast(`${r.id} flagged for PM review`)}>Flag for PM</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* MANPOWER CHART */}
          {activeTab === 'manpower' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="card" style={{ padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Crew Deployed by Project — This Week</div>
                {manpowerData.map(p => (
                  <div key={p.project} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{p.project}</span>
                        <span style={{ fontSize: 11, color: '#5A6A7A', marginLeft: 8 }}>{p.gc}</span>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: p.crews < p.target ? '#dc2626' : '#166534' }}>
                        {p.crews} / {p.target} target
                      </span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: `${(p.crews / p.target) * 100}%`, background: p.crews < p.target ? '#f59e0b' : '#22c55e' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Weekly Trend — Mon–Fri (All Projects)</div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', height: 100 }}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => {
                    const total = manpowerData.reduce((s, p) => s + (p.week[i] || 0), 0)
                    const maxTotal = 32
                    return (
                      <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#0B1E3D' }}>{total}</div>
                        <div style={{ width: '100%', background: '#2E6FD9', borderRadius: '3px 3px 0 0', height: `${(total / maxTotal) * 80}px`, transition: 'height 0.4s' }} />
                        <div style={{ fontSize: 11, color: '#5A6A7A' }}>{day}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* SAFETY BOARD */}
          {activeTab === 'safety' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {[
                  { label: 'Days Without Incident', value: 4, color: '#166534' },
                  { label: 'TRIR (YTD)', value: '0.82', color: '#0B1E3D' },
                  { label: 'EMR Rating', value: '0.74', color: '#166534' },
                  { label: 'PPE Compliance', value: '98%', color: '#1e40af' },
                ].map(k => (
                  <div key={k.label} className="kpi-card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: '#5A6A7A', marginBottom: 4, textTransform: 'uppercase', fontWeight: 600 }}>{k.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: k.color }}>{k.value}</div>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '10px 16px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13 }}>Incident & Near-Miss Log</div>
                <table>
                  <thead><tr><th>Date</th><th>Type</th><th>Project</th><th>Description</th><th>Severity</th></tr></thead>
                  <tbody>
                    {safetyLog.map((s, i) => (
                      <tr key={i}>
                        <td style={{ fontSize: 12 }}>{s.date}</td>
                        <td><span className={`badge ${s.type === 'Recordable' ? 'badge-red' : 'badge-amber'}`}>{s.type}</span></td>
                        <td style={{ fontSize: 12 }}>{s.project}</td>
                        <td style={{ fontSize: 12 }}>{s.description}</td>
                        <td><span className={`badge badge-${s.severity}`}>{s.severity === 'red' ? 'High' : 'Medium'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '10px 16px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13 }}>Toolbox Talk Tracker</div>
                <table>
                  <thead><tr><th>Date</th><th>Topic</th><th>Facilitator</th><th>Site</th><th>Attendees</th><th>Status</th></tr></thead>
                  <tbody>
                    {toolboxTalks.map((t, i) => (
                      <tr key={i}>
                        <td style={{ fontSize: 12 }}>{t.date}</td>
                        <td style={{ fontSize: 12, fontWeight: 500 }}>{t.topic}</td>
                        <td style={{ fontSize: 12 }}>{t.facilitator}</td>
                        <td style={{ fontSize: 12 }}>{t.site}</td>
                        <td style={{ fontSize: 12 }}>{t.attendees > 0 ? t.attendees : '—'}</td>
                        <td><span className={`badge ${t.status === 'Complete' ? 'badge-green' : 'badge-blue'}`}>{t.status}</span></td>
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
            <div style={{ padding: '12px 16px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13 }}>FIELD — Completed Tasks Today</div>
            <div style={{ padding: '0 0 4px 0' }}>
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
    </div>
  )
}
