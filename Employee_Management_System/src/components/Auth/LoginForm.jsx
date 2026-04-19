import { useState } from "react"

const LoginForm = ({ HandleLogin }) => {
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    HandleLogin(email, password)
    setEmail("")
    setPassword("")
  }

  const quickLogin = (loginEmail, loginPassword) => {
    setEmail(loginEmail)
    setPassword(loginPassword)
    // Use setTimeout to ensure state updates before calling HandleLogin
    setTimeout(() => {
      HandleLogin(loginEmail, loginPassword)
    }, 0)
  }

  return (
    <div className="w-full max-w-sm mx-auto">

      {/* Logo mark */}
      <div className="flex items-center gap-2.5 mb-10">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold"
          style={{ background: 'linear-gradient(135deg, #7C6EF5, #5BBCF8)' }}>
          ✦
        </div>
        <span className="text-white font-bold text-lg tracking-wide">WorkFlow</span>
      </div>

      {/* Heading */}
      <h1 className="text-white text-3xl font-bold mb-1 leading-tight">
        Welcome back
      </h1>
      <p className="text-gray-500 text-sm mb-9">
        Sign in to manage your team's tasks and workflow.
      </p>

      {/* Form */}
      <form onSubmit={submitHandler} className="flex flex-col gap-4">

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="w-full text-white text-sm px-4 py-3 rounded-xl outline-none transition-all duration-200 placeholder-gray-600"
            style={{
              background: '#1e1e1e',
              border: '1px solid #2e2e2e',
            }}
            onFocus={e => e.target.style.borderColor = '#7C6EF5'}
            onBlur={e  => e.target.style.borderColor = '#2e2e2e'}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full text-white text-sm px-4 py-3 rounded-xl outline-none transition-all duration-200 placeholder-gray-600 pr-11"
              style={{
                background: '#1e1e1e',
                border: '1px solid #2e2e2e',
              }}
              onFocus={e => e.target.style.borderColor = '#7C6EF5'}
              onBlur={e  => e.target.style.borderColor = '#2e2e2e'}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors text-sm"
            >
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {/* Forgot */}
        <div className="text-right -mt-1">
          <span className="text-xs text-[#7C6EF5] cursor-pointer hover:underline">
            Forgot password?
          </span>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-all duration-200 active:scale-95 shadow-lg mt-1"
          style={{ background: 'linear-gradient(135deg, #7C6EF5 0%, #5BBCF8 100%)' }}
          onMouseEnter={e => e.target.style.opacity = '0.9'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >
          Sign In →
        </button>

      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-gray-600 text-xs">QUICK LOGIN</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Quick Login Buttons */}
      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          onClick={() => quickLogin("admin@example.com", "123")}
          className="w-full py-2.5 px-4 rounded-xl text-white text-sm font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' }}
        >
          <span>🔑</span> Login as Admin
        </button>

        <button
          type="button"
          onClick={() => quickLogin("ayaan@example.com", "123")}
          className="w-full py-2.5 px-4 rounded-xl text-white text-sm font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)' }}
        >
          <span>👤</span> Login as Employee
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-gray-600 text-xs">or continue with</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Social Buttons */}
      <div className="flex justify-center gap-3">
        {[
          { label: 'G', title: 'Google' },
          { label: '𝕏', title: 'X / Twitter' },
          { label: 'in', title: 'LinkedIn' },
        ].map((s) => (
          <button
            key={s.label}
            title={s.title}
            className="w-11 h-11 rounded-xl text-gray-400 text-sm font-bold transition-all duration-200 hover:text-white hover:-translate-y-0.5"
            style={{ background: '#1e1e1e', border: '1px solid #2e2e2e' }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="text-center text-gray-600 text-xs mt-8">
        By signing in you agree to our{' '}
        <span className="text-[#7C6EF5] cursor-pointer hover:underline">Terms of Service</span>
      </p>
    </div>
  )
}

export default LoginForm
