# TP React Hooks - Application de Blog

Ce TP met en pratique les Hooks React (useState, useEffect, useCallback, useMemo) ainsi que la création de Hooks personnalisés à travers une application de blog.

## Installation

```bash
git clone https://github.com/pr-daaif/tp-react-hooks-blog.git
cd tp-react-hooks-blog
npm install
npm start
```

---

## Exercice 1 : État et Effets

### Solution
- `usePosts` : fetch les posts depuis `dummyjson.com` avec `useEffect`, gère `loading` et `error`
- `PostList` : affiche les posts avec titre, extrait du body, tags et réactions
- `PostSearch` : input contrôlé qui remonte la valeur de recherche au parent via `onSearchChange`
- La recherche utilise l'endpoint `/posts/search?q=...`

---

## Exercice 2 : Hooks Personnalisés

### Solution
- `useDebounce` : retarde la mise à jour d'une valeur avec `setTimeout` — évite trop de requêtes API pendant la frappe
- `useLocalStorage` : synchronise un état React avec `localStorage` — persiste les préférences entre sessions
- Utilisés dans `App.js` pour la recherche debounced et dans `ThemeContext` pour le thème

---

## Exercice 3 : Optimisation et Context

### Solution
- `ThemeContext` : contexte React avec `createContext` + `useLocalStorage` pour persister le thème
- `ThemeToggle` : bouton qui consomme le contexte via `useTheme()`
- `useCallback` sur `toggleTheme` et `handleTagClick` pour éviter des re-renders inutiles
- `useMemo` sur la valeur du context pour stabiliser l'objet

---

## Exercice 4 : Fonctionnalités Avancées

### Solution
- `useIntersectionObserver` : observe un élément sentinel en bas de page avec l'API `IntersectionObserver`
- Quand le sentinel est visible → `setSkip(prev => prev + LIMIT)` → charge plus de posts
- `PostDetails` : modal qui fetch les détails complets du post cliqué
- Filtrage par tags : clic sur un tag → filtre via `/posts/tag/{tag}`

---

## Lien GitHub

https://github.com/faizaERRIHANI/tp-react-hooks-blog
