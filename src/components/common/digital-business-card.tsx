import * as React from "react";
import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const socialIconMap = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  instagram: Instagram,
  youtube: Youtube,
  website: Globe,
} as const;

export type DigitalBusinessCardSocialNetwork = keyof typeof socialIconMap;

export type DigitalBusinessCardSocialLink = {
  /** Stable key for list rendering */
  id: string;
  href: string;
  network: DigitalBusinessCardSocialNetwork;
  /** Accessible name; defaults to `network` when omitted */
  label?: string;
};

export type DigitalBusinessCardProps = {
  className?: string;
  /** Full name */
  name: string;
  /** Job title / role */
  role?: string;
  /** Company or short tagline */
  company?: string;
  /** Photo URL; initials are shown when missing or on load error */
  avatarUrl?: string;
  /** Explicit initials when there is no photo (otherwise derived from `name`) */
  avatarInitials?: string;
  email?: string;
  phone?: string;
  /** Shown as a link with a globe icon */
  websiteUrl?: string;
  /** City / timezone label */
  location?: string;
  /** Long “about me” copy (e.g. About section from the design) */
  about?: string;
  /** Heading above `about`; defaults to “About” */
  aboutHeading?: string;
  socialLinks?: DigitalBusinessCardSocialLink[];
  /** Extra classes for the outer gradient / ring wrapper */
  ringClassName?: string;
  /** Slot for QR code, “save contact” actions, etc. */
  children?: React.ReactNode;
};

function initialsFromName(name: string, explicit?: string) {
  if (explicit?.trim()) return explicit.trim().slice(0, 3).toUpperCase();
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

function DigitalBusinessCard({
  className,
  name,
  role,
  company,
  avatarUrl,
  avatarInitials,
  email,
  phone,
  websiteUrl,
  location,
  about,
  aboutHeading = "About",
  socialLinks,
  ringClassName,
  children,
}: DigitalBusinessCardProps) {
  const [avatarFailed, setAvatarFailed] = React.useState(false);
  const showImage = Boolean(avatarUrl) && !avatarFailed;
  const initials = initialsFromName(name, avatarInitials);

  return (
    <article
      className={cn(
        "rounded-2xl bg-gradient-to-br from-primary/15 via-transparent to-chart-2/10 p-[1px] shadow-lg",
        ringClassName,
      )}
    >
      <Card
        className={cn(
          "overflow-hidden rounded-[calc(var(--radius-lg)-1px)] border-0 bg-card/95 py-0 shadow-none backdrop-blur-sm",
          className,
        )}
      >
        <CardContent className="space-y-6 p-6 pt-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div
              className={cn(
                "flex size-24 shrink-0 items-center justify-center rounded-2xl border border-border/80 bg-muted text-2xl font-semibold text-muted-foreground",
                showImage && "border-0 p-0",
              )}
            >
              {showImage ? (
                <img
                  src={avatarUrl}
                  alt={name}
                  className="size-full rounded-2xl object-cover"
                  onError={() => setAvatarFailed(true)}
                />
              ) : (
                <span aria-hidden>{initials}</span>
              )}
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <h1 className="text-balance text-2xl font-semibold tracking-tight text-card-foreground">{name}</h1>
              {role ? <p className="mt-1 text-sm font-medium text-primary">{role}</p> : null}
              {company ? <p className="mt-1 text-pretty text-sm text-muted-foreground">{company}</p> : null}
            </div>
          </div>

          {about ? (
            <section className="text-center sm:text-left" aria-labelledby="digital-card-about-heading">
              <h2 id="digital-card-about-heading" className="text-sm font-semibold tracking-wide text-foreground">
                {aboutHeading}
              </h2>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{about}</p>
            </section>
          ) : null}

          <ul className="space-y-2 text-sm">
            {email ? (
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <Mail className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                <a className="truncate text-primary underline-offset-4 hover:underline" href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
            ) : null}
            {phone ? (
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <Phone className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                <a
                  className="truncate text-primary underline-offset-4 hover:underline"
                  href={`tel:${phone.replace(/\s/g, "")}`}
                >
                  {phone}
                </a>
              </li>
            ) : null}
            {websiteUrl ? (
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <Globe className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                <a
                  className="truncate text-primary underline-offset-4 hover:underline"
                  href={websiteUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {websiteUrl.replace(/^https?:\/\//, "")}
                </a>
              </li>
            ) : null}
            {location ? (
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <MapPin className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                <span className="text-muted-foreground">{location}</span>
              </li>
            ) : null}
          </ul>
        </CardContent>

        {socialLinks?.length ? (
          <CardFooter className="flex flex-wrap justify-center gap-2 border-t border-border/60 bg-muted/30 px-6 py-4 sm:justify-start">
            {socialLinks.map((link) => {
              const Icon: LucideIcon = socialIconMap[link.network];
              const label = link.label ?? link.network;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-lg border border-border/80 bg-background",
                    "text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary",
                  )}
                  aria-label={label}
                  title={label}
                >
                  <Icon className="size-4" aria-hidden />
                </a>
              );
            })}
          </CardFooter>
        ) : null}

        {children ? (
          <CardFooter className="flex flex-col gap-3 border-t border-border/60 px-6 py-4">{children}</CardFooter>
        ) : null}
      </Card>
    </article>
  );
}

export { DigitalBusinessCard };
