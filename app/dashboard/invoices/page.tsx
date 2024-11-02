import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';


// export const metadata: Metadata = {
//   title: "Invoice | Acme Dashboard"
// }

// NOTE: more enhance
export const metadata: Metadata = {
  title: "Invoice"
}


type searchParamsProps = {
  searchParams?: {
    queryString?: string;
    page?: string;
  }
}


export default async function Page({searchParams}: searchParamsProps ) {

  // server-side, " {searchParams} props"
  // console.log("Next.js Page props:", searchParams);

  const queryCurrent = searchParams?.queryString || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPagesNumber = await fetchInvoicesPages(queryCurrent);
  // console.log("TotalPages", totalPagesNumber);


  return (
    
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search Placeholder="Search invoices..." />
        <CreateInvoice />
      </div>

      <Suspense key={queryCurrent + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={queryCurrent} currentPage={currentPage} />
      </Suspense>
      
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPagesNumber} />
      </div>
    </div>
  );
}
