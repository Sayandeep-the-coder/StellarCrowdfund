import React from 'react';

export default function HeroSection({ publicKey, onNavigate, stats }) {
  return (
    <section className="hero" id="hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Built on Stellar & Soroban
        </div>
        <h1 className="hero-title">
          Fund the <span className="gradient-text">Future</span> with
          <br />Blockchain Crowdfunding
        </h1>
        <p className="hero-subtitle">
          Launch your project on Stellar. Connect with a global network of backers.
          Transparent, secure, and fully on-chain.
        </p>
        <div className="hero-actions">
          {publicKey ? (
            <button className="btn btn-primary btn-lg" onClick={() => onNavigate('create')} id="btn-hero-create">
              🚀 Start a Campaign
            </button>
          ) : (
            <button className="btn btn-primary btn-lg" disabled>
              Connect Wallet to Start
            </button>
          )}
          <button className="btn btn-outline btn-lg" onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })} id="btn-hero-explore">
            Explore Projects ↓
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">{stats.total}</span>
            <span className="hero-stat-label">Campaigns</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value">{stats.active}</span>
            <span className="hero-stat-label">Active Now</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value">{stats.totalRaised.toFixed(0)}</span>
            <span className="hero-stat-label">Tokens Raised</span>
          </div>
        </div>
      </div>

      {/* Floating orbs */}
      <div className="hero-orb hero-orb--1" />
      <div className="hero-orb hero-orb--2" />
      <div className="hero-orb hero-orb--3" />
    </section>
  );
}
