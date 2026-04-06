export const ADES = [
  { id: 'apex',    name: 'APEX',    title: 'Estimating Analyst',              icon: '📐', status: 'RUNNING',           tasksToday: 14, lastAction: 'Generated bid for Lone Star Medical Tower HVAC-C — $847,200', lastTime: '2 min ago' },
  { id: 'dispatch',name: 'DISPATCH',title: 'Field Service Coordinator',       icon: '🚐', status: 'RUNNING',           tasksToday: 31, lastAction: 'Assigned Tech Ramirez to SVC-2841 Greenway Plaza chiller alarm', lastTime: '4 min ago' },
  { id: 'aria',    name: 'ARIA',    title: 'AR & Billing Analyst',            icon: '🧾', status: 'RUNNING',           tasksToday: 18, lastAction: 'Invoice GM-4471 sent to Tellepsen Builders — $312,000', lastTime: '6 min ago' },
  { id: 'vector',  name: 'VECTOR',  title: 'Project Controls Manager',        icon: '📊', status: 'AWAITING APPROVAL', tasksToday: 22, lastAction: 'Budget variance alert — Baylor COM Lab — Labor overrun 8.4%', lastTime: '12 min ago' },
  { id: 'shield',  name: 'SHIELD',  title: 'Compliance & Safety Manager',     icon: '🛡️', status: 'RUNNING',           tasksToday: 9,  lastAction: 'TACLA license renewal alert created — Josh Harris — 47 days', lastTime: '18 min ago' },
  { id: 'echo',    name: 'ECHO',    title: 'Client Communications Manager',   icon: '📬', status: 'RUNNING',           tasksToday: 26, lastAction: 'Triaged P1 inquiry from Houston Methodist — routed to DISPATCH', lastTime: '3 min ago' },
  { id: 'pulse',   name: 'PULSE',   title: 'PM Contract Administrator',       icon: '🔄', status: 'RUNNING',           tasksToday: 7,  lastAction: 'PM renewal draft sent — Greenway Medical Suites — Jun 30', lastTime: '1 hr ago' },
  { id: 'procure', name: 'PROCURE', title: 'Materials & Procurement Coordinator',icon:'📦',status:'RUNNING',           tasksToday: 11, lastAction: 'Carrier RTU lead time alert flagged — 6 weeks — PO-0894', lastTime: '22 min ago' },
  { id: 'ledger',  name: 'LEDGER',  title: 'AP & Vendor Invoice Analyst',     icon: '💳', status: 'AWAITING APPROVAL', tasksToday: 17, lastAction: '3-way match passed — Ferguson PO-0892 $44,180 — queued for approval', lastTime: '8 min ago' },
  { id: 'field',   name: 'FIELD',   title: 'Subcontractor & Labor Coordinator',icon:'🏗️',status: 'RUNNING',           tasksToday: 13, lastAction: 'Daily report received — Foreman Nguyen — Baylor COM site — 12 hrs', lastTime: '34 min ago' },
  { id: 'onboard', name: 'ONBOARD', title: 'HR & Workforce Onboarding Specialist',icon:'👤',status:'RUNNING',         tasksToday: 6,  lastAction: 'Background check cleared — Carlos Mendez — benefits enrollment sent', lastTime: '45 min ago' },
  { id: 'canvas',  name: 'CANVAS',  title: 'Sales Operations Analyst',        icon: '🎯', status: 'AWAITING APPROVAL', tasksToday: 8,  lastAction: 'Bid bond request assembled — St. Luke\'s Sugar Land — submitted', lastTime: '2 hr ago' },
  { id: 'scout',   name: 'SCOUT',   title: 'Business Development Representative',icon:'🔭',status:'RUNNING',          tasksToday: 5,  lastAction: 'New GC prospect identified — Skanska USA Building — outreach drafted', lastTime: '1 hr ago' },
  { id: 'signal',  name: 'SIGNAL',  title: 'Marketing & Content Coordinator', icon: '📣', status: 'RUNNING',           tasksToday: 4,  lastAction: 'LinkedIn post published — Texas Children\'s Pavilion Phase 2 complete', lastTime: '3 hr ago' },
  { id: 'cora',    name: 'CORA',    title: 'Change Order & Contract Admin',   icon: '📝', status: 'RUNNING',           tasksToday: 9,  lastAction: 'CO-014 signature confirmed — Vaughn Construction — $43,500', lastTime: '55 min ago' },
];

