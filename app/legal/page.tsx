'use client';

import { Scale } from 'lucide-react';

export default function LegalNoticePage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex items-center gap-2 text-yellow-400 mb-4">
          <Scale className="w-6 h-6" />
          <h1 className="text-3xl font-bold">Legal Notice</h1>
        </div>

        <p className="text-sm text-muted-foreground">
          This page outlines the legal basis for using LostCryptoHelp. Please read carefully.
        </p>

        <div className="space-y-6 text-sm leading-relaxed text-zinc-300">
          <section>
            <h2 className="font-semibold text-white mb-2">1. Informational Use Only</h2>
            <p>
              LostCryptoHelp is designed for educational and informational purposes only. It does not offer financial, legal, or investment advice.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-white mb-2">2. Risk Disclosure</h2>
            <p>
              Crypto markets are volatile and unpredictable. Use caution when acting on any insights presented through this platform. Always verify with multiple sources.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-white mb-2">3. No Fiduciary Relationship</h2>
            <p>
              Using this platform does not create any fiduciary relationship. You are solely responsible for your actions, wallet security, and financial decisions.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-white mb-2">4. Jurisdiction</h2>
            <p>
              Users are responsible for complying with applicable local laws regarding crypto tools and services. Access may be restricted in certain jurisdictions.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-white mb-2">5. Contact</h2>
            <p>
              For legal inquiries or compliance requests, contact us at <strong>support@lostcryptohelp.pro</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}