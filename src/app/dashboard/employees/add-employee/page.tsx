import AddressDetailsForm from '@/components/forms/employee/personal-details-form/address-details'
import BasicDetailsForm from '@/components/forms/employee/personal-details-form/basic-details'
import EducationalDetailsForm from '@/components/forms/employee/personal-details-form/educational-details'
import EmergencyContactDetailsForm from '@/components/forms/employee/personal-details-form/emergency-contact-details'
import FamilyDetailsForm from '@/components/forms/employee/personal-details-form/family-details'
import ProfBasicDetailsForm from '@/components/forms/employee/professional-details-form/basic-details'
import MultiStepEmployeeForm from '@/components/shared/dashboard/add-employee/multi-step-box'
import MultiStepBox from '@/components/shared/dashboard/add-employee/multi-step-box'
import HeaderBox from '@/components/shared/dashboard/header-box'
import SectionHeaderBox from '@/components/shared/dashboard/section-header-box'
import React from 'react'

const AddEmployee = () => {
  return (
    <div className="h-full w-full flex flex-col  rounded-lg ">
      <HeaderBox title="Add New Employee" subTitle="All Employees > Add New Employee" />
      <div className="w-full h-fit border border-grey-50 mt-6 rounded-lg flex flex-col md:p-4 sm:p-3 p-2">
        <div className='w-full h-full rounded-lg flex flex-col  '>
            <MultiStepEmployeeForm/>
            
        </div>
        
        
        
        
      </div>
    </div>
  )
}

export default AddEmployee
