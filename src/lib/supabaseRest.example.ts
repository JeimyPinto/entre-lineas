/**
 * Example usage of the Supabase REST API client for external services
 * This file demonstrates how to use the SupabaseRestClient in various scenarios
 */

import { SupabaseRestClient, supabaseRest, createSupabaseRestClient } from './supabaseRest';

// Example 1: Using the default instance (reads from environment variables)
// This is suitable for Next.js API routes or server-side code where env vars are available
export async function exampleDefaultInstance() {
  try {
    // Select data using anon key (default)
    const { data: users, error } = await supabaseRest.select('users', {
      select: 'id,email,created_at',
      limit: 10
    });
    
    if (error) {
      console.error('Error fetching users:', error);
      return;
    }
    
    console.log('Users fetched with anon key:', users);
    
    // Insert data using anon key
    const { data: newUser, error: insertError } = await supabaseRest.insert('users', {
      email: 'example@example.com',
      // other fields...
    });
    
    if (insertError) {
      console.error('Error inserting user:', insertError);
      return;
    }
    
    console.log('User inserted with anon key:', newUser);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

// Example 2: Creating a custom instance with explicit configuration
// Useful when you need to connect to different Supabase projects or override env vars
export async function exampleCustomInstance() {
  const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';
  
  // Create a custom client instance
  const supabase = createSupabaseRestClient(supabaseUrl, supabaseAnonKey, supabaseServiceRoleKey);
  
  try {
    // Select data using anon key
    const { data: products, error } = await supabase.select('products', {
      select: 'id,name,price',
      filter: { active: true },
      orderBy: { column: 'created_at', ascending: false },
      limit: 5
    });
    
    if (error) {
      console.error('Error fetching products:', error);
      return;
    }
    
    console.log('Products fetched with anon key:', products);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

// Example 3: Using service role key for admin operations
// Service role key bypasses RLS policies and should only be used in trusted environments
export async function exampleServiceRoleUsage() {
  // Check if service role key is available
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('Service role key not configured - skipping service role examples');
    return;
  }
  
  // Method 1: Using the default instance with service role flag
  try {
    // Update data using service role key (bypasses RLS)
    const { data: updatedUsers, error } = await supabaseRest.update('users', {
      id: 'some-user-id',
      role: 'admin',
      updated_at: new Date().toISOString()
    }, 'id', true); // true = use service role
    
    if (error) {
      console.error('Error updating user with service role:', error);
      return;
    }
    
    console.log('User updated with service role key:', updatedUsers);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
  
  // Method 2: Using a custom instance with service role key
  try {
    const supabaseAdmin = createSupabaseRestClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // Service role key for admin operations
    );
    
    // Delete data using service role key
    const { data: deletedItems, error: deleteError } = await supabaseAdmin.delete(
      'temp_files',
      'id',
      'some-temp-file-id',
      true // use service role
    );
    
    if (deleteError) {
      console.error('Error deleting temp file with service role:', deleteError);
      return;
    }
    
    console.log('Temp file deleted with service role key:', deletedItems);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

// Example 4: Performing raw requests for advanced use cases
export async function exampleRawRequest() {
  try {
    // Custom query with specific columns and filters
    const { data: orders, error } = await supabaseRest.request('orders?select=id,user_id,total,status&status=eq.pending&order=created_at.desc', {
      method: 'GET'
    });
    
    if (error) {
      console.error('Error fetching orders:', error);
      return;
    }
    
    console.log('Pending orders fetched via raw request:', orders);
    
    // Using service role for raw request
    const { data: adminStats, error: statsError } = await supabaseRest.request(
      'rpc/get_admin_statistics', // Calling a stored procedure
      {
        method: 'POST',
        body: JSON.stringify({ start_date: '2026-01-01', end_date: '2026-06-09' })
      },
      true // use service role
    );
    
    if (statsError) {
      console.error('Error fetching admin stats:', statsError);
      return;
    }
    
    console.log('Admin statistics fetched with service role:', adminStats);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

// Example 5: Error handling patterns
export async function exampleErrorHandling() {
  try {
    // Attempt to select from a non-existent table
    const { data, error } = await supabaseRest.select('non_existent_table');
    
    if (error) {
      // Handle specific error types
      if (error.message.includes('Could not find')) {
        console.log('Table does not exist - this might be expected in development');
      } else if (error.message.includes('invalid')) {
        console.log('Invalid request - check your query parameters');
      } else {
        console.error('Database error:', error);
      }
      return;
    }
    
    console.log('Data:', data);
  } catch (err) {
    // Handle network errors or unexpected issues
    if (err instanceof TypeError && err.message.includes('fetch')) {
      console.error('Network error - check your connection and Supabase URL');
    } else {
      console.error('Unexpected error:', err);
    }
  }
}

// Example 6: Batch operations
export async function exampleBatchOperations() {
  try {
    // Insert multiple records at once
    const newUsers = [
      { email: 'user1@example.com', name: 'User One' },
      { email: 'user2@example.com', name: 'User Two' },
      { email: 'user3@example.com', name: 'User Three' }
    ];
    
    const { data: insertedUsers, error: insertError } = await supabaseRest.insert('users', newUsers);
    
    if (insertError) {
      console.error('Error inserting batch users:', insertError);
      return;
    }
    
    console.log('Batch inserted users:', insertedUsers);
    
    if (!insertedUsers) return;
    
    // Update multiple records (requires knowing the IDs)
    const userIds = (insertedUsers as Array<{ id: string; email: string; name: string }>).map(user => user.id);
    
    // Note: For batch updates, you'd typically loop or use a different approach
    // depending on your database structure and requirements
    for (const userId of userIds) {
      const { data: updatedUser, error: updateError } = await supabaseRest.update(
        'users',
        { last_login_at: new Date().toISOString() },
        'id',
        false // using anon key
      );
      
      if (updateError) {
        console.error(`Error updating user ${userId}:`, updateError);
      } else {
        console.log(`Updated user ${userId}:`, updatedUser);
      }
    }
  } catch (err) {
    console.error('Unexpected error in batch operations:', err);
  }
}

// Run all examples (for demonstration purposes)
// In practice, you would call these functions individually as needed
if (require.main === module) {
  console.log('Running Supabase REST API examples...\n');
  
  exampleDefaultInstance().then(() => console.log('✓ Default instance example completed\n'));
  exampleCustomInstance().then(() => console.log('✓ Custom instance example completed\n'));
  exampleServiceRoleUsage().then(() => console.log('✓ Service role usage example completed\n'));
  exampleRawRequest().then(() => console.log('✓ Raw request example completed\n'));
  exampleErrorHandling().then(() => console.log('✓ Error handling example completed\n'));
  exampleBatchOperations().then(() => console.log('✓ Batch operations example completed\n'));
}