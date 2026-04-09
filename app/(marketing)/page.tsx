"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Search, MapPin, Code2, BarChart3, Palette, Shield, HeartPulse, Building2, Globe, TrendingUp, ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  { label: "Engineering", icon: Code2, accent: "#17f1d1" },
  { label: "Design", icon: Palette, accent: "#a374ff" },
  { label: "Marketing", icon: TrendingUp, accent: "#ffd074" },
  { label: "Sales", icon: BarChart3, accent: "#17f1d1" },
  { label: "Finance", icon: Shield, accent: "#a374ff" },
  { label: "Healthcare", icon: HeartPulse, accent: "#ffd074" },
  { label: "Operations", icon: Building2, accent: "#17f1d1" },
  { label: "Remote", icon: Globe, accent: "#a374ff" },
];

const STATS = [
  { label: "Active Roles", value: "12,400+", accent: "#17f1d1" },
  { label: "Companies", value: "3,200+", accent: "#a374ff" },
  { label: "Job Seekers", value: "500K+", accent: "#ffd074" },
  { label: "Cities", value: "120+", accent: "#17f1d1" },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-[#1d1d1f] text-[#fafaf6]">

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end pb-24 px-6 pt-32 overflow-hidden border-b border-white/[0.06]">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-[#a374ff] opacity-[0.06] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-[#17f1d1] opacity-[0.04] blur-[100px] pointer-events-none" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-7xl mx-auto w-full relative">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-6 h-px bg-[#17f1d1]" />
            <span className="label accent-turquoise">500+ new roles this week</span>
          </motion.div>

          {/* Main headline */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="title-xl text-[#fafaf6]"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            >
              your next{" "}
              <em className="not-italic" style={{ color: "#17f1d1" }}>opportunity</em>
              <br />
              is{" "}
              <em className="not-italic" style={{ color: "#a374ff" }}>waiting.</em>
            </motion.h1>
          </div>

          {/* Sub + search row */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-10 justify-between">
            <motion.p
              className="text-[#fafaf6]/40 text-lg max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.19, 1, 0.22, 1] }}
            >
              Curated roles from world-class companies.
              Remote, hybrid, on-site. Every position worth your attention.
            </motion.p>

            {/* Search bar */}
            <motion.form
              action="/jobs"
              className="flex items-stretch rounded-full overflow-hidden border border-white/[0.1] bg-white/[0.03] backdrop-blur-sm"
              style={{ maxWidth: "520px" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="flex items-center gap-2 px-5 flex-1">
                <Search className="w-4 h-4 text-white/20 flex-shrink-0" />
                <input
                  name="q"
                  placeholder="role, company, keyword..."
                  className="flex-1 bg-transparent text-sm text-[#fafaf6] placeholder:text-white/20 focus:outline-none py-4 lowercase"
                />
              </div>
              <div className="flex items-center gap-2 px-5 border-l border-white/[0.06]">
                <MapPin className="w-4 h-4 text-white/20 flex-shrink-0" />
                <input
                  name="location"
                  placeholder="location"
                  className="w-24 bg-transparent text-sm text-[#fafaf6] placeholder:text-white/20 focus:outline-none lowercase"
                />
              </div>
              <button
                type="submit"
                className="bg-[#ffd074] hover:bg-[#ffba34] text-[#1d1d1f] px-7 font-semibold text-sm transition-colors duration-300 rounded-full my-1.5 mr-1.5 flex-shrink-0"
                style={{ letterSpacing: "-0.02em" }}
              >
                search
              </button>
            </motion.form>
          </div>

          {/* Trending tags */}
          <motion.div
            className="flex items-center gap-3 mt-8 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <span className="label text-white/20">trending</span>
            {["React", "Python", "Remote", "Design", "Node.js"].map((tag) => (
              <Link
                key={tag}
                href={`/jobs?q=${tag}`}
                className="label px-3 py-1.5 rounded-full border border-white/[0.08] text-white/30 hover:border-[#a374ff]/40 hover:text-[#a374ff] transition-all duration-300"
              >
                {tag}
              </Link>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 right-8 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="label text-white/20">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-6 bg-white/10"
          />
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.08}>
              <div className="py-6 px-6 border-r border-white/[0.06] last:border-r-0">
                <p className="title-md mb-1" style={{ color: s.accent }}>{s.value}</p>
                <p className="label text-white/30">{s.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="border-b border-white/[0.06] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="flex items-center gap-3 mb-14">
              <div className="w-5 h-px bg-[#a374ff]" />
              <span className="label accent-purple">explore by category</span>
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.04]">
            {CATEGORIES.map((cat, i) => (
              <FadeUp key={cat.label} delay={i * 0.05}>
                <Link
                  href={`/jobs?category=${cat.label}`}
                  className="group flex flex-col items-start gap-4 p-8 bg-[#1d1d1f] hover:bg-white/[0.02] transition-all duration-500"
                >
                  <cat.icon
                    className="w-5 h-5 text-white/20 group-hover:text-white/60 transition-colors duration-500"
                    style={{ color: undefined }}
                  />
                  <div>
                    <p
                      className="text-[#fafaf6] mb-1 group-hover:opacity-100 transition-all duration-500"
                      style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.02em", textTransform: "lowercase" }}
                    >
                      {cat.label}
                    </p>
                    <p className="label text-white/20 group-hover:text-white/40 transition-colors duration-500">
                      View roles →
                    </p>
                  </div>
                  <div
                    className="w-0 h-px group-hover:w-full transition-all duration-700"
                    style={{ background: cat.accent }}
                  />
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured / Latest Jobs ── */}
      <section className="border-b border-white/[0.06] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="flex items-center justify-between mb-14">
              <div className="flex items-center gap-3">
                <div className="w-5 h-px bg-[#ffd074]" />
                <span className="label accent-yellow">featured roles</span>
              </div>
              <Link
                href="/jobs"
                className="label text-white/30 hover:text-[#ffd074] transition-colors duration-300 flex items-center gap-2"
              >
                view all <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="border border-white/[0.06] rounded-3xl overflow-hidden">
              <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
                <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-6">
                  <Search className="w-6 h-6 text-white/20" />
                </div>
                <p
                  className="text-[#fafaf6]/50 mb-2"
                  style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", textTransform: "lowercase" }}
                >
                  no roles listed yet.
                </p>
                <p className="label text-white/20 mb-8">be the first to post an opportunity</p>
                <Link href="/post-job" className="btn-pill btn-pill-yellow">
                  post a role — it&apos;s free
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-36 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#a374ff] opacity-[0.06] blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <FadeUp>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-5 h-px bg-[#ffd074]" />
              <span className="label accent-yellow">for employers</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="title-xl text-[#fafaf6] mb-8 max-w-4xl">
              reach the talent
              <br />
              that{" "}
              <em className="not-italic" style={{ color: "#a374ff" }}>matters.</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-[#fafaf6]/40 text-lg max-w-lg leading-relaxed mb-12">
              Post a role and connect instantly with thousands of qualified candidates actively searching for their next move.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <Link href="/post-job" className="btn-pill btn-pill-yellow">
                post a role — it&apos;s free
              </Link>
              <Link href="/jobs" className="btn-pill btn-pill-ghost">
                browse all roles
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="label text-white/20">© 2026 hireboard</span>
          <span className="label text-white/20">
            built by{" "}
            <a href="https://www.upwork.com/freelancers/~01ab365bf80abef051" className="accent-purple hover:underline">
              cursor
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
