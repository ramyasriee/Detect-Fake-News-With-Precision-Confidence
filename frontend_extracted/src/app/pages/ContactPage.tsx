import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Building2,
  Newspaper,
  Globe2,
  Shield,
} from "lucide-react";

const contactTypes = [
  { icon: Building2, label: "Enterprise Sales", desc: "Custom plans for large organizations" },
  { icon: Newspaper, label: "Media & Press", desc: "Newsroom partnerships and journalist access" },
  { icon: Globe2, label: "API & Integration", desc: "Technical integration support" },
  { icon: Shield, label: "Government", desc: "Public sector and security agencies" },
];

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    type: "Enterprise Sales",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div
      className="min-h-screen pt-20"
      style={{ background: "linear-gradient(180deg, #131810 0%, #1e2418 100%)" }}
    >
      {/* Hero */}
      <section className="py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto px-6"
        >
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#889063" }}>
            Get In Touch
          </p>
          <h1
            className="mb-5"
            style={{
              color: "#E5D7C4",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Let's Talk{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #CFBB99, #889063)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Truth Intelligence
            </span>
          </h1>
          <p style={{ color: "#889063", lineHeight: 1.7 }}>
            Whether you're a newsroom, enterprise, or government agency — our team
            is ready to build a solution that fits your exact needs.
          </p>
        </motion.div>
      </section>

      {/* Contact types */}
      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {contactTypes.map((ct, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => setForm((f) => ({ ...f, type: ct.label }))}
                className="rounded-2xl p-5 text-left transition-all duration-200"
                style={{
                  background:
                    form.type === ct.label
                      ? "linear-gradient(135deg, rgba(76,61,25,0.4), rgba(53,64,36,0.4))"
                      : "rgba(30,36,24,0.5)",
                  border:
                    form.type === ct.label
                      ? "1px solid rgba(207,187,153,0.3)"
                      : "1px solid rgba(136,144,99,0.1)",
                }}
              >
                <ct.icon
                  size={18}
                  className="mb-3"
                  style={{ color: form.type === ct.label ? "#CFBB99" : "#889063" }}
                />
                <div
                  className="text-sm mb-1"
                  style={{ color: form.type === ct.label ? "#CFBB99" : "#E5D7C4" }}
                >
                  {ct.label}
                </div>
                <div className="text-xs" style={{ color: "#889063" }}>
                  {ct.desc}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="space-y-6">
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(30,36,24,0.5)",
                  border: "1px solid rgba(136,144,99,0.12)",
                }}
              >
                <h3 className="text-sm mb-5" style={{ color: "#CFBB99" }}>
                  Our Offices
                </h3>
                <div className="space-y-4">
                  {[
                    { city: "San Francisco (HQ)", addr: "1250 Intelligence Ave, CA 94105" },
                    { city: "London", addr: "One Canada Square, Canary Wharf, E14 5AB" },
                    { city: "Singapore", addr: "1 Raffles Place, Tower 1, #10-01" },
                  ].map((office, i) => (
                    <div key={i} className="flex gap-3">
                      <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: "#889063" }} />
                      <div>
                        <div className="text-xs" style={{ color: "#E5D7C4" }}>{office.city}</div>
                        <div className="text-xs" style={{ color: "#889063" }}>{office.addr}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(30,36,24,0.5)",
                  border: "1px solid rgba(136,144,99,0.12)",
                }}
              >
                <h3 className="text-sm mb-5" style={{ color: "#CFBB99" }}>
                  Direct Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={15} style={{ color: "#889063" }} />
                    <a href="mailto:hello@veritasai.com" className="text-xs" style={{ color: "#889063" }}>
                      hello@veritasai.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={15} style={{ color: "#889063" }} />
                    <a href="tel:+14155551234" className="text-xs" style={{ color: "#889063" }}>
                      +1 (415) 555-1234
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="rounded-2xl p-6"
                style={{
                  background: "linear-gradient(135deg, rgba(76,61,25,0.3), rgba(53,64,36,0.3))",
                  border: "1px solid rgba(136,144,99,0.15)",
                }}
              >
                <h3 className="text-sm mb-3" style={{ color: "#CFBB99" }}>
                  Response Time
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs" style={{ color: "#889063" }}>Enterprise</span>
                    <span className="text-xs" style={{ color: "#CFBB99" }}>{"< 2 hours"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs" style={{ color: "#889063" }}>Professional</span>
                    <span className="text-xs" style={{ color: "#CFBB99" }}>{"< 24 hours"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs" style={{ color: "#889063" }}>General</span>
                    <span className="text-xs" style={{ color: "#CFBB99" }}>2-3 business days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(30,36,24,0.6)",
                  border: "1px solid rgba(136,144,99,0.15)",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
                }}
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-12 text-center"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: "rgba(136,144,99,0.15)" }}
                    >
                      <CheckCircle2 size={32} style={{ color: "#889063" }} />
                    </div>
                    <h3 className="mb-3" style={{ color: "#E5D7C4", fontSize: "1.2rem" }}>
                      Message Received
                    </h3>
                    <p style={{ color: "#889063", lineHeight: 1.7 }}>
                      Thank you for reaching out. A member of our team will
                      respond to your inquiry within the timeframe noted above.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <h2 className="text-sm tracking-wider mb-6" style={{ color: "#CFBB99" }}>
                      Send us a Message
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs mb-2" style={{ color: "#889063" }}>
                          Full Name *
                        </label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          placeholder="Your full name"
                          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                          style={{
                            background: "rgba(20,25,16,0.6)",
                            border: "1px solid rgba(136,144,99,0.15)",
                            color: "#E5D7C4",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(136,144,99,0.4)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(136,144,99,0.15)")}
                        />
                      </div>
                      <div>
                        <label className="block text-xs mb-2" style={{ color: "#889063" }}>
                          Email Address *
                        </label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          placeholder="your@email.com"
                          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                          style={{
                            background: "rgba(20,25,16,0.6)",
                            border: "1px solid rgba(136,144,99,0.15)",
                            color: "#E5D7C4",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(136,144,99,0.4)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(136,144,99,0.15)")}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs mb-2" style={{ color: "#889063" }}>
                        Organization
                      </label>
                      <input
                        value={form.org}
                        onChange={(e) => setForm((f) => ({ ...f, org: e.target.value }))}
                        placeholder="Your organization name"
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                        style={{
                          background: "rgba(20,25,16,0.6)",
                          border: "1px solid rgba(136,144,99,0.15)",
                          color: "#E5D7C4",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(136,144,99,0.4)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(136,144,99,0.15)")}
                      />
                    </div>

                    <div>
                      <label className="block text-xs mb-2" style={{ color: "#889063" }}>
                        Inquiry Type
                      </label>
                      <select
                        value={form.type}
                        onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                        style={{
                          background: "rgba(20,25,16,0.6)",
                          border: "1px solid rgba(136,144,99,0.15)",
                          color: "#E5D7C4",
                        }}
                      >
                        {contactTypes.map((ct) => (
                          <option key={ct.label} value={ct.label}>
                            {ct.label}
                          </option>
                        ))}
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Technical Support">Technical Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs mb-2" style={{ color: "#889063" }}>
                        Message *
                      </label>
                      <textarea
                        required
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder="Tell us about your needs, use case, and organization size..."
                        rows={5}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none transition-all duration-200"
                        style={{
                          background: "rgba(20,25,16,0.6)",
                          border: "1px solid rgba(136,144,99,0.15)",
                          color: "#E5D7C4",
                          lineHeight: 1.7,
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(136,144,99,0.4)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(136,144,99,0.15)")}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-sm tracking-wider transition-all duration-300 hover:scale-105 disabled:opacity-70"
                      style={{
                        background: "linear-gradient(135deg, #889063, #4C3D19)",
                        color: "#E5D7C4",
                        boxShadow: "0 6px 24px rgba(136,144,99,0.3)",
                      }}
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
