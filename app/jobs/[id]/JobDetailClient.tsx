"use client";

import Link from "next/link";
import { MapPin, Clock, DollarSign, Briefcase, Globe, ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { timeAgo, formatSalary } from "@/lib/utils";

const ease = [0.19, 1, 0.22, 1] as const;

type Job = Record<string, any>;

export default function JobDetailClient({ job }: { job: Job }) {
  const initials = job.company.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#1d1d1f] text-[#fafaf6]">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 label text-white/30 hover:text-[#17f1d1] transition-colors duration-300 mb-12"
          >
            <ArrowLeft className="w-3 h-3" /> all roles
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* ── Main content ── */}
          <div className="lg:col-span-2">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease }}
              className="mb-12 pb-12 border-b border-white/[0.06]"
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                  <span className="label text-white/40">{initials}</span>
                </div>
                <div>
                  <p className="label text-white/30 mb-2">{job.company}</p>
                  <h1
                    className="text-[#fafaf6] mb-4"
                    style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.03em", textTransform: "lowercase" }}
                  >
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="label text-white/30 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" />
                      {job.is_remote ? "Remote" : job.location}
                    </span>
                    <span className="label text-white/30 flex items-center gap-1.5">
                      <Briefcase className="w-3 h-3" />
                      {job.type}
                    </span>
                    <span className="label text-white/30 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {timeAgo(job.created_at)}
                    </span>
                    {(job.salary_min || job.salary_max) && (
                      <span className="label text-[#ffd074] flex items-center gap-1.5">
                        <DollarSign className="w-3 h-3" />
                        {formatSalary(job.salary_min, job.salary_max)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {job.is_featured && (
                <span className="label text-[#ffd074] bg-[#ffd074]/10 px-3 py-1.5 rounded-full">
                  featured role
                </span>
              )}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease }}
              className="text-[#fafaf6]/60 leading-relaxed whitespace-pre-wrap"
              style={{ fontSize: "1rem", lineHeight: 1.8 }}
            >
              {job.description}
            </motion.div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">

            {/* Apply card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease }}
              className="border border-white/[0.06] rounded-3xl p-8 sticky top-24"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-px bg-[#ffd074]" />
                <span className="label accent-yellow">apply now</span>
              </div>
              <p className="label text-white/20 mb-8">listed {timeAgo(job.created_at)}</p>

              {job.apply_url ? (
                <a
                  href={job.apply_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-pill-yellow w-full justify-center mb-4"
                >
                  apply for this role <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <a
                  href={`mailto:${job.contact_email}?subject=Application for ${job.title}`}
                  className="btn-pill btn-pill-yellow w-full justify-center mb-4"
                >
                  apply via email <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              <Link href="/jobs" className="btn-pill btn-pill-ghost w-full justify-center">
                browse all roles
              </Link>
            </motion.div>

            {/* Company card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease }}
              className="border border-white/[0.06] rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-4 h-px bg-[#a374ff]" />
                <span className="label accent-purple">about {job.company.toLowerCase()}</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-3.5 h-3.5 text-white/20 flex-shrink-0" />
                  <span className="label text-white/40">{job.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-3.5 h-3.5 text-white/20 flex-shrink-0" />
                  <span className="label text-white/40">{job.category}</span>
                </div>
                {job.company_url && (
                  <a
                    href={job.company_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <Globe className="w-3.5 h-3.5 text-white/20 group-hover:text-[#17f1d1] transition-colors duration-300 flex-shrink-0" />
                    <span className="label text-white/40 group-hover:text-[#17f1d1] transition-colors duration-300">
                      company website
                    </span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
