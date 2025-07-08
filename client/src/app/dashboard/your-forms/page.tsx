"use client";
import React, { useEffect, useState } from "react";
import FormsTable from "@/components/forms/FormsTable";
import { useAuth } from '@/context/auth-context';

function YourFormsPage() {
  const { user } = useAuth();
  const userId = user?.id || user?.sub;
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchForms = async (userId: string) => {
    setError(null);
    try {
      const res = await fetch(`http://localhost:3000/forms/user/${userId}`);
      if (!res.ok) {
        let errMsg = "Failed to fetch forms";
        try {
          const errData = await res.json();
          if (Array.isArray(errData)) {
            errMsg = errData.map((err: any) => err.message || String(err)).join(', ');
          } else if (typeof errData === 'object' && errData.message) {
            errMsg = errData.message;
          } else {
            errMsg = String(errData);
          }
        } catch {}
        throw new Error(errMsg);
      }
      const data = await res.json();
      // Map backend fields to FormsTable fields
      const mapped = data.map((form: any) => ({
        id: form.id,
        title: form.title,
        desc: form.description || "",
        responses: form.responses ? form.responses.length : 0,
        created: form.createdAt ? new Date(form.createdAt).toLocaleDateString() : "",
        status: form.status || "enabled",
      }));
      setForms(mapped);
    } catch (e: any) {
      let errorString = "Unknown error";
      if (Array.isArray(e)) {
        errorString = e.map((err: any) => err?.message || String(err)).join(', ');
      } else if (typeof e === 'object' && e !== null && 'message' in e) {
        errorString = String(e.message);
      } else {
        errorString = String(e);
      }
      setError(String(errorString));
    }
  };

  useEffect(() => {
    if (!userId) {
      setForms([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchForms(userId).finally(() => setLoading(false));
    const interval = setInterval(() => fetchForms(userId), 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [userId]);

  if (!userId) {
    return <div className="text-center text-gray-500 mt-10">Please log in to view your forms.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#e1e6fa] to-[#e7baff] py-10 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#191c24] mb-6">My Forms</h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <FormsTable forms={forms} />
        )}
      </div>
    </div>
  );
}

export default YourFormsPage;