import HeaderBox from '@/components/shared/dashboard/header-box'
import SectionHeaderBox from '@/components/shared/dashboard/section-header-box'
import React from 'react'

const Designation = () => {
  return (
    <div className="h-full w-full flex flex-col  rounded-lg">
      <HeaderBox title="All Designations" subTitle="All Designations Information " />
      <div className="w-full h-full border border-grey-50 mt-6 rounded-lg flex flex-col">
        <SectionHeaderBox title='Add New Designation' type='designation' />
        {/* <SectionTable/> */}
        
      </div>
    </div>
  )
}

export default Designation
