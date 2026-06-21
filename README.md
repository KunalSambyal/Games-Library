# Games library Bay

A responsive game search and filtering Single Page Application (SPA) built with React, TypeScript, and Tailwind CSS. It allows users to search, filter by genre, and maintain a persistent list of favourite games.

---

## Features

- **Search & Filtering**: Search and filter by genre, synced directly to the URL query parameters for shareable search links.
- **Infinite Scroll**: Efficient pagination loading using the Intersection Observer API.
- **Favourites System**: Global favourites list persisted in localStorage with optimized O(1) lookup speeds.
- **Theme Toggler**: Persisted dark and light theme selection using localStorage.
- **Accessibility**: Structured layout landmarks, screen-reader labels, and custom focus indicators.
- **Error Handling**: Root-level ErrorBoundary prevents blank screen crashes on layout or API failures.
- **Responsive Layout**: Designed for mobile, tablet, and desktop screens.

---

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- React Router

---

## Folder Structure

```text
src/
├── components/
│   ├── common/        # Shared components (ErrorBoundary, PageHeading)
│   ├── games/         # Games modules (FilterOptions, GamesCard, GamesGrid)
│   └── layout/        # Site layout shell (Navbar, HamMenu, NavLinks, ThemeButton)
├── context/           # Favourites state context, provider, and consumer hook
├── pages/             # Page components (Home, Favourites, WishList, NotFound)
├── services/          # API fetch request handlers
├── types/             # TypeScript type definitions
├── App.tsx            # Routes definition and layout configuration
├── index.css          # Styling entry point
└── main.tsx           # Application entry mount wrapper
```

---

## Installation & Setup

1. **Clone the Repository**

    ```bash
    git clone https://github.com/KunalSambyal/Games-Library.git
    cd Games-Library
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Start the Local Development Server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Author

Kunal Sambyal
