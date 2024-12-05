'use client';
import React, { createContext, useState, ReactNode } from 'react';
import {
  MainStep,
  MultiStepFormContextType,
} from '@/types/form';

export const MultiStepFormContext = createContext<
  MultiStepFormContextType | undefined
>(undefined);

export const MultiStepFormProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeStep, setActiveStep] = useState<MainStep>('Personal Details');
  const [currentSubStep, setCurrentSubStep] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<
    MultiStepFormContextType['formData']
  >({});

  const updateFormData: MultiStepFormContextType['updateFormData'] = (
    newData,
  ) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  console.log('Updated form data is', formData);

  const contextValue: MultiStepFormContextType = {
    activeStep,
    currentSubStep,
    isMobileMenuOpen,
    formData,
    setActiveStep,
    setCurrentSubStep,
    setIsMobileMenuOpen,
    updateFormData,
  };

  return (
    <MultiStepFormContext.Provider value={contextValue}>
      {children}
    </MultiStepFormContext.Provider>
  );
};
