"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/client";

const CATEGORIES = ["Engineering", "Design", "Marketing", "Sales", "Finance", "Healthcare", "Operations", "Other"];
const TYPES = ["Full-Time", "Part-Time", "Contract", "Internship", "Remote"];

const ease = [0.19, 1, 0.22, 1] as const;
const inputClass =
  "w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl px-5 py-4 text-sm text-[#fafaf6] placeholder:text-white/20 focus:outline-none focus:border-[#a374ff]/50 transition-colors duration-300 lowercase";
const selectClass =
  "w-full bg-[#1d1d1f] border border-white/[0.08] rounded-2xl px-5 py-4 text-sm text-[#fafaf6]/60 focus:outline-none focus:border-[#a374ff]/50 transition-colors duration-300 appearance-none cursor-pointer";
const labelClass = "block label text-white/40 mb-3";

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease }}
      className="border border-white/[0.06] rounded-3xl p-8 space-y-6"
    >
      {children}
    </motion.div>
  );
}

export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const job = {
      title: form.get("title") as string,
      company: form.get("company") as string,
      location: form.get("location") as string,
      type: form.get("type") as string,
      category: form.get("category") as string,
      description: form.get("description") as string,
      salary_min: form.get("salary_min") ? Number(form.get("salary_min")) : null,
      salary_max: form.get("salary_max") ? Number(form.get("salary_max")) : null,
      apply_url: (form.get("apply_url") as string) || null,
      contact_email: form.get("contact_email") as string,
      company_url: (form.get("company_url") as string) || null,
      is_remote: form.get("is_remote") === "on",
      is_featured: false,
      status: "active",
      user_id: user?.id ?? null,
    };

    const { error: err } = await supabase.from("jobs").insert(job);
    if (err) { setError(err.message); setLoading(false); }
    else { setSuccess(true); setLoading(false); }
  }

  if (success) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#1d1d1f] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease }}
            className="text-center max-w-lg"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="w-20 h-20 rounded-full bg-[#17f1d1]/10 border border-[#17f1d1]/20 flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle className="w-8 h-8 text-[#17f1d1]" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="text-[#fafaf6] mb-4"
              style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.03em", textTransform: "lowercase" }}
            >
              role is live.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
              className="text-[#fafaf6]/40 text-base leading-relaxed mb-10"
            >
              Your listing is now visible to thousands of candidates actively searching for their next opportunity.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              className="flex gap-4 justify-center flex-wrap"
            >
              <button onClick={() => router.push("/jobs")} className="btn-pill btn-pill-yellow">
                browse all roles <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setSuccess(false)} className="btn-pill btn-pill-ghost">
                post another role
              </button>
            </motion.div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#1d1d1f] text-[#fafaf6]">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">

          {/* Header */}
          <div className="mb-14">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-5 h-px bg-[#ffd074]" />
              <span className="label accent-yellow">for employers</span>
            </motion.div>
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.2, ease }}
                className="text-[#fafaf6]"
                style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, lineHeight: 0.85, letterSpacing: "-0.04em", textTransform: "lowercase" }}
              >
                post a role.<br />
                <em className="not-italic" style={{ color: "#a374ff" }}>it&apos;s free.</em>
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease }}
              className="text-[#fafaf6]/40 text-base leading-relaxed max-w-md"
            >
              Reach thousands of qualified candidates actively looking for their next move.
            </motion.p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-red-500/30 bg-red-500/10 text-red-400 rounded-2xl px-5 py-4 label mb-8"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <Section delay={0.45}>
              <div className="flex items-center gap-3 pb-6 border-b border-white/[0.06]">
                <div className="w-4 h-px bg-[#17f1d1]" />
                <span className="label accent-turquoise">role details</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>job title *</label>
                  <input name="title" required placeholder="senior react developer" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>company name *</label>
                  <input name="company" required placeholder="acme inc." className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>job type *</label>
                  <select name="type" required className={selectClass}>
                    {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>category *</label>
                  <select name="category" required className={selectClass}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>location *</label>
                  <input name="location" required placeholder="new york, ny" className={inputClass} />
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <input type="checkbox" name="is_remote" id="is_remote" className="w-4 h-4 accent-[#17f1d1]" />
                  <label htmlFor="is_remote" className="label text-white/40">remote position</label>
                </div>
              </div>
            </Section>

            <Section delay={0.55}>
              <div className="flex items-center gap-3 pb-6 border-b border-white/[0.06]">
                <div className="w-4 h-px bg-[#a374ff]" />
                <span className="label accent-purple">compensation <span className="text-white/20">(optional)</span></span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>min salary (usd/yr)</label>
                  <input name="salary_min" type="number" placeholder="80000" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>max salary (usd/yr)</label>
                  <input name="salary_max" type="number" placeholder="120000" className={inputClass} />
                </div>
              </div>
            </Section>

            <Section delay={0.65}>
              <div className="flex items-center gap-3 pb-6 border-b border-white/[0.06]">
                <div className="w-4 h-px bg-[#ffd074]" />
                <span className="label accent-yellow">job description *</span>
              </div>
              <textarea
                name="description"
                required
                rows={10}
                placeholder="describe the role, responsibilities, requirements, and benefits..."
                className={`${inputClass} resize-none`}
              />
            </Section>

            <Section delay={0.75}>
              <div className="flex items-center gap-3 pb-6 border-b border-white/[0.06]">
                <div className="w-4 h-px bg-[#17f1d1]" />
                <span className="label accent-turquoise">contact & links</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>contact email *</label>
                  <input name="contact_email" type="email" required placeholder="hiring@company.com" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>application url <span className="text-white/20">(optional)</span></label>
                  <input name="apply_url" type="url" placeholder="https://..." className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>company website <span className="text-white/20">(optional)</span></label>
                <input name="company_url" type="url" placeholder="https://company.com" className={inputClass} />
              </div>
            </Section>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease }}
            >
              <button
                type="submit"
                disabled={loading}
                className="btn-pill btn-pill-yellow w-full justify-center disabled:opacity-50"
              >
                {loading ? "posting..." : "post role — it's free"}
                {!loading && <ArrowUpRight className="w-3.5 h-3.5" />}
              </button>
              <p className="label text-white/20 text-center mt-4">
                by posting you agree to our{" "}
                <Link href="/" className="text-white/40 hover:text-[#a374ff] transition-colors duration-300">
                  terms of service
                </Link>
              </p>
            </motion.div>
          </form>
        </div>
      </div>
    </>
  );
}
