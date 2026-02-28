import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, Lightbulb, Target, TrendingUp, ShieldAlert } from 'lucide-react';
import Markdown from 'react-markdown';
import { BusinessEvaluation } from '../services/geminiService';
import { cn } from '../lib/utils';

interface AnalysisResultProps {
  data: BusinessEvaluation;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ data }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      {/* Summary Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Executive Summary</h2>
            <p className="text-slate-600 leading-relaxed">{data.summary}</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-brand-50 rounded-2xl p-6 min-w-[140px]">
            <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-1">Score</span>
            <span className="text-5xl font-bold text-brand-700">{data.overallScore}</span>
            <span className="text-xs text-brand-500 mt-1">out of 100</span>
          </div>
        </div>
      </div>

      {/* SWOT Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SWOTCard 
          title="Strengths" 
          items={data.swot.strengths} 
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
          color="emerald"
        />
        <SWOTCard 
          title="Weaknesses" 
          items={data.swot.weaknesses} 
          icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
          color="amber"
        />
        <SWOTCard 
          title="Opportunities" 
          items={data.swot.opportunities} 
          icon={<Lightbulb className="w-5 h-5 text-blue-600" />}
          color="blue"
        />
        <SWOTCard 
          title="Threats" 
          items={data.swot.threats} 
          icon={<ShieldAlert className="w-5 h-5 text-rose-600" />}
          color="rose"
        />
      </div>

      {/* Risk Assessment */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-rose-100 p-2 rounded-lg">
            <ShieldAlert className="w-6 h-6 text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Risk Assessment</h2>
        </div>
        <div className="markdown-body text-slate-700">
          <Markdown>{data.riskAssessment}</Markdown>
        </div>
      </div>

      {/* Strategic Suggestions */}
      <div className="bg-slate-900 rounded-3xl p-8 shadow-xl text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-brand-500 p-2 rounded-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Strategic Roadmap</h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {data.strategicSuggestions.map((suggestion, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-4 bg-white/10 p-4 rounded-2xl border border-white/5"
            >
              <div className="mt-1">
                <CheckCircle2 className="w-5 h-5 text-brand-400" />
              </div>
              <p className="text-slate-200">{suggestion}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface SWOTCardProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  color: 'emerald' | 'amber' | 'blue' | 'rose';
}

const SWOTCard: React.FC<SWOTCardProps> = ({ title, items, icon, color }) => {
  const colorMap = {
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-900',
    amber: 'bg-amber-50 border-amber-100 text-amber-900',
    blue: 'bg-blue-50 border-blue-100 text-blue-900',
    rose: 'bg-rose-50 border-rose-100 text-rose-900',
  };

  return (
    <div className={cn("rounded-3xl p-6 border shadow-sm", colorMap[color])}>
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm opacity-90">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
