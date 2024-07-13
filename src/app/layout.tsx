// app/layout.tsx
"use client";

import React from 'react';
import { Web3Provider } from '@/components/wrappers/Web3Provider';
import './globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
};

export default RootLayout;
