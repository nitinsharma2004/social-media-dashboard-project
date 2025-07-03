import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 text-center">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="mt-6 text-3xl font-bold">Page Not Found</h2>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8">
        <Link
          to="/"
          className="btn btn-primary px-6 py-3"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;