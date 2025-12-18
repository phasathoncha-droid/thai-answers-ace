import { useSearchParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { getDocumentById } from '@/data/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Plus, Minus } from 'lucide-react';

// Simple diff algorithm for demo
function computeDiff(oldText: string, newText: string): { type: 'same' | 'add' | 'remove'; text: string }[] {
  const oldWords = oldText.split(/\s+/);
  const newWords = newText.split(/\s+/);
  const diff: { type: 'same' | 'add' | 'remove'; text: string }[] = [];
  
  let i = 0, j = 0;
  while (i < oldWords.length || j < newWords.length) {
    if (i >= oldWords.length) {
      diff.push({ type: 'add', text: newWords[j] });
      j++;
    } else if (j >= newWords.length) {
      diff.push({ type: 'remove', text: oldWords[i] });
      i++;
    } else if (oldWords[i] === newWords[j]) {
      diff.push({ type: 'same', text: oldWords[i] });
      i++; j++;
    } else {
      // Simple heuristic: look ahead
      const newInOld = oldWords.indexOf(newWords[j], i);
      const oldInNew = newWords.indexOf(oldWords[i], j);
      
      if (newInOld !== -1 && (oldInNew === -1 || newInOld - i <= oldInNew - j)) {
        diff.push({ type: 'remove', text: oldWords[i] });
        i++;
      } else {
        diff.push({ type: 'add', text: newWords[j] });
        j++;
      }
    }
  }
  
  return diff;
}

const DiffPage = () => {
  const [searchParams] = useSearchParams();
  const fromId = searchParams.get('from');
  const toId = searchParams.get('to');

  const fromDoc = fromId ? getDocumentById(fromId) : null;
  const toDoc = toId ? getDocumentById(toId) : null;

  if (!fromDoc && !toDoc) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-foreground mb-4">ไม่พบเอกสารสำหรับเปรียบเทียบ</h1>
          <Link to="/changes">
            <Button variant="outline">กลับไปหน้าอัปเดต</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const oldText = fromDoc?.extracted_text || '';
  const newText = toDoc?.extracted_text || '';
  const diff = computeDiff(oldText, newText);

  const additions = diff.filter(d => d.type === 'add').length;
  const removals = diff.filter(d => d.type === 'remove').length;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <Link to="/changes" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          กลับไปหน้าอัปเดต
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">เปรียบเทียบเอกสาร</h1>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {fromDoc?.title || 'ไม่มีเอกสารต้นทาง'} ({fromDoc?.version || '-'})
            </Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {toDoc?.title || 'ไม่มีเอกสารปลายทาง'} ({toDoc?.version || '-'})
            </Badge>
          </div>
        </div>

        <Card className="shadow-card mb-6">
          <CardHeader>
            <CardTitle className="text-lg">สรุปการเปลี่ยนแปลง</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-green-600">
                <Plus className="h-4 w-4" />
                <span className="font-medium">{additions} เพิ่ม</span>
              </div>
              <div className="flex items-center gap-2 text-red-500">
                <Minus className="h-4 w-4" />
                <span className="font-medium">{removals} ลบ</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">รายละเอียดการเปลี่ยนแปลง</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-sm leading-relaxed p-4 bg-muted/30 rounded-lg">
              {diff.map((d, idx) => (
                <span
                  key={idx}
                  className={`${
                    d.type === 'add' 
                      ? 'bg-green-100 text-green-800' 
                      : d.type === 'remove' 
                        ? 'bg-red-100 text-red-800 line-through' 
                        : ''
                  }`}
                >
                  {d.text}{' '}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DiffPage;
