import { useState } from 'react';
import { Phone, X, MapPin, AlertTriangle, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SOSButton() {
  const [showModal, setShowModal] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const handleSOS = () => {
    setShowModal(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocationShared(true);
        },
        () => {
          setLocationShared(false);
        }
      );
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSOS}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl shadow-red-600/40 flex items-center justify-center group transition-colors"
      >
        <Phone className="w-7 h-7 group-hover:animate-bounce" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full" />
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => { setShowModal(false); setLocationShared(false); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl"
            >
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-7 h-7 text-white" />
                  <h2 className="text-xl font-bold text-white">Emergency SOS</h2>
                </div>
                <button
                  onClick={() => { setShowModal(false); setLocationShared(false); }}
                  className="text-white/80 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {locationShared && coords && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-green-800">Location Ready to Share</p>
                      <p className="text-xs text-green-600 mt-1">
                        {coords.lat.toFixed(4)}°N, {coords.lng.toFixed(4)}°W
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <a
                    href="tel:911"
                    className="flex items-center gap-4 w-full bg-red-600 hover:bg-red-700 text-white px-5 py-4 rounded-2xl font-semibold transition-colors text-left"
                  >
                    <Phone className="w-6 h-6 shrink-0" />
                    <div>
                      <div className="text-lg">Call 911</div>
                      <div className="text-red-200 text-sm font-normal">Emergency Services</div>
                    </div>
                  </a>

                  <a
                    href="tel:988"
                    className="flex items-center gap-4 w-full bg-purple-600 hover:bg-purple-700 text-white px-5 py-4 rounded-2xl font-semibold transition-colors text-left"
                  >
                    <Shield className="w-6 h-6 shrink-0" />
                    <div>
                      <div className="text-lg">Call 988</div>
                      <div className="text-purple-200 text-sm font-normal">Suicide & Crisis Lifeline</div>
                    </div>
                  </a>

                  <a
                    href="tel:1-800-222-1222"
                    className="flex items-center gap-4 w-full bg-orange-600 hover:bg-orange-700 text-white px-5 py-4 rounded-2xl font-semibold transition-colors text-left"
                  >
                    <AlertTriangle className="w-6 h-6 shrink-0" />
                    <div>
                      <div className="text-lg">Poison Control</div>
                      <div className="text-orange-200 text-sm font-normal">1-800-222-1222</div>
                    </div>
                  </a>
                </div>

                <p className="text-xs text-slate-400 text-center leading-relaxed">
                  If you are experiencing a life-threatening emergency, please call 911 immediately. This app is not a substitute for professional medical care.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
