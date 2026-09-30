import React, { useState } from 'react';
import { ArrowRight, BookOpen, GraduationCap, FileText, Code2, Check, X } from 'lucide-react';

interface AcademicItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  topics: string[];
}

const ACADEMIC_ITEMS: AcademicItem[] = [
  {
    id: 'research',
    title: 'Computational Research & System Modeling',
    category: 'Research',
    description: 'Assisting research institutions and graduate laboratories in mathematical simulation, dataset analysis, and prototype development.',
    image: '/images/requin_software_team_1790576614688.jpg',
    topics: ['Data modeling & statistics', 'Algorithm validation', 'Simulation scripting']
  },
  {
    id: 'articles',
    title: 'Technical Publications & Whitepapers',
    category: 'Articles',
    description: 'In-depth engineering articles, architectural whitepapers, and industry technology analyses authored by our senior architects.',
    image: '/images/modern_software_mockup_1790576657118.jpg',
    topics: ['System design blueprints', 'Cloud migration case analyses', 'Security protocols']
  },
  {
    id: 'training',
    title: 'Professional Engineering Training',
    category: 'Training',
    description: 'Hands-on training curriculums for computer science students and early-career developers in production-grade software practices.',
    image: '/images/digital_agency_office_1790576645354.jpg',
    topics: ['Modern React & TypeScript', 'Backend API architecture', 'GitOps & CI/CD workflows']
  },
  {
    id: 'documentation',
    title: 'Project Architecture & Documentation',
    category: 'Documentation',
    description: 'Comprehensive system specifications, API schemas, deployment manuals, and institutional technology documentation.',
    image: '/images/cloud_infrastructure_1790576629897.jpg',
    topics: ['OpenAPI / Swagger specs', 'System architecture diagrams', 'Deployment runbooks']
  }
];

export const AcademicSolutionsSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<AcademicItem | null>(null);

  return (
    <section id="academic-solutions" className="py-28 md:py-36 bg-[#FFFFFF] text-[#0B1726] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="text-xs font-semibold tracking-widest text-[#08B9E8] uppercase mb-3">
            Knowledge & Academic Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1726] tracking-[-0.03em]">
            Academic Solutions & Research
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] font-normal leading-[1.65]">
            Bridging theoretical computer science and production software engineering through applied research support, technical publications, and developer training.
          </p>
        </div>

        {/* 4 Cards Grid - Visually Lighter Layout with Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {ACADEMIC_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer bg-[#F5F9FC] rounded-2xl border border-slate-200/90 hover:border-[#08B9E8]/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between text-left"
            >
              <div>
                {/* Visual Area */}
                <div className="h-44 w-full overflow-hidden bg-slate-200 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-[#0B1726] shadow-sm">
                    {item.category}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 className="text-lg font-bold text-[#0B1726] group-hover:text-[#08B9E8] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  <div className="space-y-1 pt-2">
                    {item.topics.map((t, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Check className="w-3 h-3 text-[#08B9E8] shrink-0" />
                        <span className="truncate">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B1726] group-hover:text-[#08B9E8] transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal View */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071827]/80 backdrop-blur-md">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left border border-slate-200">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#08B9E8] uppercase tracking-wider">
                {selectedItem.category}
              </span>
              <h3 className="text-2xl font-bold text-[#0B1726]">{selectedItem.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{selectedItem.description}</p>
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-800 uppercase">Focus Areas</div>
                {selectedItem.topics.map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-[#08B9E8]" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <a
                  href="#contact"
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#071827] hover:bg-[#0B2235]"
                >
                  Contact Academic Desk
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
