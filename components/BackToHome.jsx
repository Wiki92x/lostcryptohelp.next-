'use client';

import { useRouter } from 'next/navigation';

export default function BackToHome() {
  const router = useRouter();

  return (
    <div className="mt-10 flex justify-center">
      <button
        onClick={() => router.push('/')}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-xl transition duration-200 shadow"
      >
        ← Back to Homepage
      </button>
    </div>
  );
}
