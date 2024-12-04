'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserBox from './user-box';
import { sidebarLinks } from '@/constants';
import ThemeModeToggle from '@/components/theme-mode-toggle';

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <section className="sticky top-0 left-0 flex flex-col items-center justify-between md:w-64 sm:w-52 w-16 bg-grey-50 md:p-4 sm:p-3 p-2 xl:p-6 z-50 rounded-lg h-full ">
      <div className="flex flex-col w-full h-full gap-6  rounded-lg ">
        <div className="flex flex-col gap-4 items-center justify-center rounded-lg">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://portfolio.techechelons.net/assets/images/te-projects-logo.png"
              alt="te-logo"
              className="w-50 h-15 object-contain hidden sm:block"
            />
            <img
              src="/assets/icons/techechelons-logo-icon.png"
              alt="vercel"
              className="w-10 h-10 object-contain sm:hidden"
            />
          </Link>
        </div>
        

        {/* Navigation Links */}
        <div className="flex flex-col gap-3 overflow-y-auto">
          {sidebarLinks.map((link, idx) => {
            let isActive;

            // If the route includes the current path (useful for nested routes)
            if (link.route === '/dashboard') {
              isActive = pathName === link.route;
            } else {
              isActive =
                pathName === link.route || pathName.includes(link.route);
            }

            return (
              <Link
                href={link.route}
                key={idx}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors xl:justify-start',
                  {
                    'bg-primary-default text-white hover:bg-primary-dark ':
                      isActive,
                  },
                )}
              >
                <link.icon
                  className={cn('w-5 h-5 font-normal', {
                    'text-white font-bold': isActive,
                    'text-gray-500': !isActive,
                  })}
                />
                <span
                  className={cn('text-sm  hidden sm:block font-normal ', {
                    'text-white font-bold': isActive,
                  })}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className='sm:hidden'>
          <ThemeModeToggle/>
        </div>
        
      </div>
     

      {/* User Profile Section */}
      
    </section>
  );
};

export default Sidebar;
