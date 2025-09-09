import Link from "next/link";

export const metadata = {
  title: "Page Not found",
  description: "Page Not found",
};

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12">
      <h1 className="text-7xl">Not found</h1>
      <p className="text-9xl">404</p>
      <Link href="/" className="underline">
        Go to home page
      </Link>
    </div>
  );
}
