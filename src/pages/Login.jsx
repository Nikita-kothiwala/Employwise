import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../API/api";

const Login = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);
      localStorage.setItem('token', res.data.token);
      navigate('/users');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-300">
      <div className="w-96 p-8 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out">
     
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
            alt="Login Icon"
            className="w-20 h-20"
          />
        </div>

     
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-4">Welcome Back!</h2>
        <p className="text-center text-gray-500 mb-6">Please login to your account</p>

      
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}


        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

   
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

    
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-gradient-to-l hover:from-indigo-500 hover:to-blue-500 transition duration-300"
        >
          Login
        </button>

     
        <p className="mt-4 text-center text-sm text-gray-500">
          Forgot your password?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Reset it here
          </a>
        </p>

      
        <p className="mt-2 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
