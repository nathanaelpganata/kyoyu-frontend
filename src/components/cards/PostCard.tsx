import { PostType } from '@/types/d';
import React from 'react';

const PostCard = ({
  postId,
  title,
  slug,
  body,
  createdAt,
  authorEmail,
  authorId,
  updatedAt,
}: PostType) => {
  return (
    <div className='flex flex-col items-start max-w-4xl w-full gap-3 bg-neutral-200 p-8 rounded-md justify-between h-64 hover:bg-neutral-100 transition-all duration-200 ease-in-out cursor-default'>
      <div className='flex flex-col w-full gap-3'>
        <div className='flex flex-row items-center w-full gap-2'>
          <div className='w-14 h-14 rounded-full bg-neutral-400 flex-none'></div>
          <div className='flex flex-col w-full'>
            <div className='px-2 text-xl font-bold'>{title}</div>
            <div className='px-2 text-sm'>{slug}</div>
          </div>
        </div>
        <div className='flex flex-col w-full gap-2'>
          <div className='px-2 py-1.5 bg-neutral-300 rounded-md line-clamp-3'>
            {body}
          </div>
        </div>
      </div>
      <div className='flex flex-row items-center w-full justify-between'>
        <p className='text-sm font-light'>
          Created By: <span className='font-semibold'>{authorEmail}</span>
        </p>
        <p className='text-sm font-light'>{createdAt}</p>
      </div>
    </div>
  );
};

export default PostCard;
