import React, { useState } from 'react';
import {
  Wrench,
  Play,
  Terminal,
  Lock,
  CheckCircle2,
  Cpu,
  FileSpreadsheet,
  FileCode,
  Calculator,
  HardDrive,
  Shield,
  Activity,
  AlertCircle,
} from 'lucide-react';
import { AgentTool, UserRole } from '../types';

interface ToolboxViewProps {
  tools: AgentTool[];
  userRole: UserRole;
}

export const ToolboxView: React.FC<ToolboxViewProps> = ({ tools, userRole }) => {
  const [activeTool, setActiveTool] = useState<AgentTool>(tools[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string | null>(
    activeTool.sampleOutput || null
  );

  const handleRunTool = (tool: AgentTool) => {
    setActiveTool(tool);
    setIsRunning(true);
    setTerminalOutput('Initializing isolated container namespace...\nBinding read-only shared memory...\nExecuting hermetic agent code...');
    setTimeout(() => {
      setIsRunning(false);
      setTerminalOutput(
        `[SAGE AIR-GAP EXECUTION OK - EXIT 0]\n$ ${tool.sampleCommand || 'local_eval'}\n\n${tool.sampleOutput || 'Execution completed with zero network egress.'}`
      );
    }, 600);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            <Wrench className="w-4 h-4" />
            <span>Deterministic Execution Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Local ToolBox
          </h2>
          <p className="mt-1 text-slate-600 text-sm">
            Audited execution capabilities provided to the SAGE reasoning agent.
            All tools operate within air-gapped container sandboxes with strictly disabled socket network access.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <Lock className="w-3.5 h-3.5" />
          <span>Container Socket Egress: BLOCKED</span>
        </div>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const isSelected = activeTool.id === tool.id;
          return (
            <div
              key={tool.id}
              onClick={() => {
                setActiveTool(tool);
                setTerminalOutput(tool.sampleOutput || null);
              }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 bg-white shadow-md ring-1 ring-indigo-600'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[10px] font-mono text-slate-400">{tool.id}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[10px] border border-emerald-200">
                    {tool.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{tool.name}</h3>
                <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider block mt-0.5">
                  {tool.category}
                </span>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {tool.purpose}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">
                  {tool.executionEnvironment}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRunTool(tool);
                  }}
                  className="px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors flex items-center gap-1"
                >
                  <Play className="w-3 h-3 fill-indigo-600" />
                  <span>Test Run</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Tool Execution Sandbox Terminal */}
      <div className="bg-slate-950 text-slate-200 rounded-2xl p-6 border border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">
              Air-Gapped Sandbox Inspection: {activeTool.name}
            </span>
          </div>

          <button
            onClick={() => handleRunTool(activeTool)}
            disabled={isRunning}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>{isRunning ? 'Executing...' : 'Trigger Sandbox Run'}</span>
          </button>
        </div>

        <div className="space-y-2">
          <div className="text-[11px] text-slate-400 font-mono">
            $ Input Invocation:
          </div>
          <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-indigo-300 border border-slate-800/80 overflow-x-auto">
            {activeTool.sampleCommand || 'sage_tool_exec --hermetic'}
          </div>

          <div className="text-[11px] text-slate-400 font-mono pt-2">
            Output Stream (Verified Offline):
          </div>
          <pre className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400 border border-slate-800/80 whitespace-pre-wrap leading-relaxed min-h-[90px]">
            {terminalOutput || 'Click "Trigger Sandbox Run" to inspect execution trace.'}
          </pre>
        </div>

        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Security Policy: Seccomp BPF Sandbox Filter Active</span>
          <span>Outbound Bytes: 0 B</span>
        </div>
      </div>
    </div>
  );
};
