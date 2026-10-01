import React from 'react';
import { ArrowRight, ArrowUpRight, Code2, Smartphone, Globe, Sparkles, CheckCircle2 } from 'lucide-react';
import { REQUIN_COMPANY_INFO } from '../data/requinData';

interface HeroProps {
  onExploreServices: () => void;
  onViewProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices, onViewProducts }) => {
  return (
    <section id="hero" className="relative min-h-[92vh] pt-32 pb-20 md:pt-40 md:pb-28 flex items-center overflow-hidden bg-[#071827]">
      {/* Background Subtle Ambience & Radial Cyan Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#08B9E8]/10 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-32 right-0 w-[500px] h-[500px] bg-[#0B2235] blur-[100px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: Headline & Value Proposition */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-7 text-left">
            
            

            {/* Large Heading - Manrope 800, 72-84px desktop, natural wrap */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] font-[800] tracking-[-0.04em] text-white leading-[1.02] max-w-2xl">
              Building Digital Solutions That Move Businesses{' '}
              <span className="text-[#08B9E8]">Forward.</span>
            </h1>

            {/* Actual Requin Company Description - Manrope 400/500, line-height 1.65 */}
            <p className="text-base sm:text-lg text-slate-300 leading-[1.65] max-w-xl font-normal tracking-normal">
              {REQUIN_COMPANY_INFO.aboutProse}
            </p>

            {/* CTAs - Manrope 600, clean rounded rectangle */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreServices}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all duration-200 shadow-lg shadow-[#08B9E8]/20 hover:shadow-[#08B9E8]/35 focus:outline-none active:scale-[0.98]"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onViewProducts}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-[#0B2235] hover:bg-white/10 border border-white/15 transition-all duration-200 focus:outline-none"
              >
                <span>View Our Products</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </button>
            </div>

            {/* Quiet Trust Footnote */}
            <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#08B9E8]" />
                <span>Enterprise Grade Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#08B9E8]" />
                <span>Agile Product Studio</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Realistic Software Product Composition */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[560px] lg:max-w-none">
              {/* Layer 1: Ambient Cyan Glow Behind Device Mockup */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-[#08B9E8]/20 via-[#0B2235]/40 to-transparent rounded-3xl blur-2xl transform -rotate-1 scale-95"
                aria-hidden="true"
              />

              {/* Layer 2: Large Laptop / Browser Visual in Background */}
              <div className="relative rounded-2xl bg-[#0B2235]/90 border border-white/15 shadow-2xl overflow-hidden backdrop-blur-xl transition-transform duration-300 hover:border-white/25">
                {/* Browser Chrome Header */}
                <div className="bg-[#071827] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] text-slate-400 font-mono">
                    <Globe className="w-3 h-3 text-[#08B9E8]" />
                    <span>requinsolutions.com/platform</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">v2.4 Live</div>
                </div>

                {/* Browser Viewport: Realistic Software Application Interface */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Top Bar of the Mock Software Product */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#08B9E8]/10 border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Client Portal Engine</div>
                        <div className="text-xs text-slate-400">Enterprise Cloud Application</div>
                      </div>
                    </div>
                    <div className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
                      Active Release
                    </div>
                  </div>

                  {/* Software Canvas: Clean Product Architecture Showcase */}
                  <div className="grid grid-cols-3 gap-3 pt-1">
                    <div className="col-span-2 space-y-3">
                      <div className="h-28 rounded-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-3.5 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-medium text-slate-300">Modern Architecture</span>
                          <span className="text-[11px] text-[#08B9E8] font-mono">TypeScript / Next.js</span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="w-3/4 h-2 rounded bg-white/20" />
                          <div className="w-1/2 h-2 rounded bg-[#08B9E8]/40" />
                        </div>
                        <div className="text-[11px] text-slate-400">Engineered for sub-second global response</div>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                          <div className="text-[11px] text-slate-400">Data Reliability</div>
                          <div className="text-sm font-bold text-white mt-1">Multi-Region</div>
                        </div>
                        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                          <div className="text-[11px] text-slate-400">Security</div>
                          <div className="text-sm font-bold text-white mt-1">SOC-2 Ready</div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3 flex flex-col justify-between">
                      <div className="text-xs font-semibold text-slate-200">Modules</div>
                      <div className="space-y-2 text-[11px] text-slate-300">
                        <div className="flex items-center gap-1.5 text-[#4DD4F5]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#08B9E8]" />
                          <span>CRM Ops</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                          <span>AMS Sync</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                          <span>Auth API</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">Build 890</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer 3: Overlapping Mobile Device Mockup */}
              <div className="absolute -bottom-6 -right-3 sm:-bottom-8 sm:-right-6 w-44 sm:w-52 rounded-2xl bg-[#071827] border-2 border-white/20 shadow-2xl p-3 backdrop-blur-xl z-20 transition-transform duration-300 hover:translate-y-[-4px]">
                {/* Mobile Speaker & Camera Notch */}
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-2.5" />

                {/* Mobile Screen Content */}
                <div className="rounded-xl bg-[#0B2235] p-3 border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-white">Requin Mobile</span>
                    <Smartphone className="w-3.5 h-3.5 text-[#08B9E8]" />
                  </div>

                  <div className="bg-[#071827] rounded-lg p-2 border border-white/5 space-y-1">
                    <div className="text-[10px] text-slate-400">Workforce AMS</div>
                    <div className="text-xs font-bold text-[#08B9E8]">Checked In 09:02 AM</div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1">
                    <span>GPS Verified</span>
                    <span className="text-emerald-400 font-medium">Synced</span>
                  </div>
                </div>
              </div>

              {/* Layer 4: Small Floating UI Glass Card */}
              <div className="hidden sm:flex absolute -top-5 -left-4 items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0B2235]/95 border border-white/20 shadow-xl backdrop-blur-xl z-20">
                <div className="w-8 h-8 rounded-lg bg-[#08B9E8] flex items-center justify-center text-[#071827]">
                  <Sparkles className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">5+ Years Proven Delivery</div>
                  <div className="text-[11px] text-slate-300">Custom Software & Apps</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
