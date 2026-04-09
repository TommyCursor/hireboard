import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import EditJobForm from "./EditJobForm";

export default async function EditJobPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data: job } = await supabase.from("jobs").select("*").eq("id", params.id).eq("user_id", user.id).single();

  if (!job) notFound();

  return (
    <>
      <Navbar />
      <EditJobForm job={job} />
    </>
  );
}
