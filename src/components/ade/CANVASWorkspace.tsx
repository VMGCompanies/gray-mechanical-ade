import { useState } from 'react';
import { BID_PIPELINE } from '../../data';

const EXTENDED_BIDS = [
  { opportunity: "St. Luke's Sugar Land Expansion",    gc: 'Tellepsen Builders',  value: 1247000, bidDate: 'Apr 12', stage: 'Final Review', winProb: 78, margin: '14.2%', status: 'Pending Release' },
  { opportunity: 'Dell EMC Data Center Phase 2',        gc: 'Hensel Phelps',       value: 3820000, bidDate: 'May 3',  stage: 'Design-Build', winProb: 55, margin: '11.8%', status: 'In Progress' },
  { opportunity: 'HCA Far West Medical Pavilion',       gc: 'Turner Construction', value: 1890000, bidDate: 'Apr 22', stage: 'Bidding',       winProb: 62, margin: '13.5%', status: 'Bidding' },
  { opportunity: 'UT Health Science Center Reno',       gc: 'Linbeck Group',       value: 560000,  bidDate: 'May 14', stage: 'Estimating',    winProb: 40, margin: '12.0%', status: 'Started' },
  { opportunity: 'Pearland ISD Career Tech Center',     gc: 'Cadence McShane',     value: 430000,  bidDate: 'Awarded',stage: 'Won',           winProb: 100,margin: '15.1%', status: 'Awarded' },
  { opportunity: 'Riverview Office Park — HVAC',        gc: 'Self-Perform',        value: 214800,  bidDate: 'Apr 30', stage: 'Estimating',    winProb: 35, margin: '16.0%', status: 'In Progress' },
  { opportunity: 'Houston Methodist Research B7',       gc: 'McCarthy Building',   value: 2140000, bidDate: 'Apr 18', stage: 'Final Review',  winProb: 58, margin: '13.0%', status: 'Under Review' },
  { opportunity: 'Memorial Hermann MOB Phase 3',        gc: 'Tellepsen Builders',  value: 1680000, bidDate: 'May 28', stage: 'Identified',    winProb: 45, margin: '14.5%', status: 'Early Stage' },
];

const FUNNEL = [
  { stage: 'Identified',    count: 3,  value: 2940000, color: '#94a3b8' },
  { stage: 'Scoping',       count: 2,  value: 1840000, color: '#6366f1' },
  { stage: 'Estimating',    count: 3,  value: 3815000, color: '#2563eb' },
  { stage: 'Bidding',       count: 2,  value: 2140000, color: '#0ea5e9' },
  { stage: 'Final Review',  count: 2,  value: 3387000, color: '#1a3a5c' },
  { stage: 'Awarded',       count: 1,  value: 430000,  color: '#16a34a' },
];

const PREQUALS = [
  { gc: 'Tellepsen Builders',   status: 'Active',   expiry: 'Dec 2025', bonding: '$5.0M',  contact: 'Ryan Decker',      lastJob: 'Memorial Hermann MOB' },
  { gc: 'Turner Construction',  status: 'Active',   expiry: 'Sep 2025', bonding: '$4.0M',  contact: 'Lori Blackwood',   lastJob: 'HCA Far West' },
  { gc: 'Hensel Phelps',        status: 'Active',   expiry: 'Nov 2025', bonding: '$8.0M',  contact: 'Dan Nguyen',       lastJob: 'Dell EMC DC Phase 1' },
  { gc: 'McCarthy Building',    status: 'Pending',  expiry: 'N/A',      bonding: 'N/A',    contact: 'Alex Torres',      lastJob: 'Memorial Hermann R&B' },
  { gc: 'Linbeck Group',        status: 'Active',   expiry: 'Jun 2025', bonding: '$2.5M',  contact: 'Sarah Webb',       lastJob: 'UT Health Science' },
  { gc: 'Cadence McShane',      status: 'Active',   expiry: 'Mar 2026', bonding: '$3.0M',  contact: 'Mike Huang',       lastJob: 'Pearland ISD CTC' },
  { gc: 'Balfour Beatty',       status: 'Expired',  expiry: 'Jan 2025', bonding: 'N/A',    contact: 'Drew Russell',     lastJob: 'None' },
  { gc: 'DPR Construction',     status: 'Not Filed',expiry: 'N/A',      bonding: 'N/A',    contact: 'Mark Liu',         lastJob: 'None' },
];

