import React from 'react';
import { Type, Hash, Calendar, CheckSquare, Circle, List, AlignJustify, Paperclip } from 'lucide-react';

const FormFields = () => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-6 flex">
      {}
      <div className="w-1/4 pr-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">FORM FIELDS</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center p-2 bg-gray-100 rounded hover:bg-gray-200">
            <Type size={16} className="mr-2" /> Text
          </button>
          <button className="w-full flex items-center p-2 bg-gray-100 rounded hover:bg-gray-200">
            <Hash size={16} className="mr-2" /> Number
          </button>
          <button className="w-full flex items-center p-2 bg-gray-100 rounded hover:bg-gray-200">
            <Calendar size={16} className="mr-2" /> Date
          </button>
          <button className="w-full flex items-center p-2 bg-gray-100 rounded hover:bg-gray-200">
            <CheckSquare size={16} className="mr-2" /> Checkbox
          </button>
          <button className="w-full flex items-center p-2 bg-gray-100 rounded hover:bg-gray-200">
            <Circle size={16} className="mr-2" /> Radio
          </button>
          <button className="w-full flex items-center p-2 bg-gray-100 rounded hover:bg-gray-200">
            <List size={16} className="mr-2" /> Dropdown
          </button>
          <button className="w-full flex items-center p-2 bg-gray-100 rounded hover:bg-gray-200">
            <AlignJustify size={16} className="mr-2" /> Textarea
          </button>
          <button className="w-full flex items-center p-2 bg-gray-100 rounded hover:bg-gray-200">
            <Paperclip size={16} className="mr-2" /> File
          </button>
        </div>
      </div>

      {}
      <div className="w-3/4 pl-4">
        <div className="border-dashed border-2 border-gray-300 p-4 rounded-lg mb-4 min-h-[200px]">
          <p className="text-gray-500 text-center">Drag and drop fields</p>
        </div>
      </div>
    </div>
  );
};

export default FormFields;