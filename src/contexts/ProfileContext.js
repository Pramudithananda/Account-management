import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [currentProfile, setCurrentProfile] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load profiles from storage
  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const storedProfiles = await AsyncStorage.getItem('profiles');
      const currentProfileId = await AsyncStorage.getItem('currentProfileId');
      
      if (storedProfiles) {
        const parsedProfiles = JSON.parse(storedProfiles);
        setProfiles(parsedProfiles);
        
        if (currentProfileId) {
          const profile = parsedProfiles.find(p => p.id === currentProfileId);
          setCurrentProfile(profile || null);
        }
      }
    } catch (error) {
      console.error('Error loading profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData) => {
    try {
      const newProfile = {
        id: Date.now().toString(),
        name: profileData.name,
        avatar: profileData.avatar || '👤',
        createdAt: new Date().toISOString(),
        color: profileData.color || '#6366f1',
      };

      const updatedProfiles = [...profiles, newProfile];
      setProfiles(updatedProfiles);
      await AsyncStorage.setItem('profiles', JSON.stringify(updatedProfiles));

      // Initialize empty data for new profile
      await AsyncStorage.setItem(`profile_${newProfile.id}_accounts`, JSON.stringify({
        bank: [],
        cash: [],
        returns: []
      }));
      await AsyncStorage.setItem(`profile_${newProfile.id}_transactions`, JSON.stringify([]));
      await AsyncStorage.setItem(`profile_${newProfile.id}_categories`, JSON.stringify([]));

      return newProfile;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  };

  const switchProfile = async (profileId) => {
    try {
      const profile = profiles.find(p => p.id === profileId);
      if (profile) {
        setCurrentProfile(profile);
        await AsyncStorage.setItem('currentProfileId', profileId);
      }
    } catch (error) {
      console.error('Error switching profile:', error);
      throw error;
    }
  };

  const updateProfile = async (profileId, updates) => {
    try {
      const updatedProfiles = profiles.map(p => 
        p.id === profileId ? { ...p, ...updates } : p
      );
      setProfiles(updatedProfiles);
      await AsyncStorage.setItem('profiles', JSON.stringify(updatedProfiles));

      if (currentProfile?.id === profileId) {
        setCurrentProfile({ ...currentProfile, ...updates });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const deleteProfile = async (profileId) => {
    try {
      const updatedProfiles = profiles.filter(p => p.id !== profileId);
      setProfiles(updatedProfiles);
      await AsyncStorage.setItem('profiles', JSON.stringify(updatedProfiles));

      // Delete profile data
      await AsyncStorage.removeItem(`profile_${profileId}_accounts`);
      await AsyncStorage.removeItem(`profile_${profileId}_transactions`);
      await AsyncStorage.removeItem(`profile_${profileId}_categories`);

      if (currentProfile?.id === profileId) {
        setCurrentProfile(null);
        await AsyncStorage.removeItem('currentProfileId');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      throw error;
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        currentProfile,
        profiles,
        loading,
        createProfile,
        switchProfile,
        updateProfile,
        deleteProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
