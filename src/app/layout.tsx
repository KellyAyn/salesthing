import '~/styles/globals.css';

import { type Metadata } from 'next';
import {
  ClerkProvider,
  SignedOut,
  SignedIn,
  RedirectToSignIn,
} from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import { dark } from '@clerk/themes';
import { SidebarProvider, SidebarInset } from '~/components/ui/sidebar';
import { AppSidebar } from '~/components/app-sidebar';
import { cookies } from 'next/headers';
import { Toaster } from '~/components/ui/sonner';
export const metadata: Metadata = {
  title: 'Salesthing',
  description: 'A simple sales tool',
  icons: [{ rel: 'icon', url: '/poke.jpg' }],
};

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SignedIn>
            <SidebarProvider defaultOpen={sidebarState}>
              <AppSidebar />
              <SidebarInset>
                <main>
                  {children}
                  <Toaster />
                </main>
              </SidebarInset>
            </SidebarProvider>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}
