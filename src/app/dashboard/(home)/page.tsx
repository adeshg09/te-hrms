'use client';
import { getCurrentUser } from '@/actions/session.action';
import HeaderBox from '@/components/shared/dashboard/header-box';
import { StatsCard } from '@/components/shared/dashboard/stats-card';
import { stats } from '@/constants';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from '@prisma/client';

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        
        if (!currentUser) {
          // Redirect to login if no user is found
          redirect('/login');
        }
        
        setUser(currentUser as User);
      } catch (error) {
        console.error('Error fetching user:', error);
        redirect('/login');
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    // Show a loading state or return null while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full w-full flex flex-col rounded-lg">
      <HeaderBox
        title="Hello"
        name={`${user.firstName || user.emailId}👋`}
        subTitle="Good Morning"
        type="greeting"
      />
      <div className="w-full h-full mt-6 rounded-lg">
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