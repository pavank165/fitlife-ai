import React from 'react';
import { motion } from 'motion/react';
import { X, Clock, Flame, Zap, Play, ChevronLeft } from 'lucide-react';
import { Workout } from '../types';
import { cn } from '../lib/utils';

interface WorkoutDetailProps {
  workout: Workout;
  onClose: () => void;
  onStart: (workout: Workout) => void;
}

export function WorkoutDetailView({ workout, onClose, onStart }: WorkoutDetailProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[100] bg-background overflow-y-auto no-scrollbar"
    >
      <div className="relative h-80 w-full">
        <img 
          src={workout.image} 
          alt={workout.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 w-10 h-10 glass-panel rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 -mt-12 relative z-10 space-y-8 pb-32">
        <div className="space-y-4">
          <div className="flex gap-2">
            <span className="bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {workout.category}
            </span>
            {workout.tag && (
              <span className="bg-secondary/20 text-secondary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {workout.tag}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-extrabold font-headline tracking-tight leading-tight">
            {workout.title}
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            {workout.description}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col items-center gap-2 border border-white/5">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-xs font-bold text-on-surface-variant uppercase">Time</span>
            <span className="font-bold">{workout.duration}</span>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col items-center gap-2 border border-white/5">
            <Zap className="w-5 h-5 text-secondary" />
            <span className="text-xs font-bold text-on-surface-variant uppercase">Level</span>
            <span className="font-bold">{workout.intensity}</span>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col items-center gap-2 border border-white/5">
            <Flame className="w-5 h-5 text-tertiary-dim" />
            <span className="text-xs font-bold text-on-surface-variant uppercase">Burn</span>
            <span className="font-bold">~350 kcal</span>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold font-headline">Workout Breakdown</h3>
          <div className="space-y-4">
            {[
              { title: 'Warm-up', duration: '5 min', desc: 'Dynamic stretching and light cardio' },
              { title: 'Main Set', duration: '20 min', desc: 'High-intensity interval training' },
              { title: 'Cool-down', duration: '5 min', desc: 'Static stretching and breathing' },
            ].map((step, i) => (
              <div key={i} className="flex gap-4 p-4 bg-surface-container-low rounded-xl border border-white/5">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold">{step.title}</h4>
                    <span className="text-xs text-on-surface-variant">{step.duration}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full p-6 glass-panel border-t border-white/5 z-50">
        <button 
          onClick={() => onStart(workout)}
          className="w-full bg-primary text-on-primary-fixed h-16 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-[0_8px_32px_rgba(158,255,200,0.25)] active:scale-[0.98] transition-all"
        >
          <Play className="w-6 h-6 fill-current" />
          Start Workout
        </button>
      </div>
    </motion.div>
  );
}
