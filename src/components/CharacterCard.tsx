'use client';

import { Character } from "@/types/Character";
import { useState } from "react";

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="relative w-full h-80 perspective cursor-pointer"
    >
      <div
        className={`transition-transform duration-700 transform-style-preserve-3d w-full h-full rounded-xl ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Cara Frontal */}
        <div className="absolute inset-0 bg-gray-900 border-2 border-gray-700 rounded-xl shadow-lg backface-hidden flex flex-col">
          <img
            src={character.image}
            alt={character.name}
            className="h-48 w-full object-cover rounded-t-xl"
          />
          <div className="p-4 text-white">
            <h2 className="text-xl font-bold text-lime-400">{character.name}</h2>
            <p className="text-sm text-gray-400">
              Estado: {character.status} | Especie: {character.species}
            </p>
          </div>
        </div>

        {/* Cara Trasera */}
        <div className="absolute inset-0 bg-gray-800 border-2 border-lime-400 rounded-xl shadow-inner rotate-y-180 backface-hidden p-4 text-white flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-2 text-lime-300">{character.name}</h3>
          <p><span className="text-lime-400">Género:</span> {character.gender}</p>
          <p><span className="text-lime-400">Origen:</span> {character.origin.name}</p>
          <p><span className="text-lime-400">Ubicación:</span> {character.location.name}</p>
          <p><span className="text-lime-400">ID:</span> {character.id}</p>
          <p className="mt-4 text-sm text-gray-300">Haz clic para volver</p>
        </div>
      </div>
    </div>
  );
}
