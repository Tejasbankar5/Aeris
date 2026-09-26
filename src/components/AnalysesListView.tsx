import React, { useState } from 'react';
import {
  FileSearch,
  Search,
  PlusCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { AnalysisRecord, UserRole } from '../types';

interface AnalysesListViewProps {
  analyses: AnalysisRecord[];
  userRole: UserRole;
  onOpenAnalysis: (analysis: AnalysisRecord) => void;
  onNewAnalysis: () => void;
}

export const AnalysesListView: React.FC<AnalysesListViewProps> = ({
  analyses,
  userRole,
  onOpenAnalysis,
  onNewAnalysis,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = analyses.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.incidentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            <FileSearch className="w-4 h-4" />
            <span>Diagnostic Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            My Analyses
          </h2>
          <p className="mt-1 text-slate-600 text-sm">
            All historical and active root-cause analyses conducted across plant equipment.
          </p>
        </div>

        <button
          onClick={onNewAnalysis}
          className="px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm flex items-center gap-2 self-start md:self-auto shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ New Analysis</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, asset, incident code..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1">
          <span className="text-xs text-slate-500 whitespace-nowrap">Filter Status:</span>
          {['All', 'Completed', 'Awaiting Validation'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Analyses Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Analysis Target / Title</th>
                <th className="py-3.5 px-6">Asset & Code</th>
                <th className="py-3.5 px-6">Analysis Type</th>
                <th className="py-3.5 px-6">Confidence</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Created</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onOpenAnalysis(item)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {item.rootCause}
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
                    <span
                      className={`font-mono font-bold text-xs ${
                        item.confidence >= 85
                          ? 'text-emerald-700'
                          : item.confidence >= 70
                          ? 'text-amber-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {item.confidence}%
                    </span>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium ${
                        item.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
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

                  <td className="py-4 px-6 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                    {item.createdAt}
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAnalysis(item);
                      }}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1"
                    >
                      <span>Open</span>
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
