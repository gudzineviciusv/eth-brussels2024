import React from 'react';

interface TitleInputProps {
  title: string;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ title, onTitleChange }) => {
  return (
    <div className="mb-6">
      <input
        className="w-full p-3 text-gray-200 bg-gray-700 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        type="text"
        placeholder="NFT Title"
        value={title}
        onChange={onTitleChange}
      />
    </div>
  );
};

export default TitleInput;
