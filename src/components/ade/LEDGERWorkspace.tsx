import { useState } from 'react';
import { AP_INVOICES, PO_LOG } from '../../data';

const EXTENDED_INVOICES = [
  { inv: 'F-88231',  vendor: 'Ferguson Enterprises',  amount: 44180,  po: 'PO-0892', threeWay: 'PASS',            age: 5,  status: 'Approved' },
  { inv: 'JS-44812', vendor: 'Johnstone Supply',       amount: 8220,   po: 'PO-0893', threeWay: 'PASS',            age: 1,  status: 'Paid' },
  { inv: 'CC-10281', vendor: 'Carrier Commercial',     amount: 14200,  po: 'PO-0894', threeWay: 'PARTIAL',         age: 4,  status: 'Held' },
  { inv: 'WH-29841', vendor: 'Winsupply Houston',      amount: 19840,  po: 'PO-0895', threeWay: 'PENDING',         age: 2,  status: 'Pending' },
  { inv: 'LAB-0041', vendor: 'Premier Sheet Metal',    amount: 34200,  po: 'Sub Inv', threeWay: 'BLOCKED',         age: 8,  status: 'Blocked' },
  { inv: 'FE-91002', vendor: 'Ferguson Enterprises',   amount: 6840,   po: 'PO-0896', threeWay: 'PASS',            age: 1,  status: 'Queued' },
  { inv: 'JOH-8812', vendor: 'Johnstone Supply',       amount: 3410,   po: 'PO-0881', threeWay: 'PASS',            age: 12, status: 'Approved' },
  { inv: 'CAR-9941', vendor: 'Carrier Commercial',     amount: 8900,   po: 'PO-0879', threeWay: 'PASS',            age: 18, status: 'Paid' },
];

const PAYMENT_RUN = [
  { vendor: 'Ferguson Enterprises',  amount: 44180,  scheduled: 'Apr 14', method: 'ACH',   status: 'Scheduled' },
  { vendor: 'Johnstone Supply',       amount: 3410,   scheduled: 'Apr 14', method: 'ACH',   status: 'Scheduled' },
  { vendor: 'Carrier Commercial',     amount: 8900,   scheduled: 'Apr 14', method: 'Check', status: 'Held — Variance' },
  { vendor: 'Winsupply Houston',      amount: 19840,  scheduled: 'Apr 18', method: 'ACH',   status: 'Awaiting Receipt' },
  { vendor: 'Gulf Coast Insulation',  amount: 3210,   scheduled: 'Apr 21', method: 'ACH',   status: 'Scheduled' },
];

const AGING = [
  { vendor: 'Ferguson Enterprises', current: 44180, d3160: 6840,   d6190: 0,     d90plus: 0     },
  { vendor: 'Carrier Commercial',   current: 14200, d3160: 8900,   d6190: 0,     d90plus: 0     },
  { vendor: 'Premier Sheet Metal',  current: 34200, d3160: 18400,  d6190: 9800,  d90plus: 4200  },
  { vendor: 'Winsupply Houston',    current: 19840, d3160: 0,      d6190: 0,     d90plus: 0     },
  { vendor: 'Johnstone Supply',     current: 8220,  d3160: 3410,   d6190: 0,     d90plus: 0     },
  { vendor: 'Gulf Coast Insulation',current: 3210,  d3160: 0,      d6190: 0,     d90plus: 0     },
];

const MATCH_LOG = [
  { inv: 'F-88231',  po: 'PO-0892', receipt: 'REC-1041', result: 'PASS',    variance: '$0',     disp: 'Queued for Payment' },
  { inv: 'JS-44812', po: 'PO-0893', receipt: 'REC-1038', result: 'PASS',    variance: '$0',     disp: 'Paid Apr 5' },
  { inv: 'CC-10281', po: 'PO-0894', receipt: 'REC-1040', result: 'PARTIAL', variance: '$280',   disp: 'Held — Pending Clarification' },
  { inv: 'LAB-0041', po: 'N/A',     receipt: 'N/A',       result: 'BLOCKED', variance: 'COI Exp',disp: 'Suspended — COI Required' },
  { inv: 'FE-91002', po: 'PO-0896', receipt: 'REC-1042', result: 'PASS',    variance: '$0',     disp: 'Queued Apr 12' },
  { inv: 'JOH-8812', po: 'PO-0881', receipt: 'REC-1028', result: 'PASS',    variance: '$0',     disp: 'Approved — Queued' },
];

