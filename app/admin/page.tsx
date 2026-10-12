import { redirect } from 'next/navigation';
import { verifyAdminServerSide } from '@/lib/auth/admin';
import { getLeaderboardEntries } from '@/lib/data';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  // STRICT SERVER-SIDE AUTHORIZATION CHECK
  const isAdmin = await verifyAdminServerSide();

  if (!isAdmin) {
    // Immediately redirect to / with error flag triggering "License Revoked - Access Denied"
    redirect('/?error=unauthorized');
  }

  const entries = await getLeaderboardEntries();

  return (
    <div className="w-full bg-black min-h-screen">
      <AdminDashboard initialEntries={entries} />
    </div>
  );
}
