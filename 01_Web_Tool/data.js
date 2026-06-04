// ═══════════════════════════════════════════════════════════════════════════
// DATA.JS — AI Readiness Assessment Tool for SMEs
// Source: PRISMA 2020 SLR of 34 frameworks (Kalleparambil 2025, Schuster 2021,
//         Sarker 2025, Soudi & Bidan 2024, Crockett 2023, Weinberg 2025, etc.)
// ═══════════════════════════════════════════════════════════════════════════

const DIMENSIONS = [
  {
    id: 'governance',
    label: 'Governance & Accountability',
    icon: '⚖️',
    color: '#0D2B55',
    coverage: 82,
    description: 'Structures, policies, roles and responsibilities that ensure AI systems are overseen, auditable and aligned with organisational values and legal obligations.',
    citation: 'Kalleparambil et al. (2025); Nair (2025); NIST AI RMF (2023)',
    bestFrom: 'Nair (2025) Biopharma Maturity Index + Kalleparambil (2025) SME Readiness Model'
  },
  {
    id: 'ethics',
    label: 'Ethics & Responsible AI',
    icon: '🤝',
    color: '#007A87',
    coverage: 71,
    description: 'Fairness, transparency, accountability and human-centred principles embedded in AI design, deployment and monitoring practices.',
    citation: 'Soudi & Bidan (2024); Mbuy & Ortolano (2022); Joshi et al. (2024)',
    bestFrom: 'Soudi & Bidan (2024) Ethical Readiness + RAISE Guidelines (Paschal et al. 2024)'
  },
  {
    id: 'technology',
    label: 'Technology & Infrastructure',
    icon: '🖥️',
    color: '#2E8648',
    coverage: 65,
    description: 'Hardware, software, cloud platforms, integration capabilities and technical architecture required to deploy and sustain AI systems.',
    citation: 'Schuster et al. (2021); Weinberg & Abraham (2025); Ortolano et al. (n.d.)',
    bestFrom: 'Schuster et al. (2021) AI Maturity Model + FAIGMOE (Weinberg & Abraham 2025)'
  },
  {
    id: 'data',
    label: 'Data Management',
    icon: '🗄️',
    color: '#5B4DB8',
    coverage: 59,
    description: 'Data quality, governance, pipelines, privacy compliance and lifecycle management practices that underpin reliable AI model development.',
    citation: 'Sarker et al. (2025); Ramírez et al. (n.d.); Quainoo & MAR (n.d.)',
    bestFrom: 'SME-TEAM Trust Framework (Sarker 2025) + Diagnostic Responsible AI Maturity (Ramírez)'
  },
  {
    id: 'people',
    label: 'People & Skills',
    icon: '👥',
    color: '#C0392B',
    coverage: 59,
    description: 'AI literacy, workforce upskilling, change management and human-AI collaboration competencies across the organisation.',
    citation: 'Tomar (2025); Finch & Holmes (2023); Hussain et al. (2023)',
    bestFrom: 'Technology Readiness Index (Tomar 2025) + Human-in-the-Loop Framework (Joshi 2024)'
  },
  {
    id: 'strategy',
    label: 'Strategy & Business Alignment',
    icon: '🎯',
    color: '#E86A1F',
    coverage: 59,
    description: 'Integration of AI into business strategy, ROI frameworks, competitive positioning and alignment with organisational goals.',
    citation: 'Weinberg & Abraham (2025); Agentic AI SME (IJFMR 2025); Mansouri (2025)',
    bestFrom: 'FAIGMOE Strategic Adoption (Weinberg 2025) + SCOR Framework (Mansouri 2025)'
  },
  {
    id: 'process',
    label: 'Process & Operations',
    icon: '⚙️',
    color: '#0891B2',
    coverage: 47,
    description: 'AI integration into business workflows, process automation, operational efficiency and continuous improvement mechanisms.',
    citation: 'Prozessoptimierung (2025); Rössler et al. (2025); Han et al. (2023)',
    bestFrom: 'ML Process Optimisation SMEs (2025) + Explainable AI Risk Tool (Han 2023)'
  },
  {
    id: 'risk',
    label: 'Risk Management & Security',
    icon: '🛡️',
    color: '#7C3AED',
    coverage: 47,
    description: 'Identification, assessment and mitigation of AI-related risks including cybersecurity, bias, model drift and regulatory non-compliance.',
    citation: 'Kezron (2025); Kolo (2025); Rössler et al. (2025)',
    bestFrom: 'Cybersecurity Framework SMEs (Kezron 2025) + AI Regulates AI Risk Assessment (Rössler 2025)'
  }
];

