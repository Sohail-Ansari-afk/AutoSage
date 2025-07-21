import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { RobotIcon, SourceIcon, ImageIcon } from './icons';
import type { SearchResult } from '../App';

interface ResponseDisplayProps {
  query: string;
  response: SearchResult | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-700 rounded w-3/4 mb-8"></div>
        <div className="flex items-center gap-8 border-b border-slate-700">
            <div className="h-8 bg-slate-800 rounded-t-md w-24"></div>
            <div className="h-8 bg-slate-800 rounded-t-md w-24"></div>
        </div>
        <div className="space-y-3 pt-4">
            <div className="h-4 bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
        </div>
        <div className="space-y-3">
            <div className="h-4 bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        </div>
    </div>
);

type Tab = 'answer' | 'sources' | 'images';

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ query, response, isLoading, error }) => {
  const [activeTab, setActiveTab] = useState<Tab>('answer');

  if (isLoading) {
    return (
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">Thinking about: "{query}"</h2>
            <LoadingSkeleton />
        </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 text-red-300 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-2">An Error Occurred</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!response) {
    return null;
  }

  const tabs: { id: Tab; label: string; icon: React.FC<React.SVGProps<SVGSVGElement>>; count?: number; disabled: boolean }[] = [
    { id: 'answer', label: 'Answer', icon: RobotIcon, disabled: false },
    { id: 'sources', label: 'Sources', icon: SourceIcon, count: response.sources.length, disabled: response.sources.length === 0 },
    { id: 'images', label: 'Images', icon: ImageIcon, count: response.images.length, disabled: response.images.length === 0 },
  ];

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-800/50 rounded-lg border border-slate-700 transition-all duration-500"
    >
        <div className="p-6 md:p-8">
            <div className="border-b border-slate-700 mb-6">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => !tab.disabled && setActiveTab(tab.id)}
                            disabled={tab.disabled}
                            className={`${
                                tab.disabled ? 'cursor-not-allowed text-slate-600' : 'text-slate-300 hover:text-white'
                            } relative whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none`}
                        >
                            {activeTab === tab.id && (
                                <motion.div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-cyan-400" layoutId="underline" />
                            )}
                            <div className="flex items-center gap-2">
                                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-cyan-400' : ''} transition-colors duration-200`} />
                                <span>{tab.label}</span>
                                {tab.count !== undefined && !tab.disabled && (
                                    <span className="bg-slate-700 text-cyan-400 text-xs font-bold px-2 py-0.5 rounded-full">{tab.count}</span>
                                )}
                            </div>
                        </button>
                    ))}
                </nav>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'answer' && (
                        <article className="prose prose-lg max-w-none prose-invert w-full">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{response.text}</ReactMarkdown>
                        </article>
                    )}
                    {activeTab === 'sources' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {response.sources.map((source, index) => (
                               <a 
                                 key={index} 
                                 href={source.uri} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="block bg-slate-800 p-4 rounded-md border border-slate-700 hover:border-cyan-500 transition-colors duration-200 group"
                                >
                                   <p className="font-semibold text-white truncate group-hover:text-cyan-400 transition-colors duration-200">{source.title}</p>
                                   <p className="text-sm text-slate-400 truncate">{source.uri}</p>
                               </a>
                           ))}
                        </div>
                    )}
                    {activeTab === 'images' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {response.images.map((imgSrc, index) => (
                                <motion.div 
                                  key={index} 
                                  className="overflow-hidden rounded-lg border border-slate-700"
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <img 
                                        src={imgSrc} 
                                        alt={`Generated vehicle image ${index + 1}`} 
                                        className="w-full h-auto object-cover" 
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    </motion.div>
  );
};

export default ResponseDisplay;