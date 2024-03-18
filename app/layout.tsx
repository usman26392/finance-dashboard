import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';


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
