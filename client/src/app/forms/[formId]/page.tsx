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
          {q.type === 'boolean' && Array.isArray(q.options) && q.options.length > 0 ? (
            q.options.map((option: string, idx: number) => (
              <label key={idx} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={Array.isArray(answers[q.id]) ? answers[q.id].includes(option) : false}
                  onChange={e => {
                    setAnswers(prev => {
                      const prevArr = Array.isArray(prev[q.id]) ? [...prev[q.id]] : [];
                      if (e.target.checked) {
                        return { ...prev, [q.id]: [...prevArr, option] };
                      } else {
                        return { ...prev, [q.id]: prevArr.filter((o: string) => o !== option) };
                      }
                    });
                  }}
                />
                {option}
              </label>
            ))
          ) : q.type === 'string' && Array.isArray(q.options) && q.options.length > 0 ? (
            // Render radio buttons for string type with options
            q.options.map((option: string, idx: number) => (
              <label key={idx} className="flex items-center mb-1">
                <input
                  type="radio"
                  className="mr-2"
                  name={q.id}
                  checked={answers[q.id] === option}
                  onChange={() => setAnswers(prev => ({ ...prev, [q.id]: option }))}
                />
                {option}
              </label>
            ))
          ) : q.type === 'dropdown' && Array.isArray(q.options) && q.options.length > 0 ? (
            <select
              className="w-full border p-2 rounded"
              value={answers[q.id] || ''}
              onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
            >
              <option value="" disabled>Select an option</option>
              {q.options.map((option: string, idx: number) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          ) : q.type === 'file' ? (
            <input
              type="file"
              className="w-full border p-2 rounded"
              onChange={e => {
                const file = e.target.files && e.target.files[0];
                setAnswers(prev => ({ ...prev, [q.id]: file }));
              }}
            />
          ) : q.type === 'string' && Array.isArray(q.options) && q.options.length === 0 ? (
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={answers[q.id] || ""}
              onChange={e => handleChange(q.id, e.target.value)}
            />
          ) : q.type === 'int' || q.type === 'float' ? (
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={answers[q.id] || ""}
              onChange={e => handleChange(q.id, e.target.value)}
            />
          ) : (
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={answers[q.id] || ""}
              onChange={e => handleChange(q.id, e.target.value)}
            />
          )}
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
