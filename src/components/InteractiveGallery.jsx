import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { tracker } from '../services/analytics';

const galleryItems = [
  {
    id: 1,
    title: '2 Bentley Bridge Cottages Exterior',
    category: 'The Cottage',
    image: '/web/sc_1785924000_1205377_1.webp',
    description: 'Charming characterful stone holiday cottage in Matlock, Derbyshire, set in the peaceful Lumsdale Valley.'
  },
  {
    id: 2,
    title: 'Front Entrance & Porch',
    category: 'The Cottage',
    image: '/web/sc_1785924008_1205377_2.webp',
    description: 'Welcoming front entrance with flowering cottage garden beds and traditional stone architecture.'
  },
  {
    id: 3,
    title: 'Cosy Sitting Room & Woodburning Stove',
    category: 'Living Spaces',
    image: '/web/sc_1785924019_1205377_4.webp',
    description: 'The warm focal point of the cottage: exposed stone wall, roaring woodburning stove, and comfortable seating.'
  },
  {
    id: 4,
    title: 'Sitting Room & Open-Tread Staircase',
    category: 'Living Spaces',
    image: '/web/sc_1785924014_1205377_3.webp',
    description: 'Characterful living area featuring open-tread timber staircase, deep leather sofa, and period details.'
  },
  {
    id: 5,
    title: 'Exposed Stone Archway to Dining Area',
    category: 'Living Spaces',
    image: '/web/sc_1785924025_1205377_5.webp',
    description: 'Striking original exposed gritstone archway framing the seamless flow from sitting room into dining.'
  },
  {
    id: 6,
    title: 'Dining Area & Period Stonework',
    category: 'Living Spaces',
    image: '/web/sc_1785924031_1205377_6.webp',
    description: 'Dining table with chairs for four guests beneath the stone archway for shared holiday breakfasts and evening meals.'
  },
  {
    id: 7,
    title: 'Dining Table View to Shaker Kitchen',
    category: 'Living Spaces',
    image: '/web/sc_1785924036_1205377_7.webp',
    description: 'Inviting dining area looking toward the bespoke sage green shaker cabinetry and morning window light.'
  },
  {
    id: 8,
    title: 'Fully Fitted Sage Shaker Kitchen',
    category: 'Living Spaces',
    image: '/web/sc_1785924051_1205377_10.webp',
    description: 'Bespoke shaker-style kitchen equipped with electric oven, gas hob, microwave, fridge, and dishwasher.'
  },
  {
    id: 9,
    title: 'Fitted Kitchen Hob & Cabinetry',
    category: 'Living Spaces',
    image: '/web/sc_1785924041_1205377_8.webp',
    description: 'Gas hob, extractor hood, microwave, and sage shaker cupboards stocked with all culinary essentials.'
  },
  {
    id: 10,
    title: 'Traditional Belfast Sink & Worktops',
    category: 'Living Spaces',
    image: '/web/sc_1785924046_1205377_9.webp',
    description: 'Deep ceramic Belfast sink with mixer tap, wooden worktops, and cottage casement window.'
  },
  {
    id: 11,
    title: 'Master Double Bedroom & Smart TV',
    category: 'Bedrooms',
    image: '/web/sc_1785924057_1205377_11.webp',
    description: 'Inviting double bedroom with wooden bedstead, crisp bed linen, bedside lighting, and dedicated Smart TV.'
  },
  {
    id: 12,
    title: 'Double Bedroom Bedstead & Bedside Comfort',
    category: 'Bedrooms',
    image: '/web/sc_1785924062_1205377_12.webp',
    description: 'Peaceful bedroom retreat designed for a restful night after long countryside rambles.'
  },
  {
    id: 13,
    title: 'Master Bedroom Wardrobe & Window',
    category: 'Bedrooms',
    image: '/web/sc_1785924067_1205377_13.webp',
    description: 'Spacious wardrobe storage and cottage window overlooking peaceful Upper Lumsdale.'
  },
  {
    id: 14,
    title: 'Twin Bedroom with Two Single Beds',
    category: 'Bedrooms',
    image: '/web/sc_1785924072_1205377_14.webp',
    description: 'Two comfortable single beds with cheerful bumblebee accent cushions for children or friends.'
  },
  {
    id: 15,
    title: 'Twin Bedroom Wall-Mounted Smart TV',
    category: 'Bedrooms',
    image: '/web/sc_1785924077_1205377_15.webp',
    description: 'Twin bedroom equipped with wall-mounted Smart TV and natural daylight.'
  },
  {
    id: 16,
    title: 'Stone Steps Leading to Private Patio',
    category: 'Outside',
    image: '/web/sc_1785924104_1205377_20.webp',
    description: 'Character stone steps with safety handrail leading down to the private enclosed rear patio garden.'
  },
  {
    id: 17,
    title: 'Private Patio Garden with Bistro Furniture',
    category: 'Outside',
    image: '/web/sc_1786456245_1205377_27.webp',
    description: 'Sun-trap patio corner with bistro table and cushioned chairs for morning coffees or evening drinks.'
  },
  {
    id: 18,
    title: 'Patio Garden & Lumsdale Valley Views',
    category: 'Outside',
    image: '/web/sc_1786456264_1205377_30.webp',
    description: 'Elevated view from steps looking across stone roofs to the lush green hills of the Peak District.'
  },
  {
    id: 19,
    title: 'Enclosed Courtyard & Outbuilding',
    category: 'Outside',
    image: '/web/sc_1786456238_1205377_26.webp',
    description: 'Overhead view of the slate paved private patio, stone outbuilding, and drystone boundary walls.'
  },
  {
    id: 20,
    title: 'Rear Stone Cottage Elevation',
    category: 'The Cottage',
    image: '/web/sc_1785924110_1205377_21.webp',
    description: 'Authentic Derbyshire gritstone masonry and rear cottage door opening onto the patio steps.'
  },
  {
    id: 21,
    title: 'Paved Pathway & Traditional Stone Barn',
    category: 'Outside',
    image: '/web/sc_1785924117_1205377_22.webp',
    description: 'Slate path and gravel borders beside historic stone walls leading to the garden entrance.'
  },
  {
    id: 22,
    title: 'Historic Derbyshire Stone Courtyard',
    category: 'The Cottage',
    image: '/web/sc_1786348558_1205377_23.webp',
    description: 'Heritage stone architecture and slate roofing characteristic of picturesque Matlock settlements.'
  }
];

