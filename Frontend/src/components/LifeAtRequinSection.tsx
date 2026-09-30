import React, { useState } from 'react';
import { Camera, Calendar, Sparkles, ChevronRight } from 'lucide-react';
import { LIFE_AT_REQUIN_GALLERY, GalleryImage } from '../data/requinData';

export const LifeAtRequinSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImage, setActiveImage] = useState<GalleryImage>(LIFE_AT_REQUIN_GALLERY[0]);

  const categories = ['All', '5th Anniversary', 'Diwali', '4th Anniversary', 'Office Party'];

  const filteredImages =
    selectedCategory === 'All'
      ? LIFE_AT_REQUIN_GALLERY
      : LIFE_AT_REQUIN_GALLERY.filter((item) => item.category === selectedCategory);

  const displayActive =
    filteredImages.find((img) => img.id === activeImage.id) || filteredImages[0] || LIFE_AT_REQUIN_GALLERY[0];

  return (
    <section id="life-at-requin" className="py-28 md:py-36 bg-[#F5F9FC] text-[#0B1726] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-widest text-[#08B9E8] uppercase mb-3">
              Team & Culture
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1726] tracking-[-0.03em]">
              Life at Requin
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#64748B] font-normal leading-[1.65]">
              Behind every high-performance codebase is a passionate team of technologists. Glimpse into our company celebrations, festive traditions, and collaborative spirit.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/80 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 focus:outline-none ${
                  selectedCategory === cat
                    ? 'bg-white text-[#0B1726] shadow-sm'
                    : 'text-slate-600 hover:text-[#0B1726]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Layout: One Large Prominent Featured Image + Supporting Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Featured Image - Crisp and Prominent */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xl transition-all duration-300">
              <div className="relative h-[340px] sm:h-[440px] w-full overflow-hidden bg-slate-900">
                <img
                  src={displayActive.image}
                  alt={displayActive.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 sm:p-7 text-left bg-white">
                <div className="flex items-center justify-between text-xs font-semibold text-[#08B9E8] uppercase tracking-wider mb-1.5">
                  <span>{displayActive.category}</span>
                  <span className="text-slate-400 font-normal">{displayActive.date}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B1726]">
                  {displayActive.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {displayActive.caption}
                </p>
              </div>
            </div>
          </div>

          {/* Supporting Images Grid - Clicking swaps featured view */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {filteredImages.map((img) => {
              const isSelected = img.id === displayActive.id;
              return (
                <div
                  key={img.id}
                  onClick={() => setActiveImage(img)}
                  className={`group cursor-pointer rounded-xl overflow-hidden bg-white border transition-all duration-200 ${
                    isSelected
                      ? 'ring-2 ring-[#08B9E8] border-transparent shadow-md'
                      : 'border-slate-200 hover:border-slate-400 shadow-sm'
                  }`}
                >
                  <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-slate-200">
                    <img
                      src={img.image}
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-3 text-left">
                    <div className="text-[11px] font-bold text-[#0B1726] truncate">
                      {img.title}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {img.category}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
