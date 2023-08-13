import { ImageResponse } from 'next/server';

export const size = {
  width: 20,
  height: 20,
};

export const contentType = 'image/png';

export default function icon() {
  return new ImageResponse(
    (
      <div className='bg-black p-1 rounded-full font-semibold flex justify-center items-center w-full h-full text-xl text-center'>
        SF
      </div>
    ),
    size,
  );
}
