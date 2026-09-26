import React, { useState } from 'react';
import {
  BookmarkCheck,
  Search,
  CheckCircle2,
  FileText,
  Calendar,
  User,
  ArrowRight,
  Database,
  ExternalLink,
  Shield,
  Layers,
} from 'lucide-react';
import { VerifiedSolution, UserRole } from '../types';

interface VerifiedMemoryViewProps {
  solutions: VerifiedSolution[];
  userRole: UserRole;
  onSelectSolution: (solution: VerifiedSolution) => void;
}

export const VerifiedMemoryView: React.FC<VerifiedMemoryViewProps> = ({
  solutions,
  userRole,
  onSelectSolution,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('All');

  const filtered = solutions.filter((sol) => {
    const matchesSearch =
      sol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sol.incidentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sol.originalProblem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sol.validatedSolution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAsset = selectedAsset === 'All' || sol.asset.includes(selectedAsset);
    return matchesSearch && matchesAsset;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
            <BookmarkCheck className="w-4 h-4" />
            <span>Organizational Memory Layer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Verified Experience Memory
          </h2>
          <p className="mt-1 text-slate-600 text-sm">
            Human-approved engineering solutions permanently indexed for future Hybrid RAG retrieval.
            When new problems emerge, SAGE cross-references this repository to avoid repeating past diagnostic cycles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-mono text-emerald-800">
            <span className="font-bold text-base block">{solutions.length}</span>
            <span>Verified Records</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search verified resolutions, codes, assets..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1">
          <span className="text-xs text-slate-500 whitespace-nowrap">Filter Asset:</span>
          {['All', 'Pump', 'Valve', 'Compressor', 'Transformer'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedAsset(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                selectedAsset === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Verified Memory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectSolution(item)}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Header row */}
              <div className="flex items-center justify-between gap-2 text-xs mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {item.incidentCode}
                  </span>
                  <span className="font-semibold text-slate-700">{item.asset}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 text-[11px] font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified ({item.confidence}%)</span>
                </div>
              </div>

              {/* Title & Problem */}
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                <span className="font-medium text-slate-700">Problem: </span>
                {item.originalProblem}
              </p>

              {/* Validated Solution Preview */}
              <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-indigo-900 block mb-0.5">
                  Validated Corrective Solution:
                </span>
                {item.validatedSolution}
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span>By: {item.validatedBy}</span>
                <span>·</span>
                <span>{item.date}</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">
                {item.futureRetrievalIndex}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl">
          <BookmarkCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-600">No verified solutions match your query.</p>
        </div>
      )}
    </div>
  );
};
