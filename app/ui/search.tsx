'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'; // a library

type SearchProps = {
  Placeholder: string
}

export default function Search({ Placeholder }:SearchProps) {
  // client side useSearchParams() hook
  const searchParams = useSearchParams();

  // console.log("searchParams", searchParams); // no exist query string right now
  //NOTE:  You can use Next.js's useRouter and usePathname hooks to update the URL too.
  const pathname = usePathname();
  // console.log("url:", pathname);
  const { replace } = useRouter();

  // before event handler
  // const handleSearch = (userInput: any )=> {
  //   console.log("you entered!", userInput)
  // }

  // before event handler
  // const handleSearch = (userInput: any ) => {
  //   console.log("you entered!", userInput)
  //   const params = new URLSearchParams(searchParams.toString());
  //   if(userInput) {
  //     params.set("queryString", userInput)
  //   }
  //   else {
  //     params.delete("queryString")
  //   }
  //   replace(`${pathname}?${params}`);
  // }

  // after event handler: with debounce
  // By debouncing, you can reduce the number of requests sent to your database, thus saving resources.
  const handleSearch = useDebouncedCallback((userInput) => {
    // console.log('you entered!', userInput);
    const params = new URLSearchParams(searchParams.toString());
    // console.log('params', params);
    // when the user types a new search query, you want to reset the page number to 1.
    params.set("page", "1");
    if (userInput) {
      params.set('queryString', userInput);
    } else {
      params.delete('queryString');
    }
    replace(`${pathname}?${params}`);
  }, 400);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={Placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('queryString')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
