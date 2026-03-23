import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  CheckCircle2,
  AlertCircle,
  Search,
  Cpu,
  Globe,
  Zap,
  ChevronDown,
  ChevronUp,
  Mail,
  ArrowRight,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import BlogHub from "./components/BlogHub";
import BlogPost from "./components/BlogPost";

// --- Types ---
interface ChecklistItem {
  id: string;
  label: string;
  description: string;
}

// --- Constants ---
const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "schema",
    label: "Schema.org Markup",
    description:
      "Structured data that tells LLMs exactly what your business does.",
  },
  {
    id: "nap",
    label: "NAP Consistency",
    description: "Identical Name, Address, and Phone across all directories.",
  },
  {
    id: "llm_content",
    label: "LLM-Friendly Content",
    description: "Clear, authoritative text with semantic headings (H1-H3).",
  },
  {
    id: "gbp",
    label: "Google Business Profile",
    description: "Fully optimized profile with recent reviews and photos.",
  },
  {
    id: "backlinks",
    label: "Authority Backlinks",
    description: "Links from local or industry-relevant authoritative sites.",
  },
  {
    id: "speed",
    label: "Page Load Speed",
    description:
      "Fast loading times to ensure AI crawlers can index you efficiently.",
  },
  {
    id: "mobile",
    label: "Mobile Responsiveness",
    description:
      "A site that works perfectly on all devices (crucial for AI search).",
  },
  {
    id: "semantic",
    label: "Semantic HTML",
    description: "Using proper tags like <article>, <section>, and <nav>.",
  },
];

const FAQS = [
  {
    q: "How does my business show up in ChatGPT?",
    a: "ChatGPT and other LLMs use 'Search Augmented Generation' (like SearchGPT). They crawl the web for authoritative, structured data. If your site lacks proper Schema markup or has inconsistent NAP data, ChatGPT may ignore you or provide hallucinated information to potential customers.",
  },
  {
    q: "What is Generative Engine Optimization (GEO)?",
    a: "GEO is the evolution of SEO. While SEO focuses on ranking in a list of links, GEO focuses on being the 'cited source' in an AI-generated answer. It requires high information density, clear entity relationships, and structured data that AI models can easily parse and trust.",
  },
  {
    q: "Why is my business invisible to Perplexity?",
    a: "Perplexity relies heavily on real-time indexing and authoritative citations. If your business isn't mentioned in high-authority local directories or lacks a clear semantic footprint on your own domain, Perplexity's engine won't find enough 'evidence' to recommend you in its answers.",
  },
  {
    q: "How do Google AI Overviews affect local SEO?",
    a: "Google AI Overviews (SGE) push traditional organic results further down. To appear in the 'carousel' or the AI summary, your content must directly answer user intent with high clarity. Local businesses must focus on 'Answer Engine Optimization' to capture this top-of-page real estate.",
  },
  {
    q: "What is the difference between AEO and SEO?",
    a: "SEO is about keywords and ranking; AEO (Answer Engine Optimization) is about providing the definitive answer to a query. AEO requires more structured data, direct 'how-to' or 'what-is' content blocks, and a focus on becoming a trusted entity in the Knowledge Graph.",
  },
];

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 glass-card border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
          <Cpu className="text-slate-950 w-5 h-5" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight">
          LocalMighty
        </span>
      </Link>
      <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
        <Link to="/#audit" className="hover:text-cyan-400 transition-colors">
          AI Audit
        </Link>
        <Link to="/blog" className="hover:text-cyan-400 transition-colors">
          Blog
        </Link>
        <Link to="/#faq" className="hover:text-cyan-400 transition-colors">
          AEO FAQ
        </Link>
        <Link to="/#pricing" className="hover:text-cyan-400 transition-colors">
          Pricing
        </Link>
      </div>
      <Link
        to="/#audit"
        className="bg-cyan-500 text-slate-950 px-4 py-2 rounded-full text-sm font-bold hover:bg-cyan-400 transition-all cyan-glow"
      >
        Free Audit
      </Link>
    </div>
  </nav>
);

