import { NextResponse } from 'next/server';
import { supabaseRest } from '@/lib/supabaseRest';

/**
 * GET /api/detailed-service-examples
 * Detailed examples showing specific service implementations
 */
export async function GET() {
  try {
    const results: Record<string, any> = {};

    // ========== WEB SERVICE EXAMPLES ==========
    // These represent public-facing services (websites, mobile apps)
    
    // 1. Blog service fetching published articles
    const { data: blogPosts, error: blogError } = await supabaseRest.select('articles', {
      select: 'id,title,excerpt,author_name,published_at,cover_image',
      filter: { status: 'published' },
      orderBy: { column: 'published_at', ascending: false },
      limit: 5
    });
    
    results.webService = {
      blog: {
        description: 'Blog service fetching published articles for homepage',
        data: blogPosts || [],
        error: blogError ? blogError.message : null,
        authMethod: 'anon key',
        permissions: 'Read-only access to published content'
      }
    };

    // 2. E-commerce service fetching available products
    const { data: products, error: productsError } = await supabaseRest.select('products', {
      select: 'id,name,price,stock_quantity,category_id,images',
      filter: { 
        status: 'active',
        stock_quantity: { gt: 0 } 
      },
      orderBy: { column: 'created_at', ascending: false },
      limit: 10
    });
    
    results.webService.ecommerce = {
      description: 'E-commerce service fetching in-stock products',
      data: products || [],
      error: productsError ? productsError.message : null,
      authMethod: 'anon key',
      permissions: 'Read-only access to active products with stock'
    };

    // ========== ADMIN SERVICE EXAMPLES ==========
    // These represent internal services (dashboard, analytics, management tools)
    
    // Check if service role is available
    const hasServiceRole = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (hasServiceRole) {
      // 1. Analytics service fetching comprehensive metrics
      const { data: analytics, error: analyticsError } = await supabaseRest.request(
        'rpc/get_dashboard_analytics',
        { method: 'GET' },
        true
      );
      
      results.adminService = {
        analytics: {
          description: 'Admin service fetching platform-wide analytics',
          data: analytics || null,
          error: analyticsError ? analyticsError.message : null,
          authMethod: 'service role key',
          permissions: 'Full access to all data for analytics'
        }
      };

      // 2. Content moderation service
      const { data: flaggedContent, error: modError } = await supabaseRest.select('content_reports', {
        select: 'id,reporter_id,reported_content_id,reason,status,created_at',
        filter: { status: 'pending' },
        orderBy: { column: 'created_at', ascending: true },
        limit: 20
      }, true); // Using service role
      
      results.adminService.moderation = {
        description: 'Admin service fetching pending content moderation reports',
        data: flaggedContent || [],
        error: modError ? modError.message : null,
        authMethod: 'service role key',
        permissions: 'Access to all reports for moderation workflow'
      };

      // 3. User management service
      const { data: userStats, error: userError } = await supabaseRest.request(
        'rpc/get_user_growth_metrics',
        { method: 'GET' },
        true
      );
      
      results.adminService.userManagement = {
        description: 'Admin service fetching user growth and engagement metrics',
        data: userStats || null,
        error: userError ? userError.message : null,
        authMethod: 'service role key',
        permissions: 'Access to user analytics for product decisions'
      };
    } else {
      results.adminService = {
        description: 'Admin service examples skipped - service role key not configured',
        note: 'Set SUPABASE_SERVICE_ROLE_KEY environment variable to enable admin service examples'
      };
    }

    // ========== EXTERNAL SERVICE EXAMPLES ==========
    // These represent third-party services (payment processors, marketing tools, etc.)
    
    // 1. Payment webhook handler
    const paymentWebhook = {
      id: `wh_${Date.now()}`,
      timestamp: new Date().toISOString(),
      source: 'stripe',
      type: 'payment.succeeded',
      data: {
        object: {
          id: 'pi_1234567890',
          amount: 2999,
          currency: 'usd',
          status: 'succeeded',
          customer: 'cus_1234567890'
        }
      }
    };
    
    const { data: storedPayment, error: paymentError } = await supabaseRest.insert(
      'payment_webhooks',
      paymentWebhook
    );
    
    results.externalService = {
      paymentProcessor: {
        description: 'External payment processor sending webhook events',
        data: storedPayment || null,
        error: paymentError ? paymentError.message : null,
        authMethod: 'anon key',
        permissions: 'Insert-only access to webhook events table (via RLS)'
      }
    };

    // 2. Marketing automation service
    const marketingEvent = {
      id: `me_${Date.now()}`,
      timestamp: new Date().toISOString(),
      source: 'marketing-automation',
      event_type: 'email_campaign_sent',
      user_id: 'user_12345',
      campaign_id: 'camp_spring_2026',
      metadata: {
        opens: 1245,
        clicks: 89,
        conversions: 12
      }
    };
    
    const { data: storedMarketing, error: marketingError } = await supabaseRest.insert(
      'marketing_events',
      marketingEvent
    );
    
    if (!results.externalService) {
      results.externalService = {};
    }
    
    results.externalService.marketingAutomation = {
      description: 'External marketing service tracking campaign performance',
      data: storedMarketing || null,
      error: marketingError ? marketingError.message : null,
      authMethod: 'anon key',
      permissions: 'Insert-only access to marketing events table (via RLS)'
    };

    return NextResponse.json({
      message: 'Detailed service-to-service communication examples executed',
      timestamp: new Date().toISOString(),
      services: results
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/detailed-service-examples
 * Interactive examples for testing service communications
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      serviceType, 
      operation, 
      table, 
      data, 
      filters = {}, 
      useServiceRole = false 
    } = body;

    // Validate required fields
    if (!serviceType || !operation || !table) {
      return NextResponse.json(
        { error: 'Missing required fields: serviceType, operation, and table are required' },
        { status: 400 }
      );
    }

    let result: any;
    let error: any;

    try {
      switch (operation.toLowerCase()) {
        case 'read':
          ({ data: result, error } = await supabaseRest.select(table, {
            select: data?.select || '*',
            filter: filters,
            orderBy: data?.orderBy,
            limit: data?.limit,
            offset: data?.offset
          }, useServiceRole));
          break;
          
        case 'create':
          ({ data: result, error } = await supabaseRest.insert(table, data, useServiceRole));
          break;
          
        case 'update':
          if (!data?.id) {
            return NextResponse.json(
              { error: 'Update operation requires an id field in data' },
              { status: 400 }
            );
          }
          ({ data: result, error } = await supabaseRest.update(table, data, 'id', useServiceRole));
          break;
          
        case 'delete':
          if (!data?.id) {
            return NextResponse.json(
              { error: 'Delete operation requires an id field in data' },
              { status: 400 }
            );
          }
          ({ data: result, error } = await supabaseRest.delete(table, 'id', data.id, useServiceRole));
          break;
          
        case 'rpc':
          if (!data?.endpoint) {
            return NextResponse.json(
              { error: 'RPC operation requires an endpoint field in data' },
              { status: 400 }
            );
          }
          ({ data: result, error } = await supabaseRest.request(
            data.endpoint,
            { method: data.method || 'GET', body: data.body ? JSON.stringify(data.body) : undefined },
            useServiceRole
          ));
          break;
          
        default:
          return NextResponse.json(
            { error: 'Invalid operation. Supported operations: read, create, update, delete, rpc' },
            { status: 400 }
          );
      }
    } catch (opError) {
      error = opError;
    }

    if (error) {
      return NextResponse.json(
        { 
          error: `Failed to ${operation} data for ${serviceType} service`, 
          details: error.message,
          serviceType,
          operation,
          table
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `${serviceType} service ${operation} operation completed successfully`,
      service: {
        type: serviceType,
        operation,
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