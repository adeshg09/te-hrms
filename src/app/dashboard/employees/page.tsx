import HeaderBox from '@/components/shared/dashboard/header-box';
import SectionHeaderBox from '@/components/shared/dashboard/section-header-box';
import SectionTable from '@/components/shared/dashboard/section-table';
import React from 'react';




const Employee = async() => {
  
  return (
    <div className="h-full w-full flex flex-col  rounded-lg ">
      <HeaderBox title="All Employees" subTitle="All Employee Information" />
      <div className="w-full h-full border border-grey-50 mt-6 rounded-lg flex flex-col">
        <SectionHeaderBox link={`/dashboard/employees/add-employee`} title='Add New Employee'/>
        {/* <SectionTable/> */}
        
      </div>
    </div>
  );
};

export default Employee;
