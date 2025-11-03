import React, { useCallback, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  isLoading: boolean;
}

const UploadIcon: React.FC = () => (
    <svg className="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, isLoading }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold text-center text-gray-700 mb-2">Upload a Clothing Item</h2>
        <p className="text-center text-gray-500 mb-6">Let's find the perfect match for your favorite piece.</p>
        
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          htmlFor="file-upload"
          className={`relative flex justify-center w-full h-64 px-6 pt-5 pb-6 border-2 ${dragOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'} border-dashed rounded-md cursor-pointer transition-colors`}
        >
          <div className="space-y-1 text-center self-center">
            <UploadIcon />
            <div className="flex text-sm text-gray-600">
              <span className="relative font-medium text-indigo-600 hover:text-indigo-500">
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" disabled={isLoading}/>
              </span>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
          </div>
        </label>
        
        {isLoading && (
            <div className="mt-6 flex flex-col items-center">
                <LoadingSpinner />
                <p className="text-gray-600 mt-2">Analyzing your item...</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
