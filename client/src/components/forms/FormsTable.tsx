import React from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  forms: {
    id: string;
    title: string;
    desc: string;
    responses: number;
    created: string;
    status: string;
    shareUrl: string;
  }[];
  onShare: (url: string) => void;
};

const FormsTable: React.FC<Props> = ({ forms, onShare }) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-700">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Responses</th>
            <th className="px-4 py-2">Created</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {forms.map(form => (
            <tr key={form.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 font-medium text-blue-600">{form.title}</td>
              <td className="px-4 py-2">{form.responses}</td>
              <td className="px-4 py-2">{form.created}</td>
              <td className="px-4 py-2 flex flex-wrap gap-2">
                <button
                  className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                  onClick={() => router.push(`/dashboard/${form.id}/preview`)}
                >
                  Preview
                </button>
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  onClick={() => router.push(`/dashboard/${form.id}/responses`)}
                >
                  Responses
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  onClick={() => router.push(`/dashboard/${form.id}/analytics`)}
                >
                  Analytics
                </button>
                <button
                  className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
                  onClick={() => router.push(`/dashboard/${form.id}/settings`)}
                >
                  Settings
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => router.push(`/dashboard/${form.id}/edit`)}
                >
                  Edit
                </button>
                <button
                  className="bg-black text-white px-3 py-1 rounded hover:bg-black/80"
                  onClick={() => onShare(form.shareUrl)}
                >
                  Share
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormsTable;
