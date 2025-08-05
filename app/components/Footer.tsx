import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#e0e7cf] py-12 lg:py-16">
      <div className="px-6 lg:px-40">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          
          {/* Left Side - Logo and Copyright */}
          <div className="flex flex-col items-center lg:items-start">
            {/* Footer H Logo */}
            <div className="w-12 h-12 lg:w-16 lg:h-16 mb-4">
              <Image
                src="/footer-h-logo.svg"
                alt="Hearth Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Copyright Text */}
            <p className="font-montserrat text-sm text-neutral-700 text-center lg:text-left max-w-lg">
              Copyright © 2025 Hearth Co-work and Co-wellness - All Rights Reserved.
            </p>
          </div>

          {/* Right Side - Social Icons */}
          <div className="flex items-center justify-center lg:justify-end gap-12">
            
            {/* Luma Logo */}
            <a 
              href="https://lu.ma/hearthgatherings"
              target="_blank"
              rel="noopener noreferrer"
              className="w-20 h-10 lg:w-30 lg:h-12 hover:opacity-70 transition-opacity"
              aria-label="Visit our Luma page"
            >
              <Image
                src="/luma-logo.svg"
                alt="Luma"
                width={120}
                height={48}
                className="w-full h-full object-contain"
              />
            </a>

            {/* Instagram Logo */}
            <a 
              href="https://instagram.com/hearthcowork"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 lg:w-12 lg:h-12 hover:opacity-70 transition-opacity"
              aria-label="Follow us on Instagram"
            >
              <Image
                src="/insta-logo.svg"
                alt="Instagram"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </a>

            {/* LinkedIn Logo */}
            <a 
              href="https://www.linkedin.com/company/107508691"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 lg:w-12 lg:h-12 hover:opacity-70 transition-opacity"
              aria-label="Connect on LinkedIn"
            >
              <Image
                src="/linkedin-logo.svg"
                alt="LinkedIn"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </a>

            {/* Contact Logo */}
            <a 
              href="https://calendly.com/hearthcowork"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 lg:w-12 lg:h-12 hover:opacity-70 transition-opacity"
              aria-label="Contact us"
            >
              <Image
                src="/contact-logo.svg"
                alt="Contact"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}