import { motion } from "motion/react";
import {
  Brain, Search, Zap, Globe, BarChart3, AlertTriangle,
  Network, Eye, FileText, Link, Database, Lock,
  TrendingUp, Layers, Radio, Cpu
} from "lucide-react";
import { NavLink } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const coreFeatures = [
  {
    icon: Brain,
    title: "Neural AI Detection Engine",
    description:
      "Our proprietary deep learning architecture — trained on 500M+ labeled articles — identifies 47 distinct patterns of misinformation, including fabricated quotes, misleading statistics, false context, and synthetic media.",
    badge: "Core AI",
    metrics: ["500M+ training samples", "47 fake news patterns", "99.1% recall rate"],
  },
  {
    icon: Search,
    title: "Real-Time Source Verification",
    description:
      "Cross-references claims against 10,000+ authoritative sources including Reuters, AP, BBC, academic journals, and government databases. Every cited source is ranked for historical credibility.",
    badge: "Verification",
    metrics: ["10,000+ trusted sources", "Hourly database updates", "98.3% precision"],
  },
  {
    icon: Network,
    title: "Disinformation Network Mapping",
    description:
      "Trace how false narratives spread across platforms. Our graph analysis engine identifies coordinated campaigns, bot networks, and cross-platform amplification of misinformation.",
    badge: "Network Intel",
    metrics: ["Real-time propagation tracking", "Bot behavior identification", "Cross-platform monitoring"],
  },
  {
    icon: Eye,
    title: "Multimedia Verification",
    description:
      "Deepfake video detection, reverse image search, audio synthesis identification, and metadata forensics ensure that visual and audio content is authentic and correctly contextualized.",
    badge: "Media Analysis",
    metrics: ["Deepfake detection", "Reverse image search", "Audio authenticity check"],
  },
];

const additionalFeatures = [
  { icon: Globe, title: "47 Languages", desc: "Including Arabic, Mandarin, Hindi, Swahili, and all major European languages with full semantic understanding." },
  { icon: AlertTriangle, title: "Bias Detection", desc: "Identifies political bias, loaded language, omission of context, and selective framing techniques." },
  { icon: BarChart3, title: "Credibility Index", desc: "0-100 composite score with sub-scores across factual accuracy, source quality, and linguistic integrity." },
  { icon: Zap, title: "Sub-2s Latency", desc: "Real-time analysis with typical response times of 1.4-1.8 seconds from submission to verdict." },
  { icon: FileText, title: "Audit Reports", desc: "Court-quality evidence reports with citations, confidence intervals, and editorial recommendations." },
  { icon: Link, title: "API & Webhooks", desc: "RESTful API, GraphQL endpoint, and webhook notifications for seamless workflow integration." },
  { icon: Database, title: "Knowledge Graph", desc: "2B+ entity-relationship facts, continuously updated from authoritative primary sources worldwide." },
  { icon: Lock, title: "SOC 2 Type II", desc: "Enterprise-grade security with end-to-end encryption, GDPR compliance, and on-premise options." },
  { icon: TrendingUp, title: "Analytics Dashboard", desc: "Track detection trends, risk exposure, and team productivity with real-time analytics." },
  { icon: Layers, title: "Multi-Source Check", desc: "Simultaneous validation across 17 independent fact-checking repositories and databases." },
  { icon: Radio, title: "Live Monitoring", desc: "Continuous monitoring of configured topics and keywords with instant alert notifications." },
  { icon: Cpu, title: "Custom AI Models", desc: "Enterprise clients can fine-tune our base models on their specific domain, language, or geography." },
];

