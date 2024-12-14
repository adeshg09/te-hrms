"use client"
import ResetPasswordForm from '@/components/forms/auth/reset-password-form'
import React, { Suspense } from 'react'

const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

export default ResetPassword
