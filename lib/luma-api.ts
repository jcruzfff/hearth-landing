// Luma API service for fetching calendar events
// Documentation: https://docs.lu.ma/reference

// Types for Luma API responses
export interface LumaEventData {
  api_id: string;
  name: string;
  start_at: string;
  end_at: string;
  cover_url?: string;
  description?: string;
  url?: string;
  timezone: string;
  geo_latitude?: string;
  geo_longitude?: string;
  geo_address_json?: {
    city?: string;
    region?: string;
    country?: string;
    address?: string;
    full_address?: string;
  };
}

export interface LumaEventEntry {
  api_id: string;
  event: LumaEventData;
  tags: Array<{
    api_id: string;
    name: string;
  }>;
}

export interface LumaEventsResponse {
  entries: LumaEventEntry[];
  has_more: boolean;
  next_cursor?: string;
}

// For backwards compatibility
export type LumaEvent = LumaEventData;

export interface LumaApiError {
  message: string;
  status?: number;
}

class LumaApiService {
  private baseUrl = 'https://public-api.luma.com';
  private apiKey: string;
  private calendarId: string;

  constructor() {
    // In Next.js, client-side environment variables need NEXT_PUBLIC_ prefix
    this.apiKey = process.env.NEXT_PUBLIC_LUMA_API_KEY || process.env.LUMA_API_KEY || '';
    this.calendarId = process.env.NEXT_PUBLIC_LUMA_CALENDAR_ID || process.env.LUMA_CALENDAR_ID || 'hearthgatherings';
    
    if (!this.apiKey) {
      console.warn('LUMA_API_KEY not found in environment variables. For client-side usage, use NEXT_PUBLIC_LUMA_API_KEY');
    }
    if (!this.calendarId) {
      console.warn('LUMA_CALENDAR_ID not found in environment variables');
    }
    
    // Note: This client-side instance is only for utility functions
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.apiKey) {
      throw new Error('Luma API key is not configured');
    }

    const url = `${this.baseUrl}${endpoint}`;
    
    const headers = {
      'x-luma-api-key': this.apiKey,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Luma API error (${response.status}): ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Luma API request failed:', error);
      throw error;
    }
  }

  /**
   * Fetch upcoming events from the calendar
   * Based on the "List Events" endpoint under Calendars
   */
  async getUpcomingEvents(limit: number = 10): Promise<LumaEvent[]> {
    try {
      if (!this.calendarId) {
        console.warn('Calendar ID not configured, using mock data');
        return [];
      }

      // Use the correct endpoint that we discovered works
      const endpoint = `/v1/calendar/list-events`;
      
      const params = new URLSearchParams({
        calendar_id: this.calendarId,
        limit: limit.toString(),
      });

      console.log(`Fetching Luma events from: ${this.baseUrl}${endpoint}?${params.toString()}`);
      
      const response = await this.makeRequest<LumaEventsResponse>(
        `${endpoint}?${params.toString()}`
      );

      if (response && response.entries) {
        console.log(`✅ Successfully fetched ${response.entries.length} events from Luma`);
        
        // Extract the event data from the nested structure
        const events = response.entries.map(entry => entry.event);
        
        console.log(`📋 Extracted ${events.length} event objects with cover images:`, 
          events.filter(event => event.cover_url).length
        );
        
        return events;
      } else {
        console.warn('No entries found in Luma API response:', response);
        return [];
      }
    } catch (error) {
      console.error('Failed to fetch Luma events:', error);
      // Return empty array as fallback to prevent page from breaking
      return [];
    }
  }

  /**
   * Test API connection by getting user info
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('/public/v1/user/get-self');
      return true;
    } catch (error) {
      try {
        // Try alternative endpoint
        await this.makeRequest('/v1/user/get-self');
        return true;
      } catch (altError) {
        console.error('Luma API connection test failed:', error);
        return false;
      }
    }
  }
}

// Export singleton instance
export const lumaApi = new LumaApiService();

// Utility function to format Luma date to display format
export function formatEventDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateString);
      return 'TBD';
    }
    
    // Format as "MMM D" (e.g., "Aug 2")
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short'
    });
  } catch (error) {
    console.error('Failed to format date:', dateString, error);
    return 'TBD';
  }
}

// Utility function to format Luma date to short format 
export function formatEventDateShort(dateString: string): string {
  try {
    const date = new Date(dateString);
    
    // Format as "DD/MM" (e.g., "24/07")
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit'
    });
  } catch (error) {
    console.error('Failed to format date:', dateString, error);
    return 'TBD';
  }
}