import Footer from "@/components/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full p-4 flex flex-col gap-4 h-[calc(100vh-57px)] items-center justify-between text-center">
      <div className="flex flex-col gap-4 items-center my-auto">
        <h1 className="text-5xl sm:text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl">Organization Not Found</h2>
        <h3>Make sure you have the correct organization name in the URL</h3>
        <Link className="text-primary" href="/">
          Return Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}
