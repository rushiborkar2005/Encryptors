import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const error = useRouteError();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="mt-2 text-gray-600">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>
        {error && <p>{error.data}</p>}

        <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-md group"
            >
            <span className="transform transition-transform duration-200 group-hover:-translate-x-1">
                <i className="fa fa-angle-left" aria-hidden="true"></i>
            </span>
            <span className="font-medium">Go Back Home</span>
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage
