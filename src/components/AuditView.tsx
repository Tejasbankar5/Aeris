import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Download,
  Calendar,
  User,
  Filter,
  FileText,
  Clock,
} from 'lucide-react';
import { AuditEntry, UserRole } from '../types';

interface AuditViewProps {
  logs: AuditEntry[];
  userRole: UserRole;
}

export const AuditView: React.FC<AuditViewProps> = ({ logs, userRole }) => {
  const [filterRole, setFilterRole] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.analysisTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.modelUsed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || log.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleExportAudit = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(filteredLogs, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `sage_audit_log_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Cryptographic Traceability</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Audit & Validation Records
          </h2>
          <p className="mt-1 text-slate-600 text-sm">
            Immutable organizational audit log of every SAGE execution, model routing decision,
            confidence estimation, and human validation sign-off.
          </p>
        </div>

        <button
          onClick={handleExportAudit}
          className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors flex items-center gap-2 shadow-2xs self-start md:self-auto shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Manifest (JSON)</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search audit trail by analysis, user, model..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1">
          <span className="text-xs text-slate-500 whitespace-nowrap">Role Filter:</span>
          {['All', 'Engineer', 'IT / Operations', 'Auditor', 'Administrator'].map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                filterRole === role
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Timestamp / ID</th>
                <th className="py-3.5 px-6">User & Persona</th>
                <th className="py-3.5 px-6">Analysis Target</th>
                <th className="py-3.5 px-6">Confidence</th>
                <th className="py-3.5 px-6">Validation Sign-Off</th>
                <th className="py-3.5 px-6">Evidence Grounding</th>
                <th className="py-3.5 px-6">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="font-medium text-slate-900">{log.timestamp}</div>
                    <div className="text-[10px] font-mono text-slate-400">{log.id}</div>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="font-semibold text-slate-800">{log.user}</div>
                    <div className="text-[10px] text-indigo-600 font-medium">{log.role}</div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="font-semibold text-slate-900">{log.analysisTitle}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      Model: {log.modelUsed}
                    </div>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`font-mono font-bold text-xs ${
                        log.confidence >= 85
                          ? 'text-emerald-700'
                          : log.confidence >= 70
                          ? 'text-amber-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {log.confidence}%
                    </span>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                        log.validation === 'Approved'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : log.validation === 'Awaiting Review'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {log.validation === 'Approved' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Clock className="w-3 h-3 text-amber-600" />
                      )}
                      <span>{log.validation}</span>
                    </span>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap text-slate-700">
                    <span className="font-medium">{log.evidenceCount} sources</span>
                    <span className="text-[10px] text-slate-400 block">Corroborated</span>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="text-emerald-700 text-xs font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{log.status}</span>
                    </span>
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
