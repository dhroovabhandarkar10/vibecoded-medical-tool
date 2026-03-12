import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SOSButton from './components/SOSButton';
import Landing from './pages/Landing';
import SymptomChecker from './pages/SymptomChecker';
import Results from './pages/Results';
import MapView from './pages/MapView';
import HealthHistory from './pages/HealthHistory';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/symptoms" element={<SymptomChecker />} />
          <Route path="/results" element={<Results />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/history" element={<HealthHistory />} />
        </Routes>
        <SOSButton />
      </div>
    </Router>
  );
}