export const ACTIVITY_FEED = [
  '[APEX] Generated bid estimate for Lone Star Medical Tower — HVAC Package C — $847,200 — Awaiting PM Review',
  '[DISPATCH] Assigned Technician Ramirez (Ref: SVC-2841) to Greenway Plaza chiller alarm — ETA 42 min',
  '[ARIA] Invoice #GM-4471 sent to Tellepsen Builders — $312,000 — Net 30',
  '[SHIELD] TACLA License renewal alert — Josh Harris — Expires in 47 days — Renewal task created',
  '[ECHO] Service inquiry received from Houston Methodist Research Institute — Triaged as Priority 2 — Routed to DISPATCH',
  '[LEDGER] Matched PO-0892 to Ferguson Enterprises invoice $44,180 — 3-way match passed — Queued for approval',
  '[PROCURE] Carrier RTU quote received — $28,400 — 6-week lead time — Flagged for VECTOR review',
  '[PULSE] PM contract renewal due — Hines Energy Tower — 180-day HVAC agreement — Renewal draft sent',
  '[VECTOR] Budget variance alert — Project 2024-147 (Baylor College of Medicine Lab) — Labor overrun 8.4% — Escalating to PM',
  '[SCOUT] New GC prospect identified — Skanska USA Building — Data Center project in Round Rock — Outreach drafted',
  '[FIELD] Daily report received from Foreman T. Nguyen — Baylor College of Medicine site — 12 crew hours logged',
  '[ONBOARD] Background check cleared — New hire Carlos Mendez (Pipefitter, Journeyman) — Benefits enrollment sent',
  '[SIGNAL] LinkedIn post published — "Gray Mechanical completes Phase 2 HVAC for Texas Children\'s Pavilion"',
  '[CANVAS] Bid bond request assembled — St. Luke\'s Sugar Land Expansion — Submitted to surety',
  '[CORA] Change Order CO-014 executed — Signature confirmed — Vaughn Construction — $43,500',
  '[DISPATCH] SVC-2849 updated — Tech Morales arrived Westchase District — RTU failure diagnosis in progress',
  '[APEX] Comparative analysis complete — Memorial Hermann B7 vs. similar 2023 projects — within 3.2% of baseline',
  '[ARIA] Payment reminder sent — Vaughn Construction — GM-4468 — $187,400 — 3 days overdue',
  '[SHIELD] Sub COI expired — Premier Sheet Metal — 3 open jobs affected — Suspension notice drafted',
  '[LEDGER] Partial match flag — Carrier Commercial CC-10281 — $280 variance — Held for review',
  '[VECTOR] CO-019 credit memo prepared — Tellepsen Builders — $67,800 deduction — Awaiting approval',
  '[ECHO] Rescheduling request processed — Hines Energy Tower PM visit — Moved to Apr 22',
  '[PROCURE] Ferguson PO-0892 delivery confirmed — Apr 14 ETA — Tracking updated',
  '[FIELD] Safety status alert — Premier Sheet Metal COI expired — Notified SHIELD and LEDGER',
  '[ONBOARD] I-9 reminder sent — Denzel Parker — HVAC Tech II — Start date Apr 21',
  '[SIGNAL] Blog draft complete — "Why Healthcare HVAC Needs Specialty Contractors" — Routed to human review',
  '[SCOUT] Meeting brief prepared — Gilbane Building Co. — Patricia Reyes — Healthcare vertical — Apr 16',
  '[CORA] RFI-0041 response logged — Baylor COM Lab — HVAC coordination — 2-day turnaround',
  '[PULSE] PM visit scheduled — Texas Medical Center — Apr 16 — Tech Chen confirmed',
  '[APEX] Bid submitted — Pearland ISD Career Tech — $430,000 — Awarded confirmation received',
  '[DISPATCH] Emergency escalation — SVC-2847 Texas Children\'s steam leak — Tech Johnson dispatched — 8 min response',
  '[ARIA] Lien waiver request sent — Memorial Hermann MOB Phase 2 — GM-4471 — Tellepsen countersign pending',
];

export const APPROVAL_QUEUE = [
  { id: 'AQ-001', ade: 'APEX',   task: "Estimate release for St. Luke's Sugar Land — $1.2M HVAC bid", waiting: '2h 14m', priority: 'HIGH' },
  { id: 'AQ-002', ade: 'LEDGER', task: 'Invoice #F-88231 (Ferguson) — PO mismatch $4,200 — Manual review needed', waiting: '45m', priority: 'MEDIUM' },
  { id: 'AQ-003', ade: 'SHIELD', task: 'Sub COI expired — Premier Sheet Metal — 3 open jobs affected', waiting: '1h 02m', priority: 'HIGH' },
  { id: 'AQ-004', ade: 'VECTOR', task: "Change order CO-019 — Tellepsen — $67,800 credit — Approve to deduct from billing", waiting: '3h 30m', priority: 'HIGH' },
  { id: 'AQ-005', ade: 'CORA',   task: 'CO-020 Scope addition — HCA Far West — $28,400 — New mechanical room layout', waiting: '22m', priority: 'MEDIUM' },
];

