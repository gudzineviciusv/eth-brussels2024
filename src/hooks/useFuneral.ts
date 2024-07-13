import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AccountManagerABI from '../web3/abi/ComeToMyFuneral.json';
import { useAccount } from 'wagmi';
import {  arbitrumSepolia, lineaTestnet } from 'wagmi/chains';
import { incoNetwork, zircuitTestnet } from '@/components/wrappers/Web3Provider';


const useAccountManager = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const { chainId } = useAccount();

  const contractAddress = {
    [arbitrumSepolia.id]: '0xFEB5B03A501f808b6E2ed717421012A7549098f5', //add supportedAccount
    [lineaTestnet.id]: '0xCC03f54E4A9D73331B9bC1cAc192cF89BB957472',
    [incoNetwork.id]: '0x',
    [zircuitTestnet.id]: '0x',
    }[chainId || 1];

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);

      web3Provider.getSigner().getAddress()
        .then(address => setAccount(address))
        .catch(() => setAccount(null));

      setSigner(web3Provider.getSigner());

      const accountManagerContract = new ethers.Contract(contractAddress!, AccountManagerABI, web3Provider.getSigner());
      setContract(accountManagerContract);
    }
  }, [contractAddress]);

  const createAccount = async () => {
    if (contract) {
      const tx = await contract.createAccount();
      await tx.wait();
    }
  };

  const addToWhiteList = async (address: string, message: string) => {
    if (contract) {
      const tx = await contract.addToWhiteList(address, message);
      await tx.wait();
    }
  };

  const addToBlackList = async (address: string, message: string) => {
    if (contract) {
      const tx = await contract.addToBlackList(address, message);
      await tx.wait();
    }
  };

  const setAdministratorAccount = async (address: string) => {
    if (contract) {
      const tx = await contract.setAdministratorAccount(address);
      await tx.wait();
    }
  };

  const changeAdmin = async (newAdmin: string) => {
    if (contract) {
      const tx = await contract.changeAdmin(newAdmin);
      await tx.wait();
    }
  };

  const distributeFunds = async () => {
    if (contract) {
      const tx = await contract.distributeFunds();
      await tx.wait();
    }
  };

  const claimFunds = async () => {
    if (contract) {
      const tx = await contract.claim();
      await tx.wait();
    }
  };

  const distributeRemainingFunds = async () => {
    if (contract) {
      const tx = await contract.distributeRemainingFunds();
      await tx.wait();
    }
  };

  const setMessage = async (address: string, message: string) => {
    if (contract) {
      const tx = await contract.setMessage(address, message);
      await tx.wait();
    }
  };

  const getMessage = async (address: string) => {
    if (contract) {
      const message = await contract.getMessage(address);
      return message;
    }
    return null;
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
  };
};

export default useAccountManager;
