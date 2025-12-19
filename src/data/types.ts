export interface Document {
  id: string;
  title: string;
  source_type: 'text' | 'pdf' | 'image';
  topic_tags: string[];
  extracted_text: string;
  published_at: string;
  effective_date?: string;
  version: string;
  supersedes_document_id?: string;
  source_url?: string;
}

export interface Category {
  id: string;
  name_th: string;
  icon: string;
  document_count: number;
}

export interface Topic {
  id: string;
  name_th: string;
  summary: string;
  rule_bullets: string[];
  exception_bullets: string[];
  related_topic_ids: string[];
  last_updated_at: string;
  category_id: string;
  rule_count: number;
}

export interface ChangeEvent {
  id: string;
  topic_id: string;
  title: string;
  impact_summary: string;
  changed_at: string;
  from_version: string;
  to_version: string;
  document_ids: string[];
  impact_type: 'เพิ่มเงื่อนไข' | 'ผ่อนคลาย' | 'เอกสารเพิ่ม' | 'แก้ไข';
}

export interface SearchResult {
  answer: string;
  confidence: 'high' | 'medium' | 'low';
  evidence: EvidenceSnippet[];
  related_questions: string[];
  related_topics: Topic[];
}

export interface EvidenceSnippet {
  document_id: string;
  document_title: string;
  version: string;
  snippet: string;
  highlighted_text: string;
}

export interface AnswerResponse {
  answer: string;
}
