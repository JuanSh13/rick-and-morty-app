# Explorador de Personajes - Rick and Morty

Aplicación web desarrollada con Next.js y Tailwind CSS que permite explorar personajes de la serie Rick and Morty, filtrarlos por nombre, especie y género, y marcar tus favoritos usando almacenamiento local.

---

## Tecnologías utilizadas

- **Next.js 14** con App Router
- **React + TypeScript**
- **Tailwind CSS** para el diseño visual
- **lucide-react** para íconos SVG
- **Axios** para peticiones HTTP
- **LocalStorage** para persistencia de favoritos
- **Google Fonts**: Geist + Orbitron (`next/font/google`)

---

## Funcionalidades principales

- Tarjetas visuales con:
  - Imagen con efecto zoom + blur
  - Overlay de información completa
  - Ícono de corazón para marcar como favorito

- Filtros dinámicos:
  - Por nombre
  - Por especie
  - Por género

- Favoritos persistentes:
  - Se almacenan en localStorage
  - Puedes alternar entre ver todos y ver solo favoritos
  - El estado se sincroniza en toda la app con Context API

- Context API:
  - `FavoritesContext` para compartir estado entre componentes

- Responsive y visualmente atractivo

---

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx         ← Layout global con fuentes + provider
│   └── page.tsx           ← Página principal con filtros y tarjetas
├── components/
│   └── CardHoverBlurZoom.tsx ← Tarjeta visual de personaje
├── context/
│   └── FavoritesContext.tsx  ← Contexto global de favoritos
├── types/
│   └── Character.ts          ← Tipado completo de personajes
```

---

## Estado final

Tu aplicación es una SPA moderna y funcional con:
- Interfaz intuitiva
- Consumo de API en tiempo real
- Persistencia de favoritos
- Animaciones suaves y diseño limpio

---

## Créditos

- API usada: [Rick and Morty API](https://rickandmortyapi.com/)
- Iconos: [Lucide Icons](https://lucide.dev/icons/heart)