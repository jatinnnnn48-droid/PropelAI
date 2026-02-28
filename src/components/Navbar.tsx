import React from 'react';
import { Rocket, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              initial={{ rotate: -20, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="bg-brand-500 p-2 rounded-lg">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">PropelAI</span>
            </motion.div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('evaluator')} className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Evaluator</button>
            <button onClick={() => scrollToSection('examples')} className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Examples</button>
            <button onClick={() => scrollToSection('pricing')} className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Pricing</button>
            <button 
              onClick={() => scrollToSection('evaluator')}
              className="bg-slate-900 text-white px-5 py-2 rounded-full font-medium hover:bg-slate-800 transition-all shadow-sm"
            >
              Get Started
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-4 overflow-hidden"
          >
            <button onClick={() => scrollToSection('evaluator')} className="block w-full text-left text-slate-600 font-medium py-2">Evaluator</button>
            <button onClick={() => scrollToSection('examples')} className="block w-full text-left text-slate-600 font-medium py-2">Examples</button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left text-slate-600 font-medium py-2">Pricing</button>
            <button 
              onClick={() => scrollToSection('evaluator')}
              className="w-full bg-slate-900 text-white px-5 py-3 rounded-xl font-medium"
            >
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
