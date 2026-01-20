"use client";

import axiosInstance from "@/src/utils/AxiosUtils";
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
        await axiosInstance.get('/auth/validate-token');
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