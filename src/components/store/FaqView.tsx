import React, { useState } from 'react';
import { FAQS } from '../../data/mockData';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

export const FaqView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  const filteredCategories = FAQS.map((cat) => {
    const matchingQuestions = cat.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(search.toLowerCase()) ||
        q.a.toLowerCase().includes(search.toLowerCase())
    );
    return {
      ...cat,
      questions: matchingQuestions
    };
  }).filter((cat) => cat.questions.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.24em] text-[#9F7A3E] font-medium block">
          Client Inquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#141413]">
          Frequently Addressed Queries
        </h1>
        <p className="text-xs sm:text-sm text-[#706A5F] max-w-lg mx-auto font-light leading-relaxed">
          Detailed guidance regarding our Italian leather tanneries, 24k hardware, white-glove global delivery, and complimentary personalization.
        </p>

        {/* Live Search input */}
        <div className="pt-4 max-w-md mx-auto relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search keywords (e.g. monogram, returns, leather care)..."
            className="w-full bg-white border border-[#D5CEBF] pl-10 pr-4 py-2.5 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
          />
          <Search className="w-4 h-4 text-[#8C8476] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Accordion Categories */}
      <div className="space-y-8">
        {filteredCategories.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#706A5F] bg-white border border-[#E8E4DA]">
            No answers matched your search terms. Please contact our Concierge for immediate assistance.
          </div>
        ) : (
          filteredCategories.map((cat, cIdx) => (
            <div key={cIdx} className="space-y-3">
              <h2 className="font-serif text-xl text-[#141413] border-b border-[#E8E4DA] pb-2">
                {cat.category}
              </h2>

              <div className="divide-y divide-[#E8E4DA] bg-white border border-[#E8E4DA]">
                {cat.questions.map((item, qIdx) => {
                  const id = `${cIdx}-${qIdx}`;
                  const isOpen = openItem === id;

                  return (
                    <div key={qIdx}>
                      <button
                        onClick={() => toggle(id)}
                        className="w-full py-4 px-6 flex items-center justify-between text-left hover:bg-[#FAF9F6] transition-colors"
                      >
                        <span className="font-serif text-base text-[#141413] pr-4">{item.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#9F7A3E] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#7A7468] shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 pt-1 text-xs text-[#524E46] leading-relaxed border-t border-[#F5F2EB] bg-[#FAF9F6]">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
