import { createClient } from '@supabase/supabase-js';

/**
 * REST API client for Supabase that can be used from external services
 * Supports both anon and service role keys for different permission levels
 */
export class SupabaseRestClient {
  private url: string;
  private anonKey: string;
  private serviceRoleKey: string | null;
  private headers: Record<string, string>;

  constructor(
    url: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: string | undefined = process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    if (!url || !anonKey) {
      throw new Error('Supabase URL and anon key are required');
    }

    this.url = url;
    this.anonKey = anonKey;
    this.serviceRoleKey = serviceRoleKey || null;
    
    // Base headers for all requests
    this.headers = {
      'Content-Type': 'application/json',
      'apikey': this.anonKey,
    };
  }

  /**
   * Get headers for requests using anon key
   */
  private getAnonHeaders(): Record<string, string> {
    return {
      ...this.headers,
      'apikey': this.anonKey,
    };
  }

  /**
   * Get headers for requests using service role key
   */
  private getServiceRoleHeaders(): Record<string, string> {
    if (!this.serviceRoleKey) {
      throw new Error('Service role key is not configured');
    }
    return {
      ...this.headers,
      'apikey': this.serviceRoleKey,
      'Authorization': `Bearer ${this.serviceRoleKey}`,
    };
  }

  /**
   * Perform a SELECT request
   * @param table - Table name
   * @param options - Query options (select, filters, etc.)
   * @param useServiceRole - Whether to use service role key
   */
  async select<T = any>(
    table: string,
    options: {
      select?: string;
      filter?: Record<string, any>;
      orderBy?: { column: string; ascending?: boolean };
      limit?: number;
      offset?: number;
    } = {},
    useServiceRole: boolean = false
  ): Promise<{ data: T[] | null; error: Error | null }> {
    try {
      const headers = useServiceRole ? this.getServiceRoleHeaders() : this.getAnonHeaders();
      
      // Build query parameters
      const params = new URLSearchParams();
      
      // Select columns
      if (options.select) {
        params.append('select', options.select);
      } else {
        params.append('select', '*');
      }
      
      // Filters
      if (options.filter) {
        for (const [key, value] of Object.entries(options.filter)) {
          params.append(key, `eq.${value}`);
        }
      }
      
      // Order
      if (options.orderBy) {
        params.append('order', `${options.orderBy.column}.${options.orderBy.ascending !== false ? 'asc' : 'desc'}`);
      }
      
      // Limit
      if (options.limit !== undefined) {
        params.append('limit', options.limit.toString());
      }
      
      // Offset
      if (options.offset !== undefined) {
        params.append('offset', options.offset.toString());
      }
      
      const queryString = params.toString();
      const url = `${this.url}/rest/v1/${table}${queryString ? '?' + queryString : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return {
          data: null,
          error: new Error(errorData.message || 'Failed to fetch data'),
        };
      }
      
      const data = await response.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error('An unknown error occurred'),
      };
    }
  }

  /**
   * Perform an INSERT request
   * @param table - Table name
   * @param data - Data to insert
   * @param useServiceRole - Whether to use service role key
   */
  async insert<T = any>(
    table: string,
    data: T | T[],
    useServiceRole: boolean = false
  ): Promise<{ data: T[] | null; error: Error | null }> {
    try {
      const headers = useServiceRole ? this.getServiceRoleHeaders() : this.getAnonHeaders();
      
      const response = await fetch(`${this.url}/rest/v1/${table}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(Array.isArray(data) ? data : [data]),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return {
          data: null,
          error: new Error(errorData.message || 'Failed to insert data'),
        };
      }
      
      const result = await response.json();
      return { data: result, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error('An unknown error occurred'),
      };
    }
  }

  /**
   * Perform an UPDATE request
   * @param table - Table name
   * @param data - Data to update
   * @param matchColumn - Column to match for updates (defaults to 'id')
   * @param useServiceRole - Whether to use service role key
   */
  async update<T = any>(
    table: string,
    data: Partial<T> & Record<string, any>,
    matchColumn: string = 'id',
    useServiceRole: boolean = false
  ): Promise<{ data: T[] | null; error: Error | null }> {
    try {
      if (!data[matchColumn]) {
        return {
          data: null,
          error: new Error(`Match column '${matchColumn}' value is required for update`),
        };
      }
      
      const headers = useServiceRole ? this.getServiceRoleHeaders() : this.getAnonHeaders();
      
      const response = await fetch(`${this.url}/rest/v1/${table}?${matchColumn}=eq.${data[matchColumn]}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return {
          data: null,
          error: new Error(errorData.message || 'Failed to update data'),
        };
      }
      
      const result = await response.json();
      return { data: result, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error('An unknown error occurred'),
      };
    }
  }

  /**
   * Perform a DELETE request
   * @param table - Table name
   * @param matchColumn - Column to match for deletion (defaults to 'id')
   * @param matchValue - Value to match for deletion
   * @param useServiceRole - Whether to use service role key
   */
  async delete(
    table: string,
    matchColumn: string = 'id',
    matchValue: any,
    useServiceRole: boolean = false
  ): Promise<{ data: any[] | null; error: Error | null }> {
    try {
      const headers = useServiceRole ? this.getServiceRoleHeaders() : this.getAnonHeaders();
      
      const response = await fetch(`${this.url}/rest/v1/${table}?${matchColumn}=eq.${matchValue}`, {
        method: 'DELETE',
        headers,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return {
          data: null,
          error: new Error(errorData.message || 'Failed to delete data'),
        };
      }
      
      const result = await response.json();
      return { data: result, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error('An unknown error occurred'),
      };
    }
  }

  /**
   * Perform a raw request for advanced use cases
   * @param endpoint - API endpoint (without base URL)
   * @param options - Fetch options
   * @param useServiceRole - Whether to use service role key
   */
  async request<T = any>(
    endpoint: string,
    options: RequestInit = {},
    useServiceRole: boolean = false
  ): Promise<{ data: T | null; error: Error | null }> {
    try {
      const headers = useServiceRole ? this.getServiceRoleHeaders() : this.getAnonHeaders();
      
      // Merge headers
      const mergedHeaders = new Headers(headers);
      if (options.headers) {
        Object.entries(options.headers).forEach(([key, value]) => {
          mergedHeaders.set(key, value);
        });
      }
      
      const response = await fetch(`${this.url}/rest/v1/${endpoint}`, {
        ...options,
        headers: mergedHeaders,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return {
          data: null,
          error: new Error(errorData.message || 'Request failed'),
        };
      }
      
      const data = await response.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error('An unknown error occurred'),
      };
    }
  }
}

// Export a default instance for convenience (using environment variables)
export const supabaseRest = new SupabaseRestClient();

// Export a factory function to create instances with custom configuration
export function createSupabaseRestClient(
  url: string,
  anonKey: string,
  serviceRoleKey?: string
) {
  return new SupabaseRestClient(url, anonKey, serviceRoleKey);
}