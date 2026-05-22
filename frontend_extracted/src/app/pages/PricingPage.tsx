import { useState } from "react";
import { motion } from "motion/react";
import { Check, Shield, Globe, Zap, Brain, HelpCircle } from "lucide-react";
import { NavLink } from "react-router";

const features = [
  {
    icon: Brain,
    title: "Advanced AI Detection",
    description: "Cutting-edge neural networks analyze content with 98.7% accuracy",
  },
  {
    icon: Zap,
    title: "Real-Time Analysis",
    description: "Get results in under 2 seconds for instant verification",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Analyze content in 47+ languages and regional dialects",
  },
  {
    icon: Shield,
    title: "Source Verification",
    description: "Cross-reference with trusted sources and fact-checking databases",
  },
];

const allFeatures = [
  "Unlimited article analysis",
  "98.7% detection accuracy",
  "Real-time verification in <2 seconds",
  "47+ languages supported",
  "Source credibility scoring",
  "Sentiment analysis",
  "Bias detection",
  "Misinformation pattern recognition",
  "Cross-reference verification",
  "Detailed analysis reports",
  "Browser extension",
  "API access for developers",
  "Community support",
  "Regular model updates",
];

const faqs = [
  {
    q: "Is VeritasAI really completely free?",
    a: "Yes! VeritasAI is 100% free to use. We believe in democratizing access to truth verification technology. No hidden fees, no premium tiers, no credit card required.",
  },
  {
    q: "How do you sustain a free service?",
    a: "VeritasAI is supported by grants, donations, and partnerships with academic institutions dedicated to combating misinformation. We're committed to keeping the service free for everyone.",
  },
  {
    q: "Are there any usage limits?",
    a: "No artificial limits! You can analyze as many articles as you need. We believe everyone deserves unlimited access to truth verification tools.",
  },
  {
    q: "What counts as one 'analysis'?",
    a: "Each submitted article, URL, or text snippet counts as one analysis. There's no limit to how many you can perform.",
  },
  {
    q: "Can I use this for commercial purposes?",
    a: "Yes! VeritasAI is free for both personal and commercial use. Whether you're an individual, journalist, researcher, or organization, you can use our platform freely.",
  },
  {
    q: "Will this always be free?",
    a: "Yes. We're committed to keeping VeritasAI free and accessible to everyone. Our mission is to combat misinformation globally, and that requires open access.",
  },
];

export function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen pt-20"
      style={{ background: "linear-gradient(180deg, #131810 0%, #1e2418 100%)" }}
    >
      {/* Hero */}
      <section className="py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto px-6"
        >
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#889063" }}>
            Free Forever
          </p>
          <h1
            className="mb-5"
            style={{
              color: "#E5D7C4",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            100% Free.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #CFBB99, #889063)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              No Catches.
            </span>
          </h1>
          <p style={{ color: "#889063", lineHeight: 1.7, marginBottom: "2rem" }}>
            VeritasAI is completely free for everyone. No credit card required, no hidden fees,
            no premium tiers. Just powerful AI-driven fake news detection accessible to all.
          </p>

          <NavLink
            to="/contact"
            className="inline-flex items-center px-8 py-4 rounded-xl text-sm tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #889063, #4C3D19)",
              color: "#E5D7C4",
              boxShadow: "0 8px 32px rgba(136,144,99,0.4)",
            }}
          >
            Get Started Free
          </NavLink>
        </motion.div>
      </section>

      {/* Free Plan Card */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(76,61,25,0.5), rgba(53,64,36,0.5))",
              border: "1px solid rgba(207,187,153,0.3)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="text-center py-3 text-xs tracking-widest uppercase"
              style={{
                background: "linear-gradient(135deg, #889063, #4C3D19)",
                color: "#E5D7C4",
              }}
            >
              Free Forever
            </div>

            <div className="p-10 text-center">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                style={{
                  background: "rgba(136,144,99,0.15)",
                  border: "1px solid rgba(136,144,99,0.3)",
                }}
              >
                <Shield size={32} style={{ color: "#CFBB99" }} />
              </div>

              <h2
                className="mb-4"
                style={{
                  color: "#E5D7C4",
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                Everything You Need
              </h2>

              <p className="text-sm mb-8 max-w-xl mx-auto" style={{ color: "#889063", lineHeight: 1.7 }}>
                Full access to all features, forever. No upgrades needed, no features locked behind paywalls.
                Just powerful fake news detection for everyone.
              </p>

              <div
                className="inline-flex items-baseline gap-2 mb-8"
              >
                <span
                  className="text-6xl"
                  style={{ color: "#E5D7C4" }}
                >
                  $0
                </span>
                <span style={{ color: "#889063" }}>
                  forever
                </span>
              </div>

              <NavLink
                to="/contact"
                className="inline-flex items-center px-8 py-4 rounded-xl text-sm tracking-wider transition-all duration-300 hover:scale-105 mb-12"
                style={{
                  background: "linear-gradient(135deg, #889063, #4C3D19)",
                  color: "#E5D7C4",
                  boxShadow: "0 4px 16px rgba(136,144,99,0.3)",
                }}
              >
                Start Using VeritasAI
              </NavLink>

              <div className="max-w-2xl mx-auto">
                <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "#889063" }}>
                  All Features Included
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  {allFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check size={16} style={{ color: "#889063", flexShrink: 0 }} />
                      <span
                        className="text-sm"
                        style={{ color: "#CFBB99" }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20" style={{ borderTop: "1px solid rgba(136,144,99,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#889063" }}>
              Core Features
            </p>
            <h2 style={{ color: "#E5D7C4", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.02em" }}>
              Everything Included, Nothing Hidden
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-8"
                style={{
                  background: "rgba(30,36,24,0.6)",
                  border: "1px solid rgba(136,144,99,0.12)",
                }}
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                  style={{
                    background: "rgba(136,144,99,0.1)",
                    border: "1px solid rgba(136,144,99,0.2)",
                  }}
                >
                  <feature.icon size={24} style={{ color: "#CFBB99" }} />
                </div>
                <h3 className="mb-3" style={{ color: "#E5D7C4", fontSize: "1.1rem" }}>
                  {feature.title}
                </h3>
                <p className="text-sm" style={{ color: "#889063", lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ borderTop: "1px solid rgba(136,144,99,0.08)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#889063" }}>
              FAQs
            </p>
            <h2 style={{ color: "#E5D7C4", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.02em" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(30,36,24,0.6)",
                  border: "1px solid rgba(136,144,99,0.12)",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-sm pr-4" style={{ color: "#CFBB99" }}>
                    {faq.q}
                  </span>
                  <HelpCircle
                    size={16}
                    style={{
                      color: "#889063",
                      transform: openFaq === i ? "rotate(45deg)" : "none",
                      transition: "transform 0.2s",
                      flexShrink: 0,
                    }}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-sm leading-relaxed" style={{ color: "#889063" }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
