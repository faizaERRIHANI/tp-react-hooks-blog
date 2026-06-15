import { useState, useEffect } from 'react';

const usePosts = (searchQuery = '', skip = 0) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = searchQuery
          ? `https://dummyjson.com/posts/search?q=${encodeURIComponent(searchQuery)}&limit=10&skip=${skip}`
          : `https://dummyjson.com/posts?limit=10&skip=${skip}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Erreur réseau');
        const data = await res.json();
        setPosts(data.posts);
        setTotal(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [searchQuery, skip]);

  return { posts, loading, error, total };
};

export default usePosts;
