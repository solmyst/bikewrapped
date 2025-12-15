import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Bike, MapPin, AlertTriangle, ShieldCheck, Share2, Wind, Frown, Gauge, Skull } from 'lucide-react';

/* Utility for counting up numbers */
const Counter = ({ value, duration = 2 }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const end = parseInt(value, 10);
        if (start === end) return;

        let timer = setInterval(() => {
            start += Math.ceil(end / (duration * 20)); // Approximate steps
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 50);
        return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count.toLocaleString()}</span>;
};

const SlideContainer = ({ children, bgStyle }) => (
    <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: '20px',
        position: 'relative',
        zIndex: 1,
        ...bgStyle
    }}>
        {children}
    </div>
);

export const IntroSlide = ({ userName }) => (
    <SlideContainer bgStyle={{ background: 'radial-gradient(circle at center, #1a1a1a 0%, #000 100%)' }}>
        <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 50, damping: 12 }}
        >
            <Bike size={80} color="#00ff9d" style={{ filter: 'drop-shadow(0 0 10px #00ff9d)' }} />
        </motion.div>
        <motion.h1
            className="text-gradient"
            style={{ fontSize: '3.5rem', lineHeight: 1.1, fontFamily: 'Arial Black, sans-serif' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
        >
            RIDE<br />REWIND<br />2024
        </motion.h1>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ borderTop: '2px solid #333', marginTop: '20px', paddingTop: '20px', width: '50%' }}
        >
            <p style={{ color: '#fff', fontSize: '1.2rem' }}>Hey, <b>{userName}</b>.</p>
        </motion.div>
    </SlideContainer>
);

export const DistanceSlide = ({ distance }) => (
    <SlideContainer bgStyle={{ background: 'linear-gradient(to bottom, #001a1a, #000)' }}>
        <MapPin size={40} color="#00ff9d" />
        <h2 style={{ color: '#aaa', letterSpacing: '2px', textTransform: 'uppercase' }}>Total Distance</h2>

        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
        >
            <h1 className="glow-green" style={{ fontSize: '4.5rem', fontWeight: '900', color: '#fff', margin: '20px 0' }}>
                <Counter value={distance} />
            </h1>
            <p style={{ fontSize: '1.5rem', color: '#00ff9d', fontWeight: 'bold' }}>KILOMETERS</p>
        </motion.div>

        <div style={{ marginTop: '40px', display: 'flex', gap: '10px' }}>
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{ width: '40px', height: '4px', background: '#333' }}
                    animate={{ background: ['#333', '#00ff9d', '#333'] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
            ))}
        </div>
    </SlideContainer>
);

