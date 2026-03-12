import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, AlertTriangle, CheckCircle, AlertCircle,
  XCircle, Map, Clock, ChevronDown, ChevronUp, Activity, Shield
} from 'lucide-react';
import { Condition } from '../types';
import { useState } from 'react';

const severityConfig = {
  Critical: { color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle, iconColor: 'text-red-600', barColor: 'bg-red-500', badge: 'bg-red-600' },
  Serious: { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: AlertTriangle, iconColor: 'text-orange-600', barColor: 'bg-orange-500', badge: 'bg-orange-600' },
  Moderate: { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: AlertCircle, iconColor: 'text-amber-600', barColor: 'bg-amber-500', badge: 'bg-amber-600' },
  Mild: { color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle, iconColor: 'text-green-600', barColor: 'bg-green-500', badge: 'bg-green-600' },
};

const probabilityConfig = {
  High: { width: 'w-full', color: 'bg-emerald-500', text: 'text-emerald-700', percent: '85%' },
  Moderate: { width: 'w-3/5', color: 'bg-amber-500', text: 'text-amber-700', percent: '55%' },
  Low: { width: 'w-1/4', color: 'bg-slate-400', text: 'text-slate-600', percent: '25%' },
};

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { conditions = [], symptoms = '' } = (location.state || {}) as { conditions: Condition[]; symptoms: string };
  const [expanded, setExpanded] = useState<string | null>(conditions[0]?.name || null);

  if (!conditions.length) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="text-center">
          <Activity className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">No Results Yet</h2>
          <p className="text-slate-500 mb-6">Complete a symptom check first to see your results.</p>
          <Link
            to="/symptoms"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
          >
            Start Symptom Check
          </Link>
        </div>
      </div>
    );
  }

  const hasCritical = conditions.some(c => c.severity === 'Critical');
  const hasSerious = conditions.some(c => c.severity === 'Serious');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate('/symptoms')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Symptom Checker</span>
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Analysis Results</h1>
          <p className="text-slate-500 mb-2">Based on your described symptoms:</p>
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 italic mb-6">
            "{symptoms}"
          </div>
        </motion.div>

        {/* Alert for critical/serious */}
        {(hasCritical || hasSerious) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mb-6 rounded-2xl p-5 flex items-start gap-4 ${
              hasCritical
                ? 'bg-red-50 border-2 border-red-200'
                : 'bg-orange-50 border-2 border-orange-200'
            }`}
          >
            <AlertTriangle className={`w-6 h-6 shrink-0 mt-0.5 ${hasCritical ? 'text-red-600' : 'text-orange-600'}`} />
            <div>
              <h3 className={`font-bold ${hasCritical ? 'text-red-800' : 'text-orange-800'}`}>
                {hasCritical ? 'Potentially Critical Condition Detected' : 'Serious Condition Possible'}
              </h3>
              <p className={`text-sm mt-1 ${hasCritical ? 'text-red-700' : 'text-orange-700'}`}>
                {hasCritical
                  ? 'One or more possible conditions identified may be life-threatening. Please seek immediate medical attention or call 911.'
                  : 'Some possible conditions may require prompt medical evaluation. Please consult a healthcare provider soon.'
                }
              </p>
            </div>
          </motion.div>
        )}

        {/* Severity Overview */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {(['Critical', 'Serious', 'Moderate', 'Mild'] as const).map(sev => {
            const conf = severityConfig[sev];
            const Icon = conf.icon;
            const count = conditions.filter(c => c.severity === sev).length;
            return (
              <div key={sev} className={`rounded-xl p-3 text-center border ${conf.color}`}>
                <Icon className={`w-5 h-5 mx-auto mb-1 ${conf.iconColor}`} />
                <div className="text-lg font-bold">{count}</div>
                <div className="text-xs font-medium">{sev}</div>
              </div>
            );
          })}
        </div>

        {/* Conditions list */}
        <div className="space-y-4">
          {conditions.map((condition, i) => {
            const sevConf = severityConfig[condition.severity];
            const probConf = probabilityConfig[condition.probability];
            const SevIcon = sevConf.icon;
            const isExpanded = expanded === condition.name;

            return (
              <motion.div
                key={condition.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : condition.name)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sevConf.color}`}>
                      <SevIcon className={`w-5 h-5 ${sevConf.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{condition.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full text-white ${sevConf.badge}`}>
                          {condition.severity}
                        </span>
                        <span className={`text-xs font-medium ${probConf.text}`}>
                          {condition.probability} likelihood
                        </span>
                      </div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-slate-100 px-6 py-5"
                  >
                    <p className="text-sm text-slate-600 mb-5 leading-relaxed">{condition.description}</p>

                    {/* Probability bar */}
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Likelihood</span>
                        <span className={`text-xs font-bold ${probConf.text}`}>{probConf.percent}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: probConf.percent }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className={`h-full rounded-full ${probConf.color}`}
                        />
                      </div>
                    </div>

                    {/* Common symptoms */}
                    {condition.symptoms.length > 0 && (
                      <div className="mb-5">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Common Symptoms</h4>
                        <div className="flex flex-wrap gap-2">
                          {condition.symptoms.map(s => (
                            <span key={s} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommendations */}
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        {condition.recommendations.map((rec, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid sm:grid-cols-2 gap-4"
        >
          <Link
            to="/map"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Map className="w-5 h-5" />
            Find Nearby Care
          </Link>
          <Link
            to="/history"
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-4 rounded-2xl font-semibold hover:border-slate-300 hover:shadow-md transition-all"
          >
            <Clock className="w-5 h-5" />
            View Health History
          </Link>
        </motion.div>

        {/* Disclaimer */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-700 leading-relaxed">
            <strong>Disclaimer:</strong> These results are generated by an AI model for informational purposes only and do not constitute medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider regarding any medical concerns.
          </p>
        </div>
      </div>
    </div>
  );
}
