import Sidebar from '@/components/shared/sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" w-full  flex justify-center h-screen fixed   overflow-hidden">
      <div className=" h-full  md:p-5  sm:p-4 p-3  w-fit ">
        <Sidebar />
      </div>
      <div className="h-full w-full md:py-5 md:pr-5 sm:py-4 sm:pr-4 py-3 pr-3 overflow-hidden ">
        {children}
      </div>
    </div>
  );
}