export const PROJECTS = [
  {
    id: 'P-2024-141', name: 'Memorial Hermann MOB Phase 2', gc: 'Tellepsen Builders', contractValue: 2847000, billedToDate: 1404000,
    pctComplete: 49, budgetStatus: 'On Budget', scheduleStatus: 'On Schedule', health: 'green',
    startDate: 'Oct 1, 2024', endDate: 'Aug 15, 2025', pm: 'David Kim', super: 'T. Nguyen',
    rfis: [
      { id: 'RFI-0038', subject: 'AHU-3 duct routing conflict at grid B-7', status: 'Open', submitted: 'Apr 1', due: 'Apr 8', assignedTo: 'Tellepsen' },
      { id: 'RFI-0039', subject: 'Plumbing sleeve elevation clarification — Level 4', status: 'Answered', submitted: 'Mar 28', due: 'Apr 4', assignedTo: 'Linbeck' },
      { id: 'RFI-0040', subject: 'Chiller plant pipe size reconciliation', status: 'Open', submitted: 'Apr 3', due: 'Apr 10', assignedTo: 'Engineer' },
      { id: 'RFI-0041', subject: 'Equipment access panel clearances — Mechanical Room 2B', status: 'Pending', submitted: 'Apr 4', due: 'Apr 11', assignedTo: 'Architect' },
      { id: 'RFI-0042', subject: 'Seismic bracing spec for CHW piping over 2.5"', status: 'Open', submitted: 'Apr 5', due: 'Apr 12', assignedTo: 'Structural' },
    ],
    submittals: [
      { id: 'SUB-041', description: 'AHU-1 through AHU-4 Shop Drawings', status: 'Approved', submittedDate: 'Feb 14', returnedDate: 'Mar 1' },
      { id: 'SUB-042', description: 'Chiller Plant Piping Insulation', status: 'Approved', submittedDate: 'Feb 20', returnedDate: 'Mar 8' },
      { id: 'SUB-043', description: 'BAS Control Sequences of Operation', status: 'In Review', submittedDate: 'Mar 15', returnedDate: '—' },
      { id: 'SUB-044', description: 'VAV Box Schedule — Zones 1–48', status: 'Approved', submittedDate: 'Feb 28', returnedDate: 'Mar 18' },
      { id: 'SUB-045', description: 'Ductwork Shop Drawings — Levels 2–4', status: 'Revise & Resubmit', submittedDate: 'Mar 20', returnedDate: 'Apr 2' },
      { id: 'SUB-046', description: 'Plumbing Fixture Cut Sheets', status: 'Approved', submittedDate: 'Mar 5', returnedDate: 'Mar 22' },
      { id: 'SUB-047', description: 'Pipe Hanger & Support Specs', status: 'Pending Submission', submittedDate: '—', returnedDate: '—' },
      { id: 'SUB-048', description: 'O&M Manual Draft — HVAC Systems', status: 'Pending Submission', submittedDate: '—', returnedDate: '—' },
    ],
    changeOrders: [
      { id: 'CO-011', description: 'Added isolation valves — Level 3 chiller loop', amount: 14800, status: 'Approved', date: 'Feb 10' },
      { id: 'CO-012', description: 'Owner-directed scope: 6 additional VAV zones', amount: 28400, status: 'Approved', date: 'Mar 1' },
      { id: 'CO-013', description: 'Diffuser type upgrade — Level 5 Admin area', amount: 6200, status: 'Pending', date: 'Mar 28' },
      { id: 'CO-014', description: 'Mechanical room acoustic treatment', amount: 43500, status: 'Executed', date: 'Apr 3' },
    ],
    budget: { labor: { budget: 820000, actual: 831400 }, material: { budget: 940000, actual: 918200 }, subcontract: { budget: 620000, actual: 598000 }, overhead: { budget: 180000, actual: 183000 }, margin: { budget: 287000, actual: 295000 } },
  },
  {
    id: 'P-2024-138', name: "Texas Children's Pavilion HVAC", gc: 'McCarthy Building Companies', contractValue: 3120000, billedToDate: 2808000,
    pctComplete: 90, budgetStatus: '2.1% Under', scheduleStatus: '3 days ahead', health: 'green',
    startDate: 'Jul 15, 2024', endDate: 'Apr 30, 2025', pm: 'David Kim', super: 'M. Torres',
    rfis: [
      { id: 'RFI-0021', subject: 'Exhaust fan roof curb elevations', status: 'Answered', submitted: 'Jan 12', due: 'Jan 19', assignedTo: 'Architect' },
      { id: 'RFI-0022', subject: 'Operating room pressurization requirements', status: 'Answered', submitted: 'Feb 1', due: 'Feb 8', assignedTo: 'Engineer' },
      { id: 'RFI-0023', subject: 'Medical gas pressure drop calc — OR suite 4', status: 'Closed', submitted: 'Feb 18', due: 'Feb 25', assignedTo: 'Engineer' },
    ],
    submittals: [
      { id: 'SUB-031', description: 'OR-grade AHU shop drawings', status: 'Approved', submittedDate: 'Aug 20', returnedDate: 'Sep 10' },
      { id: 'SUB-032', description: 'Medical gas system drawings', status: 'Approved', submittedDate: 'Sep 5', returnedDate: 'Sep 28' },
      { id: 'SUB-033', description: 'O&M Manual Final', status: 'In Review', submittedDate: 'Apr 1', returnedDate: '—' },
    ],
    changeOrders: [
      { id: 'CO-008', description: 'Added 4 isolation rooms — HEPA upgrade', amount: 52400, status: 'Approved', date: 'Nov 14' },
      { id: 'CO-009', description: 'Extended warranty — HVAC controls 5yr', amount: 8800, status: 'Approved', date: 'Jan 6' },
    ],
    budget: { labor: { budget: 900000, actual: 872000 }, material: { budget: 1050000, actual: 1038000 }, subcontract: { budget: 680000, actual: 660000 }, overhead: { budget: 200000, actual: 196000 }, margin: { budget: 290000, actual: 316000 } },
  },
  {
    id: 'P-2025-002', name: 'Baylor College of Medicine Lab Reno', gc: 'Hensel Phelps', contractValue: 1640000, billedToDate: 312000,
    pctComplete: 19, budgetStatus: '8.4% OVER', scheduleStatus: 'On Schedule', health: 'red',
    startDate: 'Feb 3, 2025', endDate: 'Sep 30, 2025', pm: 'David Kim', super: 'T. Nguyen',
    rfis: [
      { id: 'RFI-0041', subject: 'Exhaust CFM reconciliation — Fume hood zones', status: 'Open', submitted: 'Apr 2', due: 'Apr 9', assignedTo: 'Engineer' },
      { id: 'RFI-0042', subject: 'Vibration isolation spec for AHU on Level 3', status: 'Pending', submitted: 'Apr 5', due: 'Apr 12', assignedTo: 'Structural' },
    ],
    submittals: [
      { id: 'SUB-011', description: 'Lab-grade AHU shop drawings', status: 'Approved', submittedDate: 'Mar 1', returnedDate: 'Mar 20' },
      { id: 'SUB-012', description: 'Fume hood exhaust fan schedule', status: 'In Review', submittedDate: 'Mar 28', returnedDate: '—' },
      { id: 'SUB-013', description: 'BAS points list', status: 'Pending Submission', submittedDate: '—', returnedDate: '—' },
    ],
    changeOrders: [
      { id: 'CO-001', description: 'Added exhaust riser due to scope change', amount: 18200, status: 'Approved', date: 'Mar 15' },
    ],
    budget: { labor: { budget: 480000, actual: 521000 }, material: { budget: 560000, actual: 572000 }, subcontract: { budget: 280000, actual: 284000 }, overhead: { budget: 120000, actual: 128000 }, margin: { budget: 200000, actual: 140000 } },
  },
  {
    id: 'P-2025-004', name: 'Dell EMC Data Center Phase 2', gc: 'Hensel Phelps', contractValue: 4100000, billedToDate: 123000,
    pctComplete: 3, budgetStatus: 'On Budget', scheduleStatus: 'Mobilizing', health: 'green',
    startDate: 'Mar 17, 2025', endDate: 'Feb 28, 2026', pm: 'David Kim', super: 'Pending Assignment',
    rfis: [],
    submittals: [
      { id: 'SUB-001', description: 'CRAC unit shop drawings', status: 'Pending Submission', submittedDate: '—', returnedDate: '—' },
    ],
    changeOrders: [],
    budget: { labor: { budget: 1200000, actual: 31000 }, material: { budget: 1400000, actual: 42000 }, subcontract: { budget: 900000, actual: 18000 }, overhead: { budget: 280000, actual: 12000 }, margin: { budget: 320000, actual: 20000 } },
  },
  {
    id: 'P-2024-145', name: 'HCA Far West Medical Pavilion', gc: 'Turner Construction', contractValue: 1890000, billedToDate: 918000,
    pctComplete: 49, budgetStatus: 'On Budget', scheduleStatus: '1 week behind', health: 'amber',
    startDate: 'Nov 1, 2024', endDate: 'Jun 30, 2025', pm: 'David Kim', super: 'R. Garza',
    rfis: [
      { id: 'RFI-0028', subject: 'Roof penetration locations — RTU curbs', status: 'Open', submitted: 'Apr 1', due: 'Apr 8', assignedTo: 'Architect' },
      { id: 'RFI-0029', subject: 'Plumbing chase framing coordination', status: 'Answered', submitted: 'Mar 20', due: 'Mar 27', assignedTo: 'GC' },
    ],
    submittals: [
      { id: 'SUB-021', description: 'RTU equipment submittals', status: 'Approved', submittedDate: 'Dec 10', returnedDate: 'Jan 5' },
      { id: 'SUB-022', description: 'Plumbing fixtures', status: 'Approved', submittedDate: 'Jan 20', returnedDate: 'Feb 10' },
      { id: 'SUB-023', description: 'BAS control drawings', status: 'In Review', submittedDate: 'Mar 25', returnedDate: '—' },
    ],
    changeOrders: [
      { id: 'CO-015', description: 'HVAC zoning addition — Radiology suite', amount: 28400, status: 'Pending', date: 'Apr 2' },
      { id: 'CO-019', description: 'Scope credit — deleted pneumatic tube rough-in', amount: -67800, status: 'Under Review', date: 'Apr 4' },
    ],
    budget: { labor: { budget: 560000, actual: 554000 }, material: { budget: 640000, actual: 638000 }, subcontract: { budget: 380000, actual: 374000 }, overhead: { budget: 140000, actual: 138000 }, margin: { budget: 170000, actual: 174000 } },
  },
  {
    id: 'P-2024-149', name: 'Harris County Admin Complex', gc: 'Gilbane Building Co.', contractValue: 720000, billedToDate: 180000,
    pctComplete: 25, budgetStatus: 'On Budget', scheduleStatus: 'On Schedule', health: 'green',
    startDate: 'Jan 6, 2025', endDate: 'Jul 31, 2025', pm: 'David Kim', super: 'B. Castillo',
    rfis: [
      { id: 'RFI-0011', subject: 'Exhaust fan wiring coordination', status: 'Open', submitted: 'Apr 4', due: 'Apr 11', assignedTo: 'Electrical' },
    ],
    submittals: [
      { id: 'SUB-061', description: 'AHU-1 shop drawings', status: 'Approved', submittedDate: 'Feb 1', returnedDate: 'Feb 20' },
      { id: 'SUB-062', description: 'Plumbing rough-in drawings', status: 'In Review', submittedDate: 'Apr 1', returnedDate: '—' },
    ],
    changeOrders: [],
    budget: { labor: { budget: 210000, actual: 198000 }, material: { budget: 240000, actual: 236000 }, subcontract: { budget: 120000, actual: 116000 }, overhead: { budget: 68000, actual: 66000 }, margin: { budget: 82000, actual: 84000 } },
  },
];

