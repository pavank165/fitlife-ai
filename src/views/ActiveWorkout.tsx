import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Pause, Play, Check, Flame, Clock, Heart } from 'lucide-react';
import { Workout } from '../types';
import { cn } from '../lib/utils';

interface ActiveWorkoutProps {
  workout: Workout;
  onComplete: (durationSeconds: number) => void;
  onCancel: () => void;
}

export function ActiveWorkoutView({ workout, onComplete, onCancel }: ActiveWorkoutProps) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const caloriesBurned = Math.floor((seconds / 60) * (workout.intensity === 'High' ? 12 : workout.intensity === 'Medium' ? 8 : 5));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-background flex flex-col"
    >
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Active Session</span>
        </div>
        <button 
          onClick={() => setShowConfirmCancel(true)}
          className="w-10 h-10 glass-panel rounded-full flex items-center justify-center text-on-surface-variant hover:text-error transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-on-surface-variant font-bold uppercase tracking-widest text-sm">{workout.title}</h2>
          <div className="text-8xl font-black font-headline tracking-tighter tabular-nums">
            {formatTime(seconds)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 w-full max-w-xs">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <Flame className="w-6 h-6 text-secondary" />
            </div>
            <span className="text-2xl font-bold">{caloriesBurned}</span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Calories</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-bold">{75 + Math.floor(Math.random() * 20)}</span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">BPM</span>
          </div>
        </div>

        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle className="text-surface-container-highest" cx="128" cy="128" fill="transparent" r="120" stroke="currentColor" strokeWidth="4" />
            <motion.circle 
              className="text-primary" 
              cx="128" cy="128" fill="transparent" r="120" stroke="currentColor" strokeWidth="8" 
              strokeDasharray="753.6" 
              strokeDashoffset={753.6 * (1 - (seconds % 60) / 60)}
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 8px #9effc8)' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border border-white/5 flex items-center justify-center">
               <div className="w-32 h-32 rounded-full bg-primary/5 flex items-center justify-center">
                  <Clock className="w-12 h-12 text-primary/40" />
               </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-12 flex items-center justify-center gap-8">
        <button 
          onClick={() => setIsActive(!isActive)}
          className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center transition-all active:scale-90",
            isActive ? "bg-surface-container text-on-surface" : "bg-primary text-on-primary-fixed"
          )}
        >
          {isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
        </button>

        <button 
          onClick={() => onComplete(seconds)}
          className="w-20 h-20 bg-primary text-on-primary-fixed rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(158,255,200,0.25)] active:scale-90 transition-all"
        >
          <Check className="w-8 h-8" />
        </button>
      </footer>

      <AnimatePresence>
        {showConfirmCancel && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-surface-container-low p-8 rounded-3xl max-w-sm w-full space-y-6 border border-white/5"
            >
              <div className="space-y-2 text-center">
                <h3 className="text-2xl font-bold font-headline">End Workout?</h3>
                <p className="text-on-surface-variant">Your progress for this session will not be saved.</p>
              </div>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={onCancel}
                  className="w-full bg-error text-white h-14 rounded-xl font-bold"
                >
                  End Session
                </button>
                <button 
                  onClick={() => setShowConfirmCancel(false)}
                  className="w-full bg-surface-container-highest text-on-surface h-14 rounded-xl font-bold"
                >
                  Keep Going
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