const TASK_LOG = [
  { time: '9:02am',    action: '3-way match PASSED — Ferguson PO-0892 $44,180 — queued for approval by Controller' },
  { time: '8:41am',    action: 'Partial match flagged — Carrier CC-10281 — $280 variance — held for review' },
  { time: '8:20am',    action: 'Premier Sheet Metal LAB-0041 — COI EXPIRED — invoice blocked — SHIELD notified' },
  { time: '7:58am',    action: 'Payment run preview generated — Apr 14 batch — $48,510 total ACH' },
  { time: 'Yesterday', action: 'Winsupply WH-29841 — awaiting delivery confirmation — receipt pending' },
  { time: 'Yesterday', action: 'DPO recalculated — current 28 days — within terms target' },
  { time: 'Apr 4',     action: 'AP aging report distributed to Controller Sarah Thornton' },
  { time: 'Apr 3',     action: 'Early pay discount captured — Johnstone Supply — $164 (2% net 10)' },
];

export default function LEDGERWorkspace() {
  const [tab, setTab] = useState('queue');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000); };

  const pendingTotal = EXTENDED_INVOICES.filter(i => !['Paid', 'Blocked'].includes(i.status)).reduce((s, i) => s + i.amount, 0);
  const blockedCount = EXTENDED_INVOICES.filter(i => i.status === 'Blocked' || i.status === 'Held').length;

  const statusBadge = (s: string) => {
    if (s === 'Paid') return <span className="badge badge-green">{s}</span>;
    if (s === 'Approved' || s === 'Queued') return <span className="badge badge-blue">{s}</span>;
    if (s === 'Blocked') return <span className="badge badge-red">{s}</span>;
    if (s === 'Held') return <span className="badge badge-red">{s}</span>;
    if (s === 'Pending') return <span className="badge badge-amber">{s}</span>;
    return <span className="badge">{s}</span>;
  };

  const matchBadge = (r: string) => {
    if (r === 'PASS') return <span className="badge badge-green">PASS</span>;
    if (r === 'PARTIAL') return <span className="badge badge-amber">PARTIAL</span>;
    if (r === 'BLOCKED') return <span className="badge badge-red">BLOCKED</span>;
    if (r === 'PENDING') return <span className="badge badge-navy">PENDING</span>;
    return <span className="badge">{r}</span>;
  };

  const payBadge = (s: string) => {
    if (s === 'Scheduled') return <span className="badge badge-blue">{s}</span>;
    if (s.includes('Held')) return <span className="badge badge-red">{s}</span>;
    return <span className="badge badge-amber">{s}</span>;
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      {toast && <div style={{ position: 'fixed', top: 20, right: 24, background: '#1a3a5c', color: '#fff', padding: '12px 20px', borderRadius: 8, zIndex: 9999, fontWeight: 600, boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}>{toast}</div>}

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a3a5c', margin: 0 }}>LEDGER — AP &amp; Vendor Invoice Analyst</h2>
        <p style={{ color: '#64748b', marginTop: 4, fontSize: 13 }}>Gray Mechanical | Houston, TX — Accounts Payable, 3-Way Match &amp; Payment Management</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Invoices in Queue', value: EXTENDED_INVOICES.filter(i => !['Paid'].includes(i.status)).length.toString(), sub: 'Awaiting processing', color: '#1a3a5c' },
          { label: 'Pending Payment $', value: `$${(pendingTotal / 1000).toFixed(0)}K`, sub: 'Approved + queued', color: '#2563eb' },
          { label: 'Blocked / Held', value: blockedCount.toString(), sub: 'Action required', color: '#dc2626' },
          { label: 'DPO (Days Payable)', value: '28', sub: 'vs. 30-day target', color: '#7c3aed' },
          { label: 'Discount Captured', value: '$164', sub: 'Early pay MTD', color: '#16a34a' },
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
        {[['queue', 'Invoice Queue'], ['payment', 'Payment Run'], ['aging', 'Vendor Aging'], ['match', '3-Way Match Log']].map(([id, label]) => (
          <button key={id} className={`tab${tab === id ? ' active' : ''}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {/* Invoice Queue */}
      {tab === 'queue' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontWeight: 700, color: '#1a3a5c' }}>Invoice Queue</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-secondary" onClick={() => showToast('Invoice queue exported to Controller dashboard')}>Export</button>
              <button className="btn-primary" onClick={() => showToast('Manual invoice entry form opened')}>+ Manual Entry</button>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  {['Invoice #', 'Vendor', 'Amount', 'PO Match', '3-Way Status', 'Age (Days)', 'Status', 'Action'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EXTENDED_INVOICES.map((inv, i) => (
                  <tr key={inv.inv} style={{ background: inv.status === 'Blocked' || inv.status === 'Held' ? '#fff5f5' : i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#2563eb' }}>{inv.inv}</td>
                    <td style={{ padding: '10px 12px', color: '#1e293b', fontWeight: 500 }}>{inv.vendor}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#1e293b' }}>${inv.amount.toLocaleString()}</td>
                    <td style={{ padding: '10px 12px', color: '#475569', fontSize: 12 }}>{inv.po}</td>
                    <td style={{ padding: '10px 12px' }}>{matchBadge(inv.threeWay)}</td>
                    <td style={{ padding: '10px 12px', fontWeight: inv.age > 10 ? 700 : 400, color: inv.age > 10 ? '#dc2626' : '#475569' }}>{inv.age}d</td>
                    <td style={{ padding: '10px 12px' }}>{statusBadge(inv.status)}</td>
                    <td style={{ padding: '10px 12px' }}>
                      {inv.status === 'Approved' || inv.status === 'Queued' ? (
                        <button className="btn-primary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast(`${inv.inv} — approved for payment run`)}>Approve</button>
                      ) : inv.status === 'Blocked' || inv.status === 'Held' ? (
                        <button className="btn-danger" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast(`${inv.inv} — escalated for manual review`)}>Escalate</button>
                      ) : (
                        <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast(`${inv.inv} — reviewed`)}>Review</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Run */}
      {tab === 'payment' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontWeight: 700, color: '#1a3a5c' }}>Upcoming Payment Run</h3>
            <button className="btn-gold" onClick={() => showToast('Payment run submitted for Controller approval')}>Submit for Approval</button>
          </div>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#1a3a5c', fontWeight: 600 }}>
            Apr 14 ACH Batch Total: <strong>${(PAYMENT_RUN.filter(p => p.scheduled === 'Apr 14' && !p.status.includes('Held') && !p.status.includes('Awaiting')).reduce((a, p) => a + p.amount, 0)).toLocaleString()}</strong> — Pending Controller sign-off
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  {['Vendor', 'Amount', 'Scheduled Date', 'Method', 'Status', 'Action'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PAYMENT_RUN.map((p, i) => (
                  <tr key={p.vendor + p.scheduled} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e293b' }}>{p.vendor}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#1e293b' }}>${p.amount.toLocaleString()}</td>
                    <td style={{ padding: '10px 12px', color: '#475569' }}>{p.scheduled}</td>
                    <td style={{ padding: '10px 12px' }}><span className="badge badge-navy">{p.method}</span></td>
                    <td style={{ padding: '10px 12px' }}>{payBadge(p.status)}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast(`${p.vendor} — payment detail viewed`)}>Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Vendor Aging */}
      {tab === 'aging' && (
        <div className="card">
          <h3 style={{ margin: '0 0 16px', fontWeight: 700, color: '#1a3a5c' }}>AP Aging by Vendor</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  {['Vendor', 'Current (0–30)', '31–60 Days', '61–90 Days', '90+ Days', 'Total', 'Action'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AGING.map((a, i) => {
                  const total = a.current + a.d3160 + a.d6190 + a.d90plus;
                  return (
                    <tr key={a.vendor} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e293b' }}>{a.vendor}</td>
                      <td style={{ padding: '10px 12px', color: '#16a34a', fontWeight: 600 }}>{a.current > 0 ? `$${a.current.toLocaleString()}` : '—'}</td>
                      <td style={{ padding: '10px 12px', color: a.d3160 > 0 ? '#d97706' : '#94a3b8' }}>{a.d3160 > 0 ? `$${a.d3160.toLocaleString()}` : '—'}</td>
                      <td style={{ padding: '10px 12px', color: a.d6190 > 0 ? '#dc2626' : '#94a3b8' }}>{a.d6190 > 0 ? `$${a.d6190.toLocaleString()}` : '—'}</td>
                      <td style={{ padding: '10px 12px', color: a.d90plus > 0 ? '#7c2d12' : '#94a3b8', fontWeight: a.d90plus > 0 ? 700 : 400 }}>{a.d90plus > 0 ? `$${a.d90plus.toLocaleString()}` : '—'}</td>
                      <td style={{ padding: '10px 12px', fontWeight: 700, color: '#1a3a5c' }}>${total.toLocaleString()}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast(`${a.vendor} — aging detail exported`)}>Export</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ background: '#1a3a5c', color: '#fff' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 700 }}>TOTAL</td>
                  {['current', 'd3160', 'd6190', 'd90plus'].map(key => {
                    const total = AGING.reduce((s, a) => s + (a as any)[key], 0);
                    return <td key={key} style={{ padding: '10px 12px', fontWeight: 700 }}>{total > 0 ? `$${total.toLocaleString()}` : '—'}</td>;
                  })}
                  <td style={{ padding: '10px 12px', fontWeight: 700 }}>${AGING.reduce((s, a) => s + a.current + a.d3160 + a.d6190 + a.d90plus, 0).toLocaleString()}</td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* 3-Way Match Log */}
      {tab === 'match' && (
        <div className="card">
          <h3 style={{ margin: '0 0 16px', fontWeight: 700, color: '#1a3a5c' }}>3-Way Match Log</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  {['Invoice', 'PO', 'Receipt', 'Match Result', 'Variance', 'Disposition', 'Action'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATCH_LOG.map((m, i) => (
                  <tr key={m.inv} style={{ background: m.result === 'BLOCKED' ? '#fff5f5' : i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#2563eb' }}>{m.inv}</td>
                    <td style={{ padding: '10px 12px', color: '#475569' }}>{m.po}</td>
                    <td style={{ padding: '10px 12px', color: '#475569' }}>{m.receipt}</td>
                    <td style={{ padding: '10px 12px' }}>{matchBadge(m.result)}</td>
                    <td style={{ padding: '10px 12px', fontWeight: m.variance !== '$0' ? 700 : 400, color: m.variance !== '$0' ? '#dc2626' : '#64748b' }}>{m.variance}</td>
                    <td style={{ padding: '10px 12px', color: '#475569', fontSize: 12 }}>{m.disp}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast(`${m.inv} — match record viewed`)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Task Log */}
      <div className="card" style={{ marginTop: 24 }}>
        <h3 style={{ margin: '0 0 14px', fontWeight: 700, color: '#1a3a5c' }}>Completed Task Log</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {TASK_LOG.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: '8px 12px', background: i % 2 === 0 ? '#f8fafc' : '#fff', borderRadius: 6, borderLeft: '3px solid #7c3aed', fontSize: 13 }}>
              <span style={{ color: '#94a3b8', whiteSpace: 'nowrap', minWidth: 80, fontWeight: 600 }}>{t.time}</span>
              <span style={{ color: '#334155' }}>{t.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
