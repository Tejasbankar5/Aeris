import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Loader2,
  Cpu,
  Database,
  Network,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  FastForward,
} from 'lucide-react';

interface ProcessingViewProps {
  onComplete: () => void;
  assetName?: string;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({
  onComplete,
  assetName = 'Cooling Pump CP-204',
}) => {
  const [currentStage, setCurrentStage] = useState(1);
  const [progress, setProgress] = useState(15);

  const stages = [
    {
      step: 1,
      title: 'Task Understanding',
      detail: 'Task classified as: Incident / Root Cause Analysis',
      subtext: 'Selected local reasoning model: DeepSeek-R1-Distill-14B (Hermetic on-premise execution)',
      icon: Cpu,
    },
    {
      step: 2,
      title: 'Retrieving Organizational Knowledge',
      detail: 'Hybrid Retrieval: Vector Search (ChromaDB) + Knowledge Graph (Neo4j)',
      subtext: 'Retrieved SOP-ROT-402, maintenance history, and 5 multi-hop graph entities',
      icon: Database,
    },
    {
      step: 3,
      title: 'Agentic Reasoning & Tool Invocation',
      detail: 'Context synthesis & cross-evidence verification',
      subtext: 'Executed isolated Python sandbox: FFT 2.4X spectral anomaly verified vs ISO 10816 baseline',
      icon: Network,
    },
    {
      step: 4,
      title: 'Verification & Policy Check',
      detail: 'Evidence grounding check & confidence scoring',
      subtext: 'Strict anti-hallucination validation passed. Confidence estimated at 92%',
      icon: ShieldCheck,
    },
    {
      step: 5,
      title: 'Preparing Result & Recommendations',
      detail: 'Generating structured failure diagnosis and human approval package',
      subtext: 'Formulating triage action steps and verified experience index link',
      icon: Sparkles,
    },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentStage(2);
      setProgress(35);
    }, 700);

    const timer2 = setTimeout(() => {
      setCurrentStage(3);
      setProgress(60);
    }, 1500);

    const timer3 = setTimeout(() => {
      setCurrentStage(4);
      setProgress(85);
    }, 2300);

    const timer4 = setTimeout(() => {
      setCurrentStage(5);
      setProgress(98);
    }, 3000);

    const timer5 = setTimeout(() => {
      onComplete();
    }, 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 max-w-3xl mx-auto">
      <div className="w-full bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
        {/* Top Header */}
        <div className="text-center max-w-lg mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
            <span>Air-Gapped Agent Orchestration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            SAGE is analyzing your request
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Analyzing telemetry and organizational archives for <span className="font-semibold text-slate-800">{assetName}</span>.
          </p>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Vertical Pipeline Stages */}
        <div className="space-y-4">
          {stages.map((stage) => {
            const isCompleted = currentStage > stage.step;
            const isCurrent = currentStage === stage.step;
            const isPending = currentStage < stage.step;
            const Icon = stage.icon;

            return (
              <div
                key={stage.step}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  isCurrent
                    ? 'border-indigo-500 bg-indigo-50/40 shadow-xs ring-1 ring-indigo-500'
                    : isCompleted
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-slate-100 bg-slate-50/40 opacity-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center animate-spin">
                        <Loader2 className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-mono">
                        {stage.step}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>{stage.title}</span>
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                          COMPLETED
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-[10px] font-mono text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded animate-pulse">
                          EXECUTING...
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-700 font-medium mt-1">
                      {stage.detail}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {stage.subtext}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer with Skip button */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <div className="font-mono text-[11px]">
            Model: DeepSeek-R1-Distill-14B-Q4_K_M (Local GPU VRAM: 11.2 GB)
          </div>
          <button
            onClick={onComplete}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Fast-Forward Result</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