// ─── ACADEMIC QUESTIONS (5 per dimension = 40 total) ─────────────────────────
// Scale: 1=Not started, 2=Initial, 3=Developing, 4=Defined, 5=Managed/Optimising
const ACADEMIC_QUESTIONS = {
  governance: [
    {
      id: 'gov1',
      text: 'Does your organisation have a formally documented AI governance policy that assigns clear roles, responsibilities and accountability mechanisms for AI deployment?',
      weight: 1.3,
      citation: 'Kalleparambil et al. (2025); Nair (2025)',
      guidance: 'Consider whether you have a written policy (not just verbal agreement) with named owners for AI oversight.'
    },
    {
      id: 'gov2',
      text: 'To what extent are AI governance structures aligned with recognised international standards (e.g., NIST AI RMF, ISO/IEC 42001, EU AI Act)?',
      weight: 1.2,
      citation: 'NIST AI RMF (2023); ISO/IEC 42001:2023',
      guidance: 'Alignment means actively mapping your practices to standard requirements, not merely awareness.'
    },
    {
      id: 'gov3',
      text: 'Are AI oversight committees or designated AI governance roles (e.g., AI Ethics Officer, AI Steering Committee) established within the organisation?',
      weight: 1.1,
      citation: 'Soudi & Bidan (2024); Mansouri (2025)',
      guidance: 'This can be a part-time role in SMEs; what matters is designated responsibility, not dedicated headcount.'
    },
    {
      id: 'gov4',
      text: 'Does the organisation conduct regular AI audits or reviews to assess compliance, performance and ethical alignment of deployed AI systems?',
      weight: 1.2,
      citation: 'Nair (2025); Rössler et al. (2025)',
      guidance: 'Audits should be scheduled (e.g., annual), documented and result in actionable findings.'
    },
    {
      id: 'gov5',
      text: 'Are AI governance policies communicated to all relevant stakeholders, including employees, partners and customers where applicable?',
      weight: 1.0,
      citation: 'Paschal et al. (2024); Crockett et al. (2023)',
      guidance: 'Communication includes training, accessible documentation and acknowledgement of understanding.'
    }
  ],
  ethics: [
    {
      id: 'eth1',
      text: 'Has the organisation defined and operationalised ethical principles (fairness, transparency, explainability, non-maleficence) that govern all AI projects?',
      weight: 1.3,
      citation: 'Soudi & Bidan (2024); Mbuy & Ortolano (2022)',
      guidance: 'Operationalised means these principles are reflected in actual design decisions, not just stated in a document.'
    },
    {
      id: 'eth2',
      text: 'Are algorithmic impact assessments (AIAs) or similar structured ethical reviews conducted before deploying AI systems that affect individuals or groups?',
      weight: 1.3,
      citation: 'Mbuy & Ortolano (2022); EU AI Act (2024)',
      guidance: 'AIAs evaluate potential harms, biases and unintended consequences before deployment.'
    },
    {
      id: 'eth3',
      text: 'To what degree are AI systems designed to be explainable and interpretable to both technical and non-technical stakeholders?',
      weight: 1.2,
      citation: 'Han et al. (2023); Joshi et al. (2024)',
      guidance: 'Explainability may range from simple output explanations to full model transparency.'
    },
    {
      id: 'eth4',
      text: 'Does the organisation have mechanisms to detect, report and remediate bias or discriminatory outcomes in AI systems?',
      weight: 1.2,
      citation: 'Sarker et al. (2025); Paschal et al. (2024)',
      guidance: 'This includes bias testing during development and monitoring in production.'
    },
    {
      id: 'eth5',
      text: 'Are human oversight and override mechanisms embedded in AI decision-making processes, particularly for high-stakes or sensitive decisions?',
      weight: 1.1,
      citation: 'Joshi et al. (2024); Ortolano et al. (n.d.)',
      guidance: 'Human-in-the-loop means a person can review, override or escalate AI decisions at defined trigger points.'
    }
  ],
  technology: [
    {
      id: 'tech1',
      text: 'Does the organisation possess or have reliable access to the computing infrastructure (cloud, on-premise, hybrid) required to deploy and maintain AI systems?',
      weight: 1.2,
      citation: 'Schuster et al. (2021); Weinberg & Abraham (2025)',
      guidance: 'For SMEs, cloud-based infrastructure (AWS, Azure, GCP) often satisfies this requirement cost-effectively.'
    },
    {
      id: 'tech2',
      text: 'To what extent are existing business systems (ERP, CRM, databases) integration-ready for AI tool deployment?',
      weight: 1.1,
      citation: 'Ortolano et al. (n.d.); Weinberg & Abraham (2025)',
      guidance: 'Integration readiness includes API availability, data format compatibility and vendor support.'
    },
    {
      id: 'tech3',
      text: 'Does the organisation evaluate and manage technical debt, legacy system constraints and vendor lock-in risks when selecting AI technologies?',
      weight: 1.1,
      citation: 'Schuster et al. (2021); Kezron (2025)',
      guidance: 'Technical debt assessment should be part of AI procurement and architecture decisions.'
    },
    {
      id: 'tech4',
      text: 'Are AI model performance monitoring, versioning and deployment pipelines (MLOps) established and maintained?',
      weight: 1.2,
      citation: 'Rössler et al. (2025); Nair (2025)',
      guidance: 'MLOps includes automated testing, model registry, deployment automation and drift detection.'
    },
    {
      id: 'tech5',
      text: 'Does the organisation have documented contingency plans for AI system failures, outages or unexpected model behaviour?',
      weight: 1.0,
      citation: 'Crockett et al. (2023); Kezron (2025)',
      guidance: 'Contingency plans should specify fallback procedures, escalation paths and recovery timelines.'
    }
  ],
  data: [
    {
      id: 'dat1',
      text: 'Does the organisation have a formal data governance framework that addresses data quality, ownership, lineage and lifecycle management for AI purposes?',
      weight: 1.3,
      citation: 'Sarker et al. (2025); Ramírez et al. (n.d.)',
      guidance: 'Data governance for AI requires explicit policies beyond general GDPR/data protection compliance.'
    },
    {
      id: 'dat2',
      text: 'To what extent are data quality standards (accuracy, completeness, consistency, timeliness) defined and enforced for AI training and inference datasets?',
      weight: 1.2,
      citation: 'Quainoo & MAR (n.d.); Soudi & Bidan (2024)',
      guidance: 'Quality standards should be measurable, with defined thresholds and validation processes.'
    },
    {
      id: 'dat3',
      text: 'Are data privacy and consent mechanisms (GDPR, CCPA or equivalent) systematically applied to all data used in AI systems?',
      weight: 1.2,
      citation: 'Kolo (2025); Paschal et al. (2024)',
      guidance: 'This includes lawful basis for processing, data minimisation and subject rights management.'
    },
    {
      id: 'dat4',
      text: 'Does the organisation have sufficient volume, diversity and representativeness of data to train and validate AI models without significant bias risk?',
      weight: 1.1,
      citation: 'Sarker et al. (2025); Mbuy & Ortolano (2022)',
      guidance: 'Data diversity assessment should consider demographic, geographic and temporal representation.'
    },
    {
      id: 'dat5',
      text: 'Are data sharing agreements, provenance documentation and third-party data sourcing risks formally managed?',
      weight: 1.0,
      citation: 'Quainoo & MAR (n.d.); Kezron (2025)',
      guidance: 'Third-party data introduces supply chain risks that require contractual and technical safeguards.'
    }
  ],
  people: [
    {
      id: 'peo1',
      text: 'Does the organisation have a structured AI literacy and upskilling programme accessible to employees at all levels?',
      weight: 1.2,
      citation: 'Tomar (2025); Finch & Holmes (2023)',
      guidance: 'Programmes range from awareness workshops to technical training; all levels need baseline AI literacy.'
    },
    {
      id: 'peo2',
      text: 'Are change management processes in place to address workforce concerns, resistance and cultural barriers to AI adoption?',
      weight: 1.1,
      citation: 'Hussain et al. (2023); Weinberg & Abraham (2025)',
      guidance: 'Change management includes communication plans, stakeholder engagement and feedback mechanisms.'
    },
    {
      id: 'peo3',
      text: 'Does the organisation have or have access to personnel with sufficient AI/ML technical expertise to evaluate, deploy and maintain AI systems?',
      weight: 1.2,
      citation: 'Kalleparambil et al. (2025); Schuster et al. (2021)',
      guidance: 'SMEs may access expertise through partnerships, consultants or cloud-managed AI services.'
    },
    {
      id: 'peo4',
      text: 'Are human-AI collaboration protocols defined, including clear delineation of tasks appropriate for AI automation versus human judgment?',
      weight: 1.1,
      citation: 'Ortolano et al. (n.d.); Joshi et al. (2024)',
      guidance: 'Protocols should specify which decisions require human review and what information AI should provide.'
    },
    {
      id: 'peo5',
      text: 'Does leadership demonstrate visible commitment to responsible AI adoption through resource allocation, policy championing and cultural modelling?',
      weight: 1.1,
      citation: 'Soudi & Bidan (2024); Mansouri (2025)',
      guidance: 'Leadership commitment is evidenced by budget allocation, executive messaging and governance participation.'
    }
  ],
  strategy: [
    {
      id: 'str1',
      text: 'Is there a documented AI strategy that aligns AI investment and deployment with the organisation\'s core business objectives and competitive positioning?',
      weight: 1.3,
      citation: 'Weinberg & Abraham (2025); Mansouri (2025)',
      guidance: 'Strategy documents should include use-case prioritisation, resource plans and success metrics.'
    },
    {
      id: 'str2',
      text: 'Does the organisation use structured frameworks (ROI analysis, business case templates) to evaluate and prioritise AI investment decisions?',
      weight: 1.1,
      citation: 'FAIGMOE (Weinberg 2025); Kalleparambil et al. (2025)',
      guidance: 'ROI frameworks for AI should account for both quantitative returns and qualitative strategic value.'
    },
    {
      id: 'str3',
      text: 'To what extent is AI adoption integrated into long-term business planning (3–5 year horizon) rather than treated as ad hoc technology projects?',
      weight: 1.2,
      citation: 'Agentic AI SME (IJFMR 2025); Mansouri (2025)',
      guidance: 'Strategic integration means AI appears in board-level plans, budgets and performance scorecards.'
    },
    {
      id: 'str4',
      text: 'Does the organisation actively monitor the competitive AI landscape and benchmark its AI capabilities against sector peers?',
      weight: 1.0,
      citation: 'Nair (2025); Digital Resilience Framework (2025)',
      guidance: 'Benchmarking can be informal (industry reports, peer networks) or formal (maturity assessments).'
    },
    {
      id: 'str5',
      text: 'Are AI initiatives evaluated against defined KPIs and success metrics that are reviewed and updated regularly?',
      weight: 1.1,
      citation: 'Weinberg & Abraham (2025); Rössler et al. (2025)',
      guidance: 'KPIs should be measurable, time-bound and linked to business outcomes, not just technical metrics.'
    }
  ],
  process: [
    {
      id: 'pro1',
      text: 'Has the organisation mapped its core business processes to identify high-value opportunities for AI-driven automation or augmentation?',
      weight: 1.2,
      citation: 'Prozessoptimierung (2025); Han et al. (2023)',
      guidance: 'Process mapping should assess automation potential, ROI and implementation complexity for each process.'
    },
    {
      id: 'pro2',
      text: 'Are AI deployment projects managed through structured project management methodologies (Agile, CRISP-DM or equivalent)?',
      weight: 1.1,
      citation: 'Schuster et al. (2021); Weinberg & Abraham (2025)',
      guidance: 'Structured methodologies reduce project failure risk and improve delivery predictability.'
    },
    {
      id: 'pro3',
      text: 'Does the organisation have documented AI incident response procedures for detecting, escalating and resolving AI system failures or harmful outputs?',
      weight: 1.2,
      citation: 'Rössler et al. (2025); Kezron (2025)',
      guidance: 'Incident response should cover detection triggers, escalation paths, communication templates and post-incident review.'
    },
    {
      id: 'pro4',
      text: 'Are continuous improvement mechanisms (feedback loops, model retraining schedules, performance reviews) embedded in AI operational processes?',
      weight: 1.1,
      citation: 'Nair (2025); Prozessoptimierung (2025)',
      guidance: 'Continuous improvement requires scheduled reviews, not just reactive fixes when problems arise.'
    },
    {
      id: 'pro5',
      text: 'To what extent are AI processes documented, standardised and repeatable across different projects and teams within the organisation?',
      weight: 1.0,
      citation: 'Kalleparambil et al. (2025); Schuster et al. (2021)',
      guidance: 'Standardisation enables knowledge transfer, onboarding efficiency and consistent quality outcomes.'
    }
  ],
  risk: [
    {
      id: 'ris1',
      text: 'Does the organisation conduct structured AI risk assessments (covering technical, ethical, legal and operational risks) before and during AI deployment?',
      weight: 1.3,
      citation: 'Rössler et al. (2025); EU AI Act (2024)',
      guidance: 'Risk assessments should be documented, risk-rated and linked to mitigation actions with owners.'
    },
    {
      id: 'ris2',
      text: 'Are cybersecurity controls specifically adapted to address AI-related threats (adversarial attacks, model poisoning, data exfiltration)?',
      weight: 1.2,
      citation: 'Kezron (2025); Quainoo & MAR (n.d.)',
      guidance: 'AI-specific threats require controls beyond standard IT security, including model security and supply chain integrity.'
    },
    {
      id: 'ris3',
      text: 'Is there a formal process for regulatory compliance monitoring related to AI (e.g., EU AI Act classification, GDPR AI provisions, sector-specific regulations)?',
      weight: 1.2,
      citation: 'Kolo (2025); Mansouri (2025)',
      guidance: 'Compliance monitoring should track regulatory developments and trigger policy updates when requirements change.'
    },
    {
      id: 'ris4',
      text: 'Does the organisation monitor deployed AI systems for model drift, performance degradation and unexpected behavioural changes over time?',
      weight: 1.1,
      citation: 'Nair (2025); Rössler et al. (2025)',
      guidance: 'Drift monitoring requires defined performance thresholds and automated or scheduled monitoring processes.'
    },
    {
      id: 'ris5',
      text: 'Are third-party AI vendor and supply chain risks assessed, contractually managed and regularly reviewed?',
      weight: 1.0,
      citation: 'Kezron (2025); Crockett et al. (2023)',
      guidance: 'Vendor risk includes dependency risk, data handling practices, SLA enforcement and exit strategy planning.'
    }
  ]
};

