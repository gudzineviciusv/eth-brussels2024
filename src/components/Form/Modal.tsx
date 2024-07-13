import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  imageUrl: string;
  actionText: string;
  onAction: () => void;
  onClose: () => void;
  transactionHash?: string;
  isMinting?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, imageUrl, actionText, onAction, transactionHash, isMinting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
        <div className="text-center">
          <img src={imageUrl} alt="NFT" className="mx-auto mb-4 rounded" style={{ maxHeight: '150px' }} />
          <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-400 mb-4">{description}</p>
          {transactionHash && (
            <p className="text-gray-400 mb-4">
              Transaction Hash: <a href={`https://sepolia.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">{transactionHash}</a>
            </p>
          )}
          <button
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
            disabled={isMinting}
            onClick={transactionHash ? onClose : onAction}
          >
            {isMinting ? 'Minting...' : transactionHash ? 'Close' : actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
