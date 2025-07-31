import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="h-[87vh] bg-[#e0e7cf] relative overflow-hidden">
      {/* Header with Logo and Contact Button */}
      <header className="relative z-10 flex justify-between items-center px-6 lg:px-40 py-9 pb-0">
        <div className="w-64 h-12">
          <Image
            src="/hero-logo.svg"
            alt="Hearth Logo"
            width={257}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>
        <button className="bg-[#8d9984] text-[#f4eee3] px-6 py-3 rounded-full font-montserrat font-medium text-base hover:bg-[#7a8671] transition-colors">
          Contact Us
        </button>
      </header>

      {/* Main Content Container */}
      <div className="relative z-10 px-6 lg:px-40 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 xl:gap-16">
          
          {/* Text Content - Left Side */}
          <div className="flex-1 lg:flex-[1] lg:pr-8">
            {/* Main Headline */}
            <h1 className="font-messapia text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[67px] leading-[1.15] text-neutral-700 mb-6 lg:mb-8 font-normal">
              Coworking<br />
              and cowellness<br />
              in harmony
            </h1>
            
            {/* Subtitle */}
            <p className="font-montserrat text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-[29px] leading-[1.3] text-neutral-700 mb-8 lg:mb-12 font-normal">
              Where purposeful work and mindful living meet in perfect harmony.
            </p>
            
            {/* Call to Action Button */}
            <button className="bg-[#8d9984] text-[#f4eee3] px-8 py-3 md:px-12 md:py-4 lg:px-12 lg:py-4 xl:px-16 xl:py-6 rounded-full font-montserrat font-medium text-lg md:text-xl lg:text-xl xl:text-2xl hover:bg-[#7a8671] transition-colors">
              See full calendar
            </button>
          </div>

          {/* Hero Image - Right Side / Below on Mobile */}
          <div className="flex-1 lg:flex-[1] relative">
            {/* Ensure minimum height on mobile, scale appropriately on larger screens */}
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] xl:h-[650px] 2xl:h-[700px]">
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
    </div>
  );
}