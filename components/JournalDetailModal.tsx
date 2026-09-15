import { useModalAnimation } from '../hooks/useModalAnimation';
import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Clock, User, BookOpen, Sparkles, Thermometer, Droplets, CheckCircle, ArrowRight } from 'lucide-react';

export const JournalDetailModal: React.FC = () => {
  const { selectedJournal, setSelectedJournal, setActiveView } = useCart();

  const { root, close } = useModalAnimation(Boolean(selectedJournal), () => setSelectedJournal(null));
  if (!selectedJournal) return null;

  return (
    <div ref={root} className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#141311]/75 backdrop-blur-sm transition-opacity"
        onClick={close}
      />

      <div data-modal-body className="relative mx-auto max-w-4xl bg-[#FAF9F5] border border-[#E8E2D5] shadow-2xl rounded-sm overflow-hidden">
        {/* Modal Header */}
        <div className="relative bg-[#1C1A17] text-[#FAF9F5] p-8 sm:p-10">
          <button
            onClick={close}
            className="absolute top-6 right-6 p-2 text-[#FAF9F5]/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 text-xs tracking-widest text-[#D4AF37] font-semibold uppercase mb-2">
            <span>{selectedJournal.volume}</span>
            <span>•</span>
            <span>{selectedJournal.issue}</span>
            <span>•</span>
            <span className="bg-[#2E2A24] px-2.5 py-0.5 rounded text-[11px] text-[#FAF9F5]">
              {selectedJournal.category}
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-normal leading-tight">
            {selectedJournal.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#D1C9BC] max-w-2xl mt-2 leading-relaxed">
            {selectedJournal.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-[#332F27] text-xs text-[#A39B8E]">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#D4AF37]" /> {selectedJournal.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {selectedJournal.readTime}
            </span>
            <span>{selectedJournal.date}</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-10 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Hero Photography & Abstract Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5 rounded overflow-hidden border border-[#E8E2D5] bg-[#EFECE4] shadow-sm">
              <img
                src={selectedJournal.image}
                alt={selectedJournal.title}
                referrerPolicy="no-referrer"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>

            <div className="md:col-span-7 space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#1C1A17] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#D4AF37]" /> Scientific Abstract
              </h3>
              <p className="text-xs sm:text-sm text-[#4A453C] leading-relaxed italic border-l-2 border-[#D4AF37] pl-4 py-1">
                "{selectedJournal.abstract}"
              </p>

              {selectedJournal.fullTechnique && (
                <div className="bg-[#F3EFE6] p-4 rounded border border-[#E8E2D5] space-y-2 mt-4 text-xs text-[#5C5549]">
                  <h4 className="font-bold uppercase tracking-wider text-[#1C1A17] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> The Physics & Chemistry
                  </h4>
                  <p className="leading-relaxed">{selectedJournal.fullTechnique.scientificBasis}</p>
                </div>
              )}
            </div>
          </div>

          {/* Scientific Ratios & Parameters (if available) */}
          {selectedJournal.fullTechnique && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#1C1A17] text-[#FAF9F5] p-6 rounded">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#A39B8E] flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#D4AF37]" /> Thermal Target
                </span>
                <div className="text-sm font-bold text-[#FAF9F5]">{selectedJournal.fullTechnique.temperature}</div>
              </div>
              <div className="space-y-1 sm:border-l sm:border-[#332F27] sm:pl-4">
                <span className="text-[11px] uppercase tracking-wider text-[#A39B8E] flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-[#D4AF37]" /> Hydration Ratio
                </span>
                <div className="text-sm font-bold text-[#FAF9F5]">{selectedJournal.fullTechnique.hydrationRatio}</div>
              </div>
              <div className="space-y-1 sm:border-l sm:border-[#332F27] sm:pl-4">
                <span className="text-[11px] uppercase tracking-wider text-[#A39B8E] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Resting Duration
                </span>
                <div className="text-sm font-bold text-[#FAF9F5]">{selectedJournal.fullTechnique.restingTime}</div>
              </div>
            </div>
          )}

          {/* Step by step methodology */}
          {selectedJournal.fullTechnique && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#1C1A17]">Masterclass Execution Protocol</h3>
              <div className="space-y-4">
                {selectedJournal.fullTechnique.steps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-4 sm:p-5 rounded bg-[#FAF9F5] border border-[#EAE4D7] space-y-2 hover:border-[#BDB5A4] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-[#1C1A17] text-[#FAF9F5] text-xs font-bold flex items-center justify-center shrink-0">
                        0{step.stepNumber}
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#1C1A17]">{step.title}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A453C] leading-relaxed pl-10">{step.description}</p>
                    {step.tip && (
                      <div className="ml-10 text-xs bg-[#F3EFE6] p-2.5 rounded border border-[#E8E2D5] text-[#5C5549] flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>
                          <strong>Artisan Note:</strong> {step.tip}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Equipment & Pairings */}
          {selectedJournal.fullTechnique && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#EAE4D7]">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#1C1A17] mb-3">
                  Recommended Utensils & Vessels
                </h4>
                <ul className="space-y-1.5 text-xs text-[#5C5549]">
                  {selectedJournal.fullTechnique.equipmentNeeded.map((eq, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2E7D32]" /> {eq}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#1C1A17] mb-3">
                  Ideal Gastronomic Pairings
                </h4>
                <ul className="space-y-1.5 text-xs text-[#5C5549]">
                  {selectedJournal.fullTechnique.pairings.map((p, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Footer Action */}
          <div className="pt-6 border-t border-[#EAE4D7] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={close}
              className="text-xs font-bold uppercase tracking-wider text-[#7A7264] hover:text-[#1C1A17]"
            >
              Close Reading Window
            </button>
            <button
              onClick={() => {
                setSelectedJournal(null);
                setActiveView('products');
              }}
              className="bg-[#1C1A17] hover:bg-[#33302B] text-[#FAF9F5] px-6 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              Shop Provisions For This Recipe <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
