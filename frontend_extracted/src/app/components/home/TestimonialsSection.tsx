import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Director of Digital Journalism",
    org: "Reuters Institute",
    avatar: "SC",
    rating: 5,
    text: "VeritasAI has fundamentally changed how we approach content verification. What used to take our fact-checking team hours now takes seconds — with even higher accuracy. It's become indispensable to our editorial workflow.",
  },
  {
    name: "Marcus Webb",
    role: "Chief Information Officer",
    org: "Global Media Alliance",
    avatar: "MW",
    rating: 5,
    text: "We evaluated every major platform in this space. VeritasAI's multilingual capability and API flexibility were unmatched. The integration with our existing CMS took less than a day and the ROI was immediate.",
  },
  {
    name: "Priya Nair",
    role: "Head of Trust & Safety",
    org: "TechCorp Media",
    avatar: "PN",
    rating: 5,
    text: "In the fight against disinformation, having a reliable detection tool is non-negotiable. VeritasAI gives us the confidence to act quickly. Our false positive rate dropped by 83% after switching from our previous solution.",
  },
  {
    name: "Lt. Col. James Harlow",
    role: "Information Integrity Analyst",
    org: "National Security Institute",
    avatar: "JH",
    rating: 5,
    text: "The network analysis module is genuinely impressive. We can now trace coordinated disinformation campaigns back to their origin and identify patterns invisible to human analysts. An essential national security tool.",
  },
  {
    name: "Sofia Andreescu",
    role: "Senior Investigative Reporter",
    org: "European Press Hub",
    avatar: "SA",
    rating: 5,
    text: "As a journalist covering political misinformation, VeritasAI has become my most trusted research tool. The evidence citations it provides are court-quality and have supported several of my major investigations.",
  },
  {
    name: "Kevin Oduya",
    role: "Fact-Check Lead",
    org: "Africa Truth Network",
    avatar: "KO",
    rating: 5,
    text: "The Swahili, Hausa, and Amharic support is a game-changer for African newsrooms. We finally have a tool designed for our linguistic reality. VeritasAI understands regional context in ways Western tools simply don't.",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const visibleCount = 3;

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const visible = [0, 1, 2].map(
    (offset) => testimonials[(current + offset) % testimonials.length]
  );

  return (
    <section
      className="py-24 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1e2418 0%, #222b18 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#889063" }}>
              Client Voices
            </p>
            <h2
              style={{
                color: "#E5D7C4",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Trusted by the{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #CFBB99, #889063)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                World's Best
              </span>
            </h2>
          </motion.div>

          <div className="hidden md:flex gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(136,144,99,0.1)",
                border: "1px solid rgba(136,144,99,0.2)",
                color: "#889063",
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(136,144,99,0.1)",
                border: "1px solid rgba(136,144,99,0.2)",
                color: "#889063",
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((t, i) => (
            <motion.div
              key={`${current}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl p-7"
              style={{
                background:
                  i === 1
                    ? "linear-gradient(135deg, rgba(76,61,25,0.4), rgba(53,64,36,0.4))"
                    : "rgba(30,36,24,0.6)",
                border: i === 1
                  ? "1px solid rgba(207,187,153,0.2)"
                  : "1px solid rgba(136,144,99,0.1)",
                boxShadow: i === 1 ? "0 16px 48px rgba(0,0,0,0.3)" : "none",
              }}
            >
              {/* Quote icon */}
              <Quote size={28} className="mb-4 opacity-30" style={{ color: "#CFBB99" }} />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, si) => (
                  <Star key={si} size={13} fill="#CFBB99" style={{ color: "#CFBB99" }} />
                ))}
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: "#C4B898", lineHeight: 1.8 }}>
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(136,144,99,0.12)" }}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xs"
                  style={{
                    background: "linear-gradient(135deg, #889063, #4C3D19)",
                    color: "#E5D7C4",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm" style={{ color: "#E5D7C4" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "#889063" }}>
                    {t.role} · {t.org}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                background: i === current ? "#889063" : "rgba(136,144,99,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
