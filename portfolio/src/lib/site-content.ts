/**
 * Central content source for the public site.
 * Shape mirrors the Prisma models (see prisma/schema.prisma) so this file
 * can be swapped for DB reads via the admin CMS without changing components.
 * No values here are invented beyond what the source material confirms;
 * anything unconfirmed is left as an explicit placeholder for the admin panel.
 */

export const profile = {
  name: 'Harish Ganesan',
  title: 'Director',
  company: 'Niklaus Solutions',
  companyUrl: 'https://theniklaus.com',
  location: 'Erode, India',
  focus: 'Cybersecurity',
  status: 'ACTIVE' as const,
  availability: 'AVAILABLE' as const,
  experienceYears: '10+',
  email: 'niklaussolution@gmail.com',
  heroEyebrow: '// CYBERSECURITY PROFESSIONAL',
  heroStatement:
    'I investigate threats, expose malicious digital activity, strengthen systems and help people respond when cyber incidents happen.',
  bio: [
    'Harish Ganesan is a cybersecurity professional and Director at Niklaus Solutions, focused on ethical hacking, security operations, threat investigation, web application security and cyber awareness.',
    'His work combines offensive security understanding with defensive thinking, technical investigation and practical support for individuals and organizations affected by cybersecurity incidents.',
  ],
  socials: {
    linkedin: 'https://www.linkedin.com/in/harish-ganesan-4228242a1',
    github: '#',
    instagram: 'https://www.instagram.com/niklaussolution_official',
  },
};

export const identityStrip = [
  'ETHICAL HACKING',
  'SECURITY OPERATIONS',
  'THREAT ANALYSIS',
  'WEB APPLICATION SECURITY',
  'CYBER INVESTIGATION',
  'SOC',
  'DIGITAL DEFENSE',
  'SECURITY RESEARCH',
];

export const aboutCards = [
  { label: 'DIRECTOR', value: 'Niklaus Solutions' },
  { label: 'FIELD', value: 'Cybersecurity' },
  { label: 'EXPERIENCE', value: '10+ Years' },
  { label: 'LOCATION', value: 'Erode, India' },
  { label: 'SPECIALIZATION', value: 'Security Operations & Ethical Hacking' },
];

// Draft placeholders — mark for admin review before publishing final numbers.
export const stats = [
  { value: '10+', label: 'Years Experience', draft: false },
  { value: '—', label: 'Security Investigations', draft: true },
  { value: '1000+', label: 'Students Trained', draft: false },
  { value: '30+', label: 'Projects Delivered', draft: false },
];

export const expertise = [
  {
    index: '01',
    title: 'Ethical Hacking',
    description: 'Authorized offensive testing to identify exploitable weaknesses before adversaries do.',
    tags: ['Penetration Testing', 'Exploitation', 'Reporting'],
  },
  {
    index: '02',
    title: 'Web Application Security',
    description: 'Assessing web platforms against OWASP-class risks across the application lifecycle.',
    tags: ['OWASP', 'Burp Suite', 'Secure Code Review'],
  },
  {
    index: '03',
    title: 'SOC Operations',
    description: 'Monitoring, triage and response workflows that keep detection and defense continuous.',
    tags: ['Monitoring', 'Triage', 'Escalation'],
  },
  {
    index: '04',
    title: 'Threat Intelligence',
    description: 'Turning indicators and behavior patterns into decisions that reduce organizational risk.',
    tags: ['IOCs', 'Attribution Context', 'Risk Signals'],
  },
  {
    index: '05',
    title: 'Incident Investigation',
    description: 'Structured technical analysis of suspicious activity, from first indicator to findings.',
    tags: ['Static Analysis', 'Evidence Handling', 'Documentation'],
  },
  {
    index: '06',
    title: 'Network Security',
    description: 'Hardening network boundaries, protocols and traffic visibility against intrusion.',
    tags: ['Protocols', 'VPN', 'Segmentation'],
  },
  {
    index: '07',
    title: 'Vulnerability Assessment',
    description: 'Systematic identification and prioritization of exposure across systems and assets.',
    tags: ['Scanning', 'CVSS', 'Remediation Planning'],
  },
  {
    index: '08',
    title: 'Linux Security',
    description: 'Securing and operating Linux environments used across offensive and defensive tooling.',
    tags: ['Kali Linux', 'Hardening', 'Shell'],
  },
  {
    index: '09',
    title: 'Risk Assessment',
    description: 'Evaluating cybersecurity risk against governance frameworks and business impact.',
    tags: ['ISO 27001', 'Governance', 'Risk Scoring'],
  },
  {
    index: '10',
    title: 'Full Stack Development',
    description: 'Building the applications and tooling that security work depends on.',
    tags: ['Python', 'JavaScript', 'Web Development'],
  },
  {
    index: '11',
    title: 'Security Awareness',
    description: 'Training programs that turn technical risk into practical, everyday behavior change.',
    tags: ['Training', 'Simulation', 'Culture'],
  },
  {
    index: '12',
    title: 'Cybersecurity Risk Assessment',
    description: 'End-to-end evaluation of organizational exposure to guide prioritized defense.',
    tags: ['Assessment', 'Reporting', 'Strategy'],
  },
];

