import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Lock,
  Layers,
  Sparkles,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { UserRole, NotificationItem } from '../types';

interface TopBarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  openSearchModal: () => void;
  openTechStackModal: () => void;
  openSystemStatusModal: () => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  onRunDemoFlow: () => void;
  currentDemoStep?: number;
  onSetDemoStep?: (step: number) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  openSearchModal,
  openTechStackModal,
  openSystemStatusModal,
  notifications,
  markNotificationAsRead,
  onRunDemoFlow,
  currentDemoStep = 1,
  onSetDemoStep,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showDemoGuide, setShowDemoGuide] = useState(true);

  const notifRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setShowRoleMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    switch (currentTab) {
      case 'dashboard':
        return 'Engineering Intelligence Dashboard';
      case 'new-analysis':
        return 'New Evidence-Grounded Analysis';
      case 'analyses-list':
        return 'Organization Analysis Directory';
      case 'analysis-result':
        return 'Analysis Diagnostic & Evidence Grounding';
      case 'knowledge-base':
        return 'Private Organizational Knowledge Base';
      case 'verified-memory':
        return 'Verified Experience Memory (Reusable Solutions)';
      case 'tools':
        return 'Local Agent ToolBox (Air-Gapped Sandbox)';
      case 'audit':
        return 'Auditability, Traceability & Validation Records';
      case 'system-status':
        return 'Security Posture & Infrastructure Status';
      case 'settings':
        return 'System Configuration & Model Pool';
      default:
        return 'SAGE Intelligence Engine';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Primary Top Bar Row */}
      <div className="h-16 px-6 flex items-center justify-between gap-4">
        {/* Left: Breadcrumbs / Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>SAGE</span>
              <span className="text-slate-300">/</span>
              <span className="capitalize">{currentTab.replace('-', ' ')}</span>
              <span className="text-slate-300">/</span>
              <span className="text-indigo-600 font-semibold">{userRole} Persona</span>
            </div>
            <h1 className="text-base font-bold text-slate-900 truncate tracking-tight">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Center: Search Trigger */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={openSearchModal}
            className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-400 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search analyses, documents, incidents (e.g. &quot;bearing&quot;)...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-500">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Zone Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Security Status Pill */}
          <button
            onClick={openSystemStatusModal}
            className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            title="Inspect Air-Gapped Zero-Egress Status"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">AIR-GAPPED</span>
            <span className="text-emerald-600 font-normal">| Zero-Egress</span>
          </button>

          {/* Prototype Tech Stack Modal Button */}
          <button
            onClick={openTechStackModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Tech Stack</span>
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    SAGE System Notifications ({unreadCount} unread)
                  </span>
                  <button
                    onClick={() => notifications.forEach((n) => markNotificationAsRead(n.id))}
                    className="text-[11px] text-indigo-600 hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationAsRead(n.id);
                        if (n.actionTab) setCurrentTab(n.actionTab);
                        setShowNotifications(false);
                      }}
                      className={`p-3 text-left hover:bg-slate-50 cursor-pointer transition-colors ${
                        n.unread ? 'bg-indigo-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-xs font-semibold text-slate-900">{n.title}</div>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{n.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Role Quick Selector */}
          <div className="relative" ref={roleRef}>
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-800 transition-colors"
            >
              <span>{userRole}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50 p-1">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Role Persona
                </div>
                {(['Engineer', 'IT / Operations', 'Administrator', 'Auditor'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setUserRole(r);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded-md transition-colors flex items-center justify-between ${
                      userRole === r
                        ? 'bg-indigo-50 text-indigo-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{r}</span>
                    {userRole === r && <CheckCircle className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hackathon Interactive Demonstration Stepper Bar */}
      {showDemoGuide && (
        <div className="bg-slate-900 text-white px-6 py-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] border border-indigo-500/30">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              DEMO WORKFLOW
            </span>
            <span className="text-slate-300 hidden sm:inline font-medium">
              Smart India Hackathon End-to-End Walkthrough:
            </span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto py-0.5">
            {[
              { step: 1, label: '1. Dashboard', tab: 'dashboard' },
              { step: 2, label: '2. New Analysis', tab: 'new-analysis' },
              { step: 3, label: '3. Run SAGE Pipeline', action: onRunDemoFlow },
              { step: 4, label: '4. Evidence & Hybrid RAG', tab: 'analysis-result' },
              { step: 5, label: '5. Human Validation', tab: 'analysis-result' },
              { step: 6, label: '6. Verified Memory', tab: 'verified-memory' },
            ].map((s) => (
              <button
                key={s.step}
                onClick={() => {
                  if (onSetDemoStep) onSetDemoStep(s.step);
                  if (s.action) {
                    s.action();
                  } else if (s.tab) {
                    setCurrentTab(s.tab);
                  }
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap ${
                  currentDemoStep === s.step
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRunDemoFlow}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] transition-colors"
            >
              <Play className="w-3 h-3" />
              Run Demo
            </button>
            <button
              onClick={() => setShowDemoGuide(false)}
              className="text-slate-400 hover:text-slate-200 text-xs px-1"
              title="Dismiss helper"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
