import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Loader2, RefreshCcw, Briefcase } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { AnalysisResult } from './components/AnalysisResult';
import { evaluateBusinessProposal, BusinessEvaluation } from './services/geminiService';
import { Check, Zap, Shield, Users, Globe, Coffee } from 'lucide-react';
import { cn } from './lib/utils';

const EXAMPLES = [
  {
    title: "Eco-Friendly Packaging",
    icon: <Globe className="w-5 h-5" />,
    description: "A subscription service providing biodegradable packaging solutions for small e-commerce businesses to reduce plastic waste.",
    fullText: "A subscription-based service that provides 100% biodegradable and compostable packaging materials (boxes, mailers, tape) specifically designed for small to medium e-commerce businesses. The goal is to help small brands reduce their environmental footprint without the high costs of custom sustainable manufacturing. Revenue comes from monthly subscription tiers based on volume."
  },
  {
    title: "AI Personal Stylist",
    icon: <Zap className="w-5 h-5" />,
    description: "An app that uses computer vision to analyze your current wardrobe and suggest new outfits based on weather and occasion.",
    fullText: "A mobile application that uses advanced computer vision and AI to catalog a user's existing wardrobe from photos. It then generates daily outfit recommendations based on local weather forecasts, the user's calendar events (work, gym, date night), and current fashion trends. It monetizes through affiliate links to 'missing pieces' and a premium subscription for professional stylist consultations."
  },
  {
    title: "Local Farm-to-Table App",
    icon: <Coffee className="w-5 h-5" />,
    description: "Connecting urban residents directly with local farmers for same-day delivery of fresh produce and dairy products.",
    fullText: "A hyper-local marketplace app that connects urban dwellers directly with farmers within a 50-mile radius. Users can order fresh produce, dairy, and meat harvested that morning for same-day evening delivery. The platform handles logistics and quality control, taking a 15% commission on sales. It aims to provide farmers with better margins and consumers with fresher food."
  }
];

const PRICING_PLANS = [
  {
    name: "Starter",
    price: "Free",
    features: ["3 Evaluations per month", "Basic SWOT analysis", "Standard risk assessment", "Community support"],
    cta: "Start for Free",
    highlight: false
  },
  {
    name: "Professional",
    price: "$29",
    period: "/mo",
    features: ["Unlimited Evaluations", "Deep-dive SWOT analysis", "Advanced Strategic Roadmap", "Export to PDF/PPT", "Priority AI processing"],
    cta: "Go Pro",
    highlight: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Multi-user seats", "Custom AI training", "API Access", "Dedicated account manager", "SLA guarantees"],
    cta: "Contact Sales",
    highlight: false
  }
];

export default function App() {
  const [proposal, setProposal] = React.useState('');
  const [isEvaluating, setIsEvaluating] = React.useState(false);
  const [result, setResult] = React.useState<BusinessEvaluation | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposal.trim()) return;

    setIsEvaluating(true);
    setError(null);
    setResult(null);

    try {
      const evaluation = await evaluateBusinessProposal(proposal);
      setResult(evaluation);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const reset = () => {
    setProposal('');
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const useExample = (text: string) => {
    setProposal(text);
    document.getElementById('evaluator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero / Evaluator Section */}
        <section id="evaluator" className="max-w-4xl mx-auto w-full px-4 pt-12 pb-24">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="input-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8"
              >
                <div className="text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 text-brand-700 rounded-full text-sm font-semibold"
                  >
                    <Sparkles className="w-4 h-4" />
                    AI-Powered Business Intelligence
                  </motion.div>
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                    Validate Your Next <span className="text-brand-600">Big Idea</span>
                  </h1>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Paste your business proposal or idea below. Our AI will analyze the market fit, 
                    perform SWOT analysis, and provide strategic recommendations.
                  </p>
                </div>

                <form onSubmit={handleEvaluate} className="space-y-6">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-indigo-500 rounded-3xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-50 bg-slate-50/50">
                        <Briefcase className="w-5 h-5 text-slate-400" />
                        <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Business Description</span>
                      </div>
                      <textarea
                        value={proposal}
                        onChange={(e) => setProposal(e.target.value)}
                        placeholder="Describe your business idea, target audience, and revenue model..."
                        className="w-full h-64 p-6 text-lg text-slate-800 placeholder:text-slate-400 focus:outline-none resize-none"
                        disabled={isEvaluating}
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isEvaluating || !proposal.trim()}
                      className="group relative inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-95"
                    >
                      {isEvaluating ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Analyzing Proposal...
                        </>
                      ) : (
                        <>
                          Evaluate Proposal
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Quick Tips */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                  <TipCard 
                    title="Be Specific" 
                    desc="Include your target market and unique value proposition."
                  />
                  <TipCard 
                    title="Revenue Model" 
                    desc="Briefly explain how you plan to monetize the idea."
                  />
                  <TipCard 
                    title="Market Fit" 
                    desc="Mention any competitors or current market gaps you've identified."
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-slate-900">Analysis Report</h1>
                  <button 
                    onClick={reset}
                    className="flex items-center gap-2 text-slate-500 hover:text-brand-600 font-medium transition-colors"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    New Evaluation
                  </button>
                </div>
                <AnalysisResult data={result} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Examples Section */}
        <section id="examples" className="bg-slate-50 py-24 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Example Proposals</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Not sure where to start? Click on an example below to see how PropelAI evaluates different business models.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {EXAMPLES.map((ex, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col"
                >
                  <div className="bg-brand-50 w-12 h-12 rounded-2xl flex items-center justify-center text-brand-600 mb-6">
                    {ex.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{ex.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
                    {ex.description}
                  </p>
                  <button 
                    onClick={() => useExample(ex.fullText)}
                    className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Use Example
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Choose the plan that fits your needs. From solo entrepreneurs to large enterprises.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {PRICING_PLANS.map((plan, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "relative p-8 rounded-3xl border flex flex-col",
                    plan.highlight 
                      ? "border-brand-500 shadow-2xl shadow-brand-200 ring-4 ring-brand-50" 
                      : "border-slate-100 shadow-sm"
                  )}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                      {plan.period && <span className="text-slate-500 font-medium">{plan.period}</span>}
                    </div>
                  </div>
                  <ul className="space-y-4 mb-10 flex-1">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-600">
                        <Check className="w-5 h-5 text-brand-500 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button className={cn(
                    "w-full py-4 rounded-2xl font-bold transition-all",
                    plan.highlight
                      ? "bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-200"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  )}>
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-auto py-8 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} PropelAI. Powered by Gemini 3.
        </div>
      </footer>
    </div>
  );
}

const TipCard = ({ title, desc }: { title: string; desc: string }) => (
  <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-brand-200 transition-colors">
    <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);
