import { checkRole } from 'utils/roles';
import { redirect } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { downloadDb } from '../actions/downloadDb';
import { pushToDB } from '../actions/pushtoDB';
export default async function AdminDashboard() {
  const isAdmin = await checkRole('admin');
  if (!isAdmin) {
    redirect('/');
  }

  return (
    <p className='items-center justify-center py-14 text-center text-2xl font-bold'>
      <Button onClick={downloadDb} variant='ghost'>
        Download DB
      </Button>
      <Button onClick={pushToDB} variant='ghost'>
        Push DB
      </Button>
    </p>
  );
}
