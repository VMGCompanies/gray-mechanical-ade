import { useState } from 'react';
import { PROSPECTS } from '../../data';

const EXTENDED_PROSPECTS = [
  { company: 'Skanska USA Building',    contact: 'James Holloway',  title: 'Sr. Project Manager',        vertical: 'Data Center', region: 'Austin',       temp: 'warm', status: 'Outreach Sent',  lastTouch: 'Apr 5', nextAction: 'Follow-up Apr 11' },
  { company: 'Gilbane Building Co.',    contact: 'Patricia Reyes',  title: 'Preconstruction Director',   vertical: 'Healthcare',  region: 'Houston',      temp: 'hot',  status: 'In Discussion', lastTouch: 'Apr 6', nextAction: 'Meeting Apr 16' },
  { company: 'DPR Construction',        contact: 'Mark Liu',        title: 'Operations VP',              vertical: 'Laboratory',  region: 'Houston',      temp: 'cold', status: 'Not Contacted', lastTouch: '—',     nextAction: 'Initial Outreach' },
  { company: 'Balfour Beatty',          contact: 'Sandra Kim',      title: 'Estimating Manager',         vertical: 'Education',   region: 'San Antonio',  temp: 'cold', status: 'Research',       lastTouch: 'Apr 2', nextAction: 'LinkedIn Outreach' },
  { company: 'Brasfield & Gorrie',      contact: 'Tom Whitfield',   title: 'VP Texas',                   vertical: 'Healthcare',  region: 'Houston',      temp: 'warm', status: 'Warm',           lastTouch: 'Mar 31',nextAction: 'RFI Sent' },
  { company: 'JE Dunn Construction',    contact: 'Alicia Park',     title: 'Director of Preconstruction',vertical: 'Hospitality', region: 'Houston',      temp: 'warm', status: 'Intro Made',     lastTouch: 'Apr 1', nextAction: 'Capabilities Deck' },
  { company: 'Whiting-Turner',          contact: 'Robert Haines',   title: 'Senior Estimator',           vertical: 'Data Center', region: 'Dallas',       temp: 'cold', status: 'Not Contacted', lastTouch: '—',     nextAction: 'Research Phase' },
  { company: 'Austin Industries',       contact: 'Carmen Delgado',  title: 'Mechanical Coordinator',     vertical: 'Healthcare',  region: 'Houston',      temp: 'hot',  status: 'Proposal Sent',  lastTouch: 'Apr 4', nextAction: 'Follow-up Apr 9' },
];

const OUTREACH = [
  { date: 'Apr 6',  contact: 'Patricia Reyes — Gilbane',      method: 'Phone',    summary: 'Confirmed Apr 16 meeting — Baylor Med campus expansion interest discussed', response: 'Confirmed', next: 'Meeting prep / capabilities deck' },
  { date: 'Apr 5',  contact: 'James Holloway — Skanska',      method: 'Email',    summary: 'Sent company profile and healthcare HVAC case study — Dell EMC ref', response: 'No Reply',  next: 'Follow-up Apr 11' },
  { date: 'Apr 4',  contact: 'Carmen Delgado — Austin Ind.',  method: 'Email',    summary: 'Sent HVAC proposal + labor rate sheet for Memorial Hermann work scope', response: 'Reviewing', next: 'Follow-up Apr 9' },
  { date: 'Apr 3',  contact: 'Tom Whitfield — Brasfield',     method: 'LinkedIn', summary: 'Connected on LinkedIn — shared Texas Childrens project spotlight post', response: 'Liked Post',next: 'Direct message follow-up' },
  { date: 'Apr 2',  contact: 'Sandra Kim — Balfour Beatty',   method: 'LinkedIn', summary: 'Sent InMail — introduced Gray Mechanical education vertical experience', response: 'No Reply',  next: 'Email outreach Apr 9' },
  { date: 'Apr 1',  contact: 'Alicia Park — JE Dunn',         method: 'Phone',    summary: 'Cold call — reached admin — left voicemail re: hospitality HVAC capabilities', response: 'Voicemail', next: 'Email follow-up' },
  { date: 'Mar 31', contact: 'Robert Haines — Whiting-Turner',method: 'Email',    summary: 'Initial intro email — Houston office expansion — data center background', response: 'No Reply',  next: 'LinkedIn connect' },
  { date: 'Mar 28', contact: 'Mark Liu — DPR Construction',   method: 'LinkedIn', summary: 'Profile reviewed — lab HVAC research — drafting personalized outreach', response: 'Pending',   next: 'Send outreach Apr 7' },
];

