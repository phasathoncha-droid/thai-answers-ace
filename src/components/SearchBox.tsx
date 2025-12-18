import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBoxProps {
  placeholder?: string;
  initialValue?: string;
  large?: boolean;
  onSearch?: (query: string) => void;
}

export function SearchBox({ 
  placeholder = "ถามเรื่องนโยบาย/คู่มือ เช่น 'ลูกค้าอาชีพทหาร กู้แคมเปญพิเศษได้ไหม'",
  initialValue = '',
  large = false,
  onSearch,
}: SearchBoxProps) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`relative flex items-center gap-2 ${large ? 'max-w-3xl mx-auto' : ''}`}>
        <div className="relative flex-1">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground ${large ? 'h-5 w-5' : 'h-4 w-4'}`} />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={`pl-12 pr-4 ${large 
              ? 'h-14 text-lg rounded-xl shadow-soft border-2 border-border focus:border-secondary' 
              : 'h-11 rounded-lg'
            } transition-all duration-200`}
          />
        </div>
        <Button 
          type="submit" 
          className={`${large 
            ? 'h-14 px-8 text-base rounded-xl bg-gradient-accent hover:opacity-90' 
            : 'h-11 px-6'
          } transition-all duration-200`}
        >
          ค้นหา
        </Button>
      </div>
    </form>
  );
}
