'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function loginWithDiscord() {
  const supabase = await createServerSupabaseClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!supabase) {
    // If Supabase is not configured yet, simulate logging in as an admin for development
    const cookieStore = await cookies();
    cookieStore.set('nld_simulated_user', '1001', { path: '/' });
    redirect('/');
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
      scopes: 'identify email',
    },
  });

  if (error || !data.url) {
    throw new Error(error?.message || 'Failed to initialize Discord login');
  }

  redirect(data.url);
}

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    await supabase.auth.signOut();
  }

  const cookieStore = await cookies();
  cookieStore.delete('nld_simulated_user');
  redirect('/');
}

export async function simulateUserSwitch(discordId: string | null) {
  const cookieStore = await cookies();
  if (!discordId) {
    cookieStore.delete('nld_simulated_user');
  } else {
    cookieStore.set('nld_simulated_user', discordId, { path: '/' });
  }
  redirect('/');
}
