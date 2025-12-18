import { Layout } from '@/components/Layout';
import { SearchBox } from '@/components/SearchBox';
import { QuickChips } from '@/components/QuickChips';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Sparkles } from 'lucide-react';

const HomePage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">ค้นหานโยบาย</span>
            <span className="text-foreground">และคู่มือ</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ถามคำถามเป็นภาษาไทย รับคำตอบที่ชัดเจนพร้อมอ้างอิงแหล่งที่มา
          </p>
        </div>

        <div className="w-full max-w-3xl mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <SearchBox large />
        </div>

        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm text-muted-foreground mb-3 text-center">ค้นหาด่วน</p>
          <QuickChips />
        </div>

        <Card className="w-full max-w-xl shadow-card border-secondary/20 bg-gradient-to-r from-secondary/5 to-accent/5 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-secondary/10">
                <Bell className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  มีอะไรใหม่
                  <Sparkles className="h-4 w-4 text-secondary" />
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  ตรวจสอบการเปลี่ยนแปลงนโยบายและเอกสารล่าสุด
                </p>
                <Link to="/changes">
                  <Button variant="secondary" size="sm" className="gap-2">
                    ดูอัปเดตทั้งหมด
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default HomePage;
