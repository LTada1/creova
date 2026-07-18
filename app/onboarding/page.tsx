"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [audience, setAudience] = useState("");
  const [voice, setVoice] = useState("");

  async function createBrandProfile() {

    const {
      data: { user },
    } = await supabase.auth.getUser();


    if (!user) {
      router.push("/login");
      return;
    }


    const { error } = await supabase
      .from("brand_profiles")
      .insert({
        user_id: user.id,
        brand_name: brandName,
        industry,
        target_audience: audience,
        brand_voice: voice,
      });


    if (error) {
      alert(error.message);
      return;
    }


    router.push("/dashboard");
  }


  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="space-y-4 w-96">

        <h1 className="text-3xl font-bold">
          Build Your Brand Profile
        </h1>


        <input
          className="border p-2 rounded w-full"
          placeholder="Brand name"
          onChange={(e)=>setBrandName(e.target.value)}
        />


        <input
          className="border p-2 rounded w-full"
          placeholder="Industry"
          onChange={(e)=>setIndustry(e.target.value)}
        />


        <textarea
          className="border p-2 rounded w-full"
          placeholder="Who is your target audience?"
          onChange={(e)=>setAudience(e.target.value)}
        />


        <textarea
          className="border p-2 rounded w-full"
          placeholder="Describe your brand voice"
          onChange={(e)=>setVoice(e.target.value)}
        />


        <button
          className="bg-black text-white px-4 py-2 rounded w-full"
          onClick={createBrandProfile}
        >
          Create Brand Profile
        </button>


      </div>

    </div>
  );
}
