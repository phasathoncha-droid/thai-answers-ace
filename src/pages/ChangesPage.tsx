import { Layout } from '@/components/Layout';
import { ChangeCard } from '@/components/ChangeCard';
import { getChanges } from '@/data/api';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';

const ChangesPage = () => {
  const changes = getChanges();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="h-8 w-8 text-secondary" />
            <h1 className="text-3xl font-bold text-foreground">อัปเดตล่าสุด</h1>
          </div>
          <p className="text-muted-foreground">
            ติดตามการเปลี่ยนแปลงนโยบายและเอกสารล่าสุด
          </p>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">เพิ่มเงื่อนไข</Badge>
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">ผ่อนคลาย</Badge>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">เอกสารเพิ่ม</Badge>
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">แก้ไข</Badge>
        </div>

        <div className="space-y-4">
          {changes.map((change, index) => (
            <div 
              key={change.id} 
              className="animate-slide-up" 
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ChangeCard change={change} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ChangesPage;
