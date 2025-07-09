"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PublicFormPage = () => {
  const { formId } = useParams();
  const [form, setForm] = useState<any>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`http://localhost:3000/forms/${formId}`);
        const data = await res.json();
        setForm(data);
      } catch (err) {
        console.error("Failed to load form");
      }
    };
    fetchForm();
  }, [formId]);

  const handleChange = (qid: string, value: string) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = async () => {
    setStatus("submitting");
    try {
      const payload = {
        formId,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
      };

      const res = await fetch(`http://localhost:3000/forms/${formId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        setAnswers({});
      } else throw new Error();
    } catch {
      setStatus("error");
    }
  };

  if (!form) return <div className="p-6">Loading form...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{form.title}</h1>
      <p className="text-gray-600 mb-6">{form.description}</p>

      {form.questions.map((q: any) => (
        <div key={q.id} className="mb-4">
          <label className="block font-medium mb-1">{q.title}</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={answers[q.id] || ""}
            onChange={e => handleChange(q.id, e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={status === "submitting"}
      >
        Submit
      </button>

      {status === "success" && (
        <p className="text-green-600 mt-2">Submitted successfully!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 mt-2">Failed to submit. Try again.</p>
      )}
    </div>
  );
};

export default PublicFormPage;
