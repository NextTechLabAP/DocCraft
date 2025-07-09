"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ResponsesPage = () => {
  const { formId } = useParams();
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await fetch(`http://localhost:3000/forms/${formId}/responses`);
        const data = await res.json();
        setResponses(data);
      } catch (e) {
        console.error("Error fetching responses", e);
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, [formId]);

  if (loading) return <div className="p-6">Loading responses...</div>;
  if (!responses.length) return <div className="p-6 text-gray-500">No responses yet.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Responses</h1>
      {responses.map((response, i) => (
        <div key={response.id} className="border rounded mb-4 p-4 bg-white shadow">
          <p className="text-sm text-gray-600 mb-2">Submitted on: {new Date(response.createdAt).toLocaleString()}</p>
          <ul className="list-disc pl-5 space-y-1">
            {response.answers.map((ans: any) => (
              <li key={ans.id}>
                <strong>{ans.question.title}:</strong> {ans.answer}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ResponsesPage;
