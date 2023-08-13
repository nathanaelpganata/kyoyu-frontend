'use client';

import axios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuthStore from '../../store/authStore';
import { useRouter } from 'next/navigation';
import { PostType } from '@/types/d';
import PostCard from '@/components/cards/PostCard';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '@/components/forms/Input';
import withAuth from '@/lib/withAuth';

interface MyPageProps {
  searchParams?: {
    [key: string | never]: string | string[] | undefined;
  };
}

type PostDataType = {
  data: PostType[];
};

export default withAuth(MyPage, ['member']);
function MyPage({ searchParams }: MyPageProps) {
  // useAuthStore
  const isAuth = useAuthStore.useIsAuth();
  const userId = useAuthStore.useUserId();
  const email = useAuthStore.useEmail();
  const role = useAuthStore.useRole();
  const setIsAuth = useAuthStore.useSetIsAuth();
  const setUserId = useAuthStore.useSetUserId();
  const setEmail = useAuthStore.useSetEmail();
  const setRole = useAuthStore.useSetRole();

  // useState
  const [errorMessage, setErrorMessage] = useState('');

  // useForm
  const methods = useForm<PostType>();
  const { handleSubmit } = methods;

  // useRouter
  const router = useRouter();

  // onSubmit
  const onsubmit = (data: PostType) => {
    axios
      .post('/my/posts', data, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        refetch();
        methods.reset();
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error);
      });
  };

  // useQuery
  const { data, isLoading, refetch } = useQuery<PostDataType>(['/my/posts']);
  console.log(data);

  // Logout
  const logout = () => {
    axios
      .post(`/logout`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsAuth(false);
    setUserId('');
    setEmail('');
    setRole('');
    router.push('/');
  };

  return (
    <div>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className='grid grid-cols-12 m-8 gap-4 '>
          {/* Left Pane */}
          <div className='flex flex-col items-start w-full h-max col-span-3 sticky top-4 gap-4'>
            <h1 className='text-3xl font-bold'>What`s New</h1>
            <div className='flex flex-col gap-2'>
              <div className='bg-neutral-100 p-4 rounded-md hover:bg-neutral-200 w-full'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                quibusdam est non aliquid at quos id earum repudiandae ea
                inventore.
              </div>
              <div className='bg-neutral-100 p-4 rounded-md hover:bg-neutral-200 w-full'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                quibusdam est non aliquid at quos id earum repudiandae ea
                inventore.
              </div>
              <div className='bg-neutral-100 p-4 rounded-md hover:bg-neutral-200 w-full'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                quibusdam est non aliquid at quos id earum repudiandae ea
                inventore.
              </div>
              <div className='bg-neutral-100 p-4 rounded-md hover:bg-neutral-200 w-full'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                quibusdam est non aliquid at quos id earum repudiandae ea
                inventore.
              </div>
              <div className='bg-neutral-100 p-4 rounded-md hover:bg-neutral-200 w-full'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                quibusdam est non aliquid at quos id earum repudiandae ea
                inventore.
              </div>
            </div>
          </div>
          {/* Central Pane */}
          <div className='col-span-6 gap-6 flex flex-col w-full'>
            <div className='flex flex-col gap-3'>
              <p className='text-2xl font-semibold bg-neutral-300 p-2 rounded-md w-max'>
                Share your day!
              </p>
              <div className='flex flex-col w-full bg-neutral-200 p-4 rounded-md'>
                <FormProvider {...methods}>
                  <form
                    onSubmit={handleSubmit(onsubmit)}
                    className='flex flex-col w-full mt-2'
                  >
                    <div className='flex flex-row gap-2'>
                      <Input
                        id='title'
                        label=''
                        inputClassName='bg-transparent border-none focus:bg-neutral-300'
                        placeholder='Input your title here...'
                        validation={{
                          required: 'title is required',
                          minLength: {
                            value: 2,
                            message: 'title is too short',
                          },
                        }}
                      />
                      <Input
                        id='slug'
                        label=''
                        inputClassName='bg-transparent border-none focus:bg-neutral-300'
                        placeholder='Input your slug here...'
                        validation={{
                          required: 'slug is required',
                          minLength: { value: 3, message: 'slug is too short' },
                        }}
                      />
                    </div>
                    <div className='flex flex-row w-full items-center gap-3'>
                      <Input
                        id='body'
                        label=''
                        placeholder='Input your body here...'
                        inputClassName='bg-transparent border-none focus:bg-neutral-300'
                        validation={{
                          required: 'body is required',
                          minLength: { value: 8, message: 'body is too short' },
                        }}
                      />
                      <button
                        type='submit'
                        className='bg-neutral-300 rounded-md px-4 py-2'
                      >
                        Post
                      </button>
                    </div>
                    {errorMessage && (
                      <p className='text-xs text-red-500'>{errorMessage}</p>
                    )}
                  </form>
                </FormProvider>
              </div>
            </div>
            <hr />
            <div className='grid grid-cols-1 gap-4'>
              {data?.data?.map(({ ...v }) => <PostCard key={1} {...v} />)}
            </div>
          </div>
          {/* Right Pane */}
          <div className='flex flex-col sticky top-4 h-max w-full  col-span-3'>
            {searchParams?.message && (
              <p className='text-sm text-red-500 my-2'>
                {searchParams.message}
              </p>
            )}
            <div className='flex flex-col bg-neutral-100 p-4 rounded-md hover:bg-neutral-200'>
              <div className='flex flex-row items-center gap-2 my-4'>
                <div className='w-12 h-12 rounded-full bg-neutral-400 flex-none'></div>
                <div className='flex flex-col'>
                  <p className='font-semibold'>{email}</p>
                  <p>{role}</p>
                </div>
              </div>
              <div className='flex flex-row gap-3 text-neutral-100 font-semibold cursor-pointer'>
                <button
                  className='px-3 py-2 rounded-lg bg-red-500'
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
