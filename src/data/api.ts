import { documents, topics, changeEvents, categories } from './mockData';
import { Document, Topic, ChangeEvent, SearchResult, AnswerResponse, EvidenceSnippet, Category } from './types';

// Simple keyword matching for mock AI
function getAnswer(question: string): { answer: string; confidence: 'high' | 'medium' | 'low'; matchedDocs: Document[] } {
  const q = question.toLowerCase();
  
  // Military/police campaign
  if ((q.includes('ทหาร') || q.includes('ตำรวจ')) && (q.includes('แคมเปญ') || q.includes('พิเศษ') || q.includes('กู้'))) {
    return {
      answer: 'ได้ ข้าราชการทหารและตำรวจสามารถสมัครแคมเปญพิเศษ ดอกเบี้ย 7.99% วงเงินสูงสุด 10 เท่าของเงินเดือน ไม่ต้องค้ำประกัน',
      confidence: 'high',
      matchedDocs: documents.filter(d => d.topic_tags.includes('ทหาร') || d.topic_tags.includes('แคมเปญพิเศษ')),
    };
  }
  
  // Collateral questions
  if (q.includes('หลักประกัน') || q.includes('ค้ำ') || q.includes('โฉนด')) {
    return {
      answer: 'รับหลักประกันประเภทอสังหาริมทรัพย์ เช่น โฉนดที่ดิน บ้าน คอนโด LTV สูงสุด 80-85%',
      confidence: 'high',
      matchedDocs: documents.filter(d => d.topic_tags.includes('หลักประกัน')),
    };
  }
  
  // Document requirements
  if (q.includes('เอกสาร') || q.includes('ใช้อะไร') || q.includes('ต้องเตรียม')) {
    return {
      answer: 'เอกสารหลัก: บัตรประชาชน, ทะเบียนบ้าน, สลิปเงินเดือน 3 เดือน, Statement 6 เดือน',
      confidence: 'high',
      matchedDocs: documents.filter(d => d.topic_tags.includes('เอกสารที่ใช้')),
    };
  }
  
  // Interest rate questions
  if (q.includes('ดอกเบี้ย') || q.includes('อัตรา')) {
    return {
      answer: 'อัตราดอกเบี้ยสินเชื่อบุคคล 9.99-24% ต่อปี สินเชื่อบ้าน MRR-1.5%',
      confidence: 'high',
      matchedDocs: documents.filter(d => d.topic_tags.includes('ดอกเบี้ย')),
    };
  }
  
  // Insurance questions
  if (q.includes('ประกัน')) {
    return {
      answer: 'ต้องทำประกันชีวิตคุ้มครองสินเชื่อและประกันอัคคีภัยสำหรับหลักประกัน',
      confidence: 'medium',
      matchedDocs: documents.filter(d => d.topic_tags.includes('ประกัน')),
    };
  }
  
  // Loan limit questions
  if (q.includes('วงเงิน') || q.includes('กู้ได้เท่าไหร่') || q.includes('สูงสุด')) {
    return {
      answer: 'วงเงินสินเชื่อบุคคลสูงสุด 5 เท่าของรายได้ สินเชื่อ SME สูงสุด 10 ล้านบาท',
      confidence: 'medium',
      matchedDocs: documents.filter(d => d.topic_tags.includes('สินเชื่อ')),
    };
  }
  
  // IT/System questions
  if (q.includes('ระบบ') || q.includes('los') || q.includes('crm')) {
    return {
      answer: 'ใช้ระบบ LOS สำหรับบันทึกใบคำขอ และ CRM สำหรับติดตามลูกค้า',
      confidence: 'high',
      matchedDocs: documents.filter(d => d.topic_tags.includes('IT/ระบบ')),
    };
  }
  
  // Default response
  return {
    answer: 'กรุณาระบุรายละเอียดเพิ่มเติม เช่น ประเภทสินเชื่อ คุณสมบัติผู้กู้ หรือเงื่อนไขที่ต้องการทราบ',
    confidence: 'low',
    matchedDocs: [],
  };
}

// POST /api/answer
export function postAnswer(question: string): AnswerResponse {
  const { answer } = getAnswer(question);
  return { answer };
}

// Real API endpoint
const QUESTION_SEARCH_API = 'https://3ciqqf1dlj.execute-api.us-east-1.amazonaws.com/api/teletubpax/question-search';

