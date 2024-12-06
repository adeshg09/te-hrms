// (root)/layout.tsx
import AuthCard from '@/components/shared/auth/auth-card';
import Footer from '@/components/shared/footer';
import ThemeModeToggle from '@/components/theme-mode-toggle';
import Image from 'next/image';
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen background-light50_dark900 flex flex-col relative">
      <ThemeModeToggle />
      <div className="w-full h-[95%] flex items-center justify-center md:px-32 md:py-20 p-0">
        <div className="w-full h-full flex flex-col items-center justify-between   md:flex-row">
          <Link
            href="/"
            className="h-full flex items-center justify-start w-fit"
          >
            <Image
              src="https://portfolio.techechelons.net/assets/images/te-projects-logo.png"
              alt="te-logo"
              width="700"
              height="700"
              className="object-contain"
            />
          </Link>
          <AuthCard>
            {children}
          </AuthCard>
        </div>
      </div>
      <Footer />
    </div>
  );
}