export const SERVICE_CALLS = [
  { id: 'SVC-2841', client: 'Greenway Plaza Management', issue: 'Chiller Alarm — Loss of Cooling Floors 3-5', priority: 1, tech: 'Ramirez', status: 'On-Site', eta: 'Complete by 12:00pm', created: '9:02am' },
  { id: 'SVC-2849', client: 'Westchase District', issue: 'RTU Failure — No Heat', priority: 1, tech: 'Morales', status: 'En Route', eta: '10:28am arrival', created: '9:45am' },
  { id: 'SVC-2847', client: "Texas Children's Hospital", issue: 'Steam Leak — Mechanical Room B1', priority: 1, tech: 'Johnson', status: 'On-Site', eta: 'In Progress', created: '8:48am' },
  { id: 'SVC-2850', client: 'CityCentre Houston', issue: 'Cooling Tower Inspection', priority: 2, tech: 'Patel', status: 'En Route', eta: '10:45am', created: '8:30am' },
  { id: 'SVC-2853', client: 'Hines Energy Tower', issue: 'PM Visit — Quarterly HVAC', priority: 3, tech: 'Chen', status: 'Scheduled', eta: '11:00am', created: 'Apr 4' },
  { id: 'SVC-2854', client: 'CityCentre Houston', issue: 'HVAC No Cooling — Suite 410', priority: 2, tech: 'Unassigned', status: 'Open', eta: 'Pending dispatch', created: '10:08am' },
  { id: 'SVC-2855', client: 'Texas Medical Center', issue: 'Plumbing Leak — Ceiling Drain Level 2', priority: 1, tech: 'Unassigned', status: 'Open', eta: 'Pending dispatch', created: '10:14am' },
  { id: 'SVC-2856', client: 'Greenway Medical Suites', issue: 'PM Visit — Semi-Annual', priority: 3, tech: 'Okonkwo', status: 'Scheduled', eta: '2:00pm', created: 'Apr 4' },
];

