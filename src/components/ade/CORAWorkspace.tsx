import { useState } from 'react'

const coRegister = [
  { co: 'CO-014', project: 'HCA Far West Pavilion', gc: 'Turner Construction', desc: 'Added mechanical room fan coil layout revision — owner-directed', amount: 43500, margin: 8.2, initiated: 'Mar 22', status: 'Executed' },
  { co: 'CO-015', project: 'Memorial Hermann MOB Ph2', gc: 'Tellepsen Builders', desc: 'Seismic brace upgrades — spec change by structural engineer of record', amount: 28800, margin: 11.4, initiated: 'Mar 28', status: 'Executed' },
  { co: 'CO-016', project: 'Baylor COM Lab Reno', gc: 'Hensel Phelps', desc: 'Fume hood exhaust duct reroute — ceiling conflict resolution', amount: 14600, margin: 9.8, initiated: 'Apr 1', status: 'Client Review' },
  { co: 'CO-017', project: "Texas Children's Pavilion", gc: 'McCarthy Building', desc: 'VAV actuator replacements — 22 units — owner directed substitution', amount: 18200, margin: 12.1, initiated: 'Apr 2', status: 'Executed' },
  { co: 'CO-018', project: 'Harris County Admin Complex', gc: 'Gilbane Building', desc: 'Additional pipe insulation — revised spec addendum', amount: 9400, margin: 14.2, initiated: 'Apr 3', status: 'PM Review' },
  { co: 'CO-019', project: 'Memorial Hermann MOB Ph2', gc: 'Tellepsen Builders', desc: 'Credit memo — deleted VAV zone Level 1 — owner scope reduction', amount: -67800, margin: -6.4, initiated: 'Apr 3', status: 'Awaiting Approval' },
  { co: 'CO-020', project: 'HCA Far West Pavilion', gc: 'Turner Construction', desc: 'New mechanical room layout — added hydronic distribution piping', amount: 28400, margin: 7.8, initiated: 'Apr 4', status: 'CORA Draft' },
  { co: 'CO-021', project: 'Dell EMC Data Center Ph2', gc: 'Hensel Phelps', desc: 'Precision cooling unit power coordination — electrical interface scope added', amount: 54200, margin: 16.3, initiated: 'Apr 5', status: 'PM Review' },
  { co: 'CO-022', project: 'Baylor COM Lab Reno', gc: 'Hensel Phelps', desc: 'Temporary HVAC during lab decommissioning — rental + labor', amount: 11800, margin: 5.2, initiated: 'Apr 5', status: 'CORA Draft' },
  { co: 'CO-023', project: 'Harris County Admin Complex', gc: 'Gilbane Building', desc: 'RTU curb adapter — non-standard equipment footprint', amount: 6200, margin: 18.5, initiated: 'Apr 6', status: 'CORA Draft' },
]

const workflowItems = [
  { co: 'CO-022', project: 'Baylor COM Lab', amount: 11800, step: 0, assignee: 'CORA', note: 'Scope documentation in progress — estimated completion Apr 8' },
  { co: 'CO-020', project: 'HCA Far West', amount: 28400, step: 1, assignee: 'David Kim (PM)', note: 'Sent to PM Apr 4 — 2 days outstanding' },
  { co: 'CO-021', project: 'Dell EMC Data Center', amount: 54200, step: 1, assignee: 'David Kim (PM)', note: 'PM review requested Apr 5 — complexity review needed' },
  { co: 'CO-016', project: 'Baylor COM Lab', amount: 14600, step: 2, assignee: 'Hensel Phelps', note: 'Submitted to GC Apr 3 — awaiting CO# from Hensel Phelps system' },
  { co: 'CO-019', project: 'Memorial Hermann', amount: -67800, step: 3, assignee: 'Tellepsen Builders', note: 'Client counter-signature pending — sent Apr 3 — due Apr 10' },
]

const workflowSteps = ['CORA Drafts', 'PM Reviews', 'Client Submits', 'Client Signs', 'VECTOR Updates Budget']

