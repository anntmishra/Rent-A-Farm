import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (listingId: string) => void;
  removeFavorite: (listingId: string) => void;
  isFavorite: (listingId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Load favorites from localStorage on mount
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  const addFavorite = (listingId: string) => {
    setFavorites(prev => {
      const newFavorites = [...prev, listingId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const removeFavorite = (listingId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(id => id !== listingId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (listingId: string) => {
    return favorites.includes(listingId);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export default FavoritesProvider; 