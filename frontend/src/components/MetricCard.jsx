import React from 'react';

export default function MetricCard({ label, value, unit }) {
  return (
    <div className="metric-card glass-card">
      <span className="metric-label">{label}</span>
      <span className="metric-value">
        {value} {unit && <small>{unit}</small>}
      </span>
    </div>
  );
}
