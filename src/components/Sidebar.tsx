import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  FileSearch,
  Database,
  BookmarkCheck,
  Wrench,
  ShieldCheck,
  Activity,
  Settings,
  ShieldAlert,
  Server,
  Lock,
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  openSystemStatusModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  openSystemStatusModal,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new-analysis', label: 'New Analysis', icon: PlusCircle, highlight: true },
    { id: 'analyses-list', label: 'My Analyses', icon: FileSearch },
    { id: 'knowledge-base', label: 'Knowledge Base', icon: Database },
    { id: 'verified-memory', label: 'Verified Solutions', icon: BookmarkCheck, badge: '128' },
    { id: 'tools', label: 'Local ToolBox', icon: Wrench },
    { id: 'audit', label: 'Audit & Validation', icon: ShieldCheck },
    { id: 'system-status', label: 'System Status', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-indigo-950 font-bold tracking-wider text-lg">
            S
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-white tracking-tight">SAGE</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                PROTOTYPE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-tight">
              Secure Air-Gapped Generative Engine
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Intelligence Workspace
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-950'
                  : item.highlight
                  ? 'text-indigo-300 hover:bg-slate-800 hover:text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-white' : item.highlight ? 'text-indigo-400' : 'text-slate-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Security Status Card */}
      <div className="p-3 mx-3 mb-3 rounded-lg bg-slate-950 border border-slate-800/80">
        <button
          onClick={openSystemStatusModal}
          className="w-full text-left group"
        >
          <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Lock className="w-3.5 h-3.5" />
              AIR-GAPPED
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
              ZERO-EGRESS
            </span>
          </div>

          <div className="space-y-1 text-[11px] text-slate-400">
            <div className="flex justify-between">
              <span>Network:</span>
              <span className="font-semibold text-rose-400 font-mono">BLOCKED</span>
            </div>
            <div className="flex justify-between">
              <span>Processing:</span>
              <span className="font-semibold text-slate-200">LOCAL (ON-PREM)</span>
            </div>
            <div className="flex justify-between">
              <span>External API:</span>
              <span className="font-semibold text-amber-400 font-mono">DISABLED</span>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-indigo-400 group-hover:underline flex items-center justify-between">
            <span>View Security Spec</span>
            <span>→</span>
          </div>
        </button>
      </div>

      {/* User Profile & Role Selector */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-200">
            TB
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white truncate">Dr. Tejas Bankar</div>
            <div className="text-[11px] text-slate-400 truncate">Lead Mechanical SRE</div>
          </div>
        </div>

        {/* Role switcher inside sidebar */}
        <div className="mt-2.5">
          <label className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider block mb-1">
            Current Persona
          </label>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as UserRole)}
            className="w-full bg-slate-950 border border-slate-700 rounded text-xs text-slate-200 px-2 py-1.5 focus:outline-none focus:border-indigo-500 font-medium"
          >
            <option value="Engineer">Engineer (Default)</option>
            <option value="IT / Operations">IT / Operations</option>
            <option value="Administrator">Administrator</option>
            <option value="Auditor">Auditor / Reviewer</option>
          </select>
        </div>
      </div>
    </aside>
  );
};
