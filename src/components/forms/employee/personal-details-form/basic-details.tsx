'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';

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
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';

import { CalendarIcon, Loader2, X } from 'lucide-react';

import { getAllRoles } from '@/actions/role.action';
import { basicDetailsSchema } from '@/lib/validations';

const BasicDetailsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allRoles, setAllRoles] = useState<
    {
      id: number;
      name: string;
      description: string | null;
    }[]
  >([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof basicDetailsSchema>>({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: {
      isActive: true,
      showActivity: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'roles',
    control: form.control,
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { roles, error } = await getAllRoles();

        if (error) {
          console.error('Error fetching roles:', error);
          return;
        }

        if (roles && roles.length > 0) {
          const formattedRoles = roles.map((role) => ({
            id: role.roleId,
            name: role.roleName,
            description: role.roleDescription,
          }));

          // Use state setter function to ensure update
          setAllRoles((prevRoles) => formattedRoles);

          console.log('Formatted roles:', formattedRoles);
          console.log("allroles are",allRoles)
        }
      } catch (catchError) {
        console.error('Unexpected error in fetchRoles:', catchError);
      }
    };

    fetchRoles();
  }, []);

  const onSubmit = async (values: z.infer<typeof basicDetailsSchema>) => {
    setIsLoading(true);
    try {
      console.log(values);
      // Implement your submission logic here
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
        className="flex flex-col gap-5 w-full h-full"
      >
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
              <FormItem className="w-full">
                <Popover>
                  <PopoverTrigger
                    asChild
                    className="rounded-lg h-12 bg-white border-grey-200"
                  >
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={`w-full pl-3 text-left font-normal ${
                          !field.value && 'text-muted-foreground'
                        }`}
                      >
                        {field.value ? (
                          format(new Date(field.value), 'PPP')
                        ) : (
                          <span>Enter Date Of Birth</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-sm text-red-600" />
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

        {/* Additional Fields */}
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
                    {[
                      'APlus',
                      'AMinus',
                      'BPlus',
                      'BMinus',
                      'ABPlus',
                      'ABMinus',
                      'OPlus',
                      'OMinus',
                    ].map((group) => (
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
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                    <SelectItem value="Widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />
        </div>

        {/* Profile URL and Additional Details */}
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
        </div>

        {/* Roles Field */}
        {/* <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="roles"
            render={() => (
              <FormItem className="flex flex-col">
                <FormLabel>Roles</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between bg-white"
                      >
                        Select roles
                        <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search role..."
                        className="h-9"
                      />
                      <CommandEmpty>No role found.</CommandEmpty>
                      <CommandGroup>
                        {allRoles.map((role) => (
                          <CommandItem
                            value={role.name}
                            key={role.id}
                            onSelect={() => {
                              const exists = fields.some(
                                (field) => field.roleId === role.id,
                              );
                              if (!exists) {
                                append({ roleId: role.id });
                              }
                              setOpen(false);
                            }}
                          >
                            {role.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <div className="flex flex-wrap gap-2 mt-2">
                  {fields.map((field, index) => (
                    <Badge key={field.id} variant="secondary">
                      {allRoles.find((role) => role.id === field.roleId)?.name}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-4 w-4 p-0"
                        onClick={() => remove(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}

        <div className="w-full h-full flex items-center justify-between gap-10">
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between w-full rounded-lg ">
                  <div>
                    <FormLabel>Is Active</FormLabel>
                    <FormMessage className="text-sm text-secondary" />
                  </div>
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
            <FormField
              control={form.control}
              name="showActivity"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between w-full rounded-lg">
                  <div>
                    <FormLabel>Show Activity</FormLabel>
                    <FormMessage className="text-sm text-red-600" />
                  </div>
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
          <div className="flex items-center gap-5">
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
        </div>
      </form>
    </Form>
  );
};

export default BasicDetailsForm;
