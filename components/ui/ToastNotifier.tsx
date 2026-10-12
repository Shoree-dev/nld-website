'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 1 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 bg-[#ef4444] text-black font-bold uppercase tracking-wider select-none"
          style={{
            borderRadius: '45% 55% 50% 50% / 55% 45% 55% 45%',
          }}
        >
          <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
          <span className="text-sm font-black tracking-widest">{toastMessage}</span>
          <button
            onClick={handleDismiss}
            className="ml-2 hover:opacity-75 transition-opacity"
            aria-label="Close notification"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
