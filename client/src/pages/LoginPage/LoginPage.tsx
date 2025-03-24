import {NavLink, useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {loginUser} from "../../api/auth.api.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AuthResponce, LoginData} from "../../interfaces/auth.interfaces.ts";

function LoginPage() {

    const {register, formState: {errors}, handleSubmit} = useForm();
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data: AuthResponce) => {
            console.log("success");
            localStorage.setItem("token", data.token);
            queryClient.invalidateQueries({queryKey: ['events']});
            navigate("/dashboard");
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const onSubmit = (data: LoginData) => {
        loginMutation.mutate(data);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login </h2>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
                            type="password"
                            className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-s">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <NavLink to="/register" className="text-blue-500 hover:underline">
                        Register
                    </NavLink>
                </p>
            </div>
        </div>
    )
}

export default LoginPage;