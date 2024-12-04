import MultiStepFormContainer from '@/components/shared/dashboard/add-employee/multi-step-box';


import HeaderBox from '@/components/shared/dashboard/header-box';
import { MultiStepFormProvider } from '@/providers/multi-step-provider';

import React from 'react';

const AddEmployee = () => {
  return (
    <div className="h-full w-full flex flex-col  rounded-lg ">
      <HeaderBox
        title="Add New Employee"
        subTitle="All Employees > Add New Employee"
      />
      <div className="w-full border border-grey-50 mt-6 rounded-lg flex flex-col md:p-4 sm:p-3 p-2 h-fit ">
        <MultiStepFormProvider>
          <MultiStepFormContainer />
        </MultiStepFormProvider>
      </div>
    </div>
  );
};

export default AddEmployee;
