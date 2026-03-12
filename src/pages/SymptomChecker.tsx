import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Bot, User, Sparkles, AlertCircle, ArrowRight,
  Stethoscope, Info, Loader2
} from 'lucide-react';
import { Message, HealthRecord } from '../types';
import { analyzeSymptoms, generateAIResponse } from '../data/conditions';
import { useLocalStorage } from '../hooks/useLocalStorage';

const quickSymptoms = [
  'I have a headache and feel dizzy',
  'My throat is sore and I have a cough',
  'I have a fever and body aches',
  'My stomach hurts and I feel nauseous',
  'I feel very tired and weak all the time',
  'I have chest pain and shortness of breath',
  'My back hurts badly',
  'I have an itchy rash on my skin',
];

export default function SymptomChecker() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'Hello! I\'m your AI health assistant. 👋\n\nPlease describe your symptoms in detail, and I\'ll help you understand what might be going on. You can tell me things like:\n\n• What symptoms you\'re experiencing\n• How long you\'ve had them\n• How severe they are\n\n**Remember:** This is not a substitute for professional medical advice.',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastSymptoms, setLastSymptoms] = useState('');
  const [, setHistory] = useLocalStorage<HealthRecord[]>('mediconnect-history', []);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setLastSymptoms(messageText);

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

    const aiResponse = generateAIResponse(messageText);
    const conditions = analyzeSymptoms(messageText);

    // Save to history if valid conditions found
    if (conditions[0].name !== 'Unable to Determine') {
      const record: HealthRecord = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        symptoms: messageText,
        conditions,
        timestamp: Date.now(),
      };
      setHistory(prev => [record, ...prev]);
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleViewResults = () => {
    const conditions = analyzeSymptoms(lastSymptoms);
    navigate('/results', { state: { conditions, symptoms: lastSymptoms } });
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, i) => {
      // Bold text
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIdx = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIdx) {
          parts.push(line.slice(lastIdx, match.index));
        }
        parts.push(<strong key={`b-${i}-${match.index}`} className="font-semibold">{match[1]}</strong>);
        lastIdx = match.index + match[0].length;
      }

      if (lastIdx < line.length) {
        parts.push(line.slice(lastIdx));
      }

      if (parts.length === 0) {
        return <br key={i} />;
      }

      return <p key={i} className="mb-1">{parts}</p>;
    });
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900">AI Symptom Checker</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs text-slate-500">AI Assistant Online</span>
              </div>
            </div>
          </div>
          {lastSymptoms && (
            <button
              onClick={handleViewResults}
              className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors"
            >
              View Detailed Results
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
                  msg.role === 'user'
                    ? 'bg-slate-700'
                    : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                }`}>
                  {msg.role === 'user' 
                    ? <User className="w-4 h-4 text-white" />
                    : <Bot className="w-4 h-4 text-white" />
                  }
                </div>
                <div className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                  msg.role === 'user'
                    ? 'bg-slate-800 text-white rounded-tr-md'
                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-md shadow-sm'
                }`}>
                  <div className="text-sm leading-relaxed">
                    {formatMessage(msg.content)}
                  </div>
                  <div className={`text-xs mt-2 ${msg.role === 'user' ? 'text-slate-400' : 'text-slate-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-md px-5 py-4 shadow-sm">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing your symptoms...
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Symptoms */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-slate-500">Quick symptom suggestions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => handleSend(symptom)}
                  className="bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all"
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer bar */}
      <div className="px-4 pb-2">
        <div className="max-w-3xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <p className="text-xs text-amber-700">
              This AI tool provides general health information only. It is <strong>not</strong> a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-slate-200 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-3"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your symptoms..."
                disabled={isTyping}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 pr-12 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50 transition-all"
              />
              <Info className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl flex items-center justify-center hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-40 disabled:hover:shadow-none transition-all shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          {lastSymptoms && (
            <div className="mt-3 sm:hidden">
              <button
                onClick={handleViewResults}
                className="w-full flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors"
              >
                View Detailed Results
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
