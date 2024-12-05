'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaFilter, FaSearch } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import { IoSearchOutline } from 'react-icons/io5';

import { useRouter } from 'next/navigation';
import React from 'react';
import AddDesignation from '@/components/modals/designation/addDesignation';
import AddRole from '@/components/modals/roles/addRole';

interface SectionHeaderBoxProps {
  link?: string;
  title: string;
  type?: string;
}

const SectionHeaderBox = ({ link, title, type }: SectionHeaderBoxProps) => {
  const router = useRouter();
  return (
    <div className="flex w-full items-center justify-between  sm:flex-row md:p-4 sm:p-3 p-2 sm:gap-5 gap-3">
      <div className="relative  flex items-center  w-full sm:w-full">
        <Input
          type="search"
          id="search"
          placeholder="Search"
          className="h-12 pl-10 pr-4 rounded-lg border border-gray-300 bg-white focus-visible:ring-primary-light"
        />
        <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 " />
      </div>

      <div className="flex items-center   gap-3 sm:gap-5 w-full justify-end ">
        {type === 'designation' ? (
          <AddDesignation />
        ) : type === 'role' ? (
          <AddRole />
        ) : (
          <Button
            className="flex items-center justify-center bg-primary-default hover:bg-primary-dark text-white rounded-lg h-12 px-4"
            onClick={() => {
              router.push(link ?? '');
            }}
          >
            <FaCirclePlus className="h-4 w-4 text-white" />
            <span className="ml-2 sm:block hidden">{title}</span>
          </Button>
        )}

        <Button
          variant="ghost"
          className="flex items-center justify-center rounded-lg border border-gray-300 h-12 px-4 bg-white hover:bg-white"
        >
          <FaFilter className="h-4 w-4 text-gray-500" />
          <span className="ml-2 text-gray-500 hidden sm:block">Filter</span>
        </Button>
      </div>
    </div>
  );
};

export default SectionHeaderBox;
