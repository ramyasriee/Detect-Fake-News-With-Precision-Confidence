import { motion } from "motion/react";
import { Upload, Cpu, BarChart3, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Submit Content",
    description:
      "Paste a URL, upload an article, or use our API to submit any piece of content — text, image, or video — for analysis.",
    detail: "Supports 50+ content formats and direct CMS integration",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Processing",
    description:
      "Our neural engines analyze linguistic patterns, cross-reference sources, verify metadata, and check against our 2B+ fact database.",
    detail: "17 parallel analysis modules running simultaneously",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Scoring & Analysis",
    description:
      "Content receives a detailed credibility score with breakdown by category: factual accuracy, source reliability, and bias indicators.",
    detail: "Confidence intervals and uncertainty quantification included",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Actionable Report",
    description:
      "Receive a comprehensive report with evidence, recommendations, and suggested fact-check resources for editorial teams.",
    detail: "Exportable in PDF, JSON, or via webhook notification",
  },
];

export function HowItWorks() {
  return (
    <section
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #222b18 0%, #1a2116 100%)",
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
              How It Works
            </p>
            <h2
              className="mb-5"
              style={{
                color: "#E5D7C4",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                letterSpacing: "-0.02em",
              }}
            >
              From Submission to{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #CFBB99, #889063)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Verified Truth
              </span>
            </h2>
            <p
              className="max-w-2xl mx-auto"
              style={{ color: "#889063", lineHeight: 1.7 }}
            >
              A transparent, auditable four-step process that delivers reliable
              results in under two seconds.
            </p>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute top-20 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(136,144,99,0.3) 20%, rgba(136,144,99,0.3) 80%, transparent)",
              top: "3.5rem",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative"
              >
                {/* Number + icon */}
                <div className="relative flex justify-center mb-8">
                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(136,144,99,0.2), rgba(76,61,25,0.3))",
                      border: "1px solid rgba(136,144,99,0.25)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                    }}
                  >
                    <step.icon size={24} style={{ color: "#CFBB99" }} />
                  </div>
                  {/* Step number badge */}
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                    style={{
                      background: "linear-gradient(135deg, #889063, #4C3D19)",
                      color: "#E5D7C4",
                    }}
                  >
                    {i + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <div
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: "#889063", opacity: 0.6 }}
                  >
                    Step {step.number}
                  </div>
                  <h3
                    className="mb-3"
                    style={{ color: "#E5D7C4", fontSize: "1rem" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "#889063" }}
                  >
                    {step.description}
                  </p>
                  <div
                    className="inline-block px-3 py-1.5 rounded-lg text-xs"
                    style={{
                      background: "rgba(136,144,99,0.08)",
                      border: "1px solid rgba(136,144,99,0.15)",
                      color: "#889063",
                    }}
                  >
                    {step.detail}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
