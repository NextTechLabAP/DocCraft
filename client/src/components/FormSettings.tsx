import React from 'react';

const FormSettings = () => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Form Settings</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600">Form Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter form title"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-600">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Enter form description"
          />
        </div>
        <div>
          <label className="block text-gray-600">Visibility</label>
          <select className="w-full p-2 border rounded">
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600">Response Limit</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Enter response limit"
          />
        </div>
        <div>
          <label className="block text-gray-600">Deadline</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default FormSettings;