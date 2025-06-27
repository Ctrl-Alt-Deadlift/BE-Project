import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";
import GoogleButton from "react-google-button";
import axios from "axios";


const inputStyles = "border border-gray-600 bg-gray-700 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
const buttonStyles = "w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition";

const GoogleLoginPage = () => {
	const [isRegister, setIsRegister] = useState(false);
	const [emailOrPhone, setEmailOrPhone] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [profilePhoto, setProfilePhoto] = useState(null);

	const navigate = useNavigate();

	const responseGoogle = async (authResult) => {
		try {
			console.log('Inside responseGoogle');
			console.log("Auth Result:", authResult);
			if (authResult.code) {
				const result = await googleAuth(authResult.code);
				console.log("Google Auth Result:", result);
				const { email, name, image } = result.data.user;
				console.log("User Data:", { email, name, image });
				const token = result.data.token;
				const obj = { email, name, token, image };
				console.log("User Info Object:", obj);
				localStorage.setItem("user-info", JSON.stringify(obj));
				toast.success("Logged in with Google!");
				navigate("/dashboard");
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

	const handleManualLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
				{
					emailOrPhone,
					password
				}
			);

			const { token, user } = response.data;

			localStorage.setItem("user-info", JSON.stringify({
				token,
				name: user.name,
				email: user.email,
				image: user.image,
			}));

			toast.success("Logged in successfully!");
			navigate("/dashboard");

		} catch (error) {
			console.error("Login error:", error);
			if (error.response?.data?.message) {
				toast.error(error.response.data.message);
			} else {
				toast.error("Login failed. Try again.");
			}
		}
	};
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

			// Store user info in localStorage
			localStorage.setItem("user-info", JSON.stringify({
				token,
				name: user.name,
				email: user.email,
				image: user.image, // Google image or default from backend
			}));

			toast.success("Registration successful!");
			navigate("/dashboard");

		} catch (error) {
			console.error("Registration error:", error);

			if (error.response?.data?.message) {
				toast.error(error.response.data.message);
			} else {
				toast.error("Something went wrong. Please try again.");
			}
		}
	};
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
			<div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
				<h2 className="text-2xl font-bold text-center mb-6">
					{isRegister ? "Register" : "Login"}
				</h2>

				{isRegister ? (
					<form className="space-y-4" onSubmit={handleRegister}>
						<input
							type="text"
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className={inputStyles}
							required
						/>
						<input
							type="email"
							placeholder="Email"
							value={emailOrPhone}
							onChange={(e) => setEmailOrPhone(e.target.value)}
							className={inputStyles}
							required
						/>
						<input
							type="tel"
							placeholder="Phone"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							className={inputStyles}
							required
						/>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={inputStyles}
							required
						/>
						<button type="submit" className={buttonStyles}>
							Register
						</button>
					</form>
				) : (
					<form className="space-y-4" onSubmit={handleManualLogin}>
						<input
							type="text"
							placeholder="Email or Phone"
							value={emailOrPhone}
							onChange={(e) => setEmailOrPhone(e.target.value)}
							className={inputStyles}
							required
						/>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={inputStyles}
							required
						/>
						<button type="submit" className={buttonStyles}>
							Login
						</button>
					</form>
				)}

				{/* Toggle between Login and Register */}
				<p className="text-center mt-4">
					{isRegister ? "Already have an account?" : "Don't have an account?"}
					<button
						className="text-blue-400 ml-2 hover:underline"
						onClick={() => setIsRegister(!isRegister)}
					>
						{isRegister ? "Login" : "Register"}
					</button>
				</p>

				{/* Divider */}
				<div className="flex items-center my-4">
					<div className="flex-grow h-px bg-gray-600" />
					<span className="px-3 text-gray-400">OR</span>
					<div className="flex-grow h-px bg-gray-600" />
				</div>

				{/* Google Login */}
				<GoogleButton
					onClick={() => {
						googleLogin();
						console.log("Google login clicked");
					}}
					label="Continue with Google"
					style={{ width: "100%", margin: "auto" }}
				/>
			</div>
		</div>
	);
};

export default GoogleLoginPage;
