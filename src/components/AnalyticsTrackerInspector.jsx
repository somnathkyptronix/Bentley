import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, CheckCircle2, ChevronUp, ChevronDown, X, Terminal } from 'lucide-react';
import { tracker } from '../services/analytics';

export default function AnalyticsTrackerInspector() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [newBadgeCount, setNewBadgeCount] = useState(0);

  useEffect(() => {
    // Initial events
    setEvents([...tracker.eventsHistory]);

    // Subscribe to new tracking dispatches
    const unsubscribe = tracker.subscribe((event, allEvents) => {
      setEvents([...allEvents]);
      setNewBadgeCount(prev => prev + 1);
    });

    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setNewBadgeCount(0);
  };

  return (
    <div className="tracker-inspector-root">
      
      {/* Trigger Button */}
      <button 
        onClick={handleToggle}
        className="tracker-trigger-btn"
        title="View live Meta Pixel, GA4 & Google Ads conversion tracking events"
        aria-label="Conversion tracking inspector"
      >
        <Activity size={15} className="pulse-icon" />
        <span>Conversion Tracking Active</span>
        {newBadgeCount > 0 && (
          <span className="events-count-pill">+{newBadgeCount}</span>
        )}
      </button>

      {/* Drawer */}
      {isOpen && (
        <div className="tracker-drawer">
          <div className="tracker-drawer-header">
            <div className="header-title-row">
              <Terminal size={17} />
              <h4>Marketing &amp; Retargeting Inspector</h4>
            </div>
            <button onClick={() => setIsOpen(false)} className="tracker-close">
              <X size={18} />
            </button>
          </div>

          <div className="tracker-status-strip">
            <div className="status-pill active">
              <CheckCircle2 size={13} /> Meta Pixel (fbq) Ready
            </div>
            <div className="status-pill active">
              <CheckCircle2 size={13} /> Google Analytics 4 Ready
            </div>
            <div className="status-pill active">
              <CheckCircle2 size={13} /> Google Ads Remarketing
            </div>
          </div>

          <p className="tracker-explainer">
            Below is the real-time event log dispatched as you browse, filter offers, and initiate enquiries. 
            These events feed audience retargeting pools for Google Ads and Meta Campaigns.
          </p>

          <div className="events-stream-list">
            {events.length === 0 ? (
              <div className="no-events">No conversion events logged yet. Interact with the website!</div>
            ) : (
              events.map(ev => (
                <div key={ev.id} className="event-log-item">
                  <div className="event-item-top">
                    <span className="event-name font-serif">{ev.eventName}</span>
                    <span className="event-time">{ev.timestamp}</span>
                  </div>
                  <div className="event-channels">
                    {ev.channels.map((ch, idx) => (
                      <span key={idx} className="channel-badge">{ch}</span>
                    ))}
                  </div>
                  {Object.keys(ev.params).length > 0 && (
                    <pre className="event-payload">
                      {JSON.stringify(ev.params, null, 2)}
                    </pre>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <style>{`
        .tracker-inspector-root {
          position: fixed;
          bottom: 20px;
          left: 20px;
          z-index: 95;
        }

        .tracker-trigger-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--color-primary);
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 0.45rem 0.9rem;
          border-radius: var(--radius-full);
          box-shadow: 0 4px 14px rgba(47, 69, 83, 0.35);
          border: 1px solid rgba(213, 202, 174, 0.4);
          transition: all var(--transition-fast);
        }

        .tracker-trigger-btn:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
        }

        .pulse-icon {
          color: #55E6A5;
        }

        .events-count-pill {
          background-color: #C29A38;
          color: #FFFFFF;
          font-size: 0.68rem;
          padding: 0.1rem 0.4rem;
          border-radius: var(--radius-full);
        }

        .tracker-drawer {
          position: absolute;
          bottom: 44px;
          left: 0;
          width: 380px;
          max-height: 480px;
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-xl);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: fadeIn 0.25s ease;
        }

        .tracker-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--color-primary);
          color: #FFFFFF;
          padding: 0.8rem 1rem;
        }

        .header-title-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 700;
        }

        .tracker-close {
          color: #FFFFFF;
          padding: 0.2rem;
        }

        .tracker-status-strip {
          display: flex;
          gap: 0.4rem;
          padding: 0.6rem 0.8rem;
          background-color: var(--bg-cream);
          border-bottom: 1px solid var(--color-sand);
          flex-wrap: wrap;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.68rem;
          font-weight: 700;
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-full);
          color: var(--color-primary);
        }

        .status-pill.active {
          color: #2F6F4E;
          border-color: #8CCBA6;
          background-color: #EDF7F2;
        }

        .tracker-explainer {
          font-size: 0.74rem;
          color: var(--color-text-muted);
          padding: 0.6rem 0.9rem;
          line-height: 1.4;
          border-bottom: 1px solid var(--color-sand);
        }

        .events-stream-list {
          flex: 1;
          overflow-y: auto;
          padding: 0.6rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-height: 300px;
        }

        .no-events {
          text-align: center;
          padding: 1.5rem 0.8rem;
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        .event-log-item {
          background-color: var(--bg-cream);
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-sm);
          padding: 0.6rem 0.8rem;
        }

        .event-item-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.3rem;
        }

        .event-name {
          font-weight: 700;
          font-size: 0.88rem;
          color: var(--color-primary);
        }

        .event-time {
          font-size: 0.68rem;
          color: var(--color-sage);
        }

        .event-channels {
          display: flex;
          gap: 0.3rem;
          flex-wrap: wrap;
          margin-bottom: 0.3rem;
        }

        .channel-badge {
          font-size: 0.62rem;
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          padding: 0.1rem 0.4rem;
          border-radius: var(--radius-sm);
          color: var(--color-text-body);
        }

        .event-payload {
          background-color: #22323D;
          color: #A9D5B8;
          font-size: 0.68rem;
          padding: 0.4rem;
          border-radius: 4px;
          overflow-x: auto;
          max-height: 100px;
        }

        @media (max-width: 768px) {
          .tracker-inspector-root {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
