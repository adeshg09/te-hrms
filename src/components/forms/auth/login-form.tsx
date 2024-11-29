// components/forms/auth/loginform.tsx
'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { loginSchema } from '@/lib/validations';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { LoginFormData } from '@/types/form';
import { login } from '@/actions/auth.action';  
import { BiShow ,BiHide} from "react-icons/bi";
import toast from 'react-hot-toast';

const LoginForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    setIsSubmitting(true);
    try {
      console.log("before login action")
      const result = await login(values);
      console.log("after login action")
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Sign in successful!");
        router.push(`/dashboard`);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full shadow-lg background-light-white_dark-black border-none">
      <CardHeader>
        <CardTitle className="h1-bold">Hrms Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="p-regular">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      id="email"
                      placeholder="Enter email address"
                      className="h-14 rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl className="relative">
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Enter password"
                      className="h-14 rounded-lg"
                    />
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <FormItem className="space-y-2">
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border border-grey-500 bg-grey-50"
                        />
                        <Label htmlFor="remember">Remember me</Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-between">
                        <Link
                          href={`/forgot-password`}
                          className="text-blue-500 text-base"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </FormControl>
                  </FormItem>
                </div>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-primary-default hover:bg-primary-dark p-7 rounded-lg"
              disabled={isSubmitting}
              size="lg"
            >
              <span className="text-white text-lg">
                {isSubmitting ? 'Loading...' : 'Sign In'}
              </span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
