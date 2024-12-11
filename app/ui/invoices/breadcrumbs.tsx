import { clsx } from 'clsx';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}



export default function Breadcrumbs({breadcrumbs}: {breadcrumbs: Breadcrumb[]}) {

  // breadcrumb items
  const breadcrumbItems = breadcrumbs.map((breadcrumb, index) => (
    <li
      key={breadcrumb.href}
      aria-current={breadcrumb.active}
      className={breadcrumb.active ? 'text-gray-900 pointer-events-none' : 'text-gray-500'}
    >
      <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
      {
        index < breadcrumbs.length - 1 
        ? (
          <span className="mx-3 inline-block">/</span>
        ) 
        : null
      }
    </li>
  ));

  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx(lusitana.className, 'flex text-xl md:text-2xl')}>
        {breadcrumbItems}
      </ol>
    </nav>
  );
}
