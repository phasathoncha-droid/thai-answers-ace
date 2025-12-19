import { Layout } from '@/components/Layout';
import { TopicCard } from '@/components/TopicCard';
import { getTopics, getCategories } from '@/data/api';
import { SearchBox } from '@/components/SearchBox';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CategoryTopicsPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const topics = getTopics();
  const categories = getCategories();
  const [filter, setFilter] = useState('');

  const category = categories.find(c => c.id === categoryId);
  
  const filteredTopics = topics.filter(t => {
    const matchesCategory = t.category_id === categoryId;
    const matchesSearch = 
      t.name_th.toLowerCase().includes(filter.toLowerCase()) ||
      t.summary.toLowerCase().includes(filter.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  if (!category) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">ไม่พบหมวดหมู่นี้</p>
          <Link to="/topics">
            <Button variant="link" className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับไปหน้าหมวดหมู่
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6">
          <Link to="/topics">
            <Button variant="ghost" size="sm" className="mb-4 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับไปหน้าหมวดหมู่
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">{category.name_th}</h1>
          <p className="text-muted-foreground">
            {category.document_count} เอกสาร · เลือกหัวข้อเพื่อดูรายละเอียด
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <SearchBox 
            placeholder="ค้นหาหัวข้อ..." 
            onSearch={(q) => setFilter(q)}
          />
        </div>

        {/* Topics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTopics.map((topic, index) => (
            <div 
              key={topic.id} 
              className="animate-slide-up" 
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <TopicCard topic={topic} />
            </div>
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            {filter 
              ? `ไม่พบหัวข้อที่ตรงกับ "${filter}"`
              : 'ยังไม่มีหัวข้อในหมวดหมู่นี้'
            }
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryTopicsPage;
