'use client';

import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex items-center gap-2 text-green-400 mb-4">
          <Shield className="w-6 h-6" />
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>

        <p className="text-sm text-muted-foreground">
          LostCryptoHelp is committed to respecting your privacy. Here’s what we collect — and what we don’t.
        </p>

        <div className="space-y-6 text-sm leading-relaxed text-zinc-300">
          <section>
            <h2 className="font-semibold text-white mb-2">1. No Personal Data Collected</h2>
            <p>
              We do not collect or store any personal user data, including wallet addresses, names, emails, or transaction history. All scans are done anonymously.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-white mb-2">2. Cookies</h2>
            <p>
              We may use cookies to store temporary session access or tool unlocks. These cookies do not contain any identifying information and are only used for experience optimization.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-white mb-2">3. Analytics</h2>
            <p>
              We use privacy-respecting analytics to understand general traffic trends. These tools do not track users across sites or collect personal data.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-white mb-2">4. Payments</h2>
            <p>
              Payments are processed entirely on-chain using your connected wallet. LostCryptoHelp never stores or sees your private keys or sensitive data.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-white mb-2">5. Contact</h2>
            <p>
              If you have any privacy concerns or questions, reach out to us directly at <strong>support@lostcryptohelp.pro</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}