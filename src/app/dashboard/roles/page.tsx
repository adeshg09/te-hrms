import HeaderBox from '@/components/shared/dashboard/header-box'
import SectionHeaderBox from '@/components/shared/dashboard/section-header-box'
import React from 'react'

const Roles = () => {
  return (
    <div className='h-full w-full flex flex-col  rounded-lg'>
     <HeaderBox title="All Roles" subTitle="All Roles Information " />
      <div className="w-full h-full border border-grey-50 mt-6 rounded-lg flex flex-col">
        <SectionHeaderBox title='Add New Role' type='role' />
        {/* <SectionTable/> */}
        
      </div>
    </div>
  )
}

export default Roles