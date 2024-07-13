"use client";

import React, { useState, ChangeEvent, use, useEffect } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from '@/web3/contract';
import useMintNFT from '@/hooks/useNftMint';
import Modal from './Modal';
import Loader from './Loader';
import usePinataUpload from '@/hooks/usePinataUpload';
import ImageUpload from './Inputs/ImageUpload';
import TitleInput from './Inputs/TitleInput';
import DescriptionInput from './Inputs/DescriptionalInput';
import WhitelistInput from "@/components/Form/Inputs/WhitelistInput";
import BlacklistInput from "@/components/Form/Inputs/BlacklistInput";
import FuneralAdminInput from "@/components/Form/Inputs/FuneralAdminInput";
import useAccountManager from '@/hooks/useFuneral';

const MintNFTForm: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [metadataURI, setMetadataURI] = useState<string>('');
  const [funeralAdminPublicAddress, setFuneralAdminPublicAddress] = useState<string>('');
  const [whitelistAddresses, setWhitelistAddresses] = useState<string>('');
  const [blacklistAddresses, setBlacklistAddresses] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(1);

  const { mintNFT, isMinting, mintError } = useMintNFT(contractAddress, abi.abi);
  const { uploadToPinata, isUploading, uploadError } = usePinataUpload();
  const { addToWhiteList, addToBlackList, setAdministratorAccount, getWhiteList } = useAccountManager();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage || !title || !description) return;

    try {
      const uploadResult = await uploadToPinata(selectedImage, title, description);

      if (!uploadResult) {
        throw new Error('Failed to upload to Pinata');
      }

      setMetadataURI(uploadResult.metadataURI);
      setCurrentStep(2);
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
    }
  };

  const handleNextStep = async () => {
    try {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      await provider.send('eth_requestAccounts', []);

      if (currentStep === 2) {
        await addToWhiteList(whitelistAddresses, '');
      } else if (currentStep === 3) {
        await addToBlackList(blacklistAddresses, '');
      } else if (currentStep === 4) {
        await setAdministratorAccount(funeralAdminPublicAddress);
      }

      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Error performing contract action:', error);
    }
  };

  const handleMint = async () => {
    if (!metadataURI) return;

    try {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      const hash = await mintNFT(metadataURI, signer);
      setTransactionHash(hash);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 rounded-lg shadow-lg bg-opacity-85">
      {currentStep === 1 && (
        <>
          <ImageUpload selectedImage={selectedImage} onImageChange={handleImageChange}/>
          <TitleInput title={title} onTitleChange={(e) => setTitle(e.target.value)}/>
          <DescriptionInput description={description} onDescriptionChange={(e) => setDescription(e.target.value)}/>
          {uploadError && <p className="text-red-500">{uploadError}</p>}
          <div className="flex justify-between space-x-4">
            <button
              className="px-4 py-2 bg-gray-700 bg-opacity-50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? <Loader/> : 'Upload Image and Generate Metadata'}
            </button>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <WhitelistInput whitelist={whitelistAddresses} onWhitelistChange={(e) => setWhitelistAddresses(e.target.value)}/>
          <button
            className="px-4 py-2 bg-gray-700 bg-opacity-50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            onClick={handleNextStep}
          >
            Next
          </button>
        </>
      )}

      {currentStep === 3 && (
        <>
          <BlacklistInput blacklist={blacklistAddresses} onBlackListChange={(e) => setBlacklistAddresses(e.target.value)}/>
          <button
            className="px-4 py-2 bg-gray-700 bg-opacity-50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            onClick={handleNextStep}
          >
            Next
          </button>
        </>
      )}

      {currentStep === 4 && (
        <>
          <FuneralAdminInput publicAddress={funeralAdminPublicAddress} onPublicAddressChange={(e) => setFuneralAdminPublicAddress(e.target.value)}/>
          <button
            className="px-4 py-2 bg-gray-700 bg-opacity-50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            onClick={handleNextStep}
          >
            Next
          </button>
        </>
      )}

      {currentStep === 5 && (
        <>
          <button
            className="px-4 py-2 bg-gray-700 bg-opacity-50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            onClick={handleMint}
            disabled={isMinting}
          >
            {isMinting ? <Loader/> : 'Mint NFT'}
          </button>
        </>
      )}

      {mintError && <p className="text-red-500">{mintError}</p>}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
        imageUrl={selectedImage ? URL.createObjectURL(selectedImage) : ''}
        actionText="Close"
        onAction={() => setIsModalOpen(false)}
        isMinting={isMinting}
        transactionHash={transactionHash}
      />
    </div>
  );
};

export default MintNFTForm;
