import React from 'react';
import { motion } from 'motion/react';
import { Footprints, Dumbbell, Target, Award, Lock, Flag, ChevronRight, Flame } from 'lucide-react';
import { UserStats } from '../types';
import { cn } from '../lib/utils';

interface GoalsProps {
  stats: UserStats;
}

import { auth } from '../firebase';

export function GoalsView({ stats }: GoalsProps) {
  const user = auth.currentUser;
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const stepData = [60, 85, 95, 70, 55, 40, 80];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 pb-10"
    >
      <section className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">{user?.displayName?.split(' ')[0] || 'Your'} Goals</h1>
        <p className="text-on-surface-variant text-sm font-medium tracking-wide uppercase">THE KINETIC SANCTUARY • Q3 PROGRESS</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-surface-container-low rounded-lg p-8 relative overflow-hidden flex flex-col justify-between min-h-[280px]">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Footprints className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-5 h-5 text-secondary" />
              <span className="text-on-surface-variant text-sm uppercase font-semibold">Step Objective</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-extrabold leading-none">{stats.steps.toLocaleString()}</span>
              <span className="text-on-surface-variant text-xl font-bold">/ {stats.stepGoal.toLocaleString()}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden">
              <div 
                className="h-full bg-secondary rounded-full shadow-[0_0_12px_rgba(0,210,255,0.4)]" 
                style={{ width: `${(stats.steps / stats.stepGoal) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-end">
              <p className="text-on-surface-variant text-sm max-w-[200px]">
                You're <span className="text-secondary font-bold">{(stats.stepGoal - stats.steps).toLocaleString()} steps</span> away from your kinetic peak today.
              </p>
              <button className="text-xs font-bold bg-secondary/10 text-secondary px-4 py-2 rounded-full hover:bg-secondary/20 transition-all">ADJUST GOAL</button>
            </div>
          </div>
        </div>

        <div className="bg-surface-container rounded-lg p-8 flex flex-col justify-between border border-white/5">
          <div>
            <span className="text-on-surface-variant text-xs uppercase font-bold tracking-widest block mb-4">Target Weight</span>
            <div className="text-5xl font-extrabold text-primary leading-none mb-2">{stats.weight}</div>
            <span className="text-on-surface-variant font-bold">kg</span>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-on-surface-variant uppercase font-medium">Starting</span>
              <span className="text-xs text-on-surface-variant font-bold">82.0 kg</span>
            </div>
            <div className="h-1 bg-surface-container-highest w-full rounded-full relative">
              <div className="absolute left-0 top-0 h-full bg-primary w-[70%]" />
              <div className="absolute left-[70%] top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_8px_#9effc8]" />
            </div>
            <p className="mt-4 text-[10px] text-on-surface-variant italic">Steady progress: -0.5kg this week</p>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-lg p-8 flex flex-col justify-between border border-white/5">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-on-surface-variant text-xs uppercase font-bold tracking-widest block mb-1">Calories</span>
              <div className="text-4xl font-extrabold leading-none">{stats.calories.toLocaleString()}</div>
              <span className="text-on-surface-variant text-xs font-medium">of {stats.calorieGoal.toLocaleString()} kcal</span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-surface-container-highest flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle className="text-primary/20" cx="24" cy="24" fill="none" r="20" stroke="currentColor" strokeWidth="4" />
                <circle 
                  className="text-primary" cx="24" cy="24" fill="none" r="20" stroke="currentColor" 
                  strokeDasharray="125.6" 
                  strokeDashoffset={125.6 * (1 - stats.calories / stats.calorieGoal)} 
                  strokeWidth="4" 
                />
              </svg>
              <span className="text-[10px] font-bold">{Math.round((stats.calories / stats.calorieGoal) * 100)}%</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-6">
            {['P', 'C', 'F'].map((m, i) => (
              <div key={m} className="bg-surface-container-highest rounded-xl p-3 text-center">
                <div className="text-[10px] text-on-surface-variant uppercase mb-1">{m}</div>
                <div className="text-xs font-bold">{[142, 210, 52][i]}g</div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 bg-surface-container rounded-lg p-8 border border-white/5">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold">Weekly Trends</h3>
              <p className="text-on-surface-variant text-xs">Averaging 9,120 steps / day</p>
            </div>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-on-surface-variant px-2 py-1 rounded bg-surface-container-highest uppercase">Steps</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-on-surface-variant/40 px-2 py-1 uppercase">Cals</span>
            </div>
          </div>
          <div className="h-40 flex items-end justify-between gap-2 px-2">
            {days.map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-2 w-full group">
                <div 
                  className={cn(
                    "w-full rounded-t-lg relative transition-all",
                    i === 2 ? "bg-secondary/40 group-hover:bg-secondary/50" : "bg-secondary/10 group-hover:bg-secondary/20"
                  )} 
                  style={{ height: `${stepData[i]}%` }}
                >
                  {i === 2 && (
                    <>
                      <div className="absolute inset-0 bg-secondary/20 blur-sm" />
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-secondary text-on-primary-fixed text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">12.4k</div>
                    </>
                  )}
                </div>
                <span className={cn("text-[10px] font-bold", i === 2 ? "text-on-surface" : "text-on-surface-variant")}>{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex justify-between items-baseline">
          <h2 className="text-2xl font-bold tracking-tight">Kinetic Milestones</h2>
          <button className="text-primary text-xs font-bold uppercase tracking-widest">View All</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Award, title: '30-Day Streak', desc: 'Movement every day for a month', color: 'text-primary', bg: 'bg-primary/10' },
            { icon: Flame, title: 'Calorie Crusher', desc: 'Burned 50k kcal in total', color: 'text-secondary', bg: 'bg-secondary/10' },
            { icon: Lock, title: 'Century Club', desc: 'Complete 100 workouts', color: 'text-on-surface-variant', bg: 'bg-surface-container-highest', locked: true },
            { icon: Flag, title: 'Peak Performer', desc: 'Reached 15% body fat goal', color: 'text-tertiary-dim', bg: 'bg-tertiary-dim/10' },
          ].map((m) => (
            <div key={m.title} className={cn(
              "bg-surface-container-low rounded-xl p-6 flex flex-col items-center text-center space-y-4 group cursor-pointer hover:bg-surface-container transition-colors",
              m.locked && "opacity-50 grayscale cursor-not-allowed"
            )}>
              <div className={cn("w-20 h-20 rounded-full flex items-center justify-center relative", m.bg)}>
                {!m.locked && <div className="absolute inset-0 rounded-full border border-white/5 scale-110 group-hover:scale-125 transition-transform" />}
                <m.icon className={cn("w-10 h-10", m.color)} />
              </div>
              <div>
                <h4 className="text-sm font-bold">{m.title}</h4>
                <p className="text-[10px] text-on-surface-variant mt-1">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl p-1 overflow-hidden">
        <div className="bg-surface rounded-[calc(1.5rem-4px)] p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold">Evolve your limits.</h3>
            <p className="text-on-surface-variant text-sm mt-1">AI-driven adjustment based on your last 7 days of activity.</p>
          </div>
          <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed px-8 py-4 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(31,251,165,0.2)]">
            OPTIMIZE MY GOALS
          </button>
        </div>
      </section>
    </motion.div>
  );
}
