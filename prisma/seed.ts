import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'niklaussolution@gmail.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error('Set SEED_ADMIN_PASSWORD before seeding — never hardcode admin credentials.');
  }

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Harish Ganesan',
      role: 'SUPER_ADMIN',
      passwordHash: await bcrypt.hash(adminPassword, 12),
    },
  });

  await prisma.profile.upsert({
    where: { id: 'primary' },
    update: {},
    create: {
      id: 'primary',
      name: 'Harish Ganesan',
      title: 'Director',
      company: 'Niklaus Solutions',
      companyUrl: 'https://theniklaus.com',
      experienceYears: '10+',
      location: 'Erode, India',
      email: adminEmail,
      heroEyebrow: '// CYBERSECURITY PROFESSIONAL',
      heroStatement:
        'I investigate threats, expose malicious digital activity, strengthen systems and help people respond when cyber incidents happen.',
    },
  });

  await prisma.certification.upsert({
    where: { id: 'oscp' },
    update: {},
    create: {
      id: 'oscp',
      name: 'OSCP',
      issuer: 'OffSec',
      status: 'IN_PROGRESS',
    },
  });

  await prisma.award.upsert({
    where: { id: 'iste-best-student' },
    update: {},
    create: {
      id: 'iste-best-student',
      title: 'ISTE Best Student Award',
      issuer: 'Indian Society for Technical Education (ISTE)',
      description: 'Recognition for academic performance, leadership qualities and technical contributions.',
      featured: true,
    },
  });

  await prisma.project.upsert({
    where: { slug: 'phish-aware' },
    update: {},
    create: {
      slug: 'phish-aware',
      title: 'Phish Aware',
      category: 'Security Awareness / Social Engineering Simulation',
      description:
        'A cybersecurity tool designed for penetration-testing simulations and security-awareness training around phishing risk.',
      technologies: ['Python'],
      featured: true,
    },
  });

  await prisma.caseStudy.upsert({
    where: { slug: 'suspicious-echallan-apk-investigation' },
    update: {},
    create: {
      caseNumber: 'HG-THREAT-001',
      title: 'Suspicious e-Challan / Malicious APK Investigation',
      slug: 'suspicious-echallan-apk-investigation',
      category: 'Android Malware / Social Engineering',
      severity: 'HIGH',
      status: 'ANALYZED',
      summary:
        'Technical analysis of an Android application impersonating an official RTO / e-Challan service, distributed as a sideloaded APK.',
      process: [
        'Suspicious APK intake',
        'Static analysis',
        'Package inspection',
        'Obfuscation detected',
        'Payload investigation',
        'Network / WebView analysis',
        'Threat indicators documented',
      ],
      recommendations: [
        'Never install APKs shared via SMS/WhatsApp links claiming to be government or traffic-fine notices.',
        'Only install government-related apps from official, verified sources.',
      ],
      tools: ['Static APK analysis', 'Manual reverse engineering', 'Network/traffic inspection'],
      published: true,
      featured: true,
    },
  });

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
