import React from 'react';
import { Home, Dumbbell, Droplets, Brain, User, Bell } from 'lucide-react';
import { View } from '../types';
import { cn } from '../lib/utils';

interface NavbarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

import { auth } from '../firebase';

export function TopNav() {
  const user = auth.currentUser;

  return (
    <header className="fixed top-0 w-full z-50 glass-panel flex justify-between items-center px-6 h-16">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
          <img 
            src={user?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuBBbXAvtf1khyYIDubyc3Nnl3y2Fk-R1rUIFXN8MGQDu5crflLYqJWShdHp8Aoy4ZKV6Ucev00UK_ixW8Pq4c6Ztk30gVQwEQZoiNv3CexSQBGYV40dikbxsq8OWc3Royon7Bxc1n_W5Jk8BH5W-umjtJjLPmbIkEUwELcK1W9yRMCJfu87uSqeCrH1kurtAPzTYSI1DhOp-j72_FdFkhQFb6fbpmuGuToi4VOI7EEpGbYmgJLklf6pTZgg8ViMe3-d1giBzge4i_s"} 
            alt="User" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="text-xl font-bold tracking-tight text-primary-container font-headline">FitLife AI</span>
      </div>
      <button className="text-on-surface-variant hover:text-primary transition-colors">
        <Bell className="w-6 h-6" />
      </button>
    </header>
  );
}

export function BottomNav({ currentView, onViewChange }: NavbarProps) {
  const navItems: { id: View; label: string; icon: any }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'hydrate', label: 'Hydrate', icon: Droplets },
    { id: 'coach', label: 'Coach', icon: Brain },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 glass-panel flex justify-around items-center px-4 pb-6 pt-2 rounded-t-[3rem] shadow-[0_-4px_40px_rgba(0,245,160,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "flex flex-col items-center justify-center p-3 transition-all active:scale-90 duration-150",
              isActive ? "bg-surface-container text-primary-container rounded-full" : "text-on-surface-variant hover:text-primary"
            )}
          >
            <Icon className={cn("w-6 h-6", isActive && "fill-current")} />
            <span className="text-[10px] font-bold font-headline mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
