'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileUp, Loader2, Trash2 } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { DatePicker } from '@/components/ui/custom-datepicker';

import { getAllRoles } from '@/actions/role.action';
import { basicDetailsSchema } from '@/lib/validations';
import { Role } from '@/types';
import { bloodGroups, marritalStatus } from '@/constants';
import { useMultiStepForm } from '@/hooks/use-multistep-form';
import { BasicDetailsFormData } from '@/types/form';
import toast from 'react-hot-toast';
import { Card } from '@/components/ui/card';
import { calculateAge } from '@/lib/utilities/age-utility';

// Helper function for simulated profile upload
async function uploadProfileToCloudStorage(file: File): Promise<string> {
  // In production, replace with actual cloud storage upload logic
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`https://example.com/profiles/${file.name}`);
    }, 1000);
  });
}

const BasicDetailsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>();

  const router = useRouter();
  const {
    activeStep,
    setActiveStep,
    currentSubStep,
    setCurrentSubStep,
    updateFormData,
    formData,
  } = useMultiStepForm();

  const form = useForm<BasicDetailsFormData>({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: {
      firstName: formData.basicDetails?.firstName || '',
      middleName: formData.basicDetails?.middleName || '',
      lastName: formData.basicDetails?.lastName || '',
      mobileNo: formData.basicDetails?.mobileNo || '',
      emailId: formData.basicDetails?.emailId || '',
      password: formData.basicDetails?.password || '',
      profileUrl: formData.basicDetails?.profileUrl || '',
      roles: formData.basicDetails?.roles || [],
      isActive: formData.basicDetails?.isActive ?? true,
      showActivity: formData.basicDetails?.showActivity ?? true,
      dateOfBirth: formData.basicDetails?.dateOfBirth || undefined,
      age: formData.basicDetails?.age || undefined,
      gender: formData.basicDetails?.gender || undefined,
      maritalStatus: formData.basicDetails?.maritalStatus || undefined,
      bloodGroup: formData.basicDetails?.bloodGroup || undefined,
      birthCountry: formData.basicDetails?.birthCountry || '',
      birthState: formData.basicDetails?.birthState || '',
      birthLocation: formData.basicDetails?.birthLocation || '',
      panNo: formData.basicDetails?.panNo || '',
      caste: formData.basicDetails?.caste || '',
      religion: formData.basicDetails?.religion || '',
      domicile: formData.basicDetails?.domicile || '',
    },
  });
  const [calculatedAge, setCalculatedAge] = useState<number | undefined>(
    formData.basicDetails?.age,
  );
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
          // Pre-select existing roles if in form data
          if (formData.basicDetails?.roles) {
            setSelectedRoles(
              formData.basicDetails.roles.map((role) => role.roleId),
            );
          }
        }
      } catch (catchError) {
        console.error('Unexpected error in fetchRoles:', catchError);
      }
    };

    fetchRoles();
  }, [formData.basicDetails?.roles]);

  // Watch the dateOfBirth field to automatically calculate age
  const watchDateOfBirth = form.watch('dateOfBirth');

  useEffect(() => {
    // Automatically calculate and set age when date of birth changes
    if (watchDateOfBirth) {
      const newCalculatedAge = calculateAge(watchDateOfBirth);
      setCalculatedAge(newCalculatedAge);
      form.setValue('age', newCalculatedAge, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [watchDateOfBirth, form]);

  const handleProfileUpload = async (file: File) => {
    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
      toast.error('Invalid file type. Please upload JPEG, PNG, or SVG.');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should not exceed 5MB');
      return;
    }

    try {
      setIsLoading(true);
      const profileUrl = await uploadProfileToCloudStorage(file);

      // Update form values
      form.setValue('profileUrl', profileUrl);

      // Store file and preview
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));

      toast.success('Profile picture uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload profile picture');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove profile picture handler
  const handleRemoveProfile = () => {
    setProfileFile(null);
    setProfilePreview(null);
    form.setValue('profileUrl', '');
  };

  const onNext=()=>{
    if (currentSubStep < 4) {
      // Move to next substep within Personal Details
      setCurrentSubStep(currentSubStep + 1);
    } else {
      // When all substeps are complete, move to next main step
      // In this case, move to 'Professional Details'
      setActiveStep('Professional Details');
      // Reset substep to 0 when moving to a new main step
      setCurrentSubStep(0);
    }
  }

  const onSubmit = async (values: BasicDetailsFormData) => {
    setIsLoading(true);
    try {
      // Update form data in context
      if (!values.age && values.dateOfBirth) {
        values.age = calculateAge(values.dateOfBirth);
      }
      updateFormData({
        basicDetails: values,
      });
      toast.success("Personal Basic Details Submitted Successfully");

      // Navigation logic for substeps and main steps
      
    } catch (error) {
      console.error('Submission error:', error);
      // Optionally, handle error states
      // You might want to show an error toast or message
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

          {/* dob, age, gender */}
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
                          placeholder="Pick Date Of Birth"
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
                      {...field}
                      type="number"
                      placeholder={`Age ${calculatedAge ? `(Calculated: ${calculatedAge})` : ''}`}
                      value={field.value ?? calculatedAge ?? ''}
                      onChange={(e) => {
                        const value =
                          e.target.value === ''
                            ? undefined
                            : Number(e.target.value);
                        field.onChange(value);
                        setCalculatedAge(value);
                      }}
                      className="rounded-lg h-12"
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
                        <SelectItem key={group.label} value={group.value}>
                          {group.label}
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
          <div className="flex flex-col gap-5 md:flex-row ">
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
            <div className="w-full flex items-center justify-between rounded-lg h-12 border border-gray-200 px-4">
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
            <div className="w-full flex items-center justify-between rounded-lg h-12 border border-gray-200 px-4">
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

          <div className="flex items-center justify-center gap-5 md:flex-row">
            <FormItem className="sm:w-[50%]">
              <Card
                className={`border p-4 ${profilePreview ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
              >
                <div className="flex flex-col items-center space-y-4">
                  {!profilePreview && (
                    <div className="rounded-full bg-secondary-default p-3 flex items-center justify-center gap-3">
                      <FileUp className="text-white" />
                      <FormLabel className="text-white">
                        Upload Profile Picture
                      </FormLabel>
                    </div>
                  )}
                  <div className="text-center">
                    {profilePreview ? (
                      <div className="flex items-center justify-between gap-10">
                        <img
                          src={profilePreview}
                          alt="Profile Preview"
                          className="max-w-[200px] max-h-[200px] object-cover rounded-lg"
                        />
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleRemoveProfile}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600">
                          Drag & Drop or{' '}
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.svg"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleProfileUpload(file);
                              }
                            }}
                            className="hidden"
                            id="profile-upload"
                          />
                          <label
                            htmlFor="profile-upload"
                            className="text-secondary-default hover:underline cursor-pointer"
                          >
                            choose file
                          </label>{' '}
                          to upload
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          Supported formats: JPEG, PNG, SVG (Max 5MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </Card>
              <FormMessage />
            </FormItem>
          </div>
        </div>

        <div className="flex items-center gap-5 sm:justify-end ">
          <Button
            className="bg-primary-default hover:bg-primary-dark text-white rounded-lg "
            size="lg"
            disabled={isLoading}
            onClick={onNext}
          >
            { currentSubStep < 4 ? (
              'Next'
            ) : (
              'Proceed to Professional Details'
            )}
          </Button>
          <Button
            type="button"
            className="bg-secondary-default hover:bg-secondary-dark text-white rounded-lg"
            size="lg"
            onClick={onBack}
          >
            {currentSubStep > 0 ? 'Back' : 'Cancel'}
          </Button>
          <Button
            type="submit"
            className="bg-primary-default hover:bg-primary-dark text-white rounded-lg"
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              'Add Basic Details'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BasicDetailsForm;
