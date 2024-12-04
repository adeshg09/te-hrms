import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  FiMenu, 
  FiUser, 
  FiEdit, 
  FiMapPin, 
  FiUsers, 
  FiPhoneCall,
  FiCheckCircle,
  FiBriefcase 
} from 'react-icons/fi';
import { useMultiStepForm } from '@/hooks/use-multistep-form';


// Type definitions for step data
type SubStepData = {
  label: string;
  icon: React.ReactNode;
};

// Constants for substep configurations
const PERSONAL_DETAILS_SUB_STEPS: SubStepData[] = [
  { label: 'Basic Details', icon: <FiUser /> },
  { label: 'Educational Details', icon: <FiEdit /> },
  { label: 'Address Details', icon: <FiMapPin /> },
  { label: 'Family Details', icon: <FiUsers /> },
  { label: 'Emergency Contact Details', icon: <FiPhoneCall /> },
];

const PROFESSIONAL_DETAILS_SUB_STEPS: SubStepData[] = [
  { label: 'Basic Details', icon: <FiBriefcase /> },
  { label: 'Experience Details', icon: <FiCheckCircle /> },
];

export const SubStepNavigation: React.FC = () => {
  // State for mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Extract form navigation context
  const { 
    activeStep, 
    currentSubStep, 
    setCurrentSubStep 
  } = useMultiStepForm();

  // Dynamically select substeps based on active main step
  const getCurrentSubSteps = (): SubStepData[] => {
    switch (activeStep) {
      case 'Personal Details': 
        return PERSONAL_DETAILS_SUB_STEPS;
      case 'Professional Details': 
        return PROFESSIONAL_DETAILS_SUB_STEPS;
      default: 
        return [];
    }
  };

  // Handler for changing substeps
  const handleSubStepClick = (index: number) => {
    setCurrentSubStep(index);
    setIsMobileMenuOpen(false);
  };

  // Get current substeps based on active main step
  const currentSubSteps = getCurrentSubSteps();

  // If no substeps (like in Documents step), return null
  if (activeStep === 'Documents') return null;

  return (
    <div className="relative">
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden flex justify-center items-center p-2">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center space-x-2 bg-grey-100 px-4 py-2 rounded-md"
        >
          <FiMenu />
          <span>Select {activeStep} Substep</span>
        </button>
      </div>

      {/* Desktop Substep Navigation */}
      <div className="hidden lg:flex items-center justify-evenly relative p-2">
        {currentSubSteps.map((subStep, idx) => (
          <button
            key={idx}
            className={cn(
              'z-50 px-4 py-2 rounded-md transition-colors duration-300 flex items-center space-x-2',
              currentSubStep === idx
                ? 'bg-primary-default text-white'
                : 'bg-grey-100 text-grey-500 hover:bg-grey-200'
            )}
            onClick={() => handleSubStepClick(idx)}
          >
            {subStep.icon}
            <span>{subStep.label}</span>
          </button>
        ))}
        
        {/* Connecting Line Between Substeps */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-grey-300"></div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="w-full h-full">
          {/* Blur Overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Centered Dropdown */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div
              className="bg-white rounded-lg shadow-lg p-4 w-fit pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {currentSubSteps.map((subStep, idx) => (
                <button
                  key={idx}
                  className={cn(
                    'w-full text-left px-4 py-3 transition-colors duration-300 flex items-center space-x-2 rounded-md',
                    currentSubStep === idx
                      ? 'bg-primary-default text-white'
                      : 'hover:bg-grey-100'
                  )}
                  onClick={() => handleSubStepClick(idx)}
                >
                  {subStep.icon}
                  <span>{subStep.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};