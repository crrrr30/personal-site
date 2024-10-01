import Link from "next/link";
import LargeNavbar from "./components/large-navbar";
import SmallNavbar from "./components/small-navbar";
import BlurFade from "@/components/ui/blur-fade";

export default function NotFound() {
  return (
    <div className="flex flex-col h-dvh">
      <BlurFade delay={0.25} inView>
        <SmallNavbar />
        <LargeNavbar />
      </BlurFade>
      <div className="flex justify-center items-center grow bg-light">
        <BlurFade delay={0.25 * 2} inView>
          <div className="pl-8 border-l-1 border-black">
            <div className="section-title">404 Not Found</div>
            <Link href="/" className="pt-4 black-link">
              Back to Home
            </Link>
          </div>
        </BlurFade>
      </div>
      <div className="pad bg-dark py-12 text-sm">
        <BlurFade delay={0.25 * 3} inView>
          Copyright © Jonathan Cui 2024
        </BlurFade>
      </div>
    </div>
  );
}
