'use client';

import { Character } from "@/types/Character";
import { useFavorites } from "@/context/FavoritesContext";
import { Heart } from "lucide-react";

interface Props {
  character: Character;
}

export default function CardHoverBlurZoom({ character }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div
      className="relative group overflow-hidden rounded-xl shadow-lg border border-gray-700 bg-gray-900 
      transition-all duration-300 hover:scale-105 hover:border-lime-400"
    >
      {/* Botón favorito */}
      <button
        onClick={() => toggleFavorite(character)}
        className="absolute top-2 left-2 z-20 bg-black/60 backdrop-blur-md p-2 rounded-full hover:scale-110 transition"
      >
        <Heart
          size={20}
          className={`text-white ${
            isFavorite(character.id) ? "fill-red-500 text-red-500" : "text-gray-300"
          }`}
        />
      </button>

      {/* Imagen */}
      <img
        src={character.image}
        alt={character.name}
        className="h-64 w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
      />

      {/* Overlay de info */}
      <div className="absolute inset-0 flex flex-col justify-center text-white px-4 py-6 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm text-sm">
        <h2 className="text-2xl font-bold text-lime-400 mb-2 text-center">{character.name}</h2>
        <ul className="space-y-1">
          <li><strong>Estado:</strong> {character.status}</li>
          <li><strong>Especie:</strong> {character.species}</li>
          <li><strong>Tipo:</strong> {character.type || "N/A"}</li>
          <li><strong>Género:</strong> {character.gender}</li>
          <li><strong>Origen:</strong> {character.origin.name}</li>
          <li><strong>Ubicación:</strong> {character.location.name}</li>
          <li><strong>Episodios:</strong> {character.episode.length}</li>
          <li><strong>Creado en API:</strong> {new Date(character.created).toLocaleDateString()}</li>
        </ul>
      </div>
    </div>
  );
}
