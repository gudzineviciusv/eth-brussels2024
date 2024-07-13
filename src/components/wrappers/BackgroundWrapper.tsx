import React from 'react';

const BackgroundComponent: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="min-h-screen flex-col bg-gradient-to-r from-purple-800 via-purple-900 to-black flex items-center justify-between">
      {children}
    </div>
  );
};

export default BackgroundComponent;
