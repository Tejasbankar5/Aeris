import React from 'react';
import {
  PlusCircle,
  Play,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Database,
  Cpu,
  BookmarkCheck,
  FileText,
  Activity,
  AlertCircle,
  Network,
  Wrench,
  UserCheck,
} from 'lucide-react';
import { AnalysisRecord, UserRole } from '../types';

interface DashboardViewProps {
  userRole: UserRole;
  analyses: AnalysisRecord[];
  onStartNewAnalysis: () => void;
  onOpenAnalysis: (analysis: AnalysisRecord) => void;
  onLaunchDemoFlow: () => void;
  onNavigateTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userRole,
  analyses,
  onStartNewAnalysis,
  onOpenAnalysis,
  onLaunchDemoFlow,
  onNavigateTab,
}) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Hero Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                Air-Gapped Generative Engine
              </span>
              <span className="text-xs text-slate-500 font-mono">
                SIH Prototype Environment
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Good morning, {userRole}
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
              Analyze confidential technical problems with evidence-grounded AI. All inference,
              embeddings, and graph reasoning execute on-premise with zero external network egress.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onLaunchDemoFlow}
              className="px-4 py-2.5 text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-all shadow-xs flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
              <span>Load Demo Incident</span>
            </button>
            <button
              onClick={onStartNewAnalysis}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm shadow-indigo-200 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ New Analysis</span>
            </button>
          </div>
        </div>

        {/* Ambient subtle decorative backdrop */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-gradient-to-br from-indigo-100/50 via-purple-50/30 to-transparent rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 4 Core Quantitative Metrics (Clearly labeled prototype demo data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <span>ACTIVE ANALYSES</span>
            <Activity className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-slate-900 tabular-nums">03</span>
            <span className="text-xs text-slate-500">ongoing technical tasks</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Priority: 2 High, 1 Med</span>
            <span className="text-indigo-600 font-medium">Demo Data</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <span>VERIFIED SOLUTIONS</span>
            <BookmarkCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-slate-900 tabular-nums">128</span>
            <span className="text-xs text-slate-500">experience records</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Reusable across plant</span>
            <span className="text-emerald-600 font-medium">Validated Memory</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <span>KNOWLEDGE SOURCES</span>
            <Database className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-slate-900 tabular-nums">1,842</span>
            <span className="text-xs text-slate-500">indexed documents</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>ChromaDB + Neo4j Graph</span>
            <span className="text-purple-600 font-medium">Local Vector/Graph</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <span>HIGH-CONFIDENCE RESULTS</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-slate-900 tabular-nums">94%</span>
            <span className="text-xs text-slate-500">grounded compliance</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Zero hallucination policy</span>
            <span className="text-emerald-700 font-medium">Audit Verified</span>
          </div>
        </div>
      </div>

      {/* SAGE Core Architecture & Workflow Visualization Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              SAGE Operational Intelligence Pipeline
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Strict end-to-end evidence grounding: from multimodal confidential inputs to verified experience memory.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('system-status')}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>Inspect Air-Gap Spec</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Workflow Diagram */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
          {[
            { step: '01', title: 'Problem Input', desc: 'Multimodal telemetry, PDFs & logs', icon: FileText },
            { step: '02', title: 'Task Routing', desc: 'Local model selector & intent parser', icon: Cpu },
            { step: '03', title: 'Agentic Reasoning', desc: 'Decomposes physics & failure modes', icon: Activity },
            { step: '04', title: 'Hybrid Retrieval', desc: 'ChromaDB vectors + Neo4j graph', icon: Network },
            { step: '05', title: 'Local Tools', desc: 'Code sandbox, FFT & formula engines', icon: Wrench },
            { step: '06', title: 'Trust Check', desc: 'Evidence coverage & policy audits', icon: ShieldCheck },
            { step: '07', title: 'Human Validation', desc: 'Engineer review & sign-off', icon: UserCheck },
            { step: '08', title: 'Verified Memory', desc: 'Stored for future retrieval', icon: BookmarkCheck },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between relative group hover:border-indigo-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>{item.step}</span>
                    <Icon className="w-3.5 h-3.5 text-indigo-500" />
                  </div>
                  <div className="text-xs font-bold text-slate-800 leading-tight">
                    {item.title}
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 mt-2 leading-tight">
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Analyses Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Technical Analyses</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any record to inspect root cause findings, supporting evidence, and organizational context.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('analyses-list')}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              View All ({analyses.length})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Analysis Title / Problem</th>
                <th className="py-3.5 px-6">Asset / Incident</th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">Confidence</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {analyses.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onOpenAnalysis(item)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {item.problemDescription}
                    </div>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="font-medium text-slate-800">{item.asset}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{item.incidentId}</div>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap text-slate-600">
                    {item.type}
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.confidence >= 85
                              ? 'bg-emerald-500'
                              : item.confidence >= 70
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${item.confidence}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-slate-800 tabular-nums">
                        {item.confidence}%
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium ${
                        item.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : item.status === 'Awaiting Validation'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {item.status === 'Completed' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Clock className="w-3 h-3 text-amber-600" />
                      )}
                      <span>{item.status}</span>
                    </span>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAnalysis(item);
                      }}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
