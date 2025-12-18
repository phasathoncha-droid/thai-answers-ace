import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { getDocumentById } from '@/data/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

const DocumentPage = () => {
  const { id } = useParams<{ id: string }>();
  const doc = getDocumentById(id || '');

  if (!doc) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-foreground mb-4">ไม่พบเอกสาร</h1>
          <Link to="/">
            <Button variant="outline">กลับหน้าหลัก</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          กลับ
        </Link>

        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-secondary" />
                <div>
                  <CardTitle className="text-xl">{doc.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{doc.version}</Badge>
                    <Badge variant="outline">{doc.source_type.toUpperCase()}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">เผยแพร่:</span>
                <span>{format(new Date(doc.published_at), 'd MMM yyyy', { locale: th })}</span>
              </div>
              {doc.effective_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">มีผลบังคับใช้:</span>
                  <span>{format(new Date(doc.effective_date), 'd MMM yyyy', { locale: th })}</span>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">หมวดหมู่:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {doc.topic_tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">เนื้อหา</h3>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {doc.extracted_text}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DocumentPage;
