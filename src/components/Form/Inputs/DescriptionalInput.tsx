import React from 'react';

interface DescriptionInputProps {
  description: string;
  onDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({ description, onDescriptionChange }) => {
  return (
    <div className="mb-6">
      <textarea
        className="w-full p-3 text-gray-200 bg-gray-700 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        rows={5}
        placeholder="Description"
        value={description}
        onChange={onDescriptionChange}
      />
    </div>
  );
};

export default DescriptionInput;
