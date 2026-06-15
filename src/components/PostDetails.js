import React, { useState, useEffect } from 'react';

const PostDetails = ({ post, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!post) return;
    setLoading(true);
    fetch(`https://dummyjson.com/posts/${post.id}`)
      .then(r => r.json())
      .then(d => { setDetails(d); setLoading(false); });
  }, [post]);

  if (!post) return null;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: '12px', padding: '2rem',
        maxWidth: '600px', width: '90%', maxHeight: '80vh',
        overflowY: 'auto', position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer'
        }}>✕</button>
        {loading ? <p>Chargement...</p> : (
          <>
            <h1 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{details?.title}</h1>
            <p style={{ lineHeight: '1.6', color: '#444' }}>{details?.body}</p>
            <div style={{ marginTop: '1rem' }}>
              {details?.tags?.map(tag => (
                <span key={tag} style={{
                  background: '#e0f0ff', color: '#0066cc', borderRadius: '4px',
                  padding: '2px 8px', marginRight: '6px', fontSize: '0.8rem'
                }}>#{tag}</span>
              ))}
            </div>
            <p style={{ marginTop: '1rem' }}>❤️ {details?.reactions?.likes ?? details?.reactions}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
