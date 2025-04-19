// ✅ /utils/tier.ts — Membership Tier Checker (Final)

export type Tier = 'free' | 'pro' | 'premium';

interface TierRules {
  walletGraph: Tier;
  claimAssistant: Tier;
  revokeManager: Tier;
  airdropSniper: Tier;
  reputationScore: Tier;
}

export const defaultTierRules: TierRules = {
  walletGraph: 'free',
  claimAssistant: 'free',
  revokeManager: 'free',
  airdropSniper: 'free',
  reputationScore: 'free',
};

export function getTierLabel(tier: Tier): string {
  switch (tier) {
    case 'free':
      return 'Free';
    case 'pro':
      return 'Pro Member';
    case 'premium':
      return 'Premium Forensic';
    default:
      return 'Unknown';
  }
}

export function tierAccessCheck(
  userTier: Tier,
  featureRequired: Tier
): boolean {
  const priority: Tier[] = ['free', 'pro', 'premium'];
  return priority.indexOf(userTier) >= priority.indexOf(featureRequired);
}
