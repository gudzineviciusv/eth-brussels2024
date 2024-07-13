"use client";

import React from 'react';
import { WagmiProvider, createConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import {  arbitrumSepolia, lineaTestnet } from 'wagmi/chains';
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

export const zircuitTestnet = /*#__PURE__*/ defineChain({
  id: 48899,
  name: 'Zircuit Testnet',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://zircuit1.p2pify.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Zircuit Explorer',
      url: 'https://explorer.zircuit.com',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 6040287,
    },
  },
})



const config = createConfig(
    // @ts-ignore
  getDefaultConfig({
    appName: 'ComeToMyFuneral',
    chains: [ lineaTestnet, arbitrumSepolia, zircuitTestnet, incoNetwork],
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
