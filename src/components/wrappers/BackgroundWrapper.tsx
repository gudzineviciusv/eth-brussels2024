import React from 'react';

const BackgroundComponent: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
      <div
          className="min-h-screen flex flex-col items-center justify-between"
          style={{
            backgroundImage: `url('/background.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
      >
        {children}
      </div>
  );
};

export default BackgroundComponent;
