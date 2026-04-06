import { useState } from 'react'
import { ADES, USERS, INTEGRATIONS } from '../data'

type SettingsTab = 'api' | 'ade-config' | 'users' | 'notifications' | 'audit' | 'security'

interface Integration {
  name: string
  status: string
  lastSync: string | null
  records: string | null
  health: string | null
}

function IntegrationCard({ int, onConfigure }: { int: Integration; onConfigure: (name: string) => void }) {
  const connected = int.status === 'connected' || int.status === 'linked'
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(11,30,61,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: connected ? '#22c55e' : '#e2e8f0', boxShadow: connected ? '0 0 0 3px rgba(34,197,94,0.2)' : 'none' }}></div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 13 }}>{int.name}</div>
          {connected && int.lastSync && <div style={{ fontSize: 11, color: '#5A6A7A' }}>Last sync: {int.lastSync} {int.records ? `· ${int.records}` : ''}</div>}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span className={`badge ${connected ? 'badge-green' : 'badge-navy'}`} style={{ fontSize: 10 }}>{connected ? (int.status === 'linked' ? 'Linked' : 'Connected') : 'Not Connected'}</span>
        {connected ? (
          <button style={{ background: 'none', border: '1px solid rgba(11,30,61,0.15)', color: '#0B1E3D', padding: '4px 10px', borderRadius: 5, fontSize: 11, cursor: 'pointer' }} onClick={() => onConfigure(int.name)}>Configure</button>
        ) : (
          <button style={{ background: '#0B1E3D', border: 'none', color: '#fff', padding: '4px 10px', borderRadius: 5, fontSize: 11, cursor: 'pointer' }} onClick={() => onConfigure(int.name)}>Connect</button>
        )}
      </div>
    </div>
  )
}

