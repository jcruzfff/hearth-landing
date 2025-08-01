// Script to test your Luma API connection with calendar ID: hearthgatherings
// Run this after adding your LUMA_API_KEY to .env.local

require('dotenv').config({ path: '.env.local' });

const LUMA_API_KEY = process.env.LUMA_API_KEY;
const CALENDAR_ID = 'hearthgatherings';

if (!LUMA_API_KEY) {
  console.error('❌ Please set LUMA_API_KEY in your .env.local file first');
  process.exit(1);
}

async function findCalendarId() {
  const baseUrl = 'https://api.lu.ma';
  
  const headers = {
    'x-luma-api-key': LUMA_API_KEY,
    'Content-Type': 'application/json',
  };

  try {
    console.log('🔍 Testing Luma API connection...\n');

    // Test 1: Get user info
    console.log('1️⃣ Getting your user info...');
    const userResponse = await fetch(`${baseUrl}/public/v1/user/get-self`, { headers });
    
    if (!userResponse.ok) {
      throw new Error(`User API failed: ${userResponse.status} ${userResponse.statusText}`);
    }
    
    const userData = await userResponse.json();
    console.log('✅ User data:', JSON.stringify(userData, null, 2));

    // Test 2: Try to fetch events from your calendar (hearthgatherings)
    const eventsEndpoints = [
      `/public/v1/calendar/${CALENDAR_ID}/events`,
      `/v1/calendar/${CALENDAR_ID}/events`,
      `/public/v1/calendar/list-events?calendar_id=${CALENDAR_ID}`,
    ];

    console.log(`\n2️⃣ Testing your calendar: "${CALENDAR_ID}"...`);
    
    for (const endpoint of eventsEndpoints) {
      try {
        console.log(`  🔗 Trying: ${baseUrl}${endpoint}`);
        const response = await fetch(`${baseUrl}${endpoint}`, { headers });
        
        if (response.ok) {
          const data = await response.json();
          console.log(`  ✅ Success! Found your events:`);
          
          // Check for events in different possible response formats
          const events = data.entries || data.events || (Array.isArray(data) ? data : []);
          
          if (events.length > 0) {
            console.log(`\n🎉 Found ${events.length} events in your calendar:`);
            events.slice(0, 3).forEach((event, index) => {
              console.log(`  ${index + 1}. ${event.name || event.title || 'Unnamed Event'}`);
              console.log(`     Date: ${event.start_at || event.start || event.date || 'No date'}`);
              console.log(`     Image: ${event.cover_url || event.photo_url || 'No image'}`);
            });
            
            if (events.length > 3) {
              console.log(`     ... and ${events.length - 3} more events`);
            }
          } else {
            console.log(`  📋 Calendar found but no events returned`);
          }
          
          console.log('\n🎯 Your setup is working! The events should appear on your website.');
          return; // Exit the function on success
        } else {
          const errorText = await response.text();
          console.log(`  ❌ ${response.status}: ${errorText}`);
        }
      } catch (err) {
        console.log(`  ❌ Error: ${err.message}`);
      }
    }

    // Test 3: Check if calendar ID might be in user data
    console.log('\n3️⃣ Checking user data for calendar info...');
    if (userData.calendar_id || userData.calendar || userData.calendars) {
      console.log('📋 Found calendar info in user data:');
      console.log('   Calendar ID:', userData.calendar_id || 'Not found');
      console.log('   Calendar data:', userData.calendar || userData.calendars || 'Not found');
    } else {
      console.log('❌ No calendar info found in user data');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Tips:');
    console.log('   - Check that your API key is correct');
    console.log('   - Make sure you have Luma Plus subscription');
    console.log('   - Try looking in your Luma dashboard settings');
  }
}

// Run the script
findCalendarId();