import Image from 'next/image';

// Membership plan type definition
interface MembershipPlan {
  id: string;
  title: string;
  displayTitle?: React.ReactNode;
  description: string;
  price: string;
  icon: string;
  iconAlt: string;
  features?: string[];
  isWide?: boolean;
  image?: string;
  hasCustomDescriptionWidth?: boolean;
}

// Membership plans data
const membershipPlans: MembershipPlan[] = [
  {
    id: 'daily',
    title: 'Daily Drop-In',
    displayTitle: (
      <>
        Daily<br className="hidden xl:block 2xl:hidden" /> Drop-In
      </>
    ),
    description: 'Daily drop-in are perfect for occasional visits - enjoy access to all shared spaces during open hours. A simple way to plug into Hearth vibe, no strings attached.',
    price: '$20/day',
    icon: '/daily-icon.svg',
    iconAlt: 'Daily access icon'
  },
  {
    id: 'flex',
    title: 'Flex Pack',
    displayTitle: (
      <>
        Flex<br className="hidden xl:block 2xl:hidden" /> Pack
      </>
    ),
    description: 'Includes 5 day passes to use within the calendar month - perfect for part-time coworkers, creatives on the go, or anyone easing into Hearth community.',
    price: '$100/month',
    icon: '/flex-icon.svg',
    iconAlt: 'Flexible access icon'
  },
  {
    id: 'monthly',
    title: 'Monthly Membership',
    description: 'Get access to our shared spaces Mon - Fri, 8AM to 5PM. The perfect spot to work, create, or connect during the day. Gain access to our perks and events.',
    price: '$250/month',
    icon: '/monthly-icon.svg',
    iconAlt: 'Monthly membership icon'
  },
  {
    id: 'unlimited',
    title: 'Unlimited Access',
    description: 'Enjoy 24/7 access to the space, with occasional exceptions for private events. Includes special events discounts and extended member perks to make the most of your time.',
    price: '$350/month',
    icon: '/access-icon.svg',
    iconAlt: 'Unlimited access icon',
    hasCustomDescriptionWidth: true
  },
  {
    id: 'private',
    title: 'Private Event Rental',
    description: 'Your booking includes use of all A/V equipment and furniture, plus cleanup after your event. We recommend scheduling outside of weekday working hours - after 5 PM or anytime on weekends.',
    price: '$100/hr',
    icon: '/private-icon.svg',
    iconAlt: 'Private event icon',
    isWide: true,
    image: '/private-image.png'
  }
];

interface MembershipCardProps {
  plan: MembershipPlan;
}

function MembershipCard({ plan }: MembershipCardProps) {
  if (plan.isWide) {
    // Special layout for Private Event Rental card
    return (
      <div className="bg-transparent border border-neutral-700 rounded-[33px] p-6 xl:p-8 flex flex-col xl:flex-row xl:col-span-2 h-fit hover:shadow-lg transition-shadow duration-300 xl:gap-8">
        
        {/* Left side: Standard card content */}
        <div className="flex flex-col items-center text-center xl:flex-1">
          {/* Icon Section */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-[86px] h-[40px] flex items-center justify-center">
              <Image
                src={plan.icon}
                alt={plan.iconAlt}
                width={54}
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <h3 className="font-montserrat font-semibold text-2xl xl:text-[26px] text-neutral-700 mb-6">
            {plan.displayTitle || plan.title}
          </h3>
          
          <p className={`font-montserrat w-[310px] text-sm text-neutral-700 leading-[1.3] mb-6 flex-1 ${plan.hasCustomDescriptionWidth ? '2xl:w-[85%] 2xl:mx-auto' : ''}`}>
            {plan.description}
          </p>
          
          <div className="font-messapia text-2xl xl:text-[26px] text-neutral-700 font-bold">
            {plan.price}
          </div>
        </div>

        {/* Right side: Image */}
        <div className="mt-8 xl:mt-0 flex items-center justify-center">
          <div className="relative w-[280px] h-[280px] xl:w-[279px] xl:h-[279px]">
            <Image
              src={plan.image!}
              alt="Private event space"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    );
  }

  // Standard layout for other cards
  return (
    <div className="bg-transparent border border-neutral-700 rounded-[33px] p-6 xl:p-8 flex flex-col items-center text-center h-fit hover:shadow-lg transition-shadow duration-300">
      
      {/* Icon Section */}
      <div className="flex items-center justify-center mb-8">
        <div className="w-[86px] h-[40px] flex items-center justify-center">
          <Image
            src={plan.icon}
            alt={plan.iconAlt}
            width={86}
            height={40}
            className="object-contain"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1">
        <h3 className="font-montserrat font-semibold text-2xl xl:text-[26px] text-neutral-700 mb-6">
          {plan.displayTitle || plan.title}
        </h3>
        
        <p className={`font-montserrat text-sm text-neutral-700 leading-[1.3] mb-6 flex-1 ${plan.hasCustomDescriptionWidth ? '2xl:w-[85%] 2xl:mx-auto' : ''}`}>
          {plan.description}
        </p>
        
        <div className="font-messapia text-2xl xl:text-[26px] text-neutral-700 font-bold">
          {plan.price}
        </div>
      </div>
    </div>
  );
}

export default function MembershipsSection() {
  return (
    <section className="bg-[#e8e3da] py-16 xl:py-24">
      <div className="container mx-auto px-6  xl:px-32">
        
        {/* Section Title */}
        <div className="text-center mb-8 xl:mb-12">
          <h2 className="font-messapia text-3xl md:text-4xl xl:text-5xl text-neutral-700 mb-6 xl:mb-8 font-bold leading-[1.2]">
            Coworking and Cowelness Memberships
          </h2>
          
          {/* Book a Tour Button */}
          <button className="bg-[#8d9984] text-[#f4eee3] px-12 py-4 xl:px-16 xl:py-6 rounded-full font-montserrat font-medium text-lg xl:text-[29px] hover:bg-[#7a8671] transition-colors">
            Book a tour
          </button>
        </div>

        {/* Membership Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-6">
          
          {/* First Row: Daily, Flex, Monthly */}
          {membershipPlans.slice(0, 3).map((plan) => (
            <MembershipCard key={plan.id} plan={plan} />
          ))}
          
          {/* Second Row: Unlimited and Private Event (spans 2 columns) */}
          {membershipPlans.slice(3).map((plan) => (
            <MembershipCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}