export const TopSpeedSlide = ({ speed }) => (
    <SlideContainer bgStyle={{ background: 'linear-gradient(135deg, #2d0036 0%, #000 100%)' }}>
        <div style={{ position: 'relative' }}>
            <Gauge size={80} color="#bd00ff" />
            <motion.div
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '2px solid transparent', borderRadius: '50%' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
                <div style={{ width: '10px', height: '10px', background: '#bd00ff', borderRadius: '50%', position: 'absolute', top: 0, left: '50%' }} />
            </motion.div>
        </div>

        <h2 style={{ color: '#bd00ff', textTransform: 'uppercase', letterSpacing: '3px' }}>Top Speed</h2>

        <motion.h1
            style={{ fontSize: '7rem', fontStyle: 'italic', fontWeight: '900', color: '#fff', lineHeight: 0.9 }}
            animate={{ x: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 0.1 }}
        >
            {speed}
        </motion.h1>
        <p style={{ fontSize: '1.5rem', color: '#888' }}>KM/H</p>

        <motion.p
            style={{ color: '#fff', marginTop: '30px', background: '#bd00ff', padding: '5px 15px', transform: 'skew(-10deg)' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
        >
            {speed > 100 ? "FLYING LOW?" : "CRUISING ALTITUDE"}
        </motion.p>
    </SlideContainer>
);

export const ChallanSlide = ({ challans }) => (
    <SlideContainer bgStyle={{ background: 'repeating-linear-gradient(45deg, #111, #111 10px, #1a0000 10px, #1a0000 20px)' }}>
        <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
        >
            <AlertTriangle size={80} color="#ff3333" />
        </motion.div>

        <h2 style={{ color: '#ff3333', textTransform: 'uppercase', fontWeight: 'bold' }}>Law Breaker?</h2>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ margin: '20px 0', border: '2px solid #ff3333', padding: '20px', borderRadius: '10px', background: 'rgba(255, 51, 51, 0.1)' }}
        >
            <h1 className="glow-red" style={{ fontSize: '5rem', lineHeight: 1 }}>{challans.count}</h1>
            <p style={{ color: '#ff3333', fontWeight: 'bold' }}>VIOLATIONS</p>
        </motion.div>

        <p style={{ fontSize: '1.2rem', color: '#fff' }}>Paid <span style={{ color: '#ff3333', fontWeight: 'bold' }}>₹{challans.totalFine}</span> in fines.</p>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>(That's a lot of petrol money gone.)</p>
    </SlideContainer>
);

export const SafetySlide = ({ accidents, safetyScore }) => (
    <SlideContainer bgStyle={{ background: '#000' }}>
        {accidents > 0 ? (
            <>
                <Skull size={80} color="#fff" />
                <h1 style={{ fontSize: '3rem', color: '#fff' }}>Ouch.</h1>
                <p style={{ fontSize: '1.5rem', color: '#aaa' }}>{accidents} Accident(s)</p>
                <div style={{ height: '2px', width: '100px', background: '#333', margin: '20px 0' }}></div>
                <p>Heal up. Ride safer.</p>
            </>
        ) : (
            <>
                <ShieldCheck size={100} color="#00bfff" />
                <h1 style={{ fontSize: '3rem', color: '#00bfff' }}>Unstoppable.</h1>
                <p style={{ fontSize: '1.2rem', color: '#aaa' }}>Zero Accidents.</p>
            </>
        )}

        <div style={{ marginTop: 'auto', marginBottom: '50px' }}>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>SAFETY SCORE</p>
            <h2 style={{ fontSize: '4rem', color: accidents === 0 ? '#00bfff' : '#ff3333' }}>{safetyScore}</h2>
        </div>
    </SlideContainer>
);

export const SummarySlide = ({ stats }) => {
    // Calculate Rank
    const getRank = () => {
        const dist = parseInt(stats.totalDistanceKm || 0);
        const speed = parseInt(stats.topSpeedKh || 0);

        if (dist > 10000 && speed > 150) return { title: "APEX PREDATOR", color: "#bd00ff" };
        if (dist > 5000) return { title: "TARMAC VETERAN", color: "#00ff9d" };
        if (dist > 2000) return { title: "WEEKEND WARRIOR", color: "#ff9d00" };
        return { title: "ROOKIE RIDER", color: "#aaa" };
    };

    const rank = getRank();
    const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

    return (
        <SlideContainer bgStyle={{
            backgroundImage: `radial-gradient(circle at 50% 10%, #222 0%, #000 90%)`,
        }}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
                style={{
                    width: '90%',
                    maxWidth: '380px',
                    background: 'rgba(25, 25, 25, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
                    overflow: 'hidden',
                    position: 'relative',
                    padding: '0',
                    margin: '0 auto'
                }}
            >
                {/* Decorative Top Bar */}
                <div style={{ background: '#111', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' }}>
                    <div style={{ fontSize: '0.7rem', color: '#666', letterSpacing: '2px' }}>RIDER IDENTITY // 2024</div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff3333' }}></div>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff9d00' }}></div>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ff9d' }}></div>
                    </div>
                </div>

                <div style={{ padding: '25px', position: 'relative' }}>
                    {/* Background Graph Lines (Decoration) */}
                    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.05, pointerEvents: 'none' }}>
                        <path d="M0,50 Q150,150 400,50" stroke="#fff" fill="none" strokeWidth="2" />
                        <path d="M0,100 Q150,200 400,100" stroke="#fff" fill="none" strokeWidth="2" />
                    </svg>

                    {/* Header: Name & Rank */}
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px' }}>
                        <div style={{
                            width: '70px', height: '70px',
                            borderRadius: '15px',
                            background: `linear-gradient(135deg, ${rank.color}, #000)`,
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            boxShadow: `0 0 20px -5px ${rank.color}`
                        }}>
                            <Bike size={32} color="#fff" />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#fff', lineHeight: 1 }}>{stats.userName}</h2>
                            <div style={{
                                display: 'inline-block',
                                marginTop: '5px',
                                padding: '4px 8px',
                                background: `${rank.color}22`,
                                border: `1px solid ${rank.color}`,
                                borderRadius: '4px',
                                color: rank.color,
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                letterSpacing: '1px'
                            }}>
                                {rank.title}
                            </div>
                        </div>
                    </div>

                    {/* Grid Specs */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div style={{ background: '#111', padding: '12px', borderRadius: '10px', textAlign: 'left' }}>
                            <p style={{ color: '#666', fontSize: '0.65rem', marginBottom: '4px' }}>DISTANCE COVERED</p>
                            <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold' }}>{parseInt(stats.totalDistanceKm).toLocaleString()}<span style={{ fontSize: '0.7rem', color: '#444' }}>KM</span></p>
                        </div>
                        <div style={{ background: '#111', padding: '12px', borderRadius: '10px', textAlign: 'left' }}>
                            <p style={{ color: '#666', fontSize: '0.65rem', marginBottom: '4px' }}>TOP VELOCITY</p>
                            <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold' }}>{stats.topSpeedKh}<span style={{ fontSize: '0.7rem', color: '#444' }}>KM/H</span></p>
                        </div>
                        <div style={{ background: '#111', padding: '12px', borderRadius: '10px', textAlign: 'left' }}>
                            <p style={{ color: '#666', fontSize: '0.65rem', marginBottom: '4px' }}>TOTAL SORTIES</p>
                            <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold' }}>{stats.totalTrips}</p>
                        </div>
                        <div style={{ background: '#111', padding: '12px', borderRadius: '10px', textAlign: 'left' }}>
                            <p style={{ color: '#666', fontSize: '0.65rem', marginBottom: '4px' }}>SAFETY RATING</p>
                            <p style={{ color: rank.title === "APEX PREDATOR" ? '#bd00ff' : '#00ff9d', fontSize: '1.1rem', fontWeight: 'bold' }}>{stats.safetyScore}/100</p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{ marginTop: '30px', borderTop: '1px dashed #333', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ textAlign: 'left' }}>
                            <p style={{ color: '#444', fontSize: '0.6rem' }}>GENERATED ON</p>
                            <p style={{ color: '#888', fontSize: '0.8rem' }}>{date}</p>
                        </div>
                        {/* Fake Barcode */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', opacity: 0.5 }}>
                            {[...Array(10)].map((_, i) => (
                                <div key={i} style={{ width: Math.random() > 0.5 ? '2px' : '4px', height: '20px', background: '#fff' }}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.button
                className="button-primary"
                style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px', width: 'auto', padding: '15px 40px' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Share2 size={18} /> SAVE IMAGE
            </motion.button>
        </SlideContainer>
    );
};
