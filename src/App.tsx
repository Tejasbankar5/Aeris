import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DashboardView } from './components/DashboardView';
import { NewAnalysisView } from './components/NewAnalysisView';
import { ProcessingView } from './components/ProcessingView';
import { AnalysisResultView } from './components/AnalysisResultView';
import { AnalysesListView } from './components/AnalysesListView';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { VerifiedMemoryView } from './components/VerifiedMemoryView';
import { ToolboxView } from './components/ToolboxView';
import { AuditView } from './components/AuditView';
import { SystemStatusView } from './components/SystemStatusView';
import { SettingsView } from './components/SettingsView';
import {
  SearchModal,
  EvidenceDrawer,
  IngestionModal,
  SolutionDetailModal,
  TechStackModal,
} from './components/Modals';

import {
  AnalysisRecord,
  EvidenceItem,
  VerifiedSolution,
  DocumentSource,
  UserRole,
  NotificationItem,
} from './types';
import {
  SAMPLE_ANALYSIS_CP204,
  INITIAL_RECENT_ANALYSES,
  INITIAL_VERIFIED_SOLUTIONS,
  INITIAL_DOCUMENTS,
  SAGE_TOOLS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
  DEMO_INCIDENT_TEXT,
} from './data/mockData';

export default function App() {
  // Navigation & Role State
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('Engineer');
  const [demoStep, setDemoStep] = useState<number>(1);

  // Core Data State
  const [analyses, setAnalyses] = useState<AnalysisRecord[]>(INITIAL_RECENT_ANALYSES);
  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisRecord>(SAMPLE_ANALYSIS_CP204);
  const [verifiedSolutions, setVerifiedSolutions] = useState<VerifiedSolution[]>(INITIAL_VERIFIED_SOLUTIONS);
  const [documents, setDocuments] = useState<DocumentSource[]>(INITIAL_DOCUMENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals / Drawers State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTechStackOpen, setIsTechStackOpen] = useState(false);
  const [isIngestionOpen, setIsIngestionOpen] = useState(false);
  const [inspectingEvidence, setInspectingEvidence] = useState<EvidenceItem | null>(null);
  const [inspectingSolution, setInspectingSolution] = useState<VerifiedSolution | null>(null);

  // 1-Click Guided Demo Flow Trigger
  const handleRunDemoFlow = () => {
    setDemoStep(2);
    setCurrentTab('new-analysis');
  };

  // Processing Handler
  const handleStartProcessing = (data: {
    problemDescription: string;
    asset: string;
    incidentId: string;
    department: string;
    priority: 'High' | 'Medium' | 'Low';
    type: any;
    files: Array<{ name: string; size: string; type: string }>;
  }) => {
    // Switch to processing animation
    setCurrentTab('processing');
    setDemoStep(3);
  };

  const handleProcessingComplete = () => {
    // Land on the rich analysis result screen
    setActiveAnalysis(SAMPLE_ANALYSIS_CP204);
    setCurrentTab('analysis-result');
    setDemoStep(4);
  };

  // Validation Approval Handler
  const handleApproveSolution = (analysisId: string, comment?: string) => {
    const updated = analyses.map((a) =>
      a.id === analysisId
        ? {
            ...a,
            status: 'Completed' as const,
            validationStatus: 'Approved' as const,
            validatedBy: `${userRole} (Dr. Tejas Bankar)`,
            validatedAt: 'Just now',
          }
        : a
    );
    setAnalyses(updated);

    // Create a new entry in Verified Experience Memory if not already there
    const alreadyExists = verifiedSolutions.some(
      (s) => s.incidentCode === activeAnalysis.incidentId
    );
    if (!alreadyExists) {
      const newVerified: VerifiedSolution = {
        id: `V-${Date.now()}`,
        incidentCode: activeAnalysis.incidentId,
        title: `${activeAnalysis.asset} - Bearing degradation resolution`,
        asset: activeAnalysis.asset,
        originalProblem: activeAnalysis.problemDescription,
        rootCause: activeAnalysis.rootCause,
        validatedSolution:
          comment ||
          'Replaced SKF 22220 spherical roller bearing on housing B-2; executed precision laser alignment; tightened housing clamp.',
        validatedBy: `${userRole} (Dr. Tejas Bankar)`,
        date: 'Today',
        confidence: 94,
        status: 'Verified',
        evidenceSourcesCount: activeAnalysis.evidence.length,
        futureRetrievalIndex: `INDEX_ROTATING_${activeAnalysis.incidentId.replace('-', '_')}`,
      };
      setVerifiedSolutions([newVerified, ...verifiedSolutions]);
    }

    // Add notification
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: `Analysis ${activeAnalysis.incidentId} approved & committed`,
      description: 'Indexed in Verified Experience Memory for immediate hybrid RAG recall.',
      timestamp: 'Just now',
      type: 'memory',
      unread: true,
      actionTab: 'verified-memory',
    };
    setNotifications([newNotif, ...notifications]);
    setDemoStep(5);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleDocumentAdded = (newDoc: DocumentSource) => {
    setDocuments([newDoc, ...documents]);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        setUserRole={setUserRole}
        openSystemStatusModal={() => setCurrentTab('system-status')}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Navigation & Status Bar */}
        <TopBar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          userRole={userRole}
          setUserRole={setUserRole}
          openSearchModal={() => setIsSearchOpen(true)}
          openTechStackModal={() => setIsTechStackOpen(true)}
          openSystemStatusModal={() => setCurrentTab('system-status')}
          notifications={notifications}
          markNotificationAsRead={handleMarkNotificationRead}
          onRunDemoFlow={handleRunDemoFlow}
          currentDemoStep={demoStep}
          onSetDemoStep={setDemoStep}
        />

        {/* Dynamic Main Viewport Canvas */}
        <main className="flex-1 overflow-y-auto">
          {currentTab === 'dashboard' && (
            <DashboardView
              userRole={userRole}
              analyses={analyses}
              onStartNewAnalysis={() => setCurrentTab('new-analysis')}
              onOpenAnalysis={(analysis) => {
                setActiveAnalysis(analysis);
                setCurrentTab('analysis-result');
              }}
              onLaunchDemoFlow={handleRunDemoFlow}
              onNavigateTab={setCurrentTab}
            />
          )}

          {currentTab === 'new-analysis' && (
            <NewAnalysisView
              userRole={userRole}
              onStartProcessing={handleStartProcessing}
            />
          )}

          {currentTab === 'processing' && (
            <ProcessingView
              onComplete={handleProcessingComplete}
              assetName={activeAnalysis.asset}
            />
          )}

          {currentTab === 'analysis-result' && (
            <AnalysisResultView
              analysis={activeAnalysis}
              userRole={userRole}
              onOpenEvidence={(ev) => setInspectingEvidence(ev)}
              onApproveSolution={handleApproveSolution}
              onNavigateToMemory={() => {
                setCurrentTab('verified-memory');
                setDemoStep(6);
              }}
            />
          )}

          {currentTab === 'analyses-list' && (
            <AnalysesListView
              analyses={analyses}
              userRole={userRole}
              onOpenAnalysis={(analysis) => {
                setActiveAnalysis(analysis);
                setCurrentTab('analysis-result');
              }}
              onNewAnalysis={() => setCurrentTab('new-analysis')}
            />
          )}

          {currentTab === 'knowledge-base' && (
            <KnowledgeBaseView
              documents={documents}
              userRole={userRole}
              onOpenIngestionModal={() => setIsIngestionOpen(true)}
              onInspectDocument={(doc) => {
                alert(`Inspecting ${doc.chunksCount} chunks generated for ${doc.title} in local ChromaDB store.`);
              }}
            />
          )}

          {currentTab === 'verified-memory' && (
            <VerifiedMemoryView
              solutions={verifiedSolutions}
              userRole={userRole}
              onSelectSolution={(sol) => setInspectingSolution(sol)}
            />
          )}

          {currentTab === 'tools' && (
            <ToolboxView
              tools={SAGE_TOOLS}
              userRole={userRole}
            />
          )}

          {currentTab === 'audit' && (
            <AuditView
              logs={INITIAL_AUDIT_LOGS}
              userRole={userRole}
            />
          )}

          {currentTab === 'system-status' && (
            <SystemStatusView
              userRole={userRole}
              onOpenTechStackModal={() => setIsTechStackOpen(true)}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              userRole={userRole}
              setUserRole={setUserRole}
              onOpenTechStackModal={() => setIsTechStackOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        analyses={analyses}
        documents={documents}
        solutions={verifiedSolutions}
        onSelectAnalysis={(a) => {
          setActiveAnalysis(a);
          setCurrentTab('analysis-result');
        }}
        onSelectSolution={(s) => setInspectingSolution(s)}
        onSelectDocument={(d) => setCurrentTab('knowledge-base')}
      />

      {/* Evidence Inspector Drawer/Modal */}
      <EvidenceDrawer
        evidence={inspectingEvidence}
        onClose={() => setInspectingEvidence(null)}
      />

      {/* Verified Solution Detail Modal */}
      <SolutionDetailModal
        solution={inspectingSolution}
        onClose={() => setInspectingSolution(null)}
      />

      {/* Knowledge Ingestion Modal */}
      <IngestionModal
        isOpen={isIngestionOpen}
        onClose={() => setIsIngestionOpen(false)}
        onDocumentAdded={handleDocumentAdded}
      />

      {/* Prototype Technology Stack Presentation Modal */}
      <TechStackModal
        isOpen={isTechStackOpen}
        onClose={() => setIsTechStackOpen(false)}
      />
    </div>
  );
}
