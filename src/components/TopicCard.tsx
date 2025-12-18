import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock } from 'lucide-react';
import { Topic } from '@/data/types';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

interface TopicCardProps {
  topic: Topic;
}

export function TopicCard({ topic }: TopicCardProps) {
  const formattedDate = format(new Date(topic.last_updated_at), 'd MMM yyyy', { locale: th });

  return (
    <Link to={`/topics/${topic.id}`}>
      <Card className="h-full shadow-card hover:shadow-soft transition-all duration-200 hover:border-secondary/50 group cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg group-hover:text-secondary transition-colors">
              {topic.name_th}
            </CardTitle>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-all group-hover:translate-x-1" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {topic.summary}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              อัปเดต {formattedDate}
            </div>
            <Badge variant="secondary" className="text-xs">
              {topic.rule_bullets.length} กฎ
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
