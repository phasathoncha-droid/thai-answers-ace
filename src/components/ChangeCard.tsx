import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, FileText } from 'lucide-react';
import { ChangeEvent } from '@/data/types';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

interface ChangeCardProps {
  change: ChangeEvent;
  compact?: boolean;
}

const impactTypeConfig = {
  'เพิ่มเงื่อนไข': { color: 'bg-amber-100 text-amber-800 border-amber-200' },
  'ผ่อนคลาย': { color: 'bg-green-100 text-green-800 border-green-200' },
  'เอกสารเพิ่ม': { color: 'bg-blue-100 text-blue-800 border-blue-200' },
  'แก้ไข': { color: 'bg-purple-100 text-purple-800 border-purple-200' },
};

export function ChangeCard({ change, compact = false }: ChangeCardProps) {
  const impactConfig = impactTypeConfig[change.impact_type];
  const formattedDate = format(new Date(change.changed_at), 'd MMM yyyy', { locale: th });

  if (compact) {
    return (
      <div className="p-4 rounded-lg border border-border hover:border-secondary/50 transition-all hover:shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className={impactConfig.color}>
                {change.impact_type}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formattedDate}
              </span>
            </div>
            <h4 className="font-medium text-sm">{change.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{change.impact_summary}</p>
          </div>
          <Link to={`/topics/${change.topic_id}`}>
            <Button variant="ghost" size="sm">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Card className="shadow-card hover:shadow-soft transition-all duration-200 animate-slide-up">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={impactConfig.color}>
              {change.impact_type}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formattedDate}
            </span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {change.from_version} → {change.to_version}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2">{change.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{change.impact_summary}</p>
        
        <div className="flex flex-wrap gap-2">
          <Link to={`/topics/${change.topic_id}`}>
            <Button variant="outline" size="sm" className="gap-2">
              <FileText className="h-4 w-4" />
              เปิด Topic
            </Button>
          </Link>
          {change.document_ids.length >= 2 && (
            <Link to={`/diff?from=${change.document_ids[0]}&to=${change.document_ids[1]}`}>
              <Button variant="secondary" size="sm" className="gap-2">
                ดู diff
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
