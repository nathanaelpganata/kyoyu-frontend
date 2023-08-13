import './globals.css';
import type { Metadata } from 'next';

// Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https:www.kyoyu.com'),
  title: {
    default: 'Kyoyu',
    template: '%s | Kyoyu',
  },
  description: 'Day sharing app',
  verification: {
    google: '1234567890',
  },
  robots: {
    index: true,
    nocache: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
