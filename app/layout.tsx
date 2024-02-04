
import "@/app/ui/global.css"
import {inter} from "@/app/ui/fonts";


// This Root layout component will be shared across 'all pages' in application.
export default function RootLayout({children}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* it could be here: Header component */}
        {
          children
        }
        {/* it could be here: Footer component */}
        </body>
    </html>
  );
}
