// ✅ hooks/usePremiumUser.ts
import { useEffect, useState } from 'react';

export function usePremiumUser(wallet: string) {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (!wallet) return;

    const check = async () => {
      const res = await fetch(`/api/check-premium?wallet=${wallet}`);
      const data = await res.json();
      setIsPremium(data?.premium);
    };

    check();
  }, [wallet]);

  return isPremium;
}