import { useState } from "react"

const Login = () => {

  const [currentState, setCurrentState] = useState('Sign Up');
  const onSubmitHandler = async (event) => {
    event.preventDefault();
  }


  return (

    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Sign Up' ? <input type="text" className="w-full px-3 py-2 border border-gray-800" placeholder="Name" required /> : ''}
      <input type="email" className="w-full px-3 py-2 border border-gray-800" placeholder="Email Address" required />
      <input type="password" className="w-full px-3 py-2 border border-gray-800" placeholder="Password" required />
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