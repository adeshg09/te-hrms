'use client';

import { educationalDetailsSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
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

import { Loader2, Trash2 } from 'lucide-react';

import { educationCourse, educationStatus, studyMode } from '@/constants';
import { DatePicker } from '@/components/ui/custom-datepicker';
import { educationDetailsFormData } from '@/types/form';
import { format } from 'date-fns';

const EducationalDetailsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [educationDetailsEntries, setEducationDetailsEntries] = useState<
    educationDetailsFormData[]
  >([]);

  const form = useForm<educationDetailsFormData>({
    resolver: zodResolver(educationalDetailsSchema),
    defaultValues: {
      course: 'Std 10th',
      degreeSpecialization: '',
      instituteUniversityName: '',
      status: 'Completed',
      studyMode: 'Full Time',
      fromDate: undefined,
      toDate: undefined,
      percentage: 100,
    },
  });

  const addEntry = () => {};

  const onSubmit = async (values: educationDetailsFormData) => {
    setIsLoading(true);
    try {
      // Add new entry to the list of education details
      setEducationDetailsEntries((prevEntries) => {
        // Ensure no duplicate entries
        const isDuplicate = prevEntries.some(
          (entry) =>
            entry.course === values.course &&
            entry.instituteUniversityName === values.instituteUniversityName &&
            entry.fromDate === values.fromDate,
        );

        if (isDuplicate) {
          // Optionally, you could show a toast or alert here
          return prevEntries;
        }

        return [...prevEntries, values];
      });

      // Reset the form after submission
      form.reset();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const removeEducationEntry = (indexToRemove: number) => {
    setEducationDetailsEntries((prevEntries) =>
      prevEntries.filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full h-full rounded-lg "
        >
          <div className="flex flex-col gap-5 overflow-y-scroll h-[250px] scrollbar-none ">
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
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                    <FormMessage />
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
                        type="number"
                        placeholder="Enter percentage"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="rounded-lg h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
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
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 justify-end">
            <Button
              type="submit"
              className="bg-primary-default hover:bg-primary-dark text-white rounded-lg"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                'Add Education'
              )}
            </Button>
            <Button
              type="button"
              className="bg-secondary-default hover:bg-secondary-dark text-white rounded-lg"
              size="lg"
              onClick={() => {}}
            >
              Next
            </Button>
            <Button
              type="button"
              className="bg-primary-default hover:bg-primary-dark text-white rounded-lg"
              size="lg"
              onClick={() => {}}
            >
              Back
            </Button>
          </div>

          <div className="flex items-center gap-5 justify-end h-[100px] overflow-y-scroll ">
            {educationDetailsEntries.length > 0 && (
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
            )}
          </div>
        </form>
      </Form>

      
    </div>
  );
};

export default EducationalDetailsForm;
