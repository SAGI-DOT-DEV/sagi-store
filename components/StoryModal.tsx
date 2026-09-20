import { useModalAnimation } from '../hooks/useModalAnimation';
import React from 'react';
import { useCart } from '../context/CartContext';
import { X, MapPin, Sparkles, CheckCircle2, Globe, ArrowRight } from 'lucide-react';

export const StoryModal: React.FC = () => {
  const { isStoryOpen, setIsStoryOpen, setActiveView } = useCart();

  const { root, close } = useModalAnimation(isStoryOpen, () => setIsStoryOpen(false));
  if (!isStoryOpen) return null;

  const REGIONS = [
    {
      name: 'Ijebu Ode & Remo Basin (Ogun State)',
      crop: 'Ijebu Gold & White Garri',
      terroir: 'Ferruginous red clay & alluvial flats',
      detail: 'Extended 72-96 hour microbial fermentation generates high lactic acid and signature crisp dry roast in cast-iron troughs.'
    },
    {
      name: 'Ofada Lowlands & Ogun River Valley',
      crop: 'Heirloom Ofada Rice (Oryza Glaberrima)',
      terroir: 'Mineral-rich seasonal wetland floodplains',
      detail: 'Unpolished grains retaining deep bran stripes, harvested by hand with traditional parboiling and solar curing.'
    },
    {
      name: 'Okomu Forest Rainforest Belt (Edo State)',
      crop: 'Wild Grove Virgin Palm Oil',
      terroir: 'Deep equatorial rain forest canopy',
      detail: 'First cold hydraulic press of wild-harvested Elaeis guineensis fruit with intact beta-carotenes and low FFA values.'
    },
    {
      name: 'Oyo & Saki Highlands',
      crop: 'Artisanal White Yam Flour (Elubo)',
      terroir: 'Sun-drenched undulating savannah hills',
      detail: 'Traditional parboiling and solar drying on woven wicker beds that yields dark cocoa tones and elastic stretch.'
    },
    {
      name: 'Bida Basin (Niger State)',
      crop: 'Select Honey Cowpeas (Ewa Oloyin)',
      terroir: 'Sandy loam riverine banks',
      detail: 'High natural sucrose concentrations yielding rich caramel broth without artificial additives.'
    }
  ];

  return (
    <div ref={root} className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#000000]/75 backdrop-blur-sm transition-opacity"
        onClick={close}
      />

      <div data-modal-body className="relative mx-auto max-w-4xl bg-[#FFFFFF] border border-[#E4E4E4] shadow-2xl rounded-sm overflow-hidden">
        {/* Modal Header */}
        <div className="relative bg-[#000000] text-[#FFFFFF] p-8 sm:p-10">
          <button
            onClick={close}
            className="absolute top-6 right-6 p-2 text-[#FFFFFF]/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#737373] font-semibold">
            The Agricultural Heritage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal mt-2 leading-tight">
            The Modern Soul of Nigerian Staples
          </h2>
          <p className="text-xs sm:text-sm text-[#D4D4D4] max-w-2xl mt-3 leading-relaxed">
            SAGI was founded to elevate traditional West African staples into luxury gastronomy. By establishing single-estate partnerships, enforcing strict zero-debris optic sorting, and documenting scientific culinary techniques, we bridge centuries of ancestral craft with contemporary culinary excellence.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-10 max-h-[70vh] overflow-y-auto">
          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FFFFFF] p-5 rounded border border-[#E4E4E4] space-y-2">
              <span className="text-xs font-bold text-[#737373] tracking-widest uppercase">Pillar 01</span>
              <h4 className="font-serif text-lg font-bold text-[#000000]">Terroir & Provenance</h4>
              <p className="text-xs text-[#535353] leading-relaxed">
                Every grain, oil, and tuber is traceable to specific agro-ecological belts across Nigeria with authentic micro-climate conditions.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded border border-[#E4E4E4] space-y-2">
              <span className="text-xs font-bold text-[#737373] tracking-widest uppercase">Pillar 02</span>
              <h4 className="font-serif text-lg font-bold text-[#000000]">Zero-Debris Purity</h4>
              <p className="text-xs text-[#535353] leading-relaxed">
                Laser optic sorting and quadruple hand-clearing remove all foreign matter, pebbles, and chaff before packaging.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded border border-[#E4E4E4] space-y-2">
              <span className="text-xs font-bold text-[#737373] tracking-widest uppercase">Pillar 03</span>
              <h4 className="font-serif text-lg font-bold text-[#000000]">Culinary Science</h4>
              <p className="text-xs text-[#535353] leading-relaxed">
                We publish detailed gelatinization thermodynamics, hydration kinetics, and fermentation research in the Kitchen Journals.
              </p>
            </div>
          </div>

          {/* Regional Terroir Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#E4E4E4]">
              <h3 className="font-serif text-2xl font-bold text-[#000000] flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#737373]" /> The Nigerian Agricultural Belts
              </h3>
            </div>

            <div className="space-y-4">
              {REGIONS.map((r, i) => (
                <div
                  key={i}
                  className="p-4 rounded bg-[#FFFFFF] border border-[#E4E4E4] hover:border-[#A2A2A2] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <h4 className="font-serif text-base font-bold text-[#000000] flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#737373] shrink-0" /> {r.name}
                    </h4>
                    <span className="text-xs font-semibold text-[#727272]">{r.crop}</span>
                  </div>
                  <div className="text-[11px] font-medium text-[#737373] mb-1">{r.terroir}</div>
                  <p className="text-xs text-[#535353] leading-relaxed">{r.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="bg-[#000000] text-[#FFFFFF] p-6 rounded flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-lg font-bold">Experience the Collection</h4>
              <p className="text-xs text-[#D4D4D4]">Taste the purest harvest from Nigeria's historic estates.</p>
            </div>
            <button
              onClick={() => {
                setIsStoryOpen(false);
                setActiveView('products');
              }}
              className="bg-[#000000] hover:bg-[#272727] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2"
            >
              Shop The Staples <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
