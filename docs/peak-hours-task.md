# Technical Specification

**Component:** `PeakHoursRangeSelector`

Purpose: select from **0 to 3 non-overlapping peak load ranges** within a single day.

## Key Rules

- Time scale: **00:00-24:00**.
- Time format: **24-hour**.
- Change step: **30 minutes**.
- Ranges must not overlap.
- A range must not be shorter than **0.5 hours**.
- A range must not go outside the day boundaries.
- Manual input is not required.
- Mobile devices and touch events are not supported yet.
- A range crossing midnight, for example `22:00-02:00`, is not allowed.

## Functionality

- Add a range.
- Delete a range.
- Change the range start by dragging the left handle.
- Change the range end by dragging the right handle.
- Preferably support dragging the entire range.
- When 3 ranges are reached, the add button becomes disabled.

## Data Format

```ts
type PeakRange = {
  id: string;
  start: number; // for example 8, 8.5, 9
  end: number; // for example 10, 10.5
};

type PeakHoursValue = PeakRange[];
```

Example:

```ts
[
  { id: "morning", start: 8, end: 10.5 },
  { id: "evening", start: 17.5, end: 20 },
];
```

## Drag Behavior

- The mouse coordinate is converted into a time value on the scale.
- The value is rounded to the nearest **0.5 hours**.
- `start` cannot be less than `0`.
- `end` cannot be greater than `24`.
- `end - start >= 0.5`.
- If a change would cause an overlap with another range, the handle should stop at the nearest valid boundary.

## UI

- Horizontal time scale.
- Labels: `00:00`, `06:00`, `12:00`, `18:00`, `24:00`.
- Visual hour ticks.
- Ranges are displayed as colored segments.
- Each segment has two drag handles.
- The time is displayed next to or inside the segment, for example `08:00-10:30`.
- Range delete button.
- `Add range` button.

The specification may include the following statement:

> The component must be controlled: the current value is passed through `value`, and changes are emitted through `onChange`.

Example API:

```tsx
<PeakHoursRangeSelector
  value={ranges}
  onChange={setRanges}
  maxRanges={3}
  step={0.5}
  minDuration={0.5}
  disabled={false}
/>
```
