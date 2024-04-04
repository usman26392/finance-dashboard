import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: "Acme Dashboard",
//   description: "The official Next.js Course Dashboard, built with App Router.",
//   metadataBase: new URL("https://next-learn-dashboard.vercel.sh")
// }

// more enhance
export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard"
  },
  description: "The official Next.js Course Dashboard, built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh")
}





// This Root layout component will be shared across 'all pages / routes' in application.
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* it could be here: Header component */}
        {/* <header>header</header> */}
        {children}
        {/* it could be here: Footer component */}
        {/* <footer>footer</footer> */}
      </body>
    </html>
  );
}
