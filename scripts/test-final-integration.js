// Final test of the complete Luma integration
require('dotenv').config({ path: '.env.local' });

const LUMA_API_KEY = process.env.LUMA_API_KEY;
const CALENDAR_ID = 'hearthgatherings';

async function testCompleteIntegration() {
  console.log('🧪 Testing complete Luma integration...\n');

  const headers = {
    'x-luma-api-key': LUMA_API_KEY,
    'Content-Type': 'application/json',
  };

  const url = `https://public-api.luma.com/v1/calendar/list-events?calendar_id=${CALENDAR_ID}&limit=4`;

  try {
    const response = await fetch(url, { headers });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Success! Found ${data.entries.length} events`);
      
      // Simulate the transformation that happens in your component
      const transformedEvents = data.entries.slice(0, 4).map((entry, index) => {
        const event = entry.event;
        return {
          id: event.api_id,
          title: event.name,
          date: formatDate(event.start_at),
          image: event.cover_url || 'Fallback image',
          lumaUrl: event.url
        };
      });

      console.log('\n🎨 Events that will appear on your website:');
      transformedEvents.forEach((event, i) => {
        console.log(`\n${i + 1}. ${event.title}`);
        console.log(`   📅 Date: ${event.date}`);
        console.log(`   🖼️  Image: ${event.image.startsWith('http') ? 'Luma image ✅' : 'Fallback image'}`);
        console.log(`   🔗 URL: ${event.lumaUrl}`);
      });

      const lumaImageCount = transformedEvents.filter(event => 
        event.image.startsWith('http')
      ).length;
      
      console.log(`\n📊 Summary:`);
      console.log(`   ${transformedEvents.length} total events`);
      console.log(`   ${lumaImageCount} events with real Luma images`);
      console.log(`   ${transformedEvents.length - lumaImageCount} events using fallback images`);
      
      console.log('\n✨ Your website should now show real Luma events with images!');
      
    } else {
      console.error('❌ API Error:', response.status, await response.text());
    }
  } catch (error) {
    console.error('❌ Network Error:', error.message);
  }
}

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long'
    });
  } catch (error) {
    return 'TBD';
  }
}

testCompleteIntegration();