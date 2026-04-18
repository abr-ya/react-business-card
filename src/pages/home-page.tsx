import { DigitalBusinessCard, type DigitalBusinessCardProps } from "@/components";

const demoCard: DigitalBusinessCardProps = {
  name: "Laura Smith",
  avatarUrl: "/avatars/laura-smith.jpg",
  role: "Frontend developer",
  company: "Studio North",
  about:
    "I am a frontend developer with a particular interest in making things simple and automating daily tasks. I try to keep up with security and best practices, and am always looking for new things to learn.",
  email: "alex@studionorth.example",
  phone: "+1 (555) 010-2030",
  websiteUrl: "https://studionorth.example",
  location: "Berlin · CET",
  socialLinks: [
    { id: "li", network: "linkedin", href: "https://linkedin.com/in/example" },
    { id: "gh", network: "github", href: "https://github.com/example" },
    { id: "web", network: "website", href: "https://studionorth.example", label: "Website" },
  ],
};

export const HomePage = () => {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-8 py-10">
      <DigitalBusinessCard {...demoCard} avatarInitials="AM" ringClassName="from-chart-1/30 to-chart-3/20" />
    </div>
  );
};