// ─── PRACTITIONER QUESTIONS (3 per dimension = 24 total) ─────────────────────
// Scale: Yes (2), Partial (1), No (0)
const PRACTITIONER_QUESTIONS = {
  governance: [
    { id: 'pg1', text: 'Do you have a written policy or set of rules for how AI is used in your business?', hint: 'Even a one-page document counts.' },
    { id: 'pg2', text: 'Is there a specific person or team responsible for overseeing AI decisions and making sure they are fair and legal?', hint: 'This could be the owner, a manager, or a designated team.' },
    { id: 'pg3', text: 'Do you regularly review how your AI tools are performing and whether they are causing any problems?', hint: 'Even a quarterly check-in counts.' }
  ],
  ethics: [
    { id: 'pe1', text: 'Before using an AI tool that affects customers or employees, do you check whether it could treat people unfairly or cause harm?', hint: 'A simple checklist or conversation with your team counts.' },
    { id: 'pe2', text: 'Can you explain to customers or staff how an AI decision was made when they ask?', hint: "If you use AI to reject applications, can you tell them why?" },
    { id: 'pe3', text: 'Do your staff know they can question or override an AI recommendation if something seems wrong?', hint: 'Human override should always be possible for important decisions.' }
  ],
  technology: [
    { id: 'pt1', text: 'Does your business have reliable internet, computers or cloud services that can support the AI tools you want to use?', hint: 'Check with your IT provider if unsure.' },
    { id: 'pt2', text: 'Can your current business software (accounting, CRM, HR systems) connect to or work alongside AI tools?', hint: 'Many modern tools offer API connections or pre-built integrations.' },
    { id: 'pt3', text: 'Do you have a plan for what to do if an AI tool stops working or gives wrong results?', hint: 'A backup process or manual fallback counts.' }
  ],
  data: [
    { id: 'pd1', text: 'Is the data your business collects accurate, up-to-date and organised in a way that AI tools could use?', hint: 'Think about your customer records, sales data, or operational data.' },
    { id: 'pd2', text: 'Do you follow data protection rules (e.g., GDPR) when collecting and using customer or employee data for AI?', hint: 'This includes having privacy notices and consent where needed.' },
    { id: 'pd3', text: 'Do you know where your business data is stored, who has access to it, and how it is kept secure?', hint: 'Cloud storage, local servers, or third-party platforms all count.' }
  ],
  people: [
    { id: 'pp1', text: 'Have your staff received any training or guidance on how to use AI tools safely and effectively?', hint: 'Even a brief briefing or online course counts.' },
    { id: 'pp2', text: 'Do your employees feel comfortable raising concerns about AI tools, and do you have a way to address those concerns?', hint: 'An open-door policy or suggestion box counts.' },
    { id: 'pp3', text: 'Do you or your leadership team actively support AI adoption by providing time, budget or encouragement?', hint: 'Leadership buy-in is one of the strongest predictors of successful AI adoption.' }
  ],
  strategy: [
    { id: 'ps1', text: 'Have you identified specific business problems or opportunities where AI could genuinely help your business?', hint: 'E.g., automating invoicing, improving customer service, forecasting stock.' },
    { id: 'ps2', text: 'Do you have a rough plan or roadmap for how and when you will adopt AI tools over the next 1–2 years?', hint: 'A simple list of priorities and timelines counts.' },
    { id: 'ps3', text: 'Do you track whether your AI tools are actually delivering the business benefits you expected?', hint: 'E.g., time saved, costs reduced, customer satisfaction improved.' }
  ],
  process: [
    { id: 'pr1', text: 'Have you mapped out which of your business processes are most suitable for AI automation or assistance?', hint: 'Start with repetitive, rule-based tasks that take up staff time.' },
    { id: 'pr2', text: 'Do you have a clear process for testing an AI tool before rolling it out fully across your business?', hint: 'A pilot or trial period with a small team counts.' },
    { id: 'pr3', text: 'Do you have a way to collect feedback from staff and customers about how AI tools are working in practice?', hint: 'A simple feedback form or regular team meeting counts.' }
  ],
  risk: [
    { id: 'rr1', text: 'Before adopting an AI tool, do you consider what could go wrong and how you would handle it?', hint: 'A simple "what if" conversation with your team counts.' },
    { id: 'rr2', text: 'Do you check that AI vendors and suppliers handle your business data securely and responsibly?', hint: 'Check their privacy policy, certifications, or ask them directly.' },
    { id: 'rr3', text: 'Are you aware of any legal or regulatory requirements that apply to AI use in your industry?', hint: 'E.g., financial services, healthcare, and HR all have specific rules.' }
  ]
};

