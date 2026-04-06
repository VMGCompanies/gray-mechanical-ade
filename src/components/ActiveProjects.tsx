import { useState } from 'react'
import { PROJECTS } from '../data'

type ProjectTab = 'overview' | 'budget' | 'schedule' | 'rfis' | 'submittals' | 'change-orders' | 'daily-reports' | 'documents'

export default function ActiveProjects() {
  const [selected, setSelected] = useState(PROJECTS[0])
  const [tab, setTab] = useState<ProjectTab>('overview')
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  const healthColor = (h: string) => h === 'green' ? '#166534' : h === 'red' ? '#991b1b' : '#92400e'
  const healthBg = (h: string) => h === 'green' ? '#dcfce7' : h === 'red' ? '#fee2e2' : '#fef3c7'

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000 }}>{toast}</div>}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0B1E3D' }}>Active Projects</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#5A6A7A' }}>6 active construction projects · VECTOR monitoring all budgets and schedules</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20 }}>
        {/* Project List */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', height: 'fit-content' }}>
          <div style={{ padding: '12px 16px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13 }}>Projects ({PROJECTS.length})</div>
          {PROJECTS.map(p => (
            <div
              key={p.id}
              onClick={() => { setSelected(p); setTab('overview') }}
              style={{ padding: '14px 16px', borderBottom: '1px solid rgba(11,30,61,0.06)', cursor: 'pointer', background: selected.id === p.id ? 'rgba(46,111,217,0.06)' : '#fff', borderLeft: selected.id === p.id ? '3px solid #2E6FD9' : '3px solid transparent' }}
            >
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4, color: '#0B1E3D' }}>{p.name}</div>
              <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 6 }}>{p.gc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ width: 120, background: '#e2e8f0', borderRadius: 999, height: 5 }}>
                    <div style={{ width: `${p.pctComplete}%`, height: '100%', borderRadius: 999, background: p.health === 'green' ? '#22c55e' : p.health === 'red' ? '#ef4444' : '#f59e0b' }}></div>
                  </div>
                  <div style={{ fontSize: 10, color: '#5A6A7A', marginTop: 3 }}>{p.pctComplete}% complete</div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: healthBg(p.health), color: healthColor(p.health) }}>
                  {p.health === 'green' ? '● On Track' : p.health === 'red' ? '▲ Alert' : '◆ Watch'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail */}
        <div>
          {/* Project header */}
          <div style={{ background: '#0B1E3D', borderRadius: 10, padding: 20, color: '#fff', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{selected.name}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>GC: {selected.gc} · PM: {selected.pm} · Super: {selected.super}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#C89B3C' }}>${selected.contractValue.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Contract Value</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 16 }}>
              {[
                { label: 'Billed to Date', value: `$${selected.billedToDate.toLocaleString()}` },
                { label: '% Complete', value: `${selected.pctComplete}%` },
                { label: 'Budget Status', value: selected.budgetStatus },
                { label: 'Schedule', value: selected.scheduleStatus },
              ].map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 6, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="tab-bar">
            {(['overview', 'budget', 'schedule', 'rfis', 'submittals', 'change-orders', 'daily-reports', 'documents'] as ProjectTab[]).map(t => (
              <div key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                {t === 'change-orders' ? 'Change Orders' : t === 'daily-reports' ? 'Daily Reports' : t.charAt(0).toUpperCase() + t.slice(1)}
              </div>
            ))}
          </div>

          {/* Tab content */}
          {tab === 'overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontWeight: 600, marginBottom: 12 }}>Project Timeline</div>
                {[['Start Date', selected.startDate], ['End Date', selected.endDate], ['Duration', '10.5 months'], ['Elapsed', '6 months'], ['Remaining', '4.5 months']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(11,30,61,0.05)', fontSize: 13 }}>
                    <span style={{ color: '#5A6A7A' }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontWeight: 600, marginBottom: 12 }}>Open Items Summary</div>
                {[
                  ['Open RFIs', selected.rfis.filter(r => r.status === 'Open' || r.status === 'Pending').length],
                  ['Pending Submittals', selected.submittals.filter(s => s.status === 'Pending Submission').length],
                  ['Approved Submittals', selected.submittals.filter(s => s.status === 'Approved').length],
                  ['Open Change Orders', selected.changeOrders.filter(c => c.status === 'Pending' || c.status === 'Under Review').length],
                  ['Approved COs', selected.changeOrders.filter(c => c.status === 'Approved' || c.status === 'Executed').length],
                ].map(([k, v]) => (
                  <div key={String(k)} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(11,30,61,0.05)', fontSize: 13 }}>
                    <span style={{ color: '#5A6A7A' }}>{k}</span><span style={{ fontWeight: 700, color: Number(v) > 0 && String(k).includes('Open') ? '#c2410c' : '#0B1E3D' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'budget' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600 }}>Budget Waterfall — {selected.name}</div>
              <table>
                <thead><tr><th>Category</th><th>Budget</th><th>Actual</th><th>Variance $</th><th>Variance %</th><th>Status</th></tr></thead>
                <tbody>
                  {Object.entries(selected.budget).map(([cat, data]) => {
                    const variance = data.actual - data.budget
                    const pct = ((variance / data.budget) * 100).toFixed(1)
                    const over = variance > 0
                    return (
                      <tr key={cat}>
                        <td style={{ fontWeight: 600, textTransform: 'capitalize' }}>{cat}</td>
                        <td>${data.budget.toLocaleString()}</td>
                        <td>${data.actual.toLocaleString()}</td>
                        <td style={{ color: over ? '#dc2626' : '#166534', fontWeight: 600 }}>{over ? '+' : ''}{variance < 0 ? '-' : ''}${Math.abs(variance).toLocaleString()}</td>
                        <td style={{ color: over ? '#dc2626' : '#166534', fontWeight: 600 }}>{over ? '+' : ''}{pct}%</td>
                        <td><span className={`badge ${over ? 'badge-red' : 'badge-green'}`}>{over ? 'Over' : 'Under'}</span></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'rfis' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(11,30,61,0.08)', fontWeight: 600, fontSize: 14 }}>RFI Log ({selected.rfis.length} total)</div>
              {selected.rfis.length === 0 ? (
                <div style={{ padding: 32, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>No RFIs on file for this project yet.</div>
              ) : (
                <table>
                  <thead><tr><th>RFI #</th><th>Subject</th><th>Submitted</th><th>Due</th><th>Assigned To</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {selected.rfis.map(r => (
                      <tr key={r.id}>
                        <td style={{ fontWeight: 600, color: '#2E6FD9' }}>{r.id}</td>
                        <td>{r.subject}</td>
                        <td style={{ color: '#5A6A7A' }}>{r.submitted}</td>
                        <td style={{ color: '#5A6A7A' }}>{r.due}</td>
                        <td>{r.assignedTo}</td>
                        <td><span className={`badge ${r.status === 'Open' || r.status === 'Pending' ? 'badge-amber' : r.status === 'Answered' ? 'badge-green' : 'badge-navy'}`}>{r.status}</span></td>
                        <td><button className="btn-secondary" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => showToast('📄 RFI detail opened')}>View</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {tab === 'submittals' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(11,30,61,0.08)', fontWeight: 600, fontSize: 14 }}>Submittal Tracker ({selected.submittals.length})</div>
              <table>
                <thead><tr><th>Sub #</th><th>Description</th><th>Status</th><th>Submitted</th><th>Returned</th><th>Action</th></tr></thead>
                <tbody>
                  {selected.submittals.map(s => (
                    <tr key={s.id}>
                      <td style={{ fontWeight: 600, color: '#2E6FD9' }}>{s.id}</td>
                      <td>{s.description}</td>
                      <td><span className={`badge ${s.status === 'Approved' ? 'badge-green' : s.status === 'In Review' ? 'badge-blue' : s.status === 'Revise & Resubmit' ? 'badge-red' : 'badge-amber'}`}>{s.status}</span></td>
                      <td style={{ color: '#5A6A7A' }}>{s.submittedDate}</td>
                      <td style={{ color: '#5A6A7A' }}>{s.returnedDate}</td>
                      <td><button className="btn-secondary" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => showToast('📄 Submittal opened')}>View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'change-orders' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(11,30,61,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>Change Order Log</span>
                <button className="btn-primary" style={{ fontSize: 12 }} onClick={() => showToast('📝 New CO initiated via CORA')}>+ New CO</button>
              </div>
              {selected.changeOrders.length === 0 ? (
                <div style={{ padding: 32, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>No change orders on file yet.</div>
              ) : (
                <table>
                  <thead><tr><th>CO #</th><th>Description</th><th>Amount</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {selected.changeOrders.map(c => (
                      <tr key={c.id}>
                        <td style={{ fontWeight: 600, color: '#2E6FD9' }}>{c.id}</td>
                        <td>{c.description}</td>
                        <td style={{ fontWeight: 700, color: c.amount < 0 ? '#dc2626' : '#166534' }}>{c.amount < 0 ? '-' : '+'}${Math.abs(c.amount).toLocaleString()}</td>
                        <td style={{ color: '#5A6A7A' }}>{c.date}</td>
                        <td><span className={`badge ${c.status === 'Approved' || c.status === 'Executed' ? 'badge-green' : c.status === 'Pending' ? 'badge-amber' : 'badge-blue'}`}>{c.status}</span></td>
                        <td><button className="btn-secondary" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => showToast('✓ CO action taken')}>Action</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {tab === 'schedule' && (
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontWeight: 600, marginBottom: 16 }}>S-Curve — % Complete vs. Time</div>
              <div style={{ position: 'relative', height: 200, background: '#F7F8FA', borderRadius: 6, padding: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 8 }}>Progress (%) — Planned vs. Actual</div>
                {/* Simple visual bar chart by week */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 140 }}>
                  {[{p:8,a:6},{p:16,a:14},{p:26,a:24},{p:36,a:34},{p:46,a:44},{p:55,a:49},{p:65,a:55},{p:74,a:62}].map((week, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', gap: 2, alignItems: 'flex-end', height: '100%' }}>
                      <div style={{ flex: 1, background: '#93c5fd', borderRadius: '2px 2px 0 0', height: `${week.p}%` }} title={`Planned: ${week.p}%`}></div>
                      <div style={{ flex: 1, background: '#2E6FD9', borderRadius: '2px 2px 0 0', height: `${week.a}%` }} title={`Actual: ${week.a}%`}></div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                  {['W1','W2','W3','W4','W5','W6','W7','W8'].map(w => <div key={w} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: '#94a3b8' }}>{w}</div>)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 14, height: 8, background: '#93c5fd', borderRadius: 2 }}></div>Planned</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 14, height: 8, background: '#2E6FD9', borderRadius: 2 }}></div>Actual</div>
              </div>
            </div>
          )}

          {tab === 'daily-reports' && (
            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 14 }}>Daily Field Reports</div>
              {[
                { date: 'Apr 5, 2025', foreman: 'T. Nguyen', crew: 12, hours: 96, work: 'Ductwork rough-in Level 4 — 80% complete. Equipment rigging scheduled for Monday.', issues: 'None' },
                { date: 'Apr 4, 2025', foreman: 'T. Nguyen', crew: 10, hours: 80, work: 'Piping installed grid B-7 through B-12. BAS coordination meeting completed.', issues: 'GC delayed ceiling framing by 1 day.' },
                { date: 'Apr 3, 2025', foreman: 'T. Nguyen', crew: 12, hours: 96, work: 'VAV boxes 24-36 installed and tested. Sheet metal on site.', issues: 'None' },
              ].map(r => (
                <div key={r.date} style={{ border: '1px solid rgba(11,30,61,0.08)', borderRadius: 8, padding: 14, marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontWeight: 600 }}>{r.date}</span>
                    <span style={{ fontSize: 12, color: '#5A6A7A' }}>Foreman: {r.foreman} · {r.crew} crew · {r.hours} hrs</span>
                  </div>
                  <div style={{ fontSize: 13, marginBottom: 6 }}>{r.work}</div>
                  {r.issues !== 'None' && <div style={{ fontSize: 12, color: '#92400e', background: '#fef3c7', padding: '4px 8px', borderRadius: 4 }}>⚠ {r.issues}</div>}
                  <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                    <button className="btn-primary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast('✓ Report approved')}>Approve</button>
                    <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast('📝 Revision requested')}>Request Revision</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'documents' && (
            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 14 }}>Project Documents</div>
              {[
                { name: 'Executed Subcontract — Gray Mechanical', type: 'Contract', date: 'Oct 1, 2024', size: '2.4 MB' },
                { name: 'Mechanical Permit MP-2024-18841', type: 'Permit', date: 'Oct 15, 2024', size: '0.8 MB' },
                { name: 'Insurance Certificate — Texas Mutual', type: 'Insurance', date: 'Jan 1, 2025', size: '0.6 MB' },
                { name: 'Approved Shop Drawings — AHUs 1-4', type: 'Submittal', date: 'Mar 1, 2025', size: '14.2 MB' },
                { name: 'RFI Log — Current', type: 'Log', date: 'Apr 5, 2025', size: '1.1 MB' },
              ].map(d => (
                <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(11,30,61,0.06)' }}>
                  <div>
                    <span style={{ fontSize: 16, marginRight: 10 }}>📄</span>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{d.name}</span>
                    <div style={{ fontSize: 11, color: '#5A6A7A', marginTop: 2 }}>{d.type} · {d.date} · {d.size}</div>
                  </div>
                  <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast('📥 Download started')}>Download</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
