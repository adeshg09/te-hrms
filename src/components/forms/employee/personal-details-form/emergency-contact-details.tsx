'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Trash2 } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { emergencyContactDetailsSchema } from '@/lib/validations';
import { useMultiStepForm } from '@/hooks/use-multistep-form';
import { EmergencyContactDetailsFormData } from '@/types/form';
import toast from 'react-hot-toast';

const EmergencyContactDetailsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    activeStep,
    setActiveStep,
    currentSubStep,
    setCurrentSubStep,
    updateFormData,
    formData,
  } = useMultiStepForm();

  // Get existing emergency contact details from form data or initialize empty array
  const existingEmergencyContactDetails =
    formData.emergencyContactDetails || [];
  const [emergencyContactDetailsEntries, setEmergencyContactDetailsEntries] =
    useState<EmergencyContactDetailsFormData[]>(
      existingEmergencyContactDetails,
    );

  const form = useForm<EmergencyContactDetailsFormData>({
    resolver: zodResolver(emergencyContactDetailsSchema),
    defaultValues: {
      contactName: existingEmergencyContactDetails[0]?.contactName || '',
      contactAddress: existingEmergencyContactDetails[0]?.contactAddress || '',
      relationToEmployee:
        existingEmergencyContactDetails[0]?.relationToEmployee || '',
      contactNumber: existingEmergencyContactDetails[0]?.contactNumber || '',
    },
  });

  const addEntry = () => {
    form.handleSubmit((values) => {
      console.log('Form values:', values);
      const updatedEntries = [...emergencyContactDetailsEntries, values];
      setEmergencyContactDetailsEntries(updatedEntries);

      // Update form data in context
      updateFormData({
        emergencyContactDetails: updatedEntries,
      });
      toast.success(" Emergency Contact Details added Successfully");

      // Reset form to default values after adding
      form.reset();
    })();
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      // Update form data in context
      updateFormData({
        emergencyContactDetails: emergencyContactDetailsEntries,
      });

      // Navigation logic for substeps and main steps
      if (currentSubStep < 4) {
        // Move to next substep within Personal Details
        setCurrentSubStep(currentSubStep + 1);
      } else {
        // When all substeps are complete, move to next main step
        setActiveStep('Professional Details');
        // Reset substep to 0 when moving to a new main step
        setCurrentSubStep(0);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onBack = () => {
    // Logic for navigating backwards through substeps and main steps
    if (currentSubStep > 0) {
      // If not at the first substep, go back to previous substep
      setCurrentSubStep(currentSubStep - 1);
    } else {
      // If at the first substep, determine how to navigate back
      switch (activeStep) {
        case 'Personal Details':
          // If already at the first step, go back to employees dashboard
          router.push('/dashboard/employees');
          break;
        case 'Professional Details':
          // Move back to the last substep of 'Personal Details'
          setActiveStep('Personal Details');
          setCurrentSubStep(4); // Last substep of Personal Details
          break;
        case 'Documents':
          // Move back to 'Professional Details'
          setActiveStep('Professional Details');
          setCurrentSubStep(1); // Last substep of Professional Details
          break;
        default:
          // Fallback to dashboard if something unexpected happens
          router.push('/dashboard/employees');
      }
    }
  };

  const removeEmergencyContactDetail = (indexToRemove: number) => {
    const updatedEntries = emergencyContactDetailsEntries.filter(
      (_, index) => index !== indexToRemove,
    );
    setEmergencyContactDetailsEntries(updatedEntries);

    // Update form data in context
    updateFormData({
      emergencyContactDetails: updatedEntries,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full h-full rounded-lg"
      >
        <div className="flex flex-col gap-5 overflow-y-scroll h-[290px] scrollbar-none">
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter contact name"
                      {...field}
                      className="rounded-lg h-12"
                      aria-required="true"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactAddress"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter contact address"
                      {...field}
                      className="rounded-lg h-12"
                      aria-required="true"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="relationToEmployee"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter relation to employee"
                      {...field}
                      className="rounded-lg h-12"
                      aria-required="true"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter contact number"
                      {...field}
                      className="rounded-lg h-12"
                      aria-required="true"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-5 justify-end">
          <Button
          onClick={onSubmit}
            className="bg-primary-default hover:bg-primary-dark text-white rounded-lg"
            size="lg"
            disabled={isLoading}
          >
            {currentSubStep < 4 ? 'Next' : 'Proceed to Professional Details'}
          </Button>
          <Button
            type="button"
            className="bg-secondary-default hover:bg-secondary-dark text-white rounded-lg"
            size="lg"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            type="button"
            className="bg-primary-default hover:bg-primary-dark text-white rounded-lg"
            size="lg"
            onClick={addEntry}
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              'Add Contact'
            )}
          </Button>
        </div>

        {/* Emergency Contact Details Entries Table */}
        <div className="flex items-center gap-5 justify-end h-[100px] overflow-y-scroll">
          {emergencyContactDetailsEntries.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Relation</TableHead>
                  <TableHead>Contact Number</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emergencyContactDetailsEntries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.contactName}</TableCell>
                    <TableCell>{entry.contactAddress}</TableCell>
                    <TableCell>{entry.relationToEmployee}</TableCell>
                    <TableCell>{entry.contactNumber}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeEmergencyContactDetail(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </form>
    </Form>
  );
};

export default EmergencyContactDetailsForm;
