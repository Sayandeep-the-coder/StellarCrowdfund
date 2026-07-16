import React from 'react';
import './CampaignCard.css';

export default function CampaignCard({ campaign, onClick, onFund, publicKey, userContribution }) {
  const { id, title, description, goal, raised, deadline } = campaign;
  const status = String(campaign.status || 'Active');
  const progress = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;

  const XLM_TO_USD = 0.15; // Mock conversion rate
  const raisedUSD = (raised * XLM_TO_USD).toFixed(2);
  const goalUSD = (goal * XLM_TO_USD).toFixed(2);

  const getTimeRemaining = () => {
    if (status === 'Success') return 'Goal Reached';
    if (status === 'Failed') return 'Goal Not Met';
    if (status === 'Withdrawn') return 'Funds Withdrawn';

    const now = Date.now() / 1000;
    const diff = deadline - now;
    if (diff <= 0) return 'Ended';
    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    if (days > 0) return `${days}d ${hours}h left`;
    const minutes = Math.floor((diff % 3600) / 60);
    return `${hours}h ${minutes}m left`;
  };

  const badgeClass = {
    Active: 'badge-active',
    Success: 'badge-success',
    Failed: 'badge-failed',
    Withdrawn: 'badge-success',
  }[status] || 'badge-active';

  const isActive = status === 'Active' && (Date.now() / 1000) < deadline;

  // Distribute backgrounds sequentially to match Airtable's demo-grid style
  const getCardBgClass = (cid) => {
    const classes = ['card-peach', 'card-mint', 'card-cream', 'card-yellow'];
    return classes[cid % classes.length];
  };

  // Distribute height classes to make heights uneven
  const getCardHeightClass = (cid) => {
    return cid % 3 === 0 ? 'card-tall' : cid % 3 === 1 ? 'card-medium' : 'card-short';
  };

  return (
    <div 
      className={`campaign-card ${getCardBgClass(id)} ${getCardHeightClass(id)}`} 
      id={`campaign-card-${id}`}
    >
      {/* Clickable area for navigation */}
      <div className="card-clickable" onClick={() => onClick(id)}>
        {/* Card Header */}
        <div className="card-header">
          <div className="card-badge-row">
            <span className={`badge ${badgeClass}`}>
              <span className={`badge-dot badge-dot--${status.toLowerCase()}`} />
              {status}
            </span>
            <span className="card-time">{getTimeRemaining()}</span>
          </div>
          
          {userContribution > 0 && (
            <div className="user-contribution-badge">
              💎 Funded {userContribution.toFixed(1)} tokens
            </div>
          )}

          <h3 className="card-title">{title}</h3>
          <p className="card-desc">{description}</p>
        </div>

        {/* Progress */}
        <div className="card-progress-section">
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <div className="card-stats-row">
            <div className="card-stat">
              <div className="card-stat-value-group">
                <span className="card-stat-value">{raised.toFixed(1)}</span>
                <span className="card-stat-label">raised</span>
              </div>
              <span className="card-stat-usd">(${raisedUSD})</span>
            </div>
            <div className="card-stat card-stat--right">
              <div className="card-stat-value-group">
                <span className="card-stat-value">{goal.toFixed(1)}</span>
                <span className="card-stat-label">goal</span>
              </div>
              <span className="card-stat-usd">(${goalUSD})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with actions */}
      <div className="card-footer">
        <span className="card-percent">{progress.toFixed(0)}% funded</span>
        <div className="card-actions">
          {isActive && publicKey && onFund && (
            <button
              className="btn btn-pricing-pill btn-sm"
              onClick={(e) => { e.stopPropagation(); onFund(campaign); }}
              id={`btn-fund-card-${id}`}
            >
              Fund
            </button>
          )}
          <button
            className="btn btn-ghost btn-sm card-view-link"
            onClick={() => onClick(id)}
          >
            Details →
          </button>
        </div>
      </div>
    </div>
  );
}
