import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Droplets, Edit3, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

export function HydrateView() {
  const [currentWater, setCurrentWater] = useState(1750);
  const goal = 2500;
  const percentage = Math.min((currentWater / goal) * 100, 100);

  const addWater = (amount: number) => {
    setCurrentWater(prev => Math.min(prev + amount, 5000));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <header>
        <p className="text-secondary font-headline font-bold text-sm tracking-widest uppercase mb-2">DAILY HYDRATION</p>
        <div className="flex items-end gap-3">
          <h1 className="text-6xl font-extrabold font-headline leading-none tracking-tighter">{currentWater.toLocaleString()}</h1>
          <span className="text-xl font-bold text-on-surface-variant mb-1 font-headline">/ {goal.toLocaleString()} ML</span>
        </div>
        <p className="text-on-surface-variant mt-4 leading-relaxed max-w-xs">
          You've reached {Math.round(percentage)}% of your daily goal. Keep flowing.
        </p>
      </header>

      <div className="relative w-full aspect-[4/5] bg-surface-container-low rounded-xl mb-12 overflow-hidden flex items-center justify-center p-8">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div 
            className="w-full h-full" 
            style={{ 
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDbesXeFc1Gq3P78N_E3THhc6iscn2Mi17LFu2ug-MXWPOv_9xrTOYae3IY9z9VA4gKQVvn-nPozOabfkWD4Psp7oPtwtJ0WutprEq_KhvTwyj-XQXENJiZn9AuNbYNVUHrUiLa07VgdXZflJQY5RbJlLJV2idTIt3uy5GmuzhM9qY8XaMQXuCCqlP2BxdG_gNhdDBr0ZGJ3AmF_cWzIAjv7FqBewX5jtJEHFkb6Z2dWIEFiiPYLtxYTOGr7YRYivrWclJx1drkFd8')",
              backgroundSize: 'cover'
            }} 
          />
        </div>
        
        <div className="relative w-48 h-80 rounded-[4rem] border-4 border-white/10 glass-panel overflow-hidden shadow-2xl">
          <motion.div 
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-secondary-container to-secondary"
            initial={{ height: 0 }}
            animate={{ height: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="absolute top-0 left-0 w-full h-8 -translate-y-4 bg-white/20 blur-xl" />
          </motion.div>
          
          <div className="absolute inset-0 flex flex-col justify-between py-12 px-4 pointer-events-none">
            <div className="w-8 h-[2px] bg-white/10" />
            <div className="w-12 h-[2px] bg-white/20 flex items-center justify-end"><span className="text-[10px] text-white/30 mr-2">2000</span></div>
            <div className="w-8 h-[2px] bg-white/10" />
            <div className="w-12 h-[2px] bg-white/40 flex items-center justify-end"><span className="text-[10px] text-white/50 mr-2">1000</span></div>
            <div className="w-8 h-[2px] bg-white/10" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-extrabold text-white text-glow font-headline">{Math.round(percentage)}%</span>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => addWater(250)}
          className="col-span-2 group relative overflow-hidden bg-surface-container h-24 rounded-lg flex items-center justify-between px-8 hover:bg-surface-container-highest transition-all active:scale-95 duration-150"
        >
          <div className="flex flex-col items-start">
            <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-1">Standard Cup</span>
            <span className="text-2xl font-bold font-headline">250 ml</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-primary-fixed transition-colors">
            <Plus className="w-6 h-6" />
          </div>
        </button>
        <button 
          onClick={() => addWater(500)}
          className="bg-surface-container-low h-32 rounded-lg flex flex-col items-center justify-center gap-3 hover:bg-surface-container transition-all active:scale-95 duration-150"
        >
          <Droplets className="w-8 h-8 text-secondary" />
          <span className="text-lg font-bold font-headline">500 ml</span>
        </button>
        <button className="bg-surface-container-low h-32 rounded-lg flex flex-col items-center justify-center gap-3 hover:bg-surface-container transition-all active:scale-95 duration-150">
          <Edit3 className="w-8 h-8 text-primary" />
          <span className="text-lg font-bold font-headline">Custom</span>
        </button>
      </section>

      <section className="mt-12 mb-20">
        <h3 className="text-sm font-bold text-on-surface-variant tracking-widest uppercase mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                <Droplets className="w-5 h-5 text-secondary fill-current" />
              </div>
              <div>
                <p className="font-bold">Afternoon Refresh</p>
                <p className="text-xs text-on-surface-variant">2:45 PM</p>
              </div>
            </div>
            <span className="font-bold text-secondary">+500ml</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-surface-container rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
                <Droplets className="w-5 h-5 text-secondary fill-current" />
              </div>
              <div>
                <p className="font-bold">Post Workout</p>
                <p className="text-xs text-on-surface-variant">11:20 AM</p>
              </div>
            </div>
            <span className="font-bold text-secondary">+750ml</span>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