export function FeaturesPage() {
  return (
    <div
      className="min-h-screen pt-20"
      style={{ background: "linear-gradient(180deg, #131810 0%, #1e2418 100%)" }}
    >
      {/* Hero */}
      <section className="py-20 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1659100946849-9b8851df6965?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzJTIwbWVkaWElMjBmYWN0JTIwY2hlY2tpbmclMjBqb3VybmFsaXNtJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MjcwMzg1NXww&ixlib=rb-4.1.0&q=80&w=1080)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(19,24,16,0.8), #1e2418)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-3xl mx-auto px-6"
        >
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#889063" }}>
            Platform Features
          </p>
          <h1
            className="mb-5"
            style={{
              color: "#E5D7C4",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            The Complete Truth{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #CFBB99, #889063)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Intelligence Suite
            </span>
          </h1>
          <p style={{ color: "#889063", lineHeight: 1.7 }}>
            Every tool you need to detect, analyze, and fight misinformation at scale —
            built for the world's most demanding editorial and enterprise environments.
          </p>
        </motion.div>
      </section>

      {/* Core features — detailed */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-12">
            {coreFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-10 items-center ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {i % 2 === 1 && <div />}
                <div className={i % 2 === 1 ? "lg:order-first" : ""}>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-wider mb-5"
                    style={{
                      background: "rgba(136,144,99,0.1)",
                      border: "1px solid rgba(136,144,99,0.2)",
                      color: "#CFBB99",
                    }}
                  >
                    <feature.icon size={12} />
                    {feature.badge}
                  </div>
                  <h2
                    className="mb-4"
                    style={{
                      color: "#E5D7C4",
                      fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {feature.title}
                  </h2>
                  <p className="mb-6 leading-relaxed" style={{ color: "#889063" }}>
                    {feature.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {feature.metrics.map((m, mi) => (
                      <span
                        key={mi}
                        className="px-3 py-1.5 rounded-lg text-xs"
                        style={{
                          background: "rgba(136,144,99,0.08)",
                          border: "1px solid rgba(136,144,99,0.15)",
                          color: "#889063",
                        }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visual card */}
                <div
                  className={`rounded-3xl p-8 ${i % 2 === 1 ? "" : ""}`}
                  style={{
                    background: "linear-gradient(135deg, rgba(76,61,25,0.3), rgba(53,64,36,0.3))",
                    border: "1px solid rgba(136,144,99,0.15)",
                    minHeight: "240px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="text-center">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{
                        background: "linear-gradient(135deg, rgba(136,144,99,0.2), rgba(76,61,25,0.3))",
                        border: "1px solid rgba(136,144,99,0.25)",
                      }}
                    >
                      <feature.icon size={36} style={{ color: "#CFBB99" }} />
                    </div>
                    <div style={{ color: "#CFBB99" }}>{feature.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional features grid */}
      <section
        className="py-20"
        style={{ borderTop: "1px solid rgba(136,144,99,0.08)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#889063" }}>
              Full Feature Set
            </p>
            <h2 style={{ color: "#E5D7C4", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.02em" }}>
              Everything Else You Need
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {additionalFeatures.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
                className="rounded-2xl p-6 group transition-all duration-300"
                style={{
                  background: "rgba(30,36,24,0.5)",
                  border: "1px solid rgba(136,144,99,0.1)",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    background: "rgba(136,144,99,0.1)",
                    border: "1px solid rgba(136,144,99,0.15)",
                  }}
                >
                  <feat.icon size={17} style={{ color: "#889063" }} />
                </div>
                <h3 className="text-sm mb-2" style={{ color: "#CFBB99" }}>
                  {feat.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#889063" }}>
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="mb-5"
            style={{
              color: "#E5D7C4",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Ready to experience the full platform?
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <NavLink
              to="/contact"
              className="px-7 py-3.5 rounded-xl text-sm tracking-wider transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #889063, #4C3D19)",
                color: "#E5D7C4",
                boxShadow: "0 6px 24px rgba(136,144,99,0.3)",
              }}
            >
              Start Free Trial
            </NavLink>
            <NavLink
              to="/pricing"
              className="px-7 py-3.5 rounded-xl text-sm tracking-wider transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(207,187,153,0.07)",
                border: "1px solid rgba(207,187,153,0.2)",
                color: "#CFBB99",
              }}
            >
              View Pricing
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
