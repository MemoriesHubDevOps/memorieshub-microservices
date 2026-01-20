"use client";

import AuthService from "@/src/services/AuthService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokenAsync = async () => {
      try {
        await AuthService.verifyTokenAsync();
        setLoading(false);
      } catch (error) {
        router.push('/login');
      }
    };

    checkTokenAsync();
  }, [router]);

  return <>
    { 
      !loading ?
        <>{children}</>
      :
      <div>Loading ...</div>
    }
    </>;
}