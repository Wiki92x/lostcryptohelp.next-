import { motion } from 'framer-motion';
import { RocketIcon, ScanLineIcon, MessageSquareIcon } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <RocketIcon className="h-6 w-6 text-purple-400" />,
      title: '1. Enter Wallet Address',
      desc: 'Paste a public ETH, BSC, or TRON address. Select chain and scan.',
    },
    {
      icon: <ScanLineIcon className="h-6 w-6 text-purple-400" />,
      title: '2. Deep Analysis',
      desc: 'We scan for scams, exploits, token risks and dangerous contracts.',
    },
    {
      icon: <MessageSquareIcon className="h-6 w-6 text-purple-400" />,
      title: '3. Get PDF + Telegram Alert',
      desc: 'Download full report + get alert in Telegram. Nothing stored.',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-12 px-6 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-purple-400 mb-8 text-center">
          How LostCryptoHelp Works
        </h1>

        <div className="space-y-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-zinc-900 p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-4 mb-2">
                {step.icon}
                <h2 className="text-xl font-semibold text-purple-200">{step.title}</h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
