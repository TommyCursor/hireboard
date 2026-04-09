"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, X, Menu } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Browse", href: "/jobs" },
  { label: "Remote", href: "/jobs?type=Remote" },
  { label: "Full-Time", href: "/jobs?type=Full-Time" },
];

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-[#1d1d1f]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="label text-[#17f1d1] text-sm tracking-widest lowercase" style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", letterSpacing: "-0.02em", textTransform: "lowercase" }}>
            hireboard
          </Link>

          {/* Center nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="label text-[#fafaf6]/40 hover:text-[#fafaf6] transition-colors duration-300">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard" className="label text-[#fafaf6]/40 hover:text-[#fafaf6] transition-colors duration-300 hidden sm:block">
                  Dashboard
                </Link>
                <button onClick={signOut} className="label text-[#fafaf6]/30 hover:text-[#a374ff] transition-colors duration-300 hidden sm:block">
                  Sign out
                </button>
              </>
            ) : (
              <Link href="/sign-in" className="label text-[#fafaf6]/40 hover:text-[#fafaf6] transition-colors duration-300 hidden sm:block">
                Sign in
              </Link>
            )}
            <Link href="/post-job" className="btn-pill btn-pill-outline" style={{ height: "2.5rem", padding: "0 1.5rem", fontSize: "0.75rem" }}>
              <Plus className="w-3.5 h-3.5" />
              Post a Job
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className="w-10 h-10 rounded-full bg-[#a374ff] flex items-center justify-center md:hidden"
            >
              <Menu className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#fafaf6] flex flex-col p-8"
          >
            <div className="flex items-center justify-between mb-16">
              <span className="text-[#1d1d1f]" style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", letterSpacing: "-0.02em", textTransform: "lowercase" }}>
                hireboard
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-[#a374ff] flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-[#1d1d1f] border-b border-[#1d1d1f]/10 py-5"
                    style={{ fontFamily: "Georgia, serif", fontSize: "3rem", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.04em", textTransform: "lowercase" }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              >
                <Link
                  href="/post-job"
                  onClick={() => setMenuOpen(false)}
                  className="block text-[#a374ff] border-b border-[#1d1d1f]/10 py-5"
                  style={{ fontFamily: "Georgia, serif", fontSize: "3rem", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.04em", textTransform: "lowercase" }}
                >
                  post a job
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
