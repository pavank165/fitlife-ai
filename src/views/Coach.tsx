import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Brain, ArrowUp, Zap, Utensils, Moon } from 'lucide-react';
import { Message } from '../types';
import { getCoachResponse } from '../services/geminiService';
import { cn } from '../lib/utils';

export function CoachView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Good morning! Your heart rate variability is higher than average today—meaning you're primed for a high-intensity session.",
      timestamp: '08:42 AM',
      suggestions: ['Log Meal', 'Sleep Summary', 'Adjust Goal']
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("Gemini API key is missing. Please add it to the Secrets panel.");
      }

      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: m.content }]
      }));
      
      const response = await getCoachResponse(input, history);
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: error instanceof Error ? error.message : "I'm sorry, I'm having trouble connecting right now. Please check your API key.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-[calc(100vh-160px)]"
    >
      <section className="flex gap-3 overflow-x-auto no-scrollbar py-4 mb-6 -mx-4 px-4 flex-shrink-0">
        <div className="flex-shrink-0 bg-surface-container-low rounded-xl px-5 py-3 flex items-center gap-3 border border-white/5">
          <div className="p-2 bg-primary/10 rounded-full">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">Metabolism</p>
            <p className="text-xs font-bold">Peak state reached.</p>
          </div>
        </div>
        <div className="flex-shrink-0 bg-surface-container-low rounded-xl px-5 py-3 flex items-center gap-3 border border-white/5">
          <div className="p-2 bg-secondary/10 rounded-full">
            <Moon className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">Recovery</p>
            <p className="text-xs font-bold">8.2h quality sleep.</p>
          </div>
        </div>
        <div className="flex-shrink-0 bg-surface-container-low rounded-xl px-5 py-3 flex items-center gap-3 border border-white/5">
          <div className="p-2 bg-tertiary-dim/10 rounded-full">
            <Utensils className="w-4 h-4 text-tertiary-dim" />
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">Nutrition</p>
            <p className="text-xs font-bold">Protein goal: +20g</p>
          </div>
        </div>
      </section>

      <div ref={scrollRef} className="flex-grow overflow-y-auto space-y-8 no-scrollbar pb-20">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={cn(
              "flex flex-col gap-2 max-w-[85%]",
              msg.role === 'user' ? "self-end items-end" : "items-start"
            )}
          >
            {msg.role === 'assistant' && (
              <div className="flex items-center gap-2 mb-1 px-2">
                <Brain className="w-4 h-4 text-primary fill-current" />
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Coach AI</span>
              </div>
            )}
            <div className={cn(
              "p-4 text-sm leading-relaxed shadow-sm",
              msg.role === 'user' 
                ? "bg-primary text-on-primary-fixed rounded-tl-lg rounded-br-lg rounded-bl-lg font-medium" 
                : "bg-surface-container rounded-tr-lg rounded-br-lg rounded-bl-lg text-on-surface"
            )}>
              {msg.content}
            </div>
            <span className="text-[9px] text-on-surface-variant px-2">{msg.timestamp}</span>
          </div>
        ))}
        {isTyping && (
          <div className="flex flex-col items-start gap-2 max-w-[85%]">
            <div className="flex items-center gap-2 mb-1 px-2">
              <Brain className="w-4 h-4 text-primary fill-current" />
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Coach AI</span>
            </div>
            <div className="bg-surface-container rounded-tr-lg rounded-br-lg rounded-bl-lg p-4 flex items-center gap-1.5">
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-24 left-0 w-full z-40 bg-surface/80 backdrop-blur-xl pt-4 px-6">
        <div className="max-w-2xl mx-auto relative">
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            {messages[messages.length - 1]?.suggestions?.map((s) => (
              <button 
                key={s}
                onClick={() => setInput(s)}
                className="flex-shrink-0 px-4 py-2 bg-surface-container rounded-full text-xs font-medium text-on-surface-variant border border-white/5 hover:bg-surface-container-highest transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 bg-surface-container-highest rounded-xl p-2 pr-4 pl-4">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-grow bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder:text-on-surface-variant h-10" 
              placeholder="Ask your coach..." 
              type="text"
            />
            <button 
              onClick={handleSend}
              className="w-10 h-10 kinetic-gradient rounded-full flex items-center justify-center text-on-primary-fixed shadow-lg active:scale-90 transition-transform"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
