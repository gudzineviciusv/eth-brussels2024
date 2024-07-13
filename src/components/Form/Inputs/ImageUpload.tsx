import React, { ChangeEvent } from 'react';

interface ImageUploadProps {
  selectedImage: File | null;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ selectedImage, onImageChange }) => {
  return (
    <div className="mb-6 border-2 border-gray-600 border-dashed rounded-lg p-4 text-center text-gray-400">
      <label htmlFor="imageUpload" className="cursor-pointer block">
        {selectedImage ? (
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="mx-auto mb-2 rounded" style={{ maxHeight: '150px' }} />
        ) : (
          <>
            <p>Upload Image</p>
            <p className="text-gray-500">Format supported: .jpg, .png, .gif, etc.</p>
          </>
        )}
      </label>
      <input
        className="hidden"
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={onImageChange}
      />
    </div>
  );
};

export default ImageUpload;
