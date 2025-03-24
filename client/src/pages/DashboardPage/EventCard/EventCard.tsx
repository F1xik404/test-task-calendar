import { useState } from "react";
import {useForm} from "react-hook-form";
import {updateEvent} from "../../../api/event.api.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Event} from "../../../interfaces/event.interface.ts";

interface EventCardProps {
    event: Event;
    handleDelete: (id: string) => void;
}

function EventCard({ event, handleDelete}: EventCardProps) {
    const [expanded, setExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);


    const queryClient = useQueryClient();

    const {register, handleSubmit} = useForm({
        defaultValues: {
            name: event.name,
            date: event.date.toISOString().split("T")[0],
            time: event.time,
            description: event.description,
            priority: event.priority
        }
    });

    const editMutation = useMutation({
        mutationFn: (data) => updateEvent(event.id, data),
        onSuccess: () => {
            setIsEditing(false);
            queryClient.invalidateQueries({queryKey: ['events']});
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const priorityColors = {
        low: "bg-green-100 border-green-300 text-green-800",
        medium: "bg-yellow-100 border-yellow-300 text-yellow-800",
        high: "bg-red-100 border-red-300 text-red-800",
    };


    const handleSave = (data) => {
        console.log(data);
        editMutation.mutate(data);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div
            className={`border rounded-lg p-3 cursor-pointer ${priorityColors[event.priority]}`}
            onClick={() => !isEditing && setExpanded(!expanded)}
        >
            {expanded && (
                <div className="flex justify-center align-baseline gap-2">
                    {!isEditing && (
                        <>
                            <button
                                className="p-1 hover:bg-gray-200 rounded"
                                onClick={() => {
                                    setIsEditing(true);
                                }}
                            >
                                <svg
                                    className="w-4 h-4 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                                    />
                                </svg>
                            </button>
                            <button
                                className="p-1 hover:bg-gray-200 rounded"
                                onClick={() => {
                                    handleDelete(event.id);
                                }}
                            >
                                <svg
                                    className="w-4 h-4 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                    />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            )}

            {isEditing ? (
                <div className="mt-2 space-y-2">
                    <form onSubmit={handleSubmit(handleSave)}>
                        <div className="flex justify-center align-baseline">
                        <button
                            className="p-1 hover:bg-green-200 rounded"
                            type="submit"
                        >
                            <svg
                                className="w-4 h-4 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 11.917 9.724 16.5 19 7.5"
                                />
                            </svg>
                        </button>
                        <button
                            className="p-1 hover:bg-red-200 rounded"
                            onClick={handleCancel}
                        >
                            <svg
                                className="w-4 h-4 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                />
                            </svg>
                        </button>
                        </div>
                    <input
                        {...register("name", {required: "Name is required"})}
                        type="text"
                        className="w-full p-1 border rounded"
                    />
                        <input
                            {...register("date")}
                            type="date"
                            className="w-full p-1 border rounded"
                        />
                    <input
                        {...register("time")}
                        type="time"
                        className="w-full p-1 border rounded"
                    />
                    <select
                        {...register("priority", {required: "Priority is required"})}
                        className="w-full p-1 border rounded"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <textarea
                        {...register("description")}
                        className="w-full p-1 border rounded"
                        rows={3}
                    />
                    </form>
                </div>

            ) : (
                <>
                    <div className="font-medium">{event.name}</div>
                    <div className="text-xs text-gray-600">{event.time}</div>
                    {expanded && (
                        <div className="mt-2 space-y-2">
                            <p className="text-sm text-gray-800">{event.description}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default EventCard;