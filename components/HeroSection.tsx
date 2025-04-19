'use client';

import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="text-center py-20 px-6 bg-[var(--background)] text-[var(--foreground)]">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">
        Protect Your Web3 Wallet Instantly
      </h1>

      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-3">
        Real-time scans. Zero KYC. Rugpull protection built for crypto-native users.
      </p>

      <p className="text-sm text-muted-foreground mb-6">
        🛡️ Powered by AI wallet intelligence · 🔒 100% Private · No login required
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white text-base px-6 py-2">
          🔍 Start Deep Scan
        </Button>
        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm px-6 py-2">
          🎯 Try Sample Wallet
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Join <span className="font-bold text-white">17,000+</span> users protecting over <span className="font-bold text-white">$25M</span> in crypto assets.
      </p>
    </section>
  );
}