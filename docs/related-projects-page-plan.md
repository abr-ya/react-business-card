# Related Projects Page Plan

## Goal

Add a `Related Projects` page that lists external websites and products where components from this React Component Lab are used.

The first version should stay simple and manually curated: no automatic screenshots, metadata fetching, CMS, or remote data source.

## Data Model

Create a typed data file:

```txt
src/data/related-projects.ts
```

Use the following type:

```ts
export type RelatedProject = {
  id: string;
  title: string;
  url: string;
  description: string;
  previewImage?: string;
  components: string[];
  stack: string[];
};
```

Fields:

- `id`: stable local identifier.
- `title`: project or website name.
- `url`: external project URL.
- `description`: short explanation of the project and how components are used.
- `previewImage`: optional local preview image path.
- `components`: names of components used in the project.
- `stack`: technology labels used by the project, displayed as chips.

## Preview Images

Preview images are added manually.

Store them in:

```txt
public/project-previews/
```

Use public paths in data:

```ts
previewImage: "/project-previews/project-name.jpg";
```

If a project has no preview image, the card should show a polished placeholder with the project title.

## Page

Create:

```txt
src/pages/related-projects-page.tsx
```

The page should include:

- a short intro section explaining that these are real projects using components from the lab;
- a responsive grid of project cards;
- one column on mobile;
- two or three columns on wider screens.

## Project Card

Each card should display:

- preview image or title-based fallback placeholder;
- project title;
- short description;
- component badges;
- stack chips, for example `React`, `TypeScript`, `Tailwind CSS`;
- external link button.

External links must open in a new tab:

```tsx
target="_blank"
rel="noreferrer"
```

## Routing

Add route:

```txt
/related-projects
```

## Header Navigation

Add a navigation item:

```txt
Related Projects
```

It should match the existing header navigation style with an icon, hover effect, and active state.

## First Version Scope

Included:

- local typed data;
- manually managed preview images;
- responsive card grid;
- fallback state for missing previews;
- component badges and stack chips;
- external links in new tabs;
- header navigation item.

Not included:

- automatic screenshot generation;
- website metadata fetching;
- filters by component;
- filters by stack;
- sorting controls;
- CMS or remote data source;
- project statuses.

## Future Improvements

Possible future additions:

- filters by component;
- filters by stack;
- sorting;
- project statuses such as `live`, `prototype`, or `archived`;
- automatic screenshot workflow;
- extra fields such as `repositoryUrl`, `caseStudyUrl`, or `year`;
- richer empty state if the project list is empty.
