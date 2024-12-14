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
import { educationalDetailsSchema } from '@/lib/validations';
import { useMultiStepForm } from '@/hooks/use-multistep-form';
import { EducationDetailsFormData } from '@/types/form';

import { educationCourse, educationStatus, studyMode } from '@/constants';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const EducationalDetailsForm = () => {
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

  // Get existing educational details from form data or initialize empty array
  const existingEducationDetails = formData.educationalDetails || [];
  const [educationDetailsEntries, setEducationDetailsEntries] = useState<
    EducationDetailsFormData[]
  >(existingEducationDetails);
  const [add,setAdd]=useState(0);

  const form = useForm<EducationDetailsFormData>({
    resolver: zodResolver(educationalDetailsSchema),
    defaultValues: {
      course: formData.educationalDetails?.[0]?.course || undefined,
      degreeSpecialization:
        formData.educationalDetails?.[0]?.degreeSpecialization || '',
      instituteUniversityName:
        formData.educationalDetails?.[0]?.instituteUniversityName || '',
      status: formData.educationalDetails?.[0]?.status || undefined,
      studyMode: formData.educationalDetails?.[0]?.studyMode || undefined,
      fromDate: formData.educationalDetails?.[0]?.fromDate,
      toDate: formData.educationalDetails?.[0]?.toDate,
      percentage: formData.educationalDetails?.[0]?.percentage ?? undefined,
    },
  });

  const addEntry = () => {
    form.handleSubmit((values) => {
      const updatedEntries = [...educationDetailsEntries, values];

      // Update local state
      setEducationDetailsEntries(updatedEntries);

      // Also update form data in context
      updateFormData({
        educationalDetails: updatedEntries,
      });
      toast.success(' Education Details added Successfully');

      // Reset form to default values after adding
      form.reset();
    })();
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      // Update form data in context
      updateFormData({
        educationalDetails: educationDetailsEntries,
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

  const removeEducationEntry = (indexToRemove: number) => {
    const updatedEntries = educationDetailsEntries.filter(
      (_, index) => index !== indexToRemove,
    );

    // Update local state
    setEducationDetailsEntries(updatedEntries);

    // Update form data in context
    updateFormData({
      educationalDetails: updatedEntries,
    });
  };

  const addData = () => {
    setAdd(prev=>prev+1)
    return (
      <div className="bg-grey-50 flex flex-col gap-5 rounded-lg p-5">
        {/* Course and Specialization */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem className="w-full">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-lg h-12 bg-white border-grey-200">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {educationCourse.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
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
            name="degreeSpecialization"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Enter specialization"
                    {...field}
                    className="rounded-lg h-12"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />
        </div>

        {/* Institute and Percentage */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="instituteUniversityName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Enter institute/university name"
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
            name="percentage"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Enter percentage"
                    {...field}
                    className="rounded-lg h-12"
                    value={field.value}
                    onChange={(e) => {
                      // Directly set the string value while allowing transformation in Zod
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />
        </div>

        {/* From and To Dates */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="fromDate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormControl>
                  <Controller
                    name="fromDate"
                    control={form.control}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        startYear={1924}
                        onSelect={(selectedDate) => {
                          onChange(selectedDate);
                        }}
                        placeholder="Pick a start date"
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
            name="toDate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormControl>
                  <Controller
                    name="toDate"
                    control={form.control}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        startYear={1924}
                        onSelect={(selectedDate) => {
                          onChange(selectedDate);
                        }}
                        placeholder="Pick a end date"
                      />
                    )}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />
        </div>

        {/* Status and Study Mode */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-lg h-12 bg-white border-grey-200">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {educationStatus.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
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
            name="studyMode"
            render={({ field }) => (
              <FormItem className="w-full">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-lg h-12 bg-white border-grey-200">
                      <SelectValue placeholder="Select study mode" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {studyMode.map((mode) => (
                      <SelectItem key={mode} value={mode}>
                        {mode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />
        </div>
      </div>
    );
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-5 w-full h-full rounded-lg ">
        <div className="flex flex-col gap-5 overflow-y-scroll h-[270px] scrollbar-none ">
          {
            add > 0 && 
          addData()
          }
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
            onClick={addData}
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              'Add Education'
            )}
          </Button>
        </div>

        {/* Education Entries Table */}
        {educationDetailsEntries.length > 0 && (
          <div className="flex items-center gap-5 justify-end h-[120px] overflow-y-scroll">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Institute</TableHead>
                  <TableHead>From Date</TableHead>
                  <TableHead>To Date</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Study Mode</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {educationDetailsEntries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.course}</TableCell>
                    <TableCell>{entry.degreeSpecialization}</TableCell>
                    <TableCell>{entry.instituteUniversityName}</TableCell>
                    <TableCell>
                      {entry.fromDate
                        ? format(new Date(entry.fromDate), 'MMM yyyy')
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {entry.toDate
                        ? format(new Date(entry.toDate), 'MMM yyyy')
                        : 'N/A'}
                    </TableCell>
                    <TableCell>{entry.percentage}%</TableCell>
                    <TableCell>{entry.status}</TableCell>
                    <TableCell>{entry.studyMode}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeEducationEntry(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </form>
    </Form>
  );
};

export default EducationalDetailsForm;
