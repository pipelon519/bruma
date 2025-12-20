import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

// 1. Define the component's props, including the optional onSearch callback
type SearchBarProps = {
  onSearch?: () => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      // 2. Call the callback if it exists
      if (onSearch) {
        onSearch();
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md mx-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar recetas, ingredientes..."
        className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-full bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors duration-300"
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Search className="text-stone-400" size={20} />
      </div>
    </form>
  );
};

export default SearchBar;
