import React from 'react';
import { cn } from '@/lib/utils';

import { MainStep } from '@/types/form';
import { useMultiStepForm } from '@/hooks/use-multistep-form';
import { FiBriefcase, FiFileText, FiUser } from 'react-icons/fi';

export const MAIN_STEP_DATA = [
    { label: 'Personal Details', icon: <FiUser /> },
    { label: 'Professional Details', icon: <FiBriefcase /> },
    { label: 'Documents', icon: <FiFileText /> },
  ];

export const MainStepNavigation: React.FC = () => {
  const { activeStep, setActiveStep, setCurrentSubStep } = useMultiStepForm();

  const handleStepClick = (step: MainStep) => {
    setActiveStep(step);
    setCurrentSubStep(0); // Reset substep when changing main step
  };

  return (
    <div className="flex w-full items-center ">
      {MAIN_STEP_DATA.map((step, idx) => {
        const isActive = step.label === activeStep;
        return (
          <div
            key={idx}
            className={cn(
              'flex flex-1 items-center justify-center py-2 px-2 cursor-pointer transition-all duration-300 group',
              'relative',
              isActive
                ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary-default'
                : 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-grey-200',
              isActive
                ? 'text-primary-default'
                : 'text-grey-500 hover:text-blue-500'
            )}
            onClick={() => handleStepClick(step.label as MainStep)}
          >
            <div className="flex items-center space-x-2">
              {step.icon}
              <span className="text-sm font-medium hidden md:inline-block">
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};