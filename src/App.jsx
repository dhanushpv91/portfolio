import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Github, MapPin, GraduationCap, Code, ChevronDown, Globe, Briefcase, ExternalLink } from 'lucide-react';
import Profile from "./assets/dhanush.png"

const translations = {
  de: {
  nav: {
    about: 'Über mich',
    experience: 'Erfahrung',
    education: 'Bildung',
    projects: 'Projekte',
    contact: 'Kontakt'
  },

  hero: {
    greeting: 'Hallo, ich bin',
    title: 'Dhanush',
    subtitle: 'Masterstudent für Artificial Intelligence und Robotik in Deutschland mit Schwerpunkt auf Full-Stack-Entwicklung. Erfahrung mit React, Next.js, TypeScript, Node.js, NestJS, PostgreSQL, REST-APIs und AWS.',
    cta: 'Kontaktieren Sie mich'
  },

  about: {
    title: 'Wer bin ich?',
    content: 'Hallo, ich bin Dhanush und studiere derzeit Artificial Intelligence und Robotik in Deutschland.\n\nMein fachlicher Schwerpunkt liegt auf Full-Stack-Webentwicklung. Ich arbeite mit React, Next.js, TypeScript, Node.js, NestJS, PostgreSQL, Redis, Docker und AWS.\n\nIch interessiere mich für skalierbare Webanwendungen, saubere APIs, zuverlässige CI/CD-Prozesse und die Entwicklung von KI-gestützten Produkten.',
    button: 'Mehr über mich'
  },

  experience: {
    title: 'Berufserfahrung',
    description: 'Mehr als 3 Jahre Erfahrung in der Full-Stack-Entwicklung bei Jeeves Information Systems (Forterro) mit Schwerpunkt auf React, Next.js, Node.js, REST-APIs und Cloud-Deployments.',
    download: 'Lebenslauf herunterladen',
    jobs: [
      {
        title: 'Software Engineer – Full Stack',
        company: 'Jeeves Information Systems (Forterro)',
        duration: '06/2023 - 01/2025',
        points: [
          'Entwicklung mandantenfähiger ERP-Module (CRM, HR, Lager, Vertrieb) mit kundenspezifischer Domain-Zuordnung und getrennten Datenbanken für über 1.000 aktive Nutzer.',
    'Reduzierung der Frontend-Bundle-Größe um 82 % (15,6 MB auf 2,8 MB) durch Lazy Loading, Code Splitting, Bereinigung von Abhängigkeiten und Caching; Lighthouse-Werte um über 36 % verbessert und Ladezeiten in zentralen Modulen deutlich verkürzt.',
    'Entwicklung eines Wareneingangsberichts, der Eingangsrechnungen für über 250 Wareneingänge automatisch erstellt; Ursache des Redis-Fehlers „Connection Refused" zwischen Frontend und Backend gefunden und behoben.',
    'Aufbau und Pflege von REST-API-Schnittstellen zwischen dem ERP und einem externen Händlerportal (Kundenaufträge, Ausgangsrechnungen, Spesenabrechnungen, Mitarbeiterabgleich) mit idempotenter Wiederholungslogik und strukturiertem Audit-Logging.',
    'Konzeption eines Materialverbrauchsberichts über fünf Transaktionstypen auf Basis von Hauptbuchbuchungen, abgeglichen mit den Produktionsdaten eines vollständigen Geschäftsjahres.',
    'Konzeption einer dynamischen Kalkulations- und Preisengine, die Produktpreise anhand mehrerer Kostenparameter und aktueller Geschäftsbedingungen berechnet.',
    'Aufbau von CI/CD-Pipelines mit CircleCI (Deployment-Zeit um 60 % verkürzt) und Betrieb von AWS-ECS-Deployments per CLI mit Echtzeit-Monitoring und Rollback-Strategien.'
        ]
      },
      {
        title: 'Associate Full-Stack Developer',
        company: 'Jeeves Information Systems (Forterro)',
        duration: '05/2022 - 06/2023',
        points: [
          'Entwicklung von ERP-Modulen für die Fertigung (Einkauf, Lager, Produktion, Qualitätskontrolle, Versand, Finanzen) mit React.js, TypeScript, Redux und REST-APIs, inklusive dynamischer Tabellen, Suche, Filter, Paginierung, Reporting-Dashboards und Excel-Import/-Export.',
    'Umsetzung von JWT-Authentifizierung, geschützten Routen und rollenbasierten Dashboards für Admin, Produktion, QC, Vertrieb und Lager; durch wiederverwendbare UI-Komponenten sieht jedes Team nur die eigenen Workflows.',
    'Entwicklung der Module Bestellungen, Lieferantennachverfolgung, Lieferprüfung, Zahlungsverfolgung, Produktionserfassung und Materialverfolgung zur Reduzierung manueller Arbeitsschritte in Einkauf und Lager.',
    'Umsetzung bedingter, dynamischer Formulare mit Formik und Yup sowie Integration von SheetJS und OCR-basierter Rechnungsvorausfüllung, um Eingabefehler bei der manuellen Dateneingabe zu verringern.'
        ]
      }
    ]
  },

  education: {
    title: 'Bildung',
    items: [
      {
        university: 'Hochschule Hof, University of Applied Sciences',
        year: '2026 - 2028',
        degree: 'Master in Artificial Intelligence und Robotik'
      },
      {
        university: 'Visvesvaraya Technological University',
        year: '2018 - 2022',
        degree: 'Bachelor of Engineering in Information Science'
      }
    ]
  },

  projects: {
    title: 'Ausgewählte Projekte',
    viewCode: 'Auf GitHub ansehen',
    items: [
      {
        title: 'Design System & Component Library',
        description: 'Eine wiederverwendbare React-Komponentenbibliothek auf Basis von in Figma definierten Design Tokens, veröffentlicht als versioniertes npm-Paket mit generiertem Tailwind-Preset. Sie ist in Storybook dokumentiert, auf WCAG-2.2-AA-Barrierefreiheit für Tastatur und Screenreader ausgelegt und umfasst visuelle Regressionstests, eine handgeschriebene CSS-Architektur sowie strikte Linting- und automatisierte Release-Pipelines.',
        stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Storybook', 'Figma', 'Playwright', 'ESLint', 'GitHub Actions', 'npm'],
        url: 'https://github.com/dhanushpv91/Design-System-Component-Library'
      },
      {
        title: 'Banking & Transaction Platform',
        description: 'Eine Full-Stack-Bankingplattform mit Double-Entry-Ledger, ACID-Transaktionen und nebenläufigkeitssicheren Überweisungen. Sie nutzt Idempotency Keys, ein Transactional Outbox und Kafka-Event-Verarbeitung, dazu eine Betrugserkennung mit Regeln, die Compliance-Mitarbeitende in der Oberfläche bearbeiten können, einen Freigabe-Workflow für hohe Überweisungen, nächtliche Abstimmung und eine vollständige Audit-Historie.',
        stack: ['Angular', 'RxJS', 'Angular Material', 'Spring Boot', 'PostgreSQL', 'Kafka', 'JUnit', 'Jasmine/Karma', 'Cypress', 'Testcontainers', 'Docker', 'GitLab CI'],
        url: 'https://github.com/dhanushpv91/Banking-Transaction-Platform'
      },
      {
        title: 'Multi-Tenant Project Management SaaS',
        description: 'Eine mandantenfähige Projektmanagement-SaaS mit Mandantentrennung über PostgreSQL Row-Level Security, benutzerdefinierten Rollen und Berechtigungen sowie Scoping auf Organisationsebene. Sie umfasst Echtzeit-Zusammenarbeit über WebSockets mit Redis Pub/Sub, optimistische UI-Updates, einen Task-Abhängigkeitsgraphen mit Zykluserkennung, Hintergrundjobs, Rate Limiting, Stripe-Sandbox-Abrechnung mit Webhooks und ein Audit-Log.',
        stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Query', 'NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'Vitest', 'Playwright', 'Docker', 'AWS', 'Vercel', 'GitHub Actions'],
        url: 'https://github.com/dhanushpv91/Multi-Tenant-Project-Management-SaaS'
      },
      {
        title: 'Real-Time Logistics & Fleet Platform',
        description: 'Eine Logistik- und Flottenplattform, die GPS-Daten in hohem Volumen verarbeitet, Fahrzeuge live über WebSockets verfolgt und geografische Abfragen mit PostGIS ausführt. Hinzu kommen Routenoptimierung mit OR-Tools, Prognose der Lieferzeiten, Abgleich von Frachtrechnungen mit tatsächlichen Lieferungen sowie ein virtualisiertes, barrierefreies Analyse-Dashboard, ergänzt durch Lasttests und strukturierte Observability.',
        stack: ['React', 'TypeScript', 'Vite', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'PostGIS', 'Celery', 'Redis', 'OR-Tools', 'pytest', 'Playwright', 'Docker Compose'],
        url: 'https://github.com/dhanushpv91/Real-Time-Logistics-Fleet-Platform'
      }
    ]
  },

  contact: {
    title: 'Kontakt',
    phone: 'Telefonnummer',
    email: 'E-Mail',
    location: 'Standort',
    locationValue: 'Deutschland',
    button: 'Nachricht senden'
  }
},

  en: {
  nav: {
    about: 'About',
    experience: 'Experience',
    education: 'Education',
    projects: 'Projects',
    contact: 'Contact'
  },

  hero: {
    greeting: 'Hello, I am',
    title: 'Dhanush',
    subtitle: 'Master’s student in Artificial Intelligence and Robotics in Germany, focused on full-stack development. Experienced with React, Next.js, TypeScript, Node.js, NestJS, PostgreSQL, REST APIs and AWS.',
    cta: 'Contact Me'
  },

  about: {
    title: 'Who am I?',
    content: 'Hi, I’m Dhanush, currently pursuing a Master’s in Artificial Intelligence and Robotics in Germany.\n\nMy professional focus is full-stack web development. My technical areas include React, Next.js, TypeScript, Node.js, NestJS, PostgreSQL, Redis, Docker and AWS.\n\nI am interested in building scalable web applications, clean APIs, reliable CI/CD workflows and AI-enabled products.',
    button: 'More About Me'
  },

  experience: {
    title: 'Professional Experience',
    description: '3+ years of experience in full-stack development at Jeeves Information Systems (Forterro), with a focus on React, Next.js, Node.js, REST APIs and cloud deployments.',
    download: 'Download Resume',
    jobs: [
      {
        title: 'Software Engineer – Full Stack',
        company: 'Jeeves Information Systems (Forterro)',
        duration: '06/2023 - 01/2025',
        points: [
           'Built multi-tenant ERP modules (CRM, HR, Inventory, Sales) with customer-specific domain mapping and database isolation, supporting 1000+ active users.',
    'Reduced the frontend bundle size by 82% (15.6 MB to 2.8 MB) through lazy loading, code splitting, dependency optimization, and caching, improving Lighthouse scores by 36%+ and load times across key modules.',
    'Developed a Purchase Receipt report that automates Purchase Invoice creation for 250+ receipts, and resolved the frontend-backend "Connection Refused" error caused by Redis that had been blocking it.',
    'Built and maintained REST API integrations between the ERP and an external dealer portal (Sales Order, Sales Invoice, Expense Claim, Employee sync), with idempotent retry handling and structured audit logging.',
    'Designed a Material Consumption report from scratch across five transaction types, driven by General Ledger entries and verified against a full fiscal year of production data.',
    'Designed a dynamic costing and pricing engine that calculates product prices from multiple cost parameters and real-time business conditions.',
    'Built CI/CD pipelines with CircleCI, reducing deployment time by 60%, and managed AWS ECS deployments through the CLI with real-time monitoring and rollback strategies.'
        ]
      },
      {
        title: 'Associate Full-Stack Developer',
        company: 'Jeeves Information Systems (Forterro)',
        duration: '05/2022 - 06/2023',
        points: [
           'Developed ERP modules for manufacturing operations (Procurement, Inventory, Production, Quality Control, Dispatch, Finance) using React.js, TypeScript, Redux, and REST APIs, with dynamic tables, search, filtering, pagination, reporting dashboards, and Excel import/export.',
    'Implemented JWT authentication, protected routes, and role-based dashboards for Admin, Production, QC, Sales, and Inventory teams, using reusable UI components so each team saw only the workflows it owned.',
    'Built the Purchase Order, Vendor Follow-Up, Delivery Verification, Payment Tracking, Production Entry, and Material Tracking modules, reducing manual operations across purchase and stores teams.',
    'Built conditional, dynamic forms with Formik and Yup, and integrated SheetJS and OCR-based invoice auto-fill to reduce manual data-entry errors.'
        ]
      }
    ]
  },

  education: {
    title: 'Education',
    items: [
      {
        university: 'Hochschule Hof, University of Applied Sciences',
        year: '2026 - 2028',
        degree: 'Master’s in Artificial Intelligence and Robotics'
      },
      {
        university: 'Visvesvaraya Technological University',
        year: '2018 - 2022',
        degree: 'Bachelor of Engineering in Information Science'
      }
    ]
  },

  projects: {
    title: 'Selected Projects',
    viewCode: 'View on GitHub',
    items: [
      {
        title: 'Design System & Component Library',
        description: 'A reusable React component library built from design tokens defined in Figma and published as a versioned npm package with a generated Tailwind preset. It is documented in Storybook and designed for WCAG 2.2 AA keyboard and screen-reader accessibility, with visual regression tests, a hand-written CSS architecture and a strict linting and automated release pipeline.',
        stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Storybook', 'Figma', 'Playwright', 'ESLint', 'GitHub Actions', 'npm'],
        url: 'https://github.com/dhanushpv91/Design-System-Component-Library'
      },
      {
        title: 'Banking & Transaction Platform',
        description: 'A full-stack banking platform with a double-entry ledger, ACID transactions and concurrency-safe transfers. It uses idempotency keys, a transactional outbox and Kafka event processing, together with a fraud engine whose rules compliance officers can edit in the UI, an approval workflow for high-value transfers, nightly reconciliation and a full audit trail.',
        stack: ['Angular', 'RxJS', 'Angular Material', 'Spring Boot', 'PostgreSQL', 'Kafka', 'JUnit', 'Jasmine/Karma', 'Cypress', 'Testcontainers', 'Docker', 'GitLab CI'],
        url: 'https://github.com/dhanushpv91/Banking-Transaction-Platform'
      },
      {
        title: 'Multi-Tenant Project Management SaaS',
        description: 'A multi-tenant project management SaaS with tenant isolation enforced through PostgreSQL row-level security, custom roles and permissions, and organization-level scoping. It includes real-time collaboration over WebSockets with Redis pub/sub, optimistic UI updates, a task dependency graph with cycle detection, background jobs, rate limiting, Stripe sandbox billing with webhooks and an audit log.',
        stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Query', 'NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'Vitest', 'Playwright', 'Docker', 'AWS', 'Vercel', 'GitHub Actions'],
        url: 'https://github.com/dhanushpv91/Multi-Tenant-Project-Management-SaaS'
      },
      {
        title: 'Real-Time Logistics & Fleet Platform',
        description: 'A logistics and fleet platform that ingests high-volume GPS data, shows live vehicle tracking over WebSockets and runs geospatial queries with PostGIS. It adds route optimization with OR-Tools, delivery ETA prediction, freight invoice reconciliation against actual deliveries and a virtualized, accessible analytics dashboard, supported by load testing and structured observability.',
        stack: ['React', 'TypeScript', 'Vite', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'PostGIS', 'Celery', 'Redis', 'OR-Tools', 'pytest', 'Playwright', 'Docker Compose'],
        url: 'https://github.com/dhanushpv91/Real-Time-Logistics-Fleet-Platform'
      }
    ]
  },

  contact: {
    title: 'Contact Dhanush',
    phone: 'Phone Number',
    email: 'Email',
    location: 'Location',
    locationValue: 'Germany',
    button: 'Send Message'
  }
}

};

