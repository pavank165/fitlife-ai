import React from 'react';
import { motion } from 'motion/react';
import { Dumbbell, Flame, Activity, Bell, Lock, Share2, HelpCircle, LogOut, ChevronRight, Watch } from 'lucide-react';
import { UserStats, CompletedWorkout, View } from '../types';
import { cn } from '../lib/utils';

import { auth } from '../firebase';

interface ProfileProps {
  stats: UserStats;
  completedWorkouts: CompletedWorkout[];
  onNavigate: (view: View) => void;
}

export function ProfileView({ stats, completedWorkouts, onNavigate }: ProfileProps) {
  const user = auth.currentUser;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-10"
    >
      <section className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(31,251,165,0.15)]">
            <img 
              src={user?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuAbaMtpUM2xWVk4GWGRGNAWH7DVovNYIpjwKIw3B5nFoqHlMpB7B4cDWNUxzW3WsC1uWBeKMn9HOs0eRkxXrhXcV_aLHhv2vND6LW3vpu8bZSRsv9bJkF5wKYbTMjvL7hheZhyn35_TVcajGVdnjjVGwJ9Hh1xokb4K3-xN5up8BzoffjWzLRUkD9XeBrZnvUdpP_KeYzH5kA1d5BiwBCAg7iTsaLMltoYbIDEl9fg-8ycivadxhhtFPoHU4WsCYQL-OJn9UHYH6vo"} 
              alt="Profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-primary-container text-on-primary-fixed px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
            PREMIUM
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">{user?.displayName || "FitLife User"}</h2>
          <p className="text-on-surface-variant font-medium text-sm">{user?.email || "Member since Jan 2024"}</p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container-low p-6 rounded-lg space-y-2 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <Dumbbell className="w-6 h-6 text-primary" />
            <span className="text-[10px] font-bold text-primary-container uppercase tracking-tighter">Total</span>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-on-surface tracking-tighter">{stats.workoutsCompleted}</div>
            <div className="text-xs font-bold text-on-surface-variant tracking-widest uppercase mt-1">Workouts</div>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-lg space-y-2 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <Flame className="w-6 h-6 text-secondary fill-current" />
            <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">Streak</span>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-on-surface tracking-tighter">{stats.streak}</div>
            <div className="text-xs font-bold text-on-surface-variant tracking-widest uppercase mt-1">Days</div>
          </div>
        </div>

        <div className="col-span-2 bg-surface-container p-6 rounded-lg flex items-center justify-between border border-primary/5">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Energy Output</p>
            <h3 className="text-2xl font-bold">{stats.calories.toLocaleString()} <span className="text-sm font-medium text-on-surface-variant">kcal</span></h3>
          </div>
          <div className="w-24 h-12 bg-surface-container-highest rounded-full flex items-center justify-center">
            <Activity className="w-6 h-6 text-primary-container" />
          </div>
        </div>
      </section>

      {completedWorkouts.length > 0 && (
        <section className="space-y-4">
          <h5 className="text-[10px] font-extrabold text-on-surface-variant tracking-[0.2em] uppercase px-2">Recent Activity</h5>
          <div className="space-y-3">
            {completedWorkouts.slice(0, 3).map((w) => (
              <div key={w.id} className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{w.workoutTitle}</h4>
                    <p className="text-[10px] text-on-surface-variant font-medium">
                      {Math.floor(w.durationSeconds / 60)}m {w.durationSeconds % 60}s • {w.caloriesBurned} kcal
                    </p>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-on-surface-variant uppercase">
                  {new Date(w.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-gradient-to-br from-primary-container/20 to-transparent p-6 rounded-xl border border-primary/10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-primary">Premium Active</h4>
            <p className="text-xs text-on-surface-variant">Renews on Oct 12, 2024</p>
          </div>
          <button className="bg-surface-container-highest px-4 py-2 rounded-full text-xs font-bold hover:bg-surface-bright transition-colors">
            Manage
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h5 className="text-[10px] font-extrabold text-on-surface-variant tracking-[0.2em] uppercase px-2">Account Settings</h5>
        <div className="bg-surface-container-low rounded-lg overflow-hidden">
          {[
            { icon: Bell, label: 'Notifications' },
            { icon: Lock, label: 'Privacy & Security' },
            { icon: Watch, label: 'Connected Devices', view: 'devices' },
            { icon: HelpCircle, label: 'Support Center' },
          ].map((item) => (
            <button 
              key={item.label} 
              onClick={() => item.view && onNavigate(item.view as any)}
              className="w-full flex items-center justify-between p-4 hover:bg-surface-container transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-sm">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-on-surface-variant" />
            </button>
          ))}
        </div>

        <button 
          onClick={() => auth.signOut()}
          className="w-full flex items-center justify-center gap-2 p-4 text-error-dim font-bold text-sm hover:bg-error/10 rounded-lg transition-colors mt-8"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </section>
    </motion.div>
  );
}
