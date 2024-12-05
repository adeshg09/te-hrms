'use client';

import React, { useState } from 'react';
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

import { addressDetailsSchema } from '@/lib/validations';
import { useMultiStepForm } from '@/hooks/use-multistep-form';
import { AddressDetailsFormData } from '@/types/form';

const AddressDetailsForm = () => {
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

  // Get existing address details from form data or initialize empty array
  const existingAddressDetails = formData.addressDetails || [];
  const [addressDetailsEntries, setAddressDetailsEntries] = useState<
    AddressDetailsFormData[]
  >(existingAddressDetails);

  const form = useForm<AddressDetailsFormData>({
    resolver: zodResolver(addressDetailsSchema),
    defaultValues: {
      addressType: existingAddressDetails[0]?.addressType || 'Present',
      buildingName: existingAddressDetails[0]?.buildingName || '',
      flatNumber: existingAddressDetails[0]?.flatNumber || '',
      streetName: existingAddressDetails[0]?.streetName || '',
      landmark: existingAddressDetails[0]?.landmark || '',
      city: existingAddressDetails[0]?.city || '',
      state: existingAddressDetails[0]?.state || '',
      pincode: existingAddressDetails[0]?.pincode || '',
      telephoneNumber: existingAddressDetails[0]?.telephoneNumber || '',
      mobileNumber: existingAddressDetails[0]?.mobileNumber || '',
    },
  });

  const addEntry = () => {
    form.handleSubmit((values) => {
      const updatedEntries = [...addressDetailsEntries, values];

      // Update local state
      setAddressDetailsEntries(updatedEntries);

      // Also update form data in context
      updateFormData({
        addressDetails: updatedEntries,
      });

      // Reset form to default values after adding
      form.reset({
        addressType: 'Present',
        buildingName: '',
        flatNumber: '',
        streetName: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        telephoneNumber: '',
        mobileNumber: '',
      });
    })();
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      // Update form data in context
      updateFormData({
        addressDetails: addressDetailsEntries,
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

  const removeAddressEntry = (indexToRemove: number) => {
    const updatedEntries = addressDetailsEntries.filter(
      (_, index) => index !== indexToRemove,
    );

    // Update local state
    setAddressDetailsEntries(updatedEntries);

    // Update form data in context
    updateFormData({
      addressDetails: updatedEntries,
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
              name="addressType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-lg h-12 bg-white border-grey-200">
                        <SelectValue placeholder="Select address type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Present">Present</SelectItem>
                      <SelectItem value="Permanent">Permanent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buildingName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter building name"
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
              name="flatNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter flat number"
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
              name="streetName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter street name"
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
              name="landmark"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter landmark"
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter pincode"
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
              name="mobileNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter mobile number"
                      {...field}
                      className="rounded-lg h-12"
                    />
                  </FormControl>
                  <FormMessage />
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
              'Add Address'
            )}
          </Button>
        </div>

        {/* Address Entries Table */}
        <div className="flex items-center gap-5 justify-end h-[100px] overflow-y-scroll">
          {addressDetailsEntries.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Building</TableHead>
                  <TableHead>Flat</TableHead>
                  <TableHead>Street</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Pincode</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {addressDetailsEntries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.addressType}</TableCell>
                    <TableCell>{entry.buildingName}</TableCell>
                    <TableCell>{entry.flatNumber}</TableCell>
                    <TableCell>{entry.streetName}</TableCell>
                    <TableCell>{entry.city}</TableCell>
                    <TableCell>{entry.state}</TableCell>
                    <TableCell>{entry.pincode}</TableCell>
                    <TableCell>{entry.mobileNumber}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeAddressEntry(index)}
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

export default AddressDetailsForm;
