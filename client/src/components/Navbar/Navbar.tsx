import {useNavigate} from "react-router";

function Navbar() {

    const navigate = useNavigate();


    const isAuthorized = true;
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <a href="#" className="text-white text-xl font-bold">Test calendar</a>

                {
                    /* Conditional Logout Button */
                    isAuthorized && (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar;