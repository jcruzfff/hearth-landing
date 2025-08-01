export default function ContactFormSection() {
  return (
    <section 
      className="bg-[#e8e3da] relative h-[60vh] md:min-h-[750px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
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
        <div className="mb-6">
          <a 
            href="https://calendly.com/hearthcowork"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full md:inline-block md:w-auto bg-[#8d9984] text-[#f4eee3] px-6 md:px-24 py-4 rounded-full font-montserrat font-medium text-lg hover:bg-[#7a8671] transition-colors no-underline text-center"
          >
            Book a tour
          </a>
        </div>
        
        {/* Contact Us Link */}
        <div className="font-montserrat text-base text-neutral-700">
          <span>Have questions? </span>
          <a 
            href="mailto:hearthcowork@gmail.com?subject=Interest in Joining the Hearth Community&body=Hi there!%0A%0AI'm super interested in what you guys are doing at Hearth! I'd love to learn more about becoming a member of your coworking and wellness community.%0A%0ACould you share more details about membership options and what makes Hearth special?%0A%0ALooking forward to hearing from you!%0A%0ABest regards"
            className="font-bold text-[#8d9984] hover:underline transition-all no-underline"
          >
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}