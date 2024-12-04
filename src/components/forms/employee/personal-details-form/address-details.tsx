'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { addressDetailsSchema } from '@/lib/validations';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const AddressDetailsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof addressDetailsSchema>>({
    resolver: zodResolver(addressDetailsSchema),
    defaultValues: {
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
    },
  });

  const onSubmit = (values: z.infer<typeof addressDetailsSchema>) => {
    console.log(values);
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
                  <FormMessage />
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
                      type="number"
                      placeholder="Enter pincode"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
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

export default AddressDetailsForm;
