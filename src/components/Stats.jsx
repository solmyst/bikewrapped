import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Bike, MapPin, AlertTriangle, ShieldCheck, Share2, Wind, Frown, Gauge, Skull } from 'lucide-react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

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
    const cardRef = useRef(null);

    // Calculate Rank
    const getRank = () => {
        const dist = parseInt(stats.totalDistanceKm || 0);
        const speed = parseInt(stats.topSpeedKh || 0);

        if (dist > 10000 && speed > 150) return { title: "APEX PREDATOR", desc: "You live in the fast lane.", color: "#bd00ff" };
        if (dist > 5000) return { title: "TARMAC VETERAN", desc: "The road is your home.", color: "#00ff9d" };
        if (dist > 2000) return { title: "WEEKEND WARRIOR", desc: "Living for the Sunday ride.", color: "#ff9d00" };
        return { title: "DAILY COMMUTER", desc: "Reliable. Consistent. Focused.", color: "#00bfff" };
    };

    const rank = getRank();

    const handleSave = async () => {
        if (cardRef.current === null) return;

        try {
            const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
            download(dataUrl, 'MotoRecap2024.png');
        } catch (err) {
            console.error('oops, something went wrong!', err);
        }
    };

    return (
        <SlideContainer bgStyle={{ background: '#050505' }}>
            <div
                ref={cardRef}
                style={{
                    width: '90%',
                    maxWidth: '380px',
                    background: '#0a0a0a',
                    borderRadius: '0px',
                    border: 'none',
                    overflow: 'hidden',
                    position: 'relative',
                    padding: '0',
                    boxShadow: '0 0 50px rgba(0,0,0,0.8)',
                    aspectRatio: '9/16', // Ratio for Stories
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Halftone / Dotted Pattern Background */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: 'radial-gradient(#222 1px, transparent 1px)',
                    backgroundSize: '10px 10px',
                    opacity: 0.5,
                    zIndex: 0
                }}></div>

                <div style={{ padding: '25px', position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>

                    {/* HEADER */}
                    <div style={{ marginBottom: '20px' }}>
                        <h1 style={{ fontSize: '2.5rem', lineHeight: 0.9, fontWeight: '900', color: '#00ff9d', textTransform: 'uppercase', fontFamily: 'Arial Black, sans-serif' }}>
                            MOTO<br />RECAP
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: '#fff', fontStyle: 'italic', fontWeight: 'bold' }}>Year on Two Wheels</p>
                        <p style={{ fontSize: '2rem', color: '#fff', fontWeight: 'bold', position: 'absolute', top: '25px', right: '25px' }}>2024</p>
                    </div>

                    {/* STATS GRID */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px 10px', marginTop: '10px' }}>

                        {/* Distance */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                <Bike size={14} /> TOTAL KILOMETERS
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#00ff9d', lineHeight: 1 }}>
                                {(stats.totalDistanceKm / 1000).toFixed(1)}k
                            </div>
                        </div>

                        {/* Trips */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                <MapPin size={14} /> TRIPS
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fff', lineHeight: 1 }}>
                                {stats.totalTrips}
                            </div>
                        </div>

                        {/* Speed */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                <Wind size={14} /> TOP SPEED (KMPH)
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#00ff9d', lineHeight: 1 }}>
                                {stats.topSpeedKh}
                            </div>
                        </div>

                        {/* Accidents */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                <AlertTriangle size={14} /> ACCIDENTS
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fff', lineHeight: 1 }}>
                                {stats.accidents}
                            </div>
                        </div>

                        {/* Challans */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                <Frown size={14} /> CHALLANS
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#00ff9d', lineHeight: 1 }}>
                                {stats.challans.count}
                            </div>
                        </div>

                        {/* Safety Score / Altitude Logic Mock */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                <ShieldCheck size={14} /> SAFETY SCORE
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fff', lineHeight: 1 }}>
                                {stats.safetyScore}
                            </div>
                        </div>
                    </div>

                    {/* PERSONALITY SECTION - BOTTOM */}
                    <div style={{ marginTop: 'auto', paddingTop: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fff', fontSize: '0.9rem', fontWeight: 'bold' }}>
                            <Bike size={16} /> RIDER PERSONALITY
                        </div>
                        <h1 style={{ fontSize: '2.8rem', lineHeight: 0.9, fontWeight: '900', color: '#00ff9d', textTransform: 'uppercase', fontFamily: 'Arial Black, sans-serif', marginTop: '5px', textShadow: '0 0 10px rgba(0,255,157,0.3)' }}>
                            {rank.title}
                        </h1>
                        <p style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '5px' }}>{rank.desc}</p>
                    </div>

                    {/* FOOTER */}
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #333', paddingTop: '10px' }}>
                        <div>
                            <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>@{stats.userName}</p>
                        </div>
                        <div style={{ color: '#00ff9d' }}>
                            <Bike size={24} />
                        </div>
                    </div>

                </div>
            </div>

            <motion.button
                onClick={handleSave}
                className="button-primary"
                style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', width: 'auto', padding: '15px 40px', zIndex: 10 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Share2 size={18} /> SAVE IMAGE
            </motion.button>
        </SlideContainer>
    );
};
