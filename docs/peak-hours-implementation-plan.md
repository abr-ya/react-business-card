# PeakHoursRangeSelector Implementation Plan

## Context

Implement a component for selecting peak load time ranges within a single day, plus a weekly wrapper based on the visual reference.

Main principle: the daily selector remains an independent component, while the weekly component only lays out multiple daily selectors as rows.

## Daily Component

Component: `PeakHoursRangeSelector`.

Purpose: select from `0` to `maxRanges` peak load ranges within a single day.

The component must be controlled:

- the current value is passed through `value`;
- changes are emitted through `onChange`;
- the component does not keep the final value internally as the source of truth.

### Types

```ts
type PeakRange = {
  start: number;
  end: number;
};

type PeakHoursValue = PeakRange[];

type AddRangeStrategy = "first-available" | "preferred-time" | "largest-gap";
```

In the current version, ranges are stored without `id`.

This was discussed separately: `id` is not added for now because the maximum number of ranges is small, and the ranges themselves are not separate business entities. This question can be revisited in a future version if scenarios appear that require animations, more complex drag state, server-side entities, or editing a specific range outside the scale.

### API

```ts
type PeakHoursRangeSelectorProps = {
  value: PeakHoursValue;
  onChange: (value: PeakHoursValue) => void;
  maxRanges?: number;
  step?: number;
  minDuration?: number;
  minGap?: number;
  defaultRangeDuration?: number;
  disabled?: boolean;
  addRangeStrategy?: AddRangeStrategy;
  preferredRange?: PeakRange;
  addOnDoubleClick?: boolean;
  className?: string;
};
```

Default values:

- `maxRanges = 3`;
- `step = 0.5`;
- `minDuration = 0.5`;
- `minGap = 0.5`;
- `defaultRangeDuration = 1`;
- `disabled = false`;
- `addRangeStrategy = "largest-gap"`;
- `preferredRange = { start: 8, end: 9 }`;
- `addOnDoubleClick = false`.

## Base Rules

- Time scale: `00:00-24:00`.
- Time format: 24-hour.
- Change step: `0.5` hours.
- A range cannot be shorter than `minDuration`.
- A range cannot go outside the day boundaries.
- A range crossing midnight, for example `22:00-02:00`, is not allowed.
- Manual time input is not needed.
- Touch/mobile support is not included yet.
- After each change, `onChange` receives an array sorted by `start`.

## Gap Rule Between Ranges

Ranges must not merely avoid overlap: neighboring ranges must always have at least a `minGap` gap between them.

By default:

```ts
minGap = 0.5;
```

Important details:

- `minGap` applies only between ranges;
- no gap is required from the day boundaries `00:00` and `24:00`;
- ranges `00:00-01:00` and `23:00-24:00` are valid;
- during drag, a range or handle stops at the neighboring range boundary with `minGap` taken into account;
- a range must not move flush against a neighboring range;
- a range must not jump over a neighboring range.

## Adding a Range

When a range is added, its default duration is:

```ts
defaultRangeDuration = 1;
```

If the available free space is shorter than `defaultRangeDuration`, a new range is not added, even if `minDuration` is smaller.

The add button must be disabled when:

- `disabled === true`;
- `value.length >= maxRanges`;
- there is no free space for `defaultRangeDuration` with `minGap` taken into account.

### Add Strategies

#### `first-available`

Finds the first free slot from `00:00` that can fit a range with duration `defaultRangeDuration`.

#### `preferred-time`

First tries to add `preferredRange`.

If `preferredRange` is unavailable, the component searches for the nearest available range with the same duration.

If no range with that duration fits anywhere, nothing is added.

#### `largest-gap`

Finds the largest free slot of the day and places the new range in the center of that slot.

If the center requires adjustment after rounding to `step`, the range must remain inside the free slot and keep `defaultRangeDuration`.

## Drag Behavior

The mouse coordinate is converted into a time value on the scale.

The resulting value is rounded to the nearest `step`, by default to `0.5` hours.

