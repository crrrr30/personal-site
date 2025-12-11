import { type FC } from "react";

import { AboutSection } from "@/app/components/AboutSection";
import { BodyDiv } from "@/app/components/BodyDiv";
import { HeroSection } from "@/app/components/HeroSection";
import { MeetMeSection } from "@/app/components/MeetMeSection";
import { NotesSection } from "@/app/components/NotesSection";
import { ProjectsSection } from "@/app/components/ProjectsSection";
import { Divider } from "@/components/Divider";
import { NavBar } from "@/components/NavBar";
import { Spacer } from "@/components/Spacer";
import { cn } from "@/lib/utils";

export const HomeContent: FC<{ className?: string }> = ({ className }) => {
  return (
    <BodyDiv className={cn(className, "mx-auto max-w-container")}>
      <NavBar />

      <HeroSection />

      <Divider />

      <MeetMeSection />

      <Divider />

      <AboutSection />

      <ProjectsSection />

      <NotesSection />

      <Spacer h={48} />
    </BodyDiv>
  );
};
