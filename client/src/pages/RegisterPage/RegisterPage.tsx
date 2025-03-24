import {NavLink, useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {AuthResponce, RegisterData} from "../../interfaces/auth.interfaces.ts";
import {useMutation} from "@tanstack/react-query";
import {registerUser} from "../../api/auth.api.ts";
//import {useState} from "react";

function RegisterPage(){

    const {register, formState: { errors }, handleSubmit} = useForm();
    const navigate = useNavigate();
    //const [error, setErrors] = useState('');

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data: AuthResponce) => {
            console.log("success");
            localStorage.setItem("token", data.token)
            navigate("/dashboard");
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const onSubmit = (data: RegisterData) => {
        console.log(data);
        registerMutation.mutate(data);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Register</h2>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="username" className="block text-gray-600 font-medium">
                            Username
                        </label>
                        <input
                            {...register("name", {required: "Username is required"})}
                            type="text"
                            id="username"
                            className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                        />
                        {errors.name && <p className="text-red-500 text-s">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-600 font-medium">
                            Email
                        </label>
                        <input
                            {...register("email", {required: "Email is required"})}
                            type="email"
                            className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-s">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-600 font-medium">
                            Password
                        </label>
                        <input
                            {...register("password", {required: "Password is required"})}
                            className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-s">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <NavLink to="/login" className="text-blue-500 hover:underline">
                        Log in
                    </NavLink>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage;