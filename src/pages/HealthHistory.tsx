import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, Trash2, ChevronDown, ChevronUp, Calendar,
  Activity, AlertCircle, CheckCircle, AlertTriangle, XCircle,
  MessageSquare, FileText
} from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { HealthRecord } from '../types';

const severityIcons = {
  Critical: XCircle,
  Serious: AlertTriangle,
  Moderate: AlertCircle,
  Mild: CheckCircle,
};

const severityColors = {
  Critical: 'text-red-600 bg-red-50 border-red-200',
  Serious: 'text-orange-600 bg-orange-50 border-orange-200',
  Moderate: 'text-amber-600 bg-amber-50 border-amber-200',
  Mild: 'text-green-600 bg-green-50 border-green-200',
};

const timelineColors = [
  'from-emerald-500 to-teal-500',
  'from-blue-500 to-cyan-500',
  'from-violet-500 to-purple-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-500',
];

export default function HealthHistory() {
  const [history, setHistory] = useLocalStorage<HealthRecord[]>('mediconnect-history', []);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleDelete = (id: string) => {
    setHistory(prev => prev.filter(r => r.id !== id));
  };

  const handleClearAll = () => {
    setHistory([]);
    setShowConfirmClear(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      relative: getRelativeTime(date),
    };
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return `${Math.floor(days / 7)}w ago`;
  };

  if (history.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">No Health Records Yet</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Your symptom check history will appear here. Start by checking your symptoms to build your health timeline.
          </p>
          <Link
            to="/symptoms"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <MessageSquare className="w-5 h-5" />
            Start Symptom Check
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              Health Timeline
            </h1>
            <p className="text-slate-500 mt-1 ml-13">{history.length} record{history.length !== 1 ? 's' : ''}</p>
          </div>

          <button
            onClick={() => setShowConfirmClear(true)}
            className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </motion.div>

        {/* Confirm clear modal */}
        <AnimatePresence>
          {showConfirmClear && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowConfirmClear(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2">Clear All Records?</h3>
                <p className="text-sm text-slate-500 mb-6">This will permanently delete your entire health history. This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmClear(false)}
                    className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Delete All
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-200 via-slate-200 to-transparent" />

          <div className="space-y-6">
            {history.map((record, i) => {
              const { date, time, relative } = formatDate(record.date);
              const isExpanded = expanded === record.id;
              const highestSeverity = record.conditions.reduce((highest, c) => {
                const order = { Critical: 4, Serious: 3, Moderate: 2, Mild: 1 };
                return order[c.severity] > order[highest] ? c.severity : highest;
              }, 'Mild' as 'Critical' | 'Serious' | 'Moderate' | 'Mild');
              const SevIcon = severityIcons[highestSeverity];
              const gradientColor = timelineColors[i % timelineColors.length];

              return (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative pl-16"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-3.5 top-5 w-5 h-5 rounded-full bg-gradient-to-br ${gradientColor} border-2 border-white shadow-lg z-10`} />

                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {/* Card header */}
                    <button
                      onClick={() => setExpanded(isExpanded ? null : record.id)}
                      className="w-full p-5 text-left"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-xs text-slate-500">{date} at {time}</span>
                            <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                              {relative}
                            </span>
                          </div>

                          <p className="text-sm text-slate-700 mb-3 line-clamp-2">"{record.symptoms}"</p>

                          <div className="flex flex-wrap gap-2">
                            {record.conditions.slice(0, 3).map(c => {
                              const Icon = severityIcons[c.severity];
                              return (
                                <span
                                  key={c.name}
                                  className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border ${severityColors[c.severity]}`}
                                >
                                  <Icon className="w-3 h-3" />
                                  {c.name}
                                </span>
                              );
                            })}
                            {record.conditions.length > 3 && (
                              <span className="text-xs text-slate-400 py-1">
                                +{record.conditions.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${severityColors[highestSeverity]}`}>
                            <SevIcon className="w-4 h-4" />
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expanded detail */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-slate-100"
                        >
                          <div className="p-5 space-y-4">
                            {record.conditions.map(condition => {
                              const Icon = severityIcons[condition.severity];
                              return (
                                <div key={condition.name} className="border border-slate-100 rounded-xl p-4">
                                  <div className="flex items-center gap-3 mb-2">
                                    <Icon className={`w-4 h-4 ${severityColors[condition.severity].split(' ')[0]}`} />
                                    <h4 className="font-semibold text-slate-900 text-sm">{condition.name}</h4>
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${severityColors[condition.severity]}`}>
                                      {condition.severity}
                                    </span>
                                    <span className="text-xs text-slate-400">{condition.probability} likelihood</span>
                                  </div>
                                  <p className="text-xs text-slate-500 leading-relaxed">{condition.description}</p>
                                </div>
                              );
                            })}

                            <button
                              onClick={() => handleDelete(record.id)}
                              className="flex items-center gap-2 text-xs text-red-500 hover:text-red-700 font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete this record
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white border border-slate-200 rounded-2xl p-6"
        >
          <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-emerald-600" />
            Health Summary
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <FileText className="w-5 h-5 text-slate-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-slate-900">{history.length}</div>
              <div className="text-xs text-slate-500">Total Checks</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <XCircle className="w-5 h-5 text-red-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-red-600">
                {history.filter(r => r.conditions.some(c => c.severity === 'Critical')).length}
              </div>
              <div className="text-xs text-slate-500">Critical Flags</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <AlertCircle className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-amber-600">
                {new Set(history.flatMap(r => r.conditions.map(c => c.name))).size}
              </div>
              <div className="text-xs text-slate-500">Unique Conditions</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <Calendar className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-emerald-600">
                {history.length > 0
                  ? Math.ceil((Date.now() - history[history.length - 1].timestamp) / 86400000) || 1
                  : 0}
              </div>
              <div className="text-xs text-slate-500">Days Tracked</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
