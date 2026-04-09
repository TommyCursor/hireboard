import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const allJobs = jobs ?? [];
  const activeCount = allJobs.filter((j) => j.status === "active").length;

  return (
    <>
      <Navbar />
      <DashboardClient
        user={{ email: user.email }}
        jobs={allJobs}
        activeCount={activeCount}
        totalCount={allJobs.length}
      />
    </>
  );
}