export const arsenal = [
  {
    category: 'OFFENSIVE SECURITY',
    tools: ['Metasploit', 'Burp Suite', 'Nmap', 'Kali Linux'],
  },
  {
    category: 'MONITORING / DEFENSE',
    tools: ['Splunk', 'IDS', 'Firewall', 'SIEM Concepts'],
  },
  {
    category: 'NETWORK',
    tools: ['Network Protocols', 'VPN Management', 'Network Troubleshooting'],
  },
  {
    category: 'GOVERNANCE',
    tools: ['ISO 27001', 'Risk Assessment'],
  },
  {
    category: 'DEVELOPMENT',
    tools: ['Python', 'JavaScript', 'Web Development'],
  },
];

export const award = {
  title: 'ISTE Best Student Award',
  issuer: 'Indian Society for Technical Education (ISTE)',
  description:
    'Recognition for academic performance, leadership qualities and technical contributions.',
};

export const additionalAchievements = [
  { title: 'First Place — Project Expo (Artificial Intelligence)', issuer: 'ISTE' },
  { title: 'First Prize — Hacking Competition', issuer: '' },
  { title: 'First Place — Technical Pick and Speak', issuer: '' },
];

export const timeline = [
  {
    role: 'Director',
    org: 'Niklaus Solutions',
    period: 'Present',
    description:
      'Leading cybersecurity, technology training, security research and technical education initiatives at Niklaus Solutions.',
  },
];

export const education = [
  {
    degree: 'Diploma in Electronics and Communication Engineering',
    institution: 'Excel Polytechnic College',
    status: '85.1%',
  },
];

export const projects = [
  {
    slug: 'phish-aware',
    title: 'Phish Aware',
    category: 'Security Awareness / Social Engineering Simulation',
    description:
      'A cybersecurity tool designed for penetration-testing simulations and security-awareness training around phishing risk.',
    technologies: ['Python'],
    status: 'ACTIVE',
    featured: true,
  },
];

export const certifications = [
  {
    name: 'OSCP',
    issuer: 'OffSec',
    status: 'VERIFIED' as const,
  },
];

export const caseStudies = [
  {
    slug: 'suspicious-echallan-apk-investigation',
    caseId: 'HG-THREAT-001',
    title: 'Suspicious e-Challan / Malicious APK Investigation',
    category: 'Android Malware / Social Engineering',
    date: '2025',
    severity: 'HIGH' as const,
    status: 'ANALYZED' as const,
    summary:
      'Technical analysis of an Android application impersonating an official RTO / e-Challan (traffic violation) service, distributed as a sideloaded APK. Static analysis identified an obfuscated payload, dropper-like installation behavior and hidden remote command infrastructure.',
    context:
      'The application was reported as a suspicious APK circulating outside official app stores, presented to targets as an e-Challan / traffic-fine notice — a common social-engineering lure used to pressure quick installation.',
    technicalAnalysis: [
      'Package identity did not match any verified government or RTO publisher.',
      'The APK was protected with heavy code obfuscation and native protection libraries, consistent with anti-reverse-engineering intent.',
      'A high-entropy, encrypted payload segment was present, indicating content designed to resist static inspection.',
      'Installation behavior matched dropper patterns: the initial APK requested permissions and prepared to install a secondary APK rather than functioning as a standalone application.',
      'Monitoring/targeting indicators referencing financial applications were observed, suggesting interest in banking or payment-app activity on the device.',
      'A WebView component handled remote interaction, with JavaScript-based command handlers bridging web content to native device functions — a pattern used to issue remote instructions to the app.',
      'Traffic and configuration artifacts pointed to hidden server infrastructure used to coordinate the app rather than any legitimate government backend.',
    ],
    indicators: [
      'Unverified publisher / package identity',
      'Heavy obfuscation + native protection libraries',
      'High-entropy encrypted payload segment',
      'Secondary APK drop behavior',
      'Financial-app monitoring indicators',
      'WebView + JavaScript remote command bridge',
      'Undisclosed remote server infrastructure',
    ],
    process: [
      'Suspicious APK intake',
      'Static analysis',
      'Package inspection',
      'Obfuscation detected',
      'Payload investigation',
      'Network / WebView analysis',
      'Threat indicators documented',
    ],
    impact:
      'Distribution through this pattern puts device owners at risk of financial-app compromise and remote control by an unauthorized third party. No victim-identifying details are published as part of this write-up.',
    recommendations: [
      'Never install APKs shared via SMS/WhatsApp links claiming to be government or traffic-fine notices.',
      'Only install government-related apps from official, verified sources.',
      'Review installed-app permissions regularly, especially Accessibility and Device Admin.',
      'Treat unexpected e-Challan / fine messages with suspicion and verify via official government portals directly.',
    ],
    tools: ['Static APK analysis', 'Manual reverse engineering', 'Network/traffic inspection'],
    outcome:
      'Findings were documented for awareness and defensive research purposes. The distribution pattern and technical indicators were catalogued to support future detection of similar threats.',
  },
];

export const incidentCategories = [
  'Account Compromise',
  'Phishing',
  'Malicious APK',
  'Social Media Takeover',
  'Online Scam',
  'Suspicious Link',
  'Website Compromise',
  'Mobile Security',
];
