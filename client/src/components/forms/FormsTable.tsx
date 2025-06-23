import React from "react";
import FormRow from "./FormsRow";

type Form = {
  id: number;
  title: string;
  desc: string;
  responses: number;
  created: string;
  status: string;
};

type FormsTableProps = {
  forms: Form[];
};

const FormsTable: React.FC<FormsTableProps> = ({ forms }) => (
  <div className="bg-white rounded-2xl shadow p-6">
    <table className="w-full text-left">
      <thead>
        <tr className="text-[#7c3aed]">
          <th className="py-2">Title</th>
          <th className="py-2">Description</th>
          <th className="py-2">Responses</th>
          <th className="py-2">Created</th>
          <th className="py-2">Status</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {forms.length > 0 ? (
          forms.map((form) => <FormRow key={form.id} form={form} />)
        ) : (
          <tr>
            <td colSpan={6} className="text-center text-gray-400 py-8">
              No forms created yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default FormsTable;