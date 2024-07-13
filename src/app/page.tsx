"use client"
import { Web3Provider } from "@/components/wrappers/Web3Provider";
import HomePage from "@/pages/home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './globals.css';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <Web3Provider>
      <QueryClientProvider client={queryClient}> 
        <HomePage />
      </QueryClientProvider> 
    </Web3Provider>
  );
}