export const TECHNICIANS = [
  { id: 'T01', name: 'Ramirez', status: 'On-Site', currentJob: 'SVC-2841', location: 'Greenway Plaza', since: '9:42am' },
  { id: 'T02', name: 'Morales', status: 'En Route', currentJob: 'SVC-2849', location: 'Westchase District', since: 'En route' },
  { id: 'T03', name: 'Williams', status: 'Available', currentJob: 'SVC-2836', location: 'Medical Center', since: '9:15am' },
  { id: 'T04', name: 'Chen', status: 'Scheduled', currentJob: 'SVC-2853', location: 'Hines Energy Tower', since: '11:00am start' },
  { id: 'T05', name: 'Johnson', status: 'On-Site', currentJob: 'SVC-2847', location: "Texas Children's", since: '8:55am' },
  { id: 'T06', name: 'Patel', status: 'En Route', currentJob: 'SVC-2850', location: 'CityCentre', since: 'En route' },
  { id: 'T07', name: 'Torres', status: 'Available', currentJob: 'SVC-2831', location: 'Cleared', since: '10:05am' },
  { id: 'T08', name: 'Okonkwo', status: 'Scheduled', currentJob: 'SVC-2856', location: 'Greenway Medical', since: '2:00pm start' },
];

export const INVOICES = [
  { id: 'GM-4471', client: 'Tellepsen Builders', project: 'Memorial Hermann MOB Phase 2', amount: 312000, sent: 'Apr 3, 2025', terms: 'Net 30', due: 'May 3, 2025', status: 'Open', aging: 3 },
  { id: 'GM-4468', client: 'Vaughn Construction', project: 'UT Health Science Center', amount: 187400, sent: 'Mar 20, 2025', terms: 'Net 30', due: 'Apr 19, 2025', status: 'Overdue', aging: 33 },
  { id: 'GM-4461', client: 'McCarthy Building', project: "Texas Children's Pavilion Phase 2", amount: 448000, sent: 'Mar 5, 2025', terms: 'Net 45', due: 'Apr 19, 2025', status: 'Due Today', aging: 45 },
  { id: 'GM-4455', client: 'Hines Properties', project: 'Energy Tower PM Annual', amount: 64200, sent: 'Feb 28, 2025', terms: 'Net 30', due: 'Mar 30, 2025', status: 'Overdue', aging: 37 },
  { id: 'GM-4449', client: 'Hensel Phelps', project: 'Baylor COM Lab Reno', amount: 82000, sent: 'Feb 15, 2025', terms: 'Net 30', due: 'Mar 17, 2025', status: 'Paid', aging: 0 },
  { id: 'GM-4440', client: 'Turner Construction', project: 'HCA Far West Pavilion', amount: 189000, sent: 'Feb 1, 2025', terms: 'Net 30', due: 'Mar 3, 2025', status: 'Paid', aging: 0 },
  { id: 'GM-4435', client: 'Gilbane Building Co.', project: 'Harris County Admin Complex', amount: 36000, sent: 'Jan 28, 2025', terms: 'Net 30', due: 'Feb 27, 2025', status: 'Paid', aging: 0 },
  { id: 'GM-4429', client: 'Hensel Phelps', project: 'Dell EMC Data Center Phase 2', amount: 41000, sent: 'Mar 28, 2025', terms: 'Net 30', due: 'Apr 27, 2025', status: 'Open', aging: 9 },
];

export const COMPLIANCE_ITEMS = [
  { category: 'TACLA License', item: 'Josh Harris — TACLA000045915C', status: 'Active', expiry: 'Jun 14, 2025', daysLeft: 69, critical: false },
  { category: 'TSBPE License', item: "Bryan O'Neal — MPL38947", status: 'Active', expiry: 'Sep 30, 2025', daysLeft: 177, critical: false },
  { category: 'Subcontractor COI', item: 'Premier Sheet Metal', status: 'EXPIRED', expiry: 'Apr 1, 2025', daysLeft: -5, critical: true },
  { category: 'Subcontractor COI', item: 'Gulf Coast Insulation', status: 'Active', expiry: 'Dec 31, 2025', daysLeft: 269, critical: false },
  { category: 'OSHA Recordable Log', item: 'YTD 2025 — 1 Recordable Incident', status: 'Monitored', expiry: '—', daysLeft: 0, critical: false },
  { category: 'Building Permit', item: 'Memorial Hermann — BP-2024-18841', status: 'Active', expiry: 'Active through project', daysLeft: 999, critical: false },
  { category: 'Mechanical Permit', item: 'Baylor COM Lab — MP-2025-0041', status: 'Pending Inspection', expiry: 'Apr 15 Inspection', daysLeft: 9, critical: false },
  { category: "Workers' Comp", item: 'Texas Mutual — TM-8824471', status: 'Active', expiry: 'Jul 1, 2025', daysLeft: 86, critical: false },
];

export const PM_CONTRACTS = [
  { client: 'Hines Properties', site: 'Energy Tower', type: 'HVAC Full Coverage', visitsYr: 12, nextVisit: 'Apr 22', revenueYr: 64200, renewal: 'Sep 1, 2025', status: 'Active' },
  { client: 'Greenway Medical Suites', site: 'Greenway Medical', type: 'HVAC + Plumbing', visitsYr: 4, nextVisit: 'Apr 22', revenueYr: 28400, renewal: 'Jun 30, 2025', status: 'Renewal Due' },
  { client: 'Texas Medical Center Facilities', site: 'Multiple Sites', type: 'HVAC', visitsYr: 24, nextVisit: 'Apr 16', revenueYr: 112800, renewal: 'Dec 1, 2025', status: 'Active' },
  { client: 'CityCentre Management', site: 'CityCentre Office', type: 'HVAC Seasonal', visitsYr: 2, nextVisit: 'Oct 1', revenueYr: 14200, renewal: 'Annual', status: 'Active' },
  { client: 'Baylor College of Medicine', site: 'BCM Lab Complex', type: 'HVAC Full + Plumbing', visitsYr: 12, nextVisit: 'Apr 18', revenueYr: 88400, renewal: 'Jul 15, 2025', status: 'Active' },
];

