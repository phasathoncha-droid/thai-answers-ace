import { Layout } from '@/components/Layout';
import { TopicCard } from '@/components/TopicCard';
import { CategoryCard } from '@/components/CategoryCard';
import { getTopics, getCategories } from '@/data/api';
import { SearchBox } from '@/components/SearchBox';
import { useState } from 'react';

const TopicsPage = () => {
  const topics = getTopics();
  const categories = getCategories();
  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTopics = topics.filter(t => {
    const matchesSearch = 
      t.name_th.toLowerCase().includes(filter.toLowerCase()) ||
      t.summary.toLowerCase().includes(filter.toLowerCase());
    
    const matchesCategory = !selectedCategory || t.category_id === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(prev => prev === categoryId ? null : categoryId);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">หัวข้อทั้งหมด</h1>
          <p className="text-muted-foreground">
            เลือกหัวข้อเพื่อดูรายละเอียด กฎ ข้อยกเว้น และประวัติการเปลี่ยนแปลง
          </p>
        </div>

        {/* Category Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">หมวดหมู่</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {categories.map((category, index) => (
              <div 
                key={category.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <CategoryCard
                  category={category}
                  isSelected={selectedCategory === category.id}
                  onClick={() => handleCategoryClick(category.id)}
                />
              </div>
            ))}
          </div>
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
            {selectedCategory 
              ? 'ไม่พบหัวข้อในหมวดหมู่นี้'
              : `ไม่พบหัวข้อที่ตรงกับ "${filter}"`
            }
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TopicsPage;
