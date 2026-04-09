"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function DeleteJobButton({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    const supabase = createClient();
    await supabase.from("jobs").delete().eq("id", jobId);
    router.refresh();
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={handleDelete}
          className="label px-3 py-1.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors duration-300"
        >
          delete
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="label px-3 py-1.5 rounded-full border border-white/[0.08] text-white/30 hover:text-white/60 transition-colors duration-300"
        >
          cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="w-9 h-9 rounded-full border border-white/[0.06] flex items-center justify-center text-white/20 hover:text-red-400 hover:border-red-400/30 transition-all duration-300"
      title="Delete"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}