const WIN_LOSS = [
  { vertical: 'Healthcare',  bids: 8,  wins: 5, winRate: 63, avgBid: 1420000, topGC: 'Tellepsen' },
  { vertical: 'Data Center', bids: 4,  wins: 2, winRate: 50, avgBid: 2840000, topGC: 'Hensel Phelps' },
  { vertical: 'Education',   bids: 5,  wins: 3, winRate: 60, avgBid: 410000,  topGC: 'Cadence McShane' },
  { vertical: 'Lab/Research',bids: 3,  wins: 1, winRate: 33, avgBid: 680000,  topGC: 'Linbeck' },
  { vertical: 'Office/Comm', bids: 6,  wins: 2, winRate: 33, avgBid: 240000,  topGC: 'Self-Perform' },
];

const TASK_LOG = [
  { time: '10:12am',   action: "Bid bond request assembled — St. Luke's Sugar Land — submitted to surety" },
  { time: '9:48am',    action: 'Win probability updated — HCA Far West — 55% → 62% post-scope meeting' },
  { time: '9:20am',    action: "Dell EMC Phase 2 — design-build scope received — APEX engaged for estimate" },
  { time: '8:44am',    action: 'Bid pipeline report distributed — Controller and CEO — Apr 6 snapshot' },
  { time: 'Yesterday', action: 'Pre-qual application submitted — McCarthy Building — pending approval' },
  { time: 'Yesterday', action: "Pearland ISD win logged — $430K awarded — contract execution initiated" },
  { time: 'Apr 4',     action: 'Win/loss report generated — Q1 2025 — 12 bids, 6 wins, 50% win rate' },
  { time: 'Apr 3',     action: "Bonding capacity review — $8M remaining — reported to CEO" },
];

