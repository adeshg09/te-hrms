import HeaderBox from '@/components/shared/dashboard/header-box';
import SectionHeaderBox from '@/components/shared/dashboard/section-header-box';
import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { getAllDesignations } from '@/actions/designation.action';

const Designation = async() => {

  const designations=await getAllDesignations();
  return (
    <div className="h-full w-full flex flex-col  rounded-lg">
      <HeaderBox
        title="All Designations"
        subTitle="All Designations Information "
      />
      <div className="w-full h-full border border-grey-50 mt-6 rounded-lg flex flex-col ">
        <SectionHeaderBox title="Add New Designation" type="designation" />
        {/* <div className="md:p-4 sm:p-3 p-2">
          <DataTable columns={columns} data={designations} />
        </div> */}
      </div>
    </div>
  );
};

export default Designation;
