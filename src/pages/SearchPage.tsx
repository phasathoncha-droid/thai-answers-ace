import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SearchBox } from '@/components/SearchBox';
import { AnswerCard, EvidenceCard, RelatedQuestionsCard } from '@/components/AnswerCard';
import { searchApi } from '@/data/api';
import { SearchResult } from '@/data/types';
import { Loader2 } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const searchResult = searchApi(query);
        setResult(searchResult);
        setLoading(false);
      }, 500);
    }
  }, [query]);

  const handleQuestionClick = (question: string) => {
    navigate(`/search?q=${encodeURIComponent(question)}`);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <SearchBox initialValue={query} placeholder="ค้นหาเพิ่มเติม..." />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-secondary" />
          </div>
        ) : result ? (
          <div className="space-y-6">
            <AnswerCard result={result} />
            
            <div className="grid md:grid-cols-2 gap-6">
              <EvidenceCard evidence={result.evidence} />
              <RelatedQuestionsCard 
                questions={result.related_questions} 
                onQuestionClick={handleQuestionClick}
              />
            </div>
          </div>
        ) : query ? (
          <div className="text-center py-20 text-muted-foreground">
            ไม่พบผลลัพธ์สำหรับ "{query}"
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            พิมพ์คำถามเพื่อค้นหา
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
