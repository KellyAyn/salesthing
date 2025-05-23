import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Link href="/dashboard">dashboard</Link>
      <UserButton showName={true} />
    </main>
  )
}