const Hero = () => (
  <section className="pt-32 pb-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6 border border-cyan-500/20">
          The Future of Local Search
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Is Your Business <span className="text-cyan-500">Invisible</span> to
          AI Search?
        </h1>
        <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          ChatGPT, Perplexity, and Google AI Overviews are changing how
          customers find you. If your site isn't "AI-Readable," you don't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#audit"
            className="bg-cyan-500 text-slate-950 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform cyan-glow flex items-center justify-center gap-2"
          >
            Audit Your Visibility <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#faq"
            className="bg-slate-900 border border-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            Learn About AEO
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const AuditTool = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [hasScanned, setHasScanned] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleItem = (id: string) => {
    if (isScanning) return;
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const score = Math.round(
    (Object.values(checked).filter(Boolean).length / CHECKLIST_ITEMS.length) *
      100,
  );

  const getScoreColor = () => {
    if (score < 40) return "text-red-500";
    if (score < 70) return "text-yellow-500";
    return "text-emerald-500";
  };

  const startScan = () => {
    if (Object.values(checked).filter(Boolean).length === 0) {
      alert("Please check at least one item to analyze.");
      return;
    }
    setIsScanning(true);
    setScanProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          setHasScanned(true);
          setShowForm(true);
        }, 500);
      }
    }, 40); // ~2 seconds total
  };

  const handleBuyClick = () => {
    console.log("Tracking Buy Click for Supabase");
    window.open("https://gum.new/gum/cmmbci548001504jvcuv8dn4o", "_blank");
  };

  return (
    <section id="audit" className="py-24 px-4 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan-500 font-bold text-xs uppercase tracking-[0.2em] mb-4 block"
          >
            Diagnostic Engine v2.4
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            AI-Readability Audit
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Select the optimization layers you have currently deployed. Our
            engine will calculate your visibility across ChatGPT, Perplexity,
            and Google AI.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Checklist Side */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {CHECKLIST_ITEMS.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleItem(item.id)}
                  className={`group relative p-5 rounded-2xl cursor-pointer transition-all border-2 flex flex-col gap-3 ${
                    checked[item.id]
                      ? "bg-cyan-500/5 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                      : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                  } ${isScanning ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        checked[item.id]
                          ? "bg-cyan-500 text-slate-950"
                          : "bg-slate-800 text-slate-500 group-hover:bg-slate-700"
                      }`}
                    >
                      {checked[item.id] ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <BarChart3 className="w-5 h-5" />
                      )}
                    </div>
                    {checked[item.id] && (
                      <span className="text-[10px] font-black uppercase text-cyan-500 tracking-widest">
                        Active
                      </span>
                    )}
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-sm mb-1 transition-colors ${checked[item.id] ? "text-cyan-400" : "text-slate-200"}`}
                    >
                      {item.label}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {!hasScanned && !isScanning && (
              <button
                onClick={startScan}
                className="w-full mt-8 bg-slate-50 text-slate-950 font-bold py-5 rounded-2xl hover:bg-cyan-400 hover:text-slate-950 transition-all flex items-center justify-center gap-3 group"
              >
                Run Deep-Scan Analysis{" "}
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            )}
          </div>

          {/* Results Side */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            <div className="glass-card p-10 rounded-3xl text-center relative overflow-hidden border-slate-800/50">
              {/* Scanning Overlay */}
              <AnimatePresence>
                {isScanning && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-20 flex flex-col items-center justify-center p-8"
                  >
                    <div className="relative mb-8">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          ease: "linear",
                        }}
                        className="w-24 h-24 border-t-2 border-r-2 border-cyan-500 rounded-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Cpu className="w-8 h-8 text-cyan-500 animate-pulse" />
                      </div>
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2">
                      Analyzing Entities...
                    </h3>
                    <p className="text-xs text-slate-500 uppercase tracking-[0.3em] mb-6">
                      Cross-Referencing LLM Nodes
                    </p>
                    <div className="w-full max-w-xs bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        className="bg-cyan-500 h-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${scanProgress}%` }}
                      />
                    </div>
                    <span className="text-cyan-500 font-mono text-xs mt-3">
                      {scanProgress}%
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <h3 className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-8">
                AI Visibility Index
              </h3>

              <div className="relative inline-block mb-8">
                <svg className="w-56 h-56 transform -rotate-90">
                  <circle
                    cx="112"
                    cy="112"
                    r="100"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="transparent"
                    className="text-slate-800/50"
                  />
                  <motion.circle
                    cx="112"
                    cy="112"
                    r="100"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={628.3}
                    initial={{ strokeDashoffset: 628.3 }}
                    animate={{
                      strokeDashoffset: 628.3 - (628.3 * score) / 100,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`${getScoreColor()} transition-colors duration-500`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    key={score}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`text-6xl font-display font-bold ${getScoreColor()}`}
                  >
                    {score}%
                  </motion.span>
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">
                    Readiness
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {hasScanned ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {score < 80 ? (
                      <div className="mb-6 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-left">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <h4 className="text-red-500 font-black text-xs uppercase tracking-wider">
                            Critical Vulnerability
                          </h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Your business entity is failing trust-verification
                          protocols. LLMs are likely prioritizing competitors
                          with higher semantic density.
                        </p>
                        <button
                          onClick={handleBuyClick}
                          className="w-full mt-4 bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 transition-all flex items-center justify-center gap-2 text-sm"
                        >
                          Fix Instantly with AI Kit <Zap className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="mb-6 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-left">
                        <div className="flex items-center gap-3 mb-2">
                          <ShieldCheck className="w-5 h-5 text-emerald-500" />
                          <h4 className="text-emerald-500 font-black text-xs uppercase tracking-wider">
                            Strong Foundation
                          </h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          You are in the top 10% of local businesses. Maintain
                          your lead by deploying the latest 2026 Schema updates.
                        </p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <p className="text-sm text-slate-500 italic">
                    Select your current optimizations to calculate live
                    readiness.
                  </p>
                )}
              </div>
            </div>

            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-8 rounded-3xl border-cyan-500/30 cyan-glow"
                >
                  <h3 className="font-display text-xl font-bold mb-2">
                    Get Your Full AI-Visibility Report ($49)
                  </h3>
                  <p className="text-sm text-slate-400 mb-6">
                    Unlock the complete PDF breakdown of your gaps and a 2026
                    action plan instantly.
                  </p>
                  <button
                    onClick={handleBuyClick}
                    className="w-full bg-cyan-500 text-slate-950 font-bold py-4 rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
                  >
                    Purchase Report Now
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <h3 className="font-display text-lg md:text-xl font-bold group-hover:text-cyan-400 transition-colors">
          {q}
        </h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-cyan-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-600" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 leading-relaxed max-w-3xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => (
  <section id="faq" className="py-20 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          AEO Knowledge Base
        </h2>
        <p className="text-slate-400">
          Direct answers for AI search engines and curious business owners.
        </p>
      </div>
      <div className="space-y-2">
        {FAQS.map((faq, i) => (
          <FAQItem key={i} q={faq.q} a={faq.a} />
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-20 px-4 bg-slate-900/30">
    <div className="max-w-xl mx-auto text-center">
      <h2 className="font-display text-3xl md:text-4xl font-bold mb-12">
        Simple, Transparent Pricing
      </h2>
      <div className="glass-card p-10 rounded-3xl border-cyan-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-black uppercase px-4 py-1 transform rotate-45 translate-x-8 translate-y-4">
          Best Value
        </div>
        <h3 className="text-2xl font-bold mb-2">Instant AI Visibility Kit</h3>
        <p className="text-slate-400 mb-8 text-sm">
          Everything you need to fix your AI visibility in 60 minutes.
        </p>
        <div className="text-6xl font-display font-bold mb-8">
          $49{" "}
          <span className="text-lg text-slate-500 font-sans font-normal">
            /one-time
          </span>
        </div>
        <ul className="text-left space-y-4 mb-10">
          {[
            "Instant AI Readiness Blueprint (PDF Guide)",
            "The 'Copy-Paste' Schema Vault (JSON-LD)",
            "The 2026 Directory Power-List (50+ Sites)",
            "The 'LLM-Friendly' Content Framework",
            "Lifetime Updates & AI Trend Alerts",
          ].map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-sm text-slate-300"
            >
              <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <button
          onClick={() =>
            window.open(
              "https://gum.new/gum/cmmbci548001504jvcuv8dn4o",
              "_blank",
            )
          }
          className="w-full bg-cyan-500 text-slate-950 font-bold py-4 rounded-xl text-lg hover:bg-cyan-400 transition-all cyan-glow"
        >
          Get Instant Access
        </button>
        <p className="mt-4 text-xs text-slate-500">
          Secure payment via Stripe. Instant Digital Delivery.
        </p>
      </div>
    </div>
  </section>
);

const Resources = () => (
  <section id="resources" className="py-20 px-4 border-t border-slate-900">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          AI Search Optimization Resources
        </h2>
        <p className="text-slate-400">
          Mastering the evolution of local search and generative engines.
        </p>
      </div>

      <div className="space-y-12">
        <div className="glass-card p-8 rounded-2xl border-slate-800">
          <h2 className="font-display text-2xl font-bold mb-4 text-cyan-400">
            How to fix AI search invisibility for local shops?
          </h2>
          <p className="text-slate-300 leading-relaxed">
            To fix AI search invisibility, local shops must implement
            comprehensive Schema.org markup, ensure NAP consistency across
            authoritative directories, and create high-information-density
            content. AI models like ChatGPT prioritize structured data and
            verified citations to build trust. Optimizing for semantic relevance
            rather than just keywords is the key to GEO success.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl border-slate-800">
          <h2 className="font-display text-2xl font-bold mb-4 text-cyan-400">
            What is the best Schema markup for ChatGPT Search?
          </h2>
          <p className="text-slate-300 leading-relaxed">
            The best Schema markup for ChatGPT Search includes LocalBusiness,
            FAQPage, and Product types. These structured data formats provide
            clear entity definitions that LLMs use to populate search results.
            Including properties like 'knowsAbout', 'areaServed', and
            'aggregateRating' helps AI models verify your authority and
            recommend your business for specific user intents.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl border-slate-800">
          <h2 className="font-display text-2xl font-bold mb-4 text-cyan-400">
            Why is my business not showing in Google AI Overviews?
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Businesses fail to appear in Google AI Overviews when their content
            lacks clear, direct answers to user queries. Google's SGE
            prioritizes 'Answer Engine Optimization' (AEO). To rank, you must
            use semantic headings (H2-H3), provide concise summaries of complex
            topics, and maintain a high E-E-A-T score through authoritative
            local backlinks and verified business data.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const RecommendedTools = () => (
  <section className="py-20 px-4 border-t border-slate-900 bg-slate-950/20">
    <div className="max-w-5xl mx-auto">
      <h2 className="font-display text-3xl font-bold mb-2 text-white">
        Deploy & Enhance website visibility with these AI-friendly tools
      </h2>
      <p className="text-slate-400 mb-10">
        Create Schemas, LLms.txt, robots.txt, and other essential files for your
        website and get sited on search engines.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Hostinger */}
        <a
          href="https://www.hostinger.com/"
          rel="noopener"
          target="_blank"
          className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-blue-500 transition-all hover:scale-[1.02] glass-card"
        >
          <div className="flex justify-between mb-4">
            <h3 className="font-bold text-lg text-white group-hover:text-blue-400">
              Hostinger Hosting
            </h3>
            <span className="text-[10px] font-black uppercase bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
              Recommended
            </span>
          </div>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
            Deploy your layout instantly with fast hosting and free SSL.
          </p>
          <div className="text-blue-400 font-bold text-sm flex items-center gap-1">
            Deploy your site <ArrowRight className="w-4 h-4" />
          </div>
        </a>

        {/* Bentoflow */}
        <a
          href="https://bentoflow.netlify.app/editor"
          rel="noopener"
          target="_blank"
          className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-purple-500 transition-all hover:scale-[1.02] glass-card"
        >
          <h3 className="font-bold text-lg text-white group-hover:text-purple-400 mb-4">
            Bentoflow
          </h3>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
            Build Bento layouts visually without coding.
          </p>
          <div className="text-purple-400 font-bold text-sm flex items-center gap-1">
            Design visually <ArrowRight className="w-4 h-4" />
          </div>
        </a>

        {/* Namecheap */}
        <a
          href="https://www.namecheap.com/"
          rel="noopener"
          target="_blank"
          className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-emerald-500 transition-all hover:scale-[1.02] glass-card"
        >
          <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 mb-4">
            Namecheap Domains
          </h3>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
            Secure a domain for your new project instantly.
          </p>
          <div className="text-emerald-400 font-bold text-sm flex items-center gap-1">
            Get your domain <ArrowRight className="w-4 h-4" />
          </div>
        </a>

        {/* Envato */}
        <a
          href="https://www.envato.com/"
          rel="noopener"
          target="_blank"
          className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-orange-500 transition-all hover:scale-[1.02] glass-card"
        >
          <h3 className="font-bold text-lg text-white group-hover:text-orange-400 mb-4">
            Envato Elements
          </h3>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
            Icons, UI kits, fonts and assets for production-ready layouts.
          </p>
          <div className="text-orange-400 font-bold text-sm flex items-center gap-1">
            Explore assets <ArrowRight className="w-4 h-4" />
          </div>
        </a>

        {/* Creative Market */}
        <a
          href="https://creativemarket.com/"
          rel="noopener"
          target="_blank"
          className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-pink-500 transition-all hover:scale-[1.02] md:col-span-2 glass-card"
        >
          <h3 className="font-bold text-lg text-white group-hover:text-pink-400 mb-4">
            Creative Market UI Kits
          </h3>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
            Premium templates, icons and interface kits.
          </p>
          <div className="text-pink-400 font-bold text-sm flex items-center gap-1">
            Browse resources <ArrowRight className="w-4 h-4" />
          </div>
        </a>
      </div>

      <p className="text-[10px] text-slate-600 mt-8 uppercase tracking-widest text-center">
        Some links may be affiliate links. We may earn a commission at no extra
        cost to you.
      </p>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-slate-900 px-4">
    <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center">
            <Cpu className="text-slate-950 w-4 h-4" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            LocalMighty
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          LocalMighty is a micro-agency dedicated to helping small businesses
          survive and thrive in the age of AI search. We specialize in GEO, AEO,
          and semantic web optimization.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">
            Links
          </h4>
          <ul className="space-y-2 text-xs text-slate-500">
            <li>
              <Link to="/#audit" className="hover:text-cyan-400">
                Free Audit
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-cyan-400">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/#faq" className="hover:text-cyan-400">
                AEO FAQ
              </Link>
            </li>
            <li>
              <Link to="/#pricing" className="hover:text-cyan-400">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/#resources" className="hover:text-cyan-400">
                Resources
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">
            Legal
          </h4>
          <ul className="space-y-2 text-xs text-slate-500">
            <li>
              <a href="/privacy.html" className="hover:text-cyan-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/about.html" className="hover:text-cyan-400">
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 text-center text-[10px] text-slate-600">
      &copy; {new Date().getFullYear()} LocalMighty. All rights reserved. Built
      for the AI Era.
    </div>
  </footer>
);

// --- Main App ---

const Home = () => (
  <main>
    <Hero />

    {/* Trust Bar */}
    <div className="py-10 border-y border-slate-900 bg-slate-950/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="flex items-center gap-2 font-display font-bold text-xl">
          <Search className="w-6 h-6" /> Google AI
        </div>
        <div className="flex items-center gap-2 font-display font-bold text-xl">
          <Zap className="w-6 h-6" /> ChatGPT
        </div>
        <div className="flex items-center gap-2 font-display font-bold text-xl">
          <Globe className="w-6 h-6" /> Perplexity
        </div>
        <div className="flex items-center gap-2 font-display font-bold text-xl">
          <ShieldCheck className="w-6 h-6" /> Anthropic
        </div>
        <div className="flex items-center gap-2 font-display font-bold text-xl">
          <BarChart3 className="w-6 h-6" /> Meta AI
        </div>
      </div>
    </div>

    <AuditTool />
    <RecommendedTools />
    <FAQ />
    <Pricing />
    <Resources />

    {/* Final CTA */}
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto glass-card p-12 rounded-3xl text-center border-cyan-500/20">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
          Stop Being Invisible.
        </h2>
        <p className="text-slate-400 mb-10 text-lg">
          The AI search revolution is here. Don't let your competitors capture
          the future of local search while you're still stuck in the past.
        </p>
        <a
          href="#audit"
          className="inline-block bg-cyan-500 text-slate-950 px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform cyan-glow"
        >
          Get Your Free AI Audit Now
        </a>
      </div>
    </section>
  </main>
);

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogHub />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
