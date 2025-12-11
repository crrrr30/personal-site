import Image from "next/image";

import mainShot from "@/assets/main-shot.png";
import reading from "@/assets/reading.png";

export const MeetMeSection = () => {
  return (
    <section className="flex flex-row">
      <div className="w-[50%]">
        <Image alt={""} src={mainShot} />
      </div>

      <div className="w-[50%] p-16 flex flex-col justify-between">
        <div className="flex justify-center ml-auto size-6">
          <p>02</p>
        </div>

        <div className="relative">
          <span className="flex flex-col">
            {["MEET", "JONATHAN", "CUI"].map((word, i) => (
              <p key={i} className="text-brand text-7xl font-medium">
                {word}
              </p>
            ))}
          </span>

          <div className="absolute bottom-0 right-0 w-12 h-12">
            <Image
              alt=""
              className="h-full w-full object-cover"
              src={reading}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
