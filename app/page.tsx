"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Toast from "./Toast";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Use useEffect to handle navigation
  useEffect(() => {
    if (status === "loading") return; // Avoid navigating while session is loading
    if (!session?.user) {
      router.push(`\login?message=loginpage`);
    }
  }, [session, status, router]);

  return (
    <>
    <Toast />
    <div>
      {session?.user ? (
        <>
          <h1>Welcome, {session.user?.name}!</h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        "Redirecting..."
      )}
    </div></>
  );
}
