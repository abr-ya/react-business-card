import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  Clock3,
  Contact,
  FlaskConical,
  PanelsTopLeft,
  Route,
  Terminal,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components";

const components = [
  {
    title: "Digital Business Card",
    description: "A compact profile card with avatar, contact details, bio, and social links.",
    href: "/business-card",
    icon: Contact,
  },
  {
    title: "Peak Hours Range Selector",
    description: "A controlled range selector with drag handles, weekly layout, gaps, and add strategies.",
    href: "/peak-hours",
    icon: Clock3,
  },
  {
    title: "Related Projects",
    description: "A curated gallery of external projects that use components from this lab.",
    href: "/related-projects",
    icon: PanelsTopLeft,
  },
];

const stackGroups = [
  {
    title: "Core",
    icon: Blocks,
    items: ["React 19", "TypeScript 5", "Vite 8"],
  },
  {
    title: "Interface",
    icon: BadgeCheck,
    items: ["Tailwind CSS 4", "Radix UI", "Lucide React"],
  },
  {
    title: "App Layer",
    icon: Route,
    items: ["React Router 7", "TanStack Query", "Recharts"],
  },
  {
    title: "Scripts",
    icon: Terminal,
    items: ["npm run dev", "npm run build", "npm run lint", "npm run fix"],
  },
];

export const HomePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 py-10">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-md border bg-background/70 px-3 py-1 text-sm text-muted-foreground">
            <FlaskConical className="size-4" />
            React Component Lab
          </div>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-balance md:text-5xl">
              A focused sandbox for testing larger React components.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Build, review, and exercise complex UI pieces in isolation before moving them into production applications
              or shared component libraries.
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {components.map((component) => {
            const Icon = component.icon;

            return (
              <Card className="rounded-md bg-card/80 py-5" key={component.title}>
                <CardHeader className="grid-cols-[auto_1fr_auto] items-center gap-4 px-5">
                  <div className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <CardTitle className="text-base">{component.title}</CardTitle>
                    <p className="text-sm leading-5 text-muted-foreground">{component.description}</p>
                  </div>
                  <Button asChild size="icon-sm" variant="ghost">
                    <Link aria-label={`Open ${component.title} demo`} to={component.href}>
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stackGroups.map((group) => {
          const Icon = group.icon;

          return (
            <Card className="rounded-md py-5" key={group.title}>
              <CardHeader className="gap-3 px-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                    <Icon className="size-4" />
                  </div>
                  <CardTitle className="text-base">{group.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-5">
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span className="rounded-md border bg-muted px-2.5 py-1 text-xs text-muted-foreground" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
};
