import { motion } from "motion/react";
import { Shield, Target, Users, Globe, Award, Heart } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { NavLink } from "react-router";

const team = [
  {
    name: "Dr. Amara Osei",
    role: "Chief Executive Officer",
    bio: "Former Director at Reuters Institute for the Study of Journalism. PhD in Computational Linguistics, MIT.",
    initials: "AO",
  },
  {
    name: "Dr. Liu Wei",
    role: "Chief AI Officer",
    bio: "Ex-Google Brain researcher. 12 patents in NLP and misinformation detection. Stanford CS PhD.",
    initials: "LW",
  },
  {
    name: "Isabelle Fontaine",
    role: "Chief Product Officer",
    bio: "Former Head of Trust & Safety at a major social platform. 15+ years in digital media integrity.",
    initials: "IF",
  },
  {
    name: "James Kowalski",
    role: "Chief Technology Officer",
    bio: "Architect of large-scale fact-verification systems. Previously VP Engineering at a leading data intelligence firm.",
    initials: "JK",
  },
  {
    name: "Dr. Priya Sharma",
    role: "Head of Research",
    bio: "Linguist and data scientist specializing in multilingual misinformation. Published 40+ peer-reviewed papers.",
    initials: "PS",
  },
  {
    name: "Kwame Asante",
    role: "VP of Partnerships",
    bio: "Leads global media and government relationships. Former consultant to the UN Digital Cooperation Roadmap.",
    initials: "KA",
  },
];

const values = [
  {
    icon: Target,
    title: "Truth as a Standard",
    desc: "We believe access to accurate information is a fundamental right. Every product decision is guided by this principle.",
  },
  {
    icon: Shield,
    title: "Responsibility & Ethics",
    desc: "We operate under a strict AI ethics charter, with bias audits, transparency reports, and independent oversight.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    desc: "Misinformation is a global problem. Our technology is built to serve every language, culture, and media context.",
  },
  {
    icon: Users,
    title: "Journalism First",
    desc: "We are journalists' allies, not their replacement. Our tools amplify human editorial judgment.",
  },
  {
    icon: Award,
    title: "Scientific Rigor",
    desc: "All models are peer-reviewed, continuously benchmarked, and updated with the latest research.",
  },
  {
    icon: Heart,
    title: "Human Impact",
    desc: "We measure success by the real-world impact on public discourse, not just by technical metrics.",
  },
];

export function AboutPage() {
  return (
    <div
      className="min-h-screen pt-20"
      style={{ background: "linear-gradient(180deg, #131810 0%, #1e2418 100%)" }}
    >
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1758691736433-4078b93abd72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc3MjcwMzg1OHww&ixlib=rb-4.1.0&q=80&w=1080)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.07,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent, #1e2418)" }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#889063" }}>
                Our Story
              </p>
              <h1
                className="mb-6"
                style={{
                  color: "#E5D7C4",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                Built by Truth-Seekers,{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #CFBB99, #889063)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  for the World
                </span>
              </h1>
              <div className="space-y-4" style={{ color: "#889063", lineHeight: 1.7 }}>
                <p>
                  VeritasAI was founded in 2019 by a team of former journalists,
                  AI researchers, and information security experts who witnessed
                  firsthand the devastating impact of unchecked misinformation on
                  democratic institutions and public health.
                </p>
                <p>
                  What started as a research project at MIT's Media Lab evolved into
                  the world's most comprehensive truth intelligence platform — now
                  protecting information ecosystems for 500+ organizations across
                  83 countries.
                </p>
                <p>
                  We're not just building software. We're defending the foundational
                  infrastructure of informed societies.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "2019", label: "Founded" },
                { value: "83", label: "Countries" },
                { value: "500+", label: "Enterprise Clients" },
                { value: "$47M", label: "Series B Raised" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 text-center"
                  style={{
                    background: "rgba(30,36,24,0.6)",
                    border: "1px solid rgba(136,144,99,0.12)",
                  }}
                >
                  <div
                    className="text-3xl mb-2"
                    style={{
                      background: "linear-gradient(135deg, #CFBB99, #889063)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: "#889063" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(135deg, rgba(76,61,25,0.15), rgba(53,64,36,0.15))",
          borderTop: "1px solid rgba(136,144,99,0.08)",
          borderBottom: "1px solid rgba(136,144,99,0.08)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "#889063" }}>
              Our Mission
            </p>
            <blockquote
              style={{
                color: "#E5D7C4",
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
              }}
            >
              "To make truth the most accessible and verifiable commodity in the
              world — using AI that respects human judgment, democratic values,
              and press freedom."
            </blockquote>
            <div className="mt-6 text-sm" style={{ color: "#889063" }}>
              — Dr. Amara Osei, CEO & Co-founder
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#889063" }}>
              What We Believe
            </p>
            <h2
              style={{
                color: "#E5D7C4",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl p-7"
                style={{
                  background: "rgba(30,36,24,0.5)",
                  border: "1px solid rgba(136,144,99,0.1)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: "linear-gradient(135deg, rgba(136,144,99,0.2), rgba(76,61,25,0.2))",
                    border: "1px solid rgba(136,144,99,0.2)",
                  }}
                >
                  <val.icon size={20} style={{ color: "#CFBB99" }} />
                </div>
                <h3 className="mb-3" style={{ color: "#CFBB99" }}>
                  {val.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#889063" }}>
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section
        className="py-20"
        style={{ borderTop: "1px solid rgba(136,144,99,0.08)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#889063" }}>
              Leadership
            </p>
            <h2
              style={{
                color: "#E5D7C4",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                letterSpacing: "-0.02em",
              }}
            >
              The Team Behind VeritasAI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl p-6 flex gap-4"
                style={{
                  background: "rgba(30,36,24,0.5)",
                  border: "1px solid rgba(136,144,99,0.1)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-sm"
                  style={{
                    background: "linear-gradient(135deg, #889063, #4C3D19)",
                    color: "#E5D7C4",
                    letterSpacing: "0.05em",
                  }}
                >
                  {member.initials}
                </div>
                <div>
                  <div className="text-sm mb-0.5" style={{ color: "#CFBB99" }}>
                    {member.name}
                  </div>
                  <div
                    className="text-xs mb-2"
                    style={{ color: "#889063", opacity: 0.7 }}
                  >
                    {member.role}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#889063" }}>
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section
        className="py-16"
        style={{
          background: "rgba(20,25,16,0.8)",
          borderTop: "1px solid rgba(136,144,99,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs tracking-widest uppercase mb-8" style={{ color: "#889063", opacity: 0.6 }}>
            Awards & Recognition
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              "TechCrunch Disrupt '21 Winner",
              "TIME100 AI Honoree 2023",
              "UNESCO Press Freedom Award",
              "World Economic Forum Tech Pioneer",
              "EU FactCheck Excellence Award",
            ].map((award, i) => (
              <div
                key={i}
                className="px-5 py-2.5 rounded-xl text-sm"
                style={{
                  background: "rgba(136,144,99,0.07)",
                  border: "1px solid rgba(136,144,99,0.15)",
                  color: "#889063",
                }}
              >
                {award}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
