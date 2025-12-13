import { memo, type FC } from "react";

import { AboutSection } from "@/app/components/AboutSection";
import { BodyDiv } from "@/app/components/BodyDiv";
import { FooterSection } from "@/app/components/FooterSection";
import { HeroSection } from "@/app/components/HeroSection";
import { MeetMeSection } from "@/app/components/MeetMeSection";
import { NotesSection } from "@/app/components/NotesSection";
import { ProjectsSection } from "@/app/components/ProjectsSection";
import { NavBar } from "@/components/NavBar";

const HomeContentComponent: FC<{ className?: string }> = ({ className }) => {
  return (
    <BodyDiv className={className}>
      <NavBar />

      <HeroSection />

      <MeetMeSection />

      <AboutSection />

      <ProjectsSection />

      <NotesSection />

      <FooterSection />
    </BodyDiv>
  );
};

export const HomeContent = memo(HomeContentComponent);

HomeContent.displayName = "HomeContent";
