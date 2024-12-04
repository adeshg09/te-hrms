'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  FiUser,
  FiBriefcase,
  FiFileText,
  FiMapPin,
  FiUsers,
  FiPhoneCall,
  FiEdit,
  FiCheckCircle,
  FiMenu,
} from 'react-icons/fi';

// Form Components
import BasicDetailsForm from '@/components/forms/employee/personal-details-form/basic-details';
import EducationalDetailsForm from '@/components/forms/employee/personal-details-form/educational-details';
import AddressDetailsForm from '@/components/forms/employee/personal-details-form/address-details';
import FamilyDetailsForm from '@/components/forms/employee/personal-details-form/family-details';
import EmergencyContactDetailsForm from '@/components/forms/employee/personal-details-form/emergency-contact-details';
import ProfBasicDetailsForm from '@/components/forms/employee/professional-details-form/basic-details';
import ExperienceDetailsForm from '@/components/forms/employee/professional-details-form/experience-details';
import DocumentUploadForm from '@/components/forms/employee/documents-form/document-upload';

import { useMultiStepForm } from '@/hooks/use-multistep-form';
import { SubStepNavigation } from './sub-step-navigation';
import { MainStepNavigation } from './main-step-navigation';



const MultiStepFormContainer = () => {
  const { activeStep, currentSubStep } = useMultiStepForm();
  // Render form sections with consistent switch logic
  
  const personalDetailsForms = [
    <BasicDetailsForm key="basic-details" />,
    <EducationalDetailsForm key="educational-details" />,
    <AddressDetailsForm key="address-details" />,
    <FamilyDetailsForm key="family-details" />,
    <EmergencyContactDetailsForm key="emergency-contact-details" />,
  ];
  const professionalDetailsForms = [
    <ProfBasicDetailsForm key="prof-basic-details" />,
    <ExperienceDetailsForm key="experience-details" />,
  ];

  const renderFormSection = () => {
    switch (activeStep) {
      case 'Personal Details':
        return personalDetailsForms[currentSubStep];
      case 'Professional Details':
        return professionalDetailsForms[currentSubStep];
      case 'Documents':
        return <DocumentUploadForm key="document-upload" />;
      default:
        return null;
    }
  };



  return (
    <div className="w-full rounded-lg flex flex-col gap-y-5  ">
      <MainStepNavigation />
      <SubStepNavigation />
      {renderFormSection()}
    </div>
  );
};

export default MultiStepFormContainer;
