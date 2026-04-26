export function ComponentShowcase({ darkMode = true }: { darkMode?: boolean }) {
  return (
    <div style={{
      background: darkMode
        ? 'rgba(2, 12, 32, 0.92)'
        : 'rgba(255, 255, 255, 0.85)',
      border: darkMode
        ? '1px solid rgba(0, 180, 255, 0.13)'
        : '1px solid rgba(125, 211, 252, 0.25)',
      borderRadius: '8px',
      padding: '32px',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      boxShadow: darkMode
        ? 'none'
        : '0 4px 8px -2px rgba(125, 211, 252, 0.25)'
    }}>
      <div style={{
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: '9px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: darkMode
          ? 'rgba(200, 232, 255, 0.42)'
          : 'rgba(100, 116, 139, 0.7)',
        marginBottom: '24px',
        paddingBottom: '8px',
        borderBottom: darkMode
          ? '1px solid rgba(0, 180, 255, 0.13)'
          : '1px solid rgba(125, 211, 252, 0.25)'
      }}>Component Library</div>

      {/* Buttons */}
      <div className="mb-8">
        <div style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '8px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: darkMode
            ? 'rgba(200, 232, 255, 0.42)'
            : 'rgba(100, 116, 139, 0.7)',
          marginBottom: '12px'
        }}>Action Buttons</div>
        <div className="flex flex-wrap gap-3">
          <Button color="cyan" label="Initialize" darkMode={darkMode} />
          <Button color="orange" label="Deploy" darkMode={darkMode} />
          <Button color="lime" label="Activate" darkMode={darkMode} />
        </div>
      </div>

      {/* Badges */}
      <div className="mb-8">
        <div style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '8px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: darkMode
            ? 'rgba(200, 232, 255, 0.42)'
            : 'rgba(100, 116, 139, 0.7)',
          marginBottom: '12px'
        }}>Status Badges</div>
        <div className="flex flex-wrap gap-2">
          <Badge color="cyan" label="ONLINE" darkMode={darkMode} />
          <Badge color="lime" label="ACTIVE" darkMode={darkMode} />
          <Badge color="orange" label="WARNING" darkMode={darkMode} />
          <Badge color="purple" label="INFO" darkMode={darkMode} />
        </div>
      </div>

      {/* Progress Bars */}
      <div>
        <div style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '8px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: darkMode
            ? 'rgba(200, 232, 255, 0.42)'
            : 'rgba(100, 116, 139, 0.7)',
          marginBottom: '12px'
        }}>Progress Indicators</div>
        <div className="space-y-3">
          <ProgressBar label="System Load" value={87} color="cyan" darkMode={darkMode} />
          <ProgressBar label="Memory Usage" value={64} color="lime" darkMode={darkMode} />
          <ProgressBar label="Network Activity" value={92} color="orange" darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

function Button({ color, label, darkMode }: { color: 'cyan' | 'orange' | 'lime'; label: string; darkMode: boolean }) {
  const colorsDark = {
    cyan: { rgb: '0, 217, 255', hex: '#00D9FF' },
    orange: { rgb: '255, 122, 71', hex: '#FF7A47' },
    lime: { rgb: '179, 255, 107', hex: '#B3FF6B' }
  };

  const colorsLight = {
    cyan: { rgb: '59, 130, 246', hex: '#3B82F6' },
    orange: { rgb: '245, 158, 11', hex: '#F59E0B' },
    lime: { rgb: '34, 197, 94', hex: '#22C55E' }
  };

  const { rgb, hex } = darkMode ? colorsDark[color] : colorsLight[color];
  const textColor = darkMode ? hex : '#FFFFFF';

  return (
    <button
      style={{
        fontFamily: 'Rajdhani, sans-serif',
        fontWeight: 600,
        fontSize: '0.75rem',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        padding: '8px 20px',
        borderRadius: '6px',
        border: `1px solid rgba(${rgb}, ${darkMode ? '0.35' : '0.5'})`,
        background: `rgba(${rgb}, ${darkMode ? '0.18' : '0.2'})`,
        color: textColor,
        cursor: 'pointer',
        transition: 'all 0.25s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `rgba(${rgb}, ${darkMode ? '0.3' : '0.35'})`;
        e.currentTarget.style.boxShadow = `0 0 18px rgba(${rgb}, ${darkMode ? '0.28' : '0.35'})`;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = `rgba(${rgb}, ${darkMode ? '0.18' : '0.2'})`;
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {label}
    </button>
  );
}

function Badge({ color, label, darkMode }: { color: 'cyan' | 'lime' | 'orange' | 'purple'; label: string; darkMode: boolean }) {
  const colorsDark = {
    cyan: { rgb: '0, 217, 255', hex: '#00D9FF' },
    lime: { rgb: '179, 255, 107', hex: '#B3FF6B' },
    orange: { rgb: '255, 122, 71', hex: '#FF7A47' },
    purple: { rgb: '196, 163, 255', hex: '#C4A3FF' }
  };

  const colorsLight = {
    cyan: { rgb: '59, 130, 246', hex: '#3B82F6' },
    lime: { rgb: '34, 197, 94', hex: '#22C55E' },
    orange: { rgb: '245, 158, 11', hex: '#F59E0B' },
    purple: { rgb: '139, 92, 246', hex: '#8B5CF6' }
  };

  const { rgb, hex } = darkMode ? colorsDark[color] : colorsLight[color];
  const textColor = darkMode ? hex : '#FFFFFF';

  return (
    <div style={{
      fontFamily: 'Share Tech Mono, monospace',
      fontSize: '7px',
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      padding: '4px 12px',
      borderRadius: '4px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      background: `rgba(${rgb}, ${darkMode ? '0.12' : '0.2'})`,
      color: textColor,
      border: `1px solid rgba(${rgb}, ${darkMode ? '0.25' : '0.4'})`
    }}>
      <div style={{
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        background: hex
      }}></div>
      {label}
    </div>
  );
}

function ProgressBar({ label, value, color, darkMode }: { label: string; value: number; color: 'cyan' | 'lime' | 'orange'; darkMode: boolean }) {
  const colorsDark = {
    cyan: { rgb: '0, 217, 255', hex: '#00D9FF' },
    lime: { rgb: '179, 255, 107', hex: '#B3FF6B' },
    orange: { rgb: '255, 122, 71', hex: '#FF7A47' }
  };

  const colorsLight = {
    cyan: { rgb: '59, 130, 246', hex: '#3B82F6' },
    lime: { rgb: '34, 197, 94', hex: '#22C55E' },
    orange: { rgb: '245, 158, 11', hex: '#F59E0B' }
  };

  const { rgb, hex } = darkMode ? colorsDark[color] : colorsLight[color];

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '8px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: darkMode ? 'rgba(200, 232, 255, 0.7)' : 'rgba(100, 116, 139, 0.9)'
        }}>{label}</span>
        <span style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: '10px',
          fontWeight: 700,
          color: hex
        }}>{value}%</span>
      </div>
      <div style={{
        width: '100%',
        height: '4px',
        background: `rgba(${rgb}, 0.15)`,
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${value}%`,
          background: hex,
          borderRadius: '2px',
          transition: 'width 0.5s ease'
        }}></div>
      </div>
    </div>
  );
}
