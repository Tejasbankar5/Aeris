import React from 'react';
import {
  ShieldAlert,
  Server,
  Lock,
  Cpu,
  Database,
  Network,
  Wrench,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Layers,
} from 'lucide-react';
import { UserRole } from '../types';

interface SystemStatusViewProps {
  userRole: UserRole;
  onOpenTechStackModal: () => void;
}

export const SystemStatusView: React.FC<SystemStatusViewProps> = ({
  userRole,
  onOpenTechStackModal,
}) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
            <Lock className="w-4 h-4" />
            <span>Air-Gapped Infrastructure Telemetry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Security & System Status
          </h2>
          <p className="mt-1 text-slate-600 text-sm">
            Architectural guarantees governing confidential organizational data.
            All processing is restricted to local hardware with enforced zero network egress.
          </p>
        </div>

        <button
          onClick={onOpenTechStackModal}
          className="px-4 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-colors flex items-center gap-2 self-start md:self-auto shrink-0"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>View Prototype Tech Stack</span>
        </button>
      </div>

      {/* Primary Security Status Board */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              Air-Gapped Security Profile (Prototype Representation)
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              Zero-Egress Hermetic Boundary
            </h3>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>EGRESS BLOCKED</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-6">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Environment</div>
            <div className="text-xs font-bold text-white mt-1">
              Organization-Controlled
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">On-Premise Physical Server</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-400 uppercase">External Network</div>
            <div className="text-xs font-bold text-rose-400 mt-1 font-mono">
              BLOCKED
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">0 Outbound Sockets</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Data Processing</div>
            <div className="text-xs font-bold text-emerald-400 mt-1 font-mono">
              LOCAL
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Host NVMe + RAM Only</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Model Execution</div>
            <div className="text-xs font-bold text-indigo-400 mt-1 font-mono">
              ON-PREMISE
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Local GPU Acceleration</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-400 uppercase">External API</div>
            <div className="text-xs font-bold text-amber-400 mt-1 font-mono">
              DISABLED
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">No Cloud LLM Calls</div>
          </div>
        </div>
      </div>

      {/* Subsystem Health Checks */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Internal Subsystem Operational Readiness
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time status of on-premise components powering the SAGE reasoning loop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: 'SAGE Core Orchestrator',
              desc: 'Agentic state machine coordinating task understanding and model dispatch',
              status: 'Operational',
              icon: Cpu,
            },
            {
              name: 'Local Model Pool',
              desc: 'DeepSeek-R1-Distill-14B, Qwen2-VL, StarCoder2 (GGUF / vLLM runtime)',
              status: 'Available',
              icon: Server,
            },
            {
              name: 'Private Knowledge Base',
              desc: 'Dual-tier storage combining ChromaDB vectors with Neo4j relational graph',
              status: 'Available',
              icon: Database,
            },
            {
              name: 'Vector Search Service',
              desc: 'Sentence Transformers BAAI/bge-large-en embedding generation on GPU',
              status: 'Available',
              icon: Database,
            },
            {
              name: 'Knowledge Graph Engine',
              desc: 'Neo4j multi-hop entity traversal and Cypher query resolver',
              status: 'Available',
              icon: Network,
            },
            {
              name: 'Local ToolBox Sandbox',
              desc: 'Seccomp-confined Python / SciPy / OCR offline execution kernel',
              status: 'Available',
              icon: Wrench,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 mt-0.5 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{item.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {item.desc}
                    </div>
                  </div>
                </div>

                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{item.status}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimers & Integrity Note */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
        <div className="leading-relaxed">
          <strong>Smart India Hackathon Prototype Architecture Note: </strong>
          This interface demonstrates the intended user workflow and air-gapped security state of SAGE.
          In production deployment, the air gap is enforced through unidirectional data diodes and physical air-gapped network switches.
        </div>
      </div>
    </div>
  );
};
