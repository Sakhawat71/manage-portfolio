import Link from "next/link";
export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center p-8">
            <h1 className="text-5xl font-bold mb-4 text-red-500">404 - Page Not Found</h1>
            <p className="text-lg mb-6">
                Sorry, the page you`re looking for doesn`t exist.
            </p>
            <Link
                href="/"
                className="px-6 py-3 text-green-600 rounded-full transition"
            >
                Go Back Home
            </Link>
        </div>
    );
}