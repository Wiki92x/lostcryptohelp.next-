import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

// Load form
import ReportForm from '../components/ReportForm';

export default function ReportPage() {
  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>Submit Crypto Report | LostCryptoHelp</title>
        <meta
          name="description"
          content="Submit a crypto scam report anonymously. Get real-time alerts and blockchain validation."
        />
      </Head>

      <div
        className={`min-h-screen py-16 px-6 transition-colors ${
          theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-purple-400 mb-3">
              🚨 Submit a Crypto Report
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              Flag a scam project, malicious wallet, fake contract, or suspicious token.
              Your submission is anonymous. Reports are verified and sent via Telegram bot.
            </p>
          </div>

          <div className="bg-gray-900/70 dark:bg-white/5 p-6 rounded-xl shadow-lg border border-gray-800">
            <ReportForm />
          </div>
        </div>
      </div>
    </>
  );
}
