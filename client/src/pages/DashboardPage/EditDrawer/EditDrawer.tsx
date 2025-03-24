import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {newEvent} from "../../../api/event.api.ts";
import { XMarkIcon } from '@heroicons/react/24/outline'

function EditDrawer({isOpen = false, onClose}) {

    const queryClient = useQueryClient();
    const {register, formState: {errors}, handleSubmit, reset} = useForm();

    const newEventMutation = useMutation({
        mutationFn: newEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['events']});
            onClose();
            reset();
        },
        onError: (errors) => {console.log(errors)}
    });

    function onSubmit(data) {
        console.log(data);
        newEventMutation.mutate(data);
    }

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                        >
                            <TransitionChild>
                                <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                                    <button
                                        type="button"
                                        onClick={() => onClose}
                                        className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden"
                                    >
                                        <span className="absolute -inset-2.5" />
                                        <span className="sr-only">Close panel</span>
                                        <XMarkIcon aria-hidden="true" className="size-6" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                <div className="px-4 sm:px-6">
                                    <DialogTitle className="text-base font-semibold text-gray-900">Create an event</DialogTitle>
                                </div>
                                <div className="relative mt-6 flex-1 px-4 sm:px-6">

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="name"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Event Name
                                                </label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    placeholder="Some name"
                                                    {...register("name", {required: "Name is required"})}
                                                    className={`w-full p-2 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                                        errors.name ? 'border-red-500' : ''
                                                    }`}
                                                />
                                                {errors.name &&
                                                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="description"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Description
                                                </label>
                                                <textarea
                                                    id="description"
                                                    placeholder="Some description"
                                                    {...register("description", {required: "Description is required"})}
                                                    className={`w-full p-4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                                        errors.description ? 'border-red-500' : ''
                                                    }`}
                                                />
                                                {errors.description &&
                                                    <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="date"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Date
                                                </label>
                                                <input
                                                    id="date"
                                                    type="date"
                                                    {...register("date", {required: "Date is required"})}
                                                    className={`w-full p-2 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                                        errors.date ? 'border-red-500' : ''
                                                    }`}
                                                />
                                                {errors.date &&
                                                    <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="time"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Time
                                                </label>
                                                <input
                                                    id="time"
                                                    type="time"
                                                    {...register("time", {required: "Time is required"})}
                                                    className={`w-full p-2 mt-1 blockrounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                                        errors.time ? 'border-red-500' : ''
                                                    }`}
                                                />
                                                {errors.time &&
                                                    <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="priority"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Priority
                                                </label>
                                                <select
                                                    id="priority"
                                                    {...register("priority", {required: "Priority is required"})}
                                                    className={`w-full p-2 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                                        errors.priority ? 'border-red-500' : ''
                                                    }`}
                                                >
                                                    <option value="">Select priority</option>
                                                    <option value="low">Low</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="high">High</option>
                                                </select>
                                                {errors.priority &&
                                                    <p className="mt-1 text-sm text-red-500">{errors.priority.message}</p>}
                                            </div>
                                            <div>
                                                <button
                                                    type="submit"
                                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Create
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default EditDrawer;