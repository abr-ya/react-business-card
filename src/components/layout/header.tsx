import { Clock3, Contact, FlaskConical, Home, PanelsTopLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Overview",
    href: "/",
    icon: Home,
    end: true,
  },
  {
    label: "Business Card",
    href: "/business-card",
    icon: Contact,
  },
  {
    label: "Peak Hours",
    href: "/peak-hours",
    icon: Clock3,
  },
  {
    label: "Related Projects",
    href: "/related-projects",
    icon: PanelsTopLeft,
  },
];

export const Header = () => {
  return (
    <header className="border-b bg-background/75 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex min-h-16 flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <NavLink
          className="group inline-flex w-fit items-center gap-3 rounded-md outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          to="/"
        >
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5">
            <FlaskConical className="size-4" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold">React Component Lab</span>
            <span className="mt-1 text-xs text-muted-foreground">Large UI experiments</span>
          </span>
        </NavLink>

        <nav aria-label="Main navigation" className="flex flex-wrap gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "group relative inline-flex h-9 items-center gap-2 overflow-hidden rounded-md px-3 text-sm font-medium text-muted-foreground outline-none transition-colors duration-200 hover:text-foreground focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "before:absolute before:inset-x-2 before:bottom-0 before:h-px before:origin-left before:scale-x-0 before:bg-primary before:transition-transform before:duration-200 hover:before:scale-x-100",
                    isActive && "bg-secondary text-secondary-foreground shadow-sm before:scale-x-100",
                  )
                }
                end={item.end}
                key={item.href}
                to={item.href}
              >
                <Icon className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
