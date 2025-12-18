import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { getTopicById, getDocumentsByTopic, getChangesByTopic, getTopics } from '@/data/api';
import { SearchBox } from '@/components/SearchBox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChangeCard } from '@/components/ChangeCard';
import { ArrowLeft, CheckCircle2, AlertTriangle, FileText, Clock, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

const TopicDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const topic = getTopicById(id || '');
  const documents = getDocumentsByTopic(id || '');
  const changes = getChangesByTopic(id || '');
  const allTopics = getTopics();
  const relatedTopics = topic?.related_topic_ids
    .map(rid => allTopics.find(t => t.id === rid))
    .filter(Boolean) || [];

  if (!topic) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-foreground mb-4">ไม่พบหัวข้อ</h1>
          <Link to="/topics">
            <Button variant="outline">กลับไปหน้าหัวข้อ</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formattedDate = format(new Date(topic.last_updated_at), 'd MMMM yyyy', { locale: th });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link to="/topics" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          กลับไปหัวข้อทั้งหมด
        </Link>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">{topic.name_th}</h1>
            <Badge variant="outline" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              อัปเดต {formattedDate}
            </Badge>
          </div>
          <p className="text-muted-foreground">{topic.summary}</p>
        </div>

        <div className="mb-6">
          <SearchBox placeholder={`ถามภายในหัวข้อ "${topic.name_th}"...`} />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
            <TabsTrigger value="rules">กฎ</TabsTrigger>
            <TabsTrigger value="sources">แหล่งอ้างอิง</TabsTrigger>
            <TabsTrigger value="history">ประวัติ</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    กฎหลัก
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {topic.rule_bullets.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-secondary font-bold">•</span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    ข้อยกเว้น
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {topic.exception_bullets.map((exception, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-amber-600 font-bold">!</span>
                        {exception}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {relatedTopics.length > 0 && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">หัวข้อที่เกี่ยวข้อง</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {relatedTopics.map(rt => rt && (
                      <Link key={rt.id} to={`/topics/${rt.id}`}>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                          {rt.name_th}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  กฎและเงื่อนไข ({topic.rule_bullets.length} รายการ)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {topic.rule_bullets.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary text-secondary-foreground text-sm flex items-center justify-center font-medium">
                        {idx + 1}
                      </span>
                      <span className="text-sm">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  ข้อยกเว้น ({topic.exception_bullets.length} รายการ)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {topic.exception_bullets.map((exception, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100">
                      <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{exception}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="space-y-4">
            {documents.length > 0 ? (
              documents.map(doc => (
                <Card key={doc.id} className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{doc.title}</span>
                          <Badge variant="secondary">{doc.version}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {doc.extracted_text.substring(0, 150)}...
                        </p>
                        {doc.effective_date && (
                          <p className="text-xs text-muted-foreground mt-2">
                            มีผลบังคับใช้: {format(new Date(doc.effective_date), 'd MMM yyyy', { locale: th })}
                          </p>
                        )}
                      </div>
                      <Link to={`/documents/${doc.id}`}>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                ไม่มีเอกสารที่เกี่ยวข้อง
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {changes.length > 0 ? (
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                <div className="space-y-4 pl-10">
                  {changes.map((change, idx) => (
                    <div key={change.id} className="relative">
                      <div className="absolute -left-10 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <span className="text-xs font-bold text-secondary-foreground">{idx + 1}</span>
                      </div>
                      <ChangeCard change={change} compact />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                ไม่มีประวัติการเปลี่ยนแปลง
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TopicDetailPage;
