'use client';
import Input from '@/components/forms/Input';
import axios from '@/lib/axios';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import useAuthStore from '@/store/authStore';
import { useEffect, useState } from 'react';
import { UserType } from '@/types/d';
import Link from 'next/link';
import { Metadata } from 'next';

interface HomePageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login Gateway',
};

export default Home;
function Home({ searchParams }: HomePageProps) {
  // useState
  const [errorMessage, setErrorMessage] = useState('');

  // useAuthStore
  const isAuth = useAuthStore.useIsAuth();
  const role = useAuthStore.useRole();
  const setIsAuth = useAuthStore.useSetIsAuth();
  const setUserId = useAuthStore.useSetUserId();
  const setEmail = useAuthStore.useSetEmail();
  const setRole = useAuthStore.useSetRole();

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
  const methods = useForm<Omit<UserType, 'posts, role'>>();
  const { handleSubmit } = methods;

  // onSubmit
  const onsubmit = (data: Omit<UserType, 'posts, role'>) => {
    axios
      .post('/login', data, { withCredentials: true })
      .then((res) => {
        console.log(res.data.data);
        setIsAuth(true);
        setUserId(res.data.data.userId);
        setEmail(res.data.data.email);
        setRole(res.data.data.role);
        if (res.data.data.role === 'admin') router.push('/admin');
        if (res.data.data.role === 'member') router.push('/my');
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
          {searchParams?.message && (
            <p className='text-sm text-red-500 text-center bg-red-100 py-1.5 rounded-md font-semibold border-2 border-red-500'>
              {searchParams.message}
            </p>
          )}
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
              //   pattern: {
              //     value: /\S+@\S+\.\S+/,
              //     message: 'Password is invalid',
              //   },
              //   minLength: { value: 8, message: 'Password is too short' },
            }}
          />
          {errorMessage && (
            <p className='text-xs text-red-500'>{errorMessage}</p>
          )}
          <button type='submit' className='bg-neutral-300 py-2 rounded-md'>
            Login
          </button>
          <p className='text-sm text-center'>
            Not registered?{' '}
            <Link
              href='/register'
              className='text-blue-400 font-semibold hover:underline decoration-blue-400 underline-offset-2'
            >
              register
            </Link>{' '}
          </p>
        </form>
      </FormProvider>
    </div>
  );
}
