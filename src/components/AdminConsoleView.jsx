import React from 'react';
import { 
  ShieldAlert, 
  Zap, 
  Fingerprint, 
  ShieldCheck, 
  Ban, 
  Gauge, 
  Cpu, 
  Activity, 
  Check, 
  Copy 
} from 'lucide-react';

export default function AdminConsoleView({ 
  admin, 
  onSimulatePhishing, 
  onSimulateFraud, 
  onInspectEvidence, 
  onVerifyBlockchain, 
  onCopyHash 
}) {
  return (
    <div className="space-y-6">
      {/* 1. Admin Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">TrustID Network Global Core</h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-500 pulse-active" />
              Polygon Amoy Anchored: {admin.blockchainAnchorBlock}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-normal">
            Cluster telemetry, zero-knowledge verification nodes, real-time ML fraud detection engine, and blockchain tamper-proof registry.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button 
            onClick={onSimulatePhishing}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white transition-all flex items-center gap-2 shadow-xs"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Simulate Phishing Intercept</span>
          </button>
          
          <button 
            onClick={onSimulateFraud}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-xs font-bold text-white transition-all flex items-center gap-2 shadow-xs"
          >
            <Zap className="w-4 h-4" />
            <span>Simulate Fraud Velocity</span>
          </button>
        </div>
      </div>

      {/* 2. Infrastructure KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
            <span>REGISTERED DIDs</span>
            <Fingerprint className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 my-2">{admin.totalDIDsRegistered.toLocaleString()}</div>
          <div className="text-xs text-slate-500">Decentralized identities on network</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
            <span>ZK-VERIFICATIONS TODAY</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 my-2">{admin.totalVerificationsToday.toLocaleString()}</div>
          <div className="text-xs text-slate-500">Silent zero-knowledge proofs computed</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
            <span>THREATS BLOCKED TODAY</span>
            <Ban className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-rose-600 my-2">{admin.fraudAttemptsBlockedToday} Active Attacks</div>
          <div className="text-xs text-emerald-600 font-semibold">0 False positives recorded</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs card-hover-effect">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
            <span>ML ENGINE LATENCY</span>
            <Gauge className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 my-2">{admin.meanEngineLatency}</div>
          <div className="text-xs text-slate-500">Isolation Forest inference speed</div>
        </div>
      </div>

      {/* 3. Hardware Tier 1 Enclave Nodes */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Hardware Tier 1 Attested Enclave Nodes</h3>
              <p className="text-[11px] text-slate-500">Cryptographically isolated enclaves running confidential computing (AWS Nitro + Intel SGX)</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
            12 of 12 Cluster Nodes Healthy
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {admin.enclaveNodes.map(node => (
            <div key={node.name} className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{node.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-1">{node.tier}</div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Uptime: <b className="text-slate-800">{node.uptime}</b></span>
                <span className="text-emerald-700 font-semibold font-mono">{node.latency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Real-Time Threat Radar Stream */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Real-Time Threat & Anomaly Radar</h3>
              <p className="text-[11px] text-slate-500">Live inspection of authentication requests with risk scoring &gt; 0.6 threshold</p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400">Stream: Live Polling (300ms)</span>
        </div>

        <div className="space-y-2.5">
          {admin.liveFraudStream.map(item => (
            <div key={item.id} className="p-3.5 rounded-xl border border-rose-200/80 bg-rose-50/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-600 text-white uppercase">
                    {item.verdict}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{item.type}</span>
                  <span className="text-[11px] font-mono text-slate-500 font-normal">Actor: {item.actor}</span>
                  <span className="text-[10px] text-slate-400">• {item.time}</span>
                </div>
                <p className="text-xs text-slate-600">{item.reason}</p>
                <div className="text-[10px] text-slate-400 font-mono">Target: {item.site} • Risk Score: {item.score}</div>
              </div>

              <button 
                onClick={() => onInspectEvidence(item.id, item.type)}
                className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-2xs self-start md:self-center"
              >
                Inspect Hash
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Tamper-Evident Evidence Ledger */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Tamper-Evident Forensic Evidence Ledger</h3>
            <p className="text-[11px] text-slate-500">Every authorization and revocation anchored into Polygon Amoy smart contract with SHA-256 merkle roots</p>
          </div>
          <button 
            onClick={onVerifyBlockchain}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Run Cryptographic Verification</span>
          </button>
        </div>

        <div className="space-y-3">
          {admin.tamperEvidentLedger.map(item => (
            <div key={item.evidenceId} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900">{item.evidenceId}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {item.status}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-600 truncate max-w-xl">
                  SHA-256: <span className="text-slate-900 font-semibold">{item.sha256Hash}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Anchor: {item.txHash} • Block {item.block} • DID: {item.did}
                </div>
              </div>

              <button 
                onClick={() => onCopyHash(item.sha256Hash)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-1.5 shadow-2xs self-start md:self-center"
              >
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Hash</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
