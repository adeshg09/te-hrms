'use client'

import { getAllDesignations } from '@/actions/designation.action';
import { Designation } from '@/types';
import React, { useEffect, useState } from 'react';
import { DesignationCard } from './designation-card';

const DesignationsCardContainer = () => {
  const [designations, setDesignations] = useState<Designation[]>([]);
  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const { designations, error } = await getAllDesignations();
        if (error) {
          console.error('Error fetching designations:', error);
          return;
        }
        if (designations && designations.length > 0) {
          setDesignations(designations);
        }
      } catch (error) {
        console.error('Unexpected error in fetchDesignations:', error);
      }
    };

    fetchDesignations();
  }, []);
  return (
    <div className="flex w-full h-full items-center justify-between   sm:flex-row md:p-4 sm:p-3 p-2 sm:gap-5 gap-3 ">
      <div className="w-full h-full ">
        {
            designations.map(designation=>(
                <DesignationCard
                designation={designation.designationName}
                key={designation.designationId}
                memberCount={designation.employees.length}
                members={designation.employees}
                
                />
            ))
        }
      </div>
    </div>
  );
};

export default DesignationsCardContainer;
