import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login_Register_Page from './pages/Login_Register_Page.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Collection from './pages/Collection.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './NotFound.jsx';
import RefrshHandler from './RefreshHandler.js';

function App() {
	const GoogleWrapper = () => (
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<Login_Register_Page />
		</GoogleOAuthProvider>
	);

	// Pure guard based on localStorage
	const PrivateRoute = ({ element }) => {
		const data = localStorage.getItem("user-info");
		const token = JSON.parse(data)?.token;

		return token ? element : <Navigate to="/login" replace />;
	};

	return (
		<BrowserRouter>
			<ToastContainer />
			<RefrshHandler />
			<Routes>
				<Route path="/login" element={<GoogleWrapper />} />
				<Route path="/" element={<Navigate to="/home" replace />} />

				{/* Protected routes */}
				<Route path="/home" element={<PrivateRoute element={<Home />} />} />
				<Route path="/about" element={<PrivateRoute element={<About />} />} />
				<Route path="/collection" element={<PrivateRoute element={<Collection />} />} />
				<Route path="/contact" element={<PrivateRoute element={<Contact />} />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
