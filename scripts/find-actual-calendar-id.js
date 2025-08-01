// Script to find the actual calendar ID format needed by the API
require('dotenv').config({ path: '.env.local' });

const LUMA_API_KEY = process.env.LUMA_API_KEY;

console.log('🔍 Finding your actual calendar ID...\n');

async function findRealCalendarId() {
  const headers = {
    'x-luma-api-key': LUMA_API_KEY,
    'Content-Type': 'application/json',
  };

  // Test different base URLs and user endpoints
  const tests = [
    'https://public-api.luma.com/v1/user/get-self',
    'https://api.lu.ma/public/v1/user/get-self',
    'https://public-api.luma.com/v1/user/calendars',
    'https://api.lu.ma/v1/user/calendars',
    'https://public-api.luma.com/v1/calendars',
    'https://api.lu.ma/v1/calendars',
  ];

  for (const url of tests) {
    console.log(`🔗 Trying: ${url}`);
    
    try {
      const response = await fetch(url, { headers });
      console.log(`📊 Status: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Success! Response:`, JSON.stringify(data, null, 2));
        
        // Look for calendar information
        if (data.calendars || data.calendar || data.calendar_id) {
          console.log('🎯 Found calendar info!');
        }
      } else {
        const errorText = await response.text();
        console.log(`❌ Error: ${errorText.substring(0, 100)}...`);
      }
    } catch (error) {
      console.log(`❌ Network error: ${error.message}`);
    }
    console.log('');
  }

  // Try the "List Events" endpoint from the documentation
  console.log('🔍 Trying documented "List Events" endpoint...');
  
  const listEventsUrls = [
    'https://public-api.luma.com/v1/calendar/list-events',
    'https://api.lu.ma/v1/calendar/list-events',
  ];

  for (const baseUrl of listEventsUrls) {
    console.log(`🔗 Trying: ${baseUrl}`);
    
    try {
      // Try with different parameter formats
      const variations = [
        `${baseUrl}?calendar_id=hearthgatherings`,
        `${baseUrl}?calendar_urlname=hearthgatherings`,
        `${baseUrl}?urlname=hearthgatherings`,
      ];

      for (const url of variations) {
        console.log(`  📡 Testing: ${url}`);
        const response = await fetch(url, { headers });
        console.log(`  📊 Status: ${response.status}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`  ✅ SUCCESS! Found events:`, Object.keys(data));
          
          const events = data.entries || data.events || data.results || [];
          console.log(`  📋 Found ${events.length} events`);
          
          if (events.length > 0) {
            console.log(`  🎉 Sample event:`, events[0].name || events[0].title);
            return { url, data };
          }
        } else {
          const errorText = await response.text();
          console.log(`  ❌ ${errorText.substring(0, 50)}...`);
        }
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
    console.log('');
  }
  
  return null;
}

findRealCalendarId().then(result => {
  if (result) {
    console.log('\n🎯 FOUND WORKING ENDPOINT!');
    console.log(`URL: ${result.url}`);
  } else {
    console.log('\n💡 Next steps:');
    console.log('1. Check your Luma dashboard for the exact API calendar ID');
    console.log('2. The URL slug "hearthgatherings" might not be the API ID');
    console.log('3. You might need a different calendar identifier format');
  }
});