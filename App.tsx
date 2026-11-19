import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { demos, tags } from 'virtual:demos';
import DemoCard from './components/DemoCard';
import { SAS_LOGO_URL } from './constants';

const ALL = 'All';

// The navigation is built from the Tags column of demos.xlsx.
const CATEGORIES = [ALL, ...tags];

function App() {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter Logic
  const filteredDemos = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return demos.filter((demo) => {
      const matchesCategory = activeCategory === ALL || demo.tags.includes(activeCategory);
      const matchesSearch =
        demo.title.toLowerCase().includes(term) ||
        demo.description.toLowerCase().includes(term) ||
        demo.tags.some(tag => tag.toLowerCase().includes(term)) ||
        demo.keywords.some(keyword => keyword.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">

      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-sas-light to-transparent -z-10" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -mr-40 -mt-40 -z-10" />
      <div className="fixed top-40 left-0 w-[300px] h-[300px] bg-cyan-100/30 rounded-full blur-3xl -ml-20 -z-10" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* HEADER ROW: LOGO */}
        <div className="flex justify-between items-center mb-6">
          <motion.img
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            src={SAS_LOGO_URL}
            alt="SAS"
            className="h-10 w-auto"
          />
        </div>

        {/* HERO TITLE SECTION */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-sas-dark tracking-tight mb-3"
          >
            META AI Demo Center
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl leading-relaxed"
          >
            A Centralized Portfolio of Industry-Ready AI Demos
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
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400 group-focus-within:text-sas-blue transition-colors duration-300" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full py-4 pl-14 pr-6 bg-white border-0 text-slate-900 placeholder-slate-400 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:shadow-[0_8px_30px_rgb(0,76,144,0.12)] focus:ring-2 focus:ring-sas-blue/10 transition-all duration-300 text-lg"
              placeholder="Search for demos, keywords, or technologies..."
            />
            {searchTerm && (
               <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-4 text-slate-400 hover:text-slate-600 font-medium text-sm"
               >
                 Clear
               </button>
            )}
          </motion.div>
        </div>

        {/* CATEGORY FILTERS (one button per tag found in demos.xlsx) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${
                activeCategory === category
                  ? 'bg-sas-blue text-white shadow-lg shadow-sas-blue/30 ring-2 ring-offset-2 ring-sas-blue'
                  : 'bg-white text-slate-600 hover:bg-white hover:text-sas-blue shadow-sm border border-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* GRID SECTION */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sas-accent" />
              {activeCategory === ALL ? 'Featured Demos' : activeCategory}
            </h2>
            <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
              {filteredDemos.length} results
            </span>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredDemos.map((demo) => (
                <DemoCard key={demo.id} demo={demo} />
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
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No matches found</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                We couldn't find any demos matching your search. Try adjusting your filters.
              </p>
            </motion.div>
          )}
        </div>

      </main>
    </div>
  );
}

export default App;
