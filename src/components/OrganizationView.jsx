import React from 'react';
import { 
  Plus, 
  Award, 
  Users, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  Radar, 
  Flame, 
  Trash2 
} from 'lucide-react';

export default function OrganizationView({ 
  organization, 
  onAddWhitelist, 
  onIssueCredential, 
  onSimulateMisuse, 
  onRevokeCredential, 
  onForcePasswordReset, 
  onInvestigateAlert, 
  onRemoveApprovedSite, 
  onManageEmployee 
}) {
  return (
    <div className="space-y-6">
      {/* 1. Org Greeting & KPI Stats Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{organization.orgName}</h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-active" />
              Enclave Protected Org
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-normal">
            Monitor company credentials in real-time, detect unapproved SaaS logins, and instantly revoke compromised employee DIDs.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button 
            onClick={onAddWhitelist}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-2xs bg-white"
          >
            <Plus className="w-3.5 h-3.5 text-slate-500" />
            <span>Add Whitelisted Site</span>
          </button>
          
          <button 
            onClick={onIssueCredential}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-xs font-semibold text-white transition-all flex items-center gap-2 shadow-sm shadow-emerald-700/20"
          >
            <Award className="w-4 h-4" />
            <span>Issue Employee Credential</span>
          </button>
        </div>
      </div>

      {/* 2. Org Summary KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
            <span>TOTAL EMPLOYEES</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 my-2">{organization.totalEmployees}</div>
          <div className="text-xs text-slate-500">{organization.linkedTrustId} Linked to TrustID ({organization.linkedPercentage})</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
            <span>ACTIVE ALERTS</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600 my-2">{organization.activeAlerts.length} Critical / High</div>
          <div className="text-xs text-slate-500">Requires security officer action</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
            <span>PREVENTED BREACHES</span>
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 my-2">{organization.preventedBreaches} This Month</div>
          <div className="text-xs text-emerald-600 font-semibold">100% Phishing block rate</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
            <span>AUTO-REVOCATION</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-lg font-bold text-slate-900 my-2">Score &gt; 0.8 Auto-Lock</div>
          <div className="text-xs text-slate-500">Zero human delay protection</div>
        </div>
      </div>

      {/* 3. Credential Misuse Radar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Radar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Real-Time Credential Misuse Radar</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  {organization.activeAlerts.length} Threats Detected
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">Employees attempting to use corporate credentials on unauthorized or spoofed domains</p>
            </div>
          </div>

          <button 
            onClick={onSimulateMisuse}
            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>Simulate New Misuse Attack</span>
          </button>
        </div>

        <div className="space-y-3">
          {organization.activeAlerts.map(alert => (
            <div key={alert.id} className={`p-4 rounded-2xl border ${
              alert.severity === 'CRITICAL' 
                ? 'border-rose-200 bg-rose-50/40' 
                : 'border-amber-200 bg-amber-50/40'
            } flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    alert.severity === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
                  }`}>
                    {alert.severity} (Risk: {alert.riskScore})
                  </span>
                  <span className="text-xs font-bold text-slate-900">{alert.employeeName} ({alert.employeeEmail})</span>
                  <span className="text-xs text-slate-400">• {alert.employeeRole}</span>
                </div>
                <div className="text-xs text-slate-700 font-medium">
                  Attempted unapproved login on: <span className="font-mono font-bold text-rose-700">{alert.attemptedSite}</span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-4 flex-wrap">
                  <span>Device: <b className="text-slate-700">{alert.device}</b></span>
                  <span>Location: <b className="text-slate-700">{alert.location}</b></span>
                  <span>Anomaly: <b className="text-rose-700">{alert.distanceJump}</b></span>
                  <span>Time: <b>{alert.detectedAt}</b></span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap self-start lg:self-center">
                <button 
                  onClick={() => onRevokeCredential(alert.credentialId, alert.employeeName)}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  Revoke Credentials
                </button>
                <button 
                  onClick={() => onForcePasswordReset(alert.employeeEmail)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs"
                >
                  Force Password Reset
                </button>
                <button 
                  onClick={() => onInvestigateAlert(alert.id)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs"
                >
                  Investigate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Employee DIDs & Directory */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Employee DID & Credential Registry</h3>
            <p className="text-[11px] text-slate-500">All registered decentralized identities bound to Acme Corp enterprise tenant</p>
          </div>
          <span className="text-xs text-slate-400 font-medium">5 of {organization.totalEmployees} shown</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">DID Identifier</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {organization.employees.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50/70 transition-all">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{emp.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{emp.email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium">{emp.department}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{emp.did}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      emp.status.includes('Active') 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : (emp.status === 'Suspicious' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800')
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => onManageEmployee(emp)}
                      className="text-emerald-700 hover:text-emerald-900 font-bold hover:underline"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Approved Whitelist */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Corporate Sanctioned Application Whitelist</h3>
            <p className="text-[11px] text-slate-500">Only these domains are cryptographically authorized to request Acme Corp employee credentials</p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
            {organization.approvedSites.length} Approved Sites
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {organization.approvedSites.map(site => (
            <div key={site.url} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">{site.name}</div>
                <div className="text-[11px] font-mono text-emerald-700">{site.url}</div>
                <div className="text-[10px] text-slate-400 mt-1">Allowed: {site.claimsAllowed} • Approved: {site.approvedAt}</div>
              </div>
              <button 
                onClick={() => onRemoveApprovedSite(site.url)}
                className="text-slate-400 hover:text-rose-600 p-1.5"
                title="Remove from whitelist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
