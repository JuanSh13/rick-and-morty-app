'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import CharacterCard from "@/components/CharacterCard";
import { Character } from "@/types/Character";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${filter}`
        );
        setCharacters(res.data.results);
        setError(null);
      } catch (err) {
        setCharacters([]);
        setError("No se encontraron personajes o hubo un error");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [filter]);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white p-6"
      style={{
        backgroundImage: "url('/bg.jpg')", // pon la imagen en public/bg.jpg
        backdropFilter: "brightness(0.5)",
      }}
    >
      <div className="bg-black/70 backdrop-blur-md p-6 rounded-lg">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-lime-300 drop-shadow-lg">
          Rick and Morty Characters
        </h1>

        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Busca por nombre, ej: Rick..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-3 w-full max-w-md rounded-lg bg-gray-800 text-white border border-lime-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
          />
        </div>

        {loading && <p className="text-center">Cargando personajes...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      </div>
    </div>
  );
}
