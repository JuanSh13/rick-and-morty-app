'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Character } from '@/types/Character';

interface FavoritesContextType {
  favorites: Character[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (character: Character) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Character[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id: number) => favorites.some((char) => char.id === id);

  const toggleFavorite = (character: Character) => {
    setFavorites((prev) =>
      isFavorite(character.id)
        ? prev.filter((c) => c.id !== character.id)
        : [...prev, character]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
