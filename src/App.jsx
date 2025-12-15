import React, { useState } from 'react';
import StoryCard from './components/StoryCard';
import InputForm from './components/InputForm';
import { IntroSlide, DistanceSlide, TopSpeedSlide, ChallanSlide, SafetySlide, SummarySlide } from './components/Stats';
import { RotateCcw } from 'lucide-react';

// We define the slides, but component is rendered dynamically
const SLIDE_CONFIG = [
  { id: 'intro', component: IntroSlide, duration: 4000 },
  { id: 'distance', component: DistanceSlide, duration: 5500 },
  { id: 'speed', component: TopSpeedSlide, duration: 4500 },
  { id: 'challan', component: ChallanSlide, duration: 6000 },
  { id: 'safety', component: SafetySlide, duration: 5000 },
  { id: 'summary', component: SummarySlide, duration: 15000 }, // Long for sharing
];

function App() {
  const [userStats, setUserStats] = useState(null); // Data from input
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isFinished, setIsFinished] = useState(false);

  const handleStart = (data) => {
    setUserStats(data);
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const nextSlide = () => {
    if (currentIndex < SLIDE_CONFIG.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const resetAll = () => {
    setUserStats(null);
    setCurrentIndex(-1);
    setIsFinished(false);
  };

  const handleTap = (e) => {
    if (!userStats || isFinished) return;
    const { clientX, currentTarget } = e;
    const { width } = currentTarget.getBoundingClientRect();
    if (clientX < width / 3) {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  // Render Logic
  return (
    <main style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

      <style>{`
          @keyframes fillBar {
            from { width: 0%; }
            to { width: 100%; }
          }
       `}</style>

      {/* LOADING / INPUT PHASE */}
      {!userStats && (
        <InputForm onStart={handleStart} />
      )}

      {/* STORY PHASE */}
      {userStats && !isFinished && currentIndex >= 0 && (
        <div className="story-container" onClick={handleTap}>
          {/* Progress Bars */}
          <div style={{ position: 'absolute', top: 10, left: 0, width: '100%', padding: '0 10px', display: 'flex', gap: '4px', zIndex: 100 }}>
            {SLIDE_CONFIG.map((slide, idx) => (
              <div key={slide.id} style={{ height: '3px', flex: 1, background: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  background: '#00ff9d', // Active color
                  width: idx < currentIndex ? '100%' : '0%',
                  animation: idx === currentIndex ? `fillBar ${slide.duration}ms linear forwards` : 'none'
                }} />
              </div>
            ))}
          </div>

          {/* Active Slide */}
          {SLIDE_CONFIG.map((slide, index) => (
            index === currentIndex && (
              <StoryCard
                key={slide.id}
                duration={slide.duration}
                isActive={index === currentIndex}
                onComplete={nextSlide}
              >
                <slide.component
                  userName={userStats.userName}
                  distance={userStats.totalDistanceKm}
                  speed={userStats.topSpeedKh}
                  challans={userStats.challans}
                  accidents={userStats.accidents}
                  safetyScore={userStats.safetyScore}
                  stats={userStats}
                />
              </StoryCard>
            )
          ))}
        </div>
      )}

      {/* END / SUMMARY PHASE */}
      {isFinished && (
        <div style={{ textAlign: 'center', zIndex: 10 }}>
          <h1 className="text-gradient" style={{ marginBottom: '20px', fontSize: '3rem' }}>RIDE COMPLETE</h1>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button onClick={restart} className="button-primary" style={{ background: '#333', color: '#fff' }}>
              <RotateCcw size={18} style={{ marginRight: '8px' }} />
              Replay Wrapper
            </button>
            <button onClick={resetAll} className="button-primary" style={{ background: '#111', color: '#666', border: '1px solid #333' }}>
              New Rider
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
