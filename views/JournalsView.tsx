import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { JOURNAL_ARTICLES } from '../data/journals';
import { BookOpen, Sparkles, ArrowRight, CheckCircle2, User, Clock, ShieldCheck, Bookmark } from 'lucide-react';

export const JournalsView: React.FC = () => {
  const { setSelectedJournal, navigateToProduct } = useCart();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [circleEmail, setCircleEmail] = useState('');
  const [circleSubscribed, setCircleSubscribed] = useState(false);

  const filterTabs = ['All', 'Technique', 'Tubers', 'Grains', 'Oils', 'Fermentation'];

  const filteredArticles = useMemo(() => {
    if (selectedFilter === 'All') return JOURNAL_ARTICLES;
    return JOURNAL_ARTICLES.filter((a) => a.category === selectedFilter);
  }, [selectedFilter]);

  const featured = JOURNAL_ARTICLES.filter((a) => a.featured);
  const archive = JOURNAL_ARTICLES.filter((a) => !a.featured);

  const handleCircleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (circleEmail.trim()) {
      setCircleSubscribed(true);
      setCircleEmail('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Research & Gastronomy</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1A17] tracking-tight leading-tight">
          The Kitchen Journals & Masterclasses
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6457] leading-relaxed">
          Quantitative gastronomy and scientific inquiry into West African culinary mechanics, thermal transitions, hydration thermodynamics, and ancestral ferments.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8E2D5] scrollbar-none">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedFilter(tab)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              selectedFilter === tab
                ? 'bg-[#1C1A17] text-[#FAF9F5]'
                : 'bg-[#EFECE4] text-[#5C5549] hover:bg-[#E5DFC9] hover:text-[#1C1A17]'
            }`}
          >
            {tab === 'All' ? 'All Publications' : tab}
          </button>
        ))}
      </div>

      {/* Volume IV Featured Masterclasses */}
      <div className="space-y-8">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
          <h2 className="font-serif text-2xl font-bold text-[#1C1A17] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#D4AF37]" /> Volume IV: Structural Mechanics (2025/2026)
          </h2>
          <span className="text-xs text-[#8C8475] font-semibold uppercase tracking-wider">
            Current Edition
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featured.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAF9F5] border border-[#E8E2D5] rounded-sm overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-72 sm:h-80 bg-[#EFECE4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[#1C1A17] text-[#FAF9F5] text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow">
                    {item.volume} • {item.issue}
                  </span>
                  <span className="bg-[#D4AF37] text-[#141311] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 shadow">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs text-[#8C8475]">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#D4AF37]" /> {item.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {item.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#1C1A17] group-hover:text-[#5C5549] leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#6B6457] font-medium leading-relaxed">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-[#7A7264] line-clamp-3 leading-relaxed pt-1">
                    {item.abstract}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#EAE4D7] flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedJournal(item)}
                    className="bg-[#1C1A17] hover:bg-[#33302B] text-[#FAF9F5] px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                  >
                    <span>Read Full Abstract</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </button>

                  <button
                    onClick={() => navigateToProduct(item.id.includes('garri') ? 'ijebu-gold-garri' : 'artisanal-yam-flour')}
                    className="text-xs font-bold uppercase tracking-wider text-[#1C1A17] hover:text-[#5C5549] underline underline-offset-4"
                  >
                    Order Ingredient Kit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Archive Grid */}
      <div className="space-y-8 pt-8 border-t border-[#E8E2D5]">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
          <h2 className="font-serif text-2xl font-bold text-[#1C1A17]">
            Archive Studies & Technical Papers
          </h2>
          <span className="text-xs text-[#8C8475]">Volumes I - III</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archive.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedJournal(art)}
              className="bg-[#FAF9F5] border border-[#E8E2D5] rounded-sm p-6 flex flex-col justify-between space-y-4 hover:border-[#BDB5A4] hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] text-[#8C8475] uppercase font-bold tracking-wider">
                  <span className="text-[#D4AF37]">{art.volume} • {art.issue}</span>
                  <span>{art.category}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1A17] group-hover:text-[#5C5549] leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-[#7A7264] line-clamp-3 leading-relaxed">
                  {art.abstract}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE4D7] flex items-center justify-between text-xs text-[#1C1A17] font-semibold">
                <span className="flex items-center gap-1 text-[#8C8475]">
                  <Clock className="w-3.5 h-3.5" /> {art.readTime}
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Study <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </span>
              </div>
            </div>
          ))}

          {/* Anthology Reservation Bento Box */}
          <div className="bg-[#1C1A17] text-[#FAF9F5] p-6 rounded-sm flex flex-col justify-between space-y-4 border border-[#332F27]">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D4AF37]">
                Collector's Edition
              </span>
              <h3 className="font-serif text-xl font-normal text-[#FAF9F5] leading-snug">
                The Complete Anthology: Hardcover Volumes I–IV
              </h3>
              <p className="text-xs text-[#9E978A] leading-relaxed">
                A 320-page clothbound compendium featuring full electron-microscopy starch scans, archival recipes, and regional terroir maps.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setCircleSubscribed(true);
                }}
                className="w-full bg-[#D4AF37] hover:bg-[#C29D2C] text-[#141311] py-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Reserve Anthology CAD 45,000.00</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Callout */}
      <div className="bg-[#F3EFE6] border border-[#E8E2D5] p-8 sm:p-12 rounded-sm max-w-4xl mx-auto text-center space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#D4AF37]">
            The SAGI Culinary Institute
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1A17]">
            Join the Masterclass Research Circle
          </h3>
          <p className="text-xs sm:text-sm text-[#6B6457] max-w-xl mx-auto leading-relaxed">
            Get peer-reviewed culinary techniques, starch hydration charts, and private lab tasting invitations delivered straight to your inbox monthly.
          </p>
        </div>

        {circleSubscribed ? (
          <div className="bg-[#FAF9F5] border border-[#D9D2C5] p-4 rounded text-xs text-[#2E7D32] max-w-md mx-auto flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>You have joined the SAGI Culinary Research Circle.</span>
          </div>
        ) : (
          <form onSubmit={handleCircleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={circleEmail}
              onChange={(e) => setCircleEmail(e.target.value)}
              placeholder="Enter your academic or culinary email"
              className="bg-[#FAF9F5] border border-[#D9D2C5] text-xs px-4 py-3.5 flex-1 focus:outline-none focus:border-[#1C1A17]"
            />
            <button
              type="submit"
              className="bg-[#1C1A17] hover:bg-[#33302B] text-[#FAF9F5] text-xs font-bold uppercase tracking-wider px-6 py-3.5 whitespace-nowrap transition-colors"
            >
              Join Circle
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
