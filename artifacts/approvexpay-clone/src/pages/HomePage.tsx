import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  ArrowRight, Building2, BarChart3, ShieldCheck,
  Calendar as CalendarIcon, Zap, Shuffle, Layers,
  TrendingDown, AlertTriangle, Users, DollarSign, ChevronRight,
  Mail, Phone, Linkedin
} from "lucide-react";
import { BookingModal } from "@/components/BookingModal";
import { ContactModal } from "@/components/ContactModal";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function fmtRevenue(millions: number): string {
  if (millions >= 1000) return `$${(millions / 1000).toFixed(1)}B`;
  if (millions > 0) return `$${millions}M`;
  return "$0";
}

function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${Math.round(value)}`;
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const [monthlyRevMil, setMonthlyRevMil] = useState(500);
  const [failureRate, setFailureRate] = useState(8);
  const [recoveryPct, setRecoveryPct] = useState(60);

  const monthlyRevValue = monthlyRevMil * 1_000_000;
  const leakageMonthly = monthlyRevValue * (failureRate / 100);
  const recoverableMonthly = leakageMonthly * (recoveryPct / 100);
  const recoverableAnnual = recoverableMonthly * 12;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const problemCards = [
    { icon: <Building2 className="w-6 h-6 text-cyan-400" />, pct: "38%", title: "Single PSP Dependency", desc: "Relying on one payment provider creates systemic fragility. Downtime or issuer mismatches cascade into unnecessary declines." },
    { icon: <Zap className="w-6 h-6 text-yellow-400" />, pct: "24%", title: "No Retry Logic", desc: "Blanket retry strategies that ignore decline codes waste attempts and increase false positive fraud rates with issuers." },
    { icon: <Shuffle className="w-6 h-6 text-blue-400" />, pct: "19%", title: "Poor Acquirer Routing", desc: "Routing without BIN-level intelligence or real-time success rate data leaves authorization gains on the table." },
    { icon: <Layers className="w-6 h-6 text-purple-400" />, pct: "14%", title: "Missing Orchestration Layer", desc: "Without a payment orchestration layer, you have no fallback, no intelligent failover, and no real-time adaptability." },
    { icon: <BarChart3 className="w-6 h-6 text-emerald-400" />, pct: "5%", title: "Limited Analytics Visibility", desc: "Without granular decline code analysis and conversion funnel visibility, teams can't identify or fix the right problems." },
  ];

  const businessImpactCards = [
    { icon: <TrendingDown className="w-5 h-5 text-red-400" />, stat: "$50K–$3M+", title: "Hidden Revenue Leakage", desc: "Avoidable failed transactions represent recoverable revenue — often invisible in standard reporting dashboards." },
    { icon: <BarChart3 className="w-5 h-5 text-orange-400" />, stat: "–5–15%", title: "Conversion Rate Erosion", desc: "Failed checkouts don't just lose transactions — they lose customers permanently to competitors with smoother payment flows." },
    { icon: <Users className="w-5 h-5 text-yellow-400" />, stat: "10–25%", title: "High Churn", desc: "Payment failure at checkout creates lasting brand damage. Frustrated customers rarely retry — they leave and don't return." },
    { icon: <DollarSign className="w-5 h-5 text-red-300" />, stat: "+10–30% CAC", title: "Increased Acquisition Pressure", desc: "When good customers churn due to payment failures, the cost to replace them through acquisition compounds the loss." },
  ];

  const services = [
    {
      num: "01", title: "Revenue Recovery & Approval Uplift",
      sub: "Increase payment authorization approvals and recover hidden revenue.",
      highlights: ["2–8% approval uplift opportunity", "Multi-million dollar revenue recovery"],
      whatWeDo: ["Analyze decline patterns", "Identify false decline opportunities", "Improve approval rates across geographies", "Optimize authorization performance", "Recover lost revenue"],
      deliverables: ["Approval uplift roadmap", "Decline analysis", "Issuer/acquirer optimization recommendations", "KPI dashboard recommendations"]
    },
    {
      num: "02", title: "Payment Orchestration Strategy & Build",
      sub: "Design scalable payment architecture for performance and resilience.",
      highlights: ["3–10% approval improvement in multi-PSP environments", "Reduced payment failure concentration"],
      whatWeDo: ["Multi-PSP strategy", "Acquirer optimization", "Routing architecture", "Failover design", "Token strategy", "Smart retry framework"],
      deliverables: ["Orchestration blueprint", "Vendor evaluation support", "Routing logic design", "Future-state architecture"]
    },
    {
      num: "03", title: "Decline Diagnostic Assessment",
      sub: "Identify where and why approvals are failing.",
      highlights: ["20–40% recoverable decline opportunities", "Visibility into issuer, routing, and retry inefficiencies"],
      whatWeDo: ["Decline code analysis", "Decline categorization by root cause", "Issuer trend analysis", "BIN-level diagnostics"],
      deliverables: ["Root cause report", "Revenue leakage assessment", "Prioritized optimization actions"]
    },
    {
      num: "04", title: "Intelligent Routing Strategy",
      sub: "Route transactions dynamically to maximize approval probability.",
      highlights: ["2–6% approval uplift", "Reduced cross-border decline concentration"],
      whatWeDo: ["Acquirer routing optimization", "BIN routing", "Geographic routing", "Cost-performance balancing", "Retry routing logic"],
      deliverables: ["Routing decision framework", "Performance optimization matrix", "Routing recommendation engine logic"]
    },
    {
      num: "05", title: "Smart Retry Optimization",
      sub: "Recover failed payments intelligently.",
      highlights: ["10–20% soft-declined transactions recovered", "Improved subscription payment recovery rates"],
      whatWeDo: ["Retry timing optimization", "Issuer-aware retry strategy", "Retry logic segmentation", "Subscription retry strategy"],
      deliverables: ["Retry playbook", "Recovery optimization framework", "Retry sequencing strategy"]
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-50 selection:bg-blue-500/30 font-sans overflow-x-hidden">

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#030712]/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"} py-4`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <img src="https://hercules-cdn.com/file_E2Kto5hqQfdbFSbDy30zHMdC" alt="ApproveXPay" className="h-8 rounded-full" />
            <span className="font-serif text-xl font-bold tracking-wide">ApproveXPay</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
            <button onClick={() => scrollTo("problem")} className="hover:text-white transition-colors">Problem</button>
            <button onClick={() => scrollTo("business-impact")} className="hover:text-white transition-colors">Business Impact</button>
            <button onClick={() => scrollTo("services")} className="hover:text-white transition-colors">Services</button>
            <button onClick={() => scrollTo("engagement-model")} className="hover:text-white transition-colors">Engagement Model</button>
            <button onClick={() => scrollTo("why-us")} className="hover:text-white transition-colors">Why Us</button>
            <button onClick={() => scrollTo("outcomes")} className="hover:text-white transition-colors">Outcomes</button>
            <button onClick={() => setContactOpen(true)} className="hover:text-white transition-colors text-cyan-400">Contact Us</button>
          </div>
          <Button onClick={() => setBookingOpen(true)} className="hidden md:flex bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full px-6 py-2 h-auto font-medium shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-white/10">
            Book a Free Audit <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </nav>

      {/* FLOATING CTA */}
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 50 }} className="fixed bottom-6 right-6 z-50 pointer-events-none">
        <Button onClick={() => setBookingOpen(true)} className="pointer-events-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full px-6 py-6 font-medium shadow-[0_0_30px_rgba(37,99,235,0.4)] border border-white/10">
          Book a Free Audit
        </Button>
      </motion.div>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-semibold tracking-wider text-white/80">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Approval Uplift | Increased Revenue
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-[clamp(3rem,5vw,4.5rem)] leading-[1.1] font-serif font-extrabold tracking-tight">
                Your payment stack<br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">is leaking millions.</span><br />
                We recover it.
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-[520px] leading-relaxed">
                5—15% of transactions fail across fintech and e-commerce platforms. A significant portion is avoidable. We identify the root causes and build the orchestration layer to recover that revenue — systematically. <span className="text-red-400 font-semibold">Inaction cost businesses significantly! Act Now!</span>
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button onClick={() => setBookingOpen(true)} className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl px-8 py-6 text-lg font-medium shadow-[0_0_30px_rgba(37,99,235,0.3)] border border-white/10">
                  <CalendarIcon className="w-5 h-5 mr-2" /> Book a Free Audit
                </Button>
                <Button variant="outline" onClick={() => scrollTo("quantify")} className="bg-white/5 hover:bg-white/10 text-white border-white/10 rounded-xl px-8 py-6 text-lg font-medium backdrop-blur-sm">
                  Quantify Your Loss <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>

            {/* HERO CARD — BIG IMPACT STATEMENT */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative lg:ml-auto w-full max-w-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-[24px] blur-2xl" />
              <div className="relative bg-white/[0.04] border border-white/10 rounded-[24px] p-8 backdrop-blur-xl shadow-2xl">
                <div className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-6">Business Impact That Matters</div>
                <div className="rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 p-7 text-center space-y-4">
                  <div className="text-5xl md:text-6xl font-serif font-extrabold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent leading-none">$1M+</div>
                  <p className="text-white/90 text-lg font-semibold leading-snug">incremental annual revenue loss</p>
                  <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                  <p className="text-white/60 text-sm leading-relaxed">
                    <span className="text-cyan-300 font-bold">1% approval uplift</span> can generate <span className="text-emerald-300 font-bold">$1M+ incremental annual revenue</span> for merchants processing <span className="text-white font-semibold">$100M</span> per month.
                  </p>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-lg font-serif text-emerald-400 font-bold">2–8%</div>
                    <div className="text-[10px] text-white/50 mt-0.5">Approval Uplift</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-lg font-serif text-cyan-400 font-bold">4 wks</div>
                    <div className="text-[10px] text-white/50 mt-0.5">To First Results</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-lg font-serif text-yellow-400 font-bold">20+</div>
                    <div className="text-[10px] text-white/50 mt-0.5">Yrs Experience</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section id="problem" className="py-20 bg-[#0a0f1e]">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-3 block">The Problem</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Failed payments aren't always genuine declines.</h2>
            <p className="text-lg text-white/60 max-w-3xl">Most payment failures are misdiagnosed as customer issues. The real cause is operational — and fixable.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {problemCards.map((card, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-white/[0.03] border border-white/10 rounded-[16px] p-5 hover:bg-white/[0.05] transition-colors flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  {card.icon}
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-serif font-extrabold text-red-400">{card.pct}</span>
                    <span className="text-xs text-white/40 font-semibold">failures</span>
                  </div>
                </div>
                <h3 className="text-base font-bold text-white/90">{card.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed flex-grow">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS IMPACT SECTION */}
      <section id="business-impact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-3 block">Business Impact</span>
            <h2 className="text-3xl md:text-4xl font-serif font-extrabold mb-2">The Business Impact Is Larger Than You Think</h2>
            <p className="text-white/55 text-lg">Hidden revenue leakage compounds across every growth metric.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {businessImpactCards.map((card, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-[#0d1220] border border-white/8 rounded-[18px] p-6 flex flex-col gap-3 hover:border-white/15 transition-colors">
                <div>{card.icon}</div>
                <div className="text-2xl font-serif font-extrabold text-red-400">{card.stat}</div>
                <h4 className="font-bold text-white/95 text-sm">{card.title}</h4>
                <p className="text-sm text-white/50 leading-relaxed flex-grow">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* QUANTIFY YOUR LOSS — moved here from standalone section */}
          <div id="quantify" className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none rounded-[32px]" />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-3 block">Quantify Your Loss</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-3">Calculate Your Revenue Leakage</h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">Estimate how much revenue your payment stack is losing — and how much you could recover.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/[0.03] border border-white/10 rounded-[24px] p-7 space-y-7">
                  <h3 className="text-base font-bold text-white/70">Your Payment Stats</h3>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-baseline">
                      <Label className="text-white/65 text-sm font-semibold">Monthly Revenue Processed</Label>
                      <span className="text-cyan-400 font-bold">{fmtRevenue(monthlyRevMil)}</span>
                    </div>
                    <input type="range" min={0} max={10000} step={50} value={monthlyRevMil} onChange={(e) => setMonthlyRevMil(Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-cyan-400 bg-white/10" />
                    <div className="flex justify-between text-xs text-white/25"><span>$0</span><span>$10B</span></div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-baseline">
                      <Label className="text-white/65 text-sm font-semibold">Current Failure Rate</Label>
                      <span className="text-red-400 font-bold">{failureRate}%</span>
                    </div>
                    <input type="range" min={1} max={50} step={0.5} value={failureRate} onChange={(e) => setFailureRate(Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-red-400 bg-white/10" />
                    <div className="flex justify-between text-xs text-white/25"><span>1%</span><span>50%</span></div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-baseline">
                      <Label className="text-white/65 text-sm font-semibold">Failure Recovery</Label>
                      <span className="text-emerald-400 font-bold">{recoveryPct}%</span>
                    </div>
                    <input type="range" min={1} max={80} step={1} value={recoveryPct} onChange={(e) => setRecoveryPct(Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-emerald-400 bg-white/10" />
                    <div className="flex justify-between text-xs text-white/25"><span>1%</span><span>80%</span></div>
                    <p className="text-xs text-white/35">Industry benchmark: 55–65% of failures are recoverable</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex-1 bg-gradient-to-br from-red-900/30 to-red-950/30 border border-red-500/20 rounded-[20px] p-6 flex flex-col justify-center">
                    <p className="text-red-300 text-xs font-semibold uppercase tracking-wider mb-1">Monthly Revenue Leakage</p>
                    <div className="text-4xl font-serif font-extrabold text-red-300 mb-1">{formatCurrency(leakageMonthly)}</div>
                    <p className="text-white/40 text-sm">Lost to failed transactions each month</p>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 border border-emerald-500/20 rounded-[20px] p-6 flex flex-col justify-center">
                    <p className="text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-1">Recoverable Monthly</p>
                    <div className="text-4xl font-serif font-extrabold text-emerald-300 mb-1">{formatCurrency(recoverableMonthly)}</div>
                    <p className="text-white/40 text-sm">Potential monthly recovery with orchestration</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/30 border border-cyan-500/30 rounded-[20px] p-5 text-center">
                    <p className="text-cyan-300 text-xs font-semibold mb-1">Annual Recovery Opportunity</p>
                    <div className="text-3xl font-serif font-extrabold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">{formatCurrency(recoverableAnnual)}</div>
                    <Button onClick={() => setBookingOpen(true)} className="mt-4 w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl py-5 font-semibold shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                      <CalendarIcon className="w-4 h-4 mr-2" /> Recover This Revenue
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 bg-[#0a0f1e]">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-3 block">Services</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">End-to-end payment revenue recovery.</h2>
          </motion.div>
          <div className="space-y-4">
            {services.map((svc, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-white/[0.02] border border-white/10 rounded-[20px] p-7 hover:border-white/15 transition-colors">
                <div className="grid lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-4">
                    <div className="text-cyan-400 text-sm font-bold mb-2">Service {svc.num}</div>
                    <h3 className="text-2xl font-serif font-bold mb-2">{svc.title}</h3>
                    <p className="text-white/55 text-sm mb-4">{svc.sub}</p>
                    <div className="space-y-1.5">
                      {svc.highlights.map((h, j) => (
                        <div key={j} className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" /> {h}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-4">
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">What We Do</p>
                    <ul className="space-y-1.5">
                      {svc.whatWeDo.map((w, j) => (
                        <li key={j} className="text-sm text-white/65 flex gap-2"><span className="text-white/30">—</span>{w}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-4">
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Deliverables</p>
                    <ul className="space-y-1.5">
                      {svc.deliverables.map((d, j) => (
                        <li key={j} className="text-sm text-white/65 flex gap-2"><span className="text-white/30">—</span>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODEL (formerly Process) */}
      <section id="engagement-model" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-3 block">Engagement Model</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">From audit to outcomes in 8 weeks.</h2>
            <p className="text-lg text-white/60 max-w-3xl">We don't just deliver decks. We work alongside your engineering and product teams to implement changes with a bias for rapid, measurable improvements.</p>
          </motion.div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-6 md:left-[39px] top-4 bottom-4 w-px bg-white/10" />
            <div className="space-y-10">
              {[
                { step: "01", time: "Week 1–2", title: "Discovery & Audit", desc: "Deep-dive into your transaction data, PSP setup, and current decline patterns. We map every failure mode." },
                { step: "02", time: "Week 2–3", title: "Revenue Leakage Assessment", desc: "Quantify the recoverable opportunity by decline code, market, and payment method." },
                { step: "03", time: "Week 3–4", title: "Orchestration Design", desc: "Blueprint the multi-PSP architecture, routing rules, retry sequences, and monitoring framework." },
                { step: "04", time: "Week 4–8", title: "Implementation & Go-Live", desc: "Work alongside your team to deploy, test, and validate the new orchestration layer." },
                { step: "05", time: "Ongoing", title: "Ongoing Optimisation", desc: "Continuous performance monitoring, A/B testing of routing rules, and regular strategy reviews." },
              ].map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="relative pl-20 md:pl-32">
                  <div className="absolute left-0 md:left-4 top-1 w-12 h-12 rounded-full bg-[#030712] border-2 border-cyan-500/50 flex items-center justify-center font-serif font-bold text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    {item.step}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">{item.time}</span>
                  </div>
                  <p className="text-white/55 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section id="why-us" className="py-20 bg-[#0a0f1e]">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 text-center max-w-3xl mx-auto">
            <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-3 block">Why Us</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-3">Payments expertise that moves the needle.</h2>
            <p className="text-lg text-white/60">Payments Revenue Uplift Advisory</p>
          </motion.div>
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-[24px] p-8">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-6">
                <img src="/manish-gupta.jpeg" alt="Manish Gupta" className="w-24 h-24 rounded-2xl object-cover object-top border-2 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-1">Manish Gupta</h3>
                  <p className="text-cyan-400 font-medium text-sm">Founder & CEO, ApproveXPay • Oxford MBA</p>
                </div>
              </div>
              <blockquote className="border-l-2 border-cyan-500/40 pl-4 mb-6 text-white/75 italic leading-relaxed text-[15px]">
                "I built ApproveXPay after watching millions of dollars in legitimate payments get declined at companies I worked with. The problem is real, it's fixable, and that's exactly what we do."
              </blockquote>
              <ul className="space-y-3 mb-6 text-sm text-white/65">
                <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />Experience in high-volume (10M+ txns/month) and low-latency (sub 2-second approval) payment systems</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />Hands-on experience across US, Europe, MENA and APAC markets</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />Measurable (~5%) approval rate improvement through routing optimization, retry strategies and issuer-level insights</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                {["Oxford MBA", "Ex Mastercard", "Ex Bank of America", "20+ Years Experience"].map(badge => (
                  <span key={badge} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium">{badge}</span>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
              {[
                { title: "Deep Payments Domain Expertise", sub: "20 Years Experience", desc: "Two decades navigating the complexities of global payment networks, issuer behaviour, and authorization optimization across markets and verticals." },
                { title: "Large-Scale Transaction Ecosystems", sub: "$20B monthly volume at Mastercard Payment Gateway", desc: "Direct experience managing and optimizing payment flows at extraordinary scale — giving us unmatched perspective on what breaks at volume." },
                { title: "Practical Implementation Focus", sub: "Led Global Mastercard Payment Gateway", desc: "We don't stop at strategy. We embed with your team and drive hands-on implementation of orchestration layers, routing rules, and retry frameworks." },
                { title: "Executive Advisory Capability", sub: "Director, Mastercard Payment Gateway Services", desc: "Board-level communication — we translate technical payment improvements into business outcomes that executives and investors understand." },
              ].map((diff, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[18px] p-5 hover:border-white/10 transition-colors">
                  <h4 className="text-base font-bold mb-1 text-white/90">{diff.title}</h4>
                  <p className="text-cyan-400 text-xs font-semibold mb-2">{diff.sub}</p>
                  <p className="text-white/55 text-sm leading-relaxed">{diff.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUTCOMES / TESTIMONIALS */}
      <section id="outcomes" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 text-center">
            <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-3 block">Client Outcomes</span>
            <h2 className="text-4xl md:text-5xl font-serif">Results our clients see.</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-7 max-w-5xl mx-auto">
            {[
              { text: "Manish identified $2.3M in recoverable revenue within the first two weeks of our audit. His understanding of BIN-level routing and issuer behavior is unlike anything we'd encountered. We recovered 14% of previously failed transactions within 6 weeks.", author: "VP Engineering", company: "Series B Fintech" },
              { text: "Our cross-border approval rates were a persistent board-level concern. Manish designed an orchestration strategy covering 12 markets and 6 PSPs that lifted our international authorization rate by 18.5%. The depth of payments expertise here is exceptional.", author: "Head of Payments", company: "Global E-Commerce Marketplace" }
            ].map((t, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white/[0.02] border border-white/10 rounded-[18px] p-8 flex flex-col">
                <div className="text-cyan-400 text-4xl font-serif mb-3 leading-none">"</div>
                <p className="text-lg text-white/75 leading-relaxed mb-7 flex-grow">{t.text}</p>
                <div className="mt-auto border-t border-white/10 pt-4">
                  <p className="font-bold text-white/90">{t.author}</p>
                  <p className="text-sm text-cyan-400">{t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#080d1a] border-t border-white/5 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src="https://hercules-cdn.com/file_E2Kto5hqQfdbFSbDy30zHMdC" alt="ApproveXPay" className="h-8 rounded-full" />
                <span className="font-serif text-lg font-bold">ApproveXPay</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                Payments Revenue Uplift Advisory. We help fintechs, e-commerce platforms, and digital businesses recover lost revenue from failed transactions through orchestration, smart routing, and intelligent retries.
              </p>
              <div className="space-y-2.5 text-sm text-white/55">
                <a href="mailto:contact@approvexpay.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                  <Mail className="w-4 h-4 text-cyan-400" /> contact@approvexpay.com
                </a>
                <a href="tel:+917559459078" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                  <Phone className="w-4 h-4 text-emerald-400" /> +91 75594 59078
                </a>
                <a href="https://linkedin.com/in/manishoxfordmba" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                  <Linkedin className="w-4 h-4 text-blue-400" /> linkedin.com/in/manishoxfordmba
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-5">Services</h4>
              <ul className="space-y-3 text-sm text-white/60">
                {["Payments Audit", "Approval Optimization", "Orchestration Strategy", "Smart Routing"].map(s => (
                  <li key={s}><button onClick={() => scrollTo("services")} className="hover:text-white transition-colors">{s}</button></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-5">Company</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li><button onClick={() => scrollTo("problem")} className="hover:text-white transition-colors">The Problem</button></li>
                <li><button onClick={() => scrollTo("why-us")} className="hover:text-white transition-colors">Our Approach</button></li>
                <li><button onClick={() => scrollTo("engagement-model")} className="hover:text-white transition-colors">Engagement Model</button></li>
                <li><button onClick={() => scrollTo("outcomes")} className="hover:text-white transition-colors">Client Outcomes</button></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-5">Contact</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li><button onClick={() => setContactOpen(true)} className="hover:text-white transition-colors">Send a Message</button></li>
                <li><a href="https://linkedin.com/in/manishoxfordmba" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 space-y-2">
            <p className="text-white/25 text-xs italic">* Numbers are approximate and representative; actual numbers vary from client to client.</p>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <p className="text-white/35 text-xs">© 2026 ApproveXPay. All rights reserved. | Manish Gupta, Oxford MBA</p>
              <p className="text-white/25 text-xs">Built for fintech leaders who demand more.</p>
            </div>
          </div>
        </div>
      </footer>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}
