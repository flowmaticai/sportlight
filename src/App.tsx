import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const TrainingRoadMap = lazy(() => import('./pages/TrainingRoadMap'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const OnlinePrograms = lazy(() => import('./pages/OnlinePrograms'));
const OnlineCoaching = lazy(() => import('./pages/OnlineCoaching'));
const AdminTestimonials = lazy(() => import('./pages/AdminTestimonials'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
  </div>
);

function AppContent() {
  const { isTransitioning } = useLanguage();

  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen">
          <Header />
          <div
            className="transition-opacity duration-300 ease-in-out"
            style={{ opacity: isTransitioning ? 0 : 1 }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/training-roadmap" element={<TrainingRoadMap />} />
                <Route path="/services" element={<Services />} />
                <Route path="/online-programs" element={<OnlinePrograms />} />
                <Route path="/online-coaching" element={<OnlineCoaching />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/admin/testimonials" element={<AdminTestimonials />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;