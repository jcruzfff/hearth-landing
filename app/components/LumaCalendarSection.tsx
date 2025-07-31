import Image from 'next/image';

// Event type definition
interface Event {
  id: number;
  title: string;
  date: string;
  image: string;
  subtitle: string;
}

// Mock event data - can be replaced with real Luma API data
const events: Event[] = [
  {
    id: 1,
    title: "Crypto over Tea",
    date: "24 July",
    image: "/event1.png",
    subtitle: "Hearth."
  },
  {
    id: 2,
    title: "Crypto over Tea", 
    date: "21/05",
    image: "/event2.png",
    subtitle: "Hearth."
  },
  {
    id: 3,
    title: "After Dark",
    date: "14/05", 
    image: "/event3.png",
    subtitle: "Hearth."
  },
  {
    id: 4,
    title: "Sip & Paint",
    date: "6/05",
    image: "/event4.png", 
    subtitle: "Night at Hearth."
  }
];

interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  return (
    <div className="flex flex-col items-center group cursor-pointer">
      {/* Event Image */}
      <div className="relative w-full aspect-square max-w-[337px] mb-4 group-hover:scale-105 transition-transform duration-300">
        <Image
          src={event.image}
          alt={`${event.title} event`}
          fill
          className="object-cover rounded-[36px]"
        />
      </div>
      
      {/* Event Date */}
      <div className="text-center">
        <p className="font-messapia text-2xl lg:text-[29px] text-neutral-700 font-bold">
          {event.date}
        </p>
      </div>
    </div>
  );
}

export default function LumaCalendarSection() {
  return (
    <section className="bg-[#faf9f8] py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-40">
        
        {/* Section Title */}
        <h2 className="font-messapia text-3xl md:text-4xl lg:text-5xl text-center text-neutral-700 mb-12 lg:mb-16 font-bold">
          Our Upcoming Events
        </h2>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* View All Events Button */}
        <div className="text-center mt-12 lg:mt-16">
          <button className="bg-[#8d9984] text-[#f4eee3] px-12 py-4 rounded-full font-montserrat font-medium text-lg hover:bg-[#7a8671] transition-colors">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
}