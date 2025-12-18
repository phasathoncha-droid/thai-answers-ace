import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, HelpCircle, ExternalLink, BookOpen } from 'lucide-react';
import { SearchResult } from '@/data/types';

interface AnswerCardProps {
  result: SearchResult;
}

const confidenceConfig = {
  high: { icon: CheckCircle2, color: 'text-green-600', bgColor: 'bg-green-50', label: 'มั่นใจสูง' },
  medium: { icon: AlertCircle, color: 'text-yellow-600', bgColor: 'bg-yellow-50', label: 'มั่นใจปานกลาง' },
  low: { icon: HelpCircle, color: 'text-red-500', bgColor: 'bg-red-50', label: 'ต้องตรวจสอบเพิ่ม' },
};

export function AnswerCard({ result }: AnswerCardProps) {
  const { icon: ConfidenceIcon, color, bgColor, label } = confidenceConfig[result.confidence];

  return (
    <Card className="shadow-card border-2 border-border overflow-hidden animate-scale-in">
      <CardHeader className={`${bgColor} border-b border-border`}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <ConfidenceIcon className={`h-5 w-5 ${color}`} />
            คำตอบสั้น
          </CardTitle>
          <Badge variant="outline" className={`${color} border-current`}>
            {label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-xl font-medium text-foreground mb-4 leading-relaxed">
          {result.answer}
        </p>
        
        {result.related_topics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {result.related_topics.slice(0, 3).map(topic => (
              <Link key={topic.id} to={`/topics/${topic.id}`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  {topic.name_th}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface EvidenceCardProps {
  evidence: SearchResult['evidence'];
}

export function EvidenceCard({ evidence }: EvidenceCardProps) {
  if (evidence.length === 0) return null;

  return (
    <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">แหล่งอ้างอิง</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {evidence.map((e, index) => (
          <div 
            key={e.document_id} 
            className="p-4 rounded-lg bg-muted/50 border border-border"
            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm text-foreground">{e.document_title}</span>
              <Badge variant="secondary" className="text-xs">{e.version}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              "{e.snippet}"
            </p>
            <Link to={`/documents/${e.document_id}`}>
              <Button variant="ghost" size="sm" className="gap-2 text-secondary hover:text-secondary">
                <ExternalLink className="h-4 w-4" />
                เปิดเอกสารต้นทาง
              </Button>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

interface RelatedQuestionsCardProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

export function RelatedQuestionsCard({ questions, onQuestionClick }: RelatedQuestionsCardProps) {
  if (questions.length === 0) return null;

  return (
    <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">คำถามที่เกี่ยวข้อง</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {questions.map((q, index) => (
            <button
              key={index}
              onClick={() => onQuestionClick(q)}
              className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm text-foreground hover:text-secondary"
            >
              {q}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
