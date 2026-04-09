import Link from "next/link";
import { MapPin, DollarSign, ArrowUpRight } from "lucide-react";
import { timeAgo, formatSalary } from "@/lib/utils";

export type Job = {
  id: string;
  title: string;
  company: string;
  company_logo?: string;
  location: string;
  type: string;
  category: string;
  salary_min?: number;
  salary_max?: number;
  description: string;
  is_featured: boolean;
  is_remote: boolean;
  created_at: string;
};

export default function JobCard({ job }: { job: Job }) {
  const initials = job.company.slice(0, 2).toUpperCase();

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group flex items-start justify-between gap-6 py-7 px-6 border-b border-white/[0.06] hover:bg-white/[0.02] transition-all duration-500 relative overflow-hidden"
    >
      {/* Featured left accent */}
      {job.is_featured && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#ffd074]" />
      )}

      {/* Left */}
      <div className="flex items-start gap-5 flex-1 min-w-0">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:border-[#a374ff]/30 transition-colors duration-500">
          <span className="label text-white/30 group-hover:text-[#a374ff] transition-colors duration-500">{initials}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="label text-white/30 mb-2">{job.company}</div>
          <h3
            className="text-[#fafaf6] group-hover:text-[#17f1d1] transition-colors duration-500 mb-3 truncate"
            style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em", textTransform: "lowercase", lineHeight: 1.1 }}
          >
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <span className="label text-white/20 flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5" />
              {job.is_remote ? "Remote" : job.location}
            </span>
            <span className="label text-white/20">{job.type}</span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-white/[0.06] label text-white/30">
              {job.category}
            </span>
            {(job.salary_min || job.salary_max) && (
              <span className="label text-[#ffd074] flex items-center gap-1">
                <DollarSign className="w-2.5 h-2.5" />
                {formatSalary(job.salary_min, job.salary_max)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-3 flex-shrink-0 pt-1">
        <div className="w-8 h-8 rounded-full border border-white/[0.06] flex items-center justify-center group-hover:border-[#17f1d1]/30 group-hover:bg-[#17f1d1]/5 transition-all duration-500">
          <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#17f1d1] transition-colors duration-500" />
        </div>
        <span className="label text-white/15">{timeAgo(job.created_at)}</span>
        {job.is_featured && (
          <span className="label text-[#ffd074] bg-[#ffd074]/10 px-2.5 py-1 rounded-full">
            featured
          </span>
        )}
      </div>
    </Link>
  );
}
