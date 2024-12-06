'use client';

import { logout } from '@/actions/auth.action';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaChevronDown, FaUser } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';

const UserBox = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (isLoading) return;

    setIsLoading(true);
    
    try {
      const result = await logout();
      
      if (result.error) {
        toast.error(result.error);
        setIsLoading(false);
      } else if (result.redirect) {
        router.push(result.redirect);
        toast.success("Log out successfully")
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border gap-2 border-grey-50 p-1">
      <div className="flex items-center gap-2">
        <Avatar className="h-10 w-10 rounded-lg">
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="rounded-lg"
            alt="User avatar"
          />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
        <div className="flex flex-col hidden sm:block whitespace-nowrap">
          <span className="text-sm font-medium text-gray-900 block">
            Adesh Gadage
          </span>
          <span className="text-xs text-gray-500 block">Admin</span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="hidden sm:block">
          <Button
            variant="ghost"
            className="p-3 rounded-lg hover:bg-white text-gray-500 hover:text-gray-900 transition-colors max-lg:hidden"
          >
            <FaChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 cursor-pointer bg-white text-black">
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <FaUser className="mr-2" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={handleLogout}
              disabled={isLoading}
            >
              <MdLogout className="mr-2" />
              <span className="text-red-500">
                {isLoading ? 'Logging out...' : 'Logout'}
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserBox;
