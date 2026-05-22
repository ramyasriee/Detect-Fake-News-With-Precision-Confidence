import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Loader2, CheckCircle2, XCircle } from "lucide-react";

// Shape returned by /api/predict (mirrors backend.py PredictResponse)
interface SubScore {
  label: string;
  score: number;
  max: number;
}

interface ApiResult {
  verdict: string;
  score: number;
  analysis: SubScore[];
  flags: string[];
  word_count: number;
  clean_word_count: number;
}

// UI-ready result (adds color + icon derived client-side from verdict)
interface DisplayResult extends ApiResult {
  color: string;
  icon: typeof CheckCircle2;
}

const sampleTexts = {
  fake: `BREAKING: Scientists DISCOVER that drinking bleach cures all diseases! Government has been HIDING this for decades! Major pharmaceutical companies TERRIFIED as this simple cure goes viral. Share this before they DELETE it!`,
  real: `The Federal Reserve raised interest rates by 25 basis points on Wednesday, the latest in a series of increases aimed at curbing inflation that has remained above the central bank's 2% target, according to officials who spoke at a press conference following the Federal Open Market Committee meeting.`,
};

export function LiveDemoSection() {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DisplayResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    setError(null);
    setProgress(0);

    // Animate progress bar while waiting for the API
    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? 90 : p + 5));
    }, 100);

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data: ApiResult = await res.json();

      clearInterval(interval);
      setProgress(100);

      const isCredible = data.verdict === "CREDIBLE";
      setResult({
        ...data,
        color: isCredible ? "#889063" : "#dc5050",
        icon: isCredible ? CheckCircle2 : XCircle,
      });
    } catch (err) {
      clearInterval(interval);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to reach the prediction server. Make sure backend.py is running."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section
      id="demo"
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #1a2116 0%, #1e2418 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#889063" }}>
              Live Demo
            </p>
            <h2
              className="mb-5"
              style={{
                color: "#E5D7C4",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Try It{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #CFBB99, #889063)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Right Now
              </span>
            </h2>
            <p style={{ color: "#889063", lineHeight: 1.7 }}>
              Paste any article text or try one of our sample inputs below
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(30,36,24,0.7)",
            border: "1px solid rgba(136,144,99,0.15)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          }}
        >
          {/* Input area */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm tracking-wider" style={{ color: "#CFBB99" }}>
                Content to Analyze
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setText(sampleTexts.fake)}
                  className="px-3 py-1.5 rounded-lg text-xs tracking-wider transition-all duration-200 hover:scale-105"
                  style={{
                    background: "rgba(220,80,80,0.1)",
                    border: "1px solid rgba(220,80,80,0.2)",
                    color: "#dc9090",
                  }}
                >
                  Sample: Fake
                </button>
                <button
                  onClick={() => setText(sampleTexts.real)}
                  className="px-3 py-1.5 rounded-lg text-xs tracking-wider transition-all duration-200 hover:scale-105"
                  style={{
                    background: "rgba(136,144,99,0.1)",
                    border: "1px solid rgba(136,144,99,0.2)",
                    color: "#889063",
                  }}
                >
                  Sample: Real
                </button>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste article text, a URL, or any news content here..."
              rows={5}
              className="w-full rounded-xl p-4 text-sm resize-none outline-none transition-all duration-200"
              style={{
                background: "rgba(20,25,16,0.6)",
                border: "1px solid rgba(136,144,99,0.15)",
                color: "#E5D7C4",
                lineHeight: 1.7,
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(136,144,99,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(136,144,99,0.15)")}
            />

            {/* Progress bar */}
            {isAnalyzing && (
              <div className="mt-3">
                <div
                  className="h-1 rounded-full overflow-hidden"
                  style={{ background: "rgba(136,144,99,0.1)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #889063, #CFBB99)",
                      width: `${progress}%`,
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <p className="text-xs mt-2 text-center" style={{ color: "#889063" }}>
                  Analyzing content... {progress}%
                </p>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div
                className="mt-3 px-4 py-3 rounded-xl text-sm"
                style={{
                  background: "rgba(220,80,80,0.08)",
                  border: "1px solid rgba(220,80,80,0.2)",
                  color: "#dc9090",
                }}
              >
                âš  {error}
              </div>
            )}

            <div className="flex justify-between items-center mt-4">
              <p className="text-xs" style={{ color: "#889063", opacity: 0.6 }}>
                {text.length} characters Â· Powered by real ML model (99.84% accuracy)
              </p>
              <button
                onClick={analyze}
                disabled={!text.trim() || isAnalyzing}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm tracking-wider transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #889063, #4C3D19)",
                  color: "#E5D7C4",
                  boxShadow: "0 4px 16px rgba(136,144,99,0.3)",
                }}
              >
                {isAnalyzing ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                {isAnalyzing ? "Analyzing..." : "Analyze Now"}
              </button>
            </div>
          </div>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="mx-8 mb-8 rounded-2xl overflow-hidden"
                  style={{
                    border: `1px solid ${result.color}30`,
                    background: `${result.color}08`,
                  }}
                >
                  {/* Verdict banner */}
                  <div
                    className="px-6 py-4 flex items-center justify-between"
                    style={{
                      background: `${result.color}15`,
                      borderBottom: `1px solid ${result.color}20`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <result.icon size={22} style={{ color: result.color }} />
                      <div>
                        <div className="text-sm tracking-widest uppercase" style={{ color: result.color }}>
                          {result.verdict}
                        </div>
                        <div className="text-xs" style={{ color: "#889063" }}>
                          Overall Credibility Score
                        </div>
                      </div>
                    </div>
                    <div
                      className="text-4xl"
                      style={{
                        color: result.color,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {Math.round(result.score)}
                      <span className="text-lg">/100</span>
                    </div>
                  </div>

                  <div className="p-6 grid md:grid-cols-2 gap-6">
                    {/* Breakdown bars */}
                    <div>
                      <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#CFBB99" }}>
                        Analysis Breakdown
                      </p>
                      <div className="space-y-3">
                        {result.analysis.map((item, i) => (
                          <div key={i}>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs" style={{ color: "#889063" }}>
                                {item.label}
                              </span>
                              <span className="text-xs" style={{ color: result.color }}>
                                {item.score}%
                              </span>
                            </div>
                            <div
                              className="h-1.5 rounded-full overflow-hidden"
                              style={{ background: "rgba(136,144,99,0.1)" }}
                            >
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: result.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${item.score}%` }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Flags */}
                    <div>
                      <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#CFBB99" }}>
                        Detection Signals
                      </p>
                      <div className="space-y-2">
                        {result.flags.map((flag, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                              style={{ background: `${result.color}20` }}
                            >
                              <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: result.color }}
                              />
                            </div>
                            <span className="text-xs" style={{ color: "#889063" }}>
                              {flag}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
