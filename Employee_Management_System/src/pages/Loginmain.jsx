import LoginForm from "../components/Auth/LoginForm"
import LoginIllustration from "../components/Auth/LoginIllustration"

const Loginmain = ({ HandleLogin }) => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-6"
      style={{ background: 'radial-gradient(ellipse at 20% 50%, #1a1040 0%, #0f0f0f 60%)' }}
    >
      {/* Ambient glow blobs */}
      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: '#7C6EF5' }} />
      <div className="fixed bottom-[-200px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-15 blur-[100px] pointer-events-none"
        style={{ background: '#5BBCF8' }} />

      {/* Main Card */}
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden flex shadow-2xl"
        style={{ background: '#161616', border: '1px solid #2a2a2a' }}
      >
        {/* LEFT — Login Form */}
        <div className="w-1/2 p-14 flex flex-col justify-center">
          <LoginForm HandleLogin={HandleLogin} />
        </div>

        {/* RIGHT — Illustration */}
        <div className="w-1/2 relative flex items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a1040 0%, #0d1b3e 60%, #0f1923 100%)' }}
        >
          {/* Inner glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 40%, rgba(124,110,245,0.25) 0%, transparent 70%)' }} />
          <LoginIllustration />
        </div>
      </div>
    </div>
  )
}

export default Loginmain
