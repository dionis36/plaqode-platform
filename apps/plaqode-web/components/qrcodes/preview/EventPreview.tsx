'use client';

import { Calendar, MapPin, Clock, User, Mail, Globe, Bell, FileText } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useEffect } from 'react';
import { usePreviewContext } from './PreviewContext';
import { downloadICS } from '../../../lib/ics';

export function EventPreview({ data }: { data: any }) {
    const { setHeroBackgroundColor } = usePreviewContext();

    // Defaults
    const styles = data.styles || { primary_color: '#7C3AED', secondary_color: '#FAF5FF' };
    const eventDetails = data.event_details || {};
    const description = data.description || '';
    const organizer = data.organizer || {};
    const eventUrl = data.event_url || '';
    // const reminders = data.reminders || { enabled: false }; // Not visible in public preview typically, but logic exists

    // Set hero background color
    useEffect(() => {
        setHeroBackgroundColor(styles.primary_color);
    }, [styles.primary_color, setHeroBackgroundColor]);

    // Handle ICS Download
    const handleAddToCalendar = () => {
        downloadICS({
            title: eventDetails.title || 'Event',
            start_date: eventDetails.start_date,
            end_date: eventDetails.end_date || eventDetails.start_date,
            start_time: eventDetails.start_time,
            end_time: eventDetails.end_time,
            all_day: eventDetails.all_day,
            location: eventDetails.location,
            description: description,
            url: eventUrl,
            organizer: organizer,
            timezone: eventDetails.timezone
        });
    };

    // Format date and time
    const formatEventDate = () => {
        if (!eventDetails.start_date) return '';
        try {
            const startDate = parseISO(eventDetails.start_date);
            const endDate = eventDetails.end_date ? parseISO(eventDetails.end_date) : startDate;

            if (eventDetails.all_day) {
                if (eventDetails.start_date === eventDetails.end_date) {
                    return format(startDate, 'EEEE, MMMM d, yyyy');
                }
                return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
            }

            const startTime = eventDetails.start_time || '09:00';
            const endTime = eventDetails.end_time || '10:00';

            if (eventDetails.start_date === eventDetails.end_date) {
                return `${format(startDate, 'EEE, MMM d, yyyy')} • ${startTime} - ${endTime}`;
            }

            return `${format(startDate, 'MMM d')} ${startTime} - ${format(endDate, 'MMM d')} ${endTime}`;
        } catch (error) {
            return '';
        }
    };

    const primaryColor = styles.primary_color || '#7C3AED';
    const secondaryColor = styles.secondary_color || '#FAF5FF';

    // If no data (rare for public), show minimal state
    if (!eventDetails.title && !description) {
        return (
            <div className="flex items-center justify-center h-full text-slate-400 bg-slate-50">
                <p>No event details available</p>
            </div>
        );
    }

    return (
        <div
            className="absolute inset-0 w-full h-full font-sans overflow-hidden bg-white"
            style={{
                background: `linear-gradient(135deg, ${primaryColor}15 0%, #ffffff 100%)`
            }}
        >
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* --- Fixed Background Elements --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-[-20%] left-[-20%] w-[120%] h-[60%] rounded-[100%] blur-3xl opacity-40 animate-pulse"
                    style={{ background: primaryColor }}
                />
                <div
                    className="absolute bottom-[-20%] right-[-20%] w-[100%] h-[50%] rounded-[100%] blur-3xl opacity-30"
                    style={{ background: secondaryColor }}
                />
            </div>

            {/* --- Scrollable Content --- */}
            <div className="relative w-full h-full overflow-y-auto no-scrollbar flex flex-col z-10">

                {/* Spacer */}
                <div className="w-full flex-none pt-20" />

                {/* 1. Header (Floating) */}
                <div className="flex-none flex flex-col justify-center items-center pb-8 px-4 text-center">
                    {/* Floating Icon */}
                    <div className="relative group mb-5">
                        <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-40 transition-opacity duration-500 scale-125" />
                        <div
                            className="relative h-24 w-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-1 ring-4 ring-white/30 backdrop-blur-sm animate-in zoom-in-50 duration-700 ease-out rotate-3"
                        >
                            <Calendar
                                className="w-10 h-10"
                                style={{ color: primaryColor }}
                            />
                        </div>
                    </div>

                    {/* Event Title */}
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight drop-shadow-sm mb-2 px-2">
                        {eventDetails.title}
                    </h1>
                </div>

                {/* 2. Main Glass Card */}
                <div className="flex-shrink-0 px-4 flex justify-center pb-8">
                    <div className="w-full max-w-sm bg-white/60 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)] border border-white/80 px-6 py-8 flex flex-col items-stretch animate-in slide-in-from-bottom-8 duration-700 ring-1 ring-white/40">

                        {/* Date & Time */}
                        <div className="text-center mb-8">
                            <p className="text-lg font-semibold text-slate-800">
                                {formatEventDate()}
                            </p>
                            {eventDetails.timezone && !eventDetails.all_day && (
                                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wide">
                                    {eventDetails.timezone.replace('_', ' ')}
                                </p>
                            )}
                        </div>

                        {/* Add to Calendar Button */}
                        <button
                            onClick={handleAddToCalendar}
                            className="w-full py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-8 text-white relative overflow-hidden"
                            style={{ backgroundColor: primaryColor }}
                        >
                            <Calendar className="w-5 h-5" />
                            <span>Add to Calendar</span>
                        </button>

                        <div className="space-y-6">
                            {/* Description */}
                            {description && (
                                <div className="text-center">
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {description}
                                    </p>
                                </div>
                            )}

                            {/* Details List */}
                            <div className="space-y-3">
                                {/* Location */}
                                {eventDetails.location && (
                                    <a
                                        href={eventDetails.location_url || `https://maps.google.com/?q=${eventDetails.location}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all active:scale-[0.99]"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 transition-colors">
                                                <MapPin className="w-4 h-4" />
                                            </div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</p>
                                        </div>
                                        <p className="text-slate-800 font-medium break-words pl-1">
                                            {eventDetails.location}
                                        </p>
                                    </a>
                                )}

                                {/* Organizer */}
                                {(organizer.name || organizer.email) && (
                                    <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-600">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Organizer</p>
                                        </div>
                                        <p className="text-slate-800 font-medium break-words pl-1">
                                            {organizer.name || organizer.email}
                                        </p>
                                    </div>
                                )}

                                {/* Event Link */}
                                {eventUrl && (
                                    <a
                                        href={eventUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all active:scale-[0.99]"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 transition-colors">
                                                <Globe className="w-4 h-4" />
                                            </div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Event Link</p>
                                        </div>
                                        <p className="text-slate-800 font-medium break-words pl-1">
                                            {eventUrl.replace(/^https?:\/\//, '')}
                                        </p>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 min-h-0" />
                <div className="flex-none pt-4 pb-4 text-[10px] uppercase tracking-widest text-slate-400 font-semibold text-center opacity-60">
                    Powered by Plaqode
                </div>
            </div>
        </div>
    );
}
