import React from "react";
import { Eye, BarChart2, Download, Edit2 } from "lucide-react";

type FormRowProps = {
  form: {
    id: number;
    title: string;
    desc: string;
    responses: number;
    created: string;
    status: string;
  };
};

const FormRow: React.FC<FormRowProps> = ({ form }) => (
  <tr className="border-t">
    <td className="py-3 font-semibold">{form.title}</td>
    <td className="py-3 text-sm">{form.desc}</td>
    <td className="py-3">{form.responses}</td>
    <td className="py-3">{form.created}</td>
    <td className="py-3">
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          form.status === "enabled"
            ? "bg-[#e9d5ff] text-[#7c3aed]"
            : "bg-gray-200 text-gray-500"
        }`}
      >
        {form.status === "enabled" ? "Enabled" : "Disabled"}
      </span>
    </td>
    <td className="py-3 flex gap-3">
      <button title="View" className="text-[#7c3aed] hover:text-[#5b21b6]">
        <Eye size={18} />
      </button>
      <button title="Analytics" className="text-[#7c3aed] hover:text-[#5b21b6]">
        <BarChart2 size={18} />
      </button>
      <button title="Download" className="text-[#7c3aed] hover:text-[#5b21b6]">
        <Download size={18} />
      </button>
      <button title="Edit" className="text-[#7c3aed] hover:text-[#5b21b6]">
        <Edit2 size={18} />
      </button>
    </td>
  </tr>
);

export default FormRow;