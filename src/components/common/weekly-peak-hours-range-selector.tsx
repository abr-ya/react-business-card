import {
  PeakHoursRangeSelector,
  type AddRangeStrategy,
  type PeakRange,
} from "@/components/common/peak-hours-range-selector";
import { cn } from "@/lib/utils";

export type DayPeakHours = {
  id: string;
  label: string;
  dateLabel?: string;
  ranges: PeakRange[];
};

export type WeeklyPeakHoursValue = DayPeakHours[];

export type WeeklyPeakHoursRangeSelectorProps = {
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

const TIME_LABELS = [0, 6, 12, 18, 24];

const formatTime = (value: number) => `${String(value).padStart(2, "0")}:00`;

const toPercent = (value: number) => `${(value / 24) * 100}%`;

export const WeeklyPeakHoursRangeSelector = ({
  value,
  onChange,
  className,
  maxRanges,
  step,
  minDuration,
  minGap,
  defaultRangeDuration,
  disabled,
  addRangeStrategy,
  preferredRange,
  addOnDoubleClick,
}: WeeklyPeakHoursRangeSelectorProps) => {
  const updateDay = (dayId: string, ranges: PeakRange[]) => {
    onChange(value.map((day) => (day.id === dayId ? { ...day, ranges } : day)));
  };

  return (
    <section
      className={cn(
        "w-full overflow-x-auto rounded-md bg-[#091126] p-4 shadow-2xl shadow-slate-950/40",
        className,
      )}
    >
      <div className="min-w-[860px]">
        <div className="grid grid-cols-[6.5rem_minmax(0,1fr)_2.75rem] items-end gap-3 pb-2">
          <div />
          <div className="relative h-5 text-xs text-slate-200/75">
            {TIME_LABELS.map((time) => (
              <span
                className="absolute -translate-x-1/2 whitespace-nowrap first:translate-x-0 last:-translate-x-full"
                key={time}
                style={{ left: toPercent(time) }}
              >
                {formatTime(time)}
              </span>
            ))}
          </div>
          <div />
        </div>

        <div className="space-y-2">
          {value.map((day) => (
            <div className="grid grid-cols-[6.5rem_minmax(0,1fr)_2.75rem] items-center gap-3" key={day.id}>
              <div className="grid grid-cols-[2.25rem_1fr] items-baseline gap-2 text-sm">
                <span className="font-medium text-slate-100">{day.label}</span>
                {day.dateLabel ? <span className="text-slate-300/70">{day.dateLabel}</span> : null}
              </div>

              <PeakHoursRangeSelector
                addOnDoubleClick={addOnDoubleClick}
                addRangeStrategy={addRangeStrategy}
                className="contents"
                defaultRangeDuration={defaultRangeDuration}
                disabled={disabled}
                maxRanges={maxRanges}
                minDuration={minDuration}
                minGap={minGap}
                onChange={(ranges) => updateDay(day.id, ranges)}
                preferredRange={preferredRange}
                showTimeLabels={false}
                step={step}
                value={day.ranges}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
