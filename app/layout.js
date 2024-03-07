import { Inter } from 'next/font/google';
import './globals.css';
import Chat from '@/components/chat';
import Providers from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Galena Aesthetics',
  description: 'test chatbot',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <Chat />
          {children}
        </body>
      </Providers>
    </html>
  );
}
