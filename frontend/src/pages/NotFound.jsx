import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-8xl font-heading font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-8">Page not found.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;