import { Skeleton } from '~/components/ui/skeleton';

export function TableSkeleton() {
  return (
    <div className='flex h-full w-full flex-col'>
      {/* Header section */}
      <div className='bg-background/80 sticky top-0 z-100 flex items-center justify-between py-2 backdrop-blur-sm'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-8 w-[12rem]' />
        </div>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-8 w-[16rem]' />
          <Skeleton className='h-8 w-8' />
          <Skeleton className='h-8 w-8' />
          <Skeleton className='h-8 w-8' />
          <Skeleton className='h-8 w-8' />
        </div>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-8 w-[16rem]' />
          <Skeleton className='h-8 w-[8rem]' />
        </div>
      </div>

      <div className='flex-1 rounded-md border'>
        <div className='relative h-full'>
          <div className='border-b'>
            <div className='mx-2 flex h-10 items-center justify-end'>
              <Skeleton className='ml-2 h-4 w-[4rem]' />
              <Skeleton className='ml-2 h-4 w-[8rem]' />
              <Skeleton className='ml-2 h-4 w-[6rem]' />
            </div>
          </div>

          <div className='flex h-[calc(100%-2.5rem)] flex-col'>
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className='mx-2 flex h-10 items-center justify-between border-b'
              >
                <Skeleton className='ml-2 h-4 w-[3rem]' />
                <Skeleton className='ml-2 h-4 w-[12rem]' />
                <Skeleton className='ml-2 h-4 w-[8rem]' />
                <Skeleton className='ml-2 h-4 w-[10rem]' />
                <Skeleton className='ml-2 h-4 w-[7rem]' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
