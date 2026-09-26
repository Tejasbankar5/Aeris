import React, { useState } from 'react';
import {
  Database,
  Network,
  FileText,
  PlusCircle,
  Search,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  HardDrive,
  FileSpreadsheet,
  FileCode,
  Tag,
  Shield,
} from 'lucide-react';
import { DocumentSource, UserRole } from '../types';

interface KnowledgeBaseViewProps {
  documents: DocumentSource[];
  userRole: UserRole;
  onOpenIngestionModal: () => void;
  onInspectDocument: (doc: DocumentSource) => void;
}

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({
  documents,
  userRole,
  onOpenIngestionModal,
  onInspectDocument,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || doc.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
            <Database className="w-4 h-4" />
            <span>Private Dual-Index Store</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Private Knowledge Base
          </h2>
          <p className="mt-1 text-slate-600 text-sm">
            Confidential plant documentation, SOPs, and engineering manuals indexed locally.
            Zero external syncing; all embeddings and graph triplets reside on internal organization disks.
          </p>
        </div>

        <button
          onClick={onOpenIngestionModal}
          className="px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Add Knowledge Source</span>
        </button>
      </div>

      {/* Top 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Documents
          </div>
          <div className="mt-2 text-3xl font-bold font-mono text-slate-900 tabular-nums">
            1,842
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            SOPs, manuals, schematics, logs
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Past Incidents
          </div>
          <div className="mt-2 text-3xl font-bold font-mono text-slate-900 tabular-nums">
            326
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Historical root-cause records
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Graph Entities
          </div>
          <div className="mt-2 text-3xl font-bold font-mono text-slate-900 tabular-nums">
            4,820
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Equipment, parts, failure modes
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Verified Solutions
          </div>
          <div className="mt-2 text-3xl font-bold font-mono text-emerald-600 tabular-nums">
            128
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Human-approved memory items
          </div>
        </div>
      </div>

      {/* Dual Storage Architecture Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Vector DB */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">VECTOR DATABASE</h3>
                <p className="text-xs text-slate-500">ChromaDB Engine (Air-Gapped Instance)</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Ready</span>
            </span>
          </div>

          <div className="text-xs text-slate-600 leading-relaxed pt-1">
            <strong>Purpose:</strong> Semantic retrieval across unstructured technical prose, inspection logs, and incident descriptions.
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 font-mono text-[11px] text-slate-600 flex items-center justify-between">
            <span>Model: BAAI/bge-large-en-v1.5 (Local)</span>
            <span>Index Size: 1.42 GB</span>
          </div>
        </div>

        {/* Knowledge Graph */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">KNOWLEDGE GRAPH</h3>
                <p className="text-xs text-slate-500">Neo4j Community Edition (Local Host)</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Ready</span>
            </span>
          </div>

          <div className="text-xs text-slate-600 leading-relaxed pt-1">
            <strong>Purpose:</strong> Entity and relationship retrieval connecting equipment tags (e.g. CP-204) to bearings, symptoms, and ISO standards.
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 font-mono text-[11px] text-slate-600 flex items-center justify-between">
            <span>Triplets: 12,410 Relationships</span>
            <span>Query Latency: ~6ms</span>
          </div>
        </div>
      </div>

      {/* DOCUMENT SOURCES TABLE */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Document Sources</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Approved confidential documents indexed for agent reasoning.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter documents..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600 w-44"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Document Title</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Format</th>
                <th className="py-3 px-6">Chunks</th>
                <th className="py-3 px-6">Vector Status</th>
                <th className="py-3 px-6">Graph Link</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map((doc) => (
                <tr
                  key={doc.id}
                  onClick={() => onInspectDocument(doc)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="font-semibold text-slate-900 hover:text-indigo-600">
                      {doc.title}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {doc.id} · {doc.pages} Pages · Updated {doc.lastUpdated}
                    </div>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                      {doc.category}
                    </span>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap font-mono text-slate-600">
                    {doc.format}
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap font-mono text-slate-800 tabular-nums">
                    {doc.chunksCount} chunks
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{doc.vectorStatus}</span>
                    </span>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="text-[11px] text-purple-700 font-medium flex items-center gap-1">
                      <Network className="w-3.5 h-3.5" />
                      <span>{doc.graphStatus}</span>
                    </span>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onInspectDocument(doc);
                      }}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      View Chunks
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
