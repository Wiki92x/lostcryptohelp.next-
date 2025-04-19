// ✅ utils/accessControl.ts

import { cookies } from 'next/headers';

export function isToolUnlocked(req: Request, tool: string): boolean {
  // Public tools (always unlocked)
  const publicTools = ['deep-scan', 'scan-history'];
  if (publicTools.includes(tool)) return true;

  try {
    const cookieStore = cookies();
    const cookie = cookieStore.get('unlocked_tools')?.value;
    if (!cookie) return false;

    const unlockedList = JSON.parse(cookie);
    return Array.isArray(unlockedList) && unlockedList.includes(tool);
  } catch {
    return false;
  }
}