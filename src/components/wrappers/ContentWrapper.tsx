import React from 'react';

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return (
    <div className="flex justify-between items-start content-wrapper">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
            {children}
        </div>
    </div>
  );
};

export default ContentWrapper;
