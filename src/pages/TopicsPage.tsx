import { Layout } from '@/components/Layout';
import { TopicCard } from '@/components/TopicCard';
import { getTopics } from '@/data/api';
import { SearchBox } from '@/components/SearchBox';
import { useState } from 'react';

const TopicsPage = () => {
  const topics = getTopics();
  const [filter, setFilter] = useState('');

  const filteredTopics = topics.filter(t => 
    t.name_th.toLowerCase().includes(filter.toLowerCase()) ||
    t.summary.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">หัวข้อทั้งหมด</h1>
          <p className="text-muted-foreground">
            เลือกหัวข้อเพื่อดูรายละเอียด กฎ ข้อยกเว้น และประวัติการเปลี่ยนแปลง
          </p>
        </div>

        <div className="mb-6">
          <SearchBox 
            placeholder="ค้นหาหัวข้อ..." 
            onSearch={(q) => setFilter(q)}
          />
        </div>

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
            ไม่พบหัวข้อที่ตรงกับ "{filter}"
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TopicsPage;
