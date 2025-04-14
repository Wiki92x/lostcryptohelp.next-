'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from '@/lib/ga';

export default function Providers() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) pageview(pathname);
  }, [pathname]);

  return null;
}
