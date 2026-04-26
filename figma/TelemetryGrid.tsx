export function TelemetryGrid({ darkMode = true }: { darkMode?: boolean }) {
  const metrics = darkMode
    ? [
        { label: 'Components', value: '24', color: '#00D9FF' },
        { label: 'Color Tokens', value: '42', color: '#B3FF6B' },
        { label: 'Font Variants', value: '3', color: '#FF7A47' },
        { label: 'Gradients', value: '4', color: '#FFC747' }
      ]
    : [
        { label: 'Components', value: '24', color: '#3B82F6' },
        { label: 'Color Tokens', value: '42', color: '#22C55E' },
        { label: 'Font Variants', value: '3', color: '#F59E0B' },
        { label: 'Gradients', value: '4', color: '#8B5CF6' }
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
      }}>Telemetry Data</div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px'
      }}>
        {metrics.map(({ label, value, color }) => (
          <div key={label} style={{
            background: darkMode
              ? 'rgba(0, 6, 20, 0.7)'
              : 'rgba(248, 250, 255, 0.8)',
            border: darkMode
              ? '1px solid rgba(0, 180, 255, 0.13)'
              : '1px solid rgba(125, 211, 252, 0.2)',
            borderRadius: '4px',
            padding: '12px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${color}${darkMode ? '80' : '60'}, transparent)`
            }}></div>
            <div style={{
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '7px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: darkMode
                ? 'rgba(200, 232, 255, 0.42)'
                : 'rgba(100, 116, 139, 0.7)',
              marginBottom: '4px'
            }}>{label}</div>
            <div style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: color
            }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
