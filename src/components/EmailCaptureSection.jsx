import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Sparkles, Shield } from 'lucide-react';
import { tracker } from '../services/analytics';

export default function EmailCaptureSection() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !email) return;

    // Track newsletter registration for Meta / Google Ads
    tracker.trackEmailLead(email, firstName);
    
    // Save to local storage mock subscriber list
    try {
      const subscribers = JSON.parse(localStorage.getItem('bbc_subscribers') || '[]');
      subscribers.push({ firstName, email, date: new Date().toISOString() });
      localStorage.setItem('bbc_subscribers', JSON.stringify(subscribers));
    } catch (err) {
      console.warn(err);
    }

    setSubmitted(true);
  };

  return (
    <section className="email-capture-section">
      <div className="container">
        <div className="email-capture-card">
          <div className="email-capture-inner">
            
            <div className="email-text-col">
              <span className="email-badge">
                <Sparkles size={13} className="badge-sparkle" /> VIP Priority Access
              </span>
              <h3 className="email-title font-serif">Get First Access to Available Weekends &amp; Special Rates</h3>
              <p className="email-desc">
                Weekend dates at 2 Bentley Bridge Cottages are typically booked 2–3 months ahead. 
                Join our private guest circle to receive notifications of new seasonal dates, cancellations, 
                and exclusive midweek offers before they are released elsewhere.
              </p>
              <div className="email-privacy-note">
                <Shield size={13} />
                <span>No spam, ever. Only genuine availability notices. Unsubscribe in 1 click.</span>
              </div>
            </div>

            <div className="email-form-col">
              {submitted ? (
                <div className="email-success-box">
                  <CheckCircle2 size={32} className="success-icon" />
                  <h4 className="font-serif">You are on the Priority List!</h4>
                  <p>
                    Thank you, <strong>{firstName}</strong>. We've sent a welcome note to <strong>{email}</strong>. 
                    You'll be first to know when new prime dates unlock.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="email-capture-form">
                  <div className="form-group">
                    <label htmlFor="newsletter-name" className="sr-only">First name</label>
                    <input 
                      type="text"
                      id="newsletter-name"
                      required
                      placeholder="Your First Name"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="email-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                    <input 
                      type="email"
                      id="newsletter-email"
                      required
                      placeholder="Your Email Address"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="email-input"
                    />
                  </div>

                  <button 
                    type="submit" 
                    id="newsletter-submit-btn"
                    className="btn-primary email-submit-btn"
                  >
                    <span>Send Me Available Dates</span>
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .email-capture-section {
          padding: 4.5rem 0;
          background-color: var(--bg-cream);
        }

        .email-capture-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-lg);
          padding: 3.2rem 3rem;
          box-shadow: var(--shadow-sm);
        }

        .email-capture-inner {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .email-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background-color: var(--color-sage-bg);
          color: var(--color-olive);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 0.9rem;
        }

        .badge-sparkle {
          color: var(--color-gold);
        }

        .email-title {
          font-size: 2.1rem;
          color: var(--color-primary);
          margin-bottom: 0.8rem;
          line-height: 1.2;
        }

        .email-desc {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          margin-bottom: 1.2rem;
        }

        .email-privacy-note {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: var(--color-sage);
        }

        .email-capture-form {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          background-color: var(--bg-cream);
          padding: 2rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-sand);
        }

        .email-input {
          width: 100%;
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          padding: 0.85rem 1.1rem;
          border-radius: var(--radius-sm);
          font-size: 0.92rem;
          color: var(--color-text-body);
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .email-input:focus {
          border-color: var(--color-primary);
        }

        .email-submit-btn {
          width: 100%;
          padding: 0.95rem;
          font-size: 0.95rem;
          font-weight: 700;
        }

        .email-success-box {
          text-align: center;
          background-color: var(--color-sage-bg);
          border: 1px solid var(--color-sage);
          padding: 2.2rem 1.8rem;
          border-radius: var(--radius-md);
          color: var(--color-olive);
        }

        .success-icon {
          color: var(--color-olive);
          margin: 0 auto 0.8rem auto;
        }

        .email-success-box h4 {
          font-size: 1.5rem;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .email-success-box p {
          font-size: 0.92rem;
          line-height: 1.55;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }

        @media (max-width: 900px) {
          .email-capture-inner {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .email-capture-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
