import { Suspense } from "react";
import JobsClient from "./JobsClient";
import Navbar from "@/components/Navbar";

export default function JobsPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Loading jobs...</div>}>
        <JobsClient />
      </Suspense>
    </>
  );
}
