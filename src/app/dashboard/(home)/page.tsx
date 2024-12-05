'use client';
import { getCurrentUser } from '@/actions/session.action';
import HeaderBox from '@/components/shared/dashboard/header-box';
import { StatsCard } from '@/components/shared/dashboard/stats-card';
import { stats } from '@/constants';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

function Dashboard() {
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      console.log('user is', user);
      if (!user) {
        redirect('/login');
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="h-full w-full flex flex-col rounded-lg">
      <HeaderBox
        title="Hello"
        name="Adesh👋"
        subTitle="Good Morning"
        type="greeting"
      />
      <div className="w-full h-full  mt-6  rounded-lg ">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
