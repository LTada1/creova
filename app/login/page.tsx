"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  router.push("/dashboard");
  router.refresh();
}

  return (
    <div className="flex min-h-screen items-center justify-center">

      <div className="space-y-4 w-80">

        <h1 className="text-3xl font-bold">
          Welcome Back to CREOVA
        </h1>

        <input
          className="border p-2 rounded w-full"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="bg-black text-white px-4 py-2 rounded w-full"
          onClick={login}
        >
          Login
        </button>

      </div>

    </div>
  );
}
