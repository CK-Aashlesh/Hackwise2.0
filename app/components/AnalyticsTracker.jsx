'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Initialize Visitor ID
    let visitorId = localStorage.getItem('hw_visitor_id');
    if (!visitorId) {
      visitorId = uuidv4();
      localStorage.setItem('hw_visitor_id', visitorId);
    }

    const sendEvent = async (eventName, details = {}) => {
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitor_id: visitorId,
            event_name: eventName,
            page_url: window.location.pathname,
            referrer: document.referrer,
            details: {
              ...details,
              userAgent: navigator.userAgent,
              screen: `${window.screen.width}x${window.screen.height}`,
              language: navigator.language
            }
          }),
        });
      } catch (e) {
        console.error('Analytics failed', e);
      }
    };

    // Track Page View
    sendEvent('page_view');

    // Track Scroll Depth (Milestones: 25%, 50%, 75%, 100%)
    const scrollMilestones = new Set();
    const handleScroll = () => {
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      const milestone = Math.floor(scrollPercent * 4) * 25;
      
      if (milestone > 0 && !scrollMilestones.has(milestone)) {
        scrollMilestones.add(milestone);
        sendEvent('scroll_depth', { depth: milestone });
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Track Clicks (Delegation)
    const handleClick = (e) => {
      // Track only buttons or links for noise reduction
      const target = e.target.closest('button, a');
      if (target) {
        const text = target.innerText || target.getAttribute('aria-label') || 'unknown';
        const type = target.tagName.toLowerCase();
        sendEvent('click', { text: text.substring(0, 50), type });
      }
    };
    
    window.addEventListener('click', handleClick, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, [pathname, searchParams]);

  return null;
}

