"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

const ease = [0.19, 1, 0.22, 1] as const;
const inputClass =
  "w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl px-5 py-4 text-sm text-[#fafaf6] placeholder:text-white/20 focus:outline-none focus:border-[#a374ff]/50 transition-colors duration-300";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); }
    else { router.push("/dashboard"); router.refresh(); }
  }

  return (
    <div className="min-h-screen bg-[#1d1d1f] flex items-center justify-center px-6">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[#a374ff] opacity-[0.05] blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mb-14"
        >
          <Link href="/" className="label text-[#17f1d1]" style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", letterSpacing: "-0.02em", textTransform: "lowercase" }}>
            hireboard
          </Link>
        </motion.div>

        {/* Heading */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-5 h-px bg-[#a374ff]" />
            <span className="label accent-purple">sign in</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease }}
              className="text-[#fafaf6]"
              style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.03em", textTransform: "lowercase" }}
            >
              welcome back.
            </motion.h1>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-red-500/30 bg-red-500/10 text-red-400 rounded-2xl px-5 py-4 label mb-6"
          >
            {error}
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
          className="space-y-4"
        >
          <div>
            <label className="block label text-white/40 mb-3">email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block label text-white/40 mb-3">password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className={`${inputClass} pr-14`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors duration-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-pill btn-pill-yellow w-full justify-center disabled:opacity-50"
            >
              {loading ? "signing in..." : "sign in"}
            </button>
          </div>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="label text-white/30 text-center mt-8"
        >
          no account?{" "}
          <Link href="/sign-up" className="text-[#a374ff] hover:text-[#a374ff]/80 transition-colors duration-300">
            create one — it&apos;s free
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
