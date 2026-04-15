import React from 'react';
import { motion } from 'motion/react';
import { Activity, Droplets, Flame, Sun, ChevronRight, Play } from 'lucide-react';
import { UserStats, Workout } from '../types';
import { WORKOUTS } from '../constants';
import { cn } from '../lib/utils';

import { auth } from '../firebase';

interface HomeProps {
  stats: UserStats;
  onNavigate: (view: any) => void;
}

export function HomeView({ stats, onNavigate }: HomeProps) {
  const todayWorkout = WORKOUTS[4]; // Core & Agility Fusion equivalent
  const user = auth.currentUser;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <section className="space-y-1">
        <p className="text-on-surface-variant text-sm uppercase tracking-widest font-semibold">Monday, Oct 24</p>
        <h2 className="text-4xl font-extrabold font-headline tracking-tight">Hello, {user?.displayName?.split(' ')[0] || 'Alex'}!</h2>
        <p className="text-primary-container font-medium">You're 82% of the way to your daily goal.</p>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div 
          onClick={() => onNavigate('goals')}
          className="col-span-2 bg-surface-container-low rounded-lg p-6 flex items-center justify-between overflow-hidden relative cursor-pointer hover:bg-surface-container transition-colors"
        >
          <div className="space-y-4 z-10 w-full pr-4">
            <div className="space-y-1">
              <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">Steps</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold font-headline">{stats.steps.toLocaleString()}</span>
                <span className="text-on-surface-variant text-sm">/ {stats.stepGoal.toLocaleString()}</span>
              </div>
            </div>
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full shadow-[0_0_12px_rgba(158,255,200,0.5)]" 
                style={{ width: `${(stats.steps / stats.stepGoal) * 100}%` }}
              />
            </div>
          </div>
          <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full -rotate-90">
              <circle className="text-surface-container-highest" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8" />
              <circle 
                className="text-primary" 
                cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 * (1 - stats.steps / stats.stepGoal)}
                style={{ filter: 'drop-shadow(0 0 4px #9effc8)' }}
              />
            </svg>
            <Activity className="absolute w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="bg-surface-container-low rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-start">
            <Flame className="w-6 h-6 text-secondary" />
            <span className="text-secondary font-bold text-xs">75%</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-headline">{stats.calories.toLocaleString()}</h3>
            <p className="text-on-surface-variant text-xs font-bold uppercase">Calories</p>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-start">
            <Droplets className="w-6 h-6 text-tertiary-dim" />
            <span className="text-tertiary-dim font-bold text-xs">60%</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-headline">{stats.water}L</h3>
            <p className="text-on-surface-variant text-xs font-bold uppercase">Water</p>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low rounded-lg p-5 flex items-center gap-4 bg-gradient-to-br from-surface-container-low to-surface-container">
        <div className="w-16 h-16 flex items-center justify-center bg-surface-container-highest rounded-2xl">
          <Sun className="w-8 h-8 text-secondary" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-baseline">
            <h4 className="font-bold text-lg">72°F <span className="font-normal text-on-surface-variant text-sm">Clear Sky</span></h4>
          </div>
          <p className="text-sm text-on-surface-variant">Perfect weather for an outdoor run.</p>
        </div>
        <button className="bg-surface-container-highest p-2 rounded-full hover:opacity-80 transition-opacity">
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold font-headline">Today's Workout</h3>
          <button onClick={() => onNavigate('workouts')} className="text-primary text-sm font-semibold">See All</button>
        </div>
        <div className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[16/10]">
          <img 
            src={todayWorkout.image} 
            alt={todayWorkout.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
            <div className="flex gap-2 mb-2">
              <span className="bg-primary/20 backdrop-blur-md text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase">{todayWorkout.intensity} Intensity</span>
              <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">{todayWorkout.duration}</span>
            </div>
            <h4 className="text-2xl font-extrabold font-headline leading-tight">{todayWorkout.title}</h4>
            <p className="text-white/70 text-sm mt-1">{todayWorkout.description}</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        <button className="flex flex-col items-center gap-2 p-4 bg-surface-container-low rounded-lg hover:scale-95 transition-transform">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Play className="w-6 h-6 text-primary fill-current" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Start</span>
        </button>
        <button onClick={() => onNavigate('hydrate')} className="flex flex-col items-center gap-2 p-4 bg-surface-container-low rounded-lg hover:scale-95 transition-transform">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
            <Droplets className="w-6 h-6 text-secondary fill-current" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Log Water</span>
        </button>
        <button onClick={() => onNavigate('food-scanner')} className="flex flex-col items-center gap-2 p-4 bg-surface-container-low rounded-lg hover:scale-95 transition-transform">
          <div className="w-12 h-12 rounded-full bg-tertiary-dim/10 flex items-center justify-center">
            <Activity className="w-6 h-6 text-tertiary-dim" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Scan Food</span>
        </button>
      </section>
    </motion.div>
  );
}
