'use server';

import { verifyAdminServerSide } from '@/lib/auth/admin';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * Sends a rich embed message to the configured Discord Webhook URL
 */
export async function sendDiscordWebhookEmbed(payload: {
  title: string;
  description: string;
  color?: number; // Discord embed color integer (e.g. Purple: 0xa855f7, Blue: 0x06b6d4)
  fields?: { name: string; value: string; inline?: boolean }[];
  url?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
}) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('DISCORD_WEBHOOK_URL is not configured in environment variables.');
    return { success: false, message: 'DISCORD_WEBHOOK_URL not configured in environment' };
  }

  const embed = {
    title: payload.title,
    description: payload.description,
    color: payload.color ?? 0xa855f7,
    fields: payload.fields || [],
    url: payload.url,
    thumbnail: payload.thumbnailUrl ? { url: payload.thumbnailUrl } : undefined,
    image: payload.imageUrl ? { url: payload.imageUrl } : undefined,
    author: {
      name: 'NO LICENSED DRIVERS // NLD BOT',
      icon_url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&auto=format&fit=crop&q=80',
    },
    footer: {
      text: 'No Licensed Drivers Official Community • NLD Studios',
    },
    timestamp: new Date().toISOString(),
  };

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'NLD Pit Boss',
        avatar_url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&auto=format&fit=crop&q=80',
        embeds: [embed],
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return { success: false, message: `Webhook error: ${errorText}` };
    }

    return { success: true, message: 'Announced successfully on Discord!' };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, message: `Failed to dispatch webhook: ${errMsg}` };
  }
}

/**
 * Server Action: Update player leaderboard scores
 */
export async function updateLeaderboardPointsAction(formData: FormData) {
  const isAdmin = await verifyAdminServerSide();
  if (!isAdmin) {
    throw new Error('License Revoked - Access Denied');
  }

  const discordId = formData.get('discordId') as string;
  const participation = parseInt(formData.get('participation') as string, 10) || 0;
  const placement = parseInt(formData.get('placement') as string, 10) || 0;
  const mvp = parseInt(formData.get('mvp') as string, 10) || 0;
  const announceOnDiscord = formData.get('announce') === 'true';
  const playerName = formData.get('playerName') as string;

  const supabase = await createServerSupabaseClient();
  if (supabase) {
    await supabase
      .from('leaderboard')
      .update({
        participation_points: participation,
        placement_points: placement,
        mvp_points: mvp,
        updated_at: new Date().toISOString(),
      })
      .eq('discord_id', discordId);
  }

  if (announceOnDiscord) {
    const total = participation + placement + mvp;
    await sendDiscordWebhookEmbed({
      title: `⚡ LEADERBOARD UPDATED: ${playerName || discordId}`,
      description: `New tournament scores registered for **${playerName || discordId}**.`,
      color: 0x06b6d4, // Neon Cyan
      fields: [
        { name: 'Participation', value: `${participation} pts`, inline: true },
        { name: 'Placement', value: `${placement} pts`, inline: true },
        { name: 'MVP Points', value: `${mvp} pts`, inline: true },
        { name: 'Total Score', value: `🏆 **${total} pts**`, inline: false },
      ],
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/leaderboard`,
    });
  }

  revalidatePath('/leaderboard');
  revalidatePath('/admin');
  return { success: true };
}

/**
 * Server Action: Add a new video to NLD Studios
 */
export async function addNewVideoAction(formData: FormData) {
  const isAdmin = await verifyAdminServerSide();
  if (!isAdmin) {
    throw new Error('License Revoked - Access Denied');
  }

  const creatorName = formData.get('creatorName') as 'Bob' | 'Strazak';
  const title = formData.get('title') as string;
  const youtubeUrl = formData.get('youtubeUrl') as string;
  const description = (formData.get('description') as string) || '';
  const isFeatured = formData.get('isFeatured') === 'true';
  const announceOnDiscord = formData.get('announce') === 'true';

  // Extract YouTube ID
  let videoId = '';
  try {
    const parsed = new URL(youtubeUrl);
    if (parsed.hostname.includes('youtu.be')) {
      videoId = parsed.pathname.slice(1);
    } else {
      videoId = parsed.searchParams.get('v') || '';
    }
  } catch {
    videoId = youtubeUrl.slice(-11);
  }

  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1280&auto=format&fit=crop&q=80';

  const supabase = await createServerSupabaseClient();
  if (supabase) {
    // If setting as featured, remove featured from other videos
    if (isFeatured) {
      await supabase.from('videos').update({ is_featured: false }).neq('id', '0');
    }

    await supabase.from('videos').insert({
      creator_name: creatorName,
      title,
      youtube_url: youtubeUrl,
      youtube_video_id: videoId || 'dQw4w9WgXcQ',
      thumbnail_url: thumbnailUrl,
      description,
      is_featured: isFeatured,
    });
  }

  if (announceOnDiscord) {
    await sendDiscordWebhookEmbed({
      title: `🔥 NEW MONTAGE DROPPED: [${creatorName}] ${title}`,
      description: description || `Watch the brand new montage by **${creatorName}** on NLD Studios!`,
      color: creatorName === 'Bob' ? 0x06b6d4 : 0xa855f7,
      url: youtubeUrl,
      imageUrl: thumbnailUrl,
      fields: [
        { name: 'Creator', value: creatorName, inline: true },
        { name: 'Watch on NLD', value: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/creators`, inline: true },
      ],
    });
  }

  revalidatePath('/');
  revalidatePath('/creators');
  revalidatePath('/admin');
  return { success: true };
}
