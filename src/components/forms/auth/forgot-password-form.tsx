
'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { forgotPasswordSchema } from '@/lib/validations';
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
import { forgotPassword } from '@/actions/auth.action';
import toast from 'react-hot-toast';

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      emailId: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setIsSubmitting(true);
    setIsSuccess(false)
    try {
      const result = await forgotPassword(values)
      if (result.error) {
        toast.error(result.error)
      } else {
        setIsSuccess(true)

        toast.success('Password reset link sent to your email')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    }finally{
      setIsSubmitting(false)
    }
  };

  return (
    <Card className="w-full  shadow-lg background-light-white_dark-black border-none">
      <CardHeader>
        <CardTitle className="h1-bold">Forgot Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FormField
              control={form.control}
              name="emailId"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="p-regular">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      id="password"
                      placeholder="Enter email address"
                      className="h-14 rounded-lg"
                    />
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
             <span className='text-white text-lg'>
              {isSubmitting ? 'Loading...' : isSuccess ? 'Resend Email' : 'Submit'}
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

export default ForgotPasswordForm;