export const PO_LOG = [
  { po: 'PO-0892', vendor: 'Ferguson Enterprises', desc: 'HVAC Equipment Package', job: 'Memorial Hermann MOB', amount: 44180, ordered: 'Apr 1', expected: 'Apr 14', status: 'In Transit' },
  { po: 'PO-0893', vendor: 'Johnstone Supply', desc: 'Service Parts — April Replenishment', job: 'Shop Stock', amount: 8220, ordered: 'Apr 3', expected: 'Apr 10', status: 'Delivered' },
  { po: 'PO-0894', vendor: 'Carrier Commercial', desc: '25-Ton RTU — Hines Tower PM', job: 'Hines PM Contract', amount: 28400, ordered: 'Apr 2', expected: 'May 14', status: 'Lead Time Alert' },
  { po: 'PO-0895', vendor: 'Winsupply Houston', desc: 'Plumbing Rough Package', job: 'HCA Far West Pavilion', amount: 19840, ordered: 'Apr 4', expected: 'Apr 18', status: 'Confirmed' },
  { po: 'PO-0896', vendor: 'Ferguson Enterprises', desc: 'Ductwork Accessories', job: 'Baylor COM Lab', amount: 6840, ordered: 'Apr 5', expected: 'Apr 12', status: 'Confirmed' },
];

export const AP_INVOICES = [
  { inv: 'F-88231', vendor: 'Ferguson Enterprises', amount: 44180, po: 'PO-0892', match: 'PASS', status: 'Approved' },
  { inv: 'JS-44812', vendor: 'Johnstone Supply', amount: 8220, po: 'PO-0893', match: 'PASS', status: 'Paid Apr 5' },
  { inv: 'CC-10281', vendor: 'Carrier Commercial', amount: 14200, po: 'PO-0894', match: 'PARTIAL — $280 variance', status: 'Hold' },
  { inv: 'WH-29841', vendor: 'Winsupply Houston', amount: 19840, po: 'PO-0895', match: 'Pending Delivery', status: 'Pending' },
  { inv: 'LAB-0041', vendor: 'Premier Sheet Metal', amount: 34200, po: 'N/A Sub Invoice', match: 'COI EXPIRED — BLOCKED', status: 'Blocked' },
];

export const SUBS = [
  { name: 'Premier Sheet Metal', trade: 'HVAC Ductwork', projects: 'Memorial Hermann, Baylor COM', crew: 8, status: 'On Site', reportTime: '7:02am', safety: 'COI EXPIRED' },
  { name: 'Gulf Coast Insulation', trade: 'Insulation', projects: "Texas Children's Pavilion", crew: 4, status: 'On Site', reportTime: '6:58am', safety: 'Compliant' },
  { name: 'Ace Controls Inc.', trade: 'BAS/Controls', projects: 'Dell EMC Data Center', crew: 3, status: 'Scheduled 1pm', reportTime: '—', safety: 'Compliant' },
  { name: 'Houston Crane & Rigging', trade: 'Rigging', projects: 'HCA Far West Pavilion', crew: 2, status: 'Completed', reportTime: '3:41pm', safety: 'Compliant' },
];

export const ONBOARDING = [
  { name: 'Carlos Mendez', role: 'Pipefitter Journeyman', startDate: 'Apr 14', step: 'Benefits Enrollment', status: 'In Progress',
    checklist: [
      { item: 'Application Received', done: true }, { item: 'Background Check', done: true }, { item: 'Drug Screen', done: true },
      { item: 'I-9 Verification', done: true }, { item: 'Offer Letter Signed', done: true }, { item: 'Benefits Enrollment', done: false },
      { item: 'Safety Orientation', done: false }, { item: 'Tool Issue', done: false },
    ]
  },
  { name: 'Denzel Parker', role: 'HVAC Technician II', startDate: 'Apr 21', step: 'I-9 Verification', status: 'Cleared — Awaiting I-9',
    checklist: [
      { item: 'Application Received', done: true }, { item: 'Background Check', done: true }, { item: 'Drug Screen', done: true },
      { item: 'I-9 Verification', done: false }, { item: 'Offer Letter Signed', done: true }, { item: 'Benefits Enrollment', done: false },
      { item: 'Safety Orientation', done: false }, { item: 'Tool Issue', done: false },
    ]
  },
  { name: 'Maria Gutierrez', role: 'Admin Coordinator', startDate: 'Apr 28', step: 'Offer Letter', status: 'Awaiting Signature',
    checklist: [
      { item: 'Application Received', done: true }, { item: 'Background Check', done: true }, { item: 'Drug Screen', done: true },
      { item: 'I-9 Verification', done: false }, { item: 'Offer Letter Signed', done: false }, { item: 'Benefits Enrollment', done: false },
      { item: 'Safety Orientation', done: false }, { item: 'Tool Issue', done: false },
    ]
  },
  { name: 'Omar Hassan', role: 'Sheet Metal Foreman', startDate: 'May 5', step: 'Craft Cert Verify', status: 'Pending NCCER',
    checklist: [
      { item: 'Application Received', done: true }, { item: 'Background Check', done: false }, { item: 'Drug Screen', done: false },
      { item: 'I-9 Verification', done: false }, { item: 'Offer Letter Signed', done: true }, { item: 'Benefits Enrollment', done: false },
      { item: 'Safety Orientation', done: false }, { item: 'Tool Issue', done: false },
    ]
  },
];

