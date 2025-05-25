import { checkRole } from 'utils/roles'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  // Protect the page from users who are not admins
  
  const isAdmin = await checkRole('admin')
  if (!isAdmin) {
    redirect('/')
  }
  
return <p className="text-center text-2xl font-bold justify-center items-center">you are a sussy baka</p>;
}

