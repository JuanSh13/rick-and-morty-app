'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { Character } from "@/types/Character";
import CardHoverBlurZoom from "@/components/CharacterCard";
import { useFavorites } from "@/context/FavoritesContext";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [nameFilter, setNameFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  // Favoritos
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);
  const { favorites } = useFavorites();

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://rickandmortyapi.com/api/character/", {
          params: {
            name: nameFilter,
            species: speciesFilter,
            gender: genderFilter,
          },
        });
        setCharacters(res.data.results);
        setError(null);
      } catch {
        setCharacters([]);
        setError("No se encontraron personajes con los filtros aplicados.");
      } finally {
        setLoading(false);
      }
    };

    if (!mostrarFavoritos) {
      fetchCharacters();
    }
  }, [nameFilter, speciesFilter, genderFilter, mostrarFavoritos]);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      {/* Título */}
      <h1 className="text-5xl sm:text-6xl font-extrabold text-center mb-12 text-lime-400 font-orbitron animate-fade-in-up">
        Rick and Morty - App
      </h1>

      {/* Filtros + botón favoritos */}
      <div className="w-full max-w-6xl mx-auto mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            {/* Nombre */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-400 mb-1">Nombre</label>
              <input
                type="text"
                placeholder="Ej: Rick"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="px-4 py-2 rounded bg-gray-800 text-white border border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500 w-full"
              />
            </div>

            {/* Especie */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-400 mb-1">Especie</label>
              <select
                value={speciesFilter}
                onChange={(e) => setSpeciesFilter(e.target.value)}
                className="px-4 py-2 rounded bg-gray-800 text-white border border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500 w-full"
              >
                <option value="">Todas</option>
                <option value="Human">Humano</option>
                <option value="Alien">Alien</option>
                <option value="Robot">Robot</option>
                <option value="Animal">Animal</option>
              </select>
            </div>

            {/* Género */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-400 mb-1">Género</label>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="px-4 py-2 rounded bg-gray-800 text-white border border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500 w-full"
              >
                <option value="">Todos</option>
                <option value="Male">Masculino</option>
                <option value="Female">Femenino</option>
                <option value="Genderless">Sin género</option>
                <option value="unknown">Desconocido</option>
              </select>
            </div>
          </div>

          {/* Botón favoritos */}
          <button
            onClick={() => setMostrarFavoritos(!mostrarFavoritos)}
            className="bg-lime-500 hover:bg-lime-600 text-black font-semibold py-2 px-6 rounded transition whitespace-nowrap"
          >
            {mostrarFavoritos ? "Ver todos" : "Ver favoritos ❤️"}
          </button>
        </div>
      </div>

      {/* Resultados */}
      {loading && <p className="text-center">Cargando personajes...</p>}
      {error && !mostrarFavoritos && (
        <p className="text-center text-red-500">{error}</p>
      )}
      {mostrarFavoritos && favorites.length === 0 && (
        <p className="text-center text-yellow-400">No tienes favoritos aún.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
        {(mostrarFavoritos ? favorites : characters).map((char) => (
          <CardHoverBlurZoom key={char.id} character={char} />
        ))}
      </div>
    </div>
  );
}