const contracts = [
  { project: 'Memorial Hermann MOB Ph2', gc: 'Tellepsen Builders', type: 'Subcontract', value: 2847000, executed: 'Sep 15, 2024', amendments: 2, status: 'Active' },
  { project: "Texas Children's Pavilion", gc: 'McCarthy Building', type: 'Subcontract', value: 3120000, executed: 'Jun 1, 2024', amendments: 1, status: 'Closeout' },
  { project: 'Baylor COM Lab Reno', gc: 'Hensel Phelps', type: 'Design-Assist Sub', value: 1640000, executed: 'Jan 8, 2025', amendments: 0, status: 'Active' },
  { project: 'Dell EMC Data Center Ph2', gc: 'Hensel Phelps', type: 'Subcontract', value: 4100000, executed: 'Feb 3, 2025', amendments: 0, status: 'Active' },
  { project: 'HCA Far West Pavilion', gc: 'Turner Construction', type: 'Subcontract', value: 1890000, executed: 'Jul 22, 2024', amendments: 3, status: 'Active' },
  { project: 'Harris County Admin Complex', gc: 'Gilbane Building', type: 'Subcontract', value: 720000, executed: 'Nov 4, 2024', amendments: 1, status: 'Active' },
  { project: 'Pearland ISD Career Tech', gc: 'Cadence McShane', type: 'Subcontract', value: 430000, executed: 'Mar 14, 2025', amendments: 0, status: 'Active' },
]

const impactData = [
  { project: 'Memorial Hermann MOB Ph2', originalMargin: 18.2, currentForecast: 16.8, coNet: -28800, coCount: 2 },
  { project: "Texas Children's Pavilion", originalMargin: 16.4, currentForecast: 18.1, coNet: 18200, coCount: 2 },
  { project: 'Baylor COM Lab Reno', originalMargin: 14.0, currentForecast: 10.6, coNet: -14600, coCount: 2 },
  { project: 'Dell EMC Data Center Ph2', originalMargin: 19.5, currentForecast: 21.2, coNet: 54200, coCount: 1 },
  { project: 'HCA Far West Pavilion', originalMargin: 15.8, currentForecast: 17.1, coNet: 71900, coCount: 2 },
  { project: 'Harris County Admin Complex', originalMargin: 21.0, currentForecast: 22.6, coNet: 15600, coCount: 2 },
]

const completedLog = [
  { time: '11:48am', task: 'COR-0291', desc: 'CO-014 executed — Turner Construction signature confirmed — $43,500 — VECTOR budget updated', outcome: 'Closed' },
  { time: '11:20am', task: 'COR-0290', desc: 'CO-019 credit memo prepared — Tellepsen Builders — $67,800 deduction — sent for signature', outcome: 'Sent' },
  { time: '10:52am', task: 'COR-0289', desc: 'CO-020 scope documentation drafted — HCA Far West new mechanical room layout — routed to David Kim', outcome: 'In Review' },
  { time: '10:18am', task: 'COR-0288', desc: 'CO register updated — Apr status refresh — 10 items reconciled — VECTOR sync confirmed', outcome: 'Updated' },
  { time: '9:45am', task: 'COR-0287', desc: 'RFI-0041 response logged — Baylor COM Lab — HVAC coordination with Hensel Phelps — 2-day turnaround', outcome: 'Logged' },
  { time: '9:12am', task: 'COR-0286', desc: 'Harris County CO-018 submitted — Gilbane Building — $9,400 insulation revision — awaiting PM review', outcome: 'Submitted' },
  { time: '8:40am', task: 'COR-0285', desc: 'Contract amendment filed — HCA Far West — Amendment #3 — scope expansion — DocuSign complete', outcome: 'Filed' },
  { time: 'Apr 5', task: 'COR-0284', desc: 'Weekly CO aging report generated — 5 items open > 3 days — emailed to Mike Gray', outcome: 'Delivered' },
]

