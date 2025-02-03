"use client"

import Navbar from "@/components/Navbar";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const { data: session } = useSession();

    const router = useRouter()

    const user: User = session?.user;

    if(!user?.isAdmin){
        router.push("/")
    }

  return (
    <>
        <Suspense fallback={<p>Loading...</p>}>
        {children}
        </Suspense>
        </>
  );
}
