import { Layout } from '@/components/Layout';
import { CategoryCard } from '@/components/CategoryCard';
import { getCategories } from '@/data/api';

const TopicsPage = () => {
  const categories = getCategories();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">หมวดหมู่</h1>
          <p className="text-muted-foreground">
            เลือกหมวดหมู่เพื่อดูหัวข้อที่เกี่ยวข้อง
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TopicsPage;
