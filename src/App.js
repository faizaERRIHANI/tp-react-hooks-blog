import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import PostSearch from './components/PostSearch';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import LoadingSpinner from './components/LoadingSpinner';
import useDebounce from './hooks/useDebounce';
import useIntersectionObserver from './hooks/useIntersectionObserver';
import './App.css';

const LIMIT = 10;

const BlogApp = () => {
  const { theme } = useTheme();
  const [searchInput, setSearchInput] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeTag, setActiveTag] = useState('');
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 500);
  const [sentinelRef, isSentinelVisible] = useIntersectionObserver({ threshold: 0.1 });

  // Reset liste quand recherche ou tag change
  useEffect(() => {
    setPosts([]);
    setSkip(0);
  }, [debouncedSearch, activeTag]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let url;
        if (activeTag) {
          url = `https://dummyjson.com/posts/tag/${activeTag}`;
        } else if (debouncedSearch) {
          url = `https://dummyjson.com/posts/search?q=${encodeURIComponent(debouncedSearch)}&limit=${LIMIT}&skip=${skip}`;
        } else {
          url = `https://dummyjson.com/posts?limit=${LIMIT}&skip=${skip}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        setPosts(prev => skip === 0 ? data.posts : [...prev, ...data.posts]);
        setTotal(data.total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [debouncedSearch, activeTag, skip]);

  // Scroll infini — charge plus quand sentinel visible
  useEffect(() => {
    if (isSentinelVisible && !loading && posts.length < total && !activeTag) {
      setSkip(prev => prev + LIMIT);
    }
  }, [isSentinelVisible, loading, posts.length, total, activeTag]);

  const handleTagClick = useCallback((tag) => {
    setActiveTag(prev => prev === tag ? '' : tag);
    setSearchInput('');
  }, []);

  return (
    <div className={`app theme-${theme}`}>
      <header className="app-header">
        <h1>📝 Blog React Hooks</h1>
        <ThemeToggle />
      </header>
      <main className="app-main">
        <PostSearch searchQuery={searchInput} onSearchChange={setSearchInput} />

        {activeTag && (
          <div className="active-tag">
            Filtre tag : <span className="tag">#{activeTag}</span>
            <button onClick={() => setActiveTag('')}> ✕ Supprimer</button>
          </div>
        )}

        <PostList
          posts={posts}
          onSelectPost={setSelectedPost}
          onTagClick={handleTagClick}
        />

        {loading && <LoadingSpinner />}

        {/* Sentinel invisible pour déclencher le scroll infini */}
        <div ref={sentinelRef} style={{ height: '1px' }} />

        {!loading && posts.length > 0 && posts.length >= total && (
          <p style={{ textAlign: 'center', color: '#888', padding: '1rem' }}>
            ✓ Tous les posts sont chargés
          </p>
        )}
      </main>

      {selectedPost && (
        <PostDetails post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <BlogApp />
  </ThemeProvider>
);

export default App;
