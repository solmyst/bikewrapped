import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bike, ArrowRight } from 'lucide-react';

const InputForm = ({ onStart }) => {
    const [formData, setFormData] = useState({
        userName: '',
        totalDistanceKm: '',
        totalTrips: '',
        topSpeedKh: '',
        challanCount: '0',
        challanFine: '0',
        accidents: '0',
        safetyScore: '100', // Default, maybe calculate?
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!formData.userName || !formData.totalDistanceKm) return;

        // Convert strings to numbers where needed
        const processedData = {
            ...formData,
            totalDistanceKm: parseInt(formData.totalDistanceKm) || 0,
            totalTrips: parseInt(formData.totalTrips) || 0,
            topSpeedKh: parseInt(formData.topSpeedKh) || 0,
            challans: {
                count: parseInt(formData.challanCount) || 0,
                totalFine: parseInt(formData.challanFine) || 0,
                reasons: ["Speeding", "Signal Jump", "Visible number plate missing?"] // Default mock reasons for now
            },
            accidents: parseInt(formData.accidents) || 0,
            safetyScore: parseInt(formData.accidents) > 0 ? Math.max(0, 100 - (parseInt(formData.accidents) * 20)) : 98
        };

        onStart(processedData);
    };

    return (
        <div className="story-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', overflowY: 'auto' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ width: '100%', maxWidth: '350px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        style={{ display: 'inline-block' }}
                    >
                        <Bike size={48} color="#00ff9d" />
                    </motion.div>
                    <h1 className="text-gradient" style={{ fontSize: '2rem', marginTop: '10px' }}>RIDE STATS</h1>
                    <p style={{ color: '#666' }}>Enter your 2024 details manually.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label className="biker-label">Rider Name / ID</label>
                        <input
                            type="text"
                            name="userName"
                            className="biker-input"
                            placeholder="e.g. GhostRider"
                            value={formData.userName}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ flex: 1 }}>
                            <label className="biker-label">Distance (KM)</label>
                            <input type="number" name="totalDistanceKm" className="biker-input" placeholder="0" value={formData.totalDistanceKm} onChange={handleChange} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label className="biker-label">Total Trips</label>
                            <input type="number" name="totalTrips" className="biker-input" placeholder="0" value={formData.totalTrips} onChange={handleChange} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label className="biker-label">Top Speed Reached (KM/H)</label>
                        <input type="number" name="topSpeedKh" className="biker-input" placeholder="0" value={formData.topSpeedKh} onChange={handleChange} />
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ flex: 1 }}>
                            <label className="biker-label">Challans Count</label>
                            <input type="number" name="challanCount" className="biker-input" placeholder="0" value={formData.challanCount} onChange={handleChange} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label className="biker-label">Total Fine (₹)</label>
                            <input type="number" name="challanFine" className="biker-input" placeholder="0" value={formData.challanFine} onChange={handleChange} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label className="biker-label">Accidents (Be Honest)</label>
                        <input type="number" name="accidents" className="biker-input" placeholder="0" value={formData.accidents} onChange={handleChange} />
                    </div>

                    <button type="submit" className="button-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                        Generate Wrapped <ArrowRight size={20} />
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default InputForm;
