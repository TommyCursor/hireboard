"use client";

import Link from "next/link";
import { Plus, Eye, Pencil, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { timeAgo } from "@/lib/utils";
import DeleteJobButton from "./DeleteJobButton";

const ease = [0.19, 1, 0.22, 1] as const;

type Job = Record<string, any>;

export default function DashboardClient({
  user,
  jobs,
  activeCount,
  totalCount,
}: {
  user: { email?: string };
  jobs: Job[];
  activeCount: number;
  totalCount: number;
}) {
  return (
    <div className="min-h-screen bg-[#1d1d1f] text-[#fafaf6]">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <div className="flex items-start justify-between mb-14 pb-14 border-b border-white/[0.06]">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-5 h-px bg-[#a374ff]" />
              <span className="label accent-purple">dashboard</span>
            </motion.div>
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease }}
                className="text-[#fafaf6]"
                style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.03em", textTransform: "lowercase" }}
              >
                your listings.
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="label text-white/25"
            >
              {user.email}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            <Link href="/post-job" className="btn-pill btn-pill-yellow flex-shrink-0">
              <Plus className="w-3.5 h-3.5" /> post a role
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
          className="grid grid-cols-3 gap-px bg-white/[0.04] rounded-3xl overflow-hidden mb-14"
        >
          {[
            { label: "total listings", value: totalCount, color: "#17f1d1" },
            { label: "active roles", value: activeCount, color: "#a374ff" },
            { label: "plan", value: "free", color: "#ffd074" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.08, ease }}
              className="bg-[#1d1d1f] p-8"
            >
              <p className="label text-white/30 mb-3">{stat.label}</p>
              <p className="title-md" style={{ color: stat.color }}>{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Jobs list */}
        {totalCount === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
            className="border border-white/[0.06] rounded-3xl p-16 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-6 h-6 text-white/20" />
            </div>
            <p
              className="text-[#fafaf6]/50 mb-2"
              style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", textTransform: "lowercase" }}
            >
              no listings yet.
            </p>
            <p className="label text-white/20 mb-8">post your first role and reach thousands of candidates</p>
            <Link href="/post-job" className="btn-pill btn-pill-yellow">
              <Plus className="w-3.5 h-3.5" /> post your first role
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="border border-white/[0.06] rounded-3xl overflow-hidden"
          >
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.06, ease }}
                className="flex items-start justify-between gap-6 py-6 px-8 border-b border-white/[0.06] last:border-b-0 hover:bg-white/[0.02] transition-colors duration-300 relative"
              >
                {job.is_featured && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#ffd074]" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h3
                      className="text-[#fafaf6]"
                      style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.02em", textTransform: "lowercase" }}
                    >
                      {job.title}
                    </h3>
                    <span className={`label px-2.5 py-1 rounded-full ${job.status === "active" ? "text-[#17f1d1] bg-[#17f1d1]/10" : "text-white/30 bg-white/[0.04]"}`}>
                      {job.status}
                    </span>
                    {job.is_featured && (
                      <span className="label text-[#ffd074] bg-[#ffd074]/10 px-2.5 py-1 rounded-full">featured</span>
                    )}
                  </div>
                  <p className="label text-white/30">{job.company} · {job.location} · {job.type}</p>
                  <p className="label text-white/15 mt-1">posted {timeAgo(job.created_at)}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="w-9 h-9 rounded-full border border-white/[0.06] flex items-center justify-center text-white/20 hover:text-[#17f1d1] hover:border-[#17f1d1]/30 transition-all duration-300"
                    title="View"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/dashboard/edit/${job.id}`}
                    className="w-9 h-9 rounded-full border border-white/[0.06] flex items-center justify-center text-white/20 hover:text-[#a374ff] hover:border-[#a374ff]/30 transition-all duration-300"
                    title="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Link>
                  <DeleteJobButton jobId={job.id} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
