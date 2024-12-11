

'use client';
import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
}


export default function Error({error, reset}:ErrorProps) {
  
  
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong .!! (from error.tsx file) </h2>
      <h3>{error?.message}</h3>
      <h4>{error?.name}</h4>
      <h5>{error?.digest}</h5>
      <button
        className="mt-4 
        rounded-md 
        bg-blue-500 
        px-4 py-2 
        text-sm 
        text-white 
        transition-colors 
        hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}
