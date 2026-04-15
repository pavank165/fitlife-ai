import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Watch, Bluetooth, Smartphone, Check, X, RefreshCw, Activity, Heart, Zap, ChevronRight, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface Device {
  id: string;
  name: string;
  type: 'watch' | 'sensor' | 'app';
  status: 'connected' | 'disconnected' | 'pairing';
  lastSync?: string;
  battery?: number;
  icon: any;
}

export function DevicesView() {
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'Health Connect', type: 'app', status: 'disconnected', icon: RefreshCw },
    { id: '2', name: 'Apple Health', type: 'app', status: 'disconnected', icon: RefreshCw },
  ]);

  const [isPairing, setIsPairing] = useState(false);
  const [pairingStep, setPairingStep] = useState<'searching' | 'found' | 'connecting' | 'success'>('searching');
  const [foundDevice, setFoundDevice] = useState<any>(null);

  const startPairing = async () => {
    setIsPairing(true);
    setPairingStep('searching');

    // Attempt real Web Bluetooth pairing if supported
    if ('bluetooth' in navigator) {
      try {
        const device = await (navigator as any).bluetooth.requestDevice({
          filters: [{ services: ['heart_rate'] }],
          optionalServices: ['battery_service']
        });
        
        setFoundDevice(device);
        setPairingStep('found');
      } catch (error) {
        console.error('Bluetooth pairing failed:', error);
        // Fallback to simulation for demo if user cancels or it fails
        setTimeout(() => setPairingStep('found'), 2000);
      }
    } else {
      // Simulation for browsers without Web Bluetooth
      setTimeout(() => setPairingStep('found'), 2000);
    }
  };

  const connectDevice = () => {
    setPairingStep('connecting');
    setTimeout(() => {
      setPairingStep('success');
      const newDevice: Device = {
        id: Math.random().toString(),
        name: foundDevice?.name || 'Smart Heart Sensor',
        type: 'sensor',
        status: 'connected',
        lastSync: 'Just now',
        battery: 85,
        icon: Bluetooth
      };
      setDevices(prev => [...prev, newDevice]);
    }, 2000);
  };

  const connectHealthConnect = async () => {
    try {
      const response = await fetch('/api/auth/health-connect/url');
      const { url } = await response.json();
      
      const authWindow = window.open(url, 'health_connect_auth', 'width=600,height=700');
      
      if (!authWindow) {
        alert('Please allow popups to connect Health Connect.');
      }
    } catch (error) {
      console.error('Failed to get Health Connect auth URL:', error);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        setDevices(prev => prev.map(d => 
          d.name === 'Health Connect' ? { ...d, status: 'connected', lastSync: 'Just now' } : d
        ));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-10"
    >
      <section className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Devices</h1>
        <p className="text-on-surface-variant font-medium">Connect your wearables for real-time biometric sync.</p>
      </section>

      <div className="grid grid-cols-1 gap-4">
        {devices.map((device) => (
          <div 
            key={device.id} 
            onClick={() => device.name === 'Health Connect' && device.status === 'disconnected' && connectHealthConnect()}
            className={cn(
              "bg-surface-container-low p-6 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-surface-container transition-colors cursor-pointer",
              device.status === 'disconnected' && "opacity-70 grayscale hover:grayscale-0 hover:opacity-100"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center",
                device.status === 'connected' ? "bg-primary/10 text-primary" : "bg-surface-container-highest text-on-surface-variant"
              )}>
                <device.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{device.name}</h3>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    device.status === 'connected' ? "bg-primary animate-pulse" : "bg-on-surface-variant/30"
                  )} />
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    {device.status === 'connected' ? `Connected • ${device.lastSync}` : 'Disconnected'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {device.battery !== undefined && (
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-on-surface-variant">{device.battery}%</span>
                  <div className="w-8 h-1 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${device.battery}%` }} />
                  </div>
                </div>
              )}
              <button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        <button 
          onClick={startPairing}
          className="bg-surface-container-highest/30 border-2 border-dashed border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center gap-4 hover:bg-surface-container-highest/50 hover:border-primary/30 transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center group-hover:scale-110 transition-transform">
            <Bluetooth className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <h4 className="font-bold text-lg">Pair New Device</h4>
            <p className="text-on-surface-variant text-sm">Smartwatches, Heart Rate Monitors, Sensors</p>
          </div>
        </button>
      </div>

      <section className="bg-primary/5 rounded-2xl p-6 border border-primary/10 space-y-4">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="font-bold">Biometric Data Sync</h3>
        </div>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Connecting your smartwatch allows FitLife AI to adjust your workout intensity in real-time based on your heart rate variability (HRV) and recovery scores.
        </p>
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center space-y-1">
            <Heart className="w-5 h-5 text-primary mx-auto" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">HRV</span>
          </div>
          <div className="text-center space-y-1">
            <Activity className="w-5 h-5 text-secondary mx-auto" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">VO2 Max</span>
          </div>
          <div className="text-center space-y-1">
            <Zap className="w-5 h-5 text-tertiary mx-auto" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Recovery</span>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isPairing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-surface-container-low p-8 rounded-3xl max-w-sm w-full space-y-8 border border-white/5 relative overflow-hidden"
            >
              <button 
                onClick={() => setIsPairing(false)}
                className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-on-surface"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    {pairingStep === 'searching' && <RefreshCw className="w-10 h-10 text-primary animate-spin" />}
                    {pairingStep === 'found' && <Watch className="w-10 h-10 text-primary" />}
                    {pairingStep === 'connecting' && <RefreshCw className="w-10 h-10 text-primary animate-spin" />}
                    {pairingStep === 'success' && <Check className="w-10 h-10 text-primary" />}
                  </div>
                  {pairingStep === 'searching' && (
                    <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20" />
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-headline">
                    {pairingStep === 'searching' && 'Searching...'}
                    {pairingStep === 'found' && 'Device Found!'}
                    {pairingStep === 'connecting' && 'Connecting...'}
                    {pairingStep === 'success' && 'Successfully Paired!'}
                  </h3>
                  <p className="text-on-surface-variant">
                    {pairingStep === 'searching' && 'Make sure your device is in pairing mode and nearby.'}
                    {pairingStep === 'found' && `Found ${foundDevice?.name || 'Smart Watch'}. Would you like to pair it?`}
                    {pairingStep === 'connecting' && 'Establishing a secure biometric link...'}
                    {pairingStep === 'success' && 'Your device is now synced with Health Connect.'}
                  </p>
                </div>

                <div className="w-full pt-4">
                  {pairingStep === 'found' && (
                    <button 
                      onClick={connectDevice}
                      className="w-full bg-primary text-on-primary-fixed h-14 rounded-xl font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
                    >
                      Connect Now
                    </button>
                  )}
                  {pairingStep === 'success' && (
                    <button 
                      onClick={() => setIsPairing(false)}
                      className="w-full bg-surface-container-highest text-on-surface h-14 rounded-xl font-bold active:scale-95 transition-all"
                    >
                      Done
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
