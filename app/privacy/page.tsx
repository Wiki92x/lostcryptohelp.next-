// ✅ app/privacy/page.tsx
import { Metadata } from 'next';
import ClientPrivacy from '@/components/ClientPrivacy';

export const metadata: Metadata = {
  title: 'Privacy Policy | LostCryptoHelp',
  description: 'Read how LostCryptoHelp protects your data, privacy, and wallet anonymity.',
};

export default function PrivacyPage() {
  return <ClientPrivacy />;
}
