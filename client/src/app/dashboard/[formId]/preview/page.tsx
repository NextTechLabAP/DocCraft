"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PreviewPage = () => {
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
        console.error("Failed to load form", e);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [formId]);

  if (loading) return <div className="p-6">Loading preview...</div>;
  if (!form) return <div className="p-6 text-red-500">Form not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{form.title}</h1>
      <p className="text-gray-600 mb-6">{form.description}</p>
      <ul className="space-y-4">
        {form.questions.map((q: any, index: number) => (
          <li key={q.id} className="border p-4 rounded shadow-sm bg-white">
            <p className="font-semibold">
              {index + 1}. {q.title}
            </p>
            <p className="text-sm text-gray-500">Type: {q.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviewPage;
