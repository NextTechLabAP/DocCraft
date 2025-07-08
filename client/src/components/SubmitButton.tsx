import React from 'react';

const SubmitButton = ({ onClick, disabled }: { onClick?: () => void; disabled?: boolean }) => {
  return (
    <div className="text-center">
      <button className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300" onClick={onClick} disabled={disabled}>
        Submit
      </button>
    </div>
  );
};

export default SubmitButton;