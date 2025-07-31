export default function ContactFormSection() {
  return (
    <section 
      className="bg-[#e8e3da] relative min-h-[750px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/contact-section-bg.png')" }}
    >
      {/* Content Container */}
      <div className="relative z-10 text-center px-6 w-full max-w-2xl mx-auto">
        
        {/* Main Title */}
        <h2 className="font-messapia text-3xl md:text-4xl lg:text-5xl text-neutral-700 mb-6 font-bold leading-none">
          Join Community
        </h2>
        
        {/* Subtitle */}
        <p className="font-montserrat text-lg md:text-xl lg:text-2xl text-neutral-700 leading-[1.3] mb-8 max-w-md mx-auto">
          Learn more about how you can be a member of the Hearth community.
        </p>
        
        {/* Book a Tour Button */}
        <div className="mb-12">
          <button className="bg-[#8d9984] text-[#f4eee3] px-12 py-4 lg:px-16 lg:py-6 rounded-full font-montserrat font-medium text-lg lg:text-[29px] hover:bg-[#7a8671] transition-colors">
            Book a tour
          </button>
        </div>
        
        {/* Contact Us Link */}
        <div className="font-montserrat text-base text-neutral-700">
          <span>Have questions? </span>
          <button className="font-bold text-[#8d9984] hover:underline transition-all">
            Contact us
          </button>
        </div>
      </div>
    </section>
  );
}