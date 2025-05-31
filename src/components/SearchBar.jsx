import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        placeholder="Search movies or TV shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none"
      />
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-r-md">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
