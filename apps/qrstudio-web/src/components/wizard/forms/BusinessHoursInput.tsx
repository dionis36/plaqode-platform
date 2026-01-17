import React, { useMemo } from 'react';
import { Clock, ChevronDown } from 'lucide-react';

export interface DaySchedule {
    isOpen: boolean;
    start: string; // HH:mm
    end: string;   // HH:mm
}

export type BusinessHours = {
    [key in 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun']: DaySchedule;
} & {
    format?: '12h' | '24h';
};

interface BusinessHoursInputProps {
    value: BusinessHours;
    onChange: (value: BusinessHours) => void;
}

const DAYS = [
    { key: 'mon', label: 'Mon' },
    { key: 'tue', label: 'Tue' },
    { key: 'wed', label: 'Wed' },
    { key: 'thu', label: 'Thu' },
    { key: 'fri', label: 'Fri' },
    { key: 'sat', label: 'Sat' },
    { key: 'sun', label: 'Sun' },
] as const;

// Helper to generate time slots
const generateTimeSlots = (step: number = 15) => {
    const slots = [];
    for (let i = 0; i < 24 * 60; i += step) {
        const h = Math.floor(i / 60);
        const m = i % 60;
        const time24 = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        slots.push({
            value: time24,
            minutes: i
        });
    }
    return slots;
};

// Internal TimeSelect component
const TimeSelect = ({
    value,
    onChange,
    format
}: {
    value: string;
    onChange: (val: string) => void;
    format: '12h' | '24h';
}) => {
    const slots = useMemo(() => generateTimeSlots(15), []);

    // Ensure current value is in slots (for legacy or custom times)
    const displaySlots = useMemo(() => {
        if (value && !slots.find(s => s.value === value)) {
            return [...slots, { value, minutes: 0 }].sort((a, b) => a.value.localeCompare(b.value));
        }
        return slots;
    }, [slots, value]);

    // Format display label based on toggle
    const getLabel = (time24: string) => {
        if (!time24) return '';
        const [h, m] = time24.split(':').map(Number);
        if (format === '24h') {
            return time24;
        }
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    return (
        <div className="relative group">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none w-32 px-3 py-2 rounded-md border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-700 bg-white cursor-pointer pr-8"
            >
                {displaySlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                        {getLabel(slot.value)}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-4 h-4" />
        </div>
    );
};

export function BusinessHoursInput({ value, onChange }: BusinessHoursInputProps) {
    // Ensure format defaults to 12h if not set, or preserve existing
    const currentFormat = value.format || '12h';

    const updateDay = (dayKey: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun', updates: Partial<DaySchedule>) => {
        const newValue = {
            ...value,
            [dayKey]: {
                ...value[dayKey],
                ...updates
            }
        };
        onChange(newValue);
    };

    const copyToAll = (fromDayKey: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun') => {
        const template = value[fromDayKey] as DaySchedule;
        const newValue = { ...value };
        const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
        days.forEach(key => {
            newValue[key] = { ...template };
        });
        onChange(newValue);
    };

    const toggleFormat = () => {
        onChange({ ...value, format: currentFormat === '24h' ? '12h' : '24h' });
    };

    return (
        <div className="space-y-4">
            <div className="bg-blue-50/50 p-4 rounded-xl text-sm text-blue-800 border border-blue-100 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-3 items-start max-w-lg">
                    <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold">Set your business hours</p>
                        <p className="text-blue-600/80 mt-1">
                            Turn off days when you are closed. You can copy the schedule from Monday to all other days to save time.
                        </p>
                    </div>
                </div>

                {/* Format Toggle */}
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-blue-100 flex-shrink-0">
                    <span className={`text-xs font-medium ${currentFormat === '24h' ? 'text-blue-500' : 'text-slate-400'}`}>24h</span>
                    <button
                        type="button"
                        onClick={toggleFormat}
                        className={`
                            w-10 h-6 rounded-full flex items-center transition-colors duration-200 relative
                            ${currentFormat === '24h' ? 'bg-blue-600' : 'bg-slate-300'}
                        `}
                    >
                        <span className={`
                            w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 absolute left-1
                            ${currentFormat === '24h' ? 'translate-x-4' : 'translate-x-0'}
                        `} />
                    </button>
                    <span className={`text-xs font-medium ${currentFormat !== '24h' ? 'text-blue-500' : 'text-slate-400'}`}>12h</span>
                </div>
            </div>

            <div className="space-y-3">
                {DAYS.map((day) => {
                    const schedule = value[day.key];
                    const isOpen = schedule.isOpen;

                    return (
                        <div key={day.key} className={`
                            flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border transition-all
                            ${isOpen ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-slate-100'}
                        `}>
                            {/* Toggle & Label */}
                            <div className="flex items-center gap-3 min-w-[120px]">
                                <button
                                    type="button"
                                    onClick={() => updateDay(day.key, { isOpen: !isOpen })}
                                    className={`
                                        w-10 h-6 rounded-full flex items-center transition-colors duration-200 relative
                                        ${isOpen ? 'bg-blue-600' : 'bg-slate-300'}
                                    `}
                                >
                                    <span className={`
                                        w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 absolute left-1
                                        ${isOpen ? 'translate-x-4' : 'translate-x-0'}
                                    `} />
                                </button>
                                <span className={`font-bold uppercase text-sm ${isOpen ? 'text-slate-700' : 'text-slate-400'}`}>
                                    {day.label}
                                </span>
                            </div>

                            {/* Time Controls */}
                            {isOpen ? (
                                <div className="flex flex-1 items-center gap-2 sm:gap-4 flex-wrap">
                                    <div className="flex items-center gap-2">
                                        <TimeSelect
                                            value={schedule.start}
                                            onChange={(val) => updateDay(day.key, { start: val })}
                                            format={currentFormat}
                                        />
                                        <span className="text-slate-400 text-sm">to</span>
                                        <TimeSelect
                                            value={schedule.end}
                                            onChange={(val) => updateDay(day.key, { end: val })}
                                            format={currentFormat}
                                        />
                                    </div>

                                    {day.key === 'mon' && (
                                        <button
                                            type="button"
                                            onClick={() => copyToAll('mon')}
                                            className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded transition-colors ml-auto sm:ml-0"
                                        >
                                            Copy to all
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="flex-1 text-sm font-medium text-slate-400 italic py-2">
                                    Closed
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
