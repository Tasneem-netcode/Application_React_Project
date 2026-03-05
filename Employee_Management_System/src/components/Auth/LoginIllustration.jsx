const LoginIllustration = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-10 py-14 z-10 select-none">

      {/* ── Mini Dashboard Mockup ── */}
      <div
        className="w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#1a1a2e', border: '1px solid #2a2a3e' }}
      >
        {/* Mockup top bar */}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #2a2a3e' }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
            <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
            <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
          </div>
          <div className="text-gray-600 text-xs font-medium">Task Dashboard</div>
          <div className="w-5 h-5 rounded bg-[#7C6EF5]/20 flex items-center justify-center text-[10px] text-[#7C6EF5]">✦</div>
        </div>

        <div className="p-4 flex flex-col gap-3">

          {/* Stat row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Total',     value: '24', color: '#94a3b8', bg: '#ffffff08' },
              { label: 'Active',    value: '8',  color: '#f59e0b', bg: '#f59e0b12' },
              { label: 'Done',      value: '14', color: '#22c55e', bg: '#22c55e12' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-2.5 text-center" style={{ background: s.bg }}>
                <p className="font-bold text-base text-white">{s.value}</p>
                <p className="text-[10px] font-medium" style={{ color: s.color }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Task cards */}
          {[
            { title: 'Design Landing Page',  tag: 'Design',   status: 'New',         statusColor: '#a78bfa', statusBg: '#1e1040', tagColor: '#94a3b8' },
            { title: 'Fix Login Bug',        tag: 'Backend',  status: 'In Progress', statusColor: '#f59e0b', statusBg: '#2d1f02', tagColor: '#94a3b8' },
            { title: 'Deploy to Production', tag: 'DevOps',   status: 'Done',        statusColor: '#22c55e', statusBg: '#052e16', tagColor: '#94a3b8' },
          ].map((task) => (
            <div
              key={task.title}
              className="flex items-center justify-between rounded-xl px-3 py-2.5"
              style={{ background: '#ffffff06', border: '1px solid #ffffff08' }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-6 rounded-full" style={{ background: task.statusColor }} />
                <div>
                  <p className="text-white text-xs font-semibold leading-tight">{task.title}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: task.tagColor }}>{task.tag}</p>
                </div>
              </div>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                style={{ background: task.statusBg, color: task.statusColor }}
              >
                {task.status}
              </span>
            </div>
          ))}

          {/* Team row */}
          <div className="flex items-center justify-between px-1 pt-1">
            <div className="flex -space-x-2">
              {['#7C6EF5', '#E56B9A', '#4DB8A0', '#F5A623'].map((color, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ background: color, borderColor: '#1a1a2e' }}
                >
                  {['AK', 'SA', 'ZA', 'FN'][i]}
                </div>
              ))}
              <div
                className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-semibold"
                style={{ background: '#2a2a3e', borderColor: '#1a1a2e', color: '#94a3b8' }}
              >
                +1
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              <span className="text-[10px] text-gray-500">5 active members</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Headline ── */}
      <div className="mt-8 text-center">
        <h2 className="text-white text-xl font-bold leading-snug mb-2">
          Your team. Your tasks.{' '}
          <span style={{ background: 'linear-gradient(90deg, #7C6EF5, #5BBCF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            One place.
          </span>
        </h2>
        <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
          Assign, track, and complete — streamlined for modern teams.
        </p>
      </div>

    </div>
  )
}

export default LoginIllustration
