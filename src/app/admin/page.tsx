'use client';

import axios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuthStore from '../../store/authStore';
import { useRouter } from 'next/navigation';
import { UserType } from '@/types/d';
import withAuth from '@/lib/withAuth';

interface AdminPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

type UserDataType = {
  data: UserType;
};

export default withAuth(AdminPage, ['admin']);
function AdminPage({ searchParams }: AdminPageProps) {
  // useAuthStore
  const isAuth = useAuthStore.useIsAuth();
  const userId = useAuthStore.useUserId();
  const email = useAuthStore.useEmail();
  const role = useAuthStore.useRole();
  const setIsAuth = useAuthStore.useSetIsAuth();
  const setUserId = useAuthStore.useSetUserId();
  const setEmail = useAuthStore.useSetEmail();
  const setRole = useAuthStore.useSetRole();

  // useRouter
  const router = useRouter();

  // useQuery
  const { data, isLoading } = useQuery<UserDataType>(['/admin/users']);
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
        <div className='m-8'>
          {/* {searchParams?.message && (
            <p className='text-sm text-red-500'>{searchParams.message}</p>
          )} */}
          <div className='flex flex-row gap-3 text-neutral-100 font-semibold cursor-pointer'>
            <button
              className='px-3 py-2 rounded-lg bg-red-500'
              onClick={() => logout()}
            >
              Logout
            </button>
            {/* <Link
              className='px-3 py-2 rounded-lg bg-amber-500'
              href='/my/posts'
            >
              Create a Post
            </Link> */}
          </div>
          <ul className='list-disc'>
            <li>Authenticated: {isAuth ? 'TRUE' : 'FALSE'}</li>
            <li>UserID: {userId}</li>
            <li>Email: {email}</li>
            <li>Role: {role}</li>
          </ul>
          <pre>{JSON.stringify(data?.data, null, 4)}</pre>
        </div>
      )}
    </div>
  );
}