export default function SettingsIntegrations() {
  const [tab, setTab] = useState<SettingsTab>('api')
  const [configDrawer, setConfigDrawer] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }
  const [adeAutonomy, setAdeAutonomy] = useState<Record<string, number>>(
    Object.fromEntries(ADES.map(a => [a.id, 4]))
  )

  const integrationCategories = [
    { label: 'Accounting & Finance', items: INTEGRATIONS.accounting },
    { label: 'Project Management / Field', items: INTEGRATIONS.projectManagement },
    { label: 'CRM / Sales', items: INTEGRATIONS.crm },
    { label: 'Communication', items: INTEGRATIONS.communication },
    { label: 'Estimating', items: INTEGRATIONS.estimating },
    { label: 'Field Service', items: INTEGRATIONS.fieldService },
    { label: 'Compliance / HR', items: INTEGRATIONS.complianceHR },
    { label: 'Document Management', items: INTEGRATIONS.documents },
  ]

  const auditLog = [
    { time: '10:14am', user: 'DISPATCH ADE', action: 'Created SVC-2855 — Texas Medical Center plumbing leak', type: 'ADE Action' },
    { time: '10:08am', user: 'DISPATCH ADE', action: 'Created SVC-2854 — CityCentre Suite 410 no cooling', type: 'ADE Action' },
    { time: '9:55am', user: 'Mike Gray', action: 'Approved CO-014 — Tellepsen — $43,500', type: 'Human Approval' },
    { time: '9:42am', user: 'DISPATCH ADE', action: 'Assigned Tech Ramirez to SVC-2841', type: 'ADE Action' },
    { time: '9:30am', user: 'ARIA ADE', action: 'Invoice GM-4471 generated and sent to Tellepsen Builders', type: 'ADE Action' },
    { time: '9:12am', user: 'Sarah Thornton', action: 'Reviewed invoice CC-10281 — held for variance review', type: 'Human Override' },
    { time: '8:55am', user: 'SHIELD ADE', action: 'COI expired alert — Premier Sheet Metal — AP invoices blocked', type: 'ADE Action' },
    { time: '8:14am', user: 'SYSTEM', action: 'QuickBooks Online sync completed — 847 transactions', type: 'Integration' },
    { time: '8:02am', user: 'Sarah Thornton', action: 'Logged in — Controller access', type: 'User Login' },
    { time: '7:48am', user: 'Mike Gray', action: 'Logged in — CEO / Owner access', type: 'User Login' },
  ]

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000 }}>{toast}</div>}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0B1E3D' }}>Settings & Integrations</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#5A6A7A' }}>Platform configuration, ADE management, users, and third-party integrations</p>
      </div>

      <div className="tab-bar">
        <div className={`tab ${tab === 'api' ? 'active' : ''}`} onClick={() => setTab('api')}>API Integrations</div>
        <div className={`tab ${tab === 'ade-config' ? 'active' : ''}`} onClick={() => setTab('ade-config')}>ADE Configuration</div>
        <div className={`tab ${tab === 'users' ? 'active' : ''}`} onClick={() => setTab('users')}>User Management</div>
        <div className={`tab ${tab === 'notifications' ? 'active' : ''}`} onClick={() => setTab('notifications')}>Notifications</div>
        <div className={`tab ${tab === 'audit' ? 'active' : ''}`} onClick={() => setTab('audit')}>Audit Log</div>
        <div className={`tab ${tab === 'security' ? 'active' : ''}`} onClick={() => setTab('security')}>Security</div>
      </div>

      {tab === 'api' && (
        <div style={{ display: 'grid', gridTemplateColumns: configDrawer ? '1fr 360px' : '1fr', gap: 20 }}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {integrationCategories.map(cat => (
                <div key={cat.label} className="card" style={{ padding: 16 }}>
                  <div style={{ fontWeight: 600, fontSize: 12, color: '#5A6A7A', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>{cat.label}</div>
                  {cat.items.map(int => (
                    <IntegrationCard key={int.name} int={int} onConfigure={(name) => setConfigDrawer(name)} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Config Drawer */}
          {configDrawer && (
            <div className="card" style={{ padding: 0, overflow: 'hidden', height: 'fit-content', position: 'sticky', top: 80 }}>
              <div style={{ padding: '14px 18px', background: '#0B1E3D', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{configDrawer}</span>
                <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 16 }} onClick={() => setConfigDrawer(null)}>✕</button>
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 6, fontWeight: 600 }}>API Endpoint</div>
                  <div style={{ background: '#F7F8FA', padding: '7px 10px', borderRadius: 5, fontFamily: 'monospace', fontSize: 12, color: '#1C2A3A' }}>https://api.***.com/v2/***</div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 6, fontWeight: 600 }}>Auth Method</div>
                  <span className="badge badge-blue" style={{ fontSize: 11 }}>OAuth 2.0</span>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 6, fontWeight: 600 }}>Sync Frequency</div>
                  <select style={{ width: '100%', fontSize: 12 }}>
                    <option>Every 15 minutes</option>
                    <option>Every 30 minutes</option>
                    <option>Every hour</option>
                    <option>Daily</option>
                    <option>Real-time (webhook)</option>
                  </select>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 8, fontWeight: 600 }}>API Health</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }}></div><span style={{ fontSize: 12, color: '#166534', fontWeight: 600 }}>Operational · 99.9% uptime</span></div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 8, fontWeight: 600 }}>Webhook Event Log (last 5)</div>
                  {['sync.complete', 'record.created', 'sync.complete', 'auth.refresh', 'sync.complete'].map((e, i) => (
                    <div key={i} style={{ fontSize: 11, padding: '4px 0', borderBottom: '1px solid rgba(11,30,61,0.05)', color: '#5A6A7A', display: 'flex', justifyContent: 'space-between' }}>
                      <code style={{ color: '#0B1E3D' }}>{e}</code>
                      <span>{8 - i * 2}m ago</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button className="btn-primary" style={{ fontSize: 11, flex: 1 }} onClick={() => showToast('✓ Connection test passed — 124ms')}>Test Connection</button>
                  <button className="btn-secondary" style={{ fontSize: 11, flex: 1 }} onClick={() => showToast('📋 Logs exported')}>View Logs</button>
                  <button className="btn-danger" style={{ fontSize: 11, flex: 1 }} onClick={() => { showToast('⚠ Access revoked'); setConfigDrawer(null) }}>Revoke Access</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'ade-config' && (
        <div>
          {ADES.map(ade => (
            <div key={ade.id} className="card" style={{ padding: 16, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 24 }}>{ade.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{ade.name}</div>
                    <div style={{ fontSize: 12, color: '#5A6A7A' }}>{ade.title}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span className={`badge ${ade.status === 'RUNNING' ? 'badge-green' : 'badge-amber'}`}>{ade.status}</span>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12 }}>
                    <span style={{ color: '#5A6A7A' }}>Active</span>
                    <div style={{ width: 36, height: 20, borderRadius: 10, background: ade.status === 'RUNNING' ? '#22c55e' : '#e2e8f0', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 3px', transition: 'background 0.2s' }} onClick={() => showToast(`${ade.name} toggled`)}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#fff', marginLeft: ade.status === 'RUNNING' ? 16 : 0, transition: 'margin 0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Autonomy Level: {adeAutonomy[ade.id]} — {['', 'Notify Only', 'Notify + Log', 'Act with Approval', 'Act with Limited Approval', 'Fully Autonomous'][adeAutonomy[ade.id]]}</div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[1,2,3,4,5].map(n => (
                    <div key={n} onClick={() => setAdeAutonomy(prev => ({ ...prev, [ade.id]: n }))} style={{ flex: 1, height: 10, borderRadius: 4, background: n <= adeAutonomy[ade.id] ? '#2E6FD9' : '#e2e8f0', cursor: 'pointer', transition: 'background 0.15s' }}></div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94a3b8', marginTop: 3 }}>
                  <span>Notify Only</span><span>Fully Autonomous</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12, fontSize: 12 }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#5A6A7A', marginBottom: 4 }}>Escalation Threshold</div>
                  <div style={{ color: '#1C2A3A' }}>Auto-escalate if: action &gt; $25,000 or flagged risk</div>
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#5A6A7A', marginBottom: 4 }}>Last Modified</div>
                  <div style={{ color: '#1C2A3A' }}>Apr 1, 2025 · Neuralogic Admin</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'users' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>User Management</span>
            <button style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer' }} onClick={() => showToast('✓ Invitation sent')}>+ Invite User</button>
          </div>
          <table>
            <thead><tr><th>Name</th><th>Role</th><th>ADE Access</th><th>Last Login</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {USERS.map(u => (
                <tr key={u.name}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#0B1E3D', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                        {u.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                      <span style={{ fontWeight: 600 }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ color: '#5A6A7A' }}>{u.role}</td>
                  <td style={{ fontSize: 12, color: '#2E6FD9' }}>{u.access}</td>
                  <td style={{ fontSize: 12, color: '#5A6A7A' }}>{u.lastLogin}</td>
                  <td><span className="badge badge-green">{u.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-secondary" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => showToast('✓ User settings opened')}>Edit</button>
                      <button className="btn-secondary" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => showToast('📧 Password reset sent')}>Reset PW</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'notifications' && (
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 16 }}>Notification Preferences</div>
          {[
            { category: 'Human Approval Required', email: true, sms: true, inApp: true },
            { category: 'Budget Variance > 5%', email: true, sms: false, inApp: true },
            { category: 'Emergency Service Call Created', email: true, sms: true, inApp: true },
            { category: 'Invoice Overdue > 30 Days', email: true, sms: false, inApp: true },
            { category: 'License / COI Expiring < 90 Days', email: true, sms: false, inApp: true },
            { category: 'ADE Error or Downtime', email: true, sms: true, inApp: true },
            { category: 'New Bid Opportunity', email: false, sms: false, inApp: true },
          ].map(n => (
            <div key={n.category} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(11,30,61,0.06)' }}>
              <span style={{ fontSize: 13 }}>{n.category}</span>
              <div style={{ display: 'flex', gap: 20, fontSize: 12 }}>
                {[['Email', n.email], ['SMS', n.sms], ['In-App', n.inApp]].map(([ch, en]) => (
                  <div key={String(ch)} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }} onClick={() => showToast('✓ Preference updated')}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: en ? '#0B1E3D' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {en && <span style={{ color: '#fff', fontSize: 10 }}>✓</span>}
                    </div>
                    <span style={{ color: '#5A6A7A' }}>{ch}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'audit' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(11,30,61,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600 }}>Audit Log — April 6, 2025</span>
            <div style={{ display: 'flex', gap: 10 }}>
              <select style={{ fontSize: 12, padding: '5px 8px' }}><option>All ADEs</option>{ADES.map(a => <option key={a.id}>{a.name}</option>)}</select>
              <select style={{ fontSize: 12, padding: '5px 8px' }}><option>All Types</option><option>ADE Action</option><option>Human Approval</option><option>Human Override</option><option>Integration</option></select>
              <button className="btn-secondary" style={{ fontSize: 12 }} onClick={() => showToast('📥 Log exported')}>Export</button>
            </div>
          </div>
          <table>
            <thead><tr><th>Time</th><th>Actor</th><th>Action</th><th>Type</th></tr></thead>
            <tbody>
              {auditLog.map((log, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#5A6A7A', whiteSpace: 'nowrap' }}>{log.time}</td>
                  <td style={{ fontWeight: 600, fontSize: 12 }}>{log.user}</td>
                  <td style={{ fontSize: 12, color: '#1C2A3A' }}>{log.action}</td>
                  <td><span className={`badge ${log.type === 'Human Approval' ? 'badge-green' : log.type === 'Human Override' ? 'badge-amber' : log.type === 'ADE Action' ? 'badge-blue' : log.type === 'User Login' ? 'badge-navy' : 'badge-navy'}`} style={{ fontSize: 10 }}>{log.type}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'security' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontWeight: 600, marginBottom: 16 }}>Security Settings</div>
              {[
                { label: 'Multi-Factor Authentication', status: 'Enabled', action: 'Configure' },
                { label: 'SSO (Microsoft Entra ID)', status: 'Connected', action: 'Configure' },
                { label: 'API Rate Limiting', status: 'Active (1000 req/min)', action: 'Adjust' },
                { label: 'Data Encryption (AES-256)', status: 'Active', action: 'View' },
                { label: 'Session Timeout', status: '8 hours', action: 'Change' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(11,30,61,0.06)', fontSize: 13 }}>
                  <div>
                    <div>{s.label}</div>
                    <div style={{ fontSize: 11, color: '#166534', marginTop: 2 }}>{s.status}</div>
                  </div>
                  <button className="btn-secondary" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => showToast('⚙ Security setting opened')}>{s.action}</button>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontWeight: 600, marginBottom: 16 }}>Access Control</div>
              <div style={{ fontSize: 12, color: '#5A6A7A', marginBottom: 12 }}>Role-based permissions matrix</div>
              <table style={{ fontSize: 11 }}>
                <thead><tr><th style={{ fontSize: 10 }}>Role</th><th style={{ fontSize: 10 }}>View</th><th style={{ fontSize: 10 }}>Edit</th><th style={{ fontSize: 10 }}>Approve</th><th style={{ fontSize: 10 }}>Admin</th></tr></thead>
                <tbody>
                  {[
                    { role: 'CEO / Owner', view: true, edit: true, approve: true, admin: true },
                    { role: 'Controller', view: true, edit: true, approve: true, admin: false },
                    { role: 'Operations Mgr', view: true, edit: true, approve: false, admin: false },
                    { role: 'Platform Admin', view: true, edit: true, approve: true, admin: true },
                  ].map(r => (
                    <tr key={r.role}>
                      <td style={{ fontWeight: 600 }}>{r.role}</td>
                      {[r.view, r.edit, r.approve, r.admin].map((v, i) => (
                        <td key={i} style={{ textAlign: 'center', color: v ? '#166534' : '#dc2626' }}>{v ? '✓' : '✗'}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