export const BID_PIPELINE = [
  { opportunity: "St. Luke's Sugar Land Expansion", gc: 'Tellepsen Builders', value: 1247000, bidDate: 'Apr 12', stage: 'Final Review', winProb: 78, status: 'Pending Release' },
  { opportunity: 'Dell EMC Data Center Phase 2', gc: 'Hensel Phelps', value: 3820000, bidDate: 'May 3', stage: 'Design-Build', winProb: 55, status: 'In Progress' },
  { opportunity: 'HCA Far West Medical Pavilion', gc: 'Turner Construction', value: 1890000, bidDate: 'Apr 22', stage: 'Bidding', winProb: 62, status: 'Bidding' },
  { opportunity: 'UT Health Science Center Reno', gc: 'Linbeck Group', value: 560000, bidDate: 'May 14', stage: 'Estimating', winProb: 40, status: 'Started' },
  { opportunity: 'Pearland ISD Career Tech Center', gc: 'Cadence McShane', value: 430000, bidDate: 'Awarded', stage: 'Won', winProb: 100, status: 'Awarded' },
];

export const PROSPECTS = [
  { company: 'Skanska USA Building', contact: 'James Holloway', title: 'Sr. Project Manager', vertical: 'Data Center', region: 'Austin', status: 'Outreach Sent', nextAction: 'Follow-up Apr 11', temp: 'warm' },
  { company: 'Gilbane Building Co.', contact: 'Patricia Reyes', title: 'Preconstruction Director', vertical: 'Healthcare', region: 'Houston', status: 'In Discussion', nextAction: 'Meeting Apr 16', temp: 'hot' },
  { company: 'DPR Construction', contact: 'Mark Liu', title: 'Operations VP', vertical: 'Laboratory', region: 'Houston', status: 'Not Contacted', nextAction: 'Initial Outreach', temp: 'cold' },
  { company: 'Balfour Beatty', contact: 'Sandra Kim', title: 'Estimating Manager', vertical: 'Education', region: 'San Antonio', status: 'Cold', nextAction: 'Research Phase', temp: 'cold' },
  { company: 'Brasfield & Gorrie', contact: 'Tom Whitfield', title: 'VP Texas', vertical: 'Healthcare', region: 'Houston', status: 'Warm', nextAction: 'RFI Sent', temp: 'warm' },
];

export const CONTENT_CALENDAR = [
  { date: 'Apr 7', platform: 'LinkedIn', type: 'Project Spotlight', topic: "Texas Children's Pavilion HVAC Complete", status: 'Published' },
  { date: 'Apr 10', platform: 'Website', type: 'Blog Post', topic: '"Why Healthcare HVAC Needs Specialty Contractors"', status: 'Draft' },
  { date: 'Apr 14', platform: 'LinkedIn', type: 'Credential Post', topic: 'TACLA Spotlight — Josh Harris', status: 'Scheduled' },
  { date: 'Apr 17', platform: 'Email Campaign', type: 'Case Study', topic: 'Memorial Hermann MOB — Project Results', status: 'In Progress' },
  { date: 'Apr 21', platform: 'LinkedIn', type: 'Hiring Post', topic: 'HVAC Technician II — Now Hiring', status: 'Draft' },
  { date: 'Apr 28', platform: 'LinkedIn', type: 'Company News', topic: 'Gray Mechanical expands to San Antonio market', status: 'Planned' },
];

export const ECHO_INBOX = [
  { source: 'Email', client: 'Houston Methodist Research Inst.', subject: 'Chiller not cooling 4th floor — urgent', priority: 1, action: 'Routed to DISPATCH → SVC-2854 created', status: 'Routed' },
  { source: 'Portal', client: 'Hines Energy Tower', subject: 'PM visit — can we reschedule to Apr 22?', priority: 2, action: 'PULSE notified, reschedule drafted', status: 'Awaiting Client' },
  { source: 'Email', client: 'Tellepsen Builders', subject: 'Invoice GM-4468 — dispute on change order amount', priority: 2, action: 'ARIA flagged, CORA looped in', status: 'Under Review' },
  { source: 'Phone', client: 'Greenway Plaza Mgmt', subject: "Tech hasn't shown — called 45 min ago", priority: 1, action: 'DISPATCH pinged Ramirez ETA — reply sent', status: 'Resolved' },
  { source: 'Email', client: 'McCarthy Building Companies', subject: "Texas Children's punchlist items — 14 items", priority: 2, action: 'VECTOR notified, list imported to project', status: 'In Progress' },
  { source: 'Portal', client: 'Baylor College of Medicine', subject: 'Lab fume hood balance — certification needed', priority: 2, action: 'SHIELD notified, test & balance scheduled', status: 'Routed' },
  { source: 'Email', client: 'Turner Construction', subject: 'RFI-0028 response needed by COB Apr 8', priority: 1, action: 'VECTOR flagged, engineer notification sent', status: 'Escalated' },
  { source: 'Phone', client: 'CityCentre Management', subject: 'HVAC no cooling Suite 410 — tenant complaint', priority: 1, action: 'DISPATCH created SVC-2854', status: 'Routed' },
  { source: 'Email', client: 'Hensel Phelps', subject: 'Dell EMC mobilization meeting — Apr 9 9am', priority: 2, action: 'Calendar invite accepted, VECTOR notified', status: 'Responded' },
  { source: 'Email', client: 'Vaughn Construction', subject: 'Project close-out documents request', priority: 3, action: 'VECTOR notified, document checklist sent', status: 'In Progress' },
];

export const ESTIMATES = [
  { job: 'Houston Methodist Research B7', gc: 'McCarthy Building', phase: 'Final Bid', bidDate: 'Apr 18', value: 2140000, status: 'Under Review' },
  { job: 'Lone Star Medical Tower HVAC-C', gc: 'Self-Perform', phase: 'Conceptual', bidDate: 'Apr 25', value: 847200, status: 'In Progress' },
  { job: "St. Luke's Sugar Land Expansion", gc: 'Tellepsen Builders', phase: 'Final Bid', bidDate: 'Apr 12', value: 1247000, status: 'Pending Release' },
  { job: 'Dell EMC Data Center Phase 2', gc: 'Hensel Phelps', phase: 'Design-Build', bidDate: 'May 3', value: 3820000, status: 'Scoping' },
  { job: 'UT Health Science Center Reno', gc: 'Linbeck Group', phase: 'Schematic', bidDate: 'May 14', value: 560000, status: 'Started' },
  { job: 'Riverview Office Park', gc: 'Self-Perform', phase: 'Conceptual', bidDate: 'Apr 30', value: 214800, status: 'Complete' },
  { job: 'HCA Far West Medical Pavilion', gc: 'Turner Construction', phase: 'Bid-Build', bidDate: 'Apr 22', value: 1890000, status: 'Bidding' },
  { job: 'Pearland ISD Career Tech Center', gc: 'Cadence McShane', phase: 'Design-Build', bidDate: 'Awarded', value: 430000, status: 'Awarded' },
];

export const NOTIFICATIONS = [
  { id: 'N1', type: 'critical', title: 'Sub COI Expired', body: 'Premier Sheet Metal COI expired Apr 1 — 3 jobs affected', time: '1h ago', ade: 'SHIELD' },
  { id: 'N2', type: 'warning', title: 'Budget Overrun Alert', body: 'Baylor COM Lab — 8.4% labor overrun — requires PM review', time: '2h ago', ade: 'VECTOR' },
  { id: 'N3', type: 'action', title: 'Estimate Ready for Release', body: "St. Luke's Sugar Land $1.2M bid — awaiting your approval", time: '2h ago', ade: 'APEX' },
  { id: 'N4', type: 'warning', title: 'Invoice Overdue', body: 'GM-4455 — Hines Properties — 37 days overdue — $64,200', time: '3h ago', ade: 'ARIA' },
  { id: 'N5', type: 'info', title: 'New Prospect Identified', body: 'Skanska USA — Data Center project Austin — outreach staged', time: '4h ago', ade: 'SCOUT' },
];

export const USERS = [
  { name: 'Mike Gray', role: 'CEO / Owner', access: 'All ADEs', lastLogin: 'Today 7:48am', status: 'Active' },
  { name: 'Sarah Thornton', role: 'Controller', access: 'ARIA, LEDGER, VECTOR', lastLogin: 'Today 8:02am', status: 'Active' },
  { name: 'David Kim', role: 'Operations Manager', access: 'DISPATCH, FIELD, PULSE, PROCURE', lastLogin: 'Apr 5', status: 'Active' },
  { name: 'Neuralogic Admin', role: 'Platform Administrator', access: 'All ADEs', lastLogin: 'Today 6:00am', status: 'Active' },
];

export const INTEGRATIONS = {
  accounting: [
    { name: 'QuickBooks Online', status: 'connected', lastSync: 'Today 8:14am', records: '847 transactions synced', health: 'green' },
    { name: 'Sage 300 CRE', status: 'disconnected', lastSync: null, records: null, health: null },
    { name: 'Viewpoint Vista', status: 'disconnected', lastSync: null, records: null, health: null },
  ],
  projectManagement: [
    { name: 'Procore', status: 'connected', lastSync: 'Today 7:55am', records: '14 active projects synced', health: 'green' },
    { name: 'Autodesk Construction Cloud', status: 'disconnected', lastSync: null, records: null, health: null },
    { name: 'PlanGrid', status: 'disconnected', lastSync: null, records: null, health: null },
  ],
  crm: [
    { name: 'HubSpot CRM', status: 'connected', lastSync: 'Today 8:01am', records: '142 contacts synced', health: 'green' },
    { name: 'Salesforce', status: 'disconnected', lastSync: null, records: null, health: null },
  ],
  communication: [
    { name: 'Microsoft Outlook / Exchange', status: 'connected', lastSync: 'Live', records: 'ECHO reads inbox', health: 'green' },
    { name: 'Twilio (SMS)', status: 'connected', lastSync: 'Live', records: 'Service notifications enabled', health: 'green' },
    { name: 'RingCentral', status: 'disconnected', lastSync: null, records: null, health: null },
  ],
  estimating: [
    { name: 'Accubid Anywhere', status: 'connected', lastSync: 'Today 6:30am', records: 'APEX reads takeoff data', health: 'green' },
    { name: 'Trimble Estimation', status: 'disconnected', lastSync: null, records: null, health: null },
  ],
  fieldService: [
    { name: 'ServiceTitan', status: 'connected', lastSync: 'Live', records: 'DISPATCH bi-directional sync', health: 'green' },
    { name: 'FieldEdge', status: 'disconnected', lastSync: null, records: null, health: null },
  ],
  complianceHR: [
    { name: 'Checkr (Background Checks)', status: 'connected', lastSync: 'Today 7:12am', records: 'ONBOARD automated', health: 'green' },
    { name: 'Texas TDLR API', status: 'connected', lastSync: 'Today 5:00am', records: 'SHIELD monitors license status', health: 'green' },
    { name: 'ADP Workforce Now', status: 'disconnected', lastSync: null, records: null, health: null },
  ],
  documents: [
    { name: 'SharePoint / OneDrive', status: 'connected', lastSync: 'Today 8:00am', records: 'Document repository active', health: 'green' },
    { name: 'Procore Docs', status: 'linked', lastSync: 'Via Procore', records: 'Linked via Procore integration', health: 'green' },
  ],
};
