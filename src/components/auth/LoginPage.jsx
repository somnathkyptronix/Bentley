import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, User, ArrowLeft, ArrowRight, 
  Key, Sparkles, AlertCircle, CheckCircle2, Eye, EyeOff
} from 'lucide-react';
import { extrasService } from '../../services/extrasService';

export default function LoginPage({ initialRole = 'admin', onSuccess, onReturnToHome }) {
  const [role, setRole] = useState(initialRole); // 'admin' | 'guest'
  
  // Admin form state
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);

  // Guest form state
  const [guestRef, setGuestRef] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestError, setGuestError] = useState('');
  const [guestLoading, setGuestLoading] = useState(false);

  useEffect(() => {
    setRole(initialRole);
  }, [initialRole]);

  // Handle Admin Login
  const handleAdminSubmit = (e) => {
    if (e) e.preventDefault();
    setAdminError('');
    setAdminLoading(true);

    const res = extrasService.loginAdmin(adminUser, adminPass, rememberMe);
    setAdminLoading(false);
    if (res.success) {
      if (onSuccess) onSuccess('admin');
    } else {
      setAdminError(res.error || 'Invalid credentials. User: Admin, Password: Admin');
    }
  };

  // Quick fill demo credentials for Admin
  const handleQuickFillAdmin = () => {
    setAdminUser('Admin');
    setAdminPass('Admin');
    setAdminError('');
    const res = extrasService.loginAdmin('Admin', 'Admin', true);
    if (res.success && onSuccess) {
      onSuccess('admin');
    }
  };

  // Handle Guest Login
  const handleGuestSubmit = (e) => {
    if (e) e.preventDefault();
    setGuestError('');
    setGuestLoading(true);

    const res = extrasService.loginGuest(guestRef || 'BB-2026-STAY', guestName || 'Guest');
    setGuestLoading(false);
    if (res.success) {
      if (onSuccess) onSuccess('guest');
    } else {
      setGuestError(res.error || 'Invalid booking reference.');
    }
  };

  // Quick demo access for Guest
  const handleQuickFillGuest = () => {
    setGuestRef('BB-2026-STAY');
    setGuestName('Sarah Jenkins');
    setGuestError('');
    const res = extrasService.loginGuest('BB-2026-STAY', 'Sarah Jenkins');
    if (res.success && onSuccess) {
      onSuccess('guest');
    }
  };

  return (
    <div className="eys-luxury-auth-wrapper">
      
      {/* BACKGROUND AMBIENT GLOW & ORNAMENTS */}
      <div className="eys-auth-backdrop-glow" />

      {/* TOP COMPACT BAR */}
      <header className="eys-auth-nav">
        <div className="eys-auth-nav-inner">
          <button 
            type="button"
            onClick={onReturnToHome} 
            className="eys-auth-back-link"
          >
            <ArrowLeft size={16} />
            <span>Return to Cottage Website</span>
          </button>

          <div className="eys-auth-nav-brand">
            <span>Peak District &bull; Matlock</span>
          </div>
        </div>
      </header>

      {/* CENTERED WORKSPACE */}
      <main className="eys-auth-center-stage">
        
        {/* LUXURY LOGIN CARD */}
        <div className="eys-auth-card">
          
          {/* TOP EMBLEM & BRANDING */}
          <div className="eys-auth-card-top">
            <div className="eys-auth-logo-frame">
              <img src="/logo.jpg" alt="2 Bentley Bridge" className="eys-auth-logo-img" />
            </div>
            <span className="eys-auth-eyebrow">2 BENTLEY BRIDGE COTTAGES</span>
            <h1 className="eys-auth-heading font-serif">
              {role === 'admin' ? 'Management Access' : 'Guest Concierge Hub'}
            </h1>
            <p className="eys-auth-tagline">
              {role === 'admin' 
                ? 'Sign in to manage bookings, extras, services, and cottage pricing.'
                : 'Access your stay itinerary, booked extras, and host guidelines.'}
            </p>

            {/* SEGMENTED ROLE TABS */}
            <div className="eys-auth-segmented-control" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={role === 'admin'}
                className={`eys-auth-segment-btn ${role === 'admin' ? 'active' : ''}`}
                onClick={() => { setRole('admin'); setAdminError(''); }}
              >
                <ShieldCheck size={16} />
                <span>Owner / Admin Portal</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={role === 'guest'}
                className={`eys-auth-segment-btn ${role === 'guest' ? 'active' : ''}`}
                onClick={() => { setRole('guest'); setGuestError(''); }}
              >
                <User size={16} />
                <span>Guest Concierge</span>
              </button>
            </div>
          </div>

          {/* CARD BODY CONTENT */}
          <div className="eys-auth-card-body">
            
            {/* TAB 1: ADMIN LOGIN FORM */}
            {role === 'admin' && (
              <div className="eys-auth-pane">
                
                {/* Error Banner */}
                {adminError && (
                  <div className="eys-auth-alert-banner">
                    <AlertCircle size={17} />
                    <span>{adminError}</span>
                  </div>
                )}

                {/* Authorised Demo Credentials Banner */}
                <div className="eys-auth-demo-badge-card">
                  <div className="eys-auth-demo-header">
                    <div className="eys-auth-demo-label">
                      <Sparkles size={14} color="#c5a880" />
                      <span>Authorised Credentials</span>
                    </div>
                    <button 
                      type="button"
                      onClick={handleQuickFillAdmin}
                      className="eys-auth-demo-fill-btn"
                    >
                      1-Click Auto Login
                    </button>
                  </div>
                  <div className="eys-auth-demo-creds-row">
                    <span>User: <strong>Admin</strong></span>
                    <span className="dot">&bull;</span>
                    <span>Password: <strong>Admin</strong></span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleAdminSubmit} className="eys-auth-form">
                  <div className="eys-auth-field-group">
                    <label className="eys-auth-label">USERNAME</label>
                    <div className="eys-auth-input-wrapper">
                      <User size={18} className="eys-auth-input-icon" />
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Admin"
                        value={adminUser}
                        onChange={(e) => setAdminUser(e.target.value)}
                        className="eys-auth-text-input"
                        autoComplete="username"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="eys-auth-field-group">
                    <label className="eys-auth-label">PASSWORD</label>
                    <div className="eys-auth-input-wrapper">
                      <Lock size={18} className="eys-auth-input-icon" />
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="e.g. Admin"
                        value={adminPass}
                        onChange={(e) => setAdminPass(e.target.value)}
                        className="eys-auth-text-input"
                        autoComplete="current-password"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="eys-auth-toggle-pass"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>

                  <div className="eys-auth-meta-row">
                    <label className="eys-auth-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={rememberMe} 
                        onChange={(e) => setRememberMe(e.target.checked)} 
                        className="eys-auth-checkbox"
                      />
                      <span>Keep me signed in</span>
                    </label>
                    <div className="eys-auth-ssl-badge">
                      <CheckCircle2 size={13} color="#2e7d32" />
                      <span>SSL 256-bit Encrypted</span>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={adminLoading}
                    className="eys-auth-submit-btn"
                  >
                    <span>{adminLoading ? 'Verifying Credentials...' : 'Sign In to Admin Dashboard'}</span>
                    <ArrowRight size={17} />
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: GUEST LOGIN FORM */}
            {role === 'guest' && (
              <div className="eys-auth-pane">
                
                {/* Error Banner */}
                {guestError && (
                  <div className="eys-auth-alert-banner">
                    <AlertCircle size={17} />
                    <span>{guestError}</span>
                  </div>
                )}

                {/* Guest Demo Credentials Banner */}
                <div className="eys-auth-demo-badge-card">
                  <div className="eys-auth-demo-header">
                    <div className="eys-auth-demo-label">
                      <Sparkles size={14} color="#c5a880" />
                      <span>Demo Guest Reference</span>
                    </div>
                    <button 
                      type="button"
                      onClick={handleQuickFillGuest}
                      className="eys-auth-demo-fill-btn"
                    >
                      1-Click Demo Stay
                    </button>
                  </div>
                  <div className="eys-auth-demo-creds-row">
                    <span>Ref: <strong>BB-2026-STAY</strong></span>
                    <span className="dot">&bull;</span>
                    <span>Guest: <strong>Sarah Jenkins</strong></span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleGuestSubmit} className="eys-auth-form">
                  <div className="eys-auth-field-group">
                    <label className="eys-auth-label">BOOKING REFERENCE</label>
                    <div className="eys-auth-input-wrapper">
                      <Key size={18} className="eys-auth-input-icon" />
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. BB-2026-STAY"
                        value={guestRef}
                        onChange={(e) => setGuestRef(e.target.value)}
                        className="eys-auth-text-input"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="eys-auth-field-group">
                    <label className="eys-auth-label">LEAD GUEST NAME (OPTIONAL)</label>
                    <div className="eys-auth-input-wrapper">
                      <User size={18} className="eys-auth-input-icon" />
                      <input 
                        type="text" 
                        placeholder="e.g. Sarah Jenkins"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="eys-auth-text-input"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={guestLoading}
                    className="eys-auth-submit-btn"
                    style={{ marginTop: 12 }}
                  >
                    <span>{guestLoading ? 'Connecting to Concierge...' : 'Access My Stay Concierge'}</span>
                    <ArrowRight size={17} />
                  </button>
                </form>
              </div>
            )}

          </div>

          {/* CARD FOOTER */}
          <div className="eys-auth-card-footer">
            <span>2 Bentley Bridge Cottages &bull; Upper Lumsdale, Matlock, Derbyshire DE4 5LB</span>
          </div>

        </div>

        {/* BOTTOM QUICK RETURN LINK */}
        <div className="eys-auth-bottom-actions">
          <button 
            type="button"
            onClick={onReturnToHome}
            className="eys-auth-subtle-back"
          >
            <ArrowLeft size={14} />
            <span>Back to 2 Bentley Bridge Homepage</span>
          </button>
        </div>

      </main>

    </div>
  );
}
