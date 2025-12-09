"use client";

import { type MouseEvent, useCallback } from "react";

import { useScrollToSection } from "@/app/hooks/useScrollToSection";
import { BlurFade } from "@/components/BlurFade";
import Link from "@/components/Link";

const links: { text: string; sectionId: string }[] = [
  { text: "PROJECTS", sectionId: "projects" },
  { text: "NOTES", sectionId: "notes" },
];

export function NavBar() {
  const scrollToSection = useScrollToSection();

  const handleNavigate = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      const handled = scrollToSection(sectionId);

      if (handled) {
        event.preventDefault();
      }
    },
    [scrollToSection],
  );

  return (
    <nav className="flex flex-row justify-between px-16 py-8">
      <BlurFade>
        <p>BEHIND THE SCENES</p>
      </BlurFade>

      <span className="flex flex-row gap-32">
        {links.map(({ text, sectionId }, index) => (
          <BlurFade key={index} delay={0.1 * (index + 1)}>
            <Link
              href={`#${sectionId}`}
              variant="inverted"
              onClick={(event) => handleNavigate(event, sectionId)}
            >
              {text}
            </Link>
          </BlurFade>
        ))}
      </span>
    </nav>
  );
}
