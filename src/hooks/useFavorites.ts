import { useEffect, useState } from "react";
import { Character } from "@/types/Character";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Character[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id: number) => {
    return favorites.some((char) => char.id === id);
  };

  const toggleFavorite = (character: Character) => {
    setFavorites((prev) => {
      if (prev.some((c) => c.id === character.id)) {
        return prev.filter((c) => c.id !== character.id);
      } else {
        return [...prev, character];
      }
    });
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}
