import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/';

  if (code) {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error && data?.session?.user) {
        const user = data.session.user;
        const discordId =
          user.user_metadata?.provider_id ||
          user.identities?.find((i) => i.provider === 'discord')?.id ||
          user.id;

        // Upsert into profiles
        await supabase.from('profiles').upsert(
          {
            id: user.id,
            discord_id: discordId,
            username: user.user_metadata?.full_name || user.user_metadata?.custom_claims?.global_name || 'Driver',
            avatar_url: user.user_metadata?.avatar_url || null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        );
      }
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
