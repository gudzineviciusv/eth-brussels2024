import React from 'react';

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return (
    <div className="flex justify-between items-start main-page-wrapper">
      {children}
    </div>
  );
};

export default ContentWrapper;
