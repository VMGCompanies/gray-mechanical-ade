import { useState } from 'react'
import { SERVICE_CALLS, TECHNICIANS } from '../data'

export default function ServiceOperations() {
  const [selected, setSelected] = useState<typeof SERVICE_CALLS[0] | null>(null)
  const [calls, setCalls] = useState(SERVICE_CALLS)
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  const statusColor = (s: string) => {
    if (s === 'On-Site') return { bg: '#dcfce7', color: '#166534' }
    if (s === 'En Route') return { bg: '#dbeafe', color: '#1e40af' }
    if (s === 'Available') return { bg: '#f1f5f9', color: '#475569' }
    if (s === 'Scheduled') return { bg: '#fef3c7', color: '#92400e' }
    return { bg: '#e2e8f0', color: '#5A6A7A' }
  }

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000 }}>{toast}</div>}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0B1E3D' }}>Service Operations</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#5A6A7A' }}>DISPATCH · ECHO · PULSE · Real-time field service management</p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Open Calls', value: calls.filter(c => c.status === 'Open').length, color: '#dc2626' },
          { label: 'Emergency (P1)', value: calls.filter(c => c.priority === 1).length, color: '#991b1b' },
          { label: 'Techs Deployed', value: TECHNICIANS.filter(t => t.status === 'On-Site' || t.status === 'En Route').length, color: '#1e40af' },
          { label: 'Available Techs', value: TECHNICIANS.filter(t => t.status === 'Available').length, color: '#166534' },
        ].map(k => (
          <div key={k.label} className="kpi-card">
            <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>{k.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Technician Board */}
      <div className="card" style={{ padding: 16, marginBottom: 20 }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Live Technician Board</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {TECHNICIANS.map(t => {
            const sc = statusColor(t.status)
            return (
              <div key={t.id} style={{ border: '1px solid rgba(11,30,61,0.1)', borderRadius: 8, padding: 14 }}>
                <div style={{ display: 'flex', justify: 'space-between', alignItems: 'flex-start', marginBottom: 8, justifyContent: 'space-between' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#0B1E3D', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                    {t.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 7px', borderRadius: 4, background: sc.bg, color: sc.color }}>{t.status}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Tech {t.name}</div>
                <div style={{ fontSize: 12, color: '#2E6FD9', marginTop: 2 }}>{t.currentJob}</div>
                <div style={{ fontSize: 11, color: '#5A6A7A', marginTop: 2 }}>{t.location}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{t.since}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Service Call Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(11,30,61,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, fontSize: 14 }}>Service Call Queue</span>
          <button className="btn-primary" style={{ fontSize: 12 }} onClick={() => showToast('📞 New service call created')}>+ New Call</button>
        </div>
        <table>
          <thead>
            <tr><th>Call ID</th><th>Client</th><th>Issue</th><th>Priority</th><th>Technician</th><th>Status</th><th>Created</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {calls.map(s => (
              <tr key={s.id} onClick={() => setSelected(s)}>
                <td style={{ fontWeight: 600, color: '#2E6FD9' }}>{s.id}</td>
                <td>{s.client}</td>
                <td style={{ color: '#5A6A7A', fontSize: 12 }}>{s.issue}</td>
                <td>
                  <span className={`badge ${s.priority === 1 ? 'badge-red' : s.priority === 2 ? 'badge-amber' : 'badge-blue'}`}>
                    P{s.priority} {s.priority === 1 ? '🔴' : s.priority === 2 ? '🟡' : '🔵'}
                  </span>
                </td>
                <td style={{ color: s.tech === 'Unassigned' ? '#dc2626' : '#1C2A3A', fontWeight: s.tech === 'Unassigned' ? 600 : 400 }}>{s.tech}</td>
                <td>
                  <span className={`badge ${s.status === 'On-Site' ? 'badge-green' : s.status === 'En Route' ? 'badge-blue' : s.status === 'Open' ? 'badge-red' : s.status === 'Scheduled' ? 'badge-amber' : 'badge-navy'}`}>{s.status}</span>
                </td>
                <td style={{ color: '#5A6A7A', fontSize: 12 }}>{s.created}</td>
                <td onClick={e => e.stopPropagation()}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {s.tech === 'Unassigned' && (
                      <button className="btn-primary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => { showToast(`✓ Tech assigned to ${s.id}`) }}>Assign</button>
                    )}
                    <button className="btn-secondary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => setSelected(s)}>View</button>
                    <button className="btn-secondary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('📲 Customer notified')}>Notify</button>
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
                <div style={{ fontWeight: 700, fontSize: 16 }}>{selected.id}</div>
                <div style={{ fontSize: 13, color: '#5A6A7A', marginTop: 2 }}>{selected.client} · {selected.issue}</div>
              </div>
              <button style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94a3b8' }} onClick={() => setSelected(null)}>✕</button>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                {[['Priority', `P${selected.priority}`], ['Assigned Tech', selected.tech], ['Status', selected.status], ['Created', selected.created], ['ETA / Note', selected.eta]].map(([k, v]) => (
                  <div key={String(k)}>
                    <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 2 }}>{k}</div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#F7F8FA', borderRadius: 6, padding: 14, fontSize: 12, color: '#5A6A7A', marginBottom: 16, lineHeight: 1.6 }}>
                <strong style={{ color: '#1C2A3A' }}>DISPATCH Notes:</strong> ECHO received initial client contact and triaged as {selected.priority === 1 ? 'emergency' : 'standard'} priority. Site access code provided to technician. Customer was notified via SMS at time of dispatch. Follow-up scheduled if not resolved within SLA window.
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn-primary" onClick={() => { showToast('✓ Rerouted'); setSelected(null) }}>Reroute</button>
                <button className="btn-secondary" onClick={() => { showToast('🚨 Escalated'); setSelected(null) }}>Escalate Emergency</button>
                <button className="btn-secondary" onClick={() => { showToast('✓ Marked complete'); setSelected(null) }}>Mark Complete</button>
                <button className="btn-secondary" onClick={() => { showToast('📲 Notified'); setSelected(null) }}>Notify Customer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