export default function CANVASWorkspace() {
  const [tab, setTab] = useState('pipeline');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000); };

  const totalPipeline = EXTENDED_BIDS.filter(b => b.status !== 'Awarded').reduce((s, b) => s + b.value, 0);
  const activeBids = EXTENDED_BIDS.filter(b => !['Awarded', 'Early Stage'].includes(b.status)).length;
  const maxFunnelValue = Math.max(...FUNNEL.map(f => f.value));

  const stageBadge = (s: string) => {
    if (s === 'Won' || s === 'Awarded') return <span className="badge badge-green">{s}</span>;
    if (s === 'Final Review') return <span className="badge badge-gold">{s}</span>;
    if (s === 'Bidding') return <span className="badge badge-blue">{s}</span>;
    if (s === 'Design-Build') return <span className="badge badge-navy">{s}</span>;
    if (s === 'Estimating') return <span className="badge badge-amber">{s}</span>;
    return <span className="badge">{s}</span>;
  };

  const prequal = (s: string) => {
    if (s === 'Active') return <span className="badge badge-green">{s}</span>;
    if (s === 'Pending') return <span className="badge badge-amber">{s}</span>;
    if (s === 'Expired') return <span className="badge badge-red">{s}</span>;
    return <span className="badge">{s}</span>;
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      {toast && <div style={{ position: 'fixed', top: 20, right: 24, background: '#1a3a5c', color: '#fff', padding: '12px 20px', borderRadius: 8, zIndex: 9999, fontWeight: 600, boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}>{toast}</div>}

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a3a5c', margin: 0 }}>CANVAS — Sales Operations Analyst</h2>
        <p style={{ color: '#64748b', marginTop: 4, fontSize: 13 }}>Gray Mechanical | Houston, TX — Bid Pipeline, Pre-Qualification &amp; Win/Loss Analytics</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Pipeline Value', value: `$${(totalPipeline / 1000000).toFixed(1)}M`, sub: 'Excl. awarded', color: '#1a3a5c' },
          { label: 'Active Bids', value: activeBids.toString(), sub: 'In progress', color: '#2563eb' },
          { label: 'Win Rate', value: '52%', sub: 'Last 12 months', color: '#16a34a' },
          { label: 'Avg Bid Size', value: '$1.1M', sub: 'FY2025 YTD', color: '#7c3aed' },
          { label: 'Bonding Capacity', value: '$8.0M', sub: 'Remaining', color: '#d97706' },
        ].map(k => (
          <div key={k.label} className="kpi-card" style={{ borderTop: `4px solid ${k.color}` }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: k.color }}>{k.value}</div>
            <div style={{ fontWeight: 700, color: '#1e293b', marginTop: 4 }}>{k.label}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tab-bar" style={{ marginBottom: 20 }}>
        {[['pipeline', 'Bid Pipeline'], ['funnel', 'Pipeline Funnel'], ['prequal', 'Pre-Qual Status'], ['winloss', 'Win/Loss Analysis']].map(([id, label]) => (
          <button key={id} className={`tab${tab === id ? ' active' : ''}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {/* Bid Pipeline */}
      {tab === 'pipeline' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontWeight: 700, color: '#1a3a5c' }}>Active Bid Pipeline</h3>
            <button className="btn-primary" onClick={() => showToast('New opportunity entered into pipeline')}>+ Add Opportunity</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  {['Opportunity', 'GC / Client', 'Mech Value', 'Bid Date', 'Stage', 'Win Prob', 'Margin', 'Action'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EXTENDED_BIDS.map((b, i) => (
                  <tr key={b.opportunity} style={{ background: b.status === 'Awarded' ? '#f0fdf4' : i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e293b', maxWidth: 220 }}>{b.opportunity}</td>
                    <td style={{ padding: '10px 12px', color: '#475569', whiteSpace: 'nowrap' }}>{b.gc}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#1a3a5c' }}>${(b.value / 1000).toFixed(0)}K</td>
                    <td style={{ padding: '10px 12px', color: '#64748b', whiteSpace: 'nowrap' }}>{b.bidDate}</td>
                    <td style={{ padding: '10px 12px' }}>{stageBadge(b.stage)}</td>
                    <td style={{ padding: '10px 12px', minWidth: 120 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar-bg" style={{ width: 60, flexShrink: 0 }}>
                          <div className="progress-bar-fill" style={{ width: `${b.winProb}%`, background: b.winProb >= 70 ? '#16a34a' : b.winProb >= 50 ? '#2563eb' : '#d97706' }} />
                        </div>
                        <span style={{ fontWeight: 700, color: b.winProb >= 70 ? '#16a34a' : b.winProb >= 50 ? '#2563eb' : '#d97706', fontSize: 12 }}>{b.winProb}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: '#475569' }}>{b.margin}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 10px', marginRight: 4 }} onClick={() => showToast(`${b.opportunity} — bid detail opened`)}>View</button>
                      <button className="btn-primary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast(`${b.opportunity} — stage advanced`)}>Advance</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pipeline Funnel */}
      {tab === 'funnel' && (
        <div className="card">
          <h3 style={{ margin: '0 0 24px', fontWeight: 700, color: '#1a3a5c' }}>Pipeline Funnel — Active Opportunities</h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, maxWidth: 680, margin: '0 auto' }}>
            {FUNNEL.map((f, idx) => {
              const widthPct = 100 - idx * 12;
              return (
                <div key={f.stage} style={{ width: `${widthPct}%`, background: f.color, borderRadius: 6, padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s', cursor: 'default' }}>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{f.stage}</span>
                  <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{f.count} {f.count === 1 ? 'bid' : 'bids'}</span>
                    <span style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>${(f.value / 1000000).toFixed(2)}M</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 28 }}>
            {[
              { label: 'Total Pipeline', value: `$${(FUNNEL.reduce((s, f) => s + f.value, 0) / 1000000).toFixed(1)}M` },
              { label: 'Total Opportunities', value: FUNNEL.reduce((s, f) => s + f.count, 0).toString() },
              { label: 'Avg Probability-Weighted Value', value: '$620K' },
            ].map(s => (
              <div key={s.label} style={{ background: '#f1f5f9', borderRadius: 8, padding: '16px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#1a3a5c' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pre-Qual Status */}
      {tab === 'prequal' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontWeight: 700, color: '#1a3a5c' }}>GC Pre-Qualification Status</h3>
            <button className="btn-primary" onClick={() => showToast('New pre-qual application drafted')}>+ New Application</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  {['GC / Client', 'Pre-Qual Status', 'Expiry', 'Bonding Approved', 'Contact', 'Last Job', 'Action'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PREQUALS.map((p, i) => (
                  <tr key={p.gc} style={{ background: p.status === 'Expired' ? '#fff5f5' : i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#1e293b' }}>{p.gc}</td>
                    <td style={{ padding: '10px 12px' }}>{prequal(p.status)}</td>
                    <td style={{ padding: '10px 12px', color: p.status === 'Expired' ? '#dc2626' : '#475569', fontWeight: p.status === 'Expired' ? 700 : 400 }}>{p.expiry}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1a3a5c' }}>{p.bonding}</td>
                    <td style={{ padding: '10px 12px', color: '#475569' }}>{p.contact}</td>
                    <td style={{ padding: '10px 12px', color: '#64748b', fontSize: 12 }}>{p.lastJob}</td>
                    <td style={{ padding: '10px 12px' }}>
                      {p.status === 'Expired' ? (
                        <button className="btn-danger" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast(`${p.gc} — renewal application initiated`)}>Renew</button>
                      ) : p.status === 'Not Filed' ? (
                        <button className="btn-primary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast(`${p.gc} — pre-qual packet prepared`)}>Apply</button>
                      ) : (
                        <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast(`${p.gc} — pre-qual record viewed`)}>View</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Win/Loss Analysis */}
      {tab === 'winloss' && (
        <div className="card">
          <h3 style={{ margin: '0 0 16px', fontWeight: 700, color: '#1a3a5c' }}>Win/Loss Analysis — Last 12 Months</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  {['Vertical', 'Bids Submitted', 'Wins', 'Win Rate', 'Avg Bid Size', 'Win Rate Chart', 'Top GC'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WIN_LOSS.map((w, i) => (
                  <tr key={w.vertical} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#1e293b' }}>{w.vertical}</td>
                    <td style={{ padding: '10px 12px', color: '#475569', textAlign: 'center' }}>{w.bids}</td>
                    <td style={{ padding: '10px 12px', color: '#16a34a', fontWeight: 700, textAlign: 'center' }}>{w.wins}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: w.winRate >= 55 ? '#16a34a' : w.winRate >= 45 ? '#d97706' : '#dc2626' }}>{w.winRate}%</td>
                    <td style={{ padding: '10px 12px', color: '#475569' }}>${(w.avgBid / 1000).toFixed(0)}K</td>
                    <td style={{ padding: '10px 12px', minWidth: 120 }}>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${w.winRate}%`, background: w.winRate >= 55 ? '#16a34a' : w.winRate >= 45 ? '#d97706' : '#dc2626' }} />
                      </div>
                    </td>
                    <td style={{ padding: '10px 12px', color: '#475569', fontSize: 12 }}>{w.topGC}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 20 }}>
            {[
              { label: 'Total Bids (12mo)', value: WIN_LOSS.reduce((s, w) => s + w.bids, 0).toString() },
              { label: 'Total Wins', value: WIN_LOSS.reduce((s, w) => s + w.wins, 0).toString() },
              { label: 'Blended Win Rate', value: '52%' },
              { label: 'Best Vertical', value: 'Healthcare (63%)' },
            ].map(s => (
              <div key={s.label} style={{ background: '#f1f5f9', borderRadius: 8, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#1a3a5c' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Task Log */}
      <div className="card" style={{ marginTop: 24 }}>
        <h3 style={{ margin: '0 0 14px', fontWeight: 700, color: '#1a3a5c' }}>Completed Task Log</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {TASK_LOG.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: '8px 12px', background: i % 2 === 0 ? '#f8fafc' : '#fff', borderRadius: 6, borderLeft: '3px solid #16a34a', fontSize: 13 }}>
              <span style={{ color: '#94a3b8', whiteSpace: 'nowrap', minWidth: 80, fontWeight: 600 }}>{t.time}</span>
              <span style={{ color: '#334155' }}>{t.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
