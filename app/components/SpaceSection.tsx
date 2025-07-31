import Image from 'next/image';

export default function SpaceSection() {
  return (
    <section className="bg-[#d0dfe4] py-16 xl:py-24">
      <div className="px-6 lg:px-40">
        
        {/* Section Title */}
        <h2 className="font-messapia text-3xl md:text-4xl xl:text-[40px] text-center text-neutral-700 mb-12 xl:mb-16 font-bold">
          Hearth Space
        </h2>

        {/* Images Layout - Flexbox with exact Figma proportions */}
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-[42px] items-start">
          
          {/* Left Column - Two stacked images (322px equivalent) */}
          <div className="flex flex-col gap-6 xl:gap-[42px] w-full xl:flex-[322]">
            {/* space-image1 */}
            <div className="relative aspect-[4/3] xl:h-[246px]">
              <Image
                src="/space-image1.png"
                alt="Hearth workspace with plants and natural lighting"
                fill
                className="object-cover"
              />
            </div>
            
            {/* space-image2 */}
            <div className="relative aspect-[4/3] xl:h-[246px]">
              <Image
                src="/space-image2.png"
                alt="Collaborative workspace setup"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Middle Column - Large center image (535px equivalent) */}
          <div className="relative aspect-square xl:h-[535px] w-full xl:flex-[535]">
            <Image
              src="/space-image3.png"
              alt="Main workspace area with natural elements"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Column - Tall image (349px equivalent) */}
          <div className="relative aspect-[3/4] xl:h-[535px] w-full xl:flex-[349]">
            <Image
              src="/space-image4.png"
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