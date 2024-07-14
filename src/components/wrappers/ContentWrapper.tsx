import React from 'react';

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return (
    <div className="flex justify-between items-start content-wrapper">
        <div className="bg-black bg-opacity-70 p-8 rounded-lg border border-gray-500 max-w-md w-full">
            {children}
        </div>
    </div>
  );
};

export default ContentWrapper;
