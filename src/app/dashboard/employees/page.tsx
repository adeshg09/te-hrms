import HeaderBox from '@/components/shared/dashboard/header-box';
import SectionHeaderBox from '@/components/shared/dashboard/section-header-box';
import { Employee } from './columns';
import React from 'react';
import { columns } from './columns';
import { DataTable } from './data-table';
import { getAllEmployees } from '@/actions/employee.action';
import { getDesignationById } from '@/actions/designation.action';

const EmployeeSection = async () => {
  const result = await getAllEmployees();

  // Transform the fetched data to match the Employee type
  const employeeData: Employee[] = result.data ? await Promise.all(result.data.map(async (employee) => {
    // Await the designation lookup
    const designation= await getDesignationById(employee.designationId);

    return {
      id: employee.employeeId.toString(),
      name: employee.user 
        ? `${employee.user.firstName || ''} ${employee.user.lastName || ''}`.trim() 
        : '',
      employeeId: employee.employeeId.toString(),
      designation: typeof designation === 'string' ? designation : '',
      email: employee.user?.emailId || '',
      workingType: employee.workingType === 'Office' ? 'On-site' 
        : employee.workingType === 'Remote' ? 'Remote' 
        : 'Hybrid',
      employmentType: employee.employmentType === 'FullTime' ? 'Full-time'
        : employee.employmentType === 'PartTime' ? 'Part-time'
        : 'Internship',
      isActive: employee.user?.isActive || false,
      joinDate: employee.dateOfJoin ? new Date(employee.dateOfJoin) : undefined
    };
  })) : [];

  return (
    <div className="h-full w-full flex flex-col rounded-lg">
      <HeaderBox 
        title="Employee Management" 
        subTitle="View and manage employee information" 
      />
      <div className="w-full h-full border border-grey-50 mt-6 rounded-lg flex flex-col">
        <SectionHeaderBox
          link={`/dashboard/employees/add-employee`}
          title="Add New Employee"
        />
        <div className="md:p-4 sm:p-3 p-2">
          {result.success ? (
            <DataTable columns={columns} data={employeeData} />
          ) : (
            <div className="text-red-500 p-4">
              Error fetching employees: {result.error || 'Unknown error'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeSection;