import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { ShopContext } from "../context/ShopContext.jsx";
import GoogleButton from 'react-google-button'
import { googleAuth } from "../api";


const LoginRegisterPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const { setToken } = useContext(ShopContext);
    const navigate = useNavigate();

    // ------------------ GOOGLE LOGIN ------------------
    const responseGoogle = async (authResult) => {
        try {
            if (authResult.code) {
                const result = await googleAuth(authResult.code);
                const { email, name, image } = result.data.user;
                const token = result.data.token;

                localStorage.setItem(
                    "user-info",
                    JSON.stringify({ email, name, token, image })
                );
                setToken(token);
                toast.success("Logged in with Google!");
                navigate("/");
            } else {
                toast.error("Google login failed!");
            }
        } catch (e) {
            console.error("Google login error:", e);
            toast.error("Something went wrong during Google login.");
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });

    // ------------------ MANUAL LOGIN ------------------
    const handleManualLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
                {
                    emailOrPhone,
                    password,
                }
            );

            const { token, user } = response.data;
            localStorage.setItem(
                "user-info",
                JSON.stringify({
                    token,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                })
            );

            toast.success("Logged in successfully!");
            setToken(token);
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Login failed. Try again.");
        }
    };

    // ------------------ REGISTER ------------------
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
                {
                    name,
                    email: emailOrPhone,
                    phone,
                    password,
                }
            );

            const { token, user } = response.data;
            localStorage.setItem(
                "user-info",
                JSON.stringify({
                    token,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                })
            );

            toast.success("Registration successful!");
            navigate("/");
        } catch (error) {
            console.error("Registration error:", error);
            toast.error(
                error.response?.data?.message || "Something went wrong. Please try again."
            );
        }
    };

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl  px-8 py-2 pb-10">
                <h1 className="text-2xl md:text-2xl font-serif text-center mb-4 tracking-wide">
                    {isRegister ? "Create Account" : "Welcome Back"}
                </h1>

                {isRegister ? (
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <Input label="Email" type="email" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} required />
                        <Input label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button
                            type="submit"
                            className="w-full py-3 bg-black text-white rounded-md font-medium text-base tracking-wide hover:bg-gray-900 transition-all duration-200"
                        >
                            Sign Up
                        </button>
                    </form>
                ) : (
                    <form className="space-y-4" onSubmit={handleManualLogin}>
                        <Input label="Email or Phone" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} required />
                        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                            <button type="button" className="hover:text-gray-700 hover:underline transition">
                                Forgot Password?
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsRegister(true)}
                                className="hover:text-gray-700 hover:underline transition"
                            >
                                Create Account
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-black text-white rounded-md font-medium text-base tracking-wide hover:bg-gray-900 transition-all duration-200"
                        >
                            Login
                        </button>
                    </form>
                )}

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-200" />
                    <span className="px-3 text-xs text-gray-400 uppercase">or</span>
                    <div className="flex-grow h-px bg-gray-200" />
                </div>

                {/* Google button */}
                <div className="flex justify-center">
                    <GoogleButton onClick={() => googleLogin()} />

                </div>
                
                <p className="text-xs text-gray-400 text-center mt-6">
                    By continuing, you agree to our{" "}
                    <span className="underline hover:text-gray-600 cursor-pointer">Terms</span> &{" "}
                    <span className="underline hover:text-gray-600 cursor-pointer">Privacy Policy</span>.
                </p>

                <div className="text-center mt-4">
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-sm text-gray-600 hover:text-gray-800 hover:underline transition"
                    >
                        {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
                    </button>
                </div>
            </div>
        </div>
    );
};

/* --------- Input Component --------- */
const Input = ({ label, type = "text", value, onChange, required }) => (
    <label className="block">
        <span className="text-sm text-gray-600 mb-1 block">{label}</span>
        <input
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-4 py-3 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white transition placeholder-gray-400 text-sm"
            placeholder={label}
        />
    </label>
);



export default LoginRegisterPage;
