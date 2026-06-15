import React from 'react';

const PostSearch = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Rechercher des articles..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default PostSearch;
