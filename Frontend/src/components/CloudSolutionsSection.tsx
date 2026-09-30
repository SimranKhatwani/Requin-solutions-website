import React from 'react';
import { ArrowRight, Cloud, Server, ShieldCheck, GitBranch, Cpu, Activity } from 'lucide-react';

interface CloudSolutionsSectionProps {
  onConsultation: () => void;
}

export const CloudSolutionsSection: React.FC<CloudSolutionsSectionProps> = ({ onConsultation }) => {
  return (
    <section id="cloud-solutions" className="py-28 md:py-36 bg-[#071827] text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div
        className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#08B9E8]/10 blur-[140px] rounded-full pointer-events-none -translate-y-1/2"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Content & Capabilities */}
          <div className="lg:col-span-6 space-y-7 text-left order-2 lg:order-1">
            <div>
              <div className="text-xs font-semibold tracking-widest text-[#08B9E8] uppercase mb-3">
                Infrastructure & DevOps
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em]">
                Cloud Solutions & Architecture
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-[1.65] font-normal">
              Modern enterprises cannot afford fragile infrastructure. Requin Solutions designs and operates high-availability multi-cloud foundations engineered for zero-downtime scalability, hardened security, and automated deployments.
            </p>

            {/* Architecture Pillars List - Editorial Format, NOT 3-Column Card Grid */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#08B9E8]/10 border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8] shrink-0 mt-0.5">
                  <GitBranch className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Automated CI/CD & GitOps</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    Automated build, test, and release pipelines ensuring rapid cycle iterations with automated rollback triggers.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#08B9E8]/10 border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8] shrink-0 mt-0.5">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Containerization & Kubernetes</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    Elastic container orchestration across AWS EKS and Google Kubernetes Engine for dynamic workload distribution.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#08B9E8]/10 border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8] shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Zero-Trust Cloud Security</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    Encrypted storage at rest and in transit, IAM access isolation, automated secret rotation, and audit compliance.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onConsultation}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all duration-200 shadow-md shadow-[#08B9E8]/20 focus:outline-none"
              >
                <span>Request Cloud Architecture Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT: Large Cloud / Infrastructure Visual */}
          <div className="lg:col-span-6 relative order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
              <img
                src="/images/cloud_infrastructure_1790576629897.jpg"
                alt="Cloud Infrastructure Visualization"
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/90 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Infrastructure Status Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0B2235]/95 border border-white/15 backdrop-blur-md flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#08B9E8] uppercase tracking-wider">
                    Infrastructure as Code
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    Multi-Cloud Terraform Blueprints
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    AWS · Google Cloud · Azure Supported
                  </div>
                </div>
                <div className="w-9 h-9 rounded-lg bg-[#08B9E8]/20 text-[#08B9E8] flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
