// Check the actual structure of events returned by Luma API
require('dotenv').config({ path: '.env.local' });

const LUMA_API_KEY = process.env.LUMA_API_KEY;
const CALENDAR_ID = 'hearthgatherings';

async function checkEventStructure() {
  const headers = {
    'x-luma-api-key': LUMA_API_KEY,
    'Content-Type': 'application/json',
  };

  const url = `https://public-api.luma.com/v1/calendar/list-events?calendar_id=${CALENDAR_ID}&limit=2`;
  
  console.log('🔍 Checking actual event structure...\n');
  console.log(`📡 Fetching from: ${url}`);

  try {
    const response = await fetch(url, { headers });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success! Raw response structure:');
      console.log(JSON.stringify(data, null, 2));
      
      if (data.entries && data.entries.length > 0) {
        console.log('\n🎯 First event fields:');
        const firstEvent = data.entries[0];
        console.log('Available fields:', Object.keys(firstEvent));
        
        console.log('\n📋 Event details:');
        console.log('- ID/API ID:', firstEvent.id || firstEvent.api_id || firstEvent.event_id);
        console.log('- Name/Title:', firstEvent.name || firstEvent.title);
        console.log('- Start:', firstEvent.start_at || firstEvent.start || firstEvent.date);
        console.log('- Image/Cover:', firstEvent.cover_url || firstEvent.photo_url || firstEvent.image_url);
        console.log('- URL:', firstEvent.url || firstEvent.event_url);
        
        console.log('\n🖼️ Image fields specifically:');
        Object.keys(firstEvent).filter(key => 
          key.includes('image') || key.includes('photo') || key.includes('cover')
        ).forEach(key => {
          console.log(`- ${key}:`, firstEvent[key]);
        });
      }
    } else {
      console.error('❌ API Error:', response.status, await response.text());
    }
  } catch (error) {
    console.error('❌ Network Error:', error.message);
  }
}

checkEventStructure();