import React from 'react';

const PostList = ({ posts, onSelectPost, onTagClick }) => {
  if (!posts || posts.length === 0)
    return <p className="no-results">Aucun post trouvé.</p>;

  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post.id} className="post-card" onClick={() => onSelectPost(post)}>
          <h2>{post.title}</h2>
          <p>{post.body.substring(0, 150)}...</p>
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag"
                onClick={e => { e.stopPropagation(); onTagClick && onTagClick(tag); }}>
                #{tag}
              </span>
            ))}
          </div>
          <span>❤️ {post.reactions?.likes ?? post.reactions}</span>
        </div>
      ))}
    </div>
  );
};

export default PostList;
