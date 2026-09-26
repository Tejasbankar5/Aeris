import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  Network,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Check,
  X,
  FileCheck,
  BookmarkCheck,
  Share2,
  Printer,
  Edit3,
  Search,
  Eye,
  Activity,
  Layers,
  Info,
} from 'lucide-react';
import {
  AnalysisRecord,
  EvidenceItem,
  UserRole,
  RecommendedAction,
} from '../types';

interface AnalysisResultViewProps {
  analysis: AnalysisRecord;
  userRole: UserRole;
  onOpenEvidence: (evidence: EvidenceItem) => void;
  onApproveSolution: (analysisId: string, comment?: string) => void;
  onNavigateToMemory: () => void;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({
  analysis: initialAnalysis,
  userRole,
  onOpenEvidence,
  onApproveSolution,
  onNavigateToMemory,
}) => {
  const [analysis, setAnalysis] = useState<AnalysisRecord>(initialAnalysis);
  const [activeKnowledgeTab, setActiveKnowledgeTab] = useState<'docs' | 'graph' | 'incidents'>('docs');
  const [isLowConfidence, setIsLowConfidence] = useState(false);
  const [showHybridRAGExpander, setShowHybridRAGExpander] = useState(true);
  const [showProcessSummary, setShowProcessSummary] = useState(true);
  const [actions, setActions] = useState<RecommendedAction[]>(initialAnalysis.recommendedActions);
  const [isApproved, setIsApproved] = useState(initialAnalysis.validationStatus === 'Approved');
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [validationNote, setValidationNote] = useState(
    'Concur with bearing degradation assessment. Recommended vibration threshold monitoring to be set at 4.5 mm/s post-replacement.'
  );

  const confidenceScore = isLowConfidence ? 58 : analysis.confidence;

  const toggleConfidenceSimulation = () => {
    setIsLowConfidence(!isLowConfidence);
  };

  const handleActionStatus = (id: string, status: RecommendedAction['status']) => {
    setActions(
      actions.map((act) => (act.id === id ? { ...act, status } : act))
    );
  };

  const handleApprove = () => {
    setIsApproved(true);
    setAnalysis({
      ...analysis,
      validationStatus: 'Approved',
      validatedBy: `${userRole} (Dr. Tejas Bankar)`,
      validatedAt: 'Just now',
    });
    onApproveSolution(analysis.id, validationNote);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner / Status Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700">
              {analysis.incidentId}
            </span>
            <span className="text-xs text-slate-500 font-medium">·</span>
            <span className="text-xs text-slate-600 font-medium">{analysis.asset}</span>
            <span className="text-xs text-slate-500 font-medium">·</span>
            <span className="text-xs text-slate-500">{analysis.createdAt}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {analysis.title}
          </h2>
        </div>

        {/* Demo Controls: Low Confidence Simulation Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={toggleConfidenceSimulation}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
              isLowConfidence
                ? 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>
              {isLowConfidence ? 'Restore High Confidence (92%)' : 'Simulate Low Confidence (58%)'}
            </span>
          </button>

          <div
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-2 ${
              confidenceScore >= 85
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : confidenceScore >= 70
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-rose-50 text-rose-800 border-rose-300'
            }`}
          >
            {confidenceScore >= 85 ? (
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            )}
            <span>{confidenceScore >= 85 ? 'HIGH CONFIDENCE' : 'LOW CONFIDENCE'}</span>
            <span className="font-mono text-sm">({confidenceScore}%)</span>
          </div>
        </div>
      </div>

      {/* LOW CONFIDENCE ALERT & RECOVERY WORKFLOW (If simulated) */}
      {isLowConfidence && (
        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-amber-900">
                  Confidence Threshold Warning: 58% (Below Strict 80% Policy)
                </h3>
                <span className="text-xs font-mono uppercase bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded">
                  Safety Fallback Triggered
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed">
                SAGE does not have sufficient corroborated evidence to provide a high-confidence recommendation.
                Grounding checks detected ambiguous harmonic spectral overlap and insufficient historical runtime hours.
                Per organizational air-gapped guidelines, automated conclusion is halted pending recovery.
              </p>

              {/* Recommended Next Steps */}
              <div className="mt-4 pt-3 border-t border-amber-200">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-2">
                  Recommended Recovery Actions:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => alert('Simulating query expansion: Searching secondary vibration archive in ChromaDB...')}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-200/80 hover:bg-amber-300 text-amber-900 transition-colors"
                  >
                    [ Retrieve More Evidence ]
                  </button>
                  <button
                    onClick={() => alert('Escalating analysis ticket to Senior Reliability Engineer queue.')}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-200/80 hover:bg-amber-300 text-amber-900 transition-colors"
                  >
                    [ Request Human Review ]
                  </button>
                  <button
                    onClick={toggleConfidenceSimulation}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-amber-300 text-amber-800 hover:bg-amber-50 transition-colors"
                  >
                    [ Re-run Analysis with Extended Context ]
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prominent Summary Card: PROBABLE ROOT CAUSE */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SAGE Diagnostic Conclusion</span>
        </div>

        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Probable Root Cause
        </h3>
        <p className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
          {analysis.rootCause}
        </p>

        {/* WHY SAGE REACHED THIS CONCLUSION */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
            Why SAGE Reached This Conclusion (Evidence-Grounded Reasoning)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analysis.reasoningPoints.map((point, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="text-xs text-slate-700 leading-relaxed font-medium">
                  {point}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SUPPORTING EVIDENCE PANEL */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Supporting Evidence ({analysis.evidence.length} sources)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any source card to inspect the exact excerpt and relevance calculation.
            </p>
          </div>
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            All sources verified on-premise
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analysis.evidence.map((ev, idx) => (
            <div
              key={ev.id}
              onClick={() => onOpenEvidence(ev)}
              className="p-4 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/20 cursor-pointer transition-all flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-[10px] text-slate-400">
                    Evidence #0{idx + 1}
                  </span>
                  <span className="font-mono font-bold text-indigo-600 bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[11px] tabular-nums">
                    {ev.relevance}% Match
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {ev.source}
                </div>
                <p className="text-[11px] text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  &ldquo;{ev.snippet}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-indigo-600 font-semibold group-hover:underline">
                <span>View Excerpt & Why Retrieved</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RETRIEVED ORGANIZATIONAL KNOWLEDGE (Documents, Knowledge Graph, Past Incidents) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Retrieved Organizational Knowledge
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Hybrid RAG context synthesized from internal SOPs, multi-hop Neo4j graph, and verified incident records.
            </p>
          </div>

          {/* 3 Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
            <button
              onClick={() => setActiveKnowledgeTab('docs')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeKnowledgeTab === 'docs'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Documents ({analysis.evidence.length})
            </button>
            <button
              onClick={() => setActiveKnowledgeTab('graph')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1 ${
                activeKnowledgeTab === 'graph'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Network className="w-3 h-3 text-indigo-500" />
              <span>Knowledge Graph</span>
            </button>
            <button
              onClick={() => setActiveKnowledgeTab('incidents')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeKnowledgeTab === 'incidents'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Past Incidents ({analysis.pastIncidents.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Documents */}
        {activeKnowledgeTab === 'docs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  Internal SOP-ROT-402 (Rotating Diagnostic Standard)
                </span>
                <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">
                  ChromaDB Vector Match
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Establishes permissible vibration RMS tolerances per ISO 10816-3 Class III (large rotating machinery with rigid support foundations). Section 4.3 mandates bearing inspection when 2.4X non-synchronous components appear.
              </p>
              <div className="text-[11px] text-slate-500 pt-1 font-mono">
                Similarity Score: 0.892 | Ingested: 15 Aug 2026
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  Maintenance Manual: CP-Series Centrifugal Pumps
                </span>
                <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">
                  ChromaDB Vector Match
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Describes SKF 22220 spherical roller bearing specifications, radial internal clearance (C3), and step-by-step disassembly sequence to avoid impeller shaft bowing.
              </p>
              <div className="text-[11px] text-slate-500 pt-1 font-mono">
                Similarity Score: 0.865 | Ingested: 01 Jun 2026
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Knowledge Graph (Visual node map) */}
        {activeKnowledgeTab === 'graph' && (
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-900 text-white space-y-4">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-slate-100">
                  Neo4j Graph Multi-Hop Relationship View
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                5 Nodes · 5 Directed Edges · 2-Hop Traversal
              </span>
            </div>

            {/* SVG Interactive Visual Node Map */}
            <div className="py-4 flex items-center justify-center overflow-x-auto">
              <div className="flex items-center gap-2 min-w-[650px] justify-between">
                {/* Node 1 */}
                <div className="p-3 rounded-xl bg-slate-800 border border-indigo-500/50 text-center w-32 shadow-md">
                  <div className="text-[10px] font-mono uppercase text-indigo-400 font-semibold">ASSET</div>
                  <div className="text-xs font-bold text-white mt-0.5">CP-204</div>
                  <div className="text-[9px] text-slate-400 mt-1">Cooling Pump</div>
                </div>

                <div className="flex flex-col items-center text-slate-400 text-[10px]">
                  <span>contains</span>
                  <div className="w-10 h-0.5 bg-indigo-500" />
                  <span>→</span>
                </div>

                {/* Node 2 */}
                <div className="p-3 rounded-xl bg-slate-800 border border-purple-500/50 text-center w-36 shadow-md">
                  <div className="text-[10px] font-mono uppercase text-purple-400 font-semibold">COMPONENT</div>
                  <div className="text-xs font-bold text-white mt-0.5">Journal Bearing B-2</div>
                  <div className="text-[9px] text-slate-400 mt-1">SKF 22220-E</div>
                </div>

                <div className="flex flex-col items-center text-slate-400 text-[10px]">
                  <span>manifests</span>
                  <div className="w-10 h-0.5 bg-purple-500" />
                  <span>→</span>
                </div>

                {/* Node 3 */}
                <div className="p-3 rounded-xl bg-slate-800 border border-amber-500/50 text-center w-36 shadow-md">
                  <div className="text-[10px] font-mono uppercase text-amber-400 font-semibold">SYMPTOM</div>
                  <div className="text-xs font-bold text-white mt-0.5">Vibration Peak</div>
                  <div className="text-[9px] text-slate-400 mt-1">2.4X @ 7.8 mm/s</div>
                </div>

                <div className="flex flex-col items-center text-slate-400 text-[10px]">
                  <span>governed by</span>
                  <div className="w-10 h-0.5 bg-emerald-500" />
                  <span>→</span>
                </div>

                {/* Node 4 */}
                <div className="p-3 rounded-xl bg-slate-800 border border-emerald-500/50 text-center w-36 shadow-md">
                  <div className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">PROCEDURE</div>
                  <div className="text-xs font-bold text-white mt-0.5">SOP-ROT-402</div>
                  <div className="text-[9px] text-slate-400 mt-1">Inspection Routine</div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 text-xs text-slate-300 font-mono flex items-center justify-between border border-slate-800">
              <span className="text-indigo-400">
                MATCH (p:Pump {`{tag: "CP-204"}`})-[:HAS_BEARING]-&gt;(b)-[:EXHIBITS]-&gt;(v) RETURN b, v
              </span>
              <span className="text-emerald-400 font-semibold">✓ Graph Resolved in 8ms</span>
            </div>
          </div>
        )}

        {/* Tab 3: Past Incidents */}
        {activeKnowledgeTab === 'incidents' && (
          <div className="space-y-3">
            {analysis.pastIncidents.map((incident) => (
              <div
                key={incident.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded">
                      {incident.incidentCode}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{incident.title}</span>
                    <span className="text-xs text-slate-400">· {incident.date}</span>
                  </div>
                  <div className="text-xs text-slate-700 mt-2">
                    <span className="font-semibold text-slate-900">Verified Resolution: </span>
                    {incident.resolution}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Validated by: <span className="font-medium text-slate-700">{incident.validatedBy}</span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="text-xs text-slate-500">Historical Similarity</div>
                  <div className="text-lg font-bold font-mono text-indigo-600 tabular-nums">
                    {incident.similarity}%
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium">
                    ✓ From Experience Memory
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* HYBRID RAG VISUALIZATION (Expandable) */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-xs">
        <button
          onClick={() => setShowHybridRAGExpander(!showHybridRAGExpander)}
          className="w-full flex items-center justify-between text-left"
        >
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              How SAGE retrieved this context (Hybrid RAG Architecture)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Combining Dense Vector Embeddings (Semantic similarity) + Symbolic Knowledge Graphs (Entity relationships)
            </p>
          </div>
          {showHybridRAGExpander ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {showHybridRAGExpander && (
          <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                  1. Dense Vector Search (ChromaDB)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Generates 1024-dimensional embeddings via local <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">bge-large-en-v1.5</code>.
                  Finds conceptually similar maintenance logs, failure symptom descriptions, and diagnostic standards.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
                  2. Knowledge Graph Traversal (Neo4j)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Executes structured Cypher queries over plant hierarchy.
                  Connects asset <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">CP-204</code> to exact part numbers, parent subsystems, and past incident INC-0182.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
              <span className="font-bold">Why Hybrid RAG? </span>
              Vector search alone can hallucinate relations between similar equipment models.
              Knowledge graph provides deterministic relational truth, ensuring recommendations strictly follow organizational SOPs.
            </div>
          </div>
        )}
      </div>

      {/* RECOMMENDED ACTIONS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Recommended Actions</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            SAGE generated actionable steps based on organizational SOP-ROT-402 and historical resolution memory.
            Humans remain in the loop to approve or reject actions.
          </p>
        </div>

        <div className="space-y-3">
          {actions.map((act, index) => (
            <div
              key={act.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  0{index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{act.action}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        act.priority === 'High'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {act.priority} Priority
                    </span>
                    <span className="text-[10px] text-slate-500">Risk: {act.risk}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    <span className="font-medium text-slate-800">Reason: </span>
                    {act.reason}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Evidence grounding: {act.evidence}
                  </p>
                </div>
              </div>

              {/* Status / Triage Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                {act.status === 'Approved' ? (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Action Approved</span>
                  </span>
                ) : act.status === 'Rejected' ? (
                  <span className="text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <X className="w-3.5 h-3.5" />
                    <span>Rejected</span>
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => handleActionStatus(act.id, 'Approved')}
                      className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-2xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleActionStatus(act.id, 'Rejected')}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => alert(`Requested supplementary telemetry for action ${act.id}`)}
                      className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 rounded-lg transition-colors"
                    >
                      More Evidence
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HUMAN VALIDATION PANEL */}
      <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">
          <FileCheck className="w-4 h-4" />
          <span>Human Validation Required (Safety Governor)</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-lg font-bold text-slate-900">
              {isApproved ? 'Resolution Validated & Committed' : 'Review & Validate SAGE Recommendation'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Air-gapped enterprise governance requires human sign-off before solutions are indexed into{' '}
              <span className="font-semibold text-slate-800">Verified Experience Memory</span>.
              Once approved, future similar incidents will retrieve this verified resolution.
            </p>

            {isApproved && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Solution validated by {userRole}.</strong> Added to Verified Experience Memory under index{' '}
                    <code className="font-mono bg-emerald-100 px-1 py-0.5 rounded text-[11px]">
                      INDEX_ROTATING_CP204_1042
                    </code>.
                  </span>
                </div>
                <button
                  onClick={onNavigateToMemory}
                  className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-xs whitespace-nowrap transition-colors"
                >
                  View in Memory →
                </button>
              </div>
            )}

            {isEditingNote && !isApproved && (
              <div className="pt-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Add Engineer Note / Modifications:
                </label>
                <textarea
                  rows={2}
                  value={validationNote}
                  onChange={(e) => setValidationNote(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white"
                />
              </div>
            )}
          </div>

          {/* Validation Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {!isApproved ? (
              <>
                <button
                  onClick={() => setIsEditingNote(!isEditingNote)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Modify Note</span>
                </button>
                <button
                  onClick={() => alert('Validation rejected. Marked for manual engineering review.')}
                  className="px-4 py-2.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
                >
                  ✕ Reject
                </button>
                <button
                  onClick={handleApprove}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>✓ Approve Solution</span>
                </button>
              </>
            ) : (
              <button
                onClick={onNavigateToMemory}
                className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>Go to Verified Experience Memory</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SAGE AGENT ACTIVITY VIEW (Process Summary) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
        <button
          onClick={() => setShowProcessSummary(!showProcessSummary)}
          className="w-full flex items-center justify-between text-left"
        >
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              SAGE Agent Process Summary (High-Level Traceability)
            </h4>
            <p className="text-xs text-slate-500">
              Auditable execution log (No private chain-of-thought exposed).
            </p>
          </div>
          {showProcessSummary ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {showProcessSummary && (
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Understood user request: Classified as <strong>Incident / Root Cause Analysis</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Retrieved 4 relevant documents from private ChromaDB vector store</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Traversed 5 related entities and prior incident <strong>INC-0182</strong> in Neo4j graph</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Executed isolated Python calculation: Confirmed 2.4X spectral harmonic exceeds Class III limits</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Generated root-cause hypothesis and formulated 3 triage action steps</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Performed evidence grounding and confidence validation check (Estimated 92%)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
