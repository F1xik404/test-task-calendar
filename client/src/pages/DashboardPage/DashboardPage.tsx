import Calendar from "./Calendar/Calendar.tsx";
import EditDrawer from "./EditDrawer/EditDrawer.tsx";
import {useState} from "react";
import DeleteConfirmation from "./DeleteConfirmation/DeleteConfirmation.tsx";

function DashboardPage() {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [deleteEventId, setDeleteEventId] = useState(0);

    const [filter, setFilter] = useState("no");
    
    const handleDelete = (id) => {
        setDeleteEventId(id);
        setIsDeleteOpen(true);
    }


        return (
            <>
                <div className="flex justify-between items-center p-10">
                <h1 className="text-xl font-semibold">Dashboard</h1>
                    <div className="flex gap-2 align-baseline justify-center">
                        <label className="text-gray-700">Filter by priority:</label>
                    <select className="bg-gray-200 py-2 px-4 rounded" onChange={(e) => setFilter(e.target.value)}>
                        <option value="no">No filters</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={() => setIsEditOpen(true)}
                >
                    New Event
                </button>
                    </div>
            </div>
                <Calendar handleEventDelete={handleDelete} filter={filter}/>
                <EditDrawer isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}/>
                <DeleteConfirmation id={deleteEventId} isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}/>
            </>
        );
}

export default DashboardPage;