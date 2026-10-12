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
      setToastMessage('[ACCESS_DENIED // LICENSE_REVOKED]');
    }
  }, [searchParams]);

  const handleDismiss = () => {
    setToastMessage(null);
    router.replace('/', { scroll: false });
  };

  if (!toastMessage) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 border-2 border-red-600 bg-black text-red-500 font-mono text-xs font-bold uppercase tracking-widest select-none shadow-2xl">
      <ShieldAlert className="w-5 h-5 stroke-[2.5] shrink-0" />
      <span>{toastMessage}</span>
      <button
        onClick={handleDismiss}
        className="ml-2 hover:bg-red-600 hover:text-black p-0.5 transition-none"
        aria-label="Close notification"
      >
        <X className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
}
