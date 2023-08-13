'use client';
import Input from '@/components/forms/Input';
import axios from '@/lib/axios';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { UserType } from '@/types/d';
import Link from 'next/link';
import useAuthStore from '@/store/authStore';

export default function RegisterPage() {
  // useState
  const [errorMessage, setErrorMessage] = useState('');

  // useAuthStore
  const isAuth = useAuthStore.useIsAuth();
  const role = useAuthStore.useRole();

  // useRouter
  const router = useRouter();

  // useEffect
  useEffect(() => {
    if (isAuth) {
      if (role === 'admin') router.push('/admin');
      if (role === 'member') router.push('/my');
    }
  }, [isAuth, role, router]);

  // useForm
  const methods = useForm<Omit<UserType, 'userId, posts, role'>>();
  const { handleSubmit } = methods;

  // onSubmit
  const onsubmit = (data: Omit<UserType, 'userId, posts, role'>) => {
    axios
      .post('/signup', data, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        router.push('/');
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error);
      });
  };

  return (
    <div className='flex min-h-screen justify-center items-center w-full'>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className='flex flex-col max-w-md w-full p-6 bg-neutral-200 rounded-md gap-y-3'
        >
          <Input
            id='email'
            type='email'
            label='Email'
            placeholder='Input your email here...'
            validation={{
              required: 'Email is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Email is invalid' },
              minLength: { value: 6, message: 'Email is too short' },
            }}
          />
          <Input
            id='password'
            type='password'
            label='Password'
            placeholder='Input your password here...'
            validation={{
              required: 'Password is required',
              minLength: { value: 8, message: 'Password is too short' },
            }}
          />
          {errorMessage && (
            <p className='text-xs text-red-500'>{errorMessage}</p>
          )}
          <button type='submit' className='bg-neutral-300 py-2 rounded-md'>
            Register
          </button>
          <p className='text-sm text-center'>
            Have an Account?{' '}
            <Link
              href='/'
              className='text-blue-400 font-semibold hover:underline decoration-blue-400 underline-offset-2'
            >
              login
            </Link>{' '}
          </p>
        </form>
      </FormProvider>
    </div>
  );
}
