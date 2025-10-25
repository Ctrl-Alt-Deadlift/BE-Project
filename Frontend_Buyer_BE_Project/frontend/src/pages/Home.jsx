import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx'
import LatestCollection from '../components/LatestCollection.jsx';

const Home = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('user-info');
        const userData = JSON.parse(data);
        console.log(userData);
        setUserInfo(userData);
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user-info');
        navigate('/login');
    }

    return (
        <>
            <Navbar />
            <Hero/>
            <LatestCollection/>
            <p>Home</p>
        </>
    )
}

export default Home;