// ─── MATURITY LEVELS ──────────────────────────────────────────────────────────
const MATURITY_LEVELS = [
  { level: 0, label: 'Unaware', range: [0, 20], color: '#C0392B', bg: '#fee2e2', desc: 'AI readiness has not been considered. No policies, infrastructure or awareness in place.' },
  { level: 1, label: 'Initial', range: [20, 40], color: '#E86A1F', bg: '#ffedd5', desc: 'Ad hoc awareness of AI. Some informal discussions but no systematic approach or policies.' },
  { level: 2, label: 'Developing', range: [40, 60], color: '#D97706', bg: '#fef9c3', desc: 'Some structured activity underway. Policies being developed, pilots in progress, skills building.' },
  { level: 3, label: 'Defined', range: [60, 75], color: '#2E8648', bg: '#dcfce7', desc: 'Consistent, documented practices across most dimensions. Governance structures established.' },
  { level: 4, label: 'Managed', range: [75, 88], color: '#0D2B55', bg: '#dbeafe', desc: 'Measured, optimised AI practices. KPIs tracked, continuous improvement embedded.' },
  { level: 5, label: 'Optimising', range: [88, 101], color: '#007A87', bg: '#d1fae5', desc: 'Industry-leading AI readiness. Innovation-driven, fully governed, continuously improving.' }
];

