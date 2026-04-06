import { useState } from 'react'
import { ADES } from '../data'

type ReportTab = 'executive' | 'ade-perf' | 'service-kpis' | 'project-health' | 'sales-pipeline'

export default function ReportsAnalytics() {
  const [tab, setTab] = useState<ReportTab>('executive')

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0B1E3D' }}>Reports & Analytics</h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#5A6A7A' }}>Real-time operational intelligence · ADE-powered data analysis</p>
      </div>

      <div className="tab-bar">
        <div className={`tab ${tab === 'executive' ? 'active' : ''}`} onClick={() => setTab('executive')}>Executive Summary</div>
        <div className={`tab ${tab === 'ade-perf' ? 'active' : ''}`} onClick={() => setTab('ade-perf')}>ADE Performance</div>
        <div className={`tab ${tab === 'service-kpis' ? 'active' : ''}`} onClick={() => setTab('service-kpis')}>Service KPIs</div>
        <div className={`tab ${tab === 'project-health' ? 'active' : ''}`} onClick={() => setTab('project-health')}>Project Health</div>
        <div className={`tab ${tab === 'sales-pipeline' ? 'active' : ''}`} onClick={() => setTab('sales-pipeline')}>Sales Pipeline</div>
      </div>

      {tab === 'executive' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
            {[
              { label: 'MTD Revenue', value: '$1,847,320', sub: 'vs target $1,960,000', pct: 94, color: '#166534' },
              { label: 'Gross Margin MTD', value: '34.2%', sub: 'vs 33.8% prior month', pct: 34.2, color: '#1e40af' },
              { label: 'ADE Tasks MTD', value: '4,814', sub: 'Est. 2.4 FTE labor offset', pct: 100, color: '#7c3aed' },
            ].map(k => (
              <div key={k.label} className="kpi-card">
                <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>{k.label}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: k.color }}>{k.value}</div>
                <div style={{ fontSize: 12, color: '#5A6A7A', marginTop: 4, marginBottom: 8 }}>{k.sub}</div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${Math.min(k.pct, 100)}%`, background: k.color }}></div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 16 }}>Key Performance Metrics — April 2025</div>
              {[
                { label: 'Service Call Close Rate', value: '94%', sub: 'Same day or next day', trend: '↑' },
                { label: 'PM Contract Renewal Rate', value: '88%', sub: 'Trailing 12 months', trend: '→' },
                { label: 'Bid Win Rate', value: '67%', sub: 'Last 12 months · 18 bids', trend: '↑' },
                { label: 'AR Collection Rate (30d)', value: '91%', sub: 'vs 88% prior quarter', trend: '↑' },
                { label: 'Safety Incident Rate', value: '1', sub: 'YTD OSHA recordable', trend: '→' },
                { label: 'Subcontractor Compliance', value: '87.5%', sub: '7/8 subs fully compliant', trend: '↓' },
              ].map(m => (
                <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid rgba(11,30,61,0.05)' }}>
                  <div>
                    <div style={{ fontSize: 13 }}>{m.label}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{m.sub}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#0B1E3D' }}>{m.value}</span>
                    <span style={{ color: m.trend === '↑' ? '#166534' : m.trend === '↓' ? '#dc2626' : '#92400e', fontWeight: 700 }}>{m.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 16 }}>Revenue by Vertical (MTD)</div>
              {[
                { vertical: 'Healthcare', amount: 742000, pct: 40 },
                { vertical: 'Data Centers', amount: 410000, pct: 22 },
                { vertical: 'Laboratories', amount: 312000, pct: 17 },
                { vertical: 'Commercial Office', amount: 204000, pct: 11 },
                { vertical: 'Service / PM', amount: 179320, pct: 10 },
              ].map(r => (
                <div key={r.vertical} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
                    <span style={{ color: '#1C2A3A' }}>{r.vertical}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span style={{ fontWeight: 700 }}>${r.amount.toLocaleString()}</span>
                      <span style={{ color: '#5A6A7A' }}>{r.pct}%</span>
                    </div>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${r.pct}%` }}></div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: 12, background: '#F7F8FA', borderRadius: 6, fontSize: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span>Total MTD Revenue</span>
                  <span style={{ color: '#0B1E3D' }}>$1,847,320</span>
                </div>
              </div>
            </div>
          </div>

          {/* ADE Impact Summary */}
          <div className="card" style={{ padding: 20, background: '#0B1E3D', color: '#fff' }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: '#C89B3C' }}>ADE Platform Impact — April 2025</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>Powered by Neuralogic</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {[
                { label: 'Tasks Automated MTD', value: '4,814' },
                { label: 'Estimated FTE Offset', value: '2.4 FTEs' },
                { label: 'Avg. Response Time', value: '< 2 min' },
                { label: 'Human Override Rate', value: '1.8%' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#C89B3C' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'ade-perf' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 18px', background: '#0B1E3D', color: '#fff', fontWeight: 600 }}>ADE Performance — April 2025 MTD</div>
          <table>
            <thead>
              <tr>
                <th>ADE</th><th>Title</th><th>Tasks (MTD)</th><th>Accuracy Rate</th><th>Human Override</th><th>Avg Cycle Time</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ADES.map((ade, i) => {
                const tasks = [214, 480, 290, 340, 148, 412, 118, 184, 276, 208, 96, 124, 82, 68, 152][i]
                const accuracy = [99.2, 97.8, 98.5, 96.4, 99.7, 99.1, 98.9, 98.2, 99.4, 97.6, 99.8, 98.1, 97.4, 99.9, 98.8][i]
                const override = [0.8, 2.2, 1.5, 3.6, 0.3, 0.9, 1.1, 1.8, 0.6, 2.4, 0.2, 1.9, 2.6, 0.1, 1.2][i]
                const cycle = ['3.2m', '1.8m', '4.1m', '8.4m', '2.1m', '1.4m', '5.8m', '6.2m', '7.1m', '4.8m', '12.4m', '14.2m', '9.8m', '22.1m', '18.4m'][i]
                return (
                  <tr key={ade.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span>{ade.icon}</span>
                        <span style={{ fontWeight: 700 }}>{ade.name}</span>
                      </div>
                    </td>
                    <td style={{ color: '#5A6A7A', fontSize: 12 }}>{ade.title}</td>
                    <td style={{ fontWeight: 700, color: '#2E6FD9' }}>{tasks}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 50, background: '#e2e8f0', borderRadius: 999, height: 5 }}>
                          <div style={{ width: `${accuracy}%`, height: '100%', borderRadius: 999, background: accuracy > 98 ? '#22c55e' : accuracy > 95 ? '#f59e0b' : '#ef4444' }}></div>
                        </div>
                        <span style={{ fontWeight: 700, color: accuracy > 98 ? '#166534' : '#92400e', fontSize: 12 }}>{accuracy}%</span>
                      </div>
                    </td>
                    <td style={{ color: override > 2 ? '#dc2626' : '#5A6A7A', fontWeight: override > 2 ? 600 : 400, fontSize: 12 }}>{override}%</td>
                    <td style={{ fontSize: 12, color: '#5A6A7A' }}>{cycle}</td>
                    <td><span className={`badge ${ade.status === 'RUNNING' ? 'badge-green' : ade.status === 'AWAITING APPROVAL' ? 'badge-amber' : 'badge-navy'}`}>{ade.status}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'service-kpis' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Calls Closed This Month', value: 148, color: '#166534' },
              { label: 'Same/Next Day Close Rate', value: '94%', color: '#1e40af' },
              { label: 'Emergency Response Avg.', value: '18 min', color: '#dc2626' },
              { label: 'Customer Satisfaction', value: '4.8/5.0', color: '#166534' },
              { label: 'Avg. Revenue Per Call', value: '$1,240', color: '#0B1E3D' },
              { label: 'PM Visits Completed MTD', value: 12, color: '#7c3aed' },
            ].map(k => (
              <div key={k.label} className="kpi-card">
                <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 4 }}>{k.label}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: k.color }}>{k.value}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 16 }}>Service Volume — Last 8 Weeks</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 160 }}>
              {[18,22,14,28,19,31,24,27].map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ fontSize: 10, color: '#5A6A7A', fontWeight: 700 }}>{v}</div>
                  <div style={{ width: '100%', background: '#2E6FD9', borderRadius: '3px 3px 0 0', height: `${(v / 31) * 140}px` }}></div>
                  <div style={{ fontSize: 10, color: '#94a3b8' }}>W{i + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'project-health' && (
        <div>
          {[
            { name: 'Memorial Hermann MOB Phase 2', gc: 'Tellepsen', value: 2847000, billed: 1404000, pct: 49, health: 'On Budget', schedule: 'On Schedule', labor: '+1.4%', margin: '10.4%' },
            { name: "Texas Children's Pavilion HVAC", gc: 'McCarthy', value: 3120000, billed: 2808000, pct: 90, health: '2.1% Under', schedule: '3 days ahead', labor: '-3.1%', margin: '10.1%' },
            { name: 'Baylor COM Lab Reno', gc: 'Hensel Phelps', value: 1640000, billed: 312000, pct: 19, health: '8.4% OVER', schedule: 'On Schedule', labor: '+8.5%', margin: '8.5% (proj)' },
            { name: 'Dell EMC Data Center Phase 2', gc: 'Hensel Phelps', value: 4100000, billed: 123000, pct: 3, health: 'On Budget', schedule: 'Mobilizing', labor: 'N/A', margin: '7.8% (proj)' },
            { name: 'HCA Far West Medical Pavilion', gc: 'Turner', value: 1890000, billed: 918000, pct: 49, health: 'On Budget', schedule: '1 wk behind', labor: '-1.1%', margin: '9.2%' },
          ].map(p => (
            <div key={p.name} className="card" style={{ padding: 16, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#5A6A7A' }}>GC: {p.gc} · ${p.value.toLocaleString()}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span className={`badge ${p.health === 'On Budget' ? 'badge-green' : p.health.includes('Under') ? 'badge-blue' : 'badge-red'}`}>{p.health}</span>
                  <span className={`badge ${p.schedule === 'On Schedule' || p.schedule.includes('ahead') || p.schedule === 'Mobilizing' ? 'badge-green' : 'badge-amber'}`}>{p.schedule}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {[
                  ['Billed to Date', `$${p.billed.toLocaleString()}`],
                  ['% Complete', `${p.pct}%`],
                  ['Labor Variance', p.labor],
                  ['Projected Margin', p.margin],
                ].map(([k, v]) => (
                  <div key={String(k)}>
                    <div style={{ fontSize: 10, color: '#5A6A7A', marginBottom: 2 }}>{k}</div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: String(v).includes('+') && k === 'Labor Variance' ? '#dc2626' : String(v).includes('-') && k === 'Labor Variance' ? '#166534' : '#0B1E3D' }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10 }}>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${p.pct}%`, background: p.health.includes('OVER') ? '#ef4444' : p.schedule.includes('behind') ? '#f59e0b' : '#22c55e' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'sales-pipeline' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Total Pipeline Value', value: '$7.95M', color: '#0B1E3D' },
              { label: 'Win Rate (12mo)', value: '67%', color: '#166534' },
              { label: 'Avg. Bid Cycle', value: '38 days', color: '#1e40af' },
            ].map(k => (
              <div key={k.label} className="kpi-card">
                <div style={{ fontSize: 11, color: '#5A6A7A', marginBottom: 4 }}>{k.label}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: k.color }}>{k.value}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 16 }}>Pipeline by Stage</div>
            {[
              { stage: 'Scoping / Schematic', count: 2, value: 4380000, color: '#94a3b8' },
              { stage: 'Estimating', count: 1, value: 560000, color: '#60a5fa' },
              { stage: 'Bidding', count: 2, value: 2737000, color: '#f59e0b' },
              { stage: 'Final Review', count: 1, value: 1247000, color: '#22c55e' },
              { stage: 'Won (This Month)', count: 1, value: 430000, color: '#0B1E3D' },
            ].map(s => (
              <div key={s.stage} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{ width: 120, fontSize: 12, color: '#5A6A7A' }}>{s.stage}</div>
                <div style={{ flex: 1 }}>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${(s.value / 5000000) * 100}%`, background: s.color }}></div>
                  </div>
                </div>
                <div style={{ width: 100, fontSize: 12, fontWeight: 700, color: '#0B1E3D', textAlign: 'right' }}>${s.value.toLocaleString()}</div>
                <div style={{ width: 30, fontSize: 12, color: '#5A6A7A', textAlign: 'center' }}>{s.count}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
