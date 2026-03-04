const LoginIllustration = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-10 py-14 text-center z-10">

      {/* Illustration image */}
      <div className="relative mb-8">
        {/* Glow ring behind image */}
        <div className="absolute inset-0 rounded-3xl blur-2xl opacity-40 scale-90"
          style={{ background: 'radial-gradient(circle, #7C6EF5 0%, #5BBCF8 100%)' }} />
        <img
          src="/login-illustration.png"
          alt="Employee Management Dashboard"
          className="relative w-72 h-72 object-cover rounded-3xl shadow-2xl"
          style={{ border: '1px solid rgba(124,110,245,0.3)' }}
        />
      </div>

      {/* Floating stat chips */}
      <div className="flex items-center gap-3 mb-8 flex-wrap justify-center">
        {[
          { icon: '✅', label: 'Tasks Done',    value: '128', color: '#22c55e', bg: '#052e16' },
          { icon: '⚡', label: 'In Progress',   value: '24',  color: '#f59e0b', bg: '#2d1f02' },
          { icon: '👥', label: 'Team Members',  value: '5',   color: '#a78bfa', bg: '#1e1040' },
        ].map((chip) => (
          <div
            key={chip.label}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold"
            style={{ background: chip.bg, border: `1px solid ${chip.color}33`, color: chip.color }}
          >
            <span>{chip.icon}</span>
            <span className="text-white font-bold">{chip.value}</span>
            <span className="opacity-70">{chip.label}</span>
          </div>
        ))}
      </div>

      {/* Headline */}
      <h2 className="text-white text-2xl font-bold leading-snug mb-3">
        Manage your team's<br />
        <span style={{ background: 'linear-gradient(90deg, #7C6EF5, #5BBCF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          workflow effortlessly
        </span>
      </h2>
      <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
        Assign tasks, track progress, and keep your entire team in sync — all in one place.
      </p>

      {/* Progress bar decorations */}
      <div className="mt-8 w-full max-w-xs flex flex-col gap-2.5">
        {[
          { label: 'Task Completion', pct: 78, color: '#7C6EF5' },
          { label: 'Team Productivity', pct: 91, color: '#5BBCF8' },
        ].map((bar) => (
          <div key={bar.label} className="flex items-center gap-3">
            <span className="text-gray-500 text-xs w-32 text-left shrink-0">{bar.label}</span>
            <div className="flex-1 h-1.5 rounded-full" style={{ background: '#2a2a2a' }}>
              <div
                className="h-1.5 rounded-full transition-all duration-700"
                style={{ width: `${bar.pct}%`, background: bar.color }}
              />
            </div>
            <span className="text-xs font-semibold" style={{ color: bar.color }}>{bar.pct}%</span>
          </div>
        ))}
      </div>

    </div>
  )
}

export default LoginIllustration
