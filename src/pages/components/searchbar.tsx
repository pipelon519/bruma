
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch?: () => void; // Optional: To close mobile menu on search
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`); // Corrected parameter name
      if (onSearch) {
        onSearch(); // Call the callback if it exists
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar recetas, ingredientes..."
        className="w-full pl-10 pr-4 py-2.5 text-sm font-sans border border-stone-200 rounded-full focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-colors bg-stone-50 focus:bg-white"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
        <Search className="text-stone-400" size={18} />
      </div>
    </form>
  );
};

export default SearchBar;
