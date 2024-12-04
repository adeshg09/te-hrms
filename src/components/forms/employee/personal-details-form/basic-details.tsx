'use client';

import React, { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { MultiSelect } from '@/components/multi-select';

import { Loader2 } from 'lucide-react';

import { getAllRoles } from '@/actions/role.action';
import { basicDetailsSchema } from '@/lib/validations';
import { Role } from '@/types';
import { bloodGroups, marritalStatus } from '@/constants';
import { DatePicker } from '@/components/ui/custom-datepicker';
import { basicDetailsFormData } from '@/types/form';
import { useRouter } from 'next/navigation';
import { useMultiStepForm } from '@/hooks/use-multistep-form';

const BasicDetailsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  const router=useRouter();
  const { 
    activeStep, 
    currentSubStep, 
    setCurrentSubStep, 
    updateFormData ,
    formData,
  } = useMultiStepForm();


  const form = useForm<basicDetailsFormData>({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      mobileNo: '',
      emailId: '',
      password: '',
      profileUrl: '',
      roles: [],
      isActive: true,
      showActivity: true,
      dateOfBirth: undefined,
      age: 18,
      gender: 'Male',
      maritalStatus: 'Single',
      bloodGroup: 'APlus',
      birthCountry: '',
      birthState: '',
      birthLocation: '',
      panNo: '',
      caste: '',
      religion: '',
      domicile: '',
    }
  });

  console.log(form.formState.errors);
  

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { roles, error } = await getAllRoles();

        if (error) {
          console.error('Error fetching roles:', error);
          return;
        }

        if (roles && roles.length > 0) {
          setRoles(roles);
        }
      } catch (catchError) {
        console.error('Unexpected error in fetchRoles:', catchError);
      }
    };

    fetchRoles();
  }, []);

  const onSubmit = async (values: basicDetailsFormData) => {
    setIsLoading(true);
    try {
      console.log('Form Values:', values);
      updateFormData(values);

      if (currentSubStep < 4) {
        setCurrentSubStep(currentSubStep + 1);
      } else {
        // If this is the last substep, move to next main step
        // In this case, move to 'Professional Details'
        // Typically you'd dispatch an action to change main step
      }

      // Your submission logic here, e.g.:
      // const response = await submitUserDetails(values);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onBack = () => {
    if (currentSubStep > 0) {
      // Go back to previous substep
      setCurrentSubStep(currentSubStep - 1);
    } else {
      // If first substep, go back to employee dashboard
      router.push(`/dashboard/employees`);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5  w-full h-full rounded-lg "
      >
        <div className="flex flex-col gap-5  overflow-y-scroll h-[290px]  scrollbar-none ">
          {/* Name Fields */}
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter first name"
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
              name="middleName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter middle name"
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
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter last name"
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

          {/* Contact and Authentication Fields */}
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="mobileNo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter mobile no"
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
              name="emailId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email"
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
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
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

          {/* Additional Personal Details */}
          <div className="flex flex-col gap-5 md:flex-row">
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
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-lg h-12 bg-white border-grey-200 ">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
          </div>

          {/* Location and Identification Details */}
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

          {/* BloodGrp , pan , marritalStatus */}
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="bloodGroup"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-lg h-12 bg-white border-grey-200">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
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
              name="panNo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter PAN number"
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
              name="maritalStatus"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-lg h-12 bg-white border-grey-200">
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {marritalStatus.map((status) => (
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
          </div>

          {/* Caste, Religion , domicile */}
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="caste"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter caste"
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
              name="religion"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter religion"
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
              name="domicile"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter Domicile"
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


          {/* profile url,select role ,isactive,showactivity */}
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="profileUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Enter profile URL"
                      {...field}
                      className="rounded-lg h-12"
                      aria-required="true"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
            <MultiSelect
              options={roles.map((role) => ({
                value: role.roleId.toString(),
                label: role.roleName,
              }))}
              onValueChange={(selectedValues) => {
                const roleIds = selectedValues.map((val) => Number(val));
                setSelectedRoles(roleIds);
                form.setValue(
                  'roles',
                  roleIds.map((roleId) => ({ roleId })),
                );
              }}
              defaultValue={selectedRoles.map((id) => id.toString())}
              placeholder="Select roles"
              variant="inverted"
              animation={2}
              maxCount={5}
            />

            <div className="flex  gap-5 w-full items-center justify-between">
             

              <div className="flex items-center justify-between rounded-lg h-12 border border-gray-200 px-4">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between w-full gap-5">
                      Is Active
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-label="Toggle user active status"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg h-12 border border-gray-200 px-4">
                <FormField
                  control={form.control}
                  name="showActivity"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between w-full gap-5">
                      Show Activity
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-label="Toggle user activity visibility"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5 justify-end ">
          <Button
            type="submit"
            className="bg-primary-default hover:bg-primary-dark text-white rounded-lg "
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              currentSubStep < 4 
                ? 'Next' 
                : 'Proceed to Professional Details'
            )}
          </Button>
          <Button
            type="button"
            className="bg-secondary-default hover:bg-secondary-dark text-white rounded-lg"
            size="lg"
            onClick={onBack}
          >
            {currentSubStep > 0 ? 'Previous Substep' : 'Back'}
          </Button>
        </div>
        

      </form>
    </Form>
  );
};

export default BasicDetailsForm;
