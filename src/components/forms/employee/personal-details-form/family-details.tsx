'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { familyDetailsSchema } from '@/lib/validations';
import { useMultiStepForm } from '@/hooks/use-multistep-form';
import { FamilyDetailsFormData } from '@/types/form';
import { DatePicker } from '@/components/ui/custom-datepicker';
import { familyRelation } from '@/constants';

const FamilyDetailsForm = () => {
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

  // Get existing family details from form data or initialize empty array
  const existingFamilyDetails = formData.familyDetails || [];
  const [familyDetailsEntries, setFamilyDetailsEntries] = useState<
    FamilyDetailsFormData[]
  >(existingFamilyDetails);

  const form = useForm<FamilyDetailsFormData>({
    resolver: zodResolver(familyDetailsSchema),
    defaultValues: existingFamilyDetails[0] || {
      relationType: 'Father',
      name: '',
      age: 18,
      dateOfBirth: undefined,
      currentAddress: '',
      occupation: '',
      mobileNo: '',
      birthCountry: '',
      birthState: '',
      birthLocation: '',
    },
  });

  const addEntry = () => {
    form.handleSubmit((values) => {
      const updatedEntries = [...familyDetailsEntries, values];

      // Update local state
      setFamilyDetailsEntries(updatedEntries);

      // Also update form data in context
      updateFormData({
        familyDetails: updatedEntries,
      });

      // Reset form to default values after adding
      form.reset({
        relationType: 'Father',
        name: '',
        age: 18,
        dateOfBirth: undefined,
        currentAddress: '',
        occupation: '',
        mobileNo: '',
        birthCountry: '',
        birthState: '',
        birthLocation: '',
      });
    })();
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      // Update form data in context
      updateFormData({
        familyDetails: familyDetailsEntries,
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

  const removeFamilyEntry = (indexToRemove: number) => {
    const updatedEntries = familyDetailsEntries.filter(
      (_, index) => index !== indexToRemove,
    );

    // Update local state
    setFamilyDetailsEntries(updatedEntries);

    // Update form data in context
    updateFormData({
      familyDetails: updatedEntries,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full h-full rounded-lg"
      >
        <div className="flex flex-col gap-5 overflow-y-scroll h-[290px] scrollbar-none">
          {/* Relation Type and Name Row */}
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="relationType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-lg h-12 bg-white border-grey-200">
                        <SelectValue placeholder="Select relation type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {familyRelation.map((relation) => (
                        <SelectItem key={relation} value={relation}>
                          {relation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter name"
                      {...field}
                      className="rounded-lg h-12"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
          </div>

          {/* Age and Date of Birth Row */}
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter age"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
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
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormControl>
                    <Controller
                      name="dateOfBirth"
                      control={form.control}
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          startYear={1924}
                          onSelect={(selectedDate) => {
                            onChange(selectedDate);
                          }}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
          </div>

          {/* Current Address,ocupation,mob no */}
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="currentAddress"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter current address"
                      {...field}
                      className="rounded-lg h-12"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter occupation"
                      {...field}
                      className="rounded-lg h-12"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobileNo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter mobile number"
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
              name="birthCountry"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter birth country"
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
              name="birthState"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter birth state"
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
              name="birthLocation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter birth location"
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
            type="submit"
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
              'Add Family Member'
            )}
          </Button>
        </div>

        {/* Family Entries Table */}
        <div className="flex items-center gap-5 justify-end h-[100px] overflow-y-scroll">
          {familyDetailsEntries.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Relation</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Current Address</TableHead>
                  <TableHead>Mobile No</TableHead>
                  <TableHead>Birth Country</TableHead>
                  <TableHead>Birth State</TableHead>
                  <TableHead>Birth Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {familyDetailsEntries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.relationType}</TableCell>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell>{entry.age}</TableCell>
                    <TableCell>
                      {entry.dateOfBirth
                        ? format(new Date(entry.dateOfBirth), 'PPP')
                        : 'N/A'}
                    </TableCell>
                    <TableCell>{entry.currentAddress}</TableCell>
                    <TableCell>{entry.mobileNo || 'N/A'}</TableCell>
                    <TableCell>{entry.birthCountry}</TableCell>
                    <TableCell>{entry.birthState}</TableCell>
                    <TableCell>{entry.birthLocation}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFamilyEntry(index)}
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

export default FamilyDetailsForm;
