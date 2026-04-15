import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Clock, Flame, Heart, Search, Filter } from 'lucide-react';
import { WORKOUTS } from '../constants';
import { cn } from '../lib/utils';
import { Workout } from '../types';

interface WorkoutsProps {
  onSelectWorkout: (workout: Workout) => void;
}

export function WorkoutsView({ onSelectWorkout }: WorkoutsProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['All', 'Strength', 'Cardio', 'Yoga', 'HIIT'];
  
  const workoutCategories = [
    { name: 'Strength', icon: 'Dumbbell', color: 'text-primary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUxqVGXLaXdwDsar75LiNL2eBdRqqICMXhNYmkykVBLZmUGUdOQPpuPI8emMjhiDtst6OgFOmIKRTmzH8QUjkRdN6v-UxIhT4WfxF_pGSbHL89rGbDiuCP0BY_PXChcxGGhPMJOM3Q65WW-OpQe1TQfX1gXmmZjgQ59c0P__G2BwA_Jc7u6gM19TtoSvAOCCJpu4ZLRSV0WkcQvJPskNibKycsdqhrsHQogWVqw4ttstlWzCmx8RqPlNRUmN8rfYRMgn_YJgcQc4I' },
    { name: 'Cardio', icon: 'Activity', color: 'text-secondary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCORXOL-QYl4dhc7Ej3_SE9RVDA9lZMlOmPhn0iR34PlAm-5O5bAplAFNqQ1x8lbWTulVWZgLkCM74uJ8gwxGGMoST7Q_y-YbXdglZEwPJpzOnV65Q6LdLOyDXSDI0YTScEo55Chzjm-nrLibSuRZj0xESvT8ytjaZiKYFv1xWN7dJc2pORjDMciDv5qsnkirJE0RFtugtJCB0vB5p-yxudN9Y5uva05oqS2HBtxvT6kgpeFQV0a-wlL0sgrQfQ9SECwG_pY5adEMI' },
    { name: 'Yoga', icon: 'Flower', color: 'text-tertiary-dim', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWexsSjnOt2G_lm_S52IK5VocNN9b4WvsEeYmNQ_ZtVaaCOWSf1aKcWTon8FFiyeH6bB-hc59IlK4nfgvZHoL8ynTcP86x1aiNBYymfQLhrxQ6dIHBkLtSpLsHv3hNbPVNBhlkX-Tr9t5IAIJCa6iEjib2D2lalGJYQsCEPp9FuV45gQe5LkskJs0p6e-91U1iKnmvRKJzaQ3reRnM5TEJGQY5GPZvbN4i4emuWwaAlqVK71owcHW732L6OcZOBfiZPkvsxRTVRG4' },
    { name: 'HIIT', icon: 'Zap', color: 'text-primary-container', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHwZiIz2dQXCAto9IfzsY4XUffOc01N7d59BsSoFE940z3WbUxJDLUSXkrHJWspLUT2GuFnsd2RLbo6u_MJy-jt81jF9n52uHgdTdorMn-k5uQytr-cY00SQUXHFdB5W_cXYy0vn_ZPQEu9OLJdwKizrcecaf6obCYw3KCKUVCoKmOpPFHcGmVGRv-WQYRMZvTjbqQBGXMRtOh2ocX0ydeZ9U11y43tZg_K9bNt2gT0q6otEdG7Q_MyJpwiDMJSawPWD6Mfd_n810' },
  ];

  const filteredWorkouts = WORKOUTS.filter(workout => {
    const matchesCategory = activeCategory === 'All' || workout.category === activeCategory;
    const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         workout.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <section>
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-4xl font-extrabold font-headline tracking-tighter">Workouts</h1>
          <p className="text-on-surface-variant font-medium">Your personalized AI training sanctuary.</p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
          <input 
            type="text"
            placeholder="Search workouts, muscle groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-3 rounded-xl font-semibold flex-shrink-0 transition-all active:scale-95",
                activeCategory === cat 
                  ? "bg-primary-container text-on-primary-fixed" 
                  : "bg-surface-container text-on-surface-variant hover:text-on-surface"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {workoutCategories.map((cat) => (
            <div 
              key={cat.name} 
              onClick={() => setActiveCategory(cat.name)}
              className={cn(
                "group relative aspect-square rounded-lg overflow-hidden bg-surface-container-low cursor-pointer transition-all hover:scale-[1.02]",
                activeCategory === cat.name && "ring-2 ring-primary"
              )}
            >
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                <span className={cn("font-headline font-bold text-lg", cat.color)}>{cat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            {activeCategory === 'All' ? 'Recommended for you' : `${activeCategory} Workouts`}
          </h2>
          <span className="text-xs font-bold text-on-surface-variant">{filteredWorkouts.length} results</span>
        </div>
        
        {filteredWorkouts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredWorkouts.map((workout) => (
              <div 
                key={workout.id} 
                className="group flex flex-col gap-4 cursor-pointer"
                onClick={() => onSelectWorkout(workout)}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-container">
                  <img 
                    src={workout.image} 
                    alt={workout.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/10">
                    {workout.duration} • {workout.intensity}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-on-primary-fixed scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-8 h-8 fill-current" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-primary tracking-widest uppercase">{workout.category}</span>
                    {workout.tag && <span className="bg-primary/10 text-primary text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">{workout.tag}</span>}
                  </div>
                  <h3 className="text-xl font-bold font-headline">{workout.title}</h3>
                  <p className="text-sm text-on-surface-variant mt-1 line-clamp-2">{workout.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-dashed border-white/10">
            <Search className="w-12 h-12 text-on-surface-variant mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-bold">No workouts found</h3>
            <p className="text-on-surface-variant mt-2">Try adjusting your search or filters.</p>
            <button 
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-6 text-primary font-bold uppercase tracking-widest text-xs"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </motion.div>
  );
}
