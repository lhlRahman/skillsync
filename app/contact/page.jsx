import { HoverEffect } from "../../components/ui/ContactCard";

export default function Contact() {
  return (
    <div className="h-[100vh] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className=" flex flex-col">
      <p className="flex flex-col text-4xl sm:text-7xl text-center font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Contact Us
      </p>
      <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
    </div>
      </div>
  );
}

export const projects = [
    {
      title: "Habib Rahman",
      description:
        "During the hackathon, I was responsible for designing and implementing the database architecture, as well as contributing to both the frontend and backend development.",
      link: "https://habibrahman.xyz",
    },
    {
      title: "Vincent Ostrowski",
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      link: "https://github.com/vincentostrowski",
    },
    {
      title: "Arshia Zakeri",
      description:
        "A multinational technology company that specializes in Internet-related services and products.",
      link: "https://github.com/ArshiaZr",
    },
    {
      title: "Raj Zatsarenko",
      description:
        "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      link: "https://github.com/penszzip",
    },
  ];