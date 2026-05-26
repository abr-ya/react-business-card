export type RelatedProject = {
  id: string;
  title: string;
  url: string;
  description: string;
  previewImage?: string;
  components: string[];
  stack: string[];
};

export const relatedProjects: RelatedProject[] = [
  {
    id: "trekking-food-v2",
    title: "Trekking Food v2",
    url: "https://trekking-food-v2.netlify.app/about",
    previewImage: "/project-previews/trek_food_v2.png",
    description:
      "A hiking meal-planning app for managing products, recipes, categories, per-trip food plans, shopping lists, and pack distribution.",
    components: ["App Shell", "Admin Forms", "Data Tables"],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Better Auth",
      "TanStack Query",
      "React Hook Form",
      "Zod",
    ],
  },
  {
    id: "abr-booking",
    title: "ABR Booking",
    url: "https://abr-booking.netlify.app/",
    previewImage: "/project-previews/booking_mini.jpg",
    description:
      "A booking-style travel app with destination search, date and guest controls, hotel listings, room reservation flow, authentication, and an admin area for managing hotels.",
    components: ["Booking Search", "Hotel Cards", "Reservation Flow", "Admin Forms"],
    stack: ["React", "TypeScript", "Vite", "Redux Toolkit", "Axios", "React Hook Form", "Yup"],
  },
  {
    id: "just-forecast",
    title: "Just Forecast",
    url: "https://just-forecast.netlify.app/",
    previewImage: "/project-previews/forecast.png",
    description:
      "A weather forecast app with city search, current conditions, forecast data, favorite locations, and temperature charts powered by OpenWeather.",
    components: ["City Search", "Weather Cards", "Forecast Charts", "Favorites"],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "TanStack Query", "Recharts", "OpenWeather API"],
  },
  {
    id: "abr-blog",
    title: "ABR Travel Blog",
    url: "https://abr-blog.vercel.app/",
    previewImage: "/project-previews/travel2023_mini.jpg",
    description:
      "A travel blog app with a post list, image-rich article pages, categories, author metadata, and statically generated content.",
    components: ["Blog Header", "Posts List", "Post Cards", "Article Pages"],
    stack: ["Next.js", "React", "TypeScript", "Sanity CMS", "SSG", "Vercel"],
  },
  {
    id: "abr-bnb24",
    title: "Trip25 BNB",
    url: "https://abr-bnb24.vercel.app/",
    previewImage: "/project-previews/bnb24.jpg",
    description:
      "A BNB-style trips app with category browsing, search controls for destination and guests, authentication, listing cards, photos, and maps.",
    components: ["Search Dialog", "Category Navigation", "Listing Cards", "Auth Menu"],
    stack: ["Next.js 15", "React", "TypeScript", "Prisma", "Tailwind CSS", "shadcn/ui", "Vercel"],
  },
  {
    id: "abr-map",
    title: "Map Pins",
    url: "https://abr-map.duckdns.org/",
    description:
      "A map-based pin manager for browsing and creating location points, with clustered markers, folders, favorites, and authenticated user-specific pins.",
    components: ["Interactive Map", "Marker Clusters", "Pin Cards", "Favorites"],
    stack: ["React", "TypeScript", "Vite", "Leaflet", "React Leaflet", "Clerk", "TanStack Query"],
  },
  {
    id: "studio-north",
    title: "Studio North",
    url: "https://studionorth.example",
    description:
      "A portfolio-style website that uses the digital business card component as a compact personal profile block.",
    components: ["Digital Business Card"],
    stack: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "ops-scheduler",
    title: "Ops Scheduler",
    url: "https://ops-scheduler.example",
    description:
      "An operations dashboard prototype that uses the weekly peak hours selector for configuring daily load windows.",
    components: ["Peak Hours Range Selector", "Weekly Peak Hours Range Selector"],
    stack: ["React", "TypeScript", "Radix UI", "Tailwind CSS"],
  },
];