export default function Portfolio() {
  const [language, setLanguage] = useState('de');
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScroll();
  const t = translations[language];

  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.98)']
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'education', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'de' ? 'en' : 'de');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Fixed Header */}
      <motion.header
        style={{ opacity: headerOpacity, backgroundColor: headerBackground }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-gray-200"
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-gray-900"
            >
              DPV
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {Object.entries(t.nav).map(([key, value], index) => (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => scrollToSection(key === 'about' ? 'about' : key)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 ${
                    activeSection === key ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {value}
                </motion.button>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-all duration-300"
            >
              <Globe size={16} />
              {language === 'de' ? 'EN' : 'DE'}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.p
                variants={itemVariants}
                className="text-blue-600 font-medium mb-4"
              >
                {t.hero.greeting}
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold mb-6 text-gray-900"
              >
                {t.hero.title}
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-600 mb-8 leading-relaxed"
              >
                {t.hero.subtitle}
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex gap-4"
              >
                <a
                  href="mailto:dhanush.palani.vijay.kumari.job@gmail.com"
                  className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                >
                  {t.hero.cta}
                </a>
                <a
                  href="https://github.com/dhanushpv91"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 border-gray-300 text-gray-900 rounded-full font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                >
                  GitHub
                </a>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex gap-4 mt-8"
              >
                <a
                  href="https://github.com/dhanushpv91"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 hover:bg-blue-100 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <Github size={20} className="text-gray-700" />
                </a>
                <a
                  href="mailto:dhanush.palani.vijay.kumari.job@gmail.com"
                  className="p-3 bg-gray-100 hover:bg-blue-100 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <Mail size={20} className="text-gray-700" />
                </a>
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-full max-w-md mx-auto"
              >
             <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white flex items-center justify-center">
  <div className="w-full h-full p-4 flex items-center justify-center">
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <img 
        src={Profile} 
        alt="Profilbild" 
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</div>

                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl blur-3xl opacity-30"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown size={32} className="text-gray-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">{t.about.title}</h2>
            <motion.p
              variants={fadeInUpVariants}
              className="text-lg text-gray-600 leading-relaxed mb-8"
            >
              {t.about.content}
            </motion.p>
            <motion.a
              variants={fadeInUpVariants}
              href="#experience"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              {t.about.button}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            >
              {t.experience.title}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 mb-12 leading-relaxed"
            >
              {t.experience.description}
            </motion.p>

            <div className="space-y-8">
              {t.experience.jobs.map((job, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Briefcase size={24} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-blue-600 font-medium mb-2">{job.company}</p>
                      <p className="text-sm text-gray-500">{job.duration}</p>
                      {job.points && (
                        <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-700 leading-relaxed">
                          {job.points.map((point, pointIndex) => (
                            <li key={pointIndex}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex gap-4"
            >
              <a
                href="https://drive.google.com/file/d/1L4qeY0dZS6Nh3s89_m3NXZ8Xyol9FaGF/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105"
              >
                {t.experience.download}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-12 text-gray-900"
            >
              {t.education.title}
            </motion.h2>

            <div className="space-y-8">
              {t.education.items.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <GraduationCap size={24} className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{edu.degree}</h3>
                      <p className="text-purple-600 font-medium mb-2">{edu.university}</p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-12 text-gray-900"
            >
              {t.projects.title}
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {t.projects.items.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Code size={24} className="text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-5 leading-relaxed">{project.description}</p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mb-5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Github size={16} />
                    {t.projects.viewCode}
                    <ExternalLink size={14} />
                  </a>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((technology) => (
                      <span
                        key={technology}
                        className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold mb-8 text-gray-900"
              >
                {t.contact.title}
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Mail size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t.contact.email}</p>
                    <a
                      href="mailto:dhanush.palani.vijay.kumari.job@gmail.com"
                      className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      dhanush.palani.vijay.kumari.job@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <MapPin size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t.contact.location}</p>
                    <p className="text-lg font-medium text-gray-900">{t.contact.locationValue}</p>
                  </div>
                </div>
              </motion.div>

              <motion.a
                variants={itemVariants}
                href="mailto:dhanush.palani.vijay.kumari.job@gmail.com"
                className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105"
              >
                <Mail size={20} />
                {t.contact.button}
              </motion.a>
            </div>

            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-full max-w-md mx-auto"
              >
               <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white flex items-center justify-center">
  <div className="w-full h-full p-4 flex items-center justify-center">
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <img 
        src={Profile} 
        alt="Profilbild" 
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</div>

                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl blur-3xl opacity-30"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="text-center md:text-left">
              <p className="text-2xl font-bold text-gray-900 mb-2">Dhanush Palani Vijay Kumari</p>
              <p className="text-gray-600">
                {language === 'de' 
                  ? 'Full-Stack-Entwickler & Problemlöser' 
                  : 'Full-Stack Developer & Problem Solver'}
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href="https://github.com/dhanushpv91"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white hover:bg-blue-50 rounded-full transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <Github size={20} className="text-gray-700" />
              </a>
              <a
                href="mailto:dhanush.palani.vijay.kumari.job@gmail.com"
                className="p-3 bg-white hover:bg-blue-50 rounded-full transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <Mail size={20} className="text-gray-700" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm"
          >
            <p>© 2026 Dhanush Palani Vijay Kumari. {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}