The component must support:

- changing the range start by dragging the left handle;
- changing the range end by dragging the right handle;
- dragging the entire range.

### Drag Constraints

- `start` cannot be less than `0`;
- `end` cannot be greater than `24`;
- `end - start >= minDuration`;
- neighboring ranges must remain at least `minGap` apart;
- when the nearest valid boundary is reached, the handle or range must stop there;
- a range must not jump over neighboring ranges.

`defaultRangeDuration` affects only new range creation. During editing, a range can be reduced down to `minDuration`.

## Double Click

The behavior is enabled with the prop:

```ts
addOnDoubleClick?: boolean;
```

It is disabled by default.

If `addOnDoubleClick = true`:

- double clicking an empty area tries to add a range with duration `defaultRangeDuration`;
- the range is centered around the click point;
- if the centered range does not fit, it is shifted to the nearest valid position inside the same free slot;
- if that free slot does not have enough space for `defaultRangeDuration`, nothing happens;
- double clicking an existing range deletes it immediately;
- no delete confirmation is required.

## Daily Component UI

The component must display:

- a horizontal time scale;
- labels `00:00`, `06:00`, `12:00`, `18:00`, `24:00`;
- visual hour ticks;
- ranges as colored segments;
- two drag handles on each segment;
- a time label inside or next to the segment, for example `08:00-10:30`;
- a range delete button inside the segment;
- an add range button.

The delete button is placed inside the segment. For short ranges, make sure the UI does not break.

The daily component does not show a separate list of selected ranges. If a list is needed, external code can build it from `value` in another component.

## Weekly Component

Component: `WeeklyPeakHoursRangeSelector`.

Purpose: display and edit ranges for multiple days, visually close to the provided 7-day reference.

The weekly component does not replace the daily component. It uses `PeakHoursRangeSelector` inside each row.

### Types

```ts
type DayPeakHours = {
  id: string;
  label: string;
  dateLabel?: string;
  ranges: PeakRange[];
};

type WeeklyPeakHoursValue = DayPeakHours[];
```

### API

```ts
type WeeklyPeakHoursRangeSelectorProps = {
  value: WeeklyPeakHoursValue;
  onChange: (value: WeeklyPeakHoursValue) => void;
  className?: string;
  maxRanges?: number;
  step?: number;
  minDuration?: number;
  minGap?: number;
  defaultRangeDuration?: number;
  disabled?: boolean;
  addRangeStrategy?: AddRangeStrategy;
  preferredRange?: PeakRange;
  addOnDoubleClick?: boolean;
};
```

The weekly component receives a ready-made array of days. It does not generate dates and does not handle calendar logic.

For the demo, prepare data similar to the reference:

```ts
const demoWeek: WeeklyPeakHoursValue = [
  {
    id: "mon",
    label: "Пн",
    dateLabel: "26.05",
    ranges: [
      { start: 10.5, end: 12 },
      { start: 16, end: 17.5 },
    ],
  },
  {
    id: "tue",
    label: "Вт",
    dateLabel: "27.05",
    ranges: [
      { start: 9, end: 11.5 },
      { start: 15.5, end: 17 },
    ],
  },
];
```

## Weekly Component UI

Visual style: as in the reference.

Main elements:

- dark panel;
- weekday and date labels on the left;
- shared top scale: `00:00`, `06:00`, `12:00`, `18:00`, `24:00`;
- each row represents one day;
- each row displays the ranges of the daily selector;
- ranges are pink/magenta;
- rows are muted on a dark background;
- drag handles are light;
- a small add range button in each row.

The weekly component must accept `className` so external code can override the outer container.

## Deferred Decisions

Not included in the first version:

- `id` inside `PeakRange`;
- a separate list of selected ranges;
- manual time input;
- touch/mobile support;
- separate props for colors and internal part classes.

Possible future props for visual customization:

```ts
rangeClassName?: string;
trackClassName?: string;
handleClassName?: string;
```

For now, visual customization is limited to `className` on the outer container.