const categories = ['All', 'The Cottage', 'Bedrooms', 'Living Spaces', 'Outside'];

export default function InteractiveGallery({ onOpenBooking }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (index) => {
    setActiveLightboxIndex(index);
    tracker.track('view_gallery_fullscreen', {
      image_title: filteredItems[index].title,
      category: filteredItems[index].category
    });
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredItems.length]);

  return (
    <section id="gallery" className="gallery-section section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">Visual Journey</span>
          <h2 className="section-title">An Immersive Gallery</h2>
          <p className="section-lead">
            Take a closer look at the cottage, our peaceful enclosed garden, and the breathtaking Derbyshire scenery 
            right outside the gate.
          </p>
        </div>

        {/* Category Filters */}
        <div className="gallery-filters-wrapper">
          <div className="gallery-filters">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  tracker.track('gallery_category_filter', { category: cat });
                }}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="gallery-card"
              onClick={() => openLightbox(index)}
            >
              <div className="gallery-card-inner">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="gallery-thumb"
                  loading="lazy"
                />
                <div className="gallery-card-overlay">
                  <div className="gallery-card-meta">
                    <span className="gallery-badge">{item.category}</span>
                    <h4 className="gallery-item-title font-serif">{item.title}</h4>
                  </div>
                  <div className="gallery-expand-icon">
                    <Maximize2 size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Bottom Conversion Hook */}
        <div className="gallery-bottom-cta">
          <div className="gallery-cta-box">
            <div className="gallery-cta-text">
              <h3 className="font-serif">Ready to experience this in person?</h3>
              <p>Direct bookings receive best rate guarantee, free dog hamper &amp; flexible 48h date holds.</p>
            </div>
            <button 
              onClick={() => {
                tracker.trackCheckAvailability('Gallery Bottom CTA');
                onOpenBooking();
              }}
              className="btn-primary"
            >
              <Calendar size={16} />
              <span>Check Cottage Availability</span>
            </button>
          </div>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-modal" onClick={e => e.stopPropagation()}>
            
            {/* Top Toolbar */}
            <div className="lightbox-topbar">
              <div className="lightbox-count">
                <span>{activeLightboxIndex + 1} of {filteredItems.length}</span>
                <span className="lightbox-cat-badge">{filteredItems[activeLightboxIndex].category}</span>
              </div>
              <button 
                onClick={closeLightbox}
                className="lightbox-close-btn"
                aria-label="Close fullscreen gallery"
              >
                <X size={26} />
              </button>
            </div>

            {/* Media Area with Prev/Next */}
            <div className="lightbox-media-container">
              <button 
                onClick={prevImage} 
                className="lightbox-nav-btn prev"
                aria-label="Previous photo"
              >
                <ChevronLeft size={32} />
              </button>

              <div className="lightbox-img-wrapper">
                <img 
                  src={filteredItems[activeLightboxIndex].image} 
                  alt={filteredItems[activeLightboxIndex].title}
                  className="lightbox-img" 
                />
              </div>

              <button 
                onClick={nextImage} 
                className="lightbox-nav-btn next"
                aria-label="Next photo"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Bottom Caption & Quick CTA */}
            <div className="lightbox-caption-bar">
              <div className="lightbox-info">
                <h4 className="font-serif">{filteredItems[activeLightboxIndex].title}</h4>
                <p>{filteredItems[activeLightboxIndex].description}</p>
              </div>
              <button 
                onClick={() => {
                  closeLightbox();
                  onOpenBooking();
                }}
                className="btn-primary lightbox-cta"
              >
                <Calendar size={15} />
                <span>Check Availability</span>
              </button>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .gallery-section {
          background-color: #FFFFFF;
          border-top: 1px solid var(--color-sand);
          border-bottom: 1px solid var(--color-sand);
        }

        .gallery-filters-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 2.8rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .gallery-filters {
          display: inline-flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
        }

        .filter-btn {
          padding: 0.55rem 1.2rem;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-text-muted);
          background-color: var(--bg-cream);
          border: 1px solid var(--color-sand);
          transition: all var(--transition-fast);
        }

        .filter-btn:hover {
          color: var(--color-primary);
          border-color: var(--color-stone);
        }

        .filter-btn.active {
          background-color: var(--color-primary);
          color: #FFFFFF;
          border-color: var(--color-primary);
          box-shadow: 0 4px 10px rgba(47, 69, 83, 0.2);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 3.5rem;
        }

        .gallery-card {
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          border: 1px solid var(--color-sand);
          background-color: var(--bg-cream);
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition-smooth), box-shadow var(--transition-smooth);
        }

        .gallery-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-stone);
        }

        .gallery-card-inner {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }

        .gallery-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-card:hover .gallery-thumb {
          transform: scale(1.06);
        }

        .gallery-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(46, 42, 28, 0.85) 0%, rgba(46, 42, 28, 0.1) 60%, transparent 100%);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 1.4rem;
          opacity: 0.92;
          transition: opacity var(--transition-fast);
        }

        .gallery-badge {
          display: inline-block;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 700;
          color: var(--color-sand);
          margin-bottom: 0.25rem;
        }

        .gallery-item-title {
          font-size: 1.15rem;
          color: #FFFFFF;
          font-weight: 500;
        }

        .gallery-expand-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          flex-shrink: 0;
          transition: background var(--transition-fast);
        }

        .gallery-card:hover .gallery-expand-icon {
          background: var(--color-primary);
        }

        /* Gallery Bottom CTA */
        .gallery-bottom-cta {
          background: var(--bg-cream);
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-md);
          padding: 2.2rem 2.8rem;
        }

        .gallery-cta-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .gallery-cta-text h3 {
          font-size: 1.7rem;
          margin-bottom: 0.35rem;
          color: var(--color-primary);
        }

        .gallery-cta-text p {
          font-size: 0.95rem;
          color: var(--color-text-muted);
        }

        /* Lightbox Modal */
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          z-index: 120;
          background-color: rgba(34, 50, 61, 0.96);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .lightbox-modal {
          width: 100%;
          max-width: 1100px;
          max-height: 94vh;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .lightbox-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.8rem 0;
          color: #FFFFFF;
        }

        .lightbox-count {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.88rem;
          color: var(--color-sand);
        }

        .lightbox-cat-badge {
          background: rgba(255, 255, 255, 0.15);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          color: #FFFFFF;
        }

        .lightbox-close-btn {
          color: #FFFFFF;
          padding: 0.4rem;
          border-radius: 50%;
          transition: background var(--transition-fast);
        }

        .lightbox-close-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .lightbox-media-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          min-height: 380px;
          max-height: 68vh;
        }

        .lightbox-img-wrapper {
          max-width: 100%;
          max-height: 68vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-img {
          max-width: 100%;
          max-height: 68vh;
          object-fit: contain;
          border-radius: var(--radius-sm);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        }

        .lightbox-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(47, 69, 83, 0.65);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
          z-index: 5;
        }

        .lightbox-nav-btn:hover {
          background: var(--color-primary);
          transform: translateY(-50%) scale(1.08);
        }

        .lightbox-nav-btn.prev {
          left: 1rem;
        }

        .lightbox-nav-btn.next {
          right: 1rem;
        }

        .lightbox-caption-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.2rem 0;
          color: #FFFFFF;
          gap: 1.5rem;
        }

        .lightbox-info h4 {
          font-size: 1.4rem;
          color: #FFFFFF;
          margin-bottom: 0.3rem;
        }

        .lightbox-info p {
          color: var(--color-sand);
          font-size: 0.9rem;
        }

        .lightbox-cta {
          white-space: nowrap;
          padding: 0.75rem 1.4rem;
        }

        @media (max-width: 900px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .gallery-bottom-cta {
            padding: 1.8rem;
          }
        }

        @media (max-width: 600px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
          .lightbox-nav-btn {
            width: 40px;
            height: 40px;
          }
          .lightbox-caption-bar {
            flex-direction: column;
            align-items: flex-start;
          }
          .lightbox-cta {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
