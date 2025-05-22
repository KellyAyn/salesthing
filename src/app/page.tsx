'use client';
import Link from "next/link";
import { Button } from "~/components/ui/button";
//import { handleExcelUpload } from "~/server/utils/handleExcelUpload";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Button className="bg-red-500">
          Upload Excel NOT IMPLEMENTED!!
        </Button>
      </div>
    </main>
  );
}
