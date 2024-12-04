'use client';

import { emergencyContactDetailsSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const EmergencyContactDetailsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof emergencyContactDetailsSchema>>({
    resolver: zodResolver(emergencyContactDetailsSchema),
    defaultValues: {
      contactName: '',
      contactAddress: '',
      relationToEmployee: '',
      contactNumber: '',
    },
  });

  const onSubmit = async (
    values: z.infer<typeof emergencyContactDetailsSchema>,
  ) => {
    setIsLoading(true);
    try {
      // Handle form submission logic here
      console.log(values);
      // Example:
      // const result = await saveEmergencyContactDetails(values);
      // if (result?.error) {
      //   toast.error(result.error);
      // } else {
      //   toast.success("Emergency contact saved successfully!");
      //   router.push('/dashboard');
      // }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full h-full rounded-lg "
      >
        <div className="flex flex-col gap-5  overflow-y-scroll md:h-[330px] sm:h-[324px] h-[344px]  scrollbar-none ">
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

            {/* Emergency Contact Address */}
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
          {/* Emergency Contact Name */}

          <div className="flex flex-col gap-5 md:flex-row">
            {/* Relation to Employee */}
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

            {/* Emergency Contact Number */}
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

        {/* Submit and Back Buttons */}
        <div className="flex items-center gap-5  justify-end">
          <Button
            type="submit"
            className="bg-primary-default hover:bg-primary-dark text-white rounded-lg "
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              'Submit'
            )}
          </Button>
          <Button
            type="button"
            className="bg-secondary-default hover:bg-secondary-dark text-white rounded-lg"
            size="lg"
            onClick={() => {}}
          >
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EmergencyContactDetailsForm;
