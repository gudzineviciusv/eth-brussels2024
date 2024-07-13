// app/layout.tsx
"use client";

import React from 'react';
import { Web3Provider } from '@/components/wrappers/Web3Provider';
import './globals.css';
import TopBar from '@/components/TopBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
        <QueryClientProvider client={queryClient}> 
          <TopBar />
            {children}
        </QueryClientProvider> 

        </Web3Provider>
      </body>
    </html>
  );
};

export default RootLayout;