const VERTICALS = [
  { name: 'Healthcare',  prospects: 3, pipeline: 5280000, winRate: '63%', gcRels: 4, color: '#1a3a5c' },
  { name: 'Data Center', prospects: 2, pipeline: 3820000, winRate: '50%', gcRels: 2, color: '#2563eb' },
  { name: 'Laboratory',  prospects: 1, pipeline: 560000,  winRate: '33%', gcRels: 1, color: '#7c3aed' },
  { name: 'Education',   prospects: 1, pipeline: 430000,  winRate: '60%', gcRels: 2, color: '#0ea5e9' },
  { name: 'Hospitality', prospects: 1, pipeline: 214000,  winRate: '25%', gcRels: 1, color: '#6366f1' },
];

const CRM_CONTACTS = [
  { name: 'Patricia Reyes',  company: 'Gilbane Building Co.',  lastSync: 'Apr 6 9:14am',  lastActivity: 'Meeting scheduled Apr 16',  status: 'Synced' },
  { name: 'James Holloway',  company: 'Skanska USA Building',  lastSync: 'Apr 5 4:02pm',  lastActivity: 'Email sent — awaiting reply', status: 'Synced' },
  { name: 'Carmen Delgado',  company: 'Austin Industries',     lastSync: 'Apr 4 2:18pm',  lastActivity: 'Proposal under review',       status: 'Synced' },
  { name: 'Tom Whitfield',   company: 'Brasfield & Gorrie',    lastSync: 'Apr 3 11:50am', lastActivity: 'LinkedIn engagement',          status: 'Synced' },
  { name: 'Alicia Park',     company: 'JE Dunn Construction',  lastSync: 'Apr 1 3:45pm',  lastActivity: 'Voicemail left',              status: 'Synced' },
  { name: 'Sandra Kim',      company: 'Balfour Beatty',        lastSync: 'Apr 2 10:30am', lastActivity: 'InMail sent',                 status: 'Pending' },
  { name: 'Mark Liu',        company: 'DPR Construction',      lastSync: 'Mar 28',        lastActivity: 'Profile research',            status: 'Draft' },
  { name: 'Robert Haines',   company: 'Whiting-Turner',        lastSync: 'Not synced',    lastActivity: 'Researching',                 status: 'Not Synced' },
];

const TASK_LOG = [
  { time: '10:02am',   action: 'Meeting brief prepared — Gilbane Building Co. — Patricia Reyes — Healthcare vertical — Apr 16' },
  { time: '9:38am',    action: 'Skanska USA identified — data center expansion Round Rock — outreach email drafted and sent' },
  { time: '9:14am',    action: 'CRM sync completed — 7 of 8 contacts updated in HubSpot — 1 pending' },
  { time: '8:55am',    action: 'Austin Industries proposal sent — Carmen Delgado — memorial hermann work scope' },
  { time: 'Yesterday', action: 'Vertical analysis updated — Healthcare leads pipeline at $5.28M across 3 active prospects' },
  { time: 'Yesterday', action: 'JE Dunn Hospitality outreach — cold call made — voicemail left — email follow-up scheduled' },
  { time: 'Apr 4',     action: 'BD meeting notes logged — Gilbane intro call — strong fit confirmed for healthcare vertical' },
  { time: 'Apr 3',     action: 'Monthly outreach report — 14 contacts touched MTD — 3 responses — 1 meeting booked' },
];

