"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export default function DashboardPage() {

  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);


  useEffect(() => {
    loadDashboard();
  }, []);


  async function loadDashboard() {

    const {
      data: { user },
    } = await supabase.auth.getUser();


    if (!user) {
      router.push("/login");
      return;
    }


    const { data: profileData } = await supabase
      .from("brand_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();


    setProfile(profileData);



    const { data: campaignData } = await supabase
      .from("campaigns")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });


    setCampaigns(campaignData || []);

  }



  async function logout() {

    await supabase.auth.signOut();

    router.push("/login");

    router.refresh();

  }



  return (

    <div className="min-h-screen p-10">


      <h1 className="text-4xl font-bold">
        Welcome back, {profile?.brand_name || "Creator"} 👋
      </h1>


      <p className="mt-2 text-gray-600">
        Your CREOVA creative operating system is ready.
      </p>



      {profile && (

        <div className="mt-8 border rounded-xl p-6 max-w-xl">

          <h2 className="text-2xl font-bold">
            Brand Profile
          </h2>


          <p className="mt-3">
            Industry: {profile.industry}
          </p>


          <p>
            Audience: {profile.target_audience}
          </p>


          <p>
            Voice: {profile.brand_voice}
          </p>


        </div>

      )}



      <div className="mt-10">

        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            Campaigns
          </h2>


          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={() => router.push("/campaigns/new")}
          >
            + Create Campaign
          </button>


        </div>



        <div className="mt-5 space-y-4">


          {campaigns.length === 0 && (

            <p>
              No campaigns yet.
            </p>

          )}



          {campaigns.map((campaign)=>(

            <div
              key={campaign.id}
              className="border rounded-xl p-5"
            >

              <h3 className="text-xl font-bold">
                {campaign.title}
              </h3>


              <p>
                Platform: {campaign.platform}
              </p>


              <p>
                Status: {campaign.status}
              </p>


            </div>

          ))}


        </div>


      </div>



      <button
        className="mt-10 bg-black text-white px-5 py-2 rounded"
        onClick={logout}
      >
        Logout
      </button>


    </div>

  );

}
