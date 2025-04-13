import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" data-theme="light">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Charset */}
        <meta charSet="utf-8" />

        {/* Viewport & Mobile-Friendly */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Theme color for browser UI */}
        <meta name="theme-color" content="#0f1117" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />

        {/* Font preload (optional performance boost) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <body className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
