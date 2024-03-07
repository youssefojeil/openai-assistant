import { Inter } from 'next/font/google';
import './globals.css';
import Chat from '@/components/chat';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Galena Aesthetics',
  description: 'test chatbot',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Chat />
        {children}
      </body>
    </html>
  );
}
