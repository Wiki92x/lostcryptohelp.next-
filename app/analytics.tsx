'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '@/lib/ga';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || !searchParams) return;
    const query = searchParams.toString();
    const url = pathname + (query ? `?${query}` : '');
    pageview(url);
  }, [pathname, searchParams]);

  return null;
}
