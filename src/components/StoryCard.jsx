import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const StoryCard = ({ children, duration = 5000, onComplete, isActive }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setProgress(0);
            return;
        }

        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);

            if (elapsed >= duration) {
                clearInterval(interval);
                onComplete && onComplete();
            }
        }, 50);

        return () => clearInterval(interval);
    }, [isActive, duration, onComplete]);

    return (
        <div className="story-content" style={{ display: isActive ? 'flex' : 'none', flexDirection: 'column', height: '100%', width: '100%' }}>
            {/* Progress Bar Container - Rendered OUTSIDE to be visible for all slides? 
          Actually, usually stories show ALL user's segments at top. 
          For simplicity, we handle just THIS card's progress here, 
          but usually the Parent manages the global progress indicators. 
          Let's assume the parent passes us the UI for 'all progress bars' or we just show a single one for this card. 
          Let's stick to the parent managing the "header" bars, providing clear visibility. 
          
          However, for this component to be self-contained for the "current" slide visualization:
      */}

            <div className="card-body" style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', padding: '20px' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
};

export default StoryCard;