// ─── FRAMEWORKS EVIDENCE BASE ─────────────────────────────────────────────────
const FRAMEWORKS = [
  { name: 'AI Organisational Readiness for SMEs', authors: 'Kalleparambil et al.', year: 2025, type: 'Readiness/Maturity', dimensions: ['governance','people','strategy','process'], doi: '10.1142/s0219649225500765' },
  { name: 'Maturity Models for AI in SMEs', authors: 'Schuster et al.', year: 2021, type: 'Readiness/Maturity', dimensions: ['technology','process','strategy'], doi: '10.1007/978-3-030-85893-3_2' },
  { name: 'SME-TEAM: Trust & Ethics for Secure AI', authors: 'Sarker et al.', year: 2025, type: 'Responsible/Ethical AI', dimensions: ['ethics','data','risk'], doi: '10.48550/arxiv.2509.10594' },
  { name: 'AI Guidelines & Ethical Readiness in SMEs', authors: 'Soudi & Bidan', year: 2024, type: 'Responsible/Ethical AI', dimensions: ['ethics','governance','people'], doi: '10.1007/s44206-024-00087-1' },
  { name: 'Building Trustworthy AI for Small Businesses', authors: 'Crockett et al.', year: 2023, type: 'Governance', dimensions: ['governance','ethics','risk'], doi: '10.1109/TAI.2021.3137091' },
  { name: 'FAIGMOE: Generative AI Adoption Framework', authors: 'Weinberg & Abraham', year: 2025, type: 'Adoption', dimensions: ['strategy','technology','process'], doi: '10.48550/arxiv.2510.19997' },
  { name: 'AI Governance Maturity Index (Biopharma)', authors: 'Nair', year: 2025, type: 'Governance', dimensions: ['governance','risk','strategy'], doi: '10.70924/uv4px7jt/fmaj7khs' },
  { name: 'RAISE: Responsible GenAI for SMEs', authors: 'Paschal et al.', year: 2024, type: 'Responsible/Ethical AI', dimensions: ['ethics','governance','people'], doi: '10.17639/r59s-3w96' },
  { name: 'SCOR: Responsible AI in Digital Ecosystems', authors: 'Mansouri', year: 2025, type: 'Governance', dimensions: ['strategy','governance','ethics'], doi: '10.48550/arxiv.2509.10653' },
  { name: 'Algorithmic Impact Assessment for SMEs', authors: 'Mbuy & Ortolano', year: 2022, type: 'Responsible/Ethical AI', dimensions: ['ethics','risk','governance'], doi: '10.14236/ewic/hci2022.34' },
  { name: 'Human-in-the-Loop AI Framework for SMEs', authors: 'Joshi et al.', year: 2024, type: 'Responsible/Ethical AI', dimensions: ['ethics','people','process'], doi: '10.54660/ijmor.2024.3.6.66-73' },
  { name: 'Cybersecurity Framework for AI-Driven SMEs', authors: 'Kezron', year: 2025, type: 'Governance', dimensions: ['risk','technology','data'], doi: '10.5281/zenodo.15719942' },
  { name: 'Technology Readiness for Sustainable SMEs', authors: 'Tomar', year: 2025, type: 'Readiness/Maturity', dimensions: ['people','strategy','technology'], doi: '10.1108/jeet-06-2025-0036' },
  { name: 'AI Regulates AI: Automated Risk Assessment', authors: 'Rössler et al.', year: 2025, type: 'Governance', dimensions: ['risk','process','governance'], doi: '10.18420/inf2025_117' },
  { name: 'Explainable AI Tool for Operational Risk', authors: 'Han et al.', year: 2023, type: 'Governance', dimensions: ['risk','ethics','process'], doi: '10.1109/skima59232.2023.10387301' },
  { name: 'SAFE-AI Framework for Medical AI Ethics', authors: 'Nemteanu et al.', year: 2025, type: 'Responsible/Ethical AI', dimensions: ['ethics','governance','risk'], doi: '10.48550/arxiv.2507.01304' },
  { name: 'Diagnostic Methodology for Responsible AI Maturity', authors: 'Ramírez et al.', year: 2024, type: 'Readiness/Maturity', dimensions: ['data','ethics','process'], doi: null },
  { name: 'AI Digital Resilience in Emerging Markets', authors: 'IJFMR', year: 2025, type: 'Adoption', dimensions: ['strategy','technology','people'], doi: '10.5281/zenodo.17573628' },
  { name: 'Advancing Human-AI Collaboration in SMEs', authors: 'Ortolano et al.', year: 2024, type: 'Hybrid', dimensions: ['people','process','technology'], doi: null },
  { name: 'Information Security in Responsible AI', authors: 'Quainoo & MAR', year: 2024, type: 'Governance', dimensions: ['risk','data','governance'], doi: null }
];