export default function SCOUTWorkspace() {
  const [tab, setTab] = useState('prospects');
  const [toast, setToast] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000); };

  const maxPipeline = Math.max(...VERTICALS.map(v => v.pipeline));

  const tempBadge = (t: string) => {
    if (t === 'hot') return <span className="badge badge-red">Hot</span>;
    if (t === 'warm') return <span className="badge badge-amber">Warm</span>;
    return <span className="badge">Cold</span>;
  };

  const methodBadge = (m: string) => {
    if (m === 'Email') return <span className="badge badge-blue">{m}</span>;
    if (m === 'LinkedIn') return <span className="badge badge-navy">{m}</span>;
    if (m === 'Phone') return <span className="badge badge-green">{m}</span>;
    return <span className="badge">{m}</span>;
  };

  const crmBadge = (s: string) => {
    if (s === 'Synced') return <span className="badge badge-green">{s}</span>;
    if (s === 'Pending') return <span className="badge badge-amber">{s}</span>;
    if (s === 'Draft') return <span className="badge badge-blue">{s}</span>;
    return <span className="badge badge-red">{s}</span>;
  };

  const responseBadge = (r: string) => {
    if (r === 'Confirmed' || r === 'Reviewing') return <span className="badge badge-green">{r}</span>;
    if (r === 'Liked Post' || r === 'Voicemail') return <span className="badge badge-amber">{r}</span>;
    if (r === 'No Reply') return <span className="badge badge-red">{r}</span>;
    return <span className="badge">{r}</span>;
  };

  const activeMeetings = 4;
  const pipelineInfluenced = EXTENDED_PROSPECTS.filter(p => p.temp !== 'cold').reduce((s, _p) => s + 800000, 0);

  return (
    <div style={{ padding: '24px', fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      {toast && <div style={{ position: 'fixed', top: 20, right: 24, background: '#1a3a5c', color: '#fff', padding: '12px 20px', borderRadius: 8, zIndex: 9999, fontWeight: 600, boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}>{toast}</div>}

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a3a5c', margin: 0 }}>SCOUT — Business Development Representative</h2>
        <p style={{ color: '#64748b', marginTop: 4, fontSize: 13 }}>Gray Mechanical | Houston, TX — Prospect Pipeline, Outreach &amp; Market Intelligence</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Active Prospects', value: EXTENDED_PROSPECTS.length.toString(), sub: 'In pipeline', color: '#1a3a5c' },
          { label: 'Meetings This Month', value: activeMeetings.toString(), sub: '1 confirmed Apr 16', color: '#2563eb' },
          { label: 'Pipeline Influenced', value: `$${(pipelineInfluenced / 1000000).toFixed(1)}M`, sub: 'Warm + Hot contacts', color: '#16a34a' },
          { label: 'Outreach Sent MTD', value: '14', sub: 'Emails, calls, LinkedIn', color: '#7c3aed' },
          { label: 'Avg Days to Meeting', value: '18', sub: 'From first touch', color: '#d97706' },
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
        {[['prospects', 'Prospect Pipeline'], ['outreach', 'Outreach Activity'], ['vertical', 'Vertical Analysis'], ['crm', 'CRM Sync']].map(([id, label]) => (
          <button key={id} className={`tab${tab === id ? ' active' : ''}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {/* Prospect Pipeline */}
      {tab === 'prospects' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontWeight: 700, color: '#1a3a5c' }}>Prospect Pipeline</h3>
            <button className="btn-primary" onClick={() => showToast('New prospect profile created')}>+ Add Prospect</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  {['Company', 'Contact', 'Title', 'Vertical', 'Region', 'Temp', 'Status', 'Last Touch', 'Next Action', 'Action'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EXTENDED_PROSPECTS.map((p, i) => (
                  <tr key={p.company} style={{ background: selectedContact === p.company ? '#eff6ff' : p.temp === 'hot' ? '#fffbeb' : i % 2 === 0 ? '#fff' : '#f8fafc', cursor: 'pointer' }} onClick={() => setSelectedContact(p.company === selectedContact ? null : p.company)}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap' }}>{p.company}</td>
                    <td style={{ padding: '10px 12px', color: '#2563eb', fontWeight: 600, whiteSpace: 'nowrap' }}>{p.contact}</td>
                    <td style={{ padding: '10px 12px', color: '#475569', fontSize: 12 }}>{p.title}</td>
                    <td style={{ padding: '10px 12px' }}><span className="badge badge-navy" style={{ fontSize: 11 }}>{p.vertical}</span></td>
                    <td style={{ padding: '10px 12px', color: '#64748b', whiteSpace: 'nowrap' }}>{p.region}</td>
                    <td style={{ padding: '10px 12px' }}>{tempBadge(p.temp)}</td>
                    <td style={{ padding: '10px 12px', color: '#475569', fontSize: 12, whiteSpace: 'nowrap' }}>{p.status}</td>
                    <td style={{ padding: '10px 12px', color: '#64748b', fontSize: 12, whiteSpace: 'nowrap' }}>{p.lastTouch}</td>
                    <td style={{ padding: '10px 12px', color: '#475569', fontSize: 12, maxWidth: 160 }}>{p.nextAction}</td>
                    <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                      <button className="btn-primary" style={{ fontSize: 11, padding: '4px 10px', marginRight: 4 }} onClick={e => { e.stopPropagation(); showToast(`Outreach drafted for ${p.contact} at ${p.company}`); }}>Outreach</button>
                      <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={e => { e.stopPropagation(); showToast(`${p.company} — profile viewed`); }}>Profile</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedContact && (() => {
            const p = EXTENDED_PROSPECTS.find(x => x.company === selectedContact);
            return p ? (
              <div style={{ marginTop: 16, padding: '14px 18px', background: '#eff6ff', borderRadius: 8, border: '1px solid #bfdbfe', fontSize: 13 }}>
                <strong style={{ color: '#1a3a5c' }}>{p.company} — {p.contact}</strong>
                <p style={{ margin: '8px 0 0', color: '#475569' }}>{p.title} | {p.vertical} | {p.region} | Next: {p.nextAction}</p>
              </div>
            ) : null;
          })()}
        </div>
      )}

      {/* Outreach Activity */}
      {tab === 'outreach' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontWeight: 700, color: '#1a3a5c' }}>Outreach Activity Log</h3>
            <button className="btn-primary" onClick={() => showToast('New outreach activity logged')}>Log Activity</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  {['Date', 'Contact', 'Method', 'Message Summary', 'Response', 'Next Step', 'Action'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {OUTREACH.map((o, i) => (
                  <tr key={o.date + o.contact} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <td style={{ padding: '10px 12px', color: '#64748b', whiteSpace: 'nowrap', fontWeight: 600 }}>{o.date}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e293b', whiteSpace: 'nowrap' }}>{o.contact}</td>
                    <td style={{ padding: '10px 12px' }}>{methodBadge(o.method)}</td>
                    <td style={{ padding: '10px 12px', color: '#475569', fontSize: 12, maxWidth: 240 }}>{o.summary}</td>
                    <td style={{ padding: '10px 12px' }}>{responseBadge(o.response)}</td>
                    <td style={{ padding: '10px 12px', color: '#64748b', fontSize: 12, maxWidth: 180 }}>{o.next}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast(`Follow-up queued for ${o.contact}`)}>Follow-Up</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Vertical Analysis */}
      {tab === 'vertical' && (
        <div className="card">
          <h3 style={{ margin: '0 0 20px', fontWeight: 700, color: '#1a3a5c' }}>Vertical Market Analysis</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {VERTICALS.map(v => (
              <div key={v.name} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '18px 20px', borderTop: `4px solid ${v.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <h4 style={{ margin: 0, fontWeight: 800, color: v.color, fontSize: 16 }}>{v.name}</h4>
                  <span className="badge badge-navy" style={{ fontSize: 11 }}>{v.prospects} Prospects</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: '#64748b' }}>Pipeline Value</span>
                      <span style={{ fontWeight: 700, color: '#1a3a5c' }}>${(v.pipeline / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: `${(v.pipeline / maxPipeline) * 100}%`, background: v.color }} />
                    </div>
                  </div>
                  {[
                    { label: 'Win Rate', value: v.winRate },
                    { label: 'GC Relationships', value: v.gcRels.toString() },
                  ].map(s => (
                    <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e2e8f0', fontSize: 13 }}>
                      <span style={{ color: '#64748b' }}>{s.label}</span>
                      <span style={{ fontWeight: 700, color: '#1e293b' }}>{s.value}</span>
                    </div>
                  ))}
                  <button className="btn-secondary" style={{ marginTop: 4, fontSize: 12 }} onClick={() => showToast(`${v.name} vertical report exported`)}>View Prospects</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CRM Sync */}
      {tab === 'crm' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h3 style={{ margin: 0, fontWeight: 700, color: '#1a3a5c' }}>HubSpot CRM Sync</h3>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: '#64748b' }}>Last full sync: Apr 6, 2025 at 9:14am — 7 of 8 contacts synced</p>
            </div>
            <button className="btn-gold" onClick={() => showToast('CRM sync initiated — HubSpot updating')}>Sync Now</button>
          </div>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 16px', marginBottom: 16, fontSize: 13, display: 'flex', gap: 24 }}>
            {[{ label: 'Synced', val: 5, color: '#16a34a' }, { label: 'Pending', val: 1, color: '#d97706' }, { label: 'Draft', val: 1, color: '#2563eb' }, { label: 'Not Synced', val: 1, color: '#dc2626' }].map(s => (
              <span key={s.label}><strong style={{ color: s.color }}>{s.val}</strong> <span style={{ color: '#475569' }}>{s.label}</span></span>
            ))}
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  {['Contact', 'Company', 'Last HubSpot Sync', 'Last Activity', 'Sync Status', 'Action'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CRM_CONTACTS.map((c, i) => (
                  <tr key={c.name} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#1e293b' }}>{c.name}</td>
                    <td style={{ padding: '10px 12px', color: '#475569' }}>{c.company}</td>
                    <td style={{ padding: '10px 12px', color: '#64748b', fontSize: 12 }}>{c.lastSync}</td>
                    <td style={{ padding: '10px 12px', color: '#475569', fontSize: 12 }}>{c.lastActivity}</td>
                    <td style={{ padding: '10px 12px' }}>{crmBadge(c.status)}</td>
                    <td style={{ padding: '10px 12px' }}>
                      {c.status === 'Not Synced' ? (
                        <button className="btn-primary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast(`${c.name} — manual sync pushed to HubSpot`)}>Push to CRM</button>
                      ) : (
                        <button className="btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => showToast(`${c.name} — CRM record opened`)}>View in CRM</button>
                      )}
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
            <div key={i} style={{ display: 'flex', gap: 16, padding: '8px 12px', background: i % 2 === 0 ? '#f8fafc' : '#fff', borderRadius: 6, borderLeft: '3px solid #d97706', fontSize: 13 }}>
              <span style={{ color: '#94a3b8', whiteSpace: 'nowrap', minWidth: 80, fontWeight: 600 }}>{t.time}</span>
              <span style={{ color: '#334155' }}>{t.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
