import Link from "next/link";



// Root not-found component for all app's segments/routes.
export default function Notfound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
			<h2 className="md:text-3xl mb-2 text-2xl font-bold">Not Found</h2>
			<p className="text-base text-gray-500 mb-4 md:text-lg">
				Could not find requested resource
			</p>
			<Link
				href="/"
				className="bg-blue-600 hover:bg-blue-700 inline-block rounded px-6 py-2 text-white transition-colors">
				Return Home
			</Link>
		</div>
  )
}
