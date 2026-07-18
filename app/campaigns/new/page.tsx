"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function NewCampaignPage() {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [objective, setObjective] = useState("");
  const [audience, setAudience] = useState("");
  const [platform, setPlatform] = useState("");


  async function createCampaign() {

    const {
      data: { user },
    } = await supabase.auth.getUser();


    if (!user) {
      router.push("/login");
      return;
    }


    const { error } = await supabase
      .from("campaigns")
      .insert({
        user_id: user.id,
        title,
        objective,
        audience,
        platform,
      });


    if (error) {
      alert(error.message);
      return;
    }


    router.push("/dashboard");

  }


  return (

    <div className="min-h-screen flex items-center justify-center">

      <div className="w-96 space-y-4">

        <h1 className="text-3xl font-bold">
          Create Campaign
        </h1>


        <input
          className="border p-2 rounded w-full"
          placeholder="Campaign name"
          onChange={(e)=>setTitle(e.target.value)}
        />


        <textarea
          className="border p-2 rounded w-full"
          placeholder="Campaign objective"
          onChange={(e)=>setObjective(e.target.value)}
        />


        <textarea
          className="border p-2 rounded w-full"
          placeholder="Target audience"
          onChange={(e)=>setAudience(e.target.value)}
        />


        <input
          className="border p-2 rounded w-full"
          placeholder="Platform (TikTok, Instagram, YouTube...)"
          onChange={(e)=>setPlatform(e.target.value)}
        />


        <button
          className="bg-black text-white p-2 rounded w-full"
          onClick={createCampaign}
        >
          Create Campaign
        </button>


      </div>

    </div>

  );

}
