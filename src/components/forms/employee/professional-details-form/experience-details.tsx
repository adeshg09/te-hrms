'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
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

import { DatePicker } from '@/components/ui/custom-datepicker';
import { experienceDetailsSchema } from '@/lib/validations';
import { useMultiStepForm } from '@/hooks/use-multistep-form';
import { ExperienceDetailsFormData } from '@/types/form';

import { format } from 'date-fns';
import { employementType } from '@/constants';
import toast from 'react-hot-toast';

const ExperienceDetailsForm = () => {
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

  // Get existing experience details from form data or initialize empty array
  const existingExperienceDetails = formData.experienceDetails || [];
  const [experienceDetailsEntries, setExperienceDetailsEntries] = useState<
    ExperienceDetailsFormData[]
  >(existingExperienceDetails);

  const form = useForm<ExperienceDetailsFormData>({
    resolver: zodResolver(experienceDetailsSchema),
    defaultValues: {
      empName: formData.experienceDetails?.[0]?.empName || '',
      empId: formData.experienceDetails?.[0]?.empId || '',
      jobTitle: formData.experienceDetails?.[0]?.jobTitle || '',
      startDate: formData.experienceDetails?.[0]?.startDate,
      endDate: formData.experienceDetails?.[0]?.endDate,
      country: formData.experienceDetails?.[0]?.country || '',
      state: formData.experienceDetails?.[0]?.state || '',
      city: formData.experienceDetails?.[0]?.city || '',
      employmentType:
        formData.experienceDetails?.[0]?.employmentType || 'FullTime',
      supervisorName: formData.experienceDetails?.[0]?.supervisorName || '',
      supervisorMobNo: formData.experienceDetails?.[0]?.supervisorMobNo || '',
    },
  });

  const addEntry = () => {
    form.handleSubmit((values) => {
      const updatedEntries = [...experienceDetailsEntries, values];

      // Update local state
      setExperienceDetailsEntries(updatedEntries);

      // Also update form data in context
      updateFormData({
        experienceDetails: updatedEntries,
      });
      toast.success(" Experience Details added Successfully");

      // Reset form to default values after adding
      form.reset();
    })();
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      // Update form data in context
      updateFormData({
        experienceDetails: experienceDetailsEntries,
      });

      // Navigation logic for substeps and main steps
      if (currentSubStep < 1) {
        // Move to next substep within Professional Details
        setCurrentSubStep(currentSubStep + 1);
      } else {
        // When all substeps are complete, move to next main step
        setActiveStep('Documents');
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
      // If at the first substep, go back to Personal Details
      setActiveStep('Personal Details');
      setCurrentSubStep(4); // Last substep of Personal Details
    }
  };

  const removeExperienceEntry = (indexToRemove: number) => {
    const updatedEntries = experienceDetailsEntries.filter(
      (_, index) => index !== indexToRemove,
    );

    // Update local state
    setExperienceDetailsEntries(updatedEntries);

    // Update form data in context
    updateFormData({
      experienceDetails: updatedEntries,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full h-full rounded-lg"
      >
        <div className="flex flex-col gap-5 overflow-y-scroll h-[290px] scrollbar-none">
          {/* Employee Name and ID */}
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="empName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter employee name"
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
              name="empId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter employee ID"
                      {...field}
                      className="rounded-lg h-12"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
          </div>

          {/* Job Title and Employment Type */}
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter job title"
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
              name="employmentType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-lg h-12 bg-white border-grey-200">
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employementType.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
          </div>

          {/* Start and End Dates */}
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormControl>
                    <Controller
                      name="startDate"
                      control={form.control}
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          startYear={1924}
                          onSelect={(selectedDate) => {
                            onChange(selectedDate);
                          }}
                          placeholder='Pick a start date'
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormControl>
                    <Controller
                      name="endDate"
                      control={form.control}
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          startYear={1924}
                          onSelect={(selectedDate) => {
                            onChange(selectedDate);
                          }}
                          placeholder='Pick an end date'
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter country"
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
              name="state"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter state"
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
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter city"
                      {...field}
                      className="rounded-lg h-12"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
          </div>

          {/* Supervisor Details */}
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="supervisorName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter supervisor name"
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
              name="supervisorMobNo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter supervisor mobile no"
                      {...field}
                      className="rounded-lg h-12"
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
            {currentSubStep < 1 ? 'Next' : 'Proceed to Documents'}
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
              'Add Education'
            )}
          </Button>
        </div>

        {/* Experience Entries Table */}
        <div className="flex items-center gap-5 justify-end h-[100px] overflow-y-scroll">
          {experienceDetailsEntries.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employer Name</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Employment Type</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {experienceDetailsEntries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.empName}</TableCell>
                    <TableCell>{entry.jobTitle}</TableCell>
                    <TableCell>{entry.employmentType}</TableCell>
                    <TableCell>
                      {entry.startDate
                        ? format(new Date(entry.startDate), 'MMM yyyy')
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {entry.endDate
                        ? format(new Date(entry.endDate), 'MMM yyyy')
                        : 'N/A'}
                    </TableCell>
                    <TableCell>{`${entry.city}, ${entry.state}, ${entry.country}`}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeExperienceEntry(index)}
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

export default ExperienceDetailsForm;
