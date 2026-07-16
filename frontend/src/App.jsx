import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import ToastContainer from './components/ToastContainer.jsx';
import HomePage from './pages/HomePage.jsx';
import CampaignDetailPage from './pages/CampaignDetailPage.jsx';
import CreateCampaignPage from './pages/CreateCampaignPage.jsx';
import MyActivityPage from './pages/MyActivityPage.jsx';
import MetricsPage from './pages/MetricsPage.jsx';
import { useWallet } from './hooks/useWallet.js';
import { useToast } from './hooks/useToast.js';

export default function App() {
  const wallet = useWallet();
  const { toasts, show, update, dismiss } = useToast();
  const [page, setPage] = useState('home');
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);

  // ── Navigation ──────────────────────────────────────────────────────────

  const navigate = useCallback((target) => {
    setPage(target);
    setSelectedCampaignId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const selectCampaign = useCallback((id) => {
    setSelectedCampaignId(id);
    setPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ── Wallet Handlers ────────────────────────────────────────────────────

  const handleConnect = async () => {
    try {
      const key = await wallet.connect();
      show(`Connected: ${key.slice(0, 4)}…${key.slice(-4)}`, 'success');
    } catch (err) {
      show(err.message || 'Connection failed', 'error');
    }
  };

  const handleDisconnect = () => {
    wallet.disconnect();
    navigate('home');
    show('Wallet disconnected', 'success');
  };

  // ── Toast Bridge ────────────────────────────────────────────────────────
  // Pages call onToast(msg, type, existingId?) → returns toast id

  const handleToast = useCallback((message, type, existingId) => {
    if (existingId) {
      update(existingId, message, type);
      return existingId;
    }
    return show(message, type);
  }, [show, update]);

  // ── Render Page ─────────────────────────────────────────────────────────

  const renderPage = () => {
    switch (page) {
      case 'detail':
        return (
          <CampaignDetailPage
            publicKey={wallet.publicKey}
            campaignId={selectedCampaignId}
            onBack={() => navigate('home')}
            onToast={handleToast}
          />
        );

      case 'create':
        return wallet.publicKey ? (
          <CreateCampaignPage
            publicKey={wallet.publicKey}
            onSuccess={() => navigate('home')}
            onToast={handleToast}
          />
        ) : (
          <div className="empty-state" style={{ padding: '8rem 2rem' }}>
            <span className="empty-state-icon">🔒</span>
            <h3>Wallet Required</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Connect your Freighter wallet to create a campaign.
            </p>
            <button className="btn btn-primary" onClick={handleConnect}>
              🔗 Connect Wallet
            </button>
          </div>
        );

      case 'my':
        return wallet.publicKey ? (
          <MyActivityPage
            publicKey={wallet.publicKey}
            onSelectCampaign={selectCampaign}
          />
        ) : (
          <div className="empty-state" style={{ padding: '8rem 2rem' }}>
            <span className="empty-state-icon">🔒</span>
            <h3>Wallet Required</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Connect your Freighter wallet to see your activity.
            </p>
            <button className="btn btn-primary" onClick={handleConnect}>
              🔗 Connect Wallet
            </button>
          </div>
        );

      case 'metrics':
        return <MetricsPage publicKey={wallet.publicKey} />;

      default:
        return (
          <HomePage
            publicKey={wallet.publicKey}
            onSelectCampaign={selectCampaign}
            onNavigate={navigate}
            onToast={handleToast}
          />
        );
    }
  };

  return (
    <div className="app-container">
      <Navbar
        publicKey={wallet.publicKey}
        truncatedKey={wallet.truncatedKey}
        connecting={wallet.connecting}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        activePage={page}
        onNavigate={navigate}
      />

      <main className="app-main">
        {renderPage()}
      </main>

      <footer className="app-footer">
        <div className="container-centered">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="footer-brand-title">StellarCrowdfund</span>
              <p className="footer-brand-tagline">
                Decentralized crowdfunding built with institutional precision on Stellar and Soroban.
              </p>
            </div>
            <div className="footer-column">
              <h4>Platform</h4>
              <ul>
                <li><button className="btn-ghost text-link" style={{padding:0, textAlign:'left'}} onClick={() => navigate('home')}>Explore</button></li>
                <li><button className="btn-ghost text-link" style={{padding:0, textAlign:'left'}} onClick={() => navigate('metrics')}>Metrics</button></li>
                <li><button className="btn-ghost text-link" style={{padding:0, textAlign:'left'}} onClick={() => navigate('create')}>Create Campaign</button></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Solutions</h4>
              <ul>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Public Goods</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Creators</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Web3 Ventures</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Non-Profits</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="https://stellar.org" target="_blank" rel="noopener noreferrer">Stellar Network</a></li>
                <li><a href="https://www.freighter.app/" target="_blank" rel="noopener noreferrer">Freighter SDK</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>API Reference</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Status</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Learn</h4>
              <ul>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Guides</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Smart Contracts</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Stellar 101</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>F.A.Q.</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#" onClick={(e) => e.preventDefault()}>About Us</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Careers</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 StellarCrowdfund. Powered by Soroban Smart Contracts.</span>
            <div className="footer-legal-links">
              <a href="https://stellar.org" target="_blank" rel="noopener noreferrer">Stellar Network</a>
              <a href="https://www.freighter.app/" target="_blank" rel="noopener noreferrer">Freighter Wallet</a>
            </div>
          </div>
        </div>
      </footer>

      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
