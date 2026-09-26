export type UserRole = 'Engineer' | 'IT / Operations' | 'Administrator' | 'Auditor';

export type AnalysisType =
  | 'Incident Analysis'
  | 'Document Analysis'
  | 'Root Cause Analysis'
  | 'Knowledge Search'
  | 'Technical Comparison'
  | 'Data Analysis';

export type AnalysisStatus = 'Completed' | 'Awaiting Validation' | 'In Progress' | 'Low Confidence Review';

export interface EvidenceItem {
  id: string;
  source: string;
  type: 'pdf' | 'csv' | 'log' | 'doc';
  relevance: number;
  snippet: string;
  whyRetrieved: string;
  fileSize?: string;
  page?: number;
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'asset' | 'component' | 'symptom' | 'procedure' | 'incident';
  description: string;
}

export interface KnowledgeGraphEdge {
  from: string;
  to: string;
  relation: string;
}

export interface PastIncident {
  id: string;
  incidentCode: string;
  title: string;
  asset: string;
  date: string;
  similarity: number;
  resolution: string;
  validatedBy: string;
}

export interface RecommendedAction {
  id: string;
  action: string;
  reason: string;
  evidence: string;
  priority: 'High' | 'Medium' | 'Low';
  risk: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Approved' | 'Rejected' | 'More Evidence Requested';
}

export interface AnalysisRecord {
  id: string;
  title: string;
  problemDescription: string;
  asset: string;
  incidentId: string;
  department: string;
  priority: 'High' | 'Medium' | 'Low';
  type: AnalysisType;
  status: AnalysisStatus;
  confidence: number; // e.g. 92
  isLowConfidenceSimulated?: boolean;
  createdAt: string;
  rootCause: string;
  reasoningPoints: string[];
  evidence: EvidenceItem[];
  knowledgeGraph: {
    nodes: KnowledgeGraphNode[];
    edges: KnowledgeGraphEdge[];
  };
  pastIncidents: PastIncident[];
  recommendedActions: RecommendedAction[];
  validationStatus: 'Pending' | 'Approved' | 'Rejected' | 'Modified';
  validatedBy?: string;
  validatedAt?: string;
  validationComment?: string;
}

export interface VerifiedSolution {
  id: string;
  incidentCode: string;
  title: string;
  asset: string;
  originalProblem: string;
  rootCause: string;
  validatedSolution: string;
  validatedBy: string;
  date: string;
  confidence: number;
  status: 'Verified';
  evidenceSourcesCount: number;
  futureRetrievalIndex: string;
}

export interface DocumentSource {
  id: string;
  title: string;
  category: 'Internal SOP' | 'Maintenance Manual' | 'Architecture Document' | 'Incident Archive' | 'Guideline';
  format: 'PDF' | 'CSV' | 'Markdown' | 'DOCX';
  pages: number;
  lastUpdated: string;
  chunksCount: number;
  vectorStatus: 'Indexed' | 'Pending';
  graphStatus: 'Linked' | 'Pending';
}

export interface AgentTool {
  id: string;
  name: string;
  category: string;
  purpose: string;
  status: 'Available' | 'Active' | 'Restricted';
  executionEnvironment: 'Air-Gapped Sandbox' | 'Local Kernel';
  sampleCommand?: string;
  sampleOutput?: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  analysisTitle: string;
  confidence: number;
  validation: 'Approved' | 'Awaiting Review' | 'Low Confidence Flag' | 'Modified';
  evidenceCount: number;
  status: 'Verified' | 'Audit Passed' | 'In Review';
  modelUsed: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'validation' | 'memory' | 'ingestion' | 'warning' | 'security';
  unread: boolean;
  actionTab?: string;
}
