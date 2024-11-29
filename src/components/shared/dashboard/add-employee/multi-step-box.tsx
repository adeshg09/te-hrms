'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FiUser, FiBriefcase, FiFileText, FiMapPin, FiUsers, FiPhoneCall, FiEdit, FiCheckCircle, FiMenu } from 'react-icons/fi';

// Form Components
import BasicDetailsForm from '@/components/forms/employee/personal-details-form/basic-details';
import EducationalDetailsForm from '@/components/forms/employee/personal-details-form/educational-details';
import AddressDetailsForm from '@/components/forms/employee/personal-details-form/address-details';
import FamilyDetailsForm from '@/components/forms/employee/personal-details-form/family-details';
import EmergencyContactDetailsForm from '@/components/forms/employee/personal-details-form/emergency-contact-details';
import ProfBasicDetailsForm from '@/components/forms/employee/professional-details-form/basic-details';
import ExperienceDetailsForm from '@/components/forms/employee/professional-details-form/experience-details';
import DocumentUploadForm from '@/components/forms/employee/documents-form/document-upload';

// Type definitions for better type safety
type MainStep = 'Personal Details' | 'Professional Details' | 'Documents';
type PersonalDetailsSubStep =
  | 'Basic Details'
  | 'Educational Details'
  | 'Address Details'
  | 'Family Details'
  | 'Emergency Contact Details';
type ProfessionalDetailsSubStep = 'Basic Details' | 'Experience Details';

// Define step data in constants
const mainStepData: { label: MainStep; icon: React.ReactNode }[] = [
  { label: 'Personal Details', icon: <FiUser /> },
  { label: 'Professional Details', icon: <FiBriefcase /> },
  { label: 'Documents', icon: <FiFileText /> },
];

const personalDetailsSubStepData: { label: PersonalDetailsSubStep; icon: React.ReactNode }[] = [
  { label: 'Basic Details', icon: <FiUser /> },
  { label: 'Educational Details', icon: <FiEdit /> },
  { label: 'Address Details', icon: <FiMapPin /> },
  { label: 'Family Details', icon: <FiUsers /> },
  { label: 'Emergency Contact Details', icon: <FiPhoneCall /> },
];

const professionalDetailsSubStepData: { label: ProfessionalDetailsSubStep; icon: React.ReactNode }[] = [
  { label: 'Basic Details', icon: <FiUser /> },
  { label: 'Experience Details', icon: <FiCheckCircle /> },
];

const MultiStepBox = () => {
  const [activeStep, setActiveStep] = useState<MainStep>('Personal Details');
  const [currentSubStep, setCurrentSubStep] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Handlers with consistent typing
  const handleStepClick = (step: MainStep) => {
    setActiveStep(step);
    setCurrentSubStep(0); // Reset substep when changing main step
    setIsMobileMenuOpen(false); // Close mobile menu
  };

  const handleSubStepClick = (subStep: number) => {
    setCurrentSubStep(subStep);
    setIsMobileMenuOpen(false); // Close mobile menu
  };

  // Render form sections with consistent switch logic
  const renderFormSection = () => {
    switch (activeStep) {
      case 'Personal Details':
        return [
          <BasicDetailsForm key="basic-details" />,
          <EducationalDetailsForm key="educational-details" />,
          <AddressDetailsForm key="address-details" />,
          <FamilyDetailsForm key="family-details" />,
          <EmergencyContactDetailsForm key="emergency-contact-details" />,
        ][currentSubStep];
      case 'Professional Details':
        return [
          <ProfBasicDetailsForm key="prof-basic-details" />,
          <ExperienceDetailsForm key="experience-details" />,
        ][currentSubStep];
      case 'Documents':
        return <DocumentUploadForm key="document-upload" />;
      default:
        return null;
    }
  };

  // Render substeps with consistent styling
  const renderSubSteps = () => {
    const currentSubSteps =
      activeStep === 'Personal Details'
        ? personalDetailsSubStepData
        : activeStep === 'Professional Details'
        ? professionalDetailsSubStepData
        : [];

    return (
      <div className="relative">
        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex justify-center items-center p-2 ">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center space-x-2 bg-grey-100 px-4 py-2 rounded-md"
          >
            <FiMenu />
            <span>Select {activeStep} Substep</span>
          </button>
        </div>

        {/* Desktop Substeps */}
        <div className="hidden lg:flex items-center justify-evenly relative p-2">
          {currentSubSteps.map((subStep, idx) => (
            <button
              key={idx}
              className={cn(
                'z-50 px-4 py-2 rounded-md transition-colors duration-300 flex items-center space-x-2',
                currentSubStep === idx
                  ? 'bg-primary-default text-white'
                  : 'bg-grey-100 text-grey-500 hover:bg-grey-200',
              )}
              onClick={() => handleSubStepClick(idx)}
            >
              {subStep.icon}
              <span>{subStep.label}</span>
            </button>
          ))}
          {activeStep !== 'Documents' && (
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-grey-300"></div>
          )}
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className='w-full h-full'>
            {/* Blur Overlay */}
            <div 
              className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Centered Dropdown */}
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none ">
              <div 
                className="bg-white rounded-lg shadow-lg p-4  w-fit pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {currentSubSteps.map((subStep, idx) => (
                  <button
                    key={idx}
                    className={cn(
                      'w-full text-left px-4 py-3 transition-colors duration-300 flex items-center space-x-2 rounded-md',
                      currentSubStep === idx
                        ? 'bg-primary-default text-white'
                        : 'hover:bg-grey-100',
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

  // Render main steps with icons
  const renderMainSteps = () => {
    return (
      <div className="flex w-full items-center overflow-x-auto">
        {mainStepData.map((step, idx) => {
          const isActive = step.label === activeStep;

          return (
            <div
              key={idx}
              className={cn(
                'flex flex-1 items-center justify-center py-4 px-2 cursor-pointer transition-all duration-300 group',
                'relative',
                isActive
                  ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary-default'
                  : 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-grey-200',
                isActive
                  ? 'text-primary-default'
                  : 'text-grey-500 hover:text-blue-500',
              )}
              onClick={() => handleStepClick(step.label)}
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

  return (
    <div className="w-full rounded-lg">
      {/* Main Steps Navigation */}
      {renderMainSteps()}

      {/* Substeps Navigation */}
      {renderSubSteps()}

      {/* Form Sections */}
      <div className='max-h-[750px] overflow-y-auto scrollbar-thin scrollbar-thumb-grey-300 scrollbar-track-grey-100'>
        {renderFormSection()}
      </div>
    </div>
  );
};

export default MultiStepBox;