import { ExternalLink, ImageIcon, Layers3, Sparkles } from "lucide-react";

import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components";
import { relatedProjects, type RelatedProject } from "@/data/related-projects";

const ProjectPreview = ({ project }: { project: RelatedProject }) => {
  if (project.previewImage) {
    return (
      <img
        alt={`${project.title} preview`}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        src={project.previewImage}
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col justify-between bg-linear-to-br from-primary/15 via-muted to-background p-5">
      <ImageIcon className="size-6 text-muted-foreground" />
      <div>
        <p className="text-xs font-medium uppercase text-muted-foreground">Preview</p>
        <p className="mt-1 text-lg font-semibold">{project.title}</p>
      </div>
    </div>
  );
};

export const RelatedProjectsPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 py-10">
      <section className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-md border bg-background/70 px-3 py-1 text-sm text-muted-foreground">
          <Sparkles className="size-4" />
          Related Projects
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-normal text-balance md:text-5xl">
            Real places where these components are used.
          </h1>
          <p className="text-base leading-7 text-muted-foreground md:text-lg">
            A curated list of external websites and products that use components from this lab, with short notes,
            local previews, component tags, and stack labels.
          </p>
        </div>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {relatedProjects.map((project) => (
            <Card className="group overflow-hidden rounded-md py-0" key={project.id}>
              <div className="aspect-[16/9] overflow-hidden border-b bg-muted">
                <ProjectPreview project={project} />
              </div>

              <CardHeader className="gap-3 px-5 pt-5">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <p className="text-sm leading-6 text-muted-foreground">{project.description}</p>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-5 px-5 pb-5">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {project.components.map((component) => (
                      <span
                        className="inline-flex items-center gap-1 rounded-md border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                        key={component}
                      >
                        <Layers3 className="size-3" />
                        {component}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span className="rounded-md border bg-muted px-2.5 py-1 text-xs text-muted-foreground" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <Button asChild className="mt-auto w-fit" size="sm" variant="outline">
                  <a href={project.url} rel="noreferrer" target="_blank">
                    Visit site
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      ) : (
        <Card className="rounded-md">
          <CardContent className="flex min-h-64 flex-col items-center justify-center gap-3 text-center">
            <ImageIcon className="size-8 text-muted-foreground" />
            <div>
              <p className="font-medium">No related projects yet</p>
              <p className="mt-1 text-sm text-muted-foreground">Add projects to `src/data/related-projects.ts`.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
