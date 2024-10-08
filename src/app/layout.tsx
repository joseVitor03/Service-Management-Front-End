import type { Metadata } from 'next';
import { Roboto_Serif } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import Loading from './loading';
import HeaderProvider from './context/HeaderContext';
import ServiceProvider from './context/ServiceContext';
import ClientProvider from './context/ClientsContext';

const inter = Roboto_Serif({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Service Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ServiceProvider>
        <HeaderProvider>
          <ClientProvider>
            <Suspense fallback={<Loading />}>
              <body className={inter.className}>
                {children}
              </body>
            </Suspense>
          </ClientProvider>
        </HeaderProvider>
      </ServiceProvider>
    </html>
  );
}
