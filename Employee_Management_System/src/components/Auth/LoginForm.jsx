import { useState } from "react"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Email is", email);
    console.log("Password is", password);

    setEmail("")
    setPassword("")
  }
  return (
    <div className="max-w-sm my-10 mx-auto">

      <h1 className="text-3xl font-bold mb-2">
        Welcome back!
      </h1>

      <p className="text-gray-500 mb-8">
        Simplify your workflow and boost productivity.
      </p>

      {/* Inputs */}
      <input
      onChange={(e) => {
        setEmail(e.target.value)
      }}
        type="email"
        placeholder="Email"
        className="w-full border text-black rounded-full px-5 py-3 mb-4 outline-none focus:ring-2 focus:ring-black/20"
      />

      <input
      onChange={(e) => {
        setPassword(e.target.value)
      }}
        type="password"
        placeholder="Password"
        className="w-full border text-black  rounded-full px-5 py-3 mb-2 outline-none focus:ring-2 focus:ring-black/20"
      />

      <p className="text-right text-sm text-gray-400 mb-6 cursor-pointer">
        Forgot Password?
      </p>

      {/* Login Button */}
      <button className="w-full bg-black cursor-pointer text-white py-3 rounded-full font-medium hover:bg-gray-900 transition"
        onClick={(e) => {
          submitHandler(e)
        }}
      >
        Login
      </button>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="px-3 text-sm text-gray-400">
          or continue with
        </span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Social Buttons */}
      <div className="flex justify-center gap-4">
        <button className="w-12 h-12 rounded-full bg-black text-white">G</button>
        <button className="w-12 h-12 rounded-full bg-black text-white"></button>
        <button className="w-12 h-12 rounded-full bg-black text-white">f</button>
      </div>

    </div>
  );
};

export default LoginForm;
