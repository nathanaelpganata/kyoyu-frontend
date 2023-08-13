'use client';

import '@/app/globals.css';
import axios from '@/lib/axios';
import {
  QueryClient,
  QueryClientProvider,
  QueryOptions,
} from '@tanstack/react-query';

// QueryClient
const defaultQueryFn = async ({ queryKey }: QueryOptions) => {
  const res = await axios.get(`${queryKey?.[0]}`);
  return res.data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
