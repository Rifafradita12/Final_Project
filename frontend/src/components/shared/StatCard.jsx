import React from 'react';
import './shared.css';

export default function StatCard({ title, value, icon: Icon, color = 'blue' }) {
    return (
        <div className={`stat-card ${color}`}>
            <div className="stat-icon">{Icon && <Icon size={22} />}</div>
            <div className="stat-body">
                <p className="stat-title">{title}</p>
                <h3 className="stat-value">{value}</h3>
            </div>
        </div>
    );
}
