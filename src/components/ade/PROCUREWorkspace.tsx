import { useState } from 'react';
import { PO_LOG } from '../../data';

const QUOTES = [
  { vendor: 'Carrier Commercial', item: '25-Ton RTU Unit', project: 'Hines PM Contract', amount: 28400, alt: 'Trane / Daikin', lead: '6 wks', rec: 'Approve — specified brand', status: 'Pending' },
  { vendor: 'Trane Supply', item: '25-Ton RTU (Alt)', project: 'Hines PM Contract', amount: 26800, alt: 'Carrier', lead: '4 wks', rec: 'Hold — pending engineer review', status: 'Evaluating' },
  { vendor: 'Winsupply Houston', item: 'Type L Copper 2" — 400ft', project: 'HCA Far West Pavilion', amount: 4820, alt: 'Ferguson', lead: '3 days', rec: 'Approve — best price', status: 'Recommended' },
  { vendor: 'Ferguson Enterprises', item: 'Ductwork Accessories', project: 'Baylor COM Lab', amount: 6840, alt: 'Johnstone', lead: '1 wk', rec: 'Approve — preferred vendor', status: 'Pending' },
  { vendor: 'Gulf Coast Insulation', item: 'Fiberglass Pipe Wrap 2" — 600ft', project: 'Memorial Hermann MOB', amount: 3210, alt: 'None sourced', lead: '5 days', rec: 'Approve — sole source', status: 'Pending' },
];

const VENDORS = [
  { name: 'Ferguson Enterprises', onTime: 94, quality: 96, priceIdx: 1.02, rel: 'Preferred', lastOrder: 'Apr 5', spend: 284000 },
  { name: 'Carrier Commercial', onTime: 78, quality: 98, priceIdx: 1.18, rel: 'Approved', lastOrder: 'Apr 2', spend: 142000 },
  { name: 'Johnstone Supply', onTime: 91, quality: 93, priceIdx: 0.97, rel: 'Preferred', lastOrder: 'Apr 3', spend: 98000 },
  { name: 'Winsupply Houston', onTime: 88, quality: 90, priceIdx: 0.94, rel: 'Approved', lastOrder: 'Apr 4', spend: 76000 },
  { name: 'Premier Sheet Metal', onTime: 72, quality: 85, priceIdx: 1.05, rel: 'Approved', lastOrder: 'Mar 28', spend: 218000 },
  { name: 'Gulf Coast Insulation', onTime: 95, quality: 94, priceIdx: 0.99, rel: 'Preferred', lastOrder: 'Mar 20', spend: 44000 },
];

const SPEND_CATS = [
  { cat: 'HVAC Equipment', amount: 412000, color: '#1a3a5c' },
  { cat: 'Piping & Fittings', amount: 187000, color: '#2563eb' },
  { cat: 'Controls & BAS', amount: 94000, color: '#0ea5e9' },
  { cat: 'Insulation', amount: 61000, color: '#6366f1' },
  { cat: 'Shop Stock', amount: 48000, color: '#a78bfa' },
];

const TASK_LOG = [
  { time: '9:14am', action: 'PO-0896 confirmed — Ferguson Enterprises — $6,840 — Baylor COM Lab' },
  { time: '8:52am', action: 'Lead time alert flagged — Carrier RTU PO-0894 — 6-week ETA — May 14' },
  { time: '8:33am', action: 'Quote comparison generated — 25-Ton RTU — 2 vendors evaluated' },
  { time: '8:11am', action: 'PO-0895 delivery confirmed — Winsupply Houston — HCA Far West' },
  { time: 'Yesterday', action: 'Ferguson PO-0892 delivery tracked — ETA Apr 14 — Status: In Transit' },
  { time: 'Yesterday', action: 'April shop stock replenishment PO drafted — Johnstone Supply — $8,220' },
  { time: 'Apr 4', action: 'Vendor scorecard updated — Premier Sheet Metal flagged — On-Time 72%' },
  { time: 'Apr 3', action: 'Spend analytics report generated — YTD Q1 summary distributed to Controller' },
];

