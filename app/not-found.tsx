'use client'

import Link from "next/link";

export default function NotFound() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link
        href={'/'}
        className="px-4 py-2 bg-primary text-white rounded animate-pulse"
      >
        Go to Home
      </Link>
    </div>
  )
}