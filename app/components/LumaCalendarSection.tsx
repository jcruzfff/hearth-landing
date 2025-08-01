'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
import { formatEventDate, formatEventDateShort } from '@/lib/luma-api';

// Define LumaEvent type locally since we're not importing it anymore
interface LumaEvent {
  api_id: string;
  name: string;
  start_at: string;
  cover_url?: string;
  url: string;
}

// Enhanced Event type that can handle both Luma API data and fallback data
interface Event {
  id: string;
  title: string;
  date: string;
  image: string;
  subtitle: string;
  lumaUrl?: string;
}

// Fallback event data - used when API is unavailable or during development
const fallbackEvents: Event[] = [
  {
    id: "fallback-1",
    title: "Crypto over Tea",
    date: "24 July",
    image: "/event1.png",
    subtitle: "Hearth."
  },
  {
    id: "fallback-2",
    title: "Crypto over Tea", 
    date: "21/05",
    image: "/event2.png",
    subtitle: "Hearth."
  },
  {
    id: "fallback-3",
    title: "After Dark",
    date: "14/05", 
    image: "/event3.png",
    subtitle: "Hearth."
  },
  {
    id: "fallback-4",
    title: "Sip & Paint",
    date: "6/05",
    image: "/event4.png", 
    subtitle: "Night at Hearth."
  }
];

// Fallback images for events that don't have cover images
const fallbackImages = ["/event1.png", "/event2.png", "/event3.png", "/event4.png"];

// Helper function to get the best available image from Luma event
function getLumaEventImage(lumaEvent: LumaEvent, fallbackIndex: number): string {
  // Use the cover_url from Luma API
  if (lumaEvent.cover_url) {
    return lumaEvent.cover_url;
  }

  // Only use fallback images if no Luma image is available
  return fallbackImages[fallbackIndex % fallbackImages.length];
}

// Convert Luma API event to our Event interface
function transformLumaEvent(lumaEvent: LumaEvent, index: number): Event {
  return {
    id: lumaEvent.api_id,
    title: lumaEvent.name,
    date: formatEventDate(lumaEvent.start_at),
    image: getLumaEventImage(lumaEvent, index),
    subtitle: "Hearth.",
    lumaUrl: lumaEvent.url
  };
}

interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  const [imageError, setImageError] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState(event.image);

  const handleImageError = () => {
    setImageError(true);
    
    // If it's a Luma image that failed, try a fallback
    if (!currentImageSrc.startsWith('/event')) {
      const fallbackIndex = parseInt(event.id.slice(-1)) || 0;
      const fallbackSrc = fallbackImages[fallbackIndex % fallbackImages.length];
      setCurrentImageSrc(fallbackSrc);
      setImageError(false);
    }
  };

  return (
    <a 
      href={event.lumaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center group cursor-pointer no-underline"
    >
      {/* Event Image */}
      <div className="relative w-full aspect-square max-w-[337px] mb-4 group-hover:scale-105 group-hover:shadow-xl transition-all duration-500 ease-out rounded-[36px] overflow-hidden">
        <Image
          src={currentImageSrc}
          alt={`${event.title} event`}
          fill
          className="object-cover"
          onError={handleImageError}
          priority={false}
        />

      </div>
      
      {/* Event Date */}
      <div className="text-center">
        <p className="font-messapia text-2xl lg:text-[29px] text-neutral-700 font-bold group-hover:text-[#8d9984] transition-colors duration-300">
          {event.date}
        </p>
      </div>
    </a>
  );
}

export default function LumaCalendarSection() {
  const [events, setEvents] = useState<Event[]>(fallbackEvents);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Refs for GSAP animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Fetching upcoming events...');
        
        // Fetch events from our Next.js API route (which proxies to Luma)
        const response = await fetch('/api/events');
        
        if (!response.ok) {
          throw new Error(`API response was not ok: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.events.length > 0) {
          // Transform Luma events to our Event interface
          const transformedEvents = data.events.map((lumaEvent: LumaEvent, index: number) => 
            transformLumaEvent(lumaEvent, index)
          );
          
          console.log(`✅ Loaded ${transformedEvents.length} upcoming events from Luma`);
          
          setEvents(transformedEvents);
        } else {
          // Keep fallback events if no Luma events found
          console.log('⚠️ No upcoming events found, using fallback events');
        }
      } catch (err) {
        console.error('❌ Failed to fetch events:', err);
        setError('Failed to load events');
        // Keep fallback events on error
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!loading) {
      // Title animation
      gsap.fromTo(titleRef.current, 
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cards animation - stagger effect
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(cards,
          {
            opacity: 0,
            y: 60,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Button animation
      gsap.fromTo(buttonRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [loading, events]);

  return (
    <section ref={sectionRef} className="bg-[#faf9f8] py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-40">
        
        {/* Section Title */}
        <h2 ref={titleRef} className="font-messapia text-3xl md:text-4xl lg:text-5xl text-center text-neutral-700 mb-12 lg:mb-16 font-bold">
          Our Upcoming Events
        </h2>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#8d9984]"></div>
            <p className="mt-4 text-neutral-600 font-montserrat">Loading events...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-8 mb-8">
            <p className="text-red-600 font-montserrat mb-2">{error}</p>
            <p className="text-neutral-600 font-montserrat text-sm">Showing sample events below</p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && (
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* View All Events Button */}
        {!loading && (
          <div className="text-center mt-12 lg:mt-16">
            <a 
              ref={buttonRef}
              href="https://lu.ma/hearthgatherings"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#8d9984] text-[#f4eee3] px-24 py-4 rounded-full font-montserrat font-medium text-lg hover:bg-[#7a8671] transition-colors no-underline"
            >
              View All Events
            </a>
          </div>
        )}
      </div>
    </section>
  );
}