export default function PROCUREWorkspace() {
  const [tab, setTab] = useState('pos');
  const [toast, setToast] = useState<string | null>(null);
  const [selectedPO, setSelectedPO] = useState<string | null>(null);

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000); };

  const maxSpend = Math.max(...SPEND_CATS.map(c => c.amount));
  const totalOnOrder = PO_LOG.filter(p => p.status !== 'Delivered').reduce((s, p) => s + p.amount, 0);

  const statusBadge = (s: string) => {
    if (s === 'Delivered') return <span className="badge badge-green">{s}</span>;
    if (s === 'Lead Time Alert') return <span className="badge badge-red">{s}</span>;
    if (s === 'In Transit') return <span className="badge badge-blue">{s}</span>;
    if (s === 'Confirmed') return <span className="badge badge-navy">{s}</span>;
    return <span className="badge">{s}</span>;
  };

  const recBadge = (r: string) => {
    if (r.startsWith('Approve')) return <span className="badge badge-green">Approve</span>;
    if (r.startsWith('Hold')) return <span className="badge badge-amber">Hold</span>;
    return <span className="badge badge-blue">Review</span>;
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      {toast && <div style={{ position: 'fixed', top: 20, right: 24, background: '#1a3a5c', color: '#fff', padding: '12px 20px', borderRadius: 8, zIndex: 9999, fontWeight: 600, boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}>{toast}</div>}

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a3a5c', margin: 0 }}>PROCURE — Materials &amp; Procurement Coordinator</h2>
        <p style={{ color: '#64748b', marginTop: 4, fontSize: 13 }}>Gray Mechanical | Houston, TX — Purchase Orders, Vendor Quotes &amp; Spend Analytics</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Open POs', value: PO_LOG.filter(p => p.status !== 'Delivered').length.toString(), sub: 'Active orders', color: '#1a3a5c' },
          { label: 'Total $ on Order', value: `$${(totalOnOrder / 1000).toFixed(0)}K`, sub: 'Uncommitted spend', color: '#2563eb' },
          { label: 'Lead Time Alerts', value: '1', sub: 'Requires attention', color: '#dc2626' },
          { label: 'Delivered This Week', value: '1', sub: 'PO-0893 Johnstone', color: '#16a34a' },
          { label: 'Avg Lead Time', value: '11 days', sub: 'Across open POs', color: '#7c3aed' },
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
        {[['pos', 'Open POs'], ['quotes', 'Quotes in Review'], ['scorecard', 'Vendor Scorecard'], ['spend', 'Spend Analytics']].map(([id, label]) => (
          <button key={id} className={`tab${tab === id ? ' active' : ''}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {/* Open POs Tab */}
      {tab === 'pos' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontWeight: 700, color: '#1a3a5c' }}>Open Purchase Orders</h3>
            <button className="btn-primary" onClick={() => showToast('New PO draft initiated — complete in ERP')}>+ New PO</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  {['PO #', 'Vendor', 'Description', 'Job', 'Amount', 'Order Date', 'Expected', 'Status', 'Action'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PO_LOG.map((po, i) => (
                  <tr key={po.po} style={{ background: selectedPO === po.po ? '#eff6ff' : i % 2 === 0 ? '#fff' : '#f8fafc', cursor: 'pointer' }} onClick={() => setSelectedPO(po.po === selectedPO ? null : po.po)}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#2563eb' }}>{po.po}</td>
                    <td style={{ padding: '10px 12px', color: '#1e293b' }}>{po.vendor}</td>
                    <td style={{ padding: '10px 12px', color: '#475569' }}>{po.desc}</td>
                    <td style={{ padding: '10px 12px', color: '#475569', whiteSpace: 'nowrap' }}>{po.job}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#1e293b' }}>${po.amount.toLocaleString()}</td>
                    <td style={{ padding: '10px 12px', color: '#64748b' }}>{po.ordered}</td>
                    <td style={{ padding: '10px 12px', color: po.status === 'Lead Time Alert' ? '#dc2626' : '#64748b', fontWeight: po.status === 'Lead Time Alert' ? 700 : 400 }}>{po.expected}</td>
                    <td style={{ padding: '10px 12px' }}>{statusBadge(po.status)}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 10px', marginRight: 4 }} onClick={e => { e.stopPropagation(); showToast(`${po.po} — tracking updated`); }}>Track</button>
                      <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={e => { e.stopPropagation(); showToast(`${po.po} — vendor notified`); }}>Contact</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedPO && (
            <div style={{ marginTop: 16, padding: '14px 18px', background: '#eff6ff', borderRadius: 8, border: '1px solid #bfdbfe' }}>
              <strong style={{ color: '#1a3a5c' }}>{selectedPO} Details:</strong> Click Track to update delivery status or Contact to send a vendor inquiry. For PO-0894 lead time alert, consider expediting or sourcing alternative unit.
            </div>
          )}
        </div>
      )}

      {/* Quotes in Review Tab */}
      {tab === 'quotes' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontWeight: 700, color: '#1a3a5c' }}>Quotes in Review</h3>
            <button className="btn-primary" onClick={() => showToast('Quote request drafted — vendor notifications queued')}>Request Quote</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  {['Vendor', 'Item', 'Project', 'Quote Amount', 'Alternatives', 'Lead Time', 'Recommendation', 'Action'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {QUOTES.map((q, i) => (
                  <tr key={q.vendor + q.item} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e293b' }}>{q.vendor}</td>
                    <td style={{ padding: '10px 12px', color: '#475569' }}>{q.item}</td>
                    <td style={{ padding: '10px 12px', color: '#64748b', whiteSpace: 'nowrap' }}>{q.project}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#1e293b' }}>${q.amount.toLocaleString()}</td>
                    <td style={{ padding: '10px 12px', color: '#64748b', fontSize: 12 }}>{q.alt}</td>
                    <td style={{ padding: '10px 12px', color: '#64748b' }}>{q.lead}</td>
                    <td style={{ padding: '10px 12px' }}>{recBadge(q.rec)}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <button className="btn-primary" style={{ fontSize: 11, padding: '4px 10px', marginRight: 4 }} onClick={() => showToast(`PO initiated for ${q.item} — ${q.vendor}`)}>Issue PO</button>
                      <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast(`Quote held — awaiting review`)}>Hold</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Vendor Scorecard Tab */}
      {tab === 'scorecard' && (
        <div className="card">
          <h3 style={{ margin: '0 0 16px', fontWeight: 700, color: '#1a3a5c' }}>Vendor Performance Scorecard — YTD 2025</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  {['Vendor', 'On-Time %', 'Quality Score', 'Price Index', 'Relationship', 'Last Order', 'YTD Spend', 'Action'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {VENDORS.map((v, i) => (
                  <tr key={v.name} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e293b' }}>{v.name}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar-bg" style={{ width: 60 }}><div className="progress-bar-fill" style={{ width: `${v.onTime}%`, background: v.onTime < 80 ? '#dc2626' : '#16a34a' }} /></div>
                        <span style={{ fontWeight: 700, color: v.onTime < 80 ? '#dc2626' : '#16a34a' }}>{v.onTime}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar-bg" style={{ width: 60 }}><div className="progress-bar-fill" style={{ width: `${v.quality}%`, background: '#2563eb' }} /></div>
                        <span style={{ fontWeight: 700, color: '#1e293b' }}>{v.quality}</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: v.priceIdx > 1.1 ? '#dc2626' : v.priceIdx < 1.0 ? '#16a34a' : '#475569' }}>{v.priceIdx.toFixed(2)}x</td>
                    <td style={{ padding: '10px 12px' }}><span className={`badge ${v.rel === 'Preferred' ? 'badge-gold' : 'badge-navy'}`}>{v.rel}</span></td>
                    <td style={{ padding: '10px 12px', color: '#64748b' }}>{v.lastOrder}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>${(v.spend / 1000).toFixed(0)}K</td>
                    <td style={{ padding: '10px 12px' }}>
                      <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast(`${v.name} — scorecard detail exported`)}>View Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Spend Analytics Tab */}
      {tab === 'spend' && (
        <div className="card">
          <h3 style={{ margin: '0 0 20px', fontWeight: 700, color: '#1a3a5c' }}>Spend by Category — YTD 2025</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div>
              {SPEND_CATS.map(c => (
                <div key={c.cat} style={{ marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, color: '#1e293b', fontSize: 13 }}>{c.cat}</span>
                    <span style={{ fontWeight: 700, color: '#1a3a5c', fontSize: 13 }}>${(c.amount / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="progress-bar-bg" style={{ height: 22, borderRadius: 4 }}>
                    <div className="progress-bar-fill" style={{ width: `${(c.amount / maxSpend) * 100}%`, background: c.color, borderRadius: 4, height: '100%' }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: '#f1f5f9', borderRadius: 10, padding: '20px 24px' }}>
              <h4 style={{ margin: '0 0 14px', color: '#1a3a5c', fontWeight: 700 }}>YTD Summary</h4>
              {[
                { label: 'Total YTD Spend', value: `$${(SPEND_CATS.reduce((a, c) => a + c.amount, 0) / 1000).toFixed(0)}K` },
                { label: 'Active Vendors', value: '6' },
                { label: 'Open POs', value: PO_LOG.filter(p => p.status !== 'Delivered').length.toString() },
                { label: 'Avg PO Size', value: `$${(PO_LOG.reduce((a, p) => a + p.amount, 0) / PO_LOG.length / 1000).toFixed(1)}K` },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ color: '#64748b', fontSize: 13 }}>{s.label}</span>
                  <span style={{ fontWeight: 700, color: '#1a3a5c', fontSize: 13 }}>{s.value}</span>
                </div>
              ))}
              <button className="btn-gold" style={{ marginTop: 16, width: '100%' }} onClick={() => showToast('Spend report exported to PDF')}>Export Report</button>
            </div>
          </div>
        </div>
      )}

      {/* Task Log */}
      <div className="card" style={{ marginTop: 24 }}>
        <h3 style={{ margin: '0 0 14px', fontWeight: 700, color: '#1a3a5c' }}>Completed Task Log</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {TASK_LOG.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: '8px 12px', background: i % 2 === 0 ? '#f8fafc' : '#fff', borderRadius: 6, borderLeft: '3px solid #2563eb', fontSize: 13 }}>
              <span style={{ color: '#94a3b8', whiteSpace: 'nowrap', minWidth: 80, fontWeight: 600 }}>{t.time}</span>
              <span style={{ color: '#334155' }}>{t.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
