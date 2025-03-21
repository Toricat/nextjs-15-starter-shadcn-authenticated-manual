import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { ThemeProvider } from 'next-themes';

import { getCurrentUser } from '@/actions/user-action';
import '@/app/globals.css';
import { TokenRefresher } from '@/components/token-refresher';
import { UserProvider } from '@/context/UserContext';
import { Toaster } from '@/registry/new-york-v4/ui/sonner';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app'
};

async function UserDataProvider({ children }: { children: ReactNode }) {
    const currentUser = await getCurrentUser();
    console.log('currentUser', currentUser);

    return (
        <UserProvider initialUser={currentUser}>
            <TokenRefresher />
            {children}
        </UserProvider>
    );
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
        <html suppressHydrationWarning lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground h-full w-full overscroll-none antialiased`}>
                <ThemeProvider attribute='class'>
                    <UserDataProvider>{children}</UserDataProvider>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
