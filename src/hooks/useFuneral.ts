import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AccountManagerABI from '../web3/abi/ComeToMyFuneral.json';
import { useAccount } from 'wagmi';
import { arbitrumSepolia, lineaTestnet } from 'wagmi/chains';
import { incoNetwork, zircuitTestnet } from '@/components/wrappers/Web3Provider';

const useAccountManager = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const { chainId } = useAccount();

  const contractAddress = {
    [arbitrumSepolia.id]: '0xC4b46eE0533625Dad498d632f068c795Fa9bF5be',
    [lineaTestnet.id]: '0xCC03f54E4A9D73331B9bC1cAc192cF89BB957472',
    [incoNetwork.id]: '0x', // Replace with actual address
    [zircuitTestnet.id]: '0x', // Replace with actual address
  }[chainId || 1];

  const initializeContract = async () => {
    console.log('Initializing contract', contractAddress, chainId);
    if (typeof window.ethereum === 'undefined' || !contractAddress) {
      console.error('Ethereum provider not found or contract address missing');
      return null;
    }

    try {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);

      const signer = web3Provider.getSigner();
      setSigner(signer);

      const accountAddress = await signer.getAddress();
      setAccount(accountAddress);

      const accountManagerContract = new ethers.Contract(contractAddress, AccountManagerABI, signer);
      setContract(accountManagerContract);
      return accountManagerContract;
    } catch (error) {
      console.error('Error initializing contract:', error);
      setAccount(null);
      setProvider(null);
      setSigner(null);
      setContract(null);
      return null;
    }
  };

  useEffect(() => {
    initializeContract();
  }, [contractAddress]);

  const ensureContract = async () => {
    if (!contract) {
      const initializedContract = await initializeContract();
        if (!initializedContract) {
            console.error('Failed to initialize contract');
            return null;
        }
      return initializedContract;
    }
    console.log('Contract already initialized', contract);
    return contract;
  };

  const createAccount = async () => {
    const contract = await ensureContract();
    if (contract) {
      const tx = await contract.createAccount();
      await tx.wait();
    }
  };

  const addToWhiteList = async (address: string, message: string) => {
    const contract = await ensureContract();
    if (contract) {
      const tx = await contract.addToWhiteList(address, message);
      await tx.wait();
    }
  };

  const addToBlackList = async (address: string, message: string) => {
    const contract = await ensureContract();
    if (contract) {
      const tx = await contract.addToBlackList(address, message);
      await tx.wait();
    }
  };

  const setAdministratorAccount = async (address: string) => {
    const contract = await ensureContract();
    if (contract) {
      const tx = await contract.setAdministratorAccount(address);
      await tx.wait();
    }
  };

  const changeAdmin = async (newAdmin: string) => {
    const contract = await ensureContract();
    if (contract) {
      const tx = await contract.changeAdmin(newAdmin);
      await tx.wait();
    }
  };

  const distributeFunds = async () => {
    const contract = await ensureContract();
    if (contract) {
      const tx = await contract.distributeFunds();
      await tx.wait();
    }
  };

  const claimFunds = async () => {
    const contract = await ensureContract();
    if (contract) {
      const tx = await contract.claim();
      await tx.wait();
    }
  };

  const distributeRemainingFunds = async () => {
    const contract = await ensureContract();
    if (contract) {
      const tx = await contract.distributeRemainingFunds();
      await tx.wait();
    }
  };

  const setMessage = async (address: string, message: string) => {
    const contract = await ensureContract();
    if (contract) {
      const tx = await contract.setMessage(address, message);
      await tx.wait();
    }
  };

  const getMessage = async (address: string) => {
    const contract = await ensureContract();
    if (contract) {
      const message = await contract.getMessage(address);
      return message;
    }
    return null;
  };

  const getWhiteList = async () => {
    try {
    const contract = await ensureContract();
    if (contract) {
      const whiteListAddresses = await contract.getWhiteList();
      return whiteListAddresses;
    }
    console.log('No contract found');
    return [];
    } catch (error) {
        console.error('Error fetching whitelist:', error);
        return [];
    }
  };

  const getBlackList = async () => {
    const contract = await ensureContract();
    if (contract) {
      const blackListAddresses = await contract.getBlackList();
      return blackListAddresses;
    }
    return [];
  };

  return {
    account,
    createAccount,
    addToWhiteList,
    addToBlackList,
    setAdministratorAccount,
    changeAdmin,
    distributeFunds,
    claimFunds,
    distributeRemainingFunds,
    setMessage,
    getMessage,
    getWhiteList,
    getBlackList,
  };
};

export default useAccountManager;
