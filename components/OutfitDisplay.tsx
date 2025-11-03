import React, { useState } from 'react';
import type { Outfit } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface OutfitCardProps {
  outfit: Outfit;
  onEdit: (outfit: Outfit, prompt: string) => void;
  isEditing: boolean;
}

const EditIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);


const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, onEdit, isEditing }) => {
    const [prompt, setPrompt] = useState('');

    const handleEditClick = () => {
        onEdit(outfit, prompt);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
            <div className="relative aspect-w-1 aspect-h-1 w-full">
                <img src={outfit.imageUrl} alt={`${outfit.style} outfit`} className="w-full h-full object-cover" />
                {isEditing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <LoadingSpinner />
                    </div>
                )}
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-gray-800">{outfit.style}</h3>
                <div className="mt-4 flex-grow flex flex-col justify-end">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., 'Add a retro filter'"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        disabled={isEditing}
                    />
                    <button
                        onClick={handleEditClick}
                        className="mt-2 w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md flex items-center justify-center disabled:bg-indigo-300 disabled:cursor-not-allowed"
                        disabled={isEditing}
                    >
                        <EditIcon />
                        Edit Image
                    </button>
                </div>
            </div>
        </div>
    );
};


interface OutfitDisplayProps {
  outfits: Outfit[];
  onEdit: (outfit: Outfit, prompt: string) => void;
  isLoading: boolean;
}

const OutfitDisplay: React.FC<OutfitDisplayProps> = ({ outfits, onEdit, isLoading }) => {
  return (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Styled Outfits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {outfits.map((outfit) => (
                <OutfitCard key={outfit.style} outfit={outfit} onEdit={onEdit} isEditing={isLoading}/>
            ))}
        </div>
    </div>
  );
};

export default OutfitDisplay;
