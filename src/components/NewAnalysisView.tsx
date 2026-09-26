import React, { useState } from 'react';
import {
  FileText,
  Upload,
  X,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  FileCode,
  Sliders,
  Layers,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { AnalysisType, UserRole } from '../types';
import { DEMO_INCIDENT_TEXT } from '../data/mockData';

interface NewAnalysisViewProps {
  userRole: UserRole;
  onStartProcessing: (analysisData: {
    problemDescription: string;
    asset: string;
    incidentId: string;
    department: string;
    priority: 'High' | 'Medium' | 'Low';
    type: AnalysisType;
    files: Array<{ name: string; size: string; type: string }>;
  }) => void;
}

export const NewAnalysisView: React.FC<NewAnalysisViewProps> = ({
  userRole,
  onStartProcessing,
}) => {
  const [problemDescription, setProblemDescription] = useState('');
  const [asset, setAsset] = useState('Cooling Pump CP-204');
  const [incidentId, setIncidentId] = useState('INC-2026-0421');
  const [department, setDepartment] = useState('Mechanical & Rotating Assets');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [analysisType, setAnalysisType] = useState<AnalysisType>('Incident Analysis');

  const [files, setFiles] = useState([
    { name: 'pump_vibration_report.pdf', size: '2.4 MB', type: 'PDF' },
    { name: 'maintenance_history.pdf', size: '4.1 MB', type: 'PDF' },
    { name: 'vibration_data.csv', size: '850 KB', type: 'CSV' },
  ]);

  const handleLoadDemoIncident = () => {
    setProblemDescription(DEMO_INCIDENT_TEXT);
    setAsset('Cooling Pump CP-204');
    setIncidentId('INC-2026-0421');
    setDepartment('Mechanical & Rotating Assets');
    setPriority('High');
    setAnalysisType('Incident Analysis');
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleAddSampleFile = () => {
    const newFiles = [
      { name: 'lubricant_analysis_lab.pdf', size: '1.1 MB', type: 'PDF' },
      { name: 'acoustic_bearing_sensor.csv', size: '620 KB', type: 'CSV' },
      { name: 'shaft_laser_alignment_cert.pdf', size: '3.3 MB', type: 'PDF' },
    ];
    const available = newFiles.find((f) => !files.some((existing) => existing.name === f.name));
    if (available) {
      setFiles([...files, available]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemDescription.trim()) {
      handleLoadDemoIncident();
    }
    onStartProcessing({
      problemDescription: problemDescription.trim() || DEMO_INCIDENT_TEXT,
      asset,
      incidentId,
      department,
      priority,
      type: analysisType,
      files,
    });
  };

  const analysisTypes: { type: AnalysisType; desc: string }[] = [
    { type: 'Incident Analysis', desc: 'Diagnose equipment failure alerts with hybrid RAG' },
    { type: 'Root Cause Analysis', desc: 'Isolate underlying mechanical or operational degradation' },
    { type: 'Document Analysis', desc: 'Extract and cross-verify technical specifications and SOPs' },
    { type: 'Technical Comparison', desc: 'Compare telemetry curves across historical run cycles' },
    { type: 'Knowledge Search', desc: 'Semantic & Graph lookup across confidential archives' },
    { type: 'Data Analysis', desc: 'Run offline Python/SciPy statistical telemetry regressions' },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
          <Shield className="w-3.5 h-3.5" />
          <span>Local Air-Gapped Reasoning</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          New Analysis
        </h2>
        <p className="mt-1 text-slate-600 text-sm">
          Provide a problem, supporting evidence, and optional organizational context.
          SAGE will synthesize local vector knowledge and graph relationships to yield evidence-grounded recommendations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION A: Describe the Problem */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>A. Describe the Problem</span>
                <span className="text-rose-500">*</span>
              </label>
              <p className="text-xs text-slate-500 mt-0.5">
                Clearly state symptoms, alert thresholds, observation timelines, or questions.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLoadDemoIncident}
              className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Load Demo Incident</span>
            </button>
          </div>

          <textarea
            rows={4}
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            placeholder="Describe the technical problem or question you want SAGE to analyze... (Click 'Load Demo Incident' to prefill sample)"
            className="w-full p-4 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all font-sans leading-relaxed"
          />

          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-medium self-center">Demo Presets:</span>
            <button
              type="button"
              onClick={handleLoadDemoIncident}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-xs"
            >
              CP-204 Cooling Pump Vibration Alert
            </button>
            <button
              type="button"
              onClick={() => {
                setProblemDescription(
                  'Boiler Feed Pump BFP-01 drive-end coupling shows anomalous 1X rotational harmonic vibration reaching 5.2 mm/s. Analyze disc fatigue risks.'
                );
                setAsset('Boiler Feed Pump BFP-01');
                setIncidentId('INC-2026-0419');
                setPriority('Medium');
                setAnalysisType('Root Cause Analysis');
              }}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-xs"
            >
              BFP-01 Coupling Harmonic
            </button>
          </div>
        </div>

        {/* SECTION B: Attach Evidence */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-bold text-slate-900">
                B. Attach Evidence
              </label>
              <p className="text-xs text-slate-500 mt-0.5">
                Technical reports, telemetry sensor exports, inspection logs, or equipment manuals.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddSampleFile}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              + Add Sample Attachment
            </button>
          </div>

          {/* Upload Dropzone (Simulated) */}
          <div
            onClick={handleAddSampleFile}
            className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-6 text-center bg-slate-50/50 hover:bg-indigo-50/30 transition-all cursor-pointer group"
          >
            <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-600 mx-auto transition-colors" />
            <div className="mt-2 text-xs font-semibold text-slate-700 group-hover:text-indigo-700">
              Drag & drop confidential files here, or click to browse
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Supported formats: PDF, Images (TIFF/PNG), CSV/Parquet telemetry, Logs, Source code
            </p>
            <div className="mt-2 text-[10px] font-mono text-emerald-600">
              🔒 Local ingestion sandbox: Files never leave host memory
            </div>
          </div>

          {/* File Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {files.map((file, idx) => (
              <div
                key={file.name}
                className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 shadow-xs hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    {file.type === 'CSV' ? (
                      <FileSpreadsheet className="w-4 h-4" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-800 truncate">
                      {file.name}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                      <span>{file.size}</span>
                      <span>·</span>
                      <span className="text-emerald-600 font-medium">✓ Processed</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(idx)}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                  title="Remove file"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION C: Add Context */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div>
            <label className="text-sm font-bold text-slate-900">
              C. Add Context (Optional Metadata)
            </label>
            <p className="text-xs text-slate-500 mt-0.5">
              Specifying plant assets and incident identifiers narrows the knowledge graph traversal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                System / Asset
              </label>
              <input
                type="text"
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
                placeholder="e.g. CP-204"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Incident ID
              </label>
              <input
                type="text"
                value={incidentId}
                onChange={(e) => setIncidentId(e.target.value)}
                placeholder="e.g. INC-2026-0421"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Department / Cell
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Rotating Assets"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION D: Analysis Type */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div>
            <label className="text-sm font-bold text-slate-900">
              D. Analysis Type
            </label>
            <p className="text-xs text-slate-500 mt-0.5">
              Select reasoning objective to configure local model prompting and retrieval heuristics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {analysisTypes.map((item) => {
              const isSelected = analysisType === item.type;
              return (
                <div
                  key={item.type}
                  onClick={() => setAnalysisType(item.type)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{item.type}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION E: Start Analysis Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-slate-800">Security Guarantee: </span>
            Inference runs on local GPU cluster. No prompts or files egress to public networks.
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-200 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Analyze with SAGE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
