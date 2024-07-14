import React from 'react';

interface CryptoWillButtonProps {
  onClick: () => void;
}

const CryptoWillButton: React.FC<CryptoWillButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded-lg"
      onClick={onClick}
    >
      Check Your Crypto Will (Zerion)
    </button>
  );
};

export default CryptoWillButton;
