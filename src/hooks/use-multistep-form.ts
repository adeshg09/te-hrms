// src/hooks/useMultiStepForm.ts
import { MultiStepFormContext } from '@/providers/multi-step-provider';
import { useContext } from 'react';


export const useMultiStepForm = () => {
  const context = useContext(MultiStepFormContext);
  
  if (!context) {
    throw new Error(
      'useMultiStepForm must be used within a MultiStepFormProvider'
    );
  }
  
  return context;
};