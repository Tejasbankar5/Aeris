import React, { useState } from 'react';
import {
  Settings,
  Lock,
  Cpu,
  User,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Server,
  Layers,
  Database,
} from 'lucide-react';
import { UserRole } from '../types';

interface SettingsViewProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onOpenTechStackModal: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  userRole,
  setUserRole,
  onOpenTechStackModal,
}) => {
  const [reasoningModel, setReasoningModel] = useState('DeepSeek-R1-Distill-14B-Local');
  const [visionModel, setVisionModel] = useState('Qwen2-VL-7B-Local');
  const [codingModel, setCodingModel] = useState('StarCoder2-15B-Local');
  const [embeddingModel, setEmbeddingModel] = useState('BAAI/bge-large-en-v1.5');
  const [strictThreshold, setStrictThreshold] = useState('80');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          <Settings className="w-4 h-4" />
          <span>Configuration & Governance</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          System Settings
        </h2>
        <p className="mt-1 text-slate-600 text-sm">
          Manage local model allocation, user role persona, and air-gapped security policies.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* User Profile & Persona */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
            <User className="w-4 h-4 text-indigo-600" />
            <span>User Persona & Role</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Active User Persona
              </label>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600 font-semibold"
              >
                <option value="Engineer">Engineer (Default)</option>
                <option value="IT / Operations">IT / Operations</option>
                <option value="Administrator">Administrator</option>
                <option value="Auditor">Auditor / Reviewer</option>
              </select>
              <p className="text-[11px] text-slate-400 mt-1">
                Adjusts dashboard emphasis, validation permissions, and technical depth.
              </p>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Organization Unit
              </label>
              <input
                type="text"
                disabled
                value="Plant Reliability & Mechanical Asset Cell #4"
                className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-600"
              />
            </div>
          </div>
        </div>

        {/* Security & Air-Gap Enforcement Policy */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Air-Gapped Security Enforcement</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              ENFORCED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">Air-Gapped Mode</div>
                <div className="text-[11px] text-slate-500">Hermetic execution sandbox</div>
              </div>
              <span className="text-xs font-bold font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                ON
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">External Network Access</div>
                <div className="text-[11px] text-slate-500">Outbound packet firewall</div>
              </div>
              <span className="text-xs font-bold font-mono text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                BLOCKED
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">External API Calls</div>
                <div className="text-[11px] text-slate-500">No public AI service endpoints</div>
              </div>
              <span className="text-xs font-bold font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                DISABLED
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">Data Retention</div>
                <div className="text-[11px] text-slate-500">Strict on-premise storage</div>
              </div>
              <span className="text-xs font-bold font-mono text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
                LOCAL ONLY
              </span>
            </div>
          </div>
        </div>

        {/* Local Model Pool Preferences */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
              <Cpu className="w-4 h-4 text-purple-600" />
              <span>Local Model Pool Allocation (On-Premise Weights)</span>
            </div>
            <button
              type="button"
              onClick={onOpenTechStackModal}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              View Full Tech Stack →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Reasoning & Task Decomposition Model
              </label>
              <select
                value={reasoningModel}
                onChange={(e) => setReasoningModel(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600 font-mono"
              >
                <option value="DeepSeek-R1-Distill-14B-Local">DeepSeek-R1-Distill-14B (Local)</option>
                <option value="DeepSeek-R1-Distill-32B-Local">DeepSeek-R1-Distill-32B (Local)</option>
                <option value="Qwen2.5-14B-Instruct-Local">Qwen2.5-14B-Instruct (Local)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Multimodal / Vision Model
              </label>
              <select
                value={visionModel}
                onChange={(e) => setVisionModel(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600 font-mono"
              >
                <option value="Qwen2-VL-7B-Local">Qwen2-VL-7B-Local (Local OCR/Schematics)</option>
                <option value="Llama-3.2-11B-Vision-Local">Llama-3.2-11B-Vision-Local</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Deterministic Code & Tool Model
              </label>
              <select
                value={codingModel}
                onChange={(e) => setCodingModel(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600 font-mono"
              >
                <option value="StarCoder2-15B-Local">StarCoder2-15B (Local)</option>
                <option value="Qwen2.5-Coder-14B-Local">Qwen2.5-Coder-14B (Local)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Dense Vector Embedding Model
              </label>
              <select
                value={embeddingModel}
                onChange={(e) => setEmbeddingModel(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600 font-mono"
              >
                <option value="BAAI/bge-large-en-v1.5">BAAI/bge-large-en-v1.5 (1024-dim)</option>
                <option value="sentence-transformers/all-mpnet-base-v2">all-mpnet-base-v2 (768-dim)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Confidence Threshold */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900">
                Minimum High-Confidence Gate Threshold
              </div>
              <p className="text-xs text-slate-500">
                Analyses scoring below this percentage automatically trigger human review and recovery workflows.
              </p>
            </div>
            <span className="text-base font-mono font-bold text-indigo-600 tabular-nums">
              {strictThreshold}%
            </span>
          </div>

          <input
            type="range"
            min="60"
            max="95"
            value={strictThreshold}
            onChange={(e) => setStrictThreshold(e.target.value)}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-2">
          {saveSuccess ? (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Configuration saved to local encrypted vault.</span>
            </div>
          ) : (
            <div className="text-[11px] text-slate-400">
              Prototype settings stored in client state.
            </div>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
          >
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
};
