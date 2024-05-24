import Link from "next/link";
import LargeNavbar from "./components/large-navbar";
import SmallNavbar from "./components/small-navbar";

export default function NotFound() {
  return (
    <div className="flex flex-col h-dvh">
      <SmallNavbar />
      <LargeNavbar />
      <div className="flex justify-center items-center grow bg-light">
        <div className="pl-8 border-l-1 border-black">
          <div className="section-title">404 Not Found</div>
          <Link href="/" className="pt-4 black-link">
            Back to Home
          </Link>
        </div>
      </div>
      <div className="pad bg-dark py-12 text-sm">
        Copyright © Jonathan Cui 2024
      </div>
    </div>
  );
}
