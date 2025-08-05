import { NextResponse } from 'next/server';

// Debug endpoint to check environment variables in Vercel
export async function GET() {
  return NextResponse.json({
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      hasLumaApiKey: !!process.env.LUMA_API_KEY,
      lumaCalendarId: process.env.LUMA_CALENDAR_ID || 'hearthgatherings',
      // Don't expose the actual API key for security
      apiKeyLength: process.env.LUMA_API_KEY?.length || 0,
      variables: {
        LUMA_API_KEY: !!process.env.LUMA_API_KEY,
        LUMA_CALENDAR_ID: !!process.env.LUMA_CALENDAR_ID
      },
      allEnvKeys: Object.keys(process.env).filter(key => 
        key.startsWith('LUMA_')
      )
    },
    timestamp: new Date().toISOString()
  });
}