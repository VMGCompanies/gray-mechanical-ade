import { useState, useEffect } from 'react'
import { ADES, ESTIMATES, SERVICE_CALLS, TECHNICIANS, INVOICES } from '../data'

interface Props {
  openAde: string | null
  setOpenAde: (id: string | null) => void
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'RUNNING': 'badge-green',
    'AWAITING APPROVAL': 'badge-amber',
    'IDLE': 'badge-navy',
    'PAUSED': 'badge-navy',
  }
  return <span className={`badge ${map[status] || 'badge-navy'}`}>{status}</span>
}

function ADECard({ ade, onOpen }: { ade: typeof ADES[0]; onOpen: () => void }) {
  return (
    <div className="card" style={{ padding: 18, cursor: 'pointer' }} onClick={onOpen}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(11,30,61,0.12)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 24 }}>{ade.icon}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#0B1E3D' }}>{ade.name}</div>
            <div style={{ fontSize: 11, color: '#5A6A7A' }}>{ade.title}</div>
          </div>
        </div>
        <StatusBadge status={ade.status} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, background: '#F7F8FA', borderRadius: 6, padding: '8px 12px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#2E6FD9' }}>{ade.tasksToday}</div>
          <div style={{ fontSize: 10, color: '#5A6A7A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tasks Today</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#166534' }}>99%</div>
          <div style={{ fontSize: 10, color: '#5A6A7A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Accuracy</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1C2A3A' }}>4.2m</div>
          <div style={{ fontSize: 10, color: '#5A6A7A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg Cycle</div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 12, lineHeight: 1.4 }}>
        <span style={{ color: '#94a3b8' }}>Last: </span>{ade.lastAction.substring(0, 60)}...
      </div>
      <button className="btn-primary" style={{ width: '100%', fontSize: 12 }}>Open ADE Workspace →</button>
    </div>
  )
}

// ─── Individual ADE Workspaces ───────────────────────────────────────────────

