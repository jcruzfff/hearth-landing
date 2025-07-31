export default function CompaniesContactSection() {
  return (
    <section 
      className="bg-[#e0e7cf] relative min-h-[559px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/companies-contact-section-bg.png')" }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content Container */}
      <div className="relative z-10 text-center px-6 w-full max-w-4xl mx-auto">
        
        {/* Main Title */}
        <h2 className="font-messapia text-3xl md:text-4xl lg:text-5xl text-white mb-6 font-bold leading-none">
          Organize Event
        </h2>
        
        {/* Subtitle */}
        <p className="font-montserrat text-lg md:text-xl lg:text-2xl text-white leading-[1.3] mb-8 lg:mb-12 max-w-2xl mx-auto">
          Learn more about how you can be organize your own event at Hearth.
        </p>
        
        {/* Book a Tour Button */}
        <div className="mb-12">
          <button className="bg-[#e0e7cf] text-neutral-700 px-12 py-4 lg:px-16 lg:py-6 rounded-full font-montserrat font-medium text-lg lg:text-[29px] hover:bg-[#d4dcc5] transition-colors">
            Book a tour
          </button>
        </div>
        
        {/* Contact Us Link */}
        <div className="font-montserrat text-base text-white">
          <span>Have questions? </span>
          <button className="font-bold text-white hover:underline transition-all">
            Contact us
          </button>
        </div>
      </div>
    </section>
  );
}