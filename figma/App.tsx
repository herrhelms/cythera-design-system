import { useState } from 'react';
import { StatusPanel } from './components/StatusPanel';
import { TelemetryGrid } from './components/TelemetryGrid';
import { ComponentShowcase } from './components/ComponentShowcase';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? 'dark' : ''}>
      {/* Atmospheric Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0" style={{
          background: darkMode
            ? 'linear-gradient(135deg, #050810 0%, #0F1419 50%, #1A2B4E 100%)'
            : 'linear-gradient(135deg, #DBEAFE 0%, #E0E7FF 33%, #F3E8FF 66%, #FEF3C7 100%)'
        }}></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: darkMode
            ? 'linear-gradient(rgba(0, 200, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 200, 255, 0.05) 1px, transparent 1px)'
            : 'linear-gradient(rgba(125, 211, 252, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(125, 211, 252, 0.12) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>
        <div className="absolute inset-0" style={{
          background: darkMode
            ? 'radial-gradient(ellipse at center, transparent 60%, rgba(0, 0, 0, 0.7))'
            : 'radial-gradient(ellipse at center, transparent 60%, rgba(255, 255, 255, 0.3))'
        }}></div>
      </div>

      <div className="min-h-screen text-foreground relative">
        {/* Header */}
        <header className="sticky top-0 z-50" style={{
          background: darkMode ? 'rgba(1, 3, 8, 0.97)' : 'rgba(255, 255, 255, 0.95)',
          borderBottom: darkMode
            ? '1px solid rgba(0, 180, 255, 0.13)'
            : '1px solid rgba(125, 211, 252, 0.25)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}>
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: darkMode ? '#B3FF6B' : '#22C55E',
                    boxShadow: darkMode
                      ? '0 0 10px rgba(179, 255, 107, 0.6)'
                      : '0 0 8px rgba(34, 197, 94, 0.5)',
                    animation: 'pulse 1.4s ease-in-out infinite'
                  }}></div>
                  <h1 className="text-xl" style={{
                    fontFamily: 'Orbitron, monospace',
                    fontWeight: 900,
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                    background: darkMode
                      ? 'linear-gradient(90deg, #00c8ff, #a0ff60)'
                      : 'linear-gradient(90deg, #60A5FA, #A78BFA)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>Cythera</h1>
                </div>
                <div style={{
                  width: '1px',
                  height: '32px',
                  background: darkMode
                    ? 'rgba(0, 200, 255, 0.2)'
                    : 'rgba(125, 211, 252, 0.3)'
                }}></div>
                <span style={{
                  fontFamily: 'Share Tech Mono, monospace',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  color: darkMode
                    ? 'rgba(200, 232, 255, 0.42)'
                    : 'rgba(100, 116, 139, 0.7)',
                  textTransform: 'uppercase'
                }}>v1.0.0 // accessible</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  padding: '8px 20px',
                  borderRadius: '6px',
                  border: darkMode
                    ? '1px solid rgba(0, 200, 255, 0.35)'
                    : '1px solid rgba(96, 165, 250, 0.4)',
                  background: darkMode
                    ? 'rgba(0, 200, 255, 0.18)'
                    : 'rgba(96, 165, 250, 0.15)',
                  color: darkMode ? '#00c8ff' : '#2563EB',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  if (darkMode) {
                    e.currentTarget.style.background = 'rgba(0, 200, 255, 0.3)';
                    e.currentTarget.style.boxShadow = '0 0 18px rgba(0, 200, 255, 0.28)';
                  } else {
                    e.currentTarget.style.background = 'rgba(96, 165, 250, 0.25)';
                    e.currentTarget.style.boxShadow = '0 0 18px rgba(96, 165, 250, 0.3)';
                  }
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = darkMode
                    ? 'rgba(0, 200, 255, 0.18)'
                    : 'rgba(96, 165, 250, 0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-12 space-y-8">
          {/* Hero Section */}
          <section className="text-center py-12">
            <h1 className="mb-4" style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '3rem',
              fontWeight: 900,
              letterSpacing: '6px',
              textTransform: 'uppercase',
              textShadow: darkMode
                ? '0 0 40px rgba(0, 200, 255, 0.9), 0 0 80px rgba(0, 200, 255, 0.5)'
                : '0 0 30px rgba(96, 165, 250, 0.4), 0 0 60px rgba(167, 139, 250, 0.3)',
              color: darkMode ? '#c8e8ff' : '#1E3A8A'
            }}>CYTHERA</h1>
            <p style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '1.125rem',
              color: darkMode ? 'rgba(200, 232, 255, 0.7)' : 'rgba(30, 58, 138, 0.8)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              A futuristic design system for modern web applications. Built with accessibility,
              {darkMode ? ' neon aesthetics,' : ' pastel aesthetics,'} and sci-fi inspired components.
            </p>
          </section>

          {/* Status & Telemetry */}
          <div className="grid md:grid-cols-2 gap-6">
            <StatusPanel darkMode={darkMode} />
            <TelemetryGrid darkMode={darkMode} />
          </div>

          {/* Component Showcase */}
          <ComponentShowcase darkMode={darkMode} />

          {/* Typography Showcase */}
          <section style={{
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
            }}>Typography System</div>

            <div className="space-y-6">
              <div>
                <div style={{
                  fontFamily: 'Share Tech Mono, monospace',
                  fontSize: '8px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: darkMode
                    ? 'rgba(200, 232, 255, 0.42)'
                    : 'rgba(100, 116, 139, 0.7)',
                  marginBottom: '8px'
                }}>Display Font (Orbitron)</div>
                <h1 style={{
                  color: darkMode ? '#c8e8ff' : '#1E3A8A'
                }}>The Future of Design</h1>
              </div>

              <div>
                <div style={{
                  fontFamily: 'Share Tech Mono, monospace',
                  fontSize: '8px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: darkMode
                    ? 'rgba(200, 232, 255, 0.42)'
                    : 'rgba(100, 116, 139, 0.7)',
                  marginBottom: '8px'
                }}>Body Font (Rajdhani)</div>
                <p style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '1rem',
                  color: darkMode ? '#c8e8ff' : '#1A1F3A',
                  lineHeight: '1.6'
                }}>
                  This is body text using Rajdhani, designed for excellent readability across all screen sizes.
                  It maintains clarity while providing a modern, clean aesthetic perfect for {darkMode ? 'sci-fi' : 'modern'} interfaces.
                </p>
              </div>

              <div>
                <div style={{
                  fontFamily: 'Share Tech Mono, monospace',
                  fontSize: '8px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: darkMode
                    ? 'rgba(200, 232, 255, 0.42)'
                    : 'rgba(100, 116, 139, 0.7)',
                  marginBottom: '8px'
                }}>Mono Font (Geist Mono)</div>
                <code style={{
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: '0.875rem',
                  background: darkMode
                    ? 'rgba(0, 200, 255, 0.08)'
                    : 'rgba(96, 165, 250, 0.1)',
                  border: darkMode
                    ? '1px solid rgba(0, 200, 255, 0.15)'
                    : '1px solid rgba(96, 165, 250, 0.2)',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  display: 'block',
                  color: darkMode ? '#00c8ff' : '#1E3A8A'
                }}>
                  const cythera = &#123; accessible: true, modern: true &#125;;
                </code>
              </div>
            </div>
          </section>

          {/* Color Palette */}
          <section style={{
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
            }}>Color Spectrum</div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(darkMode
                ? [
                    { name: 'Cyan', color: '#00D9FF', rgb: '0, 217, 255' },
                    { name: 'Orange', color: '#FF7A47', rgb: '255, 122, 71' },
                    { name: 'Lime', color: '#B3FF6B', rgb: '179, 255, 107' },
                    { name: 'Purple', color: '#C4A3FF', rgb: '196, 163, 255' }
                  ]
                : [
                    { name: 'Blue', color: '#3B82F6', rgb: '59, 130, 246' },
                    { name: 'Orange', color: '#F59E0B', rgb: '245, 158, 11' },
                    { name: 'Green', color: '#22C55E', rgb: '34, 197, 94' },
                    { name: 'Purple', color: '#8B5CF6', rgb: '139, 92, 246' }
                  ]
              ).map(({ name, color, rgb }) => (
                <div key={name} style={{
                  background: darkMode
                    ? 'rgba(0, 6, 20, 0.92)'
                    : 'rgba(248, 250, 255, 0.8)',
                  border: darkMode
                    ? '1px solid rgba(0, 180, 255, 0.13)'
                    : '1px solid rgba(125, 211, 252, 0.2)',
                  borderRadius: '6px',
                  padding: '16px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: color,
                    borderRadius: '8px',
                    margin: '0 auto 12px',
                    boxShadow: darkMode
                      ? `0 0 18px rgba(${rgb}, 0.28)`
                      : `0 0 15px rgba(${rgb}, 0.35)`
                  }}></div>
                  <div style={{
                    fontFamily: 'Orbitron, monospace',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: color,
                    marginBottom: '4px'
                  }}>{name}</div>
                  <div style={{
                    fontFamily: 'Share Tech Mono, monospace',
                    fontSize: '8px',
                    color: darkMode
                      ? 'rgba(200, 232, 255, 0.42)'
                      : 'rgba(100, 116, 139, 0.7)'
                  }}>{color}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Documentation CTA */}
          <section className="text-center py-8" style={{
            background: darkMode
              ? 'rgba(2, 12, 32, 0.92)'
              : 'rgba(255, 255, 255, 0.85)',
            border: darkMode
              ? '1px solid rgba(0, 180, 255, 0.13)'
              : '1px solid rgba(125, 211, 252, 0.25)',
            borderRadius: '8px',
            padding: '48px 32px',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: darkMode
              ? 'none'
              : '0 4px 8px -2px rgba(125, 211, 252, 0.25)'
          }}>
            <h2 className="mb-4" style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '1.5rem',
              fontWeight: 800,
              letterSpacing: '3px',
              color: darkMode ? '#c8e8ff' : '#1E3A8A'
            }}>COMPLETE DOCUMENTATION</h2>
            <p style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '1rem',
              color: darkMode
                ? 'rgba(200, 232, 255, 0.7)'
                : 'rgba(30, 58, 138, 0.8)',
              maxWidth: '600px',
              margin: '0 auto 32px'
            }}>
              View the comprehensive DESIGN_SYSTEM.md file for detailed specifications,
              accessibility guidelines, color tokens, typography scales, and implementation examples.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['fonts.css', 'theme.css', 'DESIGN_SYSTEM.md'].map((file) => (
                <div key={file} style={{
                  background: darkMode
                    ? 'rgba(0, 200, 255, 0.08)'
                    : 'rgba(96, 165, 250, 0.15)',
                  border: darkMode
                    ? '1px solid rgba(0, 200, 255, 0.25)'
                    : '1px solid rgba(96, 165, 250, 0.3)',
                  borderRadius: '6px',
                  padding: '8px 16px'
                }}>
                  <code style={{
                    fontFamily: 'Share Tech Mono, monospace',
                    fontSize: '10px',
                    color: darkMode ? '#00c8ff' : '#1E3A8A',
                    letterSpacing: '1px'
                  }}>{file}</code>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer style={{
          background: darkMode
            ? 'rgba(1, 3, 8, 0.97)'
            : 'rgba(255, 255, 255, 0.95)',
          borderTop: darkMode
            ? '1px solid rgba(0, 180, 255, 0.13)'
            : '1px solid rgba(125, 211, 252, 0.25)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          marginTop: '64px'
        }}>
          <div className="max-w-6xl mx-auto px-6 py-6 text-center">
            <p style={{
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '9px',
              color: darkMode
                ? 'rgba(200, 232, 255, 0.42)'
                : 'rgba(100, 116, 139, 0.7)',
              letterSpacing: '1px'
            }}>
              CYTHERA DESIGN SYSTEM v1.0.0 // WCAG AA+ COMPLIANT // 2026
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
