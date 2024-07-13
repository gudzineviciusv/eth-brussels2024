"use client";

import React from 'react';
import { WagmiProvider, createConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { sepolia, linea, arbitrumNova, arbitrumSepolia, lineaTestnet , zircuitTestnet} from 'wagmi/chains';
import { defineChain } from 'viem';


export const incoNetwork = /*#__PURE__*/ defineChain({
  id: 9090,
  name: 'Inco Gentry Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'INCO',
    symbol: 'INCO',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.inco.org'], // Replace with actual RPC URL
    },
  },
  blockExplorers: {
    default: {
      name: 'Mainnet Explorer',
      url: 'https://explorer.testnet.inco.org', // Replace with actual block explorer URL
    },
  },
});


const config = createConfig(
    // @ts-ignore
  getDefaultConfig({
    appName: 'ComeToMyFuneral',
    chains: [ lineaTestnet, arbitrumNova, zircuitTestnet, incoNetwork],
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider >{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
