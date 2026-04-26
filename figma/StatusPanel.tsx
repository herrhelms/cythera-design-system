export function StatusPanel({ darkMode = true }: { darkMode?: boolean }) {
  const statuses = [
    { name: 'WCAG AA+', value: 'PASS', status: 'ok' },
    { name: 'Contrast', value: '4.5:1+', status: 'ok' },
    { name: 'Theme', value: darkMode ? 'DARK' : 'LIGHT', status: 'ok' },
    { name: 'Accessibility', value: 'OPTIMAL', status: 'ok' }
  ];

  return (
    <div style={{
      background: darkMode
        ? 'rgba(0, 6, 20, 0.92)'
        : 'rgba(255, 255, 255, 0.85)',
      border: darkMode
        ? '1px solid rgba(0, 180, 255, 0.13)'
        : '1px solid rgba(125, 211, 252, 0.25)',
      borderRadius: '6px',
      padding: '20px',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: darkMode
        ? 'none'
        : '0 4px 8px -2px rgba(125, 211, 252, 0.25)'
    }}>
      <div style={{
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: '8px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: darkMode
          ? 'rgba(200, 232, 255, 0.42)'
          : 'rgba(100, 116, 139, 0.7)',
        marginBottom: '16px'
      }}>System Status</div>

      <div className="space-y-2">
        {statuses.map(({ name, value, status }) => (
          <div key={name} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 12px',
            borderRadius: '4px',
            background: darkMode
              ? (status === 'ok' ? 'rgba(160, 255, 96, 0.06)' : 'rgba(255, 107, 53, 0.06)')
              : (status === 'ok' ? 'rgba(134, 239, 172, 0.15)' : 'rgba(252, 165, 165, 0.15)')
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: darkMode
                ? (status === 'ok' ? '#B3FF6B' : '#FF7A47')
                : (status === 'ok' ? '#22C55E' : '#EF4444'),
              boxShadow: darkMode
                ? (status === 'ok' ? '0 0 6px rgba(179, 255, 107, 0.5)' : '0 0 6px rgba(255, 122, 71, 0.5)')
                : (status === 'ok' ? '0 0 6px rgba(34, 197, 94, 0.6)' : '0 0 6px rgba(239, 68, 68, 0.6)'),
              flexShrink: 0
            }}></div>
            <span style={{
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '9px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: darkMode ? '#c8e8ff' : '#1A1F3A'
            }}>{name}</span>
            <span style={{
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '8px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginLeft: 'auto',
              color: darkMode
                ? (status === 'ok' ? '#B3FF6B' : '#FF7A47')
                : '#FFFFFF',
              fontWeight: 600,
              background: darkMode
                ? 'transparent'
                : (status === 'ok' ? '#22C55E' : '#EF4444'),
              padding: darkMode ? '0' : '2px 8px',
              borderRadius: darkMode ? '0' : '4px'
            }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
