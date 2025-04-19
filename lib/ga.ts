const PUBLIC_TOOLS = ['deep-scan', 'threat-hub'];

export function isToolUnlocked(req: Request, tool: string) {
  if (PUBLIC_TOOLS.includes(tool)) return true;

  try {
    const cookieStore = cookies();
    const unlocks = cookieStore.get('unlocked_tools')?.value;
    if (!unlocks) return false;

    const list = JSON.parse(unlocks);
    return Array.isArray(list) && list.includes(tool);
  } catch {
    return false;
  }
}