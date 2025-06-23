import React from "react";
import FormsTable from "@/components/forms/FormsTable";

const dummyForms = [
  {
    id: 1,
    title: "Student Feedback",
    desc: "Semester-end feedback form",
    responses: 123,
    created: "02-05-2025",
    status: "enabled",
  },
  {
    id: 2,
    title: "Event RSVP",
    desc: "Annual Tech Fest registration",
    responses: 87,
    created: "06-06-2025",
    status: "disabled",
  },
  {
    id: 3,
    title: "Project Poll",
    desc: "Vote for next project topic",
    responses: 45,
    created: "11-06-2025",
    status: "enabled",
  },
];

function YourFormsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#e1e6fa] to-[#e7baff] py-10 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#191c24] mb-6">My Forms</h2>
        <FormsTable forms={dummyForms} />
      </div>
    </div>
  );
}

export default YourFormsPage;