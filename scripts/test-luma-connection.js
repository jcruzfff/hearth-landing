// Quick test script for Luma API connection
require('dotenv').config({ path: '.env.local' });

const LUMA_API_KEY = process.env.LUMA_API_KEY;
const CALENDAR_ID = process.env.LUMA_CALENDAR_ID || 'hearthgatherings';

console.log('🔧 Testing Luma API Connection...\n');
console.log('API Key:', LUMA_API_KEY ? `${LUMA_API_KEY.substring(0, 10)}...` : 'NOT SET');
console.log('Calendar ID:', CALENDAR_ID);
console.log('');

if (!LUMA_API_KEY) {
  console.error('❌ LUMA_API_KEY not found in environment variables');
  console.log('💡 Make sure you have .env.local with LUMA_API_KEY=your_key');
  process.exit(1);
}

async function testLumaAPI() {
  // Test different base URLs and endpoints
  const tests = [
    {
      baseUrl: 'https://public-api.luma.com',
      endpoints: [
        `/v1/calendar/${CALENDAR_ID}/events`,
        `/public/v1/calendar/${CALENDAR_ID}/events`,
        `/v1/calendar/${CALENDAR_ID}/list-events`,
      ]
    },
    {
      baseUrl: 'https://api.lu.ma',
      endpoints: [
        `/public/v1/calendar/${CALENDAR_ID}/events`,
        `/v1/calendar/${CALENDAR_ID}/events`,
      ]
    }
  ];

  const headers = {
    'x-luma-api-key': LUMA_API_KEY,
    'Content-Type': 'application/json',
  };

  for (const test of tests) {
    console.log(`🌐 Testing base URL: ${test.baseUrl}`);
    
    for (const endpoint of test.endpoints) {
      const fullUrl = `${test.baseUrl}${endpoint}`;
      console.log(`  📡 Trying: ${fullUrl}`);
      
      try {
        const response = await fetch(fullUrl, { headers });
        console.log(`  📊 Status: ${response.status} ${response.statusText}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`  ✅ Success! Response structure:`, Object.keys(data));
          
          // Check for events
          const events = data.entries || data.events || data.results || (Array.isArray(data) ? data : []);
          console.log(`  📋 Found ${events.length} events`);
          
          if (events.length > 0) {
            console.log(`  🎉 Sample event:`, {
              name: events[0].name || events[0].title,
              start: events[0].start_at || events[0].start,
              image: events[0].cover_url || events[0].photo_url || 'No image'
            });
            console.log('\n✅ SUCCESS! This endpoint works!');
            return { baseUrl: test.baseUrl, endpoint, data };
          }
        } else {
          const errorText = await response.text();
          console.log(`  ❌ Error: ${errorText.substring(0, 200)}...`);
        }
      } catch (error) {
        console.log(`  ❌ Network error: ${error.message}`);
      }
      console.log('');
    }
  }
  
  console.log('❌ No working endpoints found');
  return null;
}

testLumaAPI().then(result => {
  if (result) {
    console.log('\n🎯 Found working configuration:');
    console.log(`Base URL: ${result.baseUrl}`);
    console.log(`Endpoint: ${result.endpoint}`);
  } else {
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Verify your API key is correct');
    console.log('2. Make sure you have Luma Plus subscription');
    console.log('3. Check if calendar ID "hearthgatherings" is correct');
    console.log('4. Try accessing https://lu.ma/hearthgatherings to verify calendar exists');
  }
});