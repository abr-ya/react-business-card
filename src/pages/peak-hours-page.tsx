import { useState } from "react";

import { WeeklyPeakHoursRangeSelector, type WeeklyPeakHoursValue } from "@/components";

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
  {
    id: "wed",
    label: "Ср",
    dateLabel: "28.05",
    ranges: [
      { start: 10, end: 12.5 },
      { start: 16.5, end: 18 },
    ],
  },
  {
    id: "thu",
    label: "Чт",
    dateLabel: "29.05",
    ranges: [
      { start: 9.5, end: 11.5 },
      { start: 15, end: 16.5 },
    ],
  },
  {
    id: "fri",
    label: "Пт",
    dateLabel: "30.05",
    ranges: [
      { start: 10, end: 12 },
      { start: 15.5, end: 17 },
    ],
  },
  {
    id: "sat",
    label: "Сб",
    dateLabel: "31.05",
    ranges: [
      { start: 11, end: 13 },
      { start: 17, end: 18.5 },
    ],
  },
  {
    id: "sun",
    label: "Вс",
    dateLabel: "01.06",
    ranges: [
      { start: 11, end: 13.5 },
      { start: 16.5, end: 18 },
    ],
  },
];

const formatTime = (value: number) => {
  const totalMinutes = Math.round(value * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

export const PeakHoursPage = () => {
  const [week, setWeek] = useState<WeeklyPeakHoursValue>(demoWeek);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-6 py-10">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-300">Peak hours demo</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Weekly range selection</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Each day allows up to 3 periods. Double-click an empty area to add a new one-hour period when there is enough
          space, or double-click an existing period to remove it immediately.
        </p>
      </div>
      <div className="flex w-full flex-col items-start gap-4 xl:flex-row">
        <WeeklyPeakHoursRangeSelector
          addOnDoubleClick
          addRangeStrategy="largest-gap"
          className="mx-auto xl:flex-1"
          maxRanges={3}
          onChange={setWeek}
          value={week}
        />

        <aside className="w-full rounded-md border border-slate-700/70 bg-slate-950/50 p-3 text-xs text-slate-200 shadow-xl shadow-slate-950/30 xl:w-56 xl:shrink-0">
          <div className="mb-2 font-medium text-white">Current selection</div>
          <div className="space-y-1.5">
            {week.map((day) => (
              <div className="grid grid-cols-[2rem_1fr] gap-2" key={day.id}>
                <span className="text-slate-400">{day.label}</span>
                <span className="truncate">
                  {day.ranges.length > 0
                    ? day.ranges.map((range) => `${formatTime(range.start)}-${formatTime(range.end)}`).join(", ")
                    : "no ranges"}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};
