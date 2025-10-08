'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function CompaniesContactSection() {
  // Refs for GSAP animations
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
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
          start: "top 65%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Subtitle animation
    gsap.fromTo(subtitleRef.current,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Button animation
    gsap.fromTo(buttonRef.current,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Contact link animation
    gsap.fromTo(contactRef.current,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-[#e0e7cf] relative min-h-[559px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/frame-34.png')" }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content Container */}
      <div className="relative z-10 text-center px-6 w-full max-w-4xl mx-auto">
        
        {/* Main Title */}
        <h2 ref={titleRef} className="font-messapia text-3xl md:text-4xl lg:text-5xl text-white mb-6 font-bold leading-none">
          Organize Event
        </h2>
        
        {/* Subtitle */}
        <p ref={subtitleRef} className="font-montserrat text-lg md:text-xl lg:text-2xl text-white leading-[1.3] mb-6 lg:mb-8 max-w-2xl mx-auto">
          Learn more about how you can be organize your own event at Hearth.
        </p>
        
        {/* Book a Tour Button */}
        <div ref={buttonRef} className="mb-6">
          <a 
            href="https://calendly.com/hearthcowork"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full md:inline-block md:w-auto bg-[#e0e7cf] text-neutral-700 px-6 md:px-24 py-4 rounded-full font-montserrat font-medium text-lg hover:bg-[#d4dcc5] transition-colors no-underline text-center"
          >
            Book a tour
          </a>
        </div>
        
        {/* Contact Us Link */}
        <div ref={contactRef} className="font-montserrat text-base text-white">
          <span>Have questions? </span>
          <a 
            href="mailto:hearthcowork@gmail.com?subject=Interest in Hosting an Event at Hearth&body=Hi there!%0A%0AI am super interested in hosting an event at Hearth! Your coworking and wellness space looks perfect for the type of gathering I have in mind.%0A%0ACould you share more details about your event hosting options, availability, and pricing?%0A%0AI'd love to discuss how we can make this happen!%0A%0AThanks so much,%0A%0ABest regards"
            className="font-bold text-white hover:underline transition-all no-underline"
          >
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}