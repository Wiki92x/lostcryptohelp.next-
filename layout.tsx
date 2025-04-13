// app/layout.tsx
import './globals.css';
import { WagmiConfig } from 'wagmi';
import wagmiConfig from '@/lib/wagmiClient';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'LostCryptoHelp 🚀',
  description: 'Your crypto safety dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white min-h-screen">
        <WagmiConfig config={wagmiConfig}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
            <Navbar />
            <main className="pt-20 px-4">{children}</main>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#333',
                  color: '#fff',
                },
              }}
            />
          </ThemeProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
