import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { TopNav, BottomNav } from './components/Navigation';
import { HomeView } from './views/Home';
import { Dumbbell } from 'lucide-react';
import { WorkoutsView } from './views/Workouts';
import { HydrateView } from './views/Hydrate';
import { CoachView } from './views/Coach';
import { ProfileView } from './views/Profile';
import { FoodScannerView } from './views/FoodScanner';
import { GoalsView } from './views/Goals';
import { WorkoutDetailView } from './views/WorkoutDetail';
import { ActiveWorkoutView } from './views/ActiveWorkout';
import { DevicesView } from './views/Devices';
import { View, UserStats, Workout, CompletedWorkout } from './types';
import { auth, db, signInWithGoogle } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, onSnapshot, query, orderBy, limit, addDoc } from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [showScanner, setShowScanner] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [completedWorkouts, setCompletedWorkouts] = useState<CompletedWorkout[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  
  const [stats, setStats] = useState<UserStats>({
    steps: 0,
    stepGoal: 10000,
    calories: 0,
    calorieGoal: 2200,
    water: 0,
    waterGoal: 2.5,
    weight: 70,
    weightGoal: 70.0,
    workoutsCompleted: 0,
    streak: 0
  });

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);

      if (currentUser) {
        // Load or initialize user profile
        const userDocRef = doc(db, 'users', currentUser.uid);
        try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setStats(userDoc.data() as UserStats);
          } else {
            const initialStats: UserStats = {
              steps: 8432,
              stepGoal: 10000,
              calories: 1840,
              calorieGoal: 2200,
              water: 1.5,
              waterGoal: 2.5,
              weight: 74.2,
              weightGoal: 70.0,
              workoutsCompleted: 142,
              streak: 12
            };
            await setDoc(userDocRef, { ...initialStats, uid: currentUser.uid, email: currentUser.email });
            setStats(initialStats);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
        }

        // Listen for completed workouts
        const workoutsRef = collection(db, 'users', currentUser.uid, 'completedWorkouts');
        const q = query(workoutsRef, orderBy('timestamp', 'desc'), limit(10));
        
        return onSnapshot(q, (snapshot) => {
          const workouts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CompletedWorkout));
          setCompletedWorkouts(workouts);
        }, (error) => {
          handleFirestoreError(error, OperationType.LIST, `users/${currentUser.uid}/completedWorkouts`);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleWorkoutComplete = async (durationSeconds: number) => {
    if (!selectedWorkout || !user) return;

    const caloriesBurned = Math.floor((durationSeconds / 60) * (selectedWorkout.intensity === 'High' ? 12 : selectedWorkout.intensity === 'Medium' ? 8 : 5));

    const completedData = {
      userId: user.uid,
      workoutId: selectedWorkout.id,
      workoutTitle: selectedWorkout.title,
      durationSeconds,
      intensity: selectedWorkout.intensity,
      timestamp: Date.now(),
      caloriesBurned
    };

    try {
      const workoutsRef = collection(db, 'users', user.uid, 'completedWorkouts');
      await addDoc(workoutsRef, completedData);

      const newStats = {
        ...stats,
        workoutsCompleted: stats.workoutsCompleted + 1,
        calories: stats.calories + caloriesBurned
      };

      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { ...newStats, uid: user.uid, email: user.email }, { merge: true });
      
      setStats(newStats);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/completedWorkouts`);
    }

    setSelectedWorkout(null);
    setCurrentView('workouts');
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView stats={stats} onNavigate={(v) => v === 'food-scanner' ? setShowScanner(true) : setCurrentView(v)} />;
      case 'workouts':
        return <WorkoutsView onSelectWorkout={(w) => { setSelectedWorkout(w); setCurrentView('workout-detail'); }} />;
      case 'hydrate':
        return <HydrateView />;
      case 'coach':
        return <CoachView />;
      case 'profile':
        return <ProfileView stats={stats} completedWorkouts={completedWorkouts} onNavigate={setCurrentView} />;
      case 'goals':
        return <GoalsView stats={stats} />;
      case 'devices':
        return <DevicesView />;
      case 'workout-detail':
        return selectedWorkout ? (
          <WorkoutDetailView 
            workout={selectedWorkout} 
            onClose={() => setCurrentView('workouts')} 
            onStart={() => setCurrentView('active-workout')} 
          />
        ) : null;
      case 'active-workout':
        return selectedWorkout ? (
          <ActiveWorkoutView 
            workout={selectedWorkout} 
            onComplete={handleWorkoutComplete} 
            onCancel={() => setCurrentView('workouts')} 
          />
        ) : null;
      default:
        return <HomeView stats={stats} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {!user && isAuthReady && (
        <div className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center p-6 space-y-8">
          <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center">
            <Dumbbell className="w-12 h-12 text-primary" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black font-headline tracking-tighter">FitLife AI</h1>
            <p className="text-on-surface-variant max-w-xs">Your personalized AI training sanctuary. Sign in to track your progress.</p>
          </div>
          <button 
            onClick={signInWithGoogle}
            className="w-full max-w-xs bg-white text-black h-14 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
            Sign in with Google
          </button>
        </div>
      )}

      <TopNav />
      
      <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </main>

      <BottomNav currentView={currentView} onViewChange={setCurrentView} />

      <AnimatePresence>
        {showScanner && (
          <FoodScannerView onClose={() => setShowScanner(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