function APEXWorkspace() {
  const [selectedEst, setSelectedEst] = useState<typeof ESTIMATES[0] | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000 }}>{toast}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, marginBottom: 20 }}>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Active Task Queue</div>
          {[
            { id: 'APX-0441', job: 'Lone Star Medical Tower — HVAC Package C', status: 'Processing', detail: 'Est. complete: 18 min' },
            { id: 'APX-0440', job: "Baylor Scott & White Waco — Plumbing Retrofit", status: 'Awaiting Human Review', detail: '2h 14m waiting' },
            { id: 'APX-0439', job: 'Riverview Office Park — Design-Build Schematic', status: 'Complete', detail: '$214,800 estimate generated' },
            { id: 'APX-0438', job: 'Houston Methodist Research B7', status: 'Processing', detail: 'Cross-referencing 2022 comparable' },
            { id: 'APX-0437', job: 'Dell EMC Data Center Phase 2 — Scoping', status: 'Blocked', detail: 'Awaiting design documents' },
          ].map(t => (
            <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(11,30,61,0.06)', fontSize: 13 }}>
              <div>
                <span style={{ fontWeight: 600, color: '#5A6A7A', marginRight: 8, fontSize: 11 }}>{t.id}</span>
                <span>{t.job}</span>
                <div style={{ fontSize: 11, color: '#5A6A7A', marginTop: 2 }}>{t.detail}</div>
              </div>
              <span className={`badge ${t.status === 'Complete' ? 'badge-green' : t.status === 'Awaiting Human Review' ? 'badge-amber' : t.status === 'Blocked' ? 'badge-red' : 'badge-blue'}`} style={{ whiteSpace: 'nowrap', marginLeft: 12 }}>{t.status}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Integration Status</div>
          {[
            { sys: 'Accubid Anywhere', dir: 'Read', status: 'Connected' },
            { sys: 'Bluebeam', dir: 'Read', status: 'Connected' },
            { sys: 'Email (Outlook)', dir: 'Read', status: 'Connected' },
            { sys: 'Proposal Library', dir: 'Write', status: 'Connected' },
            { sys: 'HubSpot CRM', dir: 'Write', status: 'Connected' },
          ].map(s => (
            <div key={s.sys} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '6px 0', borderBottom: '1px solid rgba(11,30,61,0.05)' }}>
              <span>{s.sys}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <span className={`badge ${s.dir === 'Read' ? 'badge-blue' : 'badge-navy'}`} style={{ fontSize: 9 }}>{s.dir}</span>
                <span className="badge badge-green" style={{ fontSize: 9 }}>●</span>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 14 }}>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Autonomy Level</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[1,2,3,4,5].map(n => (
                <div key={n} style={{ flex: 1, height: 8, borderRadius: 4, background: n <= 4 ? '#2E6FD9' : '#e2e8f0' }}></div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: '#5A6A7A', marginTop: 4 }}>Level 4 — Act with limited approval</div>
          </div>
        </div>
      </div>

      {/* Estimate Pipeline */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(11,30,61,0.08)', fontWeight: 600, fontSize: 14 }}>Estimate Pipeline</div>
        <table>
          <thead>
            <tr>
              <th>Job Name</th><th>GC</th><th>Phase</th><th>Bid Date</th><th>Value</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ESTIMATES.map(e => (
              <tr key={e.job} onClick={() => setSelectedEst(e)}>
                <td style={{ fontWeight: 500 }}>{e.job}</td>
                <td style={{ color: '#5A6A7A' }}>{e.gc}</td>
                <td>{e.phase}</td>
                <td>{e.bidDate}</td>
                <td style={{ fontWeight: 700, color: '#0B1E3D' }}>${e.value.toLocaleString()}</td>
                <td><span className={`badge ${e.status === 'Complete' || e.status === 'Awarded' ? 'badge-green' : e.status === 'Pending Release' ? 'badge-amber' : e.status === 'In Progress' ? 'badge-blue' : 'badge-navy'}`}>{e.status}</span></td>
                <td>
                  <button className="btn-secondary" style={{ fontSize: 11, padding: '3px 8px' }} onClick={(ev) => { ev.stopPropagation(); setSelectedEst(e) }}>
                    {e.status === 'Awarded' ? 'View' : e.status === 'Pending Release' ? 'Release' : 'Open'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Estimate detail modal */}
      {selectedEst && (
        <div className="modal-backdrop" onClick={() => setSelectedEst(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(11,30,61,0.08)', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{selectedEst.job}</div>
                <div style={{ fontSize: 13, color: '#5A6A7A', marginTop: 2 }}>{selectedEst.gc} · {selectedEst.phase} · Bid {selectedEst.bidDate}</div>
              </div>
              <button style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94a3b8' }} onClick={() => setSelectedEst(null)}>✕</button>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ fontWeight: 600, marginBottom: 12 }}>Line-Item Takeoff Summary</div>
              <table>
                <thead><tr><th>Category</th><th>Qty / Unit</th><th>Unit Cost</th><th>Total</th></tr></thead>
                <tbody>
                  {[
                    ['Ductwork', '18,400 lbs', '$4.20/lb', '$77,280'],
                    ['Equipment (AHUs, FCUs)', '14 units', '—', '$198,400'],
                    ['Piping & Fittings', '3,200 LF', '$12.40/LF', '$39,680'],
                    ['Controls / BAS', 'Lump sum', '—', '$44,200'],
                    ['Electrical Coordination', 'Lump sum', '—', '$18,400'],
                    ['Labor (2,840 hrs @ $98)', '2,840 hrs', '$98/hr', '$278,320'],
                    ['Subcontractors', 'Insulation, TAB', '—', '$68,400'],
                    ['Overhead & Profit (18%)', '—', '—', `$${Math.round(selectedEst.value * 0.18).toLocaleString()}`],
                    ['Bond (1.2%)', '—', '—', `$${Math.round(selectedEst.value * 0.012).toLocaleString()}`],
                  ].map(([cat, qty, unit, total]) => (
                    <tr key={cat}><td>{cat}</td><td style={{ color: '#5A6A7A' }}>{qty}</td><td style={{ color: '#5A6A7A' }}>{unit}</td><td style={{ fontWeight: 600 }}>{total}</td></tr>
                  ))}
                  <tr style={{ background: '#F7F8FA' }}>
                    <td colSpan={3} style={{ fontWeight: 700 }}>TOTAL ESTIMATE</td>
                    <td style={{ fontWeight: 700, fontSize: 15, color: '#0B1E3D' }}>${selectedEst.value.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ marginTop: 16, padding: 14, background: '#F7F8FA', borderRadius: 6, fontSize: 12, color: '#5A6A7A' }}>
                <strong>Markup assumptions:</strong> Labor rate $98/hr · OH&P 18% · Bond 1.2% · Comparable: Memorial Hermann 2023 (+3.1% inflation adj.)
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <button className="btn-primary" onClick={() => { showToast('✓ Estimate released to proposal library'); setSelectedEst(null) }}>Release Estimate</button>
                <button className="btn-secondary" onClick={() => { showToast('📤 Sent to PM for review'); setSelectedEst(null) }}>Send for PM Review</button>
                <button className="btn-danger" onClick={() => setSelectedEst(null)}>Archive</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DISPATCHWorkspace() {
  const [selected, setSelected] = useState<typeof SERVICE_CALLS[0] | null>(null)
  const [techs, setTechs] = useState(TECHNICIANS)
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  const statusColor = (s: string) => s === 'On-Site' ? '#166534' : s === 'En Route' ? '#1e40af' : s === 'Available' ? '#0B1E3D' : '#92400e'
  const statusBg = (s: string) => s === 'On-Site' ? '#dcfce7' : s === 'En Route' ? '#dbeafe' : s === 'Available' ? '#e2e8f0' : '#fef3c7'

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000 }}>{toast}</div>}
      {/* Technician Board */}
      <div className="card" style={{ padding: 16, marginBottom: 20 }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Live Dispatch Board — 8 Technicians</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {techs.map(t => (
            <div key={t.id} style={{ background: '#F7F8FA', borderRadius: 8, padding: 12, border: '1px solid rgba(11,30,61,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>Tech {t.name}</span>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: statusBg(t.status), color: statusColor(t.status) }}>{t.status}</span>
              </div>
              <div style={{ fontSize: 11, color: '#5A6A7A' }}>{t.currentJob}</div>
              <div style={{ fontSize: 12, color: '#1C2A3A', marginTop: 2 }}>{t.location}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{t.since}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Call Queue */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(11,30,61,0.08)', fontWeight: 600, fontSize: 14 }}>Active Service Call Queue</div>
        <table>
          <thead>
            <tr><th>Call ID</th><th>Client</th><th>Issue</th><th>Priority</th><th>Technician</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {SERVICE_CALLS.map(s => (
              <tr key={s.id} onClick={() => setSelected(s)}>
                <td style={{ fontWeight: 600, color: '#2E6FD9' }}>{s.id}</td>
                <td>{s.client}</td>
                <td style={{ color: '#5A6A7A' }}>{s.issue}</td>
                <td><span className={`badge ${s.priority === 1 ? 'badge-red' : s.priority === 2 ? 'badge-amber' : 'badge-blue'}`}>P{s.priority}</span></td>
                <td style={{ fontWeight: s.tech === 'Unassigned' ? 600 : 400, color: s.tech === 'Unassigned' ? '#dc2626' : '#1C2A3A' }}>{s.tech}</td>
                <td><span className={`badge ${s.status === 'On-Site' ? 'badge-green' : s.status === 'En Route' ? 'badge-blue' : s.status === 'Open' ? 'badge-red' : 'badge-navy'}`}>{s.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
                    {s.tech === 'Unassigned' && <button className="btn-primary" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => { showToast(`✓ Tech Williams assigned to ${s.id}`) }}>Assign</button>}
                    <button className="btn-secondary" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => showToast('📲 Customer notification sent')}>Notify</button>
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
                <div style={{ fontWeight: 700, fontSize: 16 }}>{selected.id} — {selected.client}</div>
                <div style={{ fontSize: 13, color: '#5A6A7A', marginTop: 2 }}>{selected.issue}</div>
              </div>
              <button style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94a3b8' }} onClick={() => setSelected(null)}>✕</button>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                {[['Priority', `P${selected.priority}`], ['Technician', selected.tech], ['Status', selected.status], ['Created', selected.created], ['ETA', selected.eta]].map(([k, v]) => (
                  <div key={k}><div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 2 }}>{k}</div><div style={{ fontWeight: 600 }}>{v}</div></div>
                ))}
              </div>
              <div style={{ background: '#F7F8FA', borderRadius: 6, padding: 14, fontSize: 12, color: '#5A6A7A', marginBottom: 16 }}>
                <strong>DISPATCH Notes:</strong> ECHO received initial report. Technician dispatched with full site access code. Client has been notified via SMS. Follow-up call scheduled if not resolved by ETA.
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn-primary" onClick={() => { showToast('✓ Tech rerouted'); setSelected(null) }}>Reroute Tech</button>
                <button className="btn-secondary" onClick={() => { showToast('🚨 Escalated to emergency'); setSelected(null) }}>Escalate Emergency</button>
                <button className="btn-secondary" onClick={() => { showToast('📲 Customer notified'); setSelected(null) }}>Notify Customer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ARIAWorkspace() {
  const [selected, setSelected] = useState<typeof INVOICES[0] | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  const aging = [
    { label: 'Current (0-30 days)', amount: 412800, color: '#166534' },
    { label: '31–60 days', amount: 118200, color: '#92400e' },
    { label: '61–90 days', amount: 64400, color: '#c2410c' },
    { label: '90+ days', amount: 28050, color: '#991b1b' },
  ]

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000 }}>{toast}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {aging.map(a => (
          <div key={a.label} className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 4 }}>{a.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: a.color }}>${a.amount.toLocaleString()}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 12 }}>
        <div style={{ padding: '12px 18px', background: '#0B1E3D', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>Invoice Register</span>
          <span style={{ color: '#C89B3C', fontWeight: 700 }}>Total AR: $623,450</span>
        </div>
        <table>
          <thead><tr><th>Invoice</th><th>Client</th><th>Project</th><th>Amount</th><th>Sent</th><th>Due</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {INVOICES.map(inv => (
              <tr key={inv.id} onClick={() => setSelected(inv)}>
                <td style={{ fontWeight: 600, color: '#2E6FD9' }}>{inv.id}</td>
                <td>{inv.client}</td>
                <td style={{ color: '#5A6A7A', fontSize: 12 }}>{inv.project}</td>
                <td style={{ fontWeight: 700 }}>${inv.amount.toLocaleString()}</td>
                <td style={{ fontSize: 12, color: '#5A6A7A' }}>{inv.sent}</td>
                <td style={{ fontSize: 12 }}>{inv.due}</td>
                <td><span className={`badge ${inv.status === 'Open' ? 'badge-blue' : inv.status === 'Overdue' ? 'badge-red' : inv.status === 'Due Today' ? 'badge-amber' : 'badge-green'}`}>{inv.status}</span></td>
                <td onClick={e => e.stopPropagation()}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {inv.status === 'Overdue' && <button className="btn-primary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('📧 Payment reminder sent')}>Remind</button>}
                    <button className="btn-secondary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => setSelected(inv)}>View</button>
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
                <div style={{ fontWeight: 700, fontSize: 16 }}>Invoice {selected.id}</div>
                <div style={{ fontSize: 13, color: '#5A6A7A', marginTop: 2 }}>{selected.client} · {selected.project}</div>
              </div>
              <button style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94a3b8' }} onClick={() => setSelected(null)}>✕</button>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#0B1E3D' }}>${selected.amount.toLocaleString()}</div>
                  <span className={`badge ${selected.status === 'Open' ? 'badge-blue' : selected.status === 'Overdue' ? 'badge-red' : selected.status === 'Due Today' ? 'badge-amber' : 'badge-green'}`}>{selected.status}</span>
                </div>
                <div style={{ fontSize: 12 }}>
                  {[['Terms', selected.terms], ['Sent', selected.sent], ['Due', selected.due], ['Aging', `${selected.aging} days`]].map(([k,v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid rgba(11,30,61,0.05)' }}>
                      <span style={{ color: '#5A6A7A' }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: '#F7F8FA', borderRadius: 6, padding: 14, fontSize: 12, marginBottom: 16 }}>
                <strong>Payment History:</strong> No payments received. Lien waiver: Pending countersignature from client.
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn-primary" onClick={() => { showToast('📧 Reminder sent'); setSelected(null) }}>Send Reminder</button>
                <button className="btn-secondary" onClick={() => { showToast('✓ Payment applied'); setSelected(null) }}>Apply Payment</button>
                <button className="btn-danger" onClick={() => { showToast('⚠ Dispute flagged'); setSelected(null) }}>Flag Dispute</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function GenericADEWorkspace({ ade }: { ade: typeof ADES[0] }) {
  const tasks = [
    { id: `${ade.name.substring(0,3)}-001`, desc: `Processing primary workflow — ${ade.title}`, status: 'Processing' },
    { id: `${ade.name.substring(0,3)}-002`, desc: 'Secondary task queue active', status: 'Processing' },
    { id: `${ade.name.substring(0,3)}-003`, desc: 'Awaiting human confirmation on flagged item', status: 'Awaiting Human' },
    { id: `${ade.name.substring(0,3)}-004`, desc: 'Completed routine check cycle', status: 'Complete' },
    { id: `${ade.name.substring(0,3)}-005`, desc: 'Integration sync in progress', status: 'Processing' },
  ]

  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Active Task Queue</div>
      {tasks.map(t => (
        <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(11,30,61,0.06)' }}>
          <div>
            <span style={{ fontWeight: 600, color: '#5A6A7A', marginRight: 8, fontSize: 11 }}>{t.id}</span>
            <span style={{ fontSize: 13 }}>{t.desc}</span>
          </div>
          <span className={`badge ${t.status === 'Complete' ? 'badge-green' : t.status === 'Awaiting Human' ? 'badge-amber' : 'badge-blue'}`}>{t.status}</span>
        </div>
      ))}
    </div>
  )
}

function ADEWorkspace({ adeId }: { adeId: string }) {
  const ade = ADES.find(a => a.id === adeId)
  if (!ade) return null

  const renderPanel = () => {
    switch (adeId) {
      case 'apex': return <APEXWorkspace />
      case 'dispatch': return <DISPATCHWorkspace />
      case 'aria': return <ARIAWorkspace />
      default: return <GenericADEWorkspace ade={ade} />
    }
  }

  return (
    <div>
      {/* ADE Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, background: '#0B1E3D', borderRadius: 10, padding: 20, color: '#fff' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ fontSize: 36 }}>{ade.icon}</span>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.4px' }}>{ade.name}</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{ade.title}</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 8, alignItems: 'center' }}>
              <StatusBadge status={ade.status} />
              <span style={{ fontSize: 12, color: '#C89B3C' }}>Uptime: 99.94% · 14d 6h 22m</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '7px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>Pause ADE</button>
          <button style={{ background: '#C89B3C', border: 'none', color: '#fff', padding: '7px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Force Human Review</button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Tasks Today', value: ade.tasksToday, unit: '' },
          { label: 'Accuracy Rate', value: '99.1', unit: '%' },
          { label: 'Human Override', value: '1.2', unit: '%' },
          { label: 'Avg Cycle Time', value: '4.2', unit: 'min' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 14, textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#0B1E3D' }}>{s.value}{s.unit}</div>
            <div style={{ fontSize: 11, color: '#5A6A7A', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ADE-specific panel */}
      {renderPanel()}
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ADECommandCenter({ openAde, setOpenAde }: Props) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (openAde) { setLoading(true); setTimeout(() => setLoading(false), 800) }
  }, [openAde])

  if (openAde) {
    return (
      <div>
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="btn-secondary" onClick={() => setOpenAde(null)}>← Back to Command Center</button>
          <span style={{ color: '#5A6A7A', fontSize: 13 }}>ADE Command Center / {ADES.find(a => a.id === openAde)?.name}</span>
        </div>
        {loading ? (
          <div>
            <div className="card skeleton" style={{ height: 120, marginBottom: 20 }}></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
              {[...Array(4)].map((_, i) => <div key={i} className="card skeleton" style={{ height: 80 }}></div>)}
            </div>
            <div className="card skeleton" style={{ height: 300 }}></div>
          </div>
        ) : (
          <ADEWorkspace adeId={openAde} />
        )}
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0B1E3D' }}>ADE Command Center</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#5A6A7A' }}>15 Autonomous Digital Employees · Real-time operational AI workforce</p>
      </div>

      {/* Summary bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'ADEs Running', value: ADES.filter(a => a.status === 'RUNNING').length, color: '#166534', bg: '#dcfce7' },
          { label: 'Awaiting Approval', value: ADES.filter(a => a.status === 'AWAITING APPROVAL').length, color: '#92400e', bg: '#fef3c7' },
          { label: 'Tasks Today (Total)', value: ADES.reduce((sum, a) => sum + a.tasksToday, 0), color: '#1e40af', bg: '#dbeafe' },
          { label: 'System Accuracy', value: '98.9%', color: '#166534', bg: '#dcfce7' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 14, background: s.bg, border: `1px solid ${s.bg}` }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: s.color, opacity: 0.8, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ADE Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {ADES.map(ade => (
          <ADECard key={ade.id} ade={ade} onOpen={() => setOpenAde(ade.id)} />
        ))}
      </div>
    </div>
  )
}
