# Service-to-Service Communication Examples

This file contains examples demonstrating how different services can communicate with each other using the Supabase REST API client.

## Overview

The examples showcase three types of service communication patterns:

1. **Web Service** - Public-facing services using anon keys for read-only access to published data
2. **Admin Service** - Internal services using service role keys for elevated privileges (bypassing RLS)
3. **External Service** - Third-party services using anon keys with appropriate RLS policies for specific operations

## Files

- `service-examples.ts` - Main API route demonstrating service-to-service communication patterns
- `supabaseRest.ts` - The Supabase REST client utility (located in `@/lib/supabaseRest.ts`)

## Usage

### GET Request
Returns examples of all three service types communicating with Supabase:
- Web service fetching public posts
- Admin service fetching platform analytics (via RPC)
- External service storing webhook events

### POST Request
Allows testing different CRUD operations with configurable service roles:
```json
{
  "action": "create|read|update|delete",
  "table": "table_name",
  "data": { /* record data */ },
  "useServiceRole": false
}
```

## Organization Note

Ideally, these examples would be organized in a directory structure like:
```
/src/app/api/examples/
  ├── route.ts          // Main API route
  └── README.md         // Documentation
```

However, due to environment constraints, they are currently implemented as:
- `/src/app/api/service-examples.ts` - Main API route
- `/src/app/api/SERVICE_EXAMPLES_README.md` - This documentation

## Key Concepts Demonstrated

1. **Anon Key Usage** - For public/client-side accessible operations
2. **Service Role Key Usage** - For trusted backend services requiring elevated privileges
3. **RLS Policies** - How different key types interact with Row Level Security
4. **Error Handling** - Proper error handling patterns for service communication
5. **Request/Response Patterns** - Standardized API communication formats

## Best Practices

1. Always validate incoming data from external services
2. Use service role keys only in trusted environments
3. Implement proper error handling and logging
4. Use appropriate HTTP status codes for different scenarios
5. Log service-to-service interactions for audit trails
6. Implement rate limiting for external service endpoints