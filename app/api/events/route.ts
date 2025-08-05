import { NextResponse } from 'next/server';

// Types for Luma API responses
interface LumaEvent {
  api_id: string;
  name: string;
  start_at: string;
  end_at?: string;
  cover_url?: string;
  description?: string;
  url?: string;
  timezone?: string;
}

interface LumaEventEntry {
  event: LumaEvent;
}

interface LumaEventsResponse {
  entries: LumaEventEntry[];
}

// Server-side Luma API integration
class LumaApiService {
  private baseUrl = 'https://public-api.luma.com';
  private apiKey: string;
  private calendarId: string;

  constructor() {
    // Server-side environment variables (no NEXT_PUBLIC_ needed)
    this.apiKey = process.env.LUMA_API_KEY || '';
    this.calendarId = process.env.LUMA_CALENDAR_ID || 'hearthgatherings';
    
    // Basic configuration logging
    console.log('🔧 Luma API initialized:', this.calendarId);
    
    if (!this.apiKey) {
      console.warn('❌ LUMA_API_KEY not found in environment variables');
    }
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    if (!this.apiKey) {
      throw new Error('Luma API key is not configured');
    }

    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-luma-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`❌ Luma API request failed: ${response.status} ${response.statusText}`);
      throw new Error(`Luma API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }

  async getUpcomingEvents(limit: number = 10) {
    try {
      const endpoint = `/v1/calendar/list-events`;
      const params = new URLSearchParams({
        calendar_id: this.calendarId,
        limit: limit.toString(),
        after: new Date().toISOString(), // Only future events
      });

      const response = await this.makeRequest<LumaEventsResponse>(`${endpoint}?${params.toString()}`);
      
      if (response && response.entries) {
        const events = response.entries.map((entry: LumaEventEntry) => entry.event);
        // Limit to the requested number of events
        const limitedEvents = events.slice(0, limit);
        console.log(`✅ Fetched ${limitedEvents.length} upcoming events`);
        return limitedEvents;
      }

      console.log('⚠️ No events found in Luma response');
      return [];
    } catch (error) {
      console.error('❌ Failed to fetch events from Luma:', error);
      throw error;
    }
  }
}

// Initialize the service
const lumaApi = new LumaApiService();

export async function GET() {
  try {
    // Fetch events from Luma (limit to 4)
    const events = await lumaApi.getUpcomingEvents(4);
    
    return NextResponse.json({
      success: true,
      events,
      count: events.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ API Route error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch events',
        message: error instanceof Error ? error.message : 'Unknown error',
        events: [], // Return empty array so frontend can use fallbacks
      },
      { status: 500 }
    );
  }
}