import Link from "next/link";
import NavbarLinks from "./navbar-links";

export default function LargeNavBar() {
  return (
    <div className="hidden md:flex flex-row h-32 justify-between items-center px-32">
      <Link href="/" className="orpheus text-3xl">
        Jonathan Cui
      </Link>
      <div className="flex gap-16">
        {NavbarLinks().map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
}
