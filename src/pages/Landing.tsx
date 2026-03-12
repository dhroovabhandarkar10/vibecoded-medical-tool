import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageSquare, Map, Clock, Shield, Heart, ArrowRight,
  Stethoscope, Brain, Zap, CheckCircle, Star, Users
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Symptom Analysis',
    description: 'Describe your symptoms in plain language and get instant AI-powered insights on possible conditions.',
    color: 'from-violet-500 to-purple-600',
    shadow: 'shadow-violet-500/20',
  },
  {
    icon: Map,
    title: 'Nearby Clinic Finder',
    description: 'Find hospitals, clinics, urgent care centers, and pharmacies near you with real-time availability.',
    color: 'from-blue-500 to-cyan-600',
    shadow: 'shadow-blue-500/20',
  },
  {
    icon: Clock,
    title: 'Health Timeline',
    description: 'Track your symptom history over time to spot patterns and share with your healthcare provider.',
    color: 'from-amber-500 to-orange-600',
    shadow: 'shadow-amber-500/20',
  },
  {
    icon: Shield,
    title: 'Emergency SOS',
    description: 'One-tap emergency button with automatic location sharing for critical situations.',
    color: 'from-red-500 to-rose-600',
    shadow: 'shadow-red-500/20',
  },
];

const stats = [
  { value: '50K+', label: 'Conditions Analyzed', icon: Stethoscope },
  { value: '10K+', label: 'Clinics Listed', icon: Map },
  { value: '99.9%', label: 'Uptime', icon: Zap },
  { value: '4.9★', label: 'User Rating', icon: Star },
];

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Working Mom',
    text: 'MediConnect helped me understand my daughter\'s symptoms at 2 AM when I couldn\'t reach our pediatrician. The nearby clinic finder was a lifesaver!',
    rating: 5,
  },
  {
    name: 'James T.',
    role: 'Remote Worker',
    text: 'I love the health timeline feature. Being able to track my chronic symptoms and share the history with my doctor has improved my care significantly.',
    rating: 5,
  },
  {
    name: 'Dr. Patricia K.',
    role: 'Family Physician',
    text: 'I recommend MediConnect to my patients as a preliminary tool. The disclaimers are clear and the symptom analysis is remarkably accurate.',
    rating: 5,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl" />
          <div className="absolute top-20 -left-20 w-60 h-60 bg-teal-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-emerald-200 mb-8"
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-emerald-700">AI-Powered Health Assistant</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight"
            >
              <span className="text-slate-900">Your Health,</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Understood Instantly
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              Describe your symptoms in plain language. Get AI-powered insights, find nearby care facilities, 
              and track your health journey — all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/symptoms"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all hover:-translate-y-0.5"
              >
                <MessageSquare className="w-5 h-5" />
                Check Symptoms
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/map"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                <Map className="w-5 h-5 text-emerald-600" />
                Find Nearby Care
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Free to use
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> No sign-up needed
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Private & secure
              </span>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Trust Banner */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} variants={item} className="text-center">
                  <Icon className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Everything you need for{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                health awareness
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Powerful tools that help you understand your symptoms, find care, and maintain your health records.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={item}
                  className="group bg-white border border-slate-200 rounded-3xl p-8 hover:border-slate-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg ${feature.shadow} mb-6`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">How it works</h2>
            <p className="mt-4 text-lg text-slate-600">Three simple steps to understand your health better</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Describe Symptoms', desc: 'Tell us how you\'re feeling in your own words. Our AI understands natural language.', icon: MessageSquare },
              { step: '02', title: 'Get AI Insights', desc: 'Receive possible conditions with severity levels, recommendations, and next steps.', icon: Brain },
              { step: '03', title: 'Find Care Nearby', desc: 'Locate clinics, hospitals, and pharmacies near you with directions and contact info.', icon: Map },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="text-6xl font-black text-emerald-100 mb-4">{s.step}</div>
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Trusted by thousands</h2>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={item}
                className="bg-slate-50 rounded-3xl p-8 border border-slate-100"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-slate-900">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-amber-50 border-t border-amber-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-amber-800">Important Medical Disclaimer</h3>
          </div>
          <p className="text-amber-700 text-sm leading-relaxed">
            MediConnect is an informational tool only and does not provide medical advice, diagnosis, or treatment. 
            The symptom analysis is AI-generated and should not replace professional medical consultation. 
            Always seek the advice of a qualified healthcare provider for any medical condition. 
            In case of emergency, call 911 immediately.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-12 h-12 text-emerald-200 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Take Control of Your Health Today
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Don't wait when you're worried about your health. Get instant AI insights and find the care you need.
          </p>
          <Link
            to="/symptoms"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
          >
            Start Symptom Check
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-bold text-white">MediConnect</span>
            </div>
            <p className="text-sm">© 2025 MediConnect. For informational purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