// ─── KEY REFERENCES ───────────────────────────────────────────────────────────
const REFERENCES = [
  { num: 1, apa: 'Kalleparambil, A., et al. (2025). AI Organisational Readiness for SMEs: A Tailored Model for AI Adoption Success. <em>Journal of Information & Knowledge Management</em>. https://doi.org/10.1142/s0219649225500765' },
  { num: 2, apa: 'Schuster, T., Weinberg, L., & Volkmann, R. (2021). Maturity Models for the Assessment of Artificial Intelligence in Small and Medium-Sized Enterprises. <em>Proceedings of CPSL</em> (pp. 11–20). https://doi.org/10.1007/978-3-030-85893-3_2' },
  { num: 3, apa: 'Sarker, I. H., et al. (2025). SME-TEAM: Leveraging Trust and Ethics for Secure and Responsible Use of AI and LLMs in SMEs. <em>arXiv</em>. https://doi.org/10.48550/arxiv.2509.10594' },
  { num: 4, apa: 'Soudi, M., & Bidan, M. (2024). AI Guidelines and Ethical Readiness Inside SMEs: A Review and Recommendations. <em>Digital Society, 3</em>, Article 87. https://doi.org/10.1007/s44206-024-00087-1' },
  { num: 5, apa: 'Crockett, K., et al. (2023). Building Trustworthy AI Solutions: A Case for Practical Solutions for Small Businesses. <em>IEEE Transactions on Artificial Intelligence, 4</em>. https://doi.org/10.1109/TAI.2021.3137091' },
  { num: 6, apa: 'Weinberg, I., & Abraham, I. (2025). A Framework for the Adoption and Integration of Generative AI in Midsize Organizations and Enterprises (FAIGMOE). <em>arXiv</em>. https://doi.org/10.48550/arxiv.2510.19997' },
  { num: 7, apa: 'Nair, N. S. K. (2025). AI Governance as Competitive Capability: Constructing and Empirically Validating a Maturity Index for Biopharma Firms. <em>Zenodo</em>. https://doi.org/10.70924/uv4px7jt/fmaj7khs' },
  { num: 8, apa: 'Paschal, O., et al. (2024). Responsible Generative AI for SMEs in the UK and Africa: RAISE guidelines. <em>Zenodo</em>. https://doi.org/10.17639/r59s-3w96' },
  { num: 9, apa: 'Mansouri, T. (2025). SCOR: A Framework for Responsible AI Innovation in Digital Ecosystems. <em>arXiv</em>. https://doi.org/10.48550/arxiv.2509.10653' },
  { num: 10, apa: 'Mbuy, S. P., & Ortolano, M. (2022). Algorithmic Impact Assessment for an Ethical Use of AI in SMEs. <em>Proceedings of HCI 2022</em>. https://doi.org/10.14236/ewic/hci2022.34' },
  { num: 11, apa: 'Joshi, et al. (2024). Empowering Responsible AI Adoption: A Human-in-the-Loop Framework for SMEs. <em>IJMOR</em>. https://doi.org/10.54660/ijmor.2024.3.6.66-73' },
  { num: 12, apa: 'Kezron, A. (2025). Cybersecurity framework for securing cloud and AI-driven services in SMEs. <em>Zenodo</em>. https://doi.org/10.5281/zenodo.15719942' },
  { num: 13, apa: 'Rössler, A., Kosch, H., & Ries, F. (2025). AI Regulates AI: An Artifact for Automated Risk Assessment. <em>Informatik 2025</em>. https://doi.org/10.18420/inf2025_117' },
  { num: 14, apa: 'Tomar, J. S. (2025). Technology readiness for socially sustainable SMEs: AI and ethics in the Indian context. <em>Journal of Ethics in Entrepreneurship and Technology</em>. https://doi.org/10.1108/jeet-06-2025-0036' },
  { num: 15, apa: 'NIST. (2023). <em>Artificial Intelligence Risk Management Framework (AI RMF 1.0)</em>. National Institute of Standards and Technology. https://doi.org/10.6028/NIST.AI.100-1' }
];

