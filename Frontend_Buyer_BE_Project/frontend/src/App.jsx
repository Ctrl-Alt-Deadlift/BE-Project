// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import { useLocation } from "react-router-dom";
// import Login_Register_Page from './pages/Login_Register_Page.jsx';
// import Home from './pages/Home.jsx';
// import About from './pages/About.jsx';
// import Collection from './pages/Collection.jsx';
// import Contact from './pages/Contact.jsx';
// import Product from './pages/Product.jsx';
// import Cart from './pages/Cart.jsx';
// import Cart_r from './pages/Cart_r.jsx';
// import PlaceOrder from './pages/PlaceOrder.jsx';
// import Orders from './pages/Orders.jsx';
// import Verify from './pages/Verify.jsx';
// import NotFound from './NotFound.jsx';
// import RefrshHandler from './RefreshHandler.js';
// import SearchBar from "./components/SearchBar.jsx";
// import Navbar from "./components/Navbar.jsx";

// function App() {
// 	const GoogleWrapper = () => (
// 		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
// 			<Login_Register_Page />
// 		</GoogleOAuthProvider>
// 	);
// 	const location = useLocation();
// 	const isLoginPage = location.pathname === "/login";
// 	// Pure guard based on localStorage
// 	const PrivateRoute = ({ element }) => {
// 		const data = localStorage.getItem("user-info");
// 		const token = JSON.parse(data)?.token;

// 		return token ? element : <Navigate to="/login" replace />;
// 	};

// 	return (
// 		<div className={isLoginPage ? '' : 'px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'}>
// 			<BrowserRouter>
// 				<ToastContainer />
// 				<RefrshHandler />
// 				<Routes>
// 					<Route path="/login" element={<GoogleWrapper />} />
// 					<Route path="/" element={<Navigate to="/home" replace />} />
// 					{/* Protected routes */}
// 					<Route path="/home" element={<PrivateRoute element={<Home />} />} />
// 					<Route path="/about" element={<PrivateRoute element={<About />} />} />
// 					<Route path="/collection" element={<PrivateRoute element={<Collection />} />} />
// 					<Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
// 					<Route path="/product/:productId" element={<PrivateRoute element={<Product />} />} />
// 					<Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
// 					<Route path="/cart_r" element={<PrivateRoute element={<Cart_r />} />} />
// 					<Route path="/place-order" element={<PrivateRoute element={<PlaceOrder />} />} />
// 					<Route path="/orders" element={<PrivateRoute element={<Orders />} />} />
// 					<Route path='/verify' element={<PrivateRoute element={<Verify />} />} />


// 					<Route path="*" element={<NotFound />} />
// 				</Routes>
// 			</BrowserRouter>

// 		</div>
// 	);
// }


// export default App;

import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login_Register_Page from './pages/Login_Register_Page.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Collection from './pages/Collection.jsx';
import Contact from './pages/Contact.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Cart_r from './pages/Cart_r.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import Orders from './pages/Orders.jsx';
import Verify from './pages/Verify.jsx';
import NotFound from './NotFound.jsx';
import RefrshHandler from './RefreshHandler.js';
import SearchBar from "./components/SearchBar.jsx";
import Navbar from "./components/Navbar.jsx";

// ✅ Extracted component inside <BrowserRouter>
const AppRoutes = () => {
	const location = useLocation();
	const isLoginPage = location.pathname === "/login";

	const GoogleWrapper = () => (
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<Login_Register_Page />
		</GoogleOAuthProvider>
	);

	const PrivateRoute = ({ element }) => {
		const data = localStorage.getItem("user-info");
		const token = JSON.parse(data)?.token;

		return token ? element : <Navigate to="/login" replace />;
	};

	return (
		<div className={isLoginPage ? '' : 'px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'}>
			<ToastContainer />
			<RefrshHandler />
			<Routes>
				<Route path="/login" element={<GoogleWrapper />} />
				<Route path="/" element={<Navigate to="/home" replace />} />
				<Route path="/home" element={<PrivateRoute element={<Home />} />} />
				<Route path="/about" element={<PrivateRoute element={<About />} />} />
				<Route path="/collection" element={<PrivateRoute element={<Collection />} />} />
				<Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
				<Route path="/product/:productId" element={<PrivateRoute element={<Product />} />} />
				<Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
				<Route path="/cart_r" element={<PrivateRoute element={<Cart_r />} />} />
				<Route path="/place-order" element={<PrivateRoute element={<PlaceOrder />} />} />
				<Route path="/orders" element={<PrivateRoute element={<Orders />} />} />
				<Route path='/verify' element={<PrivateRoute element={<Verify />} />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
};

// ✅ Final wrapper with BrowserRouter at the top
function App() {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
}

export default App;
