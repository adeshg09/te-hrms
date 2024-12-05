'use client';

import { profBasicDetailsSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

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
import { FileUp, Loader2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { getAllDesignations } from '@/actions/designation.action';
import { Designation } from '@/types';
import { useMultiStepForm } from '@/hooks/use-multistep-form';
import { ProfBasicDetailsFormData } from '@/types/form';
import { employementType, workingType } from '@/constants';
import { DatePicker } from '@/components/ui/custom-datepicker';
import toast from 'react-hot-toast';
import { Card } from '@/components/ui/card';

async function uploadSignatureToCloudStorage(file: File): Promise<string> {
  // Simulated upload - replace with actual implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`https://example.com/signatures/${file.name}`);
    }, 1000);
  });
}

const ProfBasicDetailsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>();

  const {
    activeStep,
    setActiveStep,
    currentSubStep,
    setCurrentSubStep,
    updateFormData,
    formData,
  } = useMultiStepForm();

  const form = useForm<ProfBasicDetailsFormData>({
    resolver: zodResolver(profBasicDetailsSchema),
    defaultValues: {
      designation: formData.profBasicDetails?.designation || '',
      employmentType: formData.profBasicDetails?.employmentType || 'FullTime',
      workingType: formData.profBasicDetails?.workingType || 'Hybrid',
      dateOfJoin: formData.profBasicDetails?.dateOfJoin || undefined,
      signatureUrl: formData.profBasicDetails?.signatureUrl || '',
    },
  });

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const { designations, error } = await getAllDesignations();
        if (error) {
          console.error('Error fetching designations:', error);
          return;
        }
        if (designations && designations.length > 0) {
          setDesignations(designations);
        }
      } catch (error) {
        console.error('Unexpected error in fetchDesignations:', error);
      }
    };

    fetchDesignations();
  }, []);

  const handleSignatureUpload = async (file: File) => {
    // Validate file
    if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
      toast.error('Invalid file type. Please upload JPEG, PNG, or SVG.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      // 2MB limit
      toast.error('File size should not exceed 2MB');
      return;
    }

    try {
      setIsLoading(true);
      const signatureUrl = await uploadSignatureToCloudStorage(file);

      // Update form values
      form.setValue('signatureUrl', signatureUrl);

      // Store file and preview
      setSignatureFile(file);
      setSignaturePreview(URL.createObjectURL(file));

      toast.success('Signature uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload signature');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove signature handler
  const handleRemoveSignature = () => {
    setSignatureFile(null);
    setSignaturePreview(null);
    form.setValue('signatureUrl', '');
  };

  const onSubmit = async (values: ProfBasicDetailsFormData) => {
    setIsLoading(true);
    try {
      updateFormData({
        profBasicDetails: values,
      });

      if (currentSubStep < 1) {
        setCurrentSubStep(currentSubStep + 1);
      } else {
        setActiveStep('Documents');
        setCurrentSubStep(0);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onBack = async () => {
    if (currentSubStep > 0) {
      setCurrentSubStep(currentSubStep - 1);
    } else {
      setActiveStep('Personal Details');
      setCurrentSubStep(4);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full h-full rounded-lg "
      >
        {/* Designation */}
        <div className="flex flex-col gap-5  overflow-y-scroll h-[290px]  scrollbar-none ">
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="rounded-lg h-12 bg-white border-grey-200">
                        <SelectValue placeholder="Select designation" />
                      </SelectTrigger>
                      <SelectContent>
                        {designations.map((designation) => (
                          <SelectItem
                            key={designation.designationId}
                            value={designation.designationName}
                          >
                            {designation.designationName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Employment Type */}
            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="rounded-lg h-12 bg-white border-grey-200">
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {employementType.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="workingType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="rounded-lg h-12 bg-white border-grey-200">
                        <SelectValue placeholder="Select working type" />
                      </SelectTrigger>
                      <SelectContent>
                        {workingType.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Joining */}
            <FormField
              control={form.control}
              name="dateOfJoin"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormControl>
                    <Controller
                      name="dateOfJoin"
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
          <div className="flex flex-col md:flex-row items-center justify-center">
            <FormItem className="w-[50%]">
              <Card
                className={`border p-4 ${signaturePreview ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
              >
                <div className="flex flex-col items-center space-y-4">
                  {!signaturePreview && (
                    <div className="rounded-full bg-secondary-default p-3 flex items-center justify-center gap-3">
                      <FileUp className="text-white" />
                      <FormLabel className="text-white">
                        Upload Employee Signature
                      </FormLabel>
                    </div>
                  )}
                  <div className="text-center">
                    {signaturePreview ? (
                      <div className="flex  items-center justify-between gap-10 ">
                        <img
                          src={signaturePreview}
                          alt="Signature Preview"
                          className="max-w-[200px] max-h-[100px] object-contain"
                        />
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleRemoveSignature}
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
                                handleSignatureUpload(file);
                              }
                            }}
                            className="hidden"
                            id="signature-upload"
                          />
                          <label
                            htmlFor="signature-upload"
                            className="text-secondary-default hover:underline cursor-pointer"
                          >
                            choose file
                          </label>{' '}
                          to upload
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          Supported formats: JPEG, PNG, SVG (Max 2MB)
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

        {/* Submit Button */}
        <div className="flex items-center gap-5 justify-end ">
          <Button
            type="submit"
            className="bg-primary-default hover:bg-primary-dark text-white rounded-lg "
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : currentSubStep < 1 ? (
              'Next'
            ) : (
              'Proceed to Documents'
            )}
          </Button>
          <Button
            type="button"
            className="bg-secondary-default hover:bg-secondary-dark text-white rounded-lg"
            size="lg"
            onClick={onBack}
          >
            {currentSubStep > 0 ? 'Back' : 'Back to Personal Details '}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfBasicDetailsForm;
