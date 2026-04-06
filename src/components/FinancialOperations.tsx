import { useState } from 'react'
import { INVOICES, AP_INVOICES, PROJECTS } from '../data'

type FinTab = 'ar' | 'ap' | 'job-cost' | 'cash-flow' | 'lien-waiver'

export default function FinancialOperations() {
  const [tab, setTab] = useState<FinTab>('ar')
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000 }}>{toast}</div>}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0B1E3D' }}>Financial Operations</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#5A6A7A' }}>ARIA · LEDGER · VECTOR · Real-time financial management</p>
      </div>

      {/* Summary KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'MTD Revenue', value: '$1,847,320', sub: '94% of $1.96M target', color: '#166534' },
          { label: 'AR Outstanding', value: '$623,450', sub: '$87,200 past 30 days', color: '#92400e' },
          { label: 'AP Pending', value: '$106,440', sub: '5 invoices in queue', color: '#1e40af' },
          { label: 'Gross Margin MTD', value: '34.2%', sub: 'vs 33.8% last month', color: '#0B1E3D' },
        ].map(k => (
          <div key={k.label} className="kpi-card">
            <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>{k.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: k.color }}>{k.value}</div>
            <div style={{ fontSize: 12, color: '#5A6A7A', marginTop: 4 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="tab-bar">
        {[['ar', 'AR Summary'], ['ap', 'AP Summary'], ['job-cost', 'Job Cost Report'], ['cash-flow', 'Cash Flow Projection'], ['lien-waiver', 'Lien Waiver Tracker']].map(([id, label]) => (
          <div key={id} className={`tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id as FinTab)}>{label}</div>
        ))}
      </div>

      {tab === 'ar' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Current (0–30)', value: 412800, color: '#166534' },
              { label: '31–60 Days', value: 118200, color: '#92400e' },
              { label: '61–90 Days', value: 64400, color: '#c2410c' },
              { label: '90+ Days', value: 28050, color: '#991b1b' },
            ].map(a => (
              <div key={a.label} className="card" style={{ padding: 16 }}>
                <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 4 }}>{a.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: a.color }}>${a.value.toLocaleString()}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
              <span>Invoice Register</span>
              <span style={{ color: '#C89B3C' }}>Total: $623,450</span>
            </div>
            <table>
              <thead><tr><th>Invoice</th><th>Client</th><th>Project</th><th>Amount</th><th>Sent</th><th>Due</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {INVOICES.map(inv => (
                  <tr key={inv.id}>
                    <td style={{ fontWeight: 600, color: '#2E6FD9' }}>{inv.id}</td>
                    <td>{inv.client}</td>
                    <td style={{ color: '#5A6A7A', fontSize: 12 }}>{inv.project}</td>
                    <td style={{ fontWeight: 700 }}>${inv.amount.toLocaleString()}</td>
                    <td style={{ color: '#5A6A7A', fontSize: 12 }}>{inv.sent}</td>
                    <td style={{ fontSize: 12 }}>{inv.due}</td>
                    <td><span className={`badge ${inv.status === 'Open' ? 'badge-blue' : inv.status === 'Overdue' ? 'badge-red' : inv.status === 'Due Today' ? 'badge-amber' : 'badge-green'}`}>{inv.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn-secondary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('📄 Invoice viewed')}>View</button>
                        {inv.status !== 'Paid' && <button className="btn-primary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('📧 Reminder sent')}>Remind</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'ap' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600 }}>AP Invoice Processing Queue</div>
          <table>
            <thead><tr><th>Invoice #</th><th>Vendor</th><th>Amount</th><th>PO Match</th><th>3-Way Match</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {AP_INVOICES.map(inv => (
                <tr key={inv.inv}>
                  <td style={{ fontWeight: 600, color: '#2E6FD9' }}>{inv.inv}</td>
                  <td>{inv.vendor}</td>
                  <td style={{ fontWeight: 700 }}>${inv.amount.toLocaleString()}</td>
                  <td style={{ fontSize: 12, color: '#5A6A7A' }}>{inv.po}</td>
                  <td><span className={`badge ${inv.match === 'PASS' ? 'badge-green' : inv.match.includes('PARTIAL') ? 'badge-amber' : inv.match.includes('BLOCKED') ? 'badge-red' : 'badge-navy'}`}>{inv.match.substring(0, 20)}{inv.match.length > 20 ? '…' : ''}</span></td>
                  <td><span className={`badge ${inv.status.startsWith('Paid') ? 'badge-green' : inv.status === 'Approved' ? 'badge-blue' : inv.status === 'Hold' ? 'badge-amber' : inv.status === 'Blocked' ? 'badge-red' : 'badge-navy'}`}>{inv.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {inv.status === 'Approved' && <button className="btn-primary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('✓ Payment queued')}>Pay</button>}
                      {inv.status === 'Hold' && <button className="btn-secondary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('🔍 Review opened')}>Review</button>}
                      {inv.status === 'Blocked' && <button className="btn-danger" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('🛡️ COI resolution initiated')}>Resolve COI</button>}
                      <button className="btn-secondary" style={{ fontSize: 10, padding: '2px 7px' }} onClick={() => showToast('📄 Invoice viewed')}>View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'job-cost' && (
        <div>
          {PROJECTS.slice(0, 4).map(p => {
            const b = p.budget
            const totalBudget = Object.values(b).reduce((s, v) => s + v.budget, 0)
            const totalActual = Object.values(b).reduce((s, v) => s + v.actual, 0)
            const variance = totalActual - totalBudget
            return (
              <div key={p.id} className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
                <div style={{ padding: '12px 18px', background: '#F7F8FA', borderBottom: '1px solid rgba(11,30,61,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600 }}>{p.name}</span>
                  <div style={{ display: 'flex', gap: 12, fontSize: 12 }}>
                    <span style={{ color: '#5A6A7A' }}>Budget: <strong>${totalBudget.toLocaleString()}</strong></span>
                    <span style={{ color: '#5A6A7A' }}>Actual: <strong>${totalActual.toLocaleString()}</strong></span>
                    <span style={{ color: variance > 0 ? '#dc2626' : '#166534', fontWeight: 700 }}>{variance > 0 ? '+' : '-'}${Math.abs(variance).toLocaleString()} {variance > 0 ? 'OVER' : 'UNDER'}</span>
                  </div>
                </div>
                <table>
                  <thead><tr><th>Category</th><th>Budget</th><th>Actual</th><th>Variance</th><th>% Over/Under</th></tr></thead>
                  <tbody>
                    {Object.entries(b).map(([cat, d]) => {
                      const v = d.actual - d.budget
                      const vp = ((v / d.budget) * 100).toFixed(1)
                      return (
                        <tr key={cat}>
                          <td style={{ fontWeight: 500, textTransform: 'capitalize' }}>{cat}</td>
                          <td>${d.budget.toLocaleString()}</td>
                          <td>${d.actual.toLocaleString()}</td>
                          <td style={{ color: v > 0 ? '#dc2626' : '#166534', fontWeight: 600 }}>{v > 0 ? '+' : ''}{v < 0 ? '-$' : '$'}{Math.abs(v).toLocaleString()}</td>
                          <td style={{ color: v > 0 ? '#dc2626' : '#166534' }}>{v > 0 ? '+' : ''}{vp}%</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )
          })}
        </div>
      )}

      {tab === 'cash-flow' && (
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>8-Week Cash Flow Projection</div>
          <div style={{ fontSize: 12, color: '#5A6A7A', marginBottom: 20 }}>ADE-managed billing milestones and payment projections</div>
          {/* Simple CSS bar chart */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 200, marginBottom: 12 }}>
            {[
              { week: 'Apr W2', inflow: 312000, outflow: 180000 },
              { week: 'Apr W3', inflow: 187400, outflow: 210000 },
              { week: 'Apr W4', inflow: 448000, outflow: 195000 },
              { week: 'May W1', inflow: 190000, outflow: 220000 },
              { week: 'May W2', inflow: 280000, outflow: 185000 },
              { week: 'May W3', inflow: 312000, outflow: 200000 },
              { week: 'May W4', inflow: 380000, outflow: 175000 },
              { week: 'Jun W1', inflow: 210000, outflow: 195000 },
            ].map(w => {
              const maxVal = 500000
              const inflowH = Math.round((w.inflow / maxVal) * 180)
              const outflowH = Math.round((w.outflow / maxVal) * 180)
              return (
                <div key={w.week} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 180 }}>
                    <div style={{ width: 20, height: inflowH, background: '#22c55e', borderRadius: '3px 3px 0 0' }} title={`In: $${w.inflow.toLocaleString()}`}></div>
                    <div style={{ width: 20, height: outflowH, background: '#ef4444', borderRadius: '3px 3px 0 0' }} title={`Out: $${w.outflow.toLocaleString()}`}></div>
                  </div>
                  <div style={{ fontSize: 10, color: '#94a3b8', textAlign: 'center', marginTop: 4 }}>{w.week}</div>
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: 20, fontSize: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 14, height: 8, background: '#22c55e', borderRadius: 2 }}></div>Projected Inflows</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 14, height: 8, background: '#ef4444', borderRadius: 2 }}></div>Projected Outflows</div>
          </div>
          <div style={{ marginTop: 20, padding: 14, background: '#F7F8FA', borderRadius: 6 }}>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>ADE-Flagged Milestones</div>
            {[
              { date: 'Apr 14', event: 'Ferguson Enterprises PO-0892 due — $44,180', type: 'out', ade: 'PROCURE' },
              { date: 'Apr 19', event: 'GM-4468 Vaughn Construction — $187,400 payment expected', type: 'in', ade: 'ARIA' },
              { date: 'Apr 22', event: 'Payroll cycle — Est. $98,400', type: 'out', ade: 'LEDGER' },
              { date: 'May 3', event: 'GM-4471 Tellepsen — $312,000 due', type: 'in', ade: 'ARIA' },
            ].map(m => (
              <div key={m.date} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '6px 0', borderBottom: '1px solid rgba(11,30,61,0.05)', fontSize: 12 }}>
                <span style={{ fontWeight: 700, width: 50, color: '#0B1E3D' }}>{m.date}</span>
                <span style={{ flex: 1 }}>{m.event}</span>
                <span style={{ color: '#2E6FD9', fontSize: 11 }}>[{m.ade}]</span>
                <span style={{ color: m.type === 'in' ? '#166534' : '#dc2626', fontWeight: 700 }}>{m.type === 'in' ? '↑ IN' : '↓ OUT'}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'lien-waiver' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(11,30,61,0.08)', fontWeight: 600 }}>Lien Waiver Tracker</div>
          <table>
            <thead><tr><th>Project</th><th>Client</th><th>Invoice</th><th>Amount</th><th>Waiver Type</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {[
                { project: 'Memorial Hermann MOB Ph2', client: 'Tellepsen Builders', invoice: 'GM-4471', amount: 312000, type: 'Conditional', status: 'Sent — Awaiting Countersign' },
                { project: "Texas Children's Pavilion", client: 'McCarthy Building', invoice: 'GM-4461', amount: 448000, type: 'Conditional', status: 'Not Sent' },
                { project: 'UT Health Science Reno', client: 'Vaughn Construction', invoice: 'GM-4468', amount: 187400, type: 'Unconditional', status: 'Executed' },
                { project: 'HCA Far West Pavilion', client: 'Turner Construction', invoice: 'GM-4440', amount: 189000, type: 'Unconditional', status: 'Executed' },
              ].map(l => (
                <tr key={l.invoice}>
                  <td style={{ fontWeight: 500 }}>{l.project}</td>
                  <td>{l.client}</td>
                  <td style={{ color: '#2E6FD9', fontWeight: 600 }}>{l.invoice}</td>
                  <td style={{ fontWeight: 700 }}>${l.amount.toLocaleString()}</td>
                  <td><span className={`badge ${l.type === 'Conditional' ? 'badge-blue' : 'badge-navy'}`}>{l.type}</span></td>
                  <td><span className={`badge ${l.status === 'Executed' ? 'badge-green' : l.status.includes('Awaiting') ? 'badge-amber' : 'badge-red'}`}>{l.status}</span></td>
                  <td>
                    <button className="btn-secondary" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => showToast('📄 Lien waiver action taken')}>
                      {l.status === 'Not Sent' ? 'Send Waiver' : l.status.includes('Awaiting') ? 'Follow Up' : 'View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
