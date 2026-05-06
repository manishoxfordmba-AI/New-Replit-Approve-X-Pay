import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight, Building2, BarChart3, Settings2, ShieldCheck,
  Mail, User, MessageSquare, Calendar as CalendarIcon,
  Zap, Shuffle, Layers, TrendingDown, AlertTriangle,
  Users, DollarSign, ChevronRight, TrendingUp
} from "lucide-react";
import { BookingModal } from "@/components/BookingModal";

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

  // Calculator state — monthlyRevMil in millions (0–10000 = $0–$10B)
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const problemCards = [
    { icon: <Building2 className="w-8 h-8 text-cyan-400" />, pct: "38%", title: "Single PSP Dependency", desc: "Relying on one payment provider creates systemic fragility. Downtime or issuer mismatches cascade into unnecessary declines." },
    { icon: <Zap className="w-8 h-8 text-yellow-400" />, pct: "24%", title: "No Retry Logic", desc: "Blanket retry strategies that ignore decline codes waste attempts and increase false positive fraud rates with issuers." },
    { icon: <Shuffle className="w-8 h-8 text-blue-400" />, pct: "19%", title: "Poor Acquirer Routing", desc: "Routing without BIN-level intelligence or real-time success rate data leaves authorization gains on the table." },
    { icon: <Layers className="w-8 h-8 text-purple-400" />, pct: "14%", title: "Missing Orchestration Layer", desc: "Without a payment orchestration layer, you have no fallback, no intelligent failover, and no real-time adaptability when a PSP or acquirer underperforms." },
    { icon: <BarChart3 className="w-8 h-8 text-emerald-400" />, pct: "5%", title: "Limited Analytics Visibility", desc: "Without granular decline code analysis and conversion funnel visibility, teams can't identify or fix the right problems." },
  ];

  const costOfInactionCards = [
    { icon: <TrendingDown className="w-6 h-6 text-red-400" />, stat: "$50K–$3M+", title: "Hidden Revenue Leakage", desc: "Avoidable failed transactions represent recoverable revenue — often invisible in standard reporting dashboards.", loss: "5–15% of GMV" },
    { icon: <BarChart3 className="w-6 h-6 text-orange-400" />, stat: "–5–15%", title: "Conversion Rate Erosion", desc: "Failed checkouts don't just lose transactions — they lose customers permanently to competitors with smoother payment flows.", loss: "2–8% conversion drop" },
    { icon: <Users className="w-6 h-6 text-yellow-400" />, stat: "High Churn", title: "Poor Customer Experience", desc: "Payment failure at checkout creates lasting brand damage. Frustrated customers rarely retry — they leave and don't return.", loss: "$200–$2K per lost customer" },
    { icon: <DollarSign className="w-6 h-6 text-red-300" />, stat: "+CAC", title: "Increased Acquisition Pressure", desc: "When good customers churn due to payment failures, the cost to replace them through acquisition compounds the loss.", loss: "+30–60% CAC pressure" },
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
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            {["Problem", "Services", "Process", "Why Us"].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase().replace(" ", "-"))} className="hover:text-white transition-colors">{item}</button>
            ))}
            <button onClick={() => scrollTo("outcomes")} className="hover:text-white transition-colors">Outcomes</button>
          </div>
          <Button onClick={() => setBookingOpen(true)} className="hidden md:flex bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full px-6 py-2 h-auto font-medium shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-white/10" data-testid="button-nav-booking">
            Free Discovery Call <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </nav>

      {/* FLOATING CTA */}
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 50 }} className="fixed bottom-6 right-6 z-50 pointer-events-none">
        <Button onClick={() => setBookingOpen(true)} className="pointer-events-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full px-6 py-6 font-medium shadow-[0_0_30px_rgba(37,99,235,0.4)] border border-white/10" data-testid="button-floating-booking">
          Schedule Free Call
        </Button>
      </motion.div>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-8">
              {/* UPDATED BADGE */}
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
                5—15% of transactions fail across fintech and e-commerce platforms. A significant portion are avoidable. We identify the root causes and build the orchestration layer to recover that revenue — systematically.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button onClick={() => setBookingOpen(true)} className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl px-8 py-6 text-lg font-medium shadow-[0_0_30px_rgba(37,99,235,0.3)] border border-white/10" data-testid="button-hero-booking">
                  <CalendarIcon className="w-5 h-5 mr-2" /> Free Discovery Call
                </Button>
                <Button variant="outline" onClick={() => scrollTo("services")} className="bg-white/5 hover:bg-white/10 text-white border-white/10 rounded-xl px-8 py-6 text-lg font-medium backdrop-blur-sm" data-testid="button-hero-services">
                  Explore Our Services <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>

            {/* HERO CARD — BUSINESS IMPACT THAT MATTERS */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative lg:ml-auto w-full max-w-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-[24px] blur-2xl" />
              <div className="relative bg-white/[0.04] border border-white/10 rounded-[24px] p-7 backdrop-blur-xl shadow-2xl space-y-5">
                <div className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Business Impact That Matters</div>

                {/* Before */}
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-xs font-bold text-red-300 uppercase tracking-wider">Before Payment Optimization</span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">5–15% of payments fail, costing <span className="text-red-300 font-bold">$15M monthly</span> for every $100M in revenue.</p>
                  <div className="mt-3 flex gap-3">
                    <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-bold">-12.4% auth rate</span>
                    <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-bold">-$15M/month</span>
                  </div>
                </div>

                {/* Moderate */}
                <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-xs font-bold text-yellow-300 uppercase tracking-wider">Moderate Recovery</span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed"><span className="text-yellow-300 font-bold">20% of failed transactions</span> recovered through basic retry logic alone.</p>
                  <div className="mt-3">
                    <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs font-bold">+$3M partial recovery</span>
                  </div>
                </div>

                {/* After */}
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">After Orchestration</span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">Full orchestration layer delivers <span className="text-emerald-300 font-bold">20% recovery</span>, systematic uplift across all payment flows.</p>
                  <div className="mt-3 flex gap-3 flex-wrap">
                    <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">+$3M recovered</span>
                    <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">+3% monthly uplift</span>
                    <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">4 weeks</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section id="problem" className="py-24 bg-[#0a0f1e]">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4 block">The Problem</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Failed payments aren't always genuine declines.</h2>
            <p className="text-xl text-white/70 max-w-3xl">Most payment failures are misdiagnosed as customer issues. The real cause is operational — and fixable.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemCards.map((card, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white/[0.03] border border-white/10 rounded-[18px] p-7 hover:bg-white/[0.05] transition-colors flex flex-col">
                {/* Icon + % side by side */}
                <div className="flex items-center justify-between mb-4">
                  {card.icon}
                  <span className="text-2xl font-serif font-extrabold text-red-400">{card.pct}</span>
                </div>
                <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-2">of failures</p>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-white/60 leading-relaxed flex-grow text-sm">{card.desc}</p>
                <div className="mt-5 pt-4 border-t border-white/5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                    <AlertTriangle className="w-3 h-3" /> {card.pct} of payment failures
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS IMPACT SECTION */}
      <section id="business-impact" className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-extrabold mb-3">The Business Impact Is Larger Than You Think</h2>
            <p className="text-lg text-white/60">Hidden revenue leakage compounds across every growth metric.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {costOfInactionCards.map((card, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#0d1220] border border-white/8 rounded-[18px] p-6 flex flex-col gap-3 hover:border-white/15 transition-colors">
                <div className="text-2xl mb-1">{card.icon}</div>
                <div className="text-2xl md:text-3xl font-serif font-extrabold text-red-400">{card.stat}</div>
                <h4 className="font-bold text-white/95 text-base">{card.title}</h4>
                <p className="text-sm text-white/55 leading-relaxed flex-grow">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-[#0a0f1e]">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 max-w-3xl">
            <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4 block">Services</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">End-to-end payment revenue recovery.</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Payment Approval Rate Optimization", desc: "Systematic analysis of decline codes, issuer behavior, and transaction patterns to identify and remove friction from your approval funnel." },
              { title: "Payment Orchestration Strategy & Build", desc: "Design and implementation of multi-PSP orchestration layers with intelligent failover, retry logic, and real-time routing decisions." },
              { title: "Smart Routing & Intelligent Retries", desc: "BIN-level routing intelligence paired with decline-code-aware retry strategies that maximize authorization rates without increasing fraud exposure." },
              { title: "Payments Audit & Revenue Leakage Assessment", desc: "Deep analysis of transaction data, PSP setup, routing logic, and decline patterns to quantify and locate your revenue leakage." }
            ].map((service, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative group overflow-hidden bg-white/[0.02] border border-white/10 rounded-[18px] p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-400/0 group-hover:from-blue-500/5 group-hover:to-cyan-400/5 transition-colors duration-500" />
                <h3 className="text-xl font-bold mb-3 text-white/90">{service.title}</h3>
                <p className="text-white/60 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-8 p-6 rounded-[18px] bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-cyan-500/20 text-center">
            <p className="text-cyan-100 font-medium">Plus: Continuous monitoring of authorization rates and PSP performance with executive reporting</p>
          </motion.div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
            <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4 block">Process</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">From audit to outcomes in 4 weeks.</h2>
            <p className="text-xl text-white/70 max-w-3xl">We don't just deliver decks. We work alongside your engineering and product teams to implement changes with a bias for rapid, measurable improvements.</p>
          </motion.div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-6 md:left-[39px] top-4 bottom-4 w-px bg-white/10" />
            <div className="space-y-12">
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
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">{item.time}</span>
                  </div>
                  <p className="text-white/60 text-lg leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section id="why-us" className="py-24 bg-[#0a0f1e]">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center max-w-3xl mx-auto">
            <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4 block">Why Us</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Payments expertise that moves the needle.</h2>
            <p className="text-xl text-white/70">Payments Revenue Uplift Advisory</p>
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
              <blockquote className="border-l-2 border-cyan-500/40 pl-4 mb-6 text-white/80 italic leading-relaxed text-[15px]">
                "I built ApproveXPay after watching millions of dollars in legitimate payments get declined at companies I worked with. The problem is real, it's fixable, and that's exactly what we do."
              </blockquote>
              <ul className="space-y-3 mb-6 text-sm text-white/70">
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
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {[
                { title: "Deep Payments Domain Expertise", sub: "20 Years Experience", desc: "Two decades navigating the complexities of global payment networks, issuer behaviour, and authorization optimization across markets and verticals." },
                { title: "Large-Scale Transaction Ecosystems", sub: "$20B monthly volume at Mastercard Payment Gateway", desc: "Direct experience managing and optimizing payment flows at extraordinary scale — giving us unmatched perspective on what breaks at volume." },
                { title: "Practical Implementation Focus", sub: "Led Global Mastercard Payment Gateway", desc: "We don't stop at strategy. We embed with your team and drive hands-on implementation of orchestration layers, routing rules, and retry frameworks." },
                { title: "Executive Advisory Capability", sub: "Director, Mastercard Payment Gateway Services", desc: "Board-level communication — we translate technical payment improvements into business outcomes that executives and investors understand." },
              ].map((diff, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[18px] p-6 hover:border-white/10 transition-colors">
                  <h4 className="text-base font-bold mb-1 text-white/90">{diff.title}</h4>
                  <p className="text-cyan-400 text-xs font-semibold mb-3">{diff.sub}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{diff.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUTCOMES / TESTIMONIALS */}
      <section id="outcomes" className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center">
            <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4 block">Outcomes</span>
            <h2 className="text-4xl md:text-5xl font-serif">Results our clients see.</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { text: "Manish identified $2.3M in recoverable revenue within the first two weeks of our audit. His understanding of BIN-level routing and issuer behavior is unlike anything we'd encountered. We recovered 14% of previously failed transactions within 6 weeks.", author: "VP Engineering", company: "Series B Fintech" },
              { text: "Our cross-border approval rates were a persistent board-level concern. Manish designed an orchestration strategy covering 12 markets and 6 PSPs that lifted our international authorization rate by 18.5%. The depth of payments expertise here is exceptional.", author: "Head of Payments", company: "Global E-Commerce Marketplace" }
            ].map((t, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white/[0.02] border border-white/10 rounded-[18px] p-8 flex flex-col">
                <div className="text-cyan-400 text-4xl font-serif mb-4 leading-none">"</div>
                <p className="text-lg text-white/80 leading-relaxed mb-8 flex-grow">{t.text}</p>
                <div className="mt-auto border-t border-white/10 pt-4">
                  <p className="font-bold text-white/90">{t.author}</p>
                  <p className="text-sm text-cyan-400">{t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOSS CALCULATOR SECTION */}
      <section id="calculator" className="py-24 bg-[#0a0f1e]">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4 block">Revenue Calculator</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Calculate your Loss</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">Estimate how much revenue your payment stack is leaking — and how much you could recover.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* INPUTS */}
              <div className="bg-white/[0.03] border border-white/10 rounded-[24px] p-8 space-y-8">
                <h3 className="text-lg font-bold text-white/80">Your Payment Stats</h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <Label className="text-white/70 text-sm font-semibold">Monthly Revenue Processed</Label>
                    <span className="text-cyan-400 font-bold text-lg">{fmtRevenue(monthlyRevMil)}</span>
                  </div>
                  <input type="range" min={0} max={10000} step={50} value={monthlyRevMil} onChange={(e) => setMonthlyRevMil(Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-cyan-400 bg-white/10" data-testid="slider-monthly-revenue" />
                  <div className="flex justify-between text-xs text-white/30"><span>$0</span><span>$10B</span></div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <Label className="text-white/70 text-sm font-semibold">Current Failure Rate</Label>
                    <span className="text-red-400 font-bold text-lg">{failureRate}%</span>
                  </div>
                  <input type="range" min={1} max={50} step={0.5} value={failureRate} onChange={(e) => setFailureRate(Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-red-400 bg-white/10" data-testid="slider-failure-rate" />
                  <div className="flex justify-between text-xs text-white/30"><span>1%</span><span>50%</span></div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <Label className="text-white/70 text-sm font-semibold">Failure Recovery</Label>
                    <span className="text-emerald-400 font-bold text-lg">{recoveryPct}%</span>
                  </div>
                  <input type="range" min={1} max={80} step={1} value={recoveryPct} onChange={(e) => setRecoveryPct(Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-emerald-400 bg-white/10" data-testid="slider-recovery-pct" />
                  <div className="flex justify-between text-xs text-white/30"><span>1%</span><span>80%</span></div>
                  <p className="text-xs text-white/40">Industry benchmark: 55–65% of failures are recoverable</p>
                </div>
              </div>

              {/* RESULTS */}
              <div className="flex flex-col gap-5">
                <div className="flex-1 bg-gradient-to-br from-red-900/30 to-red-950/30 border border-red-500/20 rounded-[20px] p-7 flex flex-col justify-center">
                  <p className="text-red-300 text-sm font-semibold uppercase tracking-wider mb-2">Monthly Revenue Leakage</p>
                  <div className="text-5xl font-serif font-extrabold text-red-300 mb-2">{formatCurrency(leakageMonthly)}</div>
                  <p className="text-white/50 text-sm">Lost to failed transactions each month</p>
                </div>
                <div className="flex-1 bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 border border-emerald-500/20 rounded-[20px] p-7 flex flex-col justify-center">
                  <p className="text-emerald-300 text-sm font-semibold uppercase tracking-wider mb-2">Recoverable Monthly</p>
                  <div className="text-5xl font-serif font-extrabold text-emerald-300 mb-2">{formatCurrency(recoverableMonthly)}</div>
                  <p className="text-white/50 text-sm">Potential monthly recovery with orchestration</p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/30 border border-cyan-500/30 rounded-[20px] p-6 text-center">
                  <p className="text-cyan-300 text-sm font-semibold mb-1">Annual Recovery Opportunity</p>
                  <div className="text-4xl font-serif font-extrabold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">{formatCurrency(recoverableAnnual)}</div>
                  <Button onClick={() => setBookingOpen(true)} className="mt-5 w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl py-5 font-semibold shadow-[0_0_30px_rgba(37,99,235,0.3)]" data-testid="button-calculator-cta">
                    <CalendarIcon className="w-4 h-4 mr-2" /> Recover This Revenue
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COST OF INACTION — standalone before contact */}
      <section id="cost-of-inaction" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12 text-center">
            <h3 className="text-3xl md:text-4xl font-serif font-extrabold mb-3">The Cost of Inaction</h3>
            <p className="text-white/60 text-lg">Every month without optimization is revenue that doesn't come back.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {costOfInactionCards.map((card, i) => (
              <div key={i} className="p-6 rounded-[18px] bg-[#0a0f1e] border border-red-500/10 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  {card.icon}
                  <h4 className="font-bold text-white/90 text-sm">{card.title}</h4>
                </div>
                <p className="text-xs text-white/55 leading-relaxed flex-grow">{card.desc}</p>
                <div className="mt-auto pt-3 border-t border-white/5">
                  <span className="text-red-400 font-bold text-sm">{card.loss}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section id="contact" className="py-24 relative overflow-hidden bg-[#0a0f1e]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-white/[0.03] border border-white/10 rounded-[32px] p-10 md:p-16 backdrop-blur-md shadow-2xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Millions lost! Want to recover?</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">Book a free 20-minute discovery call to see how much revenue is recoverable from your payment stack.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left space-y-6">
                <Button onClick={() => setBookingOpen(true)} className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl px-10 py-7 text-lg font-medium shadow-[0_0_40px_rgba(37,99,235,0.4)] border border-white/10" data-testid="button-cta-booking">
                  <CalendarIcon className="w-5 h-5 mr-2" /> Free Discovery Call
                </Button>
                <p className="text-white/50 text-sm">Or send a message directly below</p>
              </div>
              <div className="bg-[#030712]/50 rounded-2xl p-6 border border-white/5">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
                  <div className="space-y-2">
                    <Label className="text-white/70">Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                      <Input required className="bg-white/5 border-white/10 pl-10 h-11 text-white" placeholder="John Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/70">Work Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                      <Input required type="email" className="bg-white/5 border-white/10 pl-10 h-11 text-white" placeholder="john@company.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/70">Message</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                      <textarea required className="w-full bg-white/5 border border-white/10 rounded-md pl-10 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 min-h-[100px]" placeholder="How can we help?" />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-white text-black hover:bg-white/90">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#030712] border-t border-white/10 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <img src="https://hercules-cdn.com/file_E2Kto5hqQfdbFSbDy30zHMdC" alt="ApproveXPay" className="h-8 rounded-full" />
                <span className="font-serif text-2xl font-bold">ApproveXPay</span>
              </div>
              <p className="text-white/60">Payment Revenue Recovery Consultants</p>
              <p className="text-white/40 text-sm mt-2">Led by Manish Gupta | Oxford MBA | Ex Mastercard, Bank of America</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-white/60">
              {["Problem", "Services", "Process", "Why Us", "Outcomes"].map((item) => (
                <button key={item} onClick={() => scrollTo(item.toLowerCase().replace(" ", "-"))} className="hover:text-white transition-colors">{item}</button>
              ))}
            </div>
          </div>
          <div className="text-center text-white/40 text-sm border-t border-white/5 pt-8">© 2024 ApproveXPay. All rights reserved.</div>
        </div>
      </footer>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}
