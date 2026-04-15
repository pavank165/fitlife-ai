export type View = 'home' | 'workouts' | 'hydrate' | 'coach' | 'profile' | 'food-scanner' | 'goals' | 'workout-detail' | 'active-workout' | 'devices';

export interface Workout {
  id: string;
  title: string;
  type: string;
  duration: string;
  intensity: 'Low' | 'Medium' | 'High';
  image: string;
  description: string;
  category: 'Strength' | 'Cardio' | 'Yoga' | 'HIIT';
  tag?: string;
}

export interface CompletedWorkout {
  id: string;
  workoutId: string;
  workoutTitle: string;
  durationSeconds: number;
  intensity: 'Low' | 'Medium' | 'High';
  timestamp: number;
  caloriesBurned: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
  workouts?: Workout[];
}

export interface UserStats {
  steps: number;
  stepGoal: number;
  calories: number;
  calorieGoal: number;
  water: number;
  waterGoal: number;
  weight: number;
  weightGoal: number;
  workoutsCompleted: number;
  streak: number;
}