// GET /api/search - Now async with real API call
export async function searchApi(query: string): Promise<SearchResult> {
  try {
    const response = await fetch(QUESTION_SEARCH_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: query }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Map API response to our SearchResult format
    const answer = data.answer || data.response || 'ไม่พบคำตอบ';
    
    // Fallback to mock data for related content
    const { matchedDocs } = getAnswer(query);
    
    const evidence: EvidenceSnippet[] = matchedDocs.slice(0, 3).map(doc => ({
      document_id: doc.id,
      document_title: doc.title,
      version: doc.version,
      snippet: doc.extracted_text.substring(0, 150) + '...',
      highlighted_text: doc.extracted_text.split(' ').slice(0, 10).join(' '),
    }));
    
    const relatedQuestions = [
      'เอกสารที่ต้องใช้มีอะไรบ้าง?',
      'วงเงินกู้สูงสุดเท่าไหร่?',
      'อัตราดอกเบี้ยเท่าไหร่?',
      'ต้องมีคนค้ำประกันไหม?',
    ].filter(() => Math.random() > 0.3).slice(0, 3);
    
    const relatedTopicIds = matchedDocs.flatMap(d => 
      topics.filter(t => d.topic_tags.some(tag => t.name_th.includes(tag) || t.summary.includes(tag)))
    );
    const uniqueRelatedTopics = Array.from(new Set(relatedTopicIds.map(t => t.id)))
      .map(id => topics.find(t => t.id === id)!)
      .filter(Boolean)
      .slice(0, 3);
    
    return {
      answer,
      confidence: 'high',
      evidence,
      related_questions: relatedQuestions,
      related_topics: uniqueRelatedTopics.length > 0 ? uniqueRelatedTopics : topics.slice(0, 3),
    };
  } catch (error) {
    console.error('Search API error:', error);
    
    // Fallback to mock logic on error
    const { answer, confidence, matchedDocs } = getAnswer(query);
    
    const evidence: EvidenceSnippet[] = matchedDocs.slice(0, 3).map(doc => ({
      document_id: doc.id,
      document_title: doc.title,
      version: doc.version,
      snippet: doc.extracted_text.substring(0, 150) + '...',
      highlighted_text: doc.extracted_text.split(' ').slice(0, 10).join(' '),
    }));
    
    const relatedQuestions = [
      'เอกสารที่ต้องใช้มีอะไรบ้าง?',
      'วงเงินกู้สูงสุดเท่าไหร่?',
      'อัตราดอกเบี้ยเท่าไหร่?',
      'ต้องมีคนค้ำประกันไหม?',
    ].filter(() => Math.random() > 0.3).slice(0, 3);
    
    const relatedTopicIds = matchedDocs.flatMap(d => 
      topics.filter(t => d.topic_tags.some(tag => t.name_th.includes(tag) || t.summary.includes(tag)))
    );
    const uniqueRelatedTopics = Array.from(new Set(relatedTopicIds.map(t => t.id)))
      .map(id => topics.find(t => t.id === id)!)
      .filter(Boolean)
      .slice(0, 3);
    
    return {
      answer,
      confidence,
      evidence,
      related_questions: relatedQuestions,
      related_topics: uniqueRelatedTopics.length > 0 ? uniqueRelatedTopics : topics.slice(0, 3),
    };
  }
}

// GET /api/categories
export function getCategories(): Category[] {
  return categories;
}

// GET /api/topics
export function getTopics(): Topic[] {
  return topics;
}

// GET /api/topics/:id
export function getTopicById(id: string): Topic | undefined {
  return topics.find(t => t.id === id);
}

// GET /api/changes
export function getChanges(): ChangeEvent[] {
  return [...changeEvents].sort((a, b) => 
    new Date(b.changed_at).getTime() - new Date(a.changed_at).getTime()
  );
}

// GET /api/documents/:id
export function getDocumentById(id: string): Document | undefined {
  return documents.find(d => d.id === id);
}

// GET /api/documents
export function getDocuments(): Document[] {
  return documents;
}

// Get documents by topic
export function getDocumentsByTopic(topicId: string): Document[] {
  const topic = topics.find(t => t.id === topicId);
  if (!topic) return [];
  
  const topicKeywords = topic.name_th.split(/\s+/);
  return documents.filter(d => 
    d.topic_tags.some(tag => 
      topicKeywords.some(kw => tag.includes(kw) || kw.includes(tag))
    )
  );
}

// Get change events by topic
export function getChangesByTopic(topicId: string): ChangeEvent[] {
  return changeEvents.filter(c => c.topic_id === topicId)
    .sort((a, b) => new Date(b.changed_at).getTime() - new Date(a.changed_at).getTime());
}
