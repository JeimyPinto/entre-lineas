import { NextResponse } from 'next/server';
import { supabaseRest } from '@/lib/supabaseRest';

/**
 * GET /api/service-examples
 * Demonstrates basic service-to-service communication using Supabase REST API
 * Shows how web services can communicate with each other through Supabase
 */
export async function GET() {
  try {
    // Example 1: Web service fetching public data (using anon key)
    const { data: publicPosts, error: postsError } = await supabaseRest.select('posts', {
      select: 'id,title,author,created_at',
      filter: { published: true },
      orderBy: { column: 'created_at', ascending: false },
      limit: 10
    });

    if (postsError) {
      return NextResponse.json(
        { error: 'Failed to fetch public posts', details: postsError.message },
        { status: 500 }
      );
    }

    // Example 2: Admin service fetching sensitive data (using service role)
    const { data: adminStats, error: statsError } = await supabaseRest.request(
      'rpc/get_platform_analytics',
      { method: 'GET' },
      true // Use service role key for admin operations
    );

    if (statsError && !statsError.message.includes('Could not find')) {
      // Ignore if the RPC function doesn't exist yet
      console.warn('Admin stats RPC not available:', statsError.message);
    }

    // Example 3: External service webhook processing data
    const webhookData = {
      timestamp: new Date().toISOString(),
      source: 'external-service',
      event_type: 'user_engagement',
      payload: {
        user_id: 'ext-user-123',
        action: 'page_view',
        metadata: { page: '/service-examples', referrer: 'external-site.com' }
      }
    };

    // Store webhook data using anon key (assuming RLS policies allow inserts)
    const { data: storedWebhook, error: webhookError } = await supabaseRest.insert(
      'webhook_events',
      webhookData
    );

    if (webhookError) {
      return NextResponse.json(
        { error: 'Failed to store webhook data', details: webhookError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Service-to-service communication examples executed successfully',
      examples: {
        webService: {
          description: 'Web service fetching published posts',
          data: publicPosts,
          authMethod: 'anon key (public access)'
        },
        adminService: {
          description: 'Admin service fetching platform analytics',
          data: adminStats || null,
          authMethod: 'service role key (bypasses RLS)',
          note: adminStats ? 'Data retrieved successfully' : 'RPC function may not exist yet'
        },
        externalService: {
          description: 'External service storing webhook events',
          data: storedWebhook,
          authMethod: 'anon key (with appropriate RLS policies)'
        }
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/service-examples
 * Demonstrates service-to-service communication for data modification
 * Shows how different services can create/update data through Supabase
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, table, data, useServiceRole = false } = body;

    // Validate required fields
    if (!action || !table || !data) {
      return NextResponse.json(
        { error: 'Missing required fields: action, table, and data are required' },
        { status: 400 }
      );
    }

    let result;
    let error;

    switch (action.toLowerCase()) {
      case 'create':
        ({ data: result, error } = await supabaseRest.insert(table, data, useServiceRole));
        break;
      case 'read':
        ({ data: result, error } = await supabaseRest.select(table, data, useServiceRole));
        break;
      case 'update':
        if (!data.id) {
          return NextResponse.json(
            { error: 'Update action requires an id field in data' },
            { status: 400 }
          );
        }
        ({ data: result, error } = await supabaseRest.update(table, data, 'id', useServiceRole));
        break;
      case 'delete':
        if (!data.id) {
          return NextResponse.json(
            { error: 'Delete action requires an id field in data' },
            { status: 400 }
          );
        }
        ({ data: result, error } = await supabaseRest.delete(table, 'id', data.id, useServiceRole));
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions: create, read, update, delete' },
          { status: 400 }
        );
    }

    if (error) {
      return NextResponse.json(
        { error: `Failed to ${action} data`, details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `Service-to-service ${action} operation completed successfully`,
      operation: {
        action,
        table,
        usedServiceRole: useServiceRole,
        timestamp: new Date().toISOString()
      },
      data: result
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}