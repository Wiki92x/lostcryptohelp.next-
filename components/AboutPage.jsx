import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-crystalText">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-purple-400">🛡️ About LostCryptoHelp</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-300">💼 What We Do</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Detect risky token approvals and suspicious wallet behavior.</li>
          <li>Scan with GoPlus Security, blockchain explorers & AI contract analysis.</li>
          <li>Trigger real-time Telegram alerts — no emails, no spam, no trackers.</li>
          <li>Smart contract safety detection including presales & honeypots.</li>
          <li>Download clean PDF audit reports after every scan.</li>
          <li>TRON scans are 100% free. ETH & BSC use a one-time, crypto-native fee.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-300">🔒 Why People Trust Us</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>We never ask for your email, name, or private keys — ever.</li>
          <li>No PayPal, no Stripe, no KYC. Just connect your wallet and scan.</li>
          <li>We don’t log wallet scans or store user data.</li>
          <li>Everything runs client-side or on secure, encrypted infrastructure.</li>
          <li>Telegram alerts are encrypted, opt-in only, and 1-click to disable.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-purple-300">📄 Legal, Privacy & Transparency</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>No wallets or scan results are stored on our servers.</li>
          <li>Audit PDFs are generated locally and never uploaded or saved.</li>
          <li>We use no analytics, cookies, or browser fingerprinting.</li>
          <li>Your blockchain data stays on-chain, and your privacy stays yours.</li>
          <li>We stand for radical transparency and crypto-native integrity.</li>
        </ul>
      </section>
    </div>
  );
}
