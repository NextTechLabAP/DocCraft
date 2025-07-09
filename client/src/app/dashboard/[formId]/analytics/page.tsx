"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const AnalyticsPage = () => {
  const { formId } = useParams();
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`http://localhost:3000/forms/${formId}`);
        const data = await res.json();
        setForm(data);
      } catch (e) {
        console.error("Analytics fetch failed", e);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [formId]);

  if (loading) return <div className="p-6">Loading analytics...</div>;
  if (!form) return <div className="p-6 text-red-500">Form not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Analytics for: {form.title}</h1>
      <p className="mb-4 text-gray-600">Total responses: {form.responses?.length || 0}</p>
      <ul className="divide-y">
        {form.questions.map((q: any) => (
          <li key={q.id} className="py-3">
            <p className="font-semibold">{q.title}</p>
            <p className="text-sm text-gray-500">Type: {q.type}</p>
            {/* You can later add charts/stats here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalyticsPage;
