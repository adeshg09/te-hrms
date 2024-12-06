
'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter,useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResetPasswordSchema } from '@/lib/validations';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaArrowLeft } from "react-icons/fa";
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { resetPassword } from '@/actions/auth.action';
import toast from 'react-hot-toast';

const ResetPasswordForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =useState<boolean>(false);

  const { token } = Object.fromEntries(useSearchParams())

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await resetPassword(token,values);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Password Reset Successfully");
        router.push(`/dashboard`);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Card className="w-full  shadow-lg background-light-white_dark-black border-none">
      <CardHeader>
        <CardTitle className="h1-bold">Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="p-regular">New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Enter new password"
                      className="h-14 rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl className="relative">
                    <Input
                      {...field}
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      placeholder="Enter confirm password"
                      className="h-14 rounded-lg"
                    />
                    {/* <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-4 h-8 w-8 "
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-6 w-6" />
                      ) : (
                        <Eye className="h-6 w-6" />
                      )}
                    </Button> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary-default hover:bg-primary-dark p-7 rounded-lg"
              disabled={isSubmitting}
              size="lg"
            >
              <span className="text-white text-lg">
                {isSubmitting ? 'Loading...' : 'Reset Password'}
              </span>
            </Button>

            <Button
              variant="link"
              className="text-sm p-0 h-auto cursor-pointer mt-4 flex items-center justify-center"
              onClick={() => router.push('/')}
              asChild
            >
              <span className="flex items-center gap-2 text-sm text-secondary-default dark:text-secondary-dark">
              <FaArrowLeft className='h-5 w-5' />
                Go Back to Sign In
              </span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
