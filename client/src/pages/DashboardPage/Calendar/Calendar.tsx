import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../../../api/event.api.ts";
import EventCard from "../EventCard/EventCard.tsx";
import { Event } from "../../../interfaces/event.interface.ts";

const Calendar = ({ handleEventDelete, filter }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const { data: events = [], isLoading, error } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const response = await getEvents();
            console.log(response);
            return response.map((event: Event) => ({
                ...event,
                date: new Date(event.date)
            }));
        }
    });

    const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    );
    const endOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    );
    const startDay = startOfMonth.getDay()-1 < 0 ? 6 : startOfMonth.getDay()-1;
    const daysInMonth = endOfMonth.getDate();

    const prevMonth = () => setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );

    const nextMonth = () => setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );

    const isSameDay = (date1: Date, date2: Date) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const getEventsForDate = (date: Date) => {
        if (filter !== "no") {
            return events.filter(event => isSameDay(event.date, date) && event.priority === filter);
        } else {
            return events.filter(event => isSameDay(event.date, date));
        }
    };

    if (isLoading) return <div className="flex items-center justify-center h-screen">Loading calendar...</div>;
    if (error) return <div className="flex items-center justify-center h-screen text-red-500">Error loading events</div>;

    const days = [];

    for (let i = 0; i < startDay; i++) {
        days.push(<div key={`empty-${i}`} className="text-gray-400"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
        const dayEvents = getEventsForDate(dayDate);

        days.push(
            <div
                key={i}
                className={`p-2 md:p-4 text-right border rounded-lg min-h-24 h-full flex flex-col`}
            >
                <div className="font-medium">{i}</div>
                <div className="flex-grow overflow-y-auto mt-1">
                    {dayEvents.length > 0 && (
                        <ul className="text-xs text-left space-y-1">
                            {dayEvents.map((event: Event) => (
                                <EventCard event={event} key={event.id} handleDelete={handleEventDelete} />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-white p-4">
            <div className="flex justify-between items-center mb-2 p-2">
                <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded"
                >
                    &#9665;
                </button>
                <h2 className="text-xl font-semibold">
                    {currentDate.toLocaleString("default", {
                        month: "long",
                        year: "numeric"
                    })}
                </h2>
                <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded"
                >
                    &#9655;
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-600 text-sm">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="p-1">{day}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1 mt-1 flex-grow overflow-y-auto pb-2">
                {days}
            </div>
        </div>
    );

};

export default Calendar;