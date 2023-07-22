import React, { useState, useEffect } from 'react';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedImages([]);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onUpload(files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onerror = () => setImageError('Failed to read the image file.');
        reader.onload = () =>
          setSelectedImages((prev) => [...prev, reader.result as string]);
        reader.readAsDataURL(file);
      });
    }
  };

  const handleOnRemoveImage = (index: number): void => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    onUpload([]);
  };

  return (
    <>
      {imageError && <div>Error: {imageError}</div>}
      {selectedImages.map((image, index) => (
        <div key={index} style={{ maxWidth: '100%', maxHeight: '100%' }}>
          <IconButton onClick={() => handleOnRemoveImage(index)}>
            <CancelIcon />
          </IconButton>
          <img
            src={image}
            alt="preview"
            style={{
              maxWidth: '200px',
              maxHeight: '200px',
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      ))}
      <input
        accept="image/*"
        id="raised-button-file"
        type="file"
        multiple
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="raised-button-file">
        <IconButton component="span">
          <InsertPhotoOutlinedIcon color="primary" />
        </IconButton>
      </label>
    </>
  );
};
export default ImageUploader;
