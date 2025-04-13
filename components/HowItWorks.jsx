'use client';
import { Rocket, SearchCheck, FileText } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Rocket className="w-5 h-5 text-purple-400" />,
      title: '1. Enter Wallet Address',
      desc: 'Paste a public ETH, BSC, or TRON address. Select chain and scan.',
    },
    {
      icon: <SearchCheck className="w-5 h-5 text-purple-400" />,
      title: '2. Deep Analysis',
      desc: 'We scan for scams, exploits, token risks and dangerous contracts.',
    },
    {
      icon: <FileText className="w-5 h-5 text-purple-400" />,
      title: '3. Get PDF + Telegram Alert',
      desc: 'Download full report + get alert in Telegram. Nothing stored.',
    },
  ];

  return (
    <section className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-16 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-500 text-center mb-10">
          How LostCryptoHelp Works
        </h1>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-zinc-100 dark:bg-zinc-900 text-sm sm:text-base p-5 rounded-xl flex items-start gap-4 border border-zinc-300 dark:border-zinc-800"
            >
              <div className="pt-1">{step.icon}</div>
              <div>
                <h2 className="font-semibold text-purple-500">{step.title}</h2>
                <p className="text-gray-700 dark:text-gray-300">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
