import { createServerSupabaseClient } from '../supabase/server';
import { cookies } from 'next/headers';

/**
 * Parses comma-separated ADMIN_DISCORD_IDS from environment
 */
export function getAdminDiscordIds(): string[] {
  const adminIdsStr = process.env.ADMIN_DISCORD_IDS || '';
  return adminIdsStr
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
}

/**
 * Checks if a given Discord ID is an authorized admin
 */
export function isDiscordIdAdmin(discordId: string | null | undefined): boolean {
  if (!discordId) return false;
  const adminIds = getAdminDiscordIds();
  return adminIds.includes(discordId);
}

/**
 * Retrieves the currently logged-in user's profile and Discord ID on the server
 */
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const simulatedDiscordId = cookieStore.get('nld_simulated_user')?.value;

  // If a simulated user cookie exists (for local preview / testing)
  if (simulatedDiscordId) {
    const isAdmin = isDiscordIdAdmin(simulatedDiscordId);
    return {
      id: simulatedDiscordId,
      discordId: simulatedDiscordId,
      username: simulatedDiscordId === '1001' ? 'GhostRider' : 'Driver' + simulatedDiscordId,
      avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
      isAdmin,
    };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return null;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return null;
  }

  // Extract Discord identity from user metadata / identities
  const discordIdentity = session.user.identities?.find(
    (id) => id.provider === 'discord'
  );
  const discordId =
    (session.user.user_metadata?.provider_id as string) ||
    discordIdentity?.id ||
    session.user.user_metadata?.sub;

  const isAdmin = isDiscordIdAdmin(discordId);

  return {
    id: session.user.id,
    discordId: discordId as string,
    username: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'Driver',
    avatarUrl: session.user.user_metadata?.avatar_url || null,
    isAdmin,
  };
}

/**
 * Server-side protection check. Throws or returns boolean.
 */
export async function verifyAdminServerSide(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user || !user.discordId) {
    return false;
  }
  return isDiscordIdAdmin(user.discordId);
}
