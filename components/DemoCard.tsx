import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, ExternalLink } from 'lucide-react';
import { Demo } from '../types';

interface DemoCardProps {
  demo: Demo;
  isArabic: boolean;
}

const DemoCard: React.FC<DemoCardProps> = ({ demo, isArabic }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/20 border border-slate-100 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-2"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        <img
          src={demo.imageUrl}
          alt={demo.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Floating Category Badge (First Category) */}
        <div className={`absolute top-4 z-20 ${isArabic ? 'right-4' : 'left-4'}`}>
          <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-sas-blue text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
            {demo.categories[0]}
          </span>
        </div>

        {/* Hover Action Overlay */}
        <a 
            href={demo.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-sas-blue/30 backdrop-blur-[2px] cursor-pointer"
        >
          <div 
            className="bg-white text-sas-blue px-6 py-2.5 rounded-full font-bold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 hover:bg-sas-blue hover:text-white"
          >
            <PlayCircle className="w-5 h-5" />
            {isArabic ? 'بدء العرض' : 'Launch Demo'}
          </div>
        </a>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow text-start">
        <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
                {demo.featured && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide bg-amber-50 text-amber-600 border border-amber-100">
                      {isArabic ? 'مُميز' : 'Featured'}
                    </span>
                )}
            </div>
          <a href={demo.url} target="_blank" rel="noopener noreferrer" className="group/title block">
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover/title:text-sas-blue transition-colors line-clamp-1 flex items-center gap-2">
              {demo.title}
              <ExternalLink className="w-4 h-4 opacity-0 group-hover/title:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover/title:translate-x-0 text-sas-accent" />
            </h3>
          </a>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
            {demo.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {demo.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-md border border-slate-100"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className={`h-1.5 w-full bg-gradient-to-r from-sas-blue via-sas-accent to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out ${isArabic ? 'origin-right' : 'origin-left'}`} />
    </motion.div>
  );
};

export default DemoCard;