import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">Page Not Found</p>
        <p className="mb-8">
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link
          href="/"
          className="inline-block border border-current py-2 px-4 rounded hover:bg-gray-100 transition-colors"
        >
          Go back to Homepage
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
