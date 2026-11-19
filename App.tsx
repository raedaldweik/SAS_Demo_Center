import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Sparkles, Globe } from 'lucide-react';
import DemoCard from './components/DemoCard';
import { DEMO_DATA, SAS_LOGO_URL } from './constants';
import { DemoCategory } from './types';

// Translation Dictionary
const TRANSLATIONS = {
  en: {
    title: "META AI Demo Center",
    subtitle: "A Centralized Portfolio of Industry-Ready AI Demos",
    searchPlaceholder: "Search for demos, keywords, or technologies...",
    featured: "Featured Demos",
    results: "results",
    noMatches: "No matches found",
    noMatchesDesc: "We couldn't find any demos matching your search. Try adjusting your filters.",
    clear: "Clear",
    categories: {
      [DemoCategory.ALL]: "All",
      [DemoCategory.VISUAL_ANALYTICS]: "Visual Analytics",
      [DemoCategory.VISUAL_INVESTIGATOR]: "Visual Investigator",
      [DemoCategory.INTELLIGENT_DECISIONING]: "Intelligent Decisioning",
      [DemoCategory.MODEL_STUDIO]: "Model Studio",
      [DemoCategory.OCR]: "OCR",
      [DemoCategory.OPTIMIZATION]: "Optimization",
      [DemoCategory.GENERATIVE_AI]: "Generative AI",
    }
  },
  ar: {
    title: "مركز عروض META AI",
    subtitle: "محفظة مركزية لعروض الذكاء الاصطناعي الجاهزة للصناعة",
    searchPlaceholder: "ابحث عن العروض التوضيحية، أو الكلمات الرئيسية، أو التقنيات...",
    featured: "العروض المميزة",
    results: "نتائج",
    noMatches: "لم يتم العثور على نتائج",
    noMatchesDesc: "لم نتمكن من العثور على أي عروض مطابقة لبحثك. حاول تعديل الفلاتر.",
    clear: "مسح",
    categories: {
      [DemoCategory.ALL]: "الكل",
      [DemoCategory.VISUAL_ANALYTICS]: "التحليلات المرئية",
      [DemoCategory.VISUAL_INVESTIGATOR]: "التحقيق المرئي",
      [DemoCategory.INTELLIGENT_DECISIONING]: "اتخاذ القرارات الذكي",
      [DemoCategory.MODEL_STUDIO]: "استوديو النماذج",
      [DemoCategory.OCR]: "التعرف الضوئي على الحروف",
      [DemoCategory.OPTIMIZATION]: "التحسين",
      [DemoCategory.GENERATIVE_AI]: "الذكاء الاصطناعي التوليدي",
    }
  }
};

function App() {
  const [activeCategory, setActiveCategory] = useState<DemoCategory>(DemoCategory.ALL);
  const [searchTerm, setSearchTerm] = useState('');
  const [isArabic, setIsArabic] = useState(false);

  const t = isArabic ? TRANSLATIONS.ar : TRANSLATIONS.en;

  // Filter Logic
  const filteredDemos = useMemo(() => {
    return DEMO_DATA.filter((demo) => {
      const matchesCategory = activeCategory === DemoCategory.ALL || demo.categories.includes(activeCategory);
      const matchesSearch = 
        demo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        demo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div 
      className={`min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 ${isArabic ? 'font-[sans-serif]' : ''}`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-sas-light to-transparent -z-10" />
      <div className={`fixed top-0 ${isArabic ? 'left-0' : 'right-0'} w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -mr-40 -mt-40 -z-10`} />
      <div className={`fixed top-40 ${isArabic ? 'right-0' : 'left-0'} w-[300px] h-[300px] bg-cyan-100/30 rounded-full blur-3xl -ml-20 -z-10`} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* HEADER ROW: LOGO & LANG TOGGLE */}
        <div className="flex justify-between items-center mb-6">
          <motion.img 
            initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            src={SAS_LOGO_URL} 
            alt="SAS" 
            className="h-10 w-auto" 
          />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsArabic(!isArabic)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200 text-slate-600 hover:text-sas-blue hover:border-sas-blue/30 transition-all duration-300"
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium">{isArabic ? 'English' : 'Arabic'}</span>
          </motion.button>
        </div>
        
        {/* HERO TITLE SECTION */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-sas-dark tracking-tight mb-3"
          >
            {t.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl leading-relaxed"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* SEARCH SECTION */}
        <div className="relative z-10 max-w-2xl mx-auto mb-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <div className={`absolute inset-y-0 ${isArabic ? 'right-0 pr-5' : 'left-0 pl-5'} flex items-center pointer-events-none`}>
              <Search className="h-6 w-6 text-slate-400 group-focus-within:text-sas-blue transition-colors duration-300" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`block w-full py-4 bg-white border-0 text-slate-900 placeholder-slate-400 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:shadow-[0_8px_30px_rgb(0,76,144,0.12)] focus:ring-2 focus:ring-sas-blue/10 transition-all duration-300 text-lg ${isArabic ? 'pr-14 pl-6' : 'pl-14 pr-6'}`}
              placeholder={t.searchPlaceholder}
            />
            {searchTerm && (
               <button 
                onClick={() => setSearchTerm('')}
                className={`absolute inset-y-0 ${isArabic ? 'left-4' : 'right-4'} text-slate-400 hover:text-slate-600 font-medium text-sm`}
               >
                 {t.clear}
               </button>
            )}
          </motion.div>
        </div>

        {/* CATEGORY FILTERS */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {Object.values(DemoCategory).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${
                activeCategory === category
                  ? 'bg-sas-blue text-white shadow-lg shadow-sas-blue/30 ring-2 ring-offset-2 ring-sas-blue'
                  : 'bg-white text-slate-600 hover:bg-white hover:text-sas-blue shadow-sm border border-slate-200'
              }`}
            >
              {t.categories[category]}
            </button>
          ))}
        </motion.div>

        {/* GRID SECTION */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sas-accent" />
              {activeCategory === 'All' ? t.featured : t.categories[activeCategory]}
            </h2>
            <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
              {filteredDemos.length} {t.results}
            </span>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredDemos.map((demo) => (
                <DemoCard key={demo.id} demo={demo} isArabic={isArabic} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredDemos.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                <SlidersHorizontal className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{t.noMatches}</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                {t.noMatchesDesc}
              </p>
            </motion.div>
          )}
        </div>

      </main>
    </div>
  );
}

export default App;