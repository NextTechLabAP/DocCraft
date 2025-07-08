import React from 'react';

const FormSettings = () => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg mb-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-700 mb-6 font-roboto">Form Settings</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-600 font-roboto mb-2">Form Title</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 hover:border-indigo-200 transition duration-200 font-roboto bg-white shadow-sm border-gray-300"
            placeholder="Enter form title"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-600 font-roboto mb-2">Description</label>
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 hover:border-indigo-200 transition duration-200 font-roboto bg-white shadow-sm border-gray-300"
            placeholder="Enter form description"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-gray-600 font-roboto mb-2">Visibility</label>
          <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 hover:border-indigo-200 transition duration-200 font-roboto bg-white shadow-sm border-gray-300">
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600 font-roboto mb-2">Response Limit</label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 hover:border-indigo-200 transition duration-200 font-roboto bg-white shadow-sm border-gray-300"
            placeholder="Enter response limit"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-roboto mb-2">Deadline</label>
          <input
            type="date"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 hover:border-indigo-200 transition duration-200 font-roboto bg-white shadow-sm border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default FormSettings;