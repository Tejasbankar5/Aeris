import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  FileText,
  BookmarkCheck,
  CheckCircle2,
  Database,
  Network,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  Upload,
  ArrowRight,
  Shield,
  Loader2,
} from 'lucide-react';
import {
  EvidenceItem,
  VerifiedSolution,
  DocumentSource,
  AnalysisRecord,
} from '../types';

/* =========================================================================
   1. GLOBAL SEARCH MODAL
   ========================================================================= */
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  analyses: AnalysisRecord[];
  documents: DocumentSource[];
  solutions: VerifiedSolution[];
  onSelectAnalysis: (analysis: AnalysisRecord) => void;
  onSelectSolution: (solution: VerifiedSolution) => void;
  onSelectDocument: (doc: DocumentSource) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  analyses,
  documents,
  solutions,
  onSelectAnalysis,
  onSelectSolution,
  onSelectDocument,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase();

  const matchedAnalyses = analyses.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.asset.toLowerCase().includes(q) ||
      a.rootCause.toLowerCase().includes(q)
  );

  const matchedSolutions = solutions.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.asset.toLowerCase().includes(q) ||
      s.validatedSolution.toLowerCase().includes(q)
  );

  const matchedDocs = documents.filter(
    (d) => d.title.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search confidential analyses, SOP documents, incidents (e.g. 'bearing')..."
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Recent Analyses Matches */}
          {matchedAnalyses.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Analyses ({matchedAnalyses.length})
              </div>
              <div className="space-y-1.5">
                {matchedAnalyses.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      onSelectAnalysis(a);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">{a.title}</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {a.asset} · {a.incidentId} · {a.confidence}% confidence
                      </div>
                    </div>
                    <span className="text-[10px] text-indigo-600 font-semibold">Inspect →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verified Solutions Matches */}
          {matchedSolutions.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Verified Experience Memory ({matchedSolutions.length})
              </div>
              <div className="space-y-1.5">
                {matchedSolutions.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      onSelectSolution(s);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">{s.title}</div>
                      <div className="text-[11px] text-emerald-700 mt-0.5">
                        {s.incidentCode} · Validated by {s.validatedBy}
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold">View →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Document Sources Matches */}
          {matchedDocs.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Private Knowledge Documents ({matchedDocs.length})
              </div>
              <div className="space-y-1.5">
                {matchedDocs.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => {
                      onSelectDocument(d);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">{d.title}</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {d.category} · {d.chunksCount} chunks indexed
                      </div>
                    </div>
                    <span className="text-[10px] text-indigo-600 font-semibold">Chunks →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedAnalyses.length === 0 &&
            matchedSolutions.length === 0 &&
            matchedDocs.length === 0 && (
              <div className="py-8 text-center text-slate-400 text-xs">
                No matching confidential records found for &quot;{query}&quot;.
              </div>
            )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Search limited to local air-gapped index</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. EVIDENCE INSPECTION DRAWER/MODAL
   ========================================================================= */
interface EvidenceDrawerProps {
  evidence: EvidenceItem | null;
  onClose: () => void;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  evidence,
  onClose,
}) => {
  if (!evidence) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
              Evidence Detail #{evidence.id}
            </span>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">
              {evidence.source}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50/60 border border-indigo-100">
            <div>
              <span className="text-slate-500 block text-[11px]">Relevance Score</span>
              <span className="text-lg font-bold font-mono text-indigo-700">
                {evidence.relevance}% Match
              </span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block text-[11px]">File Format</span>
              <span className="font-mono text-slate-800 font-semibold uppercase">
                {evidence.type} {evidence.fileSize ? `(${evidence.fileSize})` : ''}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Extracted Evidence Excerpt:
            </h4>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed font-sans text-xs">
              &ldquo;{evidence.snippet}&rdquo;
            </div>
            {evidence.page && (
              <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                Found on Page {evidence.page} of ingested document
              </span>
            )}
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Why SAGE Retrieved This Evidence:
            </h4>
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 leading-relaxed text-xs">
              {evidence.whyRetrieved}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-800">
            ✓ Cryptographic SHA-256 integrity verified on local storage. No network transmission.
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. KNOWLEDGE INGESTION WIZARD MODAL
   ========================================================================= */
interface IngestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentAdded: (doc: DocumentSource) => void;
}

export const IngestionModal: React.FC<IngestionModalProps> = ({
  isOpen,
  onClose,
  onDocumentAdded,
}) => {
  const [step, setStep] = useState(1);
  const [docTitle, setDocTitle] = useState('Centrifugal Compressor Operating Manual Rev 2');
  const [category, setCategory] = useState<'Internal SOP' | 'Maintenance Manual' | 'Architecture Document' | 'Guideline'>('Maintenance Manual');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleStartIngest = () => {
    setIsProcessing(true);
    setStep(2);

    setTimeout(() => setStep(3), 600);
    setTimeout(() => setStep(4), 1300);
    setTimeout(() => setStep(5), 2000);
    setTimeout(() => {
      setStep(6);
      setIsProcessing(false);
      onDocumentAdded({
        id: `DOC-0${Math.floor(Math.random() * 90 + 10)}`,
        title: docTitle,
        category,
        format: 'PDF',
        pages: 36,
        lastUpdated: 'Today',
        chunksCount: 142,
        vectorStatus: 'Indexed',
        graphStatus: 'Linked',
      });
    }, 2800);
  };

  const ingestionStages = [
    'Document uploaded to local staging RAM',
    'Offline PyMuPDF text & table extraction',
    'Metadata schema generation & entity tagging',
    'Recursive token chunking (512 token windows)',
    'Local embeddings generation via Sentence-Transformers',
    'Committed to private ChromaDB & Neo4j graph',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-mono text-purple-600 font-semibold uppercase">
              Offline Knowledge Ingestion
            </span>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">
              Add Knowledge Source to SAGE
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          {!isProcessing && step !== 6 ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Classification Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
                >
                  <option value="Internal SOP">Internal SOP</option>
                  <option value="Maintenance Manual">Maintenance Manual</option>
                  <option value="Architecture Document">Architecture Document</option>
                  <option value="Guideline">Engineering Guideline</option>
                </select>
              </div>

              <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl text-center bg-slate-50/50">
                <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                <div className="mt-1 text-xs font-medium text-slate-700">
                  Select confidential PDF or markdown file
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Demonstration mode: Sample file ready for ingestion
                </div>
              </div>

              <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100 text-[11px] text-indigo-900">
                🔒 Ingestion pipeline runs locally. Embedding vectors generated via local GPU without cloud transmission.
              </div>
            </div>
          ) : (
            <div className="space-y-3 py-2">
              <div className="text-xs font-bold text-slate-900 mb-2">
                Ingestion Pipeline Progress:
              </div>
              {ingestionStages.map((stageName, index) => {
                const stageNum = index + 1;
                const isDone = step > stageNum;
                const isCurrent = step === stageNum;

                return (
                  <div
                    key={stageName}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs transition-all ${
                      isDone
                        ? 'border-emerald-200 bg-emerald-50/50 text-emerald-900'
                        : isCurrent
                        ? 'border-indigo-500 bg-indigo-50/60 text-indigo-900 font-semibold'
                        : 'border-slate-100 bg-slate-50/40 text-slate-400'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 text-[10px] flex items-center justify-center shrink-0">
                        {stageNum}
                      </div>
                    )}
                    <span>{stageName}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          {!isProcessing && step !== 6 ? (
            <>
              <button
                onClick={onClose}
                className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleStartIngest}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Ingest into Knowledge Base
              </button>
            </>
          ) : step === 6 ? (
            <button
              onClick={onClose}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Done (Indexed in ChromaDB & Neo4j)
            </button>
          ) : (
            <span className="text-xs text-indigo-600 font-medium self-center pr-2">
              Ingesting...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   4. VERIFIED SOLUTION DETAIL MODAL
   ========================================================================= */
interface SolutionDetailModalProps {
  solution: VerifiedSolution | null;
  onClose: () => void;
}

export const SolutionDetailModal: React.FC<SolutionDetailModalProps> = ({
  solution,
  onClose,
}) => {
  if (!solution) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                {solution.incidentCode}
              </span>
              <span className="text-xs text-slate-500 font-medium">{solution.asset}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              {solution.title}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Original Incident Problem
            </h4>
            <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 leading-relaxed">
              {solution.originalProblem}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Identified Root Cause
            </h4>
            <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 leading-relaxed">
              {solution.rootCause}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              Human-Validated Corrective Resolution
            </h4>
            <p className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-medium leading-relaxed">
              {solution.validatedSolution}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-[11px]">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block">Validated By</span>
              <span className="font-semibold text-slate-800">{solution.validatedBy}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block">Future Retrieval Index</span>
              <span className="font-mono text-indigo-700 font-semibold">{solution.futureRetrievalIndex}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
          >
            Close Record
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   5. PROTOTYPE TECHNOLOGY STACK MODAL
   ========================================================================= */
interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechStackModal: React.FC<TechStackModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const stackItems = [
    { name: 'Python 3.11 & PyTorch', role: 'Core runtime & local tensor acceleration', category: 'Foundation' },
    { name: 'Hugging Face / vLLM / GGUF', role: 'Air-gapped LLM inference runtime with zero outbound egress', category: 'Model Execution' },
    { name: 'DeepSeek-R1-Distill-14B', role: 'Primary local reasoning & task decomposition engine', category: 'Model Weights' },
    { name: 'ChromaDB', role: 'Private on-premise dense vector store for semantic retrieval', category: 'Vector Store' },
    { name: 'Neo4j Community Edition', role: 'Local graph database storing asset hierarchies & failure modes', category: 'Knowledge Graph' },
    { name: 'Sentence Transformers (bge-large-en)', role: '1024-dimensional local dense text embeddings', category: 'Embeddings' },
    { name: 'LangGraph State Orchestrator', role: 'Deterministic agentic workflow & multi-step cycle management', category: 'Agentic Framework' },
    { name: 'FastAPI Microservices', role: 'Internal IPC service bus connecting sandboxes to orchestrator', category: 'Service Bus' },
    { name: 'Docker / Seccomp Sandbox', role: 'Hermetic execution environment with network namespace disabled', category: 'Security' },
    { name: 'PyMuPDF & Tesseract OCR', role: 'Air-gapped document, scan, and technical drawing parsing', category: 'Document Ingestion' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[10px] font-mono text-indigo-600 font-semibold uppercase">
              Smart India Hackathon Solution Architecture
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Prototype Technology Stack
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs max-h-[70vh] overflow-y-auto">
          <p className="text-slate-600 leading-relaxed">
            The intended production implementation of SAGE relies exclusively on open-weight models
            and self-hosted infrastructure. No proprietary cloud LLM APIs are used, ensuring compliance
            with strict air-gap and national critical infrastructure policies.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {stackItems.map((item) => (
              <div
                key={item.name}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-indigo-600 uppercase font-semibold">
                    {item.category}
                  </span>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">
                    {item.name}
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                  {item.role}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-[11px] space-y-1">
            <div className="text-emerald-400 font-bold">
              ✓ Hardware Sizing Target:
            </div>
            <div className="text-slate-300">
              1x Workstation GPU (e.g. NVIDIA RTX 6000 Ada 48GB or 2x RTX 4090 24GB)
            </div>
            <div className="text-slate-400 text-[10px]">
              Sufficient for 14B Q4_K_M reasoning + bge-large-en + ChromaDB + Neo4j running concurrently.
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
          >
            Close Architecture Spec
          </button>
        </div>
      </div>
    </div>
  );
};
