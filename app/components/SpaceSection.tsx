'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function SpaceSection() {
  // Refs for GSAP animations
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);

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
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Images stagger animation
    const images = [image1Ref.current, image2Ref.current, centerImageRef.current, rightImageRef.current];
    
    gsap.fromTo(images,
      {
        opacity: 0,
        y: 40,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: leftColumnRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Subtle hover animations for images
    images.forEach((image) => {
      if (image) {
        const handleMouseEnter = () => {
          gsap.to(image, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        image.addEventListener('mouseenter', handleMouseEnter);
        image.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup function
        return () => {
          image.removeEventListener('mouseenter', handleMouseEnter);
          image.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#d0dfe4] py-16 xl:py-24">
      <div className="px-6 lg:px-40">
        
        {/* Section Title */}
        <h2 ref={titleRef} className="font-messapia text-3xl md:text-4xl xl:text-[40px] text-center text-neutral-700 mb-12 xl:mb-16 font-bold">
          Hearth Space
        </h2>

        {/* Images Layout - Flexbox with exact Figma proportions */}
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-[42px] items-start">
          
          {/* Left Column - Two stacked images (322px equivalent) */}
          <div ref={leftColumnRef} className="flex flex-col gap-6 xl:gap-[42px] w-full xl:flex-[322]">
            {/* space-image1 */}
            <div ref={image1Ref} className="relative aspect-[4/3] xl:h-[246px] overflow-hidden rounded-lg">
              <Image
                src="/frame-32.png"
                alt="Hearth workspace with plants and natural lighting"
                fill
                className="object-cover"
              />
            </div>
            
            {/* space-image2 */}
            <div ref={image2Ref} className="relative aspect-[4/3] xl:h-[246px] overflow-hidden rounded-lg">
              <Image
                src="/frame-33.png"
                alt="Collaborative workspace setup"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Middle Column - Large center image (535px equivalent) */}
          <div ref={centerImageRef} className="relative aspect-square xl:h-[535px] w-full xl:flex-[535] overflow-hidden rounded-lg">
            <Image
              src="/frame-30.png"
              alt="Main workspace area with natural elements"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Column - Tall image (349px equivalent) */}
          <div ref={rightImageRef} className="relative aspect-[3/4] xl:h-[535px] w-full xl:flex-[349] overflow-hidden rounded-lg">
            <Image
              src="/frame-31.png"
              alt="Wellness and meditation area"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}