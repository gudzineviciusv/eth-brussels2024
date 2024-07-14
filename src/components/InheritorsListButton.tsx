import React from 'react';

interface InheritorsListButtonProps {
  onClick: () => void;
}

const InheritorsListButton: React.FC<InheritorsListButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded-lg mr-4"
      onClick={onClick}
    >
      Check Inheritors List (BlockScout)
    </button>
  );
};

export default InheritorsListButton;
