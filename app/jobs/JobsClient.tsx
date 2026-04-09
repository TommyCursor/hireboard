"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, X, MapPin, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import JobCard, { Job } from "@/components/JobCard";
import { createClient } from "@/lib/supabase/client";

const JOB_TYPES = ["Full-Time", "Part-Time", "Contract", "Internship", "Remote"];
const CATEGORIES = ["Engineering", "Design", "Marketing", "Sales", "Finance", "Healthcare", "Operations"];

const ease = [0.19, 1, 0.22, 1] as const;

export default function JobsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [type, setType] = useState(searchParams.get("type") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [showFilters, setShowFilters] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    let q = supabase
      .from("jobs")
      .select("*")
      .eq("status", "active")
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (query) q = q.or(`title.ilike.%${query}%,company.ilike.%${query}%,description.ilike.%${query}%`);
    if (location) q = q.ilike("location", `%${location}%`);
    if (type) q = q.eq("type", type);
    if (category) q = q.eq("category", category);

    const { data } = await q.limit(50);
    setJobs(data ?? []);
    setLoading(false);
  }, [query, location, type, category]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  function clearFilters() {
    setQuery(""); setLocation(""); setType(""); setCategory("");
    router.push("/jobs");
  }

  const hasFilters = query || location || type || category;

  return (
    <div className="min-h-screen bg-[#1d1d1f] text-[#fafaf6]">

      {/* ── Page header ── */}
      <div className="pt-32 pb-12 px-6 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-5 h-px bg-[#17f1d1]" />
            <span className="label accent-turquoise">all roles</span>
          </motion.div>

          <motion.h1
            className="title-lg text-[#fafaf6] mb-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
          >
            {loading ? "searching..." : `${jobs.length} open ${jobs.length === 1 ? "role" : "roles"}`}
          </motion.h1>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="flex flex-col sm:flex-row gap-0 rounded-full overflow-hidden border border-white/[0.1] bg-white/[0.03] backdrop-blur-sm mb-6"
            style={{ maxWidth: "680px" }}
          >
            <div className="flex items-center gap-2 px-5 flex-1">
              <Search className="w-4 h-4 text-white/20 flex-shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="role, company, skill..."
                className="flex-1 bg-transparent text-sm text-[#fafaf6] placeholder:text-white/20 focus:outline-none py-4 lowercase"
              />
            </div>
            <div className="flex items-center gap-2 px-5 border-l border-white/[0.06]">
              <MapPin className="w-4 h-4 text-white/20 flex-shrink-0" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="location"
                className="w-28 bg-transparent text-sm text-[#fafaf6] placeholder:text-white/20 focus:outline-none lowercase"
              />
            </div>
            <div className="flex items-center gap-2 px-4 border-l border-white/[0.06]">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 label transition-colors duration-300 py-4 ${showFilters ? "text-[#a374ff]" : "text-white/30 hover:text-white/60"}`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                filters
              </button>
            </div>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-5 border-l border-white/[0.06] label text-white/30 hover:text-[#ffd074] transition-colors duration-300"
              >
                <X className="w-3 h-3" /> clear
              </button>
            )}
          </motion.div>

          {/* Type pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex gap-2 flex-wrap"
          >
            {JOB_TYPES.map((t, i) => (
              <motion.button
                key={t}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.06, ease }}
                onClick={() => setType(type === t ? "" : t)}
                className={`label px-3 py-1.5 rounded-full border transition-all duration-300 ${
                  type === t
                    ? "border-[#17f1d1] text-[#17f1d1] bg-[#17f1d1]/5"
                    : "border-white/[0.08] text-white/30 hover:border-white/20 hover:text-white/50"
                }`}
              >
                {t}
              </motion.button>
            ))}
          </motion.div>

          {/* Category filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease }}
                className="overflow-hidden"
              >
                <div className="flex gap-2 flex-wrap pt-4 mt-4 border-t border-white/[0.06]">
                  <span className="label text-white/20 self-center">category</span>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(category === c ? "" : c)}
                      className={`label px-3 py-1.5 rounded-full border transition-all duration-300 ${
                        category === c
                          ? "border-[#a374ff] text-[#a374ff] bg-[#a374ff]/5"
                          : "border-white/[0.08] text-white/30 hover:border-white/20 hover:text-white/50"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 rounded-full border border-white/10 border-t-white/40"
              />
              <p className="label text-white/20">fetching roles...</p>
            </motion.div>
          ) : jobs.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-white/20" />
              </div>
              <p
                className="text-[#fafaf6]/50 mb-2"
                style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", textTransform: "lowercase" }}
              >
                no roles found.
              </p>
              <p className="label text-white/20 mb-8">try adjusting your search or filters</p>
              <button onClick={clearFilters} className="btn-pill btn-pill-outline" style={{ height: "2.5rem", padding: "0 1.5rem", fontSize: "0.75rem" }}>
                clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="border border-white/[0.06] rounded-3xl overflow-hidden"
            >
              {jobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.05, ease }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
