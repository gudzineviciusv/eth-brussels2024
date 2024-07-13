import { useState } from 'react';
import axios from 'axios';

interface UploadResult {
  imageURI: string;
  metadataURI: string;
}

const usePinataUpload = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadToPinata = async (file: File, title: string, description: string): Promise<UploadResult | undefined> => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const fileResponse = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'multipart/form-data',
          'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY as string,
          'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY as string,
        },
      });

      const imageHash = fileResponse.data.IpfsHash;
      const imageURI = `${process.env.NEXT_PUBLIC_IPFS_NODE}/${imageHash}`;

      const metadata = {
        name: title,
        description,
        image: imageURI,
      };

      const metadataResponse = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', metadata, {
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY as string,
          'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY as string,
        },
      });

      const metadataURI = `${process.env.NEXT_PUBLIC_IPFS_NODE}/${metadataResponse.data.IpfsHash}`;

      setIsUploading(false);
      return { imageURI, metadataURI };
    } catch (error: any) {
      setIsUploading(false);
      setUploadError(error.message);
      console.error('Error uploading to Pinata:', error);
      return undefined;
    }
  };

  return { uploadToPinata, isUploading, uploadError };
};

export default usePinataUpload;
