import React, { useState, useEffect } from 'react';
import type { UserProfile } from '../types';
import { CLOTHING_STYLES } from '../constants';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: UserProfile) => void;
  currentUserProfile: UserProfile;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onSave, currentUserProfile }) => {
  const [profile, setProfile] = useState<UserProfile>(currentUserProfile);

  useEffect(() => {
    setProfile(currentUserProfile);
  }, [currentUserProfile, isOpen]);

  if (!isOpen) return null;

  const handleStyleChange = (style: string) => {
    setProfile(prev => {
      const newStyles = prev.preferredStyles.includes(style)
        ? prev.preferredStyles.filter(s => s !== style)
        : [...prev.preferredStyles, style];
      return { ...prev, preferredStyles: newStyles };
    });
  };

  const handleSave = () => {
    onSave(profile);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="profile-modal-title">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 md:p-8 m-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 id="profile-modal-title" className="text-2xl font-bold text-gray-800">Your Style Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <p className="text-gray-500 mb-6">Personalize your recommendations by telling us what you like.</p>
        
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Styles</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CLOTHING_STYLES.map(style => (
                  <label key={style} className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      checked={profile.preferredStyles.includes(style)}
                      onChange={() => handleStyleChange(style)}
                    />
                    <span>{style}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="favorite-colors" className="block text-sm font-medium text-gray-700">Favorite Colors</label>
              <input
                type="text"
                id="favorite-colors"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., navy blue, beige, emerald green"
                value={profile.favoriteColors}
                onChange={(e) => setProfile({...profile, favoriteColors: e.target.value})}
              />
            </div>
            
            <div>
              <label htmlFor="disliked" className="block text-sm font-medium text-gray-700">Dislikes</label>
              <input
                type="text"
                id="disliked"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., neon colors, animal prints"
                value={profile.disliked}
                onChange={(e) => setProfile({...profile, disliked: e.target.value})}
              />
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
