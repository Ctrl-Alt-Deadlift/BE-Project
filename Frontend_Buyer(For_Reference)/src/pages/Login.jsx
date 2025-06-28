import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext.jsx";
import { toast } from "react-toastify";

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        console.log(response.data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token)
        }
        else {
          console.log(response.response.data.message);
          toast.error(response.data.message);
        }
      }
      else {

        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        console.log(response.status);
        console.log(response.data);
        if (response.status === 200) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token)
        }
        else {
          toast.error('Invalid Credentials', {
            autoClose: 2000,
          });
        }
      }

    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    if (token) {
      toast.success("Welcome", {
        autoClose: 1000,
      })
      navigate('/');
    }

  }, [token])

  return (

    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Sign Up' ? <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="w-full px-3 py-2 border border-gray-800" placeholder="Name" required /> : ''}
      <input type="email" className="w-full px-3 py-2 border border-gray-800" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email Address" required />
      <input type="password" className="w-full px-3 py-2 border border-gray-800" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" required />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your Password?</p>
        <p onClick={() => currentState === 'Login' ? setCurrentState('Sign Up') : setCurrentState('Login')} className="cursor-pointer">{
          currentState === 'Login' ? 'Create account' : 'Login'
        }</p>
      </div>
      <button className="bg-black border-none px-5 py-2 text-md rounded-sm text-white mt-4">{currentState}</button>
    </form>
  )
}

export default Login