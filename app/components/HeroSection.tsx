'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Refs for GSAP animations
  const logoRef = useRef(null);
  const contactButtonRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const mobileImageRef = useRef(null);
  const desktopImageRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // GSAP Animations
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Set initial states
    gsap.set([logoRef.current, contactButtonRef.current, headlineRef.current, subtitleRef.current, buttonsRef.current], {
      opacity: 0,
      y: 20
    });
    
    gsap.set([mobileImageRef.current, desktopImageRef.current], {
      opacity: 0,
      scale: 0.9,
      y: 10
    });

    // Animate in sequence - faster timing
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    })
    .to(contactButtonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3")
    .to(headlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.2")
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.2")
    .to([mobileImageRef.current, desktopImageRef.current], {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        // Start floating animation after initial load
        gsap.to([mobileImageRef.current, desktopImageRef.current], {
          y: -8,
          duration: 2.5,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1
        });
      }
    }, "-=0.3");

  }, []);

  return (
    <div className="h-screen lg:h-[95vh] min-h-[900px] lg:min-h-[800px] xl:min-h-[900px] bg-[#e0e7cf] relative overflow-hidden">
      {/* Header with Logo and Menu/Contact Button */}
      <header className="relative z-50 flex justify-between items-center px-4 lg:px-20 2xl:px-40 py-4 lg:py-9 pb-0">
        <div ref={logoRef} className="w-24 h-6 lg:w-64 lg:h-12">
          <Image
            src="/hero-logo.svg"
            alt="Hearth Logo"
            width={257}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Desktop Contact Button */}
        <a 
          ref={contactButtonRef}
          href="https://calendly.com/hearthcowork"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-block bg-[#8d9984] text-[#f4eee3] px-12 py-4 rounded-full font-montserrat font-medium text-lg hover:bg-[#7a8671] transition-colors no-underline"
        >
          Contact Us
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1.5"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-neutral-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-neutral-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-neutral-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#e0e7cf] z-40 flex flex-col items-center justify-center">
          <nav className="flex flex-col items-center space-y-8">
            <a 
              href="https://calendly.com/hearthcowork"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-montserrat font-medium text-neutral-700 hover:text-[#8d9984] transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </a>
            <a 
              href="https://lu.ma/hearthgatherings"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-montserrat font-medium text-neutral-700 hover:text-[#8d9984] transition-colors"
              onClick={toggleMenu}
            >
              Events
            </a>
            <div className="flex items-center space-x-6">
              <a 
                href="https://instagram.com/hearth"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 opacity-70 hover:opacity-100 transition-opacity"
                onClick={toggleMenu}
              >
                <Image
                  src="/insta-logo.svg"
                  alt="Instagram"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </a>
              <a 
                href="https://linkedin.com/company/hearth"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 opacity-70 hover:opacity-100 transition-opacity"
                onClick={toggleMenu}
              >
                <Image
                  src="/linkedin-logo.svg"
                  alt="LinkedIn"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 px-4 lg:px-20 2xl:px-40 py-6 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 xl:gap-16">
          
          {/* Text Content - Left Side */}
          <div className="flex-1 lg:flex-[1] lg:pr-8 pt-8">
            {/* Main Headline */}
            <h1 ref={headlineRef} className="font-messapia text-3xl xs:text-6xl sm:text-6xl md:text-7xl lg:text-5xl xl:text-6xl 2xl:text-[67px] leading-[1.1] text-neutral-700 mb-8 lg:mb-8 font-normal">
              <span className="whitespace-nowrap">Coworking</span><br />
              <span className="whitespace-nowrap">and cowellness</span><br />
              <span className="whitespace-nowrap">in harmony</span>
            </h1>
            
            {/* Subtitle */}
            <p ref={subtitleRef} className="font-montserrat text-xl sm:text-2xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-[29px] leading-[1.3] text-neutral-700 mb-10 lg:mb-12 font-normal">
              Where purposeful work and mindful living meet in perfect harmony.
            </p>
            
            {/* Action Buttons */}
            <div ref={buttonsRef} className="flex flex-row gap-3 lg:gap-0">
              {/* See full calendar button */}
              <a 
                href="https://lu.ma/hearthgatherings"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-[#8d9984] text-[#f4eee3] px-5 py-3 lg:px-12 lg:py-4 rounded-full font-montserrat font-medium text-sm lg:text-lg hover:bg-[#7a8671] transition-colors no-underline flex-1 lg:flex-initial"
              >
                See full calendar
              </a>
              
              {/* Contact Us button - Mobile only */}
              <a 
                href="https://calendly.com/hearthcowork"
                target="_blank"
                rel="noopener noreferrer"
                className="lg:hidden flex items-center justify-center bg-transparent border-2 border-[#8d9984] text-[#8d9984] px-5 py-3 rounded-full font-montserrat font-medium text-sm hover:bg-[#8d9984] hover:text-[#f4eee3] transition-colors no-underline flex-1"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Hero Image - Right Side / Below on Mobile */}
          <div className="flex-1 lg:flex-[1] relative">
            {/* Desktop Image - normal fit */}
            <div ref={desktopImageRef} className="hidden md:block relative w-full h-[500px] md:min-h-[500px] lg:h-[600px] lg:min-h-[550px] xl:h-[650px] xl:min-h-[600px] 2xl:h-[700px] 2xl:min-h-[650px]">
              <Image
                src="/hero-bg-image1.svg"
                alt="Hearth coworking and wellness space illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Hero Image - Full Width, Edge-to-Edge, Below Content */}
      <div ref={mobileImageRef} className="block md:hidden relative w-full h-[400px]">
        <Image
          src="/mobile-hero.svg"
          alt="Hearth coworking and wellness space illustration"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}