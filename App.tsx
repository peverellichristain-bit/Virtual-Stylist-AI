import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import OutfitDisplay from './components/OutfitDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ProfileModal from './components/ProfileModal';
import { generateOutfits, editOutfitImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import type { Outfit, UserProfile } from './types';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<{ url: string; file: File } | null>(null);
  const [generatedOutfits, setGeneratedOutfits] = useState<Outfit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    preferredStyles: [],
    favoriteColors: '',
    disliked: '',
  });

  const handleImageUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setGeneratedOutfits([]);
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage({ url: imageUrl, file });

    try {
      const { base64, mimeType } = await fileToBase64(file);
      const outfits = await generateOutfits(base64, mimeType, userProfile);
      setGeneratedOutfits(outfits);
    } catch (err) {
      console.error(err);
      setError('Failed to generate outfits. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [userProfile]);

  const handleEditOutfit = useCallback(async (outfitToEdit: Outfit, prompt: string) => {
    if (!prompt.trim()) {
      setError('Edit prompt cannot be empty.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const parts = outfitToEdit.imageUrl.split(',');
      const mimeType = parts[0].match(/:(.*?);/)?.[1];
      const base64 = parts[1];

      if (!base64 || !mimeType) {
        throw new Error('Invalid image URL format for editing.');
      }

      const newImageUrl = await editOutfitImage(base64, mimeType, prompt);

      setGeneratedOutfits(currentOutfits =>
        currentOutfits.map(outfit =>
          outfit.style === outfitToEdit.style ? { ...outfit, imageUrl: newImageUrl } : outfit
        )
      );
    } catch (err) {
      console.error(err);
      setError('Failed to edit the outfit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = () => {
    setUploadedImage(null);
    setGeneratedOutfits([]);
    setError(null);
    setIsLoading(false);
  };

  const handleSaveProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    setIsProfileModalOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Header onOpenProfile={() => setIsProfileModalOpen(true)} />
      <main className="container mx-auto p-4 md:p-8">
        {!uploadedImage ? (
          <ImageUploader onImageUpload={handleImageUpload} isLoading={isLoading} />
        ) : (
          <div className="w-full">
            <div className="flex justify-end mb-4">
              <button
                onClick={handleReset}
                className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-300"
                disabled={isLoading}
              >
                Start Over
              </button>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1 bg-white p-4 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center">
                    <h2 className="text-xl font-bold text-gray-700 mb-3 text-center">Your Item</h2>
                    <img src={uploadedImage.url} alt="Uploaded clothing item" className="w-full h-auto max-w-xs object-contain rounded-lg" />
                </div>

                <div className="lg:col-span-3">
                    {isLoading && generatedOutfits.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                           <LoadingSpinner />
                           <p className="text-lg text-gray-600 mt-4 animate-pulse">Styling your personalized outfits...</p>
                        </div>
                    ) : (
                        <OutfitDisplay
                            outfits={generatedOutfits}
                            onEdit={handleEditOutfit}
                            isLoading={isLoading}
                        />
                    )}
                </div>
            </div>
          </div>
        )}
      </main>
      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSave={handleSaveProfile}
        currentUserProfile={userProfile}
      />
    </div>
  );
};

export default App;