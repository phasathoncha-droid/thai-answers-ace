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

export interface Topic {
  id: string;
  name_th: string;
  summary: string;
  rule_bullets: string[];
  exception_bullets: string[];
  related_topic_ids: string[];
  last_updated_at: string;
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
