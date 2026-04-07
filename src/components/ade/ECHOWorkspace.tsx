import { useState } from 'react'
import { ECHO_INBOX } from '../../data'

export default function ECHOWorkspace() {
  const [selectedMsg, setSelectedMsg] = useState<typeof ECHO_INBOX[0] | null>(null)
  const [inbox, setInbox] = useState(ECHO_INBOX)
  const [filter, setFilter] = useState<'all' | 'p1' | 'pending'>('all')
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }

  const filtered = inbox.filter(m => {
    if (filter === 'p1') return m.priority === 1
    if (filter === 'pending') return m.status === 'Awaiting Client' || m.status === 'Under Review' || m.status === 'In Progress'
    return true
  })

  const draftReply: Record<string, string> = {
    'Houston Methodist Research Inst.': 'Thank you for reporting this. We have dispatched Technician Johnson to your location — ETA 45 minutes. Reference: SVC-2854. We will keep you updated on progress.',
    'Hines Energy Tower': 'Hello, your PM visit has been successfully rescheduled to April 22. You will receive a confirmation with technician details 24 hours in advance. — Gray Mechanical Service Team',
    'Tellepsen Builders': 'We have reviewed invoice GM-4468 and will follow up within 24 hours with the change order breakdown documentation. Our Controller Sarah Thornton will reach out directly.',
    'Greenway Plaza Mgmt': 'Technician Ramirez has just updated his ETA — he will arrive within 15 minutes. We apologize for the delay. — Gray Mechanical Dispatch',
    'McCarthy Building Companies': "Thank you for the punchlist. We have logged all 14 items into our project tracker and assigned them to the Texas Children's Pavilion closeout team. Target completion: Apr 18.",
    'Baylor College of Medicine': 'We have scheduled the test and balance certification for April 18 at 8:00 AM. Our certified TAB technician will be on-site with full documentation.',
    'Turner Construction': 'RFI-0028 has been elevated to our engineering team — response committed by Apr 8 COB. We will provide a marked-up drawing set.',
    'CityCentre Management': 'Technician Patel is en route to Suite 410 — ETA 45 minutes. We will provide an update upon arrival. Emergency contact: (832) 555-0142.',
    'Hensel Phelps': 'Confirmed — Mike Gray and David Kim will attend the Dell EMC mobilization meeting Apr 9 at 9:00 AM. Location confirmed at your office.',
    'Vaughn Construction': 'Close-out documentation package for the UT Health Science project will be compiled and delivered via SharePoint by April 10.',
  }

  const responseMetrics = [
    { label: 'Avg Response Time (P1)', value: '< 3 min', color: '#166534' },
    { label: 'Avg Response Time (P2)', value: '18 min', color: '#1e40af' },
    { label: 'Messages Handled Today', value: inbox.length, color: '#0B1E3D' },
    { label: 'Auto-Resolved', value: inbox.filter(m => m.status === 'Resolved' || m.status === 'Responded').length, color: '#166534' },
    { label: 'Escalated to Human', value: inbox.filter(m => m.status === 'Escalated').length, color: '#92400e' },
  ]

  return (
    <div>
      {toast && <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0B1E3D', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 13, zIndex: 1000 }}>{toast}</div>}

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 20 }}>
        {responseMetrics.map(k => (
          <div key={k.label} className="kpi-card">
            <div style={{ fontSize: 10, color: '#5A6A7A', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 600 }}>{k.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 20 }}>
        {/* Inbox */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(11,30,61,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>Client Inbox — ECHO AI Triage</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {[['all', 'All'], ['p1', 'P1 Only'], ['pending', 'Pending']].map(([f, label]) => (
                <button key={f} onClick={() => setFilter(f as any)} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 5, border: `1px solid ${filter === f ? '#2E6FD9' : 'rgba(11,30,61,0.15)'}`, background: filter === f ? '#2E6FD9' : '#fff', color: filter === f ? '#fff' : '#5A6A7A', cursor: 'pointer', fontWeight: filter === f ? 600 : 400 }}>{label}</button>
              ))}
            </div>
          </div>
          {filtered.map((msg, i) => (
            <div key={i} onClick={() => setSelectedMsg(msg)}
              style={{ padding: '13px 18px', borderBottom: '1px solid rgba(11,30,61,0.05)', cursor: 'pointer', background: selectedMsg === msg ? 'rgba(46,111,217,0.04)' : '#fff', borderLeft: `3px solid ${msg.priority === 1 ? '#dc2626' : msg.priority === 2 ? '#f59e0b' : '#94a3b8'}` }}
              onMouseEnter={e => e.currentTarget.style.background = '#F7F8FA'}
              onMouseLeave={e => e.currentTarget.style.background = selectedMsg === msg ? 'rgba(46,111,217,0.04)' : '#fff'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className={`badge ${msg.source === 'Email' ? 'badge-blue' : msg.source === 'Phone' ? 'badge-amber' : 'badge-navy'}`} style={{ fontSize: 9 }}>{msg.source}</span>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>{msg.client}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span className={`badge ${msg.priority === 1 ? 'badge-red' : msg.priority === 2 ? 'badge-amber' : 'badge-blue'}`} style={{ fontSize: 9 }}>P{msg.priority}</span>
                  <span className={`badge ${msg.status === 'Resolved' || msg.status === 'Responded' ? 'badge-green' : msg.status === 'Routed' ? 'badge-blue' : msg.status === 'Escalated' ? 'badge-red' : 'badge-amber'}`} style={{ fontSize: 9 }}>{msg.status}</span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#1C2A3A', marginBottom: 3 }}>{msg.subject}</div>
              <div style={{ fontSize: 11, color: '#5A6A7A' }}>ECHO: {msg.action}</div>
            </div>
          ))}
        </div>

        {/* Conversation panel */}
        <div>
          {selectedMsg ? (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', background: '#0B1E3D', color: '#fff' }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{selectedMsg.client}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{selectedMsg.source} · {selectedMsg.subject}</div>
              </div>
              <div style={{ padding: 16 }}>
                {/* Inbound message */}
                <div style={{ background: '#F7F8FA', borderRadius: 8, padding: 14, marginBottom: 12, borderLeft: `3px solid ${selectedMsg.priority === 1 ? '#dc2626' : '#f59e0b'}` }}>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Received from {selectedMsg.client} · {selectedMsg.source}</div>
                  <div style={{ fontSize: 13, color: '#1C2A3A', lineHeight: 1.5 }}>"{selectedMsg.subject}. Please advise on status and timeline for resolution."</div>
                </div>
                {/* ECHO action */}
                <div style={{ background: 'rgba(46,111,217,0.06)', borderRadius: 8, padding: 12, marginBottom: 12, border: '1px solid rgba(46,111,217,0.15)' }}>
                  <div style={{ fontSize: 10, color: '#2E6FD9', fontWeight: 700, marginBottom: 4 }}>⚡ ECHO AUTOMATED ACTION</div>
                  <div style={{ fontSize: 12, color: '#1C2A3A' }}>{selectedMsg.action}</div>
                </div>
                {/* Draft reply */}
                <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 6 }}>AI-Generated Draft Reply</div>
                <textarea
                  defaultValue={draftReply[selectedMsg.client] || `Thank you for reaching out. We are looking into ${selectedMsg.subject.toLowerCase()} and will respond promptly. — Gray Mechanical Service Team`}
                  style={{ width: '100%', minHeight: 100, padding: 10, fontSize: 12, borderRadius: 6, border: '1px solid rgba(11,30,61,0.15)', resize: 'vertical', lineHeight: 1.5, fontFamily: 'inherit' }}
                />
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <button className="btn-primary" style={{ fontSize: 11, flex: 1 }} onClick={() => { showToast('📧 Reply sent to client'); setSelectedMsg(null) }}>Send Reply</button>
                  <button className="btn-secondary" style={{ fontSize: 11, flex: 1 }} onClick={() => showToast('✏ Draft opened for editing')}>Edit & Send</button>
                  <button className="btn-danger" style={{ fontSize: 11 }} onClick={() => { showToast('🗑 Draft discarded'); setSelectedMsg(null) }}>Discard</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card" style={{ padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📬</div>
              <div style={{ fontWeight: 600, color: '#0B1E3D' }}>Select a message</div>
              <div style={{ fontSize: 12, color: '#5A6A7A', marginTop: 4 }}>Click any inbox item to view the conversation and AI-generated reply draft</div>
            </div>
          )}

          {/* Response time breakdown */}
          <div className="card" style={{ padding: 16, marginTop: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 10 }}>Response Performance by Priority</div>
            {[
              { priority: 'P1 Emergency', responses: 3, avgTime: '2.4 min', sla: '5 min', met: true },
              { priority: 'P2 Standard', responses: 5, avgTime: '18 min', sla: '30 min', met: true },
              { priority: 'P3 Routine', responses: 2, avgTime: '42 min', sla: '4 hrs', met: true },
            ].map(r => (
              <div key={r.priority} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(11,30,61,0.05)', fontSize: 12 }}>
                <span style={{ color: '#5A6A7A' }}>{r.priority}</span>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: '#0B1E3D' }}>{r.avgTime}</span>
                  <span style={{ fontSize: 10, color: '#5A6A7A' }}>SLA: {r.sla}</span>
                  <span className="badge badge-green" style={{ fontSize: 9 }}>✓ Met</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
