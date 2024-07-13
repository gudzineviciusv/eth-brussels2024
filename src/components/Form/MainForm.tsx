"use client"

import React, { useState, ChangeEvent } from 'react';
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

const MintNFTForm: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [metadata, setMetadataURI] = useState<string>('');
  const [funeralAdminPublicAddress, setFuneralAdminPublicAddress] = useState<string>('');
  const [whitelistAddresses, setWhitelistAddresses] = useState<string>('');
  const [blacklistAddresses, setBlacklistAddresses] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const { mintNFT, isMinting, mintError } = useMintNFT(contractAddress, abi.abi);
  const { uploadToPinata, isUploading, uploadError } = usePinataUpload();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    try {
      const uploadResult = await uploadToPinata(selectedImage, title, description);

      if (!uploadResult) {
        throw new Error('Failed to upload to Pinata');
      }

      const { metadataURI } = uploadResult;
      setMetadataURI(metadataURI);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
    }
  };

  const handleMint = async () => {
    if (!selectedImage) return;

    try {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      const hash = await mintNFT(metadata, signer);
      setTransactionHash(hash);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
      <div className="max-w-lg mx-auto p-6 bg-gray-900 rounded-lg shadow-lg bg-opacity-85">

          <ImageUpload selectedImage={selectedImage} onImageChange={handleImageChange}/>
          {uploadError && <p className="text-red-500">{uploadError}</p>}
          {mintError && <p className="text-red-500">{mintError}</p>}
          <div className="mb-6 text-center">
              <h2 className="text-lg font-semibold text-gray-300">You Funeral NFT Information</h2>
          </div>
          <TitleInput title={title} onTitleChange={(e) => setTitle(e.target.value)}/>
          <DescriptionInput description={description} onDescriptionChange={(e) => setDescription(e.target.value)}/>
          <FuneralAdminInput publicAddress={funeralAdminPublicAddress}
                             onPublicAddressChange={(e) => setFuneralAdminPublicAddress(e.target.value)}/>
          <WhitelistInput whitelist={whitelistAddresses}
                          onWhitelistChange={(e) => setWhitelistAddresses(e.target.value)}/>
          <BlacklistInput blacklist={blacklistAddresses}
                          onBlackListChange={(e) => setBlacklistAddresses(e.target.value)}/>

          <div className="flex justify-between space-x-4">
              <button
                  className="px-4 py-2 bg-gray-700 bg-opacity-50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  onClick={handleUpload}
                  disabled={isUploading || isMinting}
              >
                  {isUploading || isMinting ? <Loader/> : 'Create your death wish'}
              </button>
          </div>

          <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title={title}
              description={description}
              imageUrl={selectedImage ? URL.createObjectURL(selectedImage) : ''}
              actionText="Continue"
              onAction={handleMint}
              isMinting={isMinting}
              transactionHash={transactionHash}
          />
      </div>
  );
};

export default MintNFTForm;
