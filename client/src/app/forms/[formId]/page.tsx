"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Question = {
  id: string;
  title: string;
  type: "string" | "int" | "float" | "boolean" | "dropdown" | "file";
  options?: string[];
};

type Form = {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
};

type AnswerMap = { [key: string]: string | string[] | File };

const PublicFormPage = () => {
  const { formId } = useParams();
  const [form, setForm] = useState<Form | null>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const getSafeValue = (value: string | string[] | File | undefined): string => {
    return typeof value === "string" ? value : "";
  };

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`http://localhost:3000/forms/${formId}`);
        const data = await res.json();
        setForm(data);
      } catch (err) {
        console.error("Failed to load form", err);
      }
    };
    fetchForm();
  }, [formId]);

  const handleChange = (qid: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = async () => {
    setStatus("submitting");
    try {
      const formData = new FormData();
      formData.append("formId", formId?.toString() ?? "");

      const answersArr = Object.entries(answers).map(([questionId, answer]) => {
        if (answer instanceof File) {
          formData.append(`file_${questionId}`, answer);
          return { questionId, answer: `__file__${questionId}` };
        } else if (Array.isArray(answer)) {
          return { questionId, answer: answer.join(",") };
        } else {
          return { questionId, answer };
        }
      });

      formData.append("answers", JSON.stringify(answersArr));

      const res = await fetch(`http://localhost:3000/forms/${formId}/submit`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        setAnswers({});
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!form) return <div className="p-6">Loading form...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{form.title}</h1>
      <p className="text-gray-600 mb-6">{form.description}</p>

      {form.questions.map((q) => (
        <div key={q.id} className="mb-4">
          <label className="block font-medium mb-1">{q.title}</label>

          {q.type === "boolean" && Array.isArray(q.options) ? (
            q.options.map((option, idx) => (
              <label key={idx} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={
                    Array.isArray(answers[q.id]) &&
                    (answers[q.id] as string[]).includes(option)
                  }
                  onChange={(e) => {
                    setAnswers((prev) => {
                      const prevArr = Array.isArray(prev[q.id])
                        ? [...(prev[q.id] as string[])]
                        : [];
                      if (e.target.checked) {
                        return { ...prev, [q.id]: [...prevArr, option] };
                      } else {
                        return {
                          ...prev,
                          [q.id]: prevArr.filter((o) => o !== option),
                        };
                      }
                    });
                  }}
                />
                {option}
              </label>
            ))
          ) : q.type === "string" && Array.isArray(q.options) ? (
            q.options.map((option, idx) => (
              <label key={idx} className="flex items-center mb-1">
                <input
                  type="radio"
                  className="mr-2"
                  name={q.id}
                  checked={answers[q.id] === option}
                  onChange={() => handleChange(q.id, option)}
                />
                {option}
              </label>
            ))
          ) : q.type === "dropdown" && Array.isArray(q.options) ? (
            <select
              className="w-full border p-2 rounded"
              value={getSafeValue(answers[q.id])}
              onChange={(e) => handleChange(q.id, e.target.value)}
            >
              <option value="" disabled>
                Select an option
              </option>
              {q.options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : q.type === "file" ? (
            <input
              type="file"
              className="w-full border p-2 rounded"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setAnswers((prev) => ({ ...prev, [q.id]: file }));
                }
              }}
            />
          ) : q.type === "int" || q.type === "float" ? (
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={getSafeValue(answers[q.id])}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          ) : (
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={getSafeValue(answers[q.id])}
              onChange={(e) => handleChange(q.id, e.target.value)}
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
