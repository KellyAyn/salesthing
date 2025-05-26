import Link from 'next/link';
import { Button } from '~/components/ui/button';

export default async function Page() {
  return (
    <div className='bg-background flex h-[calc(100vh-4rem)] items-center justify-center rounded-t-3xl'>
      <div className='container mx-auto px-4'>
        <div className='mb-12 text-center'>
          <h1 className='text-foreground mb-4 text-5xl font-bold'>
            SalesThing
          </h1>
        </div>

        <div className='mx-auto max-w-2xl space-y-4'>
          <Button
            asChild
            variant='secondary'
            size='lg'
            className='h-16 w-full text-xl font-semibold transition-all duration-300 hover:scale-105'
          >
            <Link href='/prospecting' prefetch={true}>
              Start Prospecting
            </Link>
          </Button>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <Button
              variant='outline'
              className='h-12 text-base font-medium'
              disabled
            >
              Analytics
            </Button>

            <Button
              variant='outline'
              className='h-12 text-base font-medium'
              disabled
            >
              Settings
            </Button>
          </div>
        </div>
      </div>
      <div className='absolute right-0 bottom-8 left-0 text-center'>
        <p className='text-muted-foreground text-sm'>
          Press crtl + e to show sidebar with navigation
        </p>
      </div>
    </div>
  );
}
