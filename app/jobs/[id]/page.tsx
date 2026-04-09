import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import JobDetailClient from "./JobDetailClient";

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: job } = await supabase.from("jobs").select("*").eq("id", params.id).single();

  if (!job) notFound();

  return (
    <>
      <Navbar />
      <JobDetailClient job={job} />
    </>
  );
}
