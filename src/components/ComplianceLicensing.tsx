import { useState } from 'react'
import { COMPLIANCE_ITEMS } from '../data'

export default function ComplianceLicensing() {
  const [selected, setSelected] = useState<typeof COMPLIANCE_ITEMS[0] | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  const critical = COMPLIANCE_ITEMS.filter(c => c.critical)
  const expiringSoon = COMPLIANCE_ITEMS.filter(c => !c.critical && c.daysLeft > 0 && c.daysLeft < 90)

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000 }}>{toast}</div>}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0B1E3D' }}>Compliance & Licensing</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#5A6A7A' }}>SHIELD · Automated monitoring of all licenses, permits, COIs, and safety records</p>
      </div>

      {/* Alert banner */}
      {critical.length > 0 && (
        <div style={{ background: '#fee2e2', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 8, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20 }}>🚨</span>
          <div>
            <div style={{ fontWeight: 700, color: '#991b1b', fontSize: 14 }}>{critical.length} Critical Compliance Issue{critical.length > 1 ? 's' : ''} Require Immediate Action</div>
            <div style={{ fontSize: 12, color: '#dc2626', marginTop: 2 }}>{critical.map(c => c.item).join(' · ')}</div>
          </div>
          <button className="btn-danger" style={{ marginLeft: 'auto' }} onClick={() => showToast('🛡️ SHIELD escalation initiated')}>Resolve Now</button>
        </div>
      )}

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Active Licenses', value: COMPLIANCE_ITEMS.filter(c => c.status === 'Active').length, color: '#166534' },
          { label: 'Critical Issues', value: critical.length, color: '#991b1b' },
          { label: 'Expiring < 90 Days', value: expiringSoon.length, color: '#92400e' },
          { label: 'Permits Active', value: 2, color: '#1e40af' },
        ].map(k => (
          <div key={k.label} className="kpi-card">
            <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>{k.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Compliance Board */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600 }}>Compliance Status Board</div>
        <table>
          <thead>
            <tr><th>Category</th><th>Item</th><th>Status</th><th>Expiry / Due Date</th><th>Days Left</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {COMPLIANCE_ITEMS.map((item, i) => (
              <tr key={i} onClick={() => setSelected(item)}>
                <td style={{ fontWeight: 600, fontSize: 12, color: '#5A6A7A' }}>{item.category}</td>
                <td style={{ fontWeight: 500 }}>{item.item}</td>
                <td>
                  <span className={`badge ${item.status === 'Active' ? 'badge-green' : item.status === 'EXPIRED' ? 'badge-red' : item.status === 'Pending Inspection' ? 'badge-amber' : 'badge-blue'}`}>
                    {item.status}
                  </span>
                </td>
                <td style={{ fontSize: 12, color: '#5A6A7A' }}>{item.expiry}</td>
                <td>
                  {item.daysLeft > 0 && item.daysLeft < 999 && (
                    <span style={{ fontWeight: 700, color: item.daysLeft < 30 ? '#dc2626' : item.daysLeft < 90 ? '#92400e' : '#166534', fontSize: 13 }}>
                      {item.daysLeft}d
                    </span>
                  )}
                  {item.daysLeft <= 0 && item.daysLeft !== 0 && (
                    <span style={{ fontWeight: 700, color: '#dc2626', fontSize: 13 }}>EXPIRED</span>
                  )}
                </td>
                <td onClick={e => e.stopPropagation()}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn-secondary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => setSelected(item)}>View</button>
                    {item.status === 'EXPIRED' && (
                      <button className="btn-danger" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('📋 COI request sent to subcontractor')}>Request COI</button>
                    )}
                    {item.daysLeft > 0 && item.daysLeft < 90 && (
                      <button className="btn-primary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('🔔 Renewal alert set')}>Set Alert</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(11,30,61,0.08)', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{selected.category}</div>
                <div style={{ fontSize: 13, color: '#5A6A7A', marginTop: 2 }}>{selected.item}</div>
              </div>
              <button style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94a3b8' }} onClick={() => setSelected(null)}>✕</button>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                {[['Status', selected.status], ['Expiry', selected.expiry], ['Days Remaining', selected.daysLeft > 0 ? `${selected.daysLeft} days` : 'EXPIRED'], ['Critical', selected.critical ? 'Yes' : 'No']].map(([k, v]) => (
                  <div key={String(k)}>
                    <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 2 }}>{k}</div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: String(v) === 'EXPIRED' || String(v) === 'Yes' ? '#dc2626' : '#1C2A3A' }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#F7F8FA', borderRadius: 6, padding: 14, fontSize: 12, color: '#5A6A7A', marginBottom: 16 }}>
                <strong style={{ color: '#1C2A3A' }}>SHIELD Notes:</strong> {selected.critical ? 'CRITICAL: This item has expired and jobs may be affected. Immediate resolution required. SHIELD has suspended related AP invoices until COI is renewed.' : selected.daysLeft < 90 ? `Renewal approaching. SHIELD has created a renewal task and will send reminder 30 days before expiry.` : 'Item in good standing. SHIELD monitoring for status changes via TDLR API integration.'}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {selected.status === 'EXPIRED' && <button className="btn-primary" onClick={() => { showToast('📋 COI request sent'); setSelected(null) }}>Request COI</button>}
                {selected.status === 'EXPIRED' && <button className="btn-danger" onClick={() => { showToast('⚠ Subcontractor suspended'); setSelected(null) }}>Suspend Sub</button>}
                {selected.daysLeft > 0 && <button className="btn-secondary" onClick={() => { showToast('✓ Renewal task created'); setSelected(null) }}>Create Renewal Task</button>}
                <button className="btn-secondary" onClick={() => setSelected(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
