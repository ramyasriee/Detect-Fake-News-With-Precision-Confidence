import { motion } from "motion/react";
import {
  Brain,
  Search,
  BarChart3,
  Globe,
  Zap,
  Lock,
  AlertTriangle,
  Database,
  Link,
  FileText,
  Network,
  Eye,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Neural AI Detection",
    description:
      "Advanced deep learning models trained on 500M+ articles identify misinformation patterns with exceptional accuracy.",
    accent: "#889063",
  },
  {
    icon: Search,
    title: "Source Verification",
    description:
      "Cross-references 10,000+ trusted databases and fact-checking repositories to validate information origin.",
    accent: "#CFBB99",
  },
  {
    icon: Zap,
    title: "Real-Time Analysis",
    description:
      "Sub-2-second processing delivers instant verdicts on articles, social posts, and multimedia content.",
    accent: "#889063",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description:
      "Detects fake news across 47 languages including Arabic, Mandarin, Spanish, and all major European languages.",
    accent: "#CFBB99",
  },
  {
    icon: BarChart3,
    title: "Credibility Scoring",
    description:
      "Proprietary 0-100 credibility index with granular breakdown of linguistic, source, and contextual factors.",
    accent: "#889063",
  },
  {
    icon: AlertTriangle,
    title: "Bias Detection",
    description:
      "Identifies political bias, emotional manipulation, misleading headlines, and selective fact presentation.",
    accent: "#CFBB99",
  },
  {
    icon: Network,
    title: "Network Analysis",
    description:
      "Maps disinformation propagation networks and identifies coordinated inauthentic behavior campaigns.",
    accent: "#889063",
  },
  {
    icon: Eye,
    title: "Image Verification",
    description:
      "Reverse image search and deepfake detection to expose manipulated or miscontextualized visual content.",
    accent: "#CFBB99",
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description:
      "Comprehensive audit trails with evidence citations, confidence intervals, and editorial recommendations.",
    accent: "#889063",
  },
  {
    icon: Link,
    title: "API & Integrations",
    description:
      "RESTful API and pre-built connectors for CMS platforms, newsrooms, and enterprise content systems.",
    accent: "#CFBB99",
  },
  {
    icon: Database,
    title: "Knowledge Graph",
    description:
      "Proprietary entity relationship database of 2B+ facts updated continuously from authoritative sources.",
    accent: "#889063",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified with end-to-end encryption, on-premise deployment, and GDPR compliance.",
    accent: "#CFBB99",
  },
];

export function FeaturesSection() {
  return (
    <section
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #1e2418 0%, #222b18 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: "#889063" }}
            >
              Platform Capabilities
            </p>
            <h2
              className="mb-5"
              style={{
                color: "#E5D7C4",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Everything You Need to{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #CFBB99, #889063)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Fight Misinformation
              </span>
            </h2>
            <p
              className="max-w-2xl mx-auto"
              style={{ color: "#889063", lineHeight: 1.7 }}
            >
              A complete truth intelligence platform built for the world's most demanding
              newsrooms, enterprises, and government agencies.
            </p>
          </motion.div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="group rounded-2xl p-6 cursor-pointer transition-all duration-300"
              style={{
                background: "rgba(30,36,24,0.6)",
                border: "1px solid rgba(136,144,99,0.1)",
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                borderColor: "rgba(136,144,99,0.3)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                style={{
                  background: `rgba(136,144,99,0.1)`,
                  border: `1px solid rgba(136,144,99,0.15)`,
                }}
              >
                <feature.icon size={18} style={{ color: feature.accent }} />
              </div>
              <h3
                className="mb-2 text-sm tracking-wide"
                style={{ color: "#CFBB99" }}
              >
                {feature.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "#889063" }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
