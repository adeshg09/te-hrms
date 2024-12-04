// src/context/MultiStepFormContext.tsx
'use client';

import { basicDetailsFormData, educationDetailsFormData, MainStep, MultiStepFormContextType } from '@/types/form';
import React, { createContext, useState, ReactNode } from 'react';


export const MultiStepFormContext = createContext<MultiStepFormContextType & {
  formData: Partial<basicDetailsFormData | educationDetailsFormData>;
  updateFormData: (data: Partial<basicDetailsFormData | educationDetailsFormData>) => void;
}>({
  activeStep: 'Personal Details',
  currentSubStep: 0,
  isMobileMenuOpen: false,
  formData: {},
  setActiveStep: () => {},
  setCurrentSubStep: () => {},
  setIsMobileMenuOpen: () => {},
  updateFormData: () => {},
});

export const MultiStepFormProvider: React.FC<{ children: ReactNode }> = ({ 
  children 
}) => {
  const [activeStep, setActiveStep] = useState<MainStep>('Personal Details');
  const [currentSubStep, setCurrentSubStep] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<basicDetailsFormData | educationDetailsFormData>>({});

  const updateFormData = (newData: Partial<basicDetailsFormData>) => {
    setFormData(prev => ({
      ...prev,
      newData
    }));
    console.log("updated form dats is",formData)
  };

  return (
    <MultiStepFormContext.Provider 
      value={{
        activeStep,
        currentSubStep,
        isMobileMenuOpen,
        formData,
        setActiveStep,
        setCurrentSubStep,
        setIsMobileMenuOpen,
        updateFormData,
      }}
    >
      {children}
    </MultiStepFormContext.Provider>
  );
};