// ─── RECOMMENDATIONS DATABASE ─────────────────────────────────────────────────
const RECOMMENDATIONS = {
  governance: {
    low: ['Draft a one-page AI use policy defining acceptable use cases and prohibited applications', 'Assign a named AI responsible person (can be the owner/manager)', 'Schedule a quarterly AI review meeting'],
    mid: ['Develop a formal AI governance policy aligned with NIST AI RMF core functions', 'Establish an AI steering group with cross-functional representation', 'Implement annual AI compliance audits with documented findings'],
    high: ['Pursue ISO/IEC 42001 certification for AI management systems', 'Establish continuous governance monitoring with automated compliance dashboards', 'Contribute to industry AI governance standards development']
  },
  ethics: {
    low: ['Create a simple AI ethics checklist for new AI tool adoption decisions', 'Train all staff on basic AI fairness and bias concepts (online course)', 'Establish a process for staff to raise AI ethics concerns'],
    mid: ['Conduct algorithmic impact assessments for customer-facing AI systems', 'Implement explainability requirements in AI procurement contracts', 'Establish bias testing protocols for AI models in use'],
    high: ['Embed ethics-by-design principles in all AI development processes', 'Publish an AI ethics statement and annual transparency report', 'Participate in industry ethics standards bodies']
  },
  technology: {
    low: ['Audit current IT infrastructure for AI readiness (compute, storage, connectivity)', 'Identify 2–3 cloud AI services suitable for your business needs (e.g., AWS, Azure, Google Cloud)', 'Create a basic IT contingency plan for AI tool failures'],
    mid: ['Develop an AI technology roadmap aligned with business strategy', 'Implement API-based integration architecture for AI tool connectivity', 'Establish MLOps practices for model monitoring and versioning'],
    high: ['Invest in advanced AI infrastructure (edge computing, dedicated ML platforms)', 'Implement automated AI pipeline management and deployment systems', 'Develop proprietary AI capabilities for competitive differentiation']
  },
  data: {
    low: ['Conduct a data audit: catalogue what data you have, where it is stored, and its quality', 'Implement basic data quality checks and cleaning procedures', 'Review GDPR compliance for all customer and employee data'],
    mid: ['Develop a formal data governance policy with defined data stewards', 'Implement data quality standards and automated validation processes', 'Establish data lineage tracking for AI training datasets'],
    high: ['Build a centralised data platform with unified data governance', 'Implement advanced data quality monitoring with automated remediation', 'Develop synthetic data capabilities to address data scarcity']
  },
  people: {
    low: ['Complete a free AI literacy course with your team (e.g., Google AI Essentials, Microsoft AI Fundamentals)', 'Hold a team session to discuss AI opportunities and concerns openly', 'Identify one internal AI champion to lead adoption efforts'],
    mid: ['Develop a structured AI training programme with role-specific learning paths', 'Implement change management processes for AI adoption initiatives', 'Recruit or partner with AI/ML expertise (consultant, university partnership)'],
    high: ['Establish an internal AI Centre of Excellence or innovation team', 'Develop advanced AI competency frameworks and career pathways', 'Contribute to AI talent development through apprenticeships or academic partnerships']
  },
  strategy: {
    low: ['Identify your top 3 business problems that AI could potentially solve', 'Research AI tools used by competitors or sector peers', 'Set a simple 12-month AI adoption goal with measurable outcomes'],
    mid: ['Develop a 3-year AI strategy document aligned with business objectives', 'Implement ROI tracking for all AI investments', 'Benchmark AI capabilities against sector peers using available maturity tools'],
    high: ['Position AI as a core strategic capability and competitive differentiator', 'Develop AI-first business models and revenue streams', 'Establish strategic AI partnerships with technology vendors and research institutions']
  },
  process: {
    low: ['Map your top 5 most time-consuming processes and assess AI automation potential', 'Run a small AI pilot on one low-risk, high-volume process', 'Create a simple feedback mechanism for staff to report AI performance issues'],
    mid: ['Implement structured AI project management using Agile or CRISP-DM methodology', 'Develop documented AI incident response procedures', 'Establish continuous improvement cycles for AI-enhanced processes'],
    high: ['Implement full process automation with AI-driven orchestration', 'Develop intelligent process mining capabilities for continuous optimisation', 'Establish AI-driven operational excellence programmes']
  },
  risk: {
    low: ['Create a simple AI risk register listing key risks and basic mitigations', 'Review AI vendor contracts for data security and liability clauses', 'Check whether EU AI Act or sector-specific AI regulations apply to your business'],
    mid: ['Implement structured AI risk assessment processes for all new AI deployments', 'Develop AI-specific cybersecurity controls (model security, adversarial attack prevention)', 'Establish regulatory compliance monitoring for AI-relevant legislation'],
    high: ['Implement automated AI risk monitoring and alerting systems', 'Develop advanced threat intelligence capabilities for AI-specific risks', 'Achieve and maintain regulatory certifications (ISO 27001, SOC 2, EU AI Act compliance)']
  }
};
