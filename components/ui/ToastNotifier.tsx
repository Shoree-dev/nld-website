'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShieldAlert, X } from 'lucide-react';

export default function ToastNotifier() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'unauthorized' || error === 'access_denied') {
      setToastMessage('License Revoked - Access Denied');
    }
  }, [searchParams]);

  const handleDismiss = () => {
    setToastMessage(null);
    router.replace('/', { scroll: false });
  };

  if (!toastMessage) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-full border border-red-500/80 bg-red-950/90 backdrop-blur-xl text-red-200 text-xs font-bold uppercase tracking-wider select-none shadow-[0_0_25px_rgba(239,68,68,0.6)]">
      <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
      <span>{toastMessage}</span>
      <button
        onClick={handleDismiss}
        className="ml-2 hover:opacity-75 transition-opacity"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
