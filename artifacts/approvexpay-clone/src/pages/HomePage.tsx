import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Building2, BarChart3, Settings2, ShieldCheck, Mail, User, MessageSquare, Calendar as CalendarIcon, Zap, Shuffle } from "lucide-react";
import { BookingModal } from "@/components/BookingModal";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-50 selection:bg-blue-500/30 font-sans overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#030712]/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent border-transparent'} py-4`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <img src="https://hercules-cdn.com/file_E2Kto5hqQfdbFSbDy30zHMdC" alt="ApproveXPay" className="h-8 rounded-full" />
            <span className="font-serif text-xl font-bold tracking-wide">ApproveXPay</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            {['Problem', 'Services', 'Process', 'Why Us'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))} className="hover:text-white transition-colors">
                {item}
              </button>
            ))}
            <button onClick={() => scrollTo('outcomes')} className="hover:text-white transition-colors">Outcomes</button>
          </div>
          
          <Button 
            onClick={() => setBookingOpen(true)}
            className="hidden md:flex bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full px-6 py-2 h-auto font-medium shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-white/10"
            data-testid="button-nav-booking"
          >
            Free Discovery Call <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </nav>

      {/* FLOATING CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 50 }}
        className="fixed bottom-6 right-6 z-50 pointer-events-none"
      >
        <Button 
          onClick={() => setBookingOpen(true)}
          className="pointer-events-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full px-6 py-6 font-medium shadow-[0_0_30px_rgba(37,99,235,0.4)] border border-white/10"
          data-testid="button-floating-booking"
        >
          Schedule Free Call
        </Button>
      </motion.div>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Subtle mesh/glow bg */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-semibold tracking-wider text-white/80">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                PAYMENT REVENUE INTELLIGENCE
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-[clamp(3rem,5vw,4.5rem)] leading-[1.1] font-serif font-extrabold tracking-tight">
                Your payment stack<br/>
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">is leaking millions.</span><br/>
                We recover it.
              </h1>
              
              <p className="text-lg md:text-xl text-white/70 max-w-[520px] leading-relaxed">
                5—15% of transactions fail across fintech and e-commerce platforms. A significant portion are avoidable. We identify the root causes and build the orchestration layer to recover that revenue — systematically.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button 
                  onClick={() => setBookingOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl px-8 py-6 text-lg font-medium shadow-[0_0_30px_rgba(37,99,235,0.3)] border border-white/10"
                  data-testid="button-hero-booking"
                >
                  <CalendarIcon className="w-5 h-5 mr-2" /> Free Discovery Call
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => scrollTo('services')}
                  className="bg-white/5 hover:bg-white/10 text-white border-white/10 rounded-xl px-8 py-6 text-lg font-medium backdrop-blur-sm"
                  data-testid="button-hero-services"
                >
                  Explore Our Services <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>

            {/* HERO CARD */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:ml-auto w-full max-w-[500px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-[24px] blur-2xl" />
              <div className="relative bg-white/[0.04] border border-white/10 rounded-[24px] p-8 backdrop-blur-xl shadow-2xl">
                <div className="text-xs font-bold tracking-widest text-cyan-400 mb-6 uppercase">Payment Flow Intelligence</div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-white/50" />
                      <span className="font-medium text-white/90">Single PSP Routing</span>
                    </div>
                    <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-bold">-12.4% fail</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <Settings2 className="w-5 h-5 text-white/50" />
                      <span className="font-medium text-white/90">No Retry Logic</span>
                    </div>
                    <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-bold">-$2.1M loss</span>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent my-6" />

                <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-8">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="font-medium text-white">After Orchestration</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">+18% recovery</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#0a0f1e]/50 border border-white/5">
                    <div className="text-2xl font-serif text-emerald-400 mb-1">+$1.8M</div>
                    <div className="text-xs text-white/60 font-medium">Recovered Revenue</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0a0f1e]/50 border border-white/5">
                    <div className="text-2xl font-serif text-emerald-400 mb-1">+17.3%</div>
                    <div className="text-xs text-white/60 font-medium">Auth Rate Uplift</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0a0f1e]/50 border border-white/5">
                    <div className="text-2xl font-serif text-yellow-400 mb-1">4 weeks</div>
                    <div className="text-xs text-white/60 font-medium">Time to Results</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0a0f1e]/50 border border-white/5">
                    <div className="text-2xl font-serif text-emerald-400 mb-1">3 PSPs</div>
                    <div className="text-xs text-white/60 font-medium">Optimized Routing</div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section className="border-y border-white/10 bg-white/[0.015] py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
            {[
              { val: "5—20%", label: "Typical Approval Rate Uplift" },
              { val: "$50K—$3M+", label: "Revenue Recovery Potential" },
              { val: "20+", label: "Years Payments Expertise" },
              { val: "4", label: "Weeks to First Insights" },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="text-center px-4"
              >
                <div className="text-4xl font-serif font-extrabold mb-2 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">{stat.val}</div>
                <div className="text-[15px] text-white/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
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

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: <Building2 className="w-8 h-8 text-cyan-400" />, title: "Single PSP Dependency", desc: "Relying on one payment provider creates systemic fragility. Downtime or issuer mismatches cascade into unnecessary declines." },
              { icon: <Zap className="w-8 h-8 text-yellow-400" />, title: "Absent or Naive Retry Logic", desc: "Blanket retry strategies that ignore decline codes waste attempts and increase false positive fraud rates with issuers." },
              { icon: <Shuffle className="w-8 h-8 text-blue-400" />, title: "Inefficient PSP/Acquirer Routing", desc: "Routing without BIN-level intelligence or real-time success rate data leaves authorization gains on the table." },
              { icon: <BarChart3 className="w-8 h-8 text-emerald-400" />, title: "Limited Payment Analytics", desc: "Without granular decline code analysis and conversion funnel visibility, teams can't identify or fix the right problems." }
            ].map((card, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white/[0.03] border border-white/10 rounded-[18px] p-8 hover:bg-white/[0.05] transition-colors">
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-white/60 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="pt-12 border-t border-white/10">
            <h3 className="text-2xl font-serif mb-8 text-center text-white/90">The Cost of Inaction</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Hidden Revenue Leakage", desc: "Avoidable failed transactions represent recoverable revenue" },
                { title: "Conversion Rate Erosion", desc: "Failed checkouts don't just lose transactions" },
                { title: "High Churn", desc: "Payment failure at checkout creates lasting brand damage. Frustrated customers rarely retry" },
                { title: "+CAC", desc: "Increased Acquisition Pressure — When good customers churn due to payment failures, the cost to replace them compounds the loss." }
              ].map((card, i) => (
                <div key={i} className="p-6 rounded-[18px] bg-[#030712] border border-red-500/10">
                  <h4 className="font-bold text-red-300 mb-2">{card.title}</h4>
                  <p className="text-sm text-white/60">{card.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 relative">
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
      <section id="process" className="py-24 bg-[#0a0f1e]">
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
                { step: "01", title: "Discovery & Audit", desc: "Deep-dive into your transaction data, PSP setup, and current decline patterns. We map every failure mode." },
                { step: "02", title: "Revenue Leakage Assessment", desc: "Quantify the recoverable opportunity by decline code, market, and payment method." },
                { step: "03", title: "Orchestration Design", desc: "Blueprint the multi-PSP architecture, routing rules, retry sequences, and monitoring framework." },
                { step: "04", title: "Implementation & Go-Live", desc: "Work alongside your team to deploy, test, and validate the new orchestration layer." },
                { step: "05", title: "Ongoing Optimisation", desc: "Continuous performance monitoring, A/B testing of routing rules, and regular strategy reviews." },
              ].map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="relative pl-20 md:pl-32">
                  <div className="absolute left-0 md:left-4 top-1 w-12 h-12 rounded-full bg-[#030712] border-2 border-cyan-500/50 flex items-center justify-center font-serif font-bold text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/60 text-lg leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section id="why-us" className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center max-w-3xl mx-auto">
            <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4 block">Why Us</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Payments expertise that moves the needle.</h2>
            <p className="text-xl text-white/70">Payments Revenue Uplift Advisory</p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-[24px] p-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 p-[2px] mb-6">
                <div className="w-full h-full rounded-full bg-[#0a0f1e] flex items-center justify-center text-3xl font-serif">MG</div>
              </div>
              <h3 className="text-2xl font-bold mb-1">Manish Gupta</h3>
              <p className="text-cyan-400 font-medium mb-6">Oxford MBA | Ex Mastercard, Bank of America</p>
              <p className="text-white/70 leading-relaxed mb-8">
                20+ years in payments, having led payment optimization initiatives at global scale. Deep expertise in issuer behavior, PSP relationships, and authorization rate improvement.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Oxford MBA", "Ex Mastercard", "Ex Bank of America", "20+ Years Experience"].map(badge => (
                  <span key={badge} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium">{badge}</span>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {[
                { title: "Implementation-first", desc: "We don't just advise. We embed with your team and build." },
                { title: "Measurable outcomes", desc: "Every engagement is tied to authorization rate uplift and revenue recovery." },
                { title: "PSP-agnostic", desc: "We work with your existing providers or help you select new ones." },
                { title: "Speed to value", desc: "First insights within 2 weeks. Revenue recovery in 4." },
              ].map((diff, i) => (
                <div key={i} className="bg-[#0a0f1e]/50 border border-white/5 rounded-[18px] p-6 hover:border-white/10 transition-colors">
                  <h4 className="text-lg font-bold mb-2 text-white/90">{diff.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{diff.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUTCOMES / TESTIMONIALS */}
      <section id="outcomes" className="py-24 bg-[#0a0f1e]">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center">
            <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4 block">Outcomes</span>
            <h2 className="text-4xl md:text-5xl font-serif">Results our clients see.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                text: "Manish identified $2.3M in recoverable revenue within the first two weeks of our audit. His understanding of BIN-level routing and issuer behavior is unlike anything we'd encountered. We recovered 14% of previously failed transactions within 6 weeks.",
                author: "VP Engineering",
                company: "Series B Fintech"
              },
              {
                text: "Our cross-border approval rates were a persistent board-level concern. Manish designed an orchestration strategy covering 12 markets and 6 PSPs that lifted our international authorization rate by 18.5%. The depth of payments expertise here is exceptional.",
                author: "Head of Payments",
                company: "Global E-Commerce Marketplace"
              }
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

      {/* CTA / CONTACT */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-white/[0.03] border border-white/10 rounded-[32px] p-10 md:p-16 backdrop-blur-md shadow-2xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Ready to recover your revenue?</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Book a free 20-minute discovery call to see how much revenue is recoverable from your payment stack.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left space-y-6">
                <Button 
                  onClick={() => setBookingOpen(true)}
                  className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl px-10 py-7 text-lg font-medium shadow-[0_0_40px_rgba(37,99,235,0.4)] border border-white/10"
                  data-testid="button-cta-booking"
                >
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
              {['Problem', 'Services', 'Process', 'Why Us', 'Outcomes'].map((item) => (
                <button key={item} onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))} className="hover:text-white transition-colors">
                  {item}
                </button>
              ))}
            </div>
          </div>
          
          <div className="text-center text-white/40 text-sm border-t border-white/5 pt-8">
            © 2024 ApproveXPay. All rights reserved.
          </div>
        </div>
      </footer>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}
