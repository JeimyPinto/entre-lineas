# API Service-to-Service Communication Examples

## Overview

This collection demonstrates how different types of services can communicate with each other using the Supabase REST API client. The examples cover web services, admin services, and external services, showing appropriate authentication methods and access patterns for each.

## Files Created

1. **`service-examples.ts`** - Basic examples showing the three service types
2. **`detailed-service-examples.ts`** - Comprehensive examples with specific use cases
3. **`SERVICE_EXAMPLES_README.md`** - Documentation for the basic examples
4. **`API_EXAMPLES_SUMMARY.md`** - This summary document

## Service Types Demonstrated

### 1. Web Services (Public-Facing)
- **Authentication**: Anon key
- **Use Cases**: 
  - Fetching published content (blog posts, products)
  - Displaying public data to end users
  - User-generated content submission (with appropriate RLS)
- **Permissions**: Typically read-only access to published/non-sensitive data

### 2. Admin Services (Internal Tools)
- **Authentication**: Service role key (when available)
- **Use Cases**:
  - Analytics and reporting dashboards
  - Content moderation systems
  - User management interfaces
  - Internal business tools
- **Permissions**: Elevated access, often bypassing RLS for administrative functions

### 3. External Services (Third-Party Integrations)
- **Authentication**: Anon key with restrictive RLS policies
- **Use Cases**:
  - Payment processor webhooks (Stripe, PayPal)
  - Marketing automation platforms
  - CRM systems
  - Analytics services
  - CI/CD deployment notifications
- **Permissions**: Limited access based on service function (often insert-only or specific table access)

## Key Communication Patterns

### Data Fetching Patterns
- **Public Data**: Web services using anon key with filters for published/active content
- **Internal Data**: Admin services using service role key for comprehensive access
- **Filtered External Access**: External services with RLS-restricted anon key access

### Data Modification Patterns
- **User-Generated Content**: Web services inserting/updating user-specific data
- **System Updates**: Admin services performing bulk operations or system maintenance
- **Event Logging**: External services inserting webhook events or activity logs

### Advanced Patterns
- **RPC Calls**: Admin services calling stored procedures for complex calculations
- **Batch Operations**: Services processing multiple records efficiently
- **Real-time Updates**: Services listening to changes (would use Supabase Realtime in practice)

## Implementation Details

### Authentication Methods
1. **Anon Key**: Used by web and external services for client-accessible operations
2. **Service Role Key**: Used by admin services for trusted backend operations
3. **Key Selection**: Controlled by the `useServiceRole` parameter in API calls

### Error Handling
- Comprehensive error handling for network issues, validation errors, and permission problems
- Specific error messages to help with debugging service interactions
- Graceful degradation when optional features (like RPC functions) aren't available

### Data Validation
- Input validation for all service requests
- Proper HTTP status codes for different error scenarios
- Clear separation between client errors (4xx) and server errors (5xx)

## Recommended Directory Structure

For production implementation, these examples should be organized as:

```
/src/app/api/
  ├── examples/
  │   ├── route.ts              # Main examples endpoint
  │   ├── web-service.ts        # Web service specific examples
  │   ├── admin-service.ts      # Admin service specific examples
  │   ├── external-service.ts   # External service specific examples
  │   └── README.md             # Documentation
  └── lib/
      └── supabaseRest.ts       # Supabase REST client utility
```

## Environment Requirements

To fully utilize these examples, ensure your environment has:

1. **NEXT_PUBLIC_SUPABASE_URL** - Supabase project URL
2. **NEXT_PUBLIC_SUPABASE_ANON_KEY** - Public anon key
3. **SUPABASE_SERVICE_ROLE_KEY** - Service role key (for admin service examples)

## Security Considerations

1. **RLS Policies**: Implement appropriate Row Level Security policies for each table
2. **Key Protection**: Never expose service role keys in client-side code
3. **Rate Limiting**: Consider implementing rate limiting for external service endpoints
4. **Input Validation**: Always validate and sanitize data from external services
5. **Audit Logging**: Log service-to-service interactions for security monitoring

## Testing These Examples

### GET Requests
- `GET /api/service-examples` - Basic service communication examples
- `GET /api/detailed-service-examples` - Comprehensive use case examples

### POST Requests
Both endpoints accept POST requests with JSON body:
```json
{
  "serviceType": "web|admin|external",
  "operation": "read|create|update|delete|rpc",
  "table": "table_name",
  "data": { /* operation-specific data */ },
  "filters": { /* for read operations */ },
  "useServiceRole": false
}
```

## Extending the Examples

To add more service types or communication patterns:

1. Create new API routes following the same patterns
2. Extend the SupabaseRestClient with additional helper methods if needed
3. Add specific RLS policies for new service access patterns
4. Create documentation for new service communication flows