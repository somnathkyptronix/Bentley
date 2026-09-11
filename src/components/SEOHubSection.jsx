import React, { useState } from 'react';
import { Compass, CheckCircle2, Calendar, MapPin, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { tracker } from '../services/analytics';

const seoArticles = [
  {
    id: 'holiday-cottage-matlock',
    title: 'Holiday Cottage in Matlock',
    h1: 'Authentic English Holiday Cottage in Matlock & Upper Lumsdale',
    meta: 'Looking for a holiday cottage in Matlock? 2 Bentley Bridge Cottages provides a tranquil, limestone countryside haven minutes from Matlock centre, with wood-burning stove and private garden.',
    content: `When looking for a genuine holiday cottage in Matlock, travellers often find either modern town apartments or isolated remote lodges without amenities. 2 Bentley Bridge Cottages offers the idyllic middle ground: situated in the protected Upper Lumsdale valley, you enjoy profound silence, dark night skies, and birdsong, yet you are just four minutes drive (or a scenic 20-minute walk) from Crown Square, Matlock's bustling cafes, and local butcheries. Whether you plan to hike the Derwent Valley Mills, visit the Victorian parks, or curl up by the inglenook stove, our cottage is your welcoming home in Derbyshire.`,
    faq: [
      { q: 'How close is 2 Bentley Bridge Cottages to Matlock town centre?', a: 'The cottage is located in Upper Lumsdale, approximately 1.2 miles (4 minutes drive or 20 minutes walk) from Matlock town centre and Crown Square.' },
      { q: 'Is parking included at the cottage?', a: 'Yes, private dedicated off-road parking is included directly beside the cottage free of charge.' }
    ]
  },
  {
    id: 'peak-district-cottage',
    title: 'Peak District Cottage',
    h1: 'Character Peak District Holiday Cottage for Couples & Families',
    meta: 'Cosy 2-bedroom Peak District holiday cottage sleeping 4. Nestled near Bakewell, Chatsworth House, and Lumsdale gorge waterfalls. Book direct.',
    content: `The Peak District was the UK's very first National Park, revered worldwide for its heather-clad gritstone moors, dramatic limestone dales, and timeless dry stone walls. 2 Bentley Bridge Cottages places you right on the southern threshold of this breathtaking national park. From your front door, embark on picturesque trail walks through the ancient mills of Lumsdale, or take a short 15-minute drive to explore Mam Tor, Monsal Head, and the grand halls of Chatsworth House. After days exploring the peaks, return to sink into the heritage roll-top bath and unwind by the fire.`,
    faq: [
      { q: 'Can we access walking trails directly from the front door?', a: 'Absolutely. The famous Lumsdale Valley waterfall walk begins just 300 metres from your front door, linking to extensive Derbyshire footpath networks.' },
      { q: 'How far is Chatsworth House and Bakewell?', a: 'Bakewell is approximately 18 minutes away by car, and Chatsworth House & Gardens is approximately 20 minutes drive.' }
    ]
  },
  {
    id: 'dog-friendly-matlock',
    title: 'Dog-Friendly Cottage in Matlock',
    h1: 'Truly Dog-Friendly Holiday Cottage in Matlock, Derbyshire',
    meta: 'Bring your dog to 2 Bentley Bridge Cottages. Fully enclosed stone garden, complimentary dog welcome hamper, and endless Peak District trails.',
    content: `A countryside holiday isn't complete without your best friend. 2 Bentley Bridge Cottages proudly welcomes up to two well-behaved dogs. We have designed our space to make dog travel effortless: the cottage garden and sun patio are enclosed by dry stone walls and timber gates; we supply plush hound beds, drying towels, and stainless steel bowls; and our outdoor warm-water hose makes cleaning muddy paws after a woodland romp simple and stress-free. Most pubs and cafes in Matlock and Matlock Bath are warmly dog-friendly.`,
    faq: [
      { q: 'Is the cottage garden fully enclosed?', a: 'Yes, the garden patio is securely enclosed by traditional limestone dry stone walls and a latching timber gate.' },
      { q: 'What is the pet surcharge?', a: 'Standard direct bookings have a small £25 flat fee per stay for up to 2 dogs, which is waived during our Dog-Friendly Break promotion.' }
    ]
  },
  {
    id: 'weekend-break-derbyshire',
    title: 'Weekend Break in Derbyshire',
    h1: 'The Perfect Friday-to-Sunday Weekend Break in Derbyshire',
    meta: 'Unwind on a restorative weekend break in Derbyshire at 2 Bentley Bridge Cottages. Under 2.5 hours from London, Birmingham, and Manchester.',
    content: `Escape the bustle of city life with an effortless weekend retreat. Located under 2.5 hours from London, Birmingham, Leeds, and Manchester, 2 Bentley Bridge Cottages is the ideal destination for a weekend break. With self-check-in digital keycodes, you can arrive late on Friday evening, step into a warmed cottage with logs waiting by the stove, and immediately sink into relaxation. Our Weekend Escape packages include lazy Sunday 1:00 PM checkouts so you can truly enjoy your final morning without rushing.`,
    faq: [
      { q: 'What time is check-in and check-out?', a: 'Standard check-in is from 3:00 PM and check-out is by 10:00 AM. Weekend packages include complimentary late checkout until 1:00 PM.' },
      { q: 'Is self check-in available if we arrive late on Friday?', a: 'Yes, 24/7 keyless keypad entry allows you to arrive at your own convenience at any hour without coordinating key handovers.' }
    ]
  },
  {
    id: 'places-to-stay-near-matlock',
    title: 'Places to Stay Near Matlock',
    h1: 'Idyllic Boutique Places to Stay Near Matlock & Matlock Bath',
    meta: 'Discover why 2 Bentley Bridge Cottages is one of the highest-rated self-catering places to stay near Matlock and the Heights of Abraham.',
    content: `If you are evaluating places to stay near Matlock, self-catering at 2 Bentley Bridge Cottages gives you the privacy and freedom that hotels simply cannot match. With two private bedrooms (one king double and one twin), a bespoke country kitchen for home cooking, and a dedicated stone garden, our cottage sleeps up to four guests in pure comfort. Enjoy the independence of self-catering coupled with luxury boutique hotel touches: Egyptian cotton bed linens, fluffy bathrobes, and complimentary Bramley botanical toiletries.`,
    faq: [
      { q: 'How many people can stay at the cottage?', a: 'The cottage sleeps up to 4 guests across 2 bedrooms (1 King Double and 1 Twin with two single beds), plus space for an infant in a travel cot.' },
      { q: 'Is there fast Wi-Fi for remote work during our stay?', a: 'Yes, high-speed fibre broadband is available throughout the cottage and patio garden.' }
    ]
  },
  {
    id: 'things-to-do-in-matlock',
    title: 'Things to Do in Matlock',
    h1: 'Top Things to Do in Matlock & The Derwent Valley',
    meta: 'Explore the best activities in Matlock: Lumsdale Valley waterfalls, Heights of Abraham cable cars, Cromford Mills UNESCO heritage, and scenic Peak District walks.',
    content: `Matlock and the surrounding Derwent Valley boast some of the UK's most varied heritage and outdoor adventures. Highlights include riding the alpine-style cable cars at Heights of Abraham in Matlock Bath, exploring the UNESCO World Heritage industrial history at Sir Richard Arkwright's Cromford Mills, cycling the traffic-free Monsal Trail over monumental stone viaducts, and browsing vintage shops in Crown Square. Finish every adventure with a restorative pint in a centuries-old limestone tavern before returning to your fireside retreat.`,
    faq: [
      { q: 'What is the closest attraction to the cottage?', a: 'Lumsdale Valley and its historic waterfall gorge are located directly outside the cottage, just a 3-minute stroll down the lane.' },
      { q: 'Are there good restaurants and country pubs nearby?', a: 'Yes, Matlock and neighbouring villages offer exceptional dining from traditional gastropubs like The Packhorse to award-winning modern bistros.' }
    ]
  }
];

export default function SEOHubSection({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState(seoArticles[0].id);
  const [openFaq, setOpenFaq] = useState(null);

  const activeArticle = seoArticles.find(a => a.id === activeTab) || seoArticles[0];

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section id="seo-hub" className="seo-hub-section section-padding">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="eyebrow">Local Knowledge &amp; Guides</span>
          <h2 className="section-title">Destination Guides &amp; Trip Inspiration</h2>
          <p className="section-lead">
            Curated local insights to help you plan your getaway to Upper Lumsdale, Matlock, and the Peak District.
          </p>
        </div>

        {/* Tab Strip */}
        <div className="seo-tabs-bar">
          {seoArticles.map(article => (
            <button
              key={article.id}
              onClick={() => {
                setActiveTab(article.id);
                setOpenFaq(null);
                tracker.track('view_seo_guide_tab', { tab: article.title });
              }}
              className={`seo-tab-btn ${activeTab === article.id ? 'active' : ''}`}
            >
              {article.title}
            </button>
          ))}
        </div>

        {/* Article Body Card */}
        <div className="seo-article-card">
          <div className="seo-article-content">
            <span className="article-tag font-serif">Derbyshire Travel Guide</span>
            <h3 className="article-h1 font-serif">{activeArticle.h1}</h3>
            
            <p className="article-lead-text">
              {activeArticle.content}
            </p>

            {/* Quick Highlights Box */}
            <div className="article-highlights-box">
              <div className="box-title">Why 2 Bentley Bridge Cottages is the Ideal Base:</div>
              <div className="box-grid">
                <div className="box-item">
                  <CheckCircle2 size={16} className="box-check" />
                  <span>Sleeps 4 across 2 serene bedrooms</span>
                </div>
                <div className="box-item">
                  <CheckCircle2 size={16} className="box-check" />
                  <span>Genuinely dog-friendly with secure garden</span>
                </div>
                <div className="box-item">
                  <CheckCircle2 size={16} className="box-check" />
                  <span>Real wood-burning stove with logs provided</span>
                </div>
                <div className="box-item">
                  <CheckCircle2 size={16} className="box-check" />
                  <span>Direct booking savings &amp; welcome hamper</span>
                </div>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="seo-faqs-section">
              <h4 className="faqs-header font-serif">Frequently Asked Questions</h4>
              <div className="faqs-list">
                {activeArticle.faq.map((faqItem, fIdx) => (
                  <div key={fIdx} className="faq-item">
                    <button 
                      className="faq-question-btn" 
                      onClick={() => toggleFaq(fIdx)}
                      aria-expanded={openFaq === fIdx}
                    >
                      <span>{faqItem.q}</span>
                      {openFaq === fIdx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {openFaq === fIdx && (
                      <div className="faq-answer-pane">
                        <p>{faqItem.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Article Action CTA */}
            <div className="article-cta-row">
              <div className="article-cta-text">
                <strong>Plan your stay at 2 Bentley Bridge Cottages</strong>
                <span>Direct bookings receive guaranteed best rates &amp; flexible holds.</span>
              </div>
              <button 
                onClick={() => {
                  tracker.trackCheckAvailability(`SEO Guide: ${activeArticle.title}`);
                  onOpenBooking();
                }}
                className="btn-primary"
              >
                <Calendar size={16} />
                <span>Check Availability</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .seo-hub-section {
          background-color: var(--bg-cream);
        }

        .seo-tabs-bar {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }

        .seo-tab-btn {
          padding: 0.55rem 1.2rem;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-text-body);
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          transition: all var(--transition-fast);
        }

        .seo-tab-btn:hover {
          color: var(--color-primary);
          border-color: var(--color-stone);
        }

        .seo-tab-btn.active {
          background-color: var(--color-primary);
          color: #FFFFFF;
          border-color: var(--color-primary);
          box-shadow: 0 4px 10px rgba(47, 69, 83, 0.2);
        }

        .seo-article-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-lg);
          padding: 3rem;
          box-shadow: var(--shadow-sm);
          max-width: 960px;
          margin: 0 auto;
        }

        .article-tag {
          font-size: 0.9rem;
          font-style: italic;
          color: var(--color-sage);
          margin-bottom: 0.5rem;
          display: block;
        }

        .article-h1 {
          font-size: 2.1rem;
          color: var(--color-primary);
          margin-bottom: 1.4rem;
          line-height: 1.2;
        }

        .article-lead-text {
          font-size: 1.05rem;
          line-height: 1.75;
          color: var(--color-text-body);
          margin-bottom: 2rem;
        }

        .article-highlights-box {
          background-color: var(--bg-cream);
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-md);
          padding: 1.5rem 1.8rem;
          margin-bottom: 2.5rem;
        }

        .box-title {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-primary);
          margin-bottom: 1rem;
        }

        .box-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.8rem;
        }

        .box-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--color-text-body);
        }

        .box-check {
          color: var(--color-sage);
          flex-shrink: 0;
        }

        .seo-faqs-section {
          margin-bottom: 2.5rem;
        }

        .faqs-header {
          font-size: 1.5rem;
          color: var(--color-primary);
          margin-bottom: 1rem;
        }

        .faqs-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .faq-item {
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }

        .faq-question-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.2rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--color-primary);
          background-color: #FFFFFF;
          transition: background-color var(--transition-fast);
        }

        .faq-question-btn:hover {
          background-color: var(--bg-cream);
        }

        .faq-answer-pane {
          padding: 1rem 1.2rem;
          background-color: var(--bg-cream);
          border-top: 1px solid var(--color-sand);
          font-size: 0.92rem;
          line-height: 1.6;
          color: var(--color-text-muted);
        }

        .article-cta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding-top: 1.8rem;
          border-top: 1px solid var(--color-sand);
          flex-wrap: wrap;
        }

        .article-cta-text {
          display: flex;
          flex-direction: column;
        }

        .article-cta-text strong {
          color: var(--color-primary);
          font-size: 1.05rem;
        }

        .article-cta-text span {
          color: var(--color-text-muted);
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .seo-article-card {
            padding: 1.8rem 1.4rem;
          }
          .article-h1 {
            font-size: 1.7rem;
          }
          .box-grid {
            grid-template-columns: 1fr;
          }
          .article-cta-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
