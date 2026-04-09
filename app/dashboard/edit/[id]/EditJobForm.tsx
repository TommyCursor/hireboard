"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
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

export default function EditJobForm({ job }: { job: Record<string, unknown> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const supabase = createClient();

    const updates = {
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
    };

    const { error: err } = await supabase.from("jobs").update(updates).eq("id", job.id as string);
    if (err) { setError(err.message); setLoading(false); }
    else { router.push("/dashboard"); router.refresh(); }
  }

  return (
    <div className="min-h-screen bg-[#1d1d1f] text-[#fafaf6]">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 label text-white/30 hover:text-[#17f1d1] transition-colors duration-300 mb-12"
          >
            <ArrowLeft className="w-3 h-3" /> back to dashboard
          </Link>
        </motion.div>

        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-5 h-px bg-[#a374ff]" />
            <span className="label accent-purple">edit listing</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.25, ease }}
              className="text-[#fafaf6]"
              style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.04em", textTransform: "lowercase" }}
            >
              update your role.
            </motion.h1>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-red-500/30 bg-red-500/10 text-red-400 rounded-2xl px-5 py-4 label mb-8"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">

          <Section delay={0.4}>
            <div className="flex items-center gap-3 pb-6 border-b border-white/[0.06]">
              <div className="w-4 h-px bg-[#17f1d1]" />
              <span className="label accent-turquoise">role details</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>job title *</label>
                <input name="title" required defaultValue={job.title as string} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>company name *</label>
                <input name="company" required defaultValue={job.company as string} className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>job type *</label>
                <select name="type" required defaultValue={job.type as string} className={selectClass}>
                  {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>category *</label>
                <select name="category" required defaultValue={job.category as string} className={selectClass}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>location *</label>
                <input name="location" required defaultValue={job.location as string} className={inputClass} />
              </div>
              <div className="flex items-center gap-4 pt-6">
                <input type="checkbox" name="is_remote" id="is_remote" defaultChecked={job.is_remote as boolean} className="w-4 h-4 accent-[#17f1d1]" />
                <label htmlFor="is_remote" className="label text-white/40">remote position</label>
              </div>
            </div>
          </Section>

          <Section delay={0.5}>
            <div className="flex items-center gap-3 pb-6 border-b border-white/[0.06]">
              <div className="w-4 h-px bg-[#a374ff]" />
              <span className="label accent-purple">compensation <span className="text-white/20">(optional)</span></span>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>min salary (usd/yr)</label>
                <input name="salary_min" type="number" defaultValue={job.salary_min as number} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>max salary (usd/yr)</label>
                <input name="salary_max" type="number" defaultValue={job.salary_max as number} className={inputClass} />
              </div>
            </div>
          </Section>

          <Section delay={0.6}>
            <div className="flex items-center gap-3 pb-6 border-b border-white/[0.06]">
              <div className="w-4 h-px bg-[#ffd074]" />
              <span className="label accent-yellow">job description *</span>
            </div>
            <textarea
              name="description"
              required
              rows={10}
              defaultValue={job.description as string}
              className={`${inputClass} resize-none`}
            />
          </Section>

          <Section delay={0.7}>
            <div className="flex items-center gap-3 pb-6 border-b border-white/[0.06]">
              <div className="w-4 h-px bg-[#17f1d1]" />
              <span className="label accent-turquoise">contact & links</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>contact email *</label>
                <input name="contact_email" type="email" required defaultValue={job.contact_email as string} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>application url <span className="text-white/20">(optional)</span></label>
                <input name="apply_url" type="url" defaultValue={job.apply_url as string} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>company website <span className="text-white/20">(optional)</span></label>
              <input name="company_url" type="url" defaultValue={job.company_url as string} className={inputClass} />
            </div>
          </Section>

          <motion.button
            type="submit"
            disabled={loading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="btn-pill btn-pill-yellow w-full justify-center disabled:opacity-50"
          >
            {loading ? "saving..." : "save changes"}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
