import React from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import LoadingPost from '@/components/LoadingPost';

type AllowedRoles = Array<string>;

export default function withAuth<T>(
  WrappedComponent: React.ComponentType<T>,
  allowedRoles: AllowedRoles,
) {
  const AuthenticatedComponent = (props: T) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const router = useRouter();

    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get('/user');
          const userData = res.data.data;

          const hasRequiredRoles = allowedRoles.includes(userData.role);

          if (!hasRequiredRoles) {
            if (userData.role === 'member')
              router.replace(
                '/my?message=You are not authorized to view this page',
              );
            if (userData.role === 'admin')
              router.replace(
                '/admin?message=You are not authorized to view this page',
              );
          } else {
            setIsLoading(false); // Set isLoading to false if authorized
          }
        } catch (error) {
          console.error(error);
          router.replace(
            '/?message=You are not authenticated to view this page',
          );
        }
      };

      fetchData(); // Call the fetchData function to initiate the process
    }, [router]);

    return isLoading ? (
      <LoadingPost />
    ) : (
      <WrappedComponent {...props} allowedRoles={allowedRoles} />
    );
  };

  return AuthenticatedComponent;
}