export default function CORAWorkspace() {
  const [activeTab, setActiveTab] = useState<'register' | 'workflow' | 'library' | 'impact'>('register')
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  const executedCOs = coRegister.filter(c => c.status === 'Executed')
  const pendingValue = coRegister.filter(c => c.status !== 'Executed').reduce((s, c) => s + c.amount, 0)
  const executedValue = executedCOs.reduce((s, c) => s + c.amount, 0)
  const avgApprovalDays = 4.2

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>{toast}</div>}

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'CO Value Executed YTD', value: `$${(executedValue / 1000).toFixed(0)}K`, sub: `${executedCOs.length} change orders`, color: '#166534' },
          { label: 'Pending Approval $', value: pendingValue < 0 ? `-$${Math.abs(pendingValue / 1000).toFixed(0)}K` : `$${(pendingValue / 1000).toFixed(0)}K`, sub: `${coRegister.filter(c => c.status !== 'Executed').length} items open`, color: pendingValue > 0 ? '#92400e' : '#991b1b' },
          { label: 'Avg Approval Time', value: `${avgApprovalDays} days`, sub: 'Target < 5 days', color: '#0B1E3D' },
          { label: 'CO Margin Impact', value: '+0.8%', sub: 'Net across portfolio', color: '#166534' },
          { label: 'Contracts Under Admin', value: contracts.filter(c => c.status === 'Active').length, sub: `$${(contracts.reduce((s, c) => s + c.value, 0) / 1000000).toFixed(2)}M total value`, color: '#0B1E3D' },
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
            {[['register', 'CO Register'], ['workflow', 'Approval Workflow'], ['library', 'Contract Library'], ['impact', 'Impact Analysis']].map(([id, label]) => (
              <div key={id} className={`tab ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id as any)}>{label}</div>
            ))}
          </div>

          {/* CO REGISTER */}
          {activeTab === 'register' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
                <span>Change Order Register — All Projects</span>
                <button className="btn-gold" style={{ fontSize: 11, padding: '3px 10px' }} onClick={() => showToast('New Change Order form opened')}>+ New CO</button>
              </div>
              <table>
                <thead>
                  <tr><th>CO #</th><th>Project</th><th>GC</th><th>Description</th><th>Amount</th><th>Margin</th><th>Initiated</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {coRegister.map((co, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700, fontSize: 13, color: '#0B1E3D' }}>{co.co}</td>
                      <td style={{ fontSize: 12 }}>{co.project.length > 22 ? co.project.substring(0, 22) + '…' : co.project}</td>
                      <td style={{ fontSize: 12, color: '#5A6A7A' }}>{co.gc.split(' ').slice(0, 2).join(' ')}</td>
                      <td style={{ fontSize: 12, maxWidth: 160 }}>{co.desc.length > 48 ? co.desc.substring(0, 48) + '…' : co.desc}</td>
                      <td style={{ fontWeight: 700, fontSize: 13, color: co.amount < 0 ? '#dc2626' : '#166534' }}>
                        {co.amount < 0 ? `-$${Math.abs(co.amount / 1000).toFixed(1)}K` : `$${(co.amount / 1000).toFixed(1)}K`}
                      </td>
                      <td style={{ fontSize: 12, color: co.margin < 0 ? '#dc2626' : '#166534', fontWeight: 600 }}>{co.margin > 0 ? '+' : ''}{co.margin}%</td>
                      <td style={{ fontSize: 12 }}>{co.initiated}</td>
                      <td>
                        <span className={`badge ${co.status === 'Executed' ? 'badge-green' : co.status === 'Client Review' || co.status === 'PM Review' ? 'badge-amber' : co.status === 'Awaiting Approval' ? 'badge-red' : 'badge-blue'}`} style={{ fontSize: 10 }}>
                          {co.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-secondary" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => showToast(`Opening ${co.co} detail view`)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* WORKFLOW */}
          {activeTab === 'workflow' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Workflow diagram */}
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Approval Workflow — Active Change Orders</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 20, overflowX: 'auto' }}>
                  {workflowSteps.map((step, i) => (
                    <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div style={{ background: '#0B1E3D', color: '#fff', borderRadius: 6, padding: '6px 12px', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', textAlign: 'center', minWidth: 110 }}>
                        <div style={{ fontSize: 10, color: '#C89B3C', marginBottom: 2 }}>Step {i + 1}</div>
                        {step}
                      </div>
                      {i < workflowSteps.length - 1 && <div style={{ color: '#C89B3C', fontWeight: 700, fontSize: 16 }}>→</div>}
                    </div>
                  ))}
                </div>
                {workflowSteps.map((step, stepIdx) => {
                  const items = workflowItems.filter(w => w.step === stepIdx)
                  if (items.length === 0) return null
                  return (
                    <div key={step} style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#5A6A7A', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8 }}>
                        At: {step} ({items.length} item{items.length > 1 ? 's' : ''})
                      </div>
                      {items.map((item, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#F7F8FA', borderRadius: 6, padding: '10px 14px', marginBottom: 6 }}>
                          <span style={{ fontWeight: 700, color: '#0B1E3D', fontSize: 13, minWidth: 60 }}>{item.co}</span>
                          <span style={{ fontSize: 12, flex: 1 }}>{item.project}</span>
                          <span style={{ fontWeight: 600, fontSize: 13, color: item.amount < 0 ? '#dc2626' : '#166534', minWidth: 70 }}>
                            {item.amount < 0 ? `-$${Math.abs(item.amount / 1000).toFixed(1)}K` : `$${(item.amount / 1000).toFixed(1)}K`}
                          </span>
                          <span style={{ fontSize: 11, color: '#5A6A7A', flex: 2 }}>{item.note}</span>
                          <button className="btn-primary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast(`Advancing ${item.co} to next approval step`)}>Advance</button>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* CONTRACT LIBRARY */}
          {activeTab === 'library' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
                <span>Contract Library — {contracts.length} Executed Contracts</span>
                <button className="btn-gold" style={{ fontSize: 11, padding: '3px 10px' }} onClick={() => showToast('Contract upload dialog opened')}>Upload Contract</button>
              </div>
              <table>
                <thead><tr><th>Project</th><th>GC</th><th>Contract Type</th><th>Value</th><th>Executed</th><th>Amendments</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {contracts.map((c, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600, fontSize: 13 }}>{c.project.length > 24 ? c.project.substring(0, 24) + '…' : c.project}</td>
                      <td style={{ fontSize: 12 }}>{c.gc.split(' ').slice(0, 2).join(' ')}</td>
                      <td><span className="badge badge-blue" style={{ fontSize: 10 }}>{c.type}</span></td>
                      <td style={{ fontWeight: 700, fontSize: 13, color: '#0B1E3D' }}>${(c.value / 1000000).toFixed(2)}M</td>
                      <td style={{ fontSize: 12 }}>{c.executed}</td>
                      <td>
                        <span className={`badge ${c.amendments === 0 ? 'badge-green' : c.amendments >= 3 ? 'badge-amber' : 'badge-blue'}`} style={{ fontSize: 10 }}>
                          {c.amendments} amendment{c.amendments !== 1 ? 's' : ''}
                        </span>
                      </td>
                      <td><span className={`badge ${c.status === 'Active' ? 'badge-green' : 'badge-amber'}`}>{c.status}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: 5 }}>
                          <button className="btn-secondary" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => showToast(`Opening ${c.project} contract document`)}>View</button>
                          <button className="btn-primary" style={{ fontSize: 11, padding: '3px 8px' }} onClick={() => showToast(`Amendment form opened for ${c.project}`)}>Amend</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* IMPACT ANALYSIS */}
          {activeTab === 'impact' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="card" style={{ padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Original Margin vs. CO-Adjusted Forecast — By Project</div>
                {impactData.map((p, i) => (
                  <div key={i} style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <div>
                        <span style={{ fontWeight: 600, fontSize: 13 }}>{p.project}</span>
                        <span className="badge badge-blue" style={{ fontSize: 10, marginLeft: 8 }}>{p.coCount} COs</span>
                      </div>
                      <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
                        <span style={{ color: '#5A6A7A' }}>Original: <strong>{p.originalMargin}%</strong></span>
                        <span style={{ color: p.currentForecast >= p.originalMargin ? '#166534' : '#dc2626', fontWeight: 700 }}>
                          Forecast: {p.currentForecast}%
                          <span style={{ marginLeft: 4, fontSize: 11 }}>({p.currentForecast >= p.originalMargin ? '+' : ''}{(p.currentForecast - p.originalMargin).toFixed(1)}pts)</span>
                        </span>
                      </div>
                    </div>
                    <div style={{ position: 'relative', height: 22 }}>
                      <div className="progress-bar-bg" style={{ height: 14, marginTop: 4 }}>
                        <div className="progress-bar-fill" style={{ width: `${(p.originalMargin / 25) * 100}%`, background: '#94a3b8', opacity: 0.5 }} />
                      </div>
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }} className="progress-bar-bg" style={{ height: 8, marginTop: 7, background: 'transparent' }}>
                        <div className="progress-bar-fill" style={{ width: `${(p.currentForecast / 25) * 100}%`, background: p.currentForecast >= p.originalMargin ? '#22c55e' : '#ef4444' }} />
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: '#5A6A7A', marginTop: 4 }}>
                      Net CO value: <span style={{ fontWeight: 600, color: p.coNet >= 0 ? '#166534' : '#dc2626' }}>
                        {p.coNet >= 0 ? '+' : '-'}${Math.abs(p.coNet / 1000).toFixed(1)}K
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>CO Value Waterfall — Executed YTD</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 80 }}>
                  {impactData.map((p, i) => {
                    const max = 80000
                    const isNeg = p.coNet < 0
                    const ht = Math.max((Math.abs(p.coNet) / max) * 64, 8)
                    return (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: isNeg ? '#dc2626' : '#166534' }}>
                          {isNeg ? '-' : '+'}${Math.abs(p.coNet / 1000).toFixed(0)}K
                        </div>
                        <div style={{ width: '100%', background: isNeg ? '#ef4444' : '#22c55e', borderRadius: '3px 3px 0 0', height: `${ht}px` }} />
                        <div style={{ fontSize: 9, color: '#5A6A7A', textAlign: 'center', lineHeight: 1.2 }}>{p.project.split(' ')[0]}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Completed Task Log */}
        <div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', background: '#0B1E3D', color: '#fff', fontWeight: 600, fontSize: 13 }}>CORA — Completed Tasks Today</div>
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
