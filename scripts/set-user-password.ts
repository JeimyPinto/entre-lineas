import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!serviceRoleKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in environment');
  console.log('\nTo get this key:');
  console.log('1. Go to Supabase Dashboard → Settings → API');
  console.log('2. Copy the "service_role" secret');
  console.log('3. Add to .env.local: SUPABASE_SERVICE_ROLE_KEY=your_key');
  process.exit(1);
}

const email = process.argv[2];
const newPassword = process.argv[3];

if (!email || !newPassword) {
  console.log('Usage: npx tsx scripts/set-user-password.ts <email> <newPassword>');
  console.log('\nExample:');
  console.log('  npx tsx scripts/set-user-password.ts contactojeimypinto@gmail.com TuPassword123');
  process.exit(1);
}

async function setUserPassword() {
  console.log(`\n🔐 Setting password for: ${email}`);
  
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

// Get user by email first
  const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  
  if (listError) {
    console.error('❌ Error listing users:', listError.message);
    return;
  }

  const user = users.find(u => u.email === email);
  
  if (!user) {
    console.error(`❌ User not found: ${email}`);
    console.log('\nExisting users:');
    users?.forEach(u => console.log(`  - ${u.email}`));
    return;
  }

  console.log(`✓ User found: ${user.id}`);
  console.log(`  Email: ${user.email}`);
  console.log(`  Created: ${user.created_at}`);

  // Update user with password
  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
    user.id,
    { password: newPassword }
  );

  if (updateError) {
    console.error('❌ Error setting password:', updateError.message);
    return;
  }

  console.log(`✓ Password updated successfully!`);
  console.log(`\n📝 User can now login with:`);
  console.log(`   Email: ${email}`);
  console.log(`   Password: ${newPassword}`);
}

setUserPassword();
