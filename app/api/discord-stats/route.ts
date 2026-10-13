import { NextResponse } from 'next/server';

export const revalidate = 30; // Cache on edge/CDN for 30 seconds

export async function GET() {
  const guildId = process.env.NEXT_PUBLIC_DISCORD_SERVER_ID || '1078780797835808778';

  const fallbackData = {
    approximate_member_count: 1420,
    approximate_presence_count: 73,
    name: 'No Licensed Drivers',
    instant_invite: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || 'https://discord.gg',
  };

  try {
    const res = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`, {
      next: { revalidate: 30 },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json(fallbackData);
    }

    const data = await res.json();

    const onlineCount = typeof data.presence_count === 'number'
      ? data.presence_count
      : fallbackData.approximate_presence_count;

    // Estimate/count active members from payload
    const membersListed = data.members && Array.isArray(data.members) ? data.members.length : 0;
    const memberCount = Math.max(1420, membersListed);

    return NextResponse.json({
      approximate_member_count: memberCount,
      approximate_presence_count: onlineCount,
      name: data.name || fallbackData.name,
      instant_invite: data.instant_invite || fallbackData.instant_invite,
    });
  } catch (error) {
    console.error('Error fetching Discord stats:', error);
    return NextResponse.json(fallbackData);
  }
}
