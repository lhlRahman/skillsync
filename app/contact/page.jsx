import { HoverEffect } from "../../components/ui/ContactCard";

export default function Contact() {
  return (
    <div
      style={{ paddingTop: "6rem" }}
      className="w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center"
    >
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
      "As the Scrum Master, I ensured project efficiency and timely delivery. I also spearheaded the integration of Cohere AI, as well as contributing to the Database Fetching and APIs.",
    link: "https://github.com/vincentostrowski",
  },
  {
    title: "Arshia Zakeri",
    description:
      "I took charge of seamlessly integrating front-end and backend systems, incorporating Semantic search functionality, implementing robust authentication mechanisms, and optimizing overall system performance.",
    link: "https://github.com/ArshiaZr",
  },
  {
    title: "Raj Zatsarenko",
    description:
      "I focused on database fetching and developing the backend API, ensuring seamless data integration and robust server-side functionality.",
    link: "https://github.com/penszzip",
  },
];
