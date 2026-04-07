import { useState } from 'react'
import { PROJECTS } from '../../data'

export default function VECTORWorkspace() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null)
  const [activeTab, setActiveTab] = useState<'budget' | 'earned-value' | 'co-log' | 'rfi-log' | 'forecast'>('budget')
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  // Earned value data per project
  const evData = [
    { id: 'P-2024-141', name: 'Memorial Hermann MOB Ph2', gc: 'Tellepsen', bac: 2847000, ev: 1395000, ac: 1412000, pv: 1385000, cpi: 0.987, spi: 1.007, eac: 2884000, vac: -37000, tcpi: 0.994 },
    { id: 'P-2024-138', name: "Texas Children's Pavilion", gc: 'McCarthy', bac: 3120000, ev: 2808000, ac: 2740000, pv: 2830000, cpi: 1.025, spi: 0.992, eac: 3044000, vac: 76000, tcpi: 1.082 },
    { id: 'P-2025-002', name: 'Baylor COM Lab Reno', gc: 'Hensel Phelps', bac: 1640000, ev: 286000, ac: 340000, pv: 290000, cpi: 0.841, spi: 0.986, eac: 1949000, vac: -309000, tcpi: 1.081 },
    { id: 'P-2025-004', name: 'Dell EMC Data Center Ph2', gc: 'Hensel Phelps', bac: 4100000, ev: 123000, ac: 118000, pv: 120000, cpi: 1.042, spi: 1.025, eac: 3934000, vac: 166000, tcpi: 0.995 },
    { id: 'P-2024-145', name: 'HCA Far West Pavilion', gc: 'Turner', bac: 1890000, ev: 856000, ac: 862000, pv: 900000, cpi: 0.993, spi: 0.951, eac: 1902000, vac: -12000, tcpi: 0.999 },
    { id: 'P-2024-149', name: 'Harris County Admin Complex', gc: 'Gilbane', bac: 720000, ev: 176000, ac: 170000, pv: 174000, cpi: 1.035, spi: 1.011, eac: 696000, vac: 24000, tcpi: 0.985 },
  ]

  const totalBAC = evData.reduce((s, p) => s + p.bac, 0)
  const totalEV = evData.reduce((s, p) => s + p.ev, 0)
  const totalAC = evData.reduce((s, p) => s + p.ac, 0)
  const overallCPI = totalEV / totalAC
  const overallSPI = totalEV / evData.reduce((s, p) => s + p.pv, 0)

  const completedLog = [
    { time: '11:42am', task: 'VEC-0841', desc: 'Budget variance report generated — Baylor COM Lab — 8.4% labor overrun flagged', outcome: 'Escalated to PM' },
    { time: '11:18am', task: 'VEC-0840', desc: 'Earned value update processed — Memorial Hermann — CPI 0.987 — within tolerance', outcome: 'Logged' },
    { time: '10:55am', task: 'VEC-0839', desc: 'CO-019 financial impact calculated — HCA Far West — $67,800 credit to contract', outcome: 'Sent to CORA' },
    { time: '10:31am', task: 'VEC-0838', desc: 'Schedule compression analysis — Texas Children\'s — 3 days ahead — closeout plan drafted', outcome: 'Complete' },
    { time: '9:48am', task: 'VEC-0837', desc: 'Monthly WIP report compiled — 6 projects — sent to Controller Sarah Thornton', outcome: 'Delivered' },
    { time: '9:22am', task: 'VEC-0836', desc: 'Dell EMC mobilization cost tracked — $118,000 actual vs $120,000 planned — favorable', outcome: 'Logged' },
    { time: '8:55am', task: 'VEC-0835', desc: 'Submittal log updated — Memorial Hermann SUB-045 — Revise & Resubmit received', outcome: 'Updated' },
    { time: '8:30am', task: 'VEC-0834', desc: 'Labor productivity report — all active projects — weekly summary emailed to ops team', outcome: 'Sent' },
    { time: '8:10am', task: 'VEC-0833', desc: 'Baylor COM RFI-0041 aging alert — 7 days outstanding — escalation email sent to Hensel Phelps', outcome: 'Escalated' },
    { time: 'Apr 5', task: 'VEC-0832', desc: 'Harris County monthly progress billing — $36,000 application drafted — sent to ARIA', outcome: 'Forwarded' },
  ]

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>{toast}</div>}

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Total Contract Value', value: `$${(totalBAC/1000000).toFixed(2)}M`, sub: '6 active projects', color: '#0B1E3D' },
          { label: 'Earned Value (EV)', value: `$${(totalEV/1000000).toFixed(2)}M`, sub: `${((totalEV/totalBAC)*100).toFixed(1)}% of contract`, color: '#1e40af' },
          { label: 'Portfolio CPI', value: overallCPI.toFixed(3), sub: overallCPI >= 1 ? '▲ Favorable' : '▼ Cost overrun', color: overallCPI >= 1 ? '#166534' : '#dc2626' },
          { label: 'Portfolio SPI', value: overallSPI.toFixed(3), sub: overallSPI >= 1 ? '▲ Ahead of schedule' : '▼ Behind schedule', color: overallSPI >= 1 ? '#166534' : '#dc2626' },
          { label: 'Open Change Orders', value: '$96,200', sub: '3 pending approval', color: '#92400e' },
        ].map(k => (
          <div key={k.label} className="kpi-card">
            <div style={{ fontSize: 10, color: '#5A6A7A', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 600 }}>{k.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: k.color, letterSpacing: '-0.5px' }}>{k.value}</div>
            <div style={{ fontSize: 11, color: '#5A6A7A', marginTop: 3 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, marginBottom: 20 }}>
        {/* Main data panel */}
        <div>
          <div className="tab-bar">
            {[['budget', 'Budget & EV Analysis'], ['earned-value', 'Earned Value Detail'], ['co-log', 'Change Order Pipeline'], ['rfi-log', 'RFI Aging'], ['forecast', 'Cost Forecast']].map(([id, label]) => (
              <div key={id} className={`tab ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id as any)}>{label}</div>
            ))}
          </div>

          {activeTab === 'budget' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
                <span>Project Budget Performance</span>
                <span style={{ color: '#C89B3C', fontSize: 12 }}>Total Portfolio: ${(totalBAC/1000000).toFixed(2)}M</span>
              </div>
              <table>
                <thead><tr><th>Project</th><th>GC</th><th>Contract</th><th>Billed</th><th>% Complete</th><th>Budget Status</th><th>Schedule</th><th>Action</th></tr></thead>
                <tbody>
                  {PROJECTS.map(p => (
                    <tr key={p.id} onClick={() => setSelectedProject(p)}>
                      <td style={{ fontWeight: 600, fontSize: 12 }}>{p.name.length > 28 ? p.name.substring(0, 28) + '…' : p.name}</td>
                      <td style={{ color: '#5A6A7A', fontSize: 11 }}>{p.gc}</td>
                      <td style={{ fontWeight: 700 }}>${(p.contractValue/1000000).toFixed(2)}M</td>
                      <td>${(p.billedToDate/1000).toFixed(0)}K</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 48, background: '#e2e8f0', borderRadius: 999, height: 5 }}>
                            <div style={{ width: `${p.pctComplete}%`, height: '100%', borderRadius: 999, background: p.health === 'red' ? '#ef4444' : p.health === 'amber' ? '#f59e0b' : '#22c55e' }}></div>
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 700 }}>{p.pctComplete}%</span>
                        </div>
                      </td>
                      <td><span className={`badge ${p.budgetStatus.includes('OVER') ? 'badge-red' : p.budgetStatus.includes('Under') ? 'badge-blue' : 'badge-green'}`} style={{ fontSize: 10 }}>{p.budgetStatus}</span></td>
                      <td><span className={`badge ${p.scheduleStatus.includes('behind') ? 'badge-amber' : p.scheduleStatus === 'Mobilizing' ? 'badge-navy' : 'badge-green'}`} style={{ fontSize: 10 }}>{p.scheduleStatus}</span></td>
                      <td onClick={e => e.stopPropagation()}>
                        <button className="btn-secondary" style={{ fontSize: 10, padding: '2px 8px' }} onClick={() => setSelectedProject(p)}>Drill Down</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'earned-value' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13 }}>Earned Value Metrics — All Active Projects</div>
              <table>
                <thead><tr><th>Project</th><th>BAC</th><th>EV</th><th>AC</th><th>CV</th><th>CPI</th><th>SPI</th><th>EAC</th><th>VAC</th></tr></thead>
                <tbody>
                  {evData.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 600, fontSize: 11 }}>{p.name.substring(0, 22)}…</td>
                      <td style={{ fontSize: 11 }}>${(p.bac/1000).toFixed(0)}K</td>
                      <td style={{ fontSize: 11 }}>${(p.ev/1000).toFixed(0)}K</td>
                      <td style={{ fontSize: 11 }}>${(p.ac/1000).toFixed(0)}K</td>
                      <td style={{ fontSize: 11, fontWeight: 700, color: (p.ev - p.ac) >= 0 ? '#166534' : '#dc2626' }}>{(p.ev - p.ac) >= 0 ? '+' : '-'}${Math.abs(p.ev - p.ac).toLocaleString()}</td>
                      <td><span style={{ fontWeight: 700, fontSize: 12, color: p.cpi >= 1 ? '#166534' : p.cpi >= 0.9 ? '#92400e' : '#dc2626' }}>{p.cpi.toFixed(3)}</span></td>
                      <td><span style={{ fontWeight: 700, fontSize: 12, color: p.spi >= 1 ? '#166534' : p.spi >= 0.9 ? '#92400e' : '#dc2626' }}>{p.spi.toFixed(3)}</span></td>
                      <td style={{ fontSize: 11, fontWeight: 600 }}>${(p.eac/1000).toFixed(0)}K</td>
                      <td style={{ fontSize: 11, fontWeight: 700, color: p.vac >= 0 ? '#166534' : '#dc2626' }}>{p.vac >= 0 ? '+' : '-'}${Math.abs(p.vac/1000).toFixed(0)}K</td>
                    </tr>
                  ))}
                  <tr style={{ background: '#0B1E3D', color: '#fff' }}>
                    <td style={{ fontWeight: 700, color: '#C89B3C', fontSize: 12 }}>PORTFOLIO TOTAL</td>
                    <td style={{ fontWeight: 700, color: '#fff', fontSize: 12 }}>${(totalBAC/1000000).toFixed(2)}M</td>
                    <td style={{ fontWeight: 700, color: '#fff', fontSize: 12 }}>${(totalEV/1000000).toFixed(2)}M</td>
                    <td style={{ fontWeight: 700, color: '#fff', fontSize: 12 }}>${(totalAC/1000000).toFixed(2)}M</td>
                    <td style={{ fontWeight: 700, color: totalEV - totalAC >= 0 ? '#86efac' : '#fca5a5', fontSize: 12 }}>{totalEV - totalAC >= 0 ? '+' : '-'}${Math.abs((totalEV - totalAC)/1000).toFixed(0)}K</td>
                    <td style={{ fontWeight: 800, color: overallCPI >= 1 ? '#86efac' : '#fca5a5', fontSize: 13 }}>{overallCPI.toFixed(3)}</td>
                    <td style={{ fontWeight: 800, color: overallSPI >= 1 ? '#86efac' : '#fca5a5', fontSize: 13 }}>{overallSPI.toFixed(3)}</td>
                    <td colSpan={2}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'co-log' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(11,30,61,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>Change Order Pipeline</span>
                <button className="btn-primary" style={{ fontSize: 11 }} onClick={() => showToast('📝 CORA initiated new CO workflow')}>+ Initiate CO</button>
              </div>
              <table>
                <thead><tr><th>CO #</th><th>Project</th><th>Description</th><th>Amount</th><th>Impact on Margin</th><th>Status</th><th>Days Open</th><th>Action</th></tr></thead>
                <tbody>
                  {[
                    { id: 'CO-013', project: 'Memorial Hermann', desc: 'Diffuser type upgrade — Level 5', amount: 6200, margin: '+0.2%', status: 'Pending', days: 9 },
                    { id: 'CO-014', project: 'Memorial Hermann', desc: 'Mechanical room acoustic treatment', amount: 43500, margin: '+1.5%', status: 'Executed', days: 3 },
                    { id: 'CO-015', project: 'HCA Far West', desc: 'HVAC zoning addition — Radiology', amount: 28400, margin: '+1.5%', status: 'Pending', days: 4 },
                    { id: 'CO-019', project: 'HCA Far West', desc: 'Credit — deleted pneumatic tube rough-in', amount: -67800, margin: '-3.6%', status: 'Under Review', days: 2 },
                    { id: 'CO-020', project: 'HCA Far West', desc: 'New mechanical room layout', amount: 28400, margin: '+1.5%', status: 'Initiated', days: 1 },
                    { id: 'CO-001', project: 'Baylor COM Lab', desc: 'Added exhaust riser — scope change', amount: 18200, margin: '+1.1%', status: 'Approved', days: 22 },
                  ].map(co => (
                    <tr key={co.id}>
                      <td style={{ fontWeight: 700, color: '#2E6FD9' }}>{co.id}</td>
                      <td style={{ fontSize: 11, color: '#5A6A7A' }}>{co.project}</td>
                      <td style={{ fontSize: 12 }}>{co.desc}</td>
                      <td style={{ fontWeight: 700, color: co.amount < 0 ? '#dc2626' : '#166534' }}>{co.amount < 0 ? '-' : '+'}${Math.abs(co.amount).toLocaleString()}</td>
                      <td style={{ fontSize: 12, color: co.margin.startsWith('-') ? '#dc2626' : '#166534', fontWeight: 600 }}>{co.margin}</td>
                      <td><span className={`badge ${co.status === 'Executed' || co.status === 'Approved' ? 'badge-green' : co.status === 'Pending' || co.status === 'Initiated' ? 'badge-amber' : 'badge-blue'}`} style={{ fontSize: 10 }}>{co.status}</span></td>
                      <td style={{ color: co.days > 7 ? '#dc2626' : '#5A6A7A', fontWeight: co.days > 7 ? 700 : 400, fontSize: 12 }}>{co.days}d</td>
                      <td><button className="btn-secondary" style={{ fontSize: 10, padding: '2px 8px' }} onClick={() => showToast('📋 CO detail opened')}>View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'rfi-log' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13 }}>RFI Aging Analysis — All Projects</div>
              <table>
                <thead><tr><th>RFI #</th><th>Project</th><th>Subject</th><th>Submitted</th><th>Due</th><th>Assigned</th><th>Age (days)</th><th>Status</th></tr></thead>
                <tbody>
                  {[
                    { id: 'RFI-0038', project: 'Memorial Hermann', subject: 'AHU-3 duct routing — grid B-7', submitted: 'Apr 1', due: 'Apr 8', assigned: 'Tellepsen', age: 5, status: 'Open' },
                    { id: 'RFI-0040', project: 'Memorial Hermann', subject: 'Chiller plant pipe size recon.', submitted: 'Apr 3', due: 'Apr 10', assigned: 'Engineer', age: 3, status: 'Open' },
                    { id: 'RFI-0041', project: 'Memorial Hermann', subject: 'Equipment access clearances — 2B', submitted: 'Apr 4', due: 'Apr 11', assigned: 'Architect', age: 2, status: 'Pending' },
                    { id: 'RFI-0041B', project: 'Baylor COM Lab', subject: 'Exhaust CFM reconciliation', submitted: 'Apr 2', due: 'Apr 9', assigned: 'Engineer', age: 4, status: 'Open' },
                    { id: 'RFI-0028', project: 'HCA Far West', subject: 'Roof penetration — RTU curbs', submitted: 'Apr 1', due: 'Apr 8', assigned: 'Architect', age: 5, status: 'Open' },
                    { id: 'RFI-0011', project: 'Harris County', subject: 'Exhaust fan wiring coordination', submitted: 'Apr 4', due: 'Apr 11', assigned: 'Electrical', age: 2, status: 'Open' },
                  ].map(r => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 700, color: '#2E6FD9', fontSize: 12 }}>{r.id}</td>
                      <td style={{ fontSize: 11, color: '#5A6A7A' }}>{r.project}</td>
                      <td style={{ fontSize: 12 }}>{r.subject}</td>
                      <td style={{ fontSize: 11, color: '#5A6A7A' }}>{r.submitted}</td>
                      <td style={{ fontSize: 11, color: '#5A6A7A' }}>{r.due}</td>
                      <td style={{ fontSize: 11 }}>{r.assigned}</td>
                      <td style={{ fontWeight: 700, color: r.age > 4 ? '#dc2626' : r.age > 2 ? '#92400e' : '#166534', fontSize: 12 }}>{r.age}d</td>
                      <td><span className={`badge ${r.status === 'Open' ? 'badge-amber' : 'badge-blue'}`} style={{ fontSize: 10 }}>{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'forecast' && (
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 16 }}>Cost Forecast — Estimate at Completion (EAC)</div>
              {evData.map(p => {
                const overUnder = p.eac - p.bac
                const pct = (Math.abs(overUnder) / p.bac * 100).toFixed(1)
                return (
                  <div key={p.id} style={{ marginBottom: 16, padding: 14, background: '#F7F8FA', borderRadius: 8, border: `1px solid ${overUnder > 0 ? 'rgba(220,38,38,0.15)' : 'rgba(34,197,94,0.15)'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div><span style={{ fontWeight: 700, fontSize: 13 }}>{p.name}</span><span style={{ fontSize: 11, color: '#5A6A7A', marginLeft: 8 }}>{p.gc}</span></div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontWeight: 800, color: overUnder > 0 ? '#dc2626' : '#166534', fontSize: 14 }}>{overUnder > 0 ? '▲ OVER ' : '▼ UNDER '}{pct}%</span>
                        <div style={{ fontSize: 11, color: '#5A6A7A' }}>${Math.abs(overUnder/1000).toFixed(0)}K {overUnder > 0 ? 'forecasted overrun' : 'forecasted savings'}</div>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, fontSize: 11 }}>
                      {[['BAC', `$${(p.bac/1000).toFixed(0)}K`], ['EAC', `$${(p.eac/1000).toFixed(0)}K`], ['CPI', p.cpi.toFixed(3)], ['TCPI', p.tcpi.toFixed(3)], ['VAC', `${overUnder >= 0 ? '-' : '+'}$${Math.abs(overUnder/1000).toFixed(0)}K`]].map(([k, v]) => (
                        <div key={k} style={{ background: '#fff', borderRadius: 5, padding: '6px 8px', textAlign: 'center' }}>
                          <div style={{ color: '#94a3b8', fontSize: 10, marginBottom: 2 }}>{k}</div>
                          <div style={{ fontWeight: 700, color: '#0B1E3D' }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Completed Log */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', height: 'fit-content' }}>
          <div style={{ padding: '12px 16px', background: '#F7F8FA', borderBottom: '1px solid rgba(11,30,61,0.08)', fontWeight: 600, fontSize: 13 }}>Completed Task Log</div>
          <div style={{ overflowY: 'auto', maxHeight: 520 }}>
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

      {/* Project drill-down modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal" style={{ width: 760 }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(11,30,61,0.08)', display: 'flex', justifyContent: 'space-between', background: '#0B1E3D', borderRadius: '10px 10px 0 0' }}>
              <div><div style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>{selectedProject.name}</div><div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>GC: {selectedProject.gc} · PM: {selectedProject.pm}</div></div>
              <button style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }} onClick={() => setSelectedProject(null)}>✕</button>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 13 }}>Budget Waterfall</div>
              <table>
                <thead><tr><th>Category</th><th>Budget</th><th>Actual to Date</th><th>Variance $</th><th>Variance %</th></tr></thead>
                <tbody>
                  {Object.entries(selectedProject.budget).map(([cat, data]) => {
                    const v = data.actual - data.budget
                    return (
                      <tr key={cat}>
                        <td style={{ fontWeight: 600, textTransform: 'capitalize' }}>{cat}</td>
                        <td>${data.budget.toLocaleString()}</td>
                        <td>${data.actual.toLocaleString()}</td>
                        <td style={{ color: v > 0 ? '#dc2626' : '#166534', fontWeight: 700 }}>{v > 0 ? '+' : ''}{v < 0 ? '-$' : '$'}{Math.abs(v).toLocaleString()}</td>
                        <td style={{ color: v > 0 ? '#dc2626' : '#166534' }}>{((v/data.budget)*100).toFixed(1)}%</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <button className="btn-primary" onClick={() => { showToast('📊 Full report generated'); setSelectedProject(null) }}>Generate Report</button>
                <button className="btn-secondary" onClick={() => { showToast('📧 Report emailed to PM'); setSelectedProject(null) }}>Email to PM</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
