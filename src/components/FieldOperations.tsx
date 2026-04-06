import { useState } from 'react'
import { SUBS, ONBOARDING } from '../data'

export default function FieldOperations() {
  const [activeTab, setActiveTab] = useState<'subs' | 'onboard'>('subs')
  const [selectedSub, setSelectedSub] = useState<typeof SUBS[0] | null>(null)
  const [selectedOnboard, setSelectedOnboard] = useState<typeof ONBOARDING[0] | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000 }}>{toast}</div>}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0B1E3D' }}>Field Operations</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#5A6A7A' }}>FIELD · ONBOARD · Subcontractor management and workforce onboarding</p>
      </div>

      <div className="tab-bar">
        <div className={`tab ${activeTab === 'subs' ? 'active' : ''}`} onClick={() => setActiveTab('subs')}>Subcontractor Management</div>
        <div className={`tab ${activeTab === 'onboard' ? 'active' : ''}`} onClick={() => setActiveTab('onboard')}>Workforce Onboarding</div>
      </div>

      {activeTab === 'subs' && (
        <div>
          {/* Alert */}
          <div style={{ background: '#fee2e2', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 8, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span>🚨</span>
            <div>
              <div style={{ fontWeight: 700, color: '#991b1b', fontSize: 13 }}>COI Expired — Premier Sheet Metal</div>
              <div style={{ fontSize: 12, color: '#dc2626' }}>Active on Memorial Hermann & Baylor COM — AP invoices blocked by LEDGER</div>
            </div>
            <button className="btn-danger" style={{ marginLeft: 'auto', fontSize: 12 }} onClick={() => showToast('📋 COI request sent to Premier Sheet Metal')}>Request COI</button>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 20 }}>
            <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600 }}>Active Subcontractor Directory</div>
            <table>
              <thead><tr><th>Sub Name</th><th>Trade</th><th>Active Projects</th><th>Crew</th><th>Today's Status</th><th>Daily Report</th><th>Safety</th><th>Action</th></tr></thead>
              <tbody>
                {SUBS.map(s => (
                  <tr key={s.name} onClick={() => setSelectedSub(s)}>
                    <td style={{ fontWeight: 600 }}>{s.name}</td>
                    <td style={{ color: '#5A6A7A' }}>{s.trade}</td>
                    <td style={{ fontSize: 12, color: '#5A6A7A' }}>{s.projects}</td>
                    <td style={{ textAlign: 'center' }}>{s.crew}</td>
                    <td><span className={`badge ${s.status === 'On Site' ? 'badge-green' : s.status === 'Completed' ? 'badge-navy' : 'badge-amber'}`}>{s.status}</span></td>
                    <td style={{ fontSize: 12, color: s.reportTime === '—' ? '#94a3b8' : '#166534' }}>{s.reportTime}</td>
                    <td><span className={`badge ${s.safety === 'Compliant' ? 'badge-green' : 'badge-red'}`}>{s.safety}</span></td>
                    <td onClick={e => e.stopPropagation()}>
                      <button className="btn-secondary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => setSelectedSub(s)}>View Report</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedSub && (
            <div className="modal-backdrop" onClick={() => setSelectedSub(null)}>
              <div className="modal" onClick={e => e.stopPropagation()}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(11,30,61,0.08)', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{selectedSub.name}</div>
                    <div style={{ fontSize: 13, color: '#5A6A7A', marginTop: 2 }}>{selectedSub.trade} · {selectedSub.crew} crew members</div>
                  </div>
                  <button style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94a3b8' }} onClick={() => setSelectedSub(null)}>✕</button>
                </div>
                <div style={{ padding: 24 }}>
                  {selectedSub.safety !== 'Compliant' && (
                    <div style={{ background: '#fee2e2', borderRadius: 6, padding: 12, marginBottom: 16, fontSize: 12, color: '#991b1b', fontWeight: 600 }}>
                      ⚠ SAFETY ALERT: {selectedSub.safety} — Immediate action required
                    </div>
                  )}
                  <div style={{ fontWeight: 600, marginBottom: 12 }}>Daily Field Report</div>
                  <div style={{ background: '#F7F8FA', borderRadius: 6, padding: 14, fontSize: 12, color: '#5A6A7A', lineHeight: 1.7, marginBottom: 16 }}>
                    <strong style={{ color: '#1C2A3A' }}>Report Time:</strong> {selectedSub.reportTime}<br />
                    <strong style={{ color: '#1C2A3A' }}>Status:</strong> {selectedSub.status}<br />
                    <strong style={{ color: '#1C2A3A' }}>Work Completed:</strong> {selectedSub.trade} work progressing per schedule. Crew of {selectedSub.crew} active on site. No incidents reported. Materials on hand sufficient for remainder of week.<br />
                    <strong style={{ color: '#1C2A3A' }}>Issues:</strong> {selectedSub.safety !== 'Compliant' ? 'COI expired — SHIELD notified — AP invoices on hold' : 'None'}
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 8 }}>Photos (Thumbnails)</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {[1,2,3].map(n => (
                        <div key={n} style={{ width: 80, height: 60, background: '#e2e8f0', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📷</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn-primary" onClick={() => { showToast('✓ Report approved'); setSelectedSub(null) }}>Approve</button>
                    <button className="btn-secondary" onClick={() => { showToast('📝 Revision requested'); setSelectedSub(null) }}>Request Revision</button>
                    <button className="btn-secondary" onClick={() => { showToast('🚩 Issue flagged'); setSelectedSub(null) }}>Flag Issue</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'onboard' && (
        <div>
          <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 20 }}>
            <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600 }}>Onboarding Pipeline — ONBOARD ADE</div>
            <table>
              <thead><tr><th>Candidate</th><th>Role</th><th>Start Date</th><th>Current Step</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {ONBOARDING.map(o => (
                  <tr key={o.name} onClick={() => setSelectedOnboard(o)}>
                    <td style={{ fontWeight: 600 }}>{o.name}</td>
                    <td style={{ color: '#5A6A7A' }}>{o.role}</td>
                    <td>{o.startDate}</td>
                    <td>{o.step}</td>
                    <td><span className={`badge ${o.status === 'In Progress' ? 'badge-blue' : o.status.includes('Cleared') ? 'badge-green' : o.status.includes('Awaiting') ? 'badge-amber' : 'badge-amber'}`}>{o.status}</span></td>
                    <td onClick={e => e.stopPropagation()}>
                      <button className="btn-secondary" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => setSelectedOnboard(o)}>View Checklist</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedOnboard && (
            <div className="modal-backdrop" onClick={() => setSelectedOnboard(null)}>
              <div className="modal" onClick={e => e.stopPropagation()}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(11,30,61,0.08)', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{selectedOnboard.name}</div>
                    <div style={{ fontSize: 13, color: '#5A6A7A', marginTop: 2 }}>{selectedOnboard.role} · Start: {selectedOnboard.startDate}</div>
                  </div>
                  <button style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94a3b8' }} onClick={() => setSelectedOnboard(null)}>✕</button>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ fontWeight: 600, marginBottom: 12 }}>Onboarding Checklist</div>
                  {selectedOnboard.checklist.map(item => (
                    <div key={item.item} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(11,30,61,0.05)' }}>
                      <div style={{ width: 18, height: 18, borderRadius: 4, background: item.done ? '#dcfce7' : '#fef3c7', border: `2px solid ${item.done ? '#22c55e' : '#f59e0b'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>
                        {item.done ? '✓' : '○'}
                      </div>
                      <span style={{ fontSize: 13, color: item.done ? '#166534' : '#92400e', textDecoration: item.done ? 'none' : 'none' }}>{item.item}</span>
                      <span style={{ marginLeft: 'auto', fontSize: 11, color: item.done ? '#166534' : '#92400e' }}>{item.done ? 'Complete' : 'Pending'}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                    <button className="btn-primary" onClick={() => { showToast('✓ Next step initiated by ONBOARD'); setSelectedOnboard(null) }}>Advance to Next Step</button>
                    <button className="btn-secondary" onClick={() => { showToast('📧 Reminder sent to candidate'); setSelectedOnboard(null) }}>Send Reminder</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
