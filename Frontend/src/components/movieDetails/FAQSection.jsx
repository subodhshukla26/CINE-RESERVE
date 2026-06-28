import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

/**
 * FAQSection — Expandable FAQ accordions.
 * Props:
 *  faqs - array of FAQ objects { question, answer }
 */
const FAQItem = ({ faq, isOpen, onToggle }) => {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-2.5 transition-all duration-300"
      style={{
        boxShadow: isOpen ? '0 4px 16px rgba(93,76,232,0.06)' : '0 2px 8px rgba(0,0,0,0.02)',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left focus:outline-none transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-2.5 mr-2">
          <HelpCircle size={16} className="text-[#5D4CE8] mt-0.5 flex-shrink-0" />
          <span className="text-[13px] font-bold text-gray-900 leading-snug">
            {faq.question}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-[#5D4CE8]' : 'rotate-0'
          }`}
        />
      </button>

      {/* Accordion Panel */}
      <div
        className={`transition-all duration-350 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[150px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-1 border-t border-gray-50/50">
          <p className="text-[12.5px] font-medium text-gray-500 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQSection = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="px-5 pb-6">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-1 h-5 rounded-full bg-[#5D4CE8]" />
        <h2 className="text-[17px] font-extrabold text-[#111827]">Frequently Asked Questions</h2>
      </div>

      {/* Accordion list */}
      <div>
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
