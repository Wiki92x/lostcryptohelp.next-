// app/dashboard/page.tsx
'use client';

import dynamic from 'next/dynamic';

const DashboardPage = dynamic(() => import('./DashboardClient'), { ssr: false });
export default function PageWrapper() {
  return <DashboardPage />;
}
