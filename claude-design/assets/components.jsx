// Cythera component primitives — vanilla JSX wrappers around the cythera.css classes.
// These are faithful to the shadcn API (name + variant + size) but rendered with our own CSS.

const { useState, useRef, useEffect, useMemo, useCallback, createContext, useContext } = React;

/* ---------------- Button ---------------- */
function Button({ variant = 'default', size = 'default', className = '', children, asChild, ...props }) {
  const cls = [
    'btn',
    `btn-${variant}`,
    size === 'sm' && 'btn-sm',
    size === 'lg' && 'btn-lg',
    size === 'icon' && 'btn-icon',
    className,
  ].filter(Boolean).join(' ');
  return <button className={cls} {...props}>{children}</button>;
}

/* ---------------- Badge ---------------- */
function Badge({ variant = 'default', className = '', children, ...props }) {
  return <span className={`badge badge-${variant} ${className}`} {...props}>{children}</span>;
}

/* ---------------- Input / Textarea / Label ---------------- */
function Input({ className = '', ...props }) {
  return <input className={`input ${className}`} {...props} />;
}
function Textarea({ className = '', ...props }) {
  return <textarea className={`textarea ${className}`} {...props} />;
}
function Label({ className = '', children, ...props }) {
  return <label className={`label ${className}`} {...props}>{children}</label>;
}

/* ---------------- Checkbox / Switch / Radio ---------------- */
function Checkbox({ className = '', ...props }) {
  return <input type="checkbox" className={`checkbox ${className}`} {...props} />;
}
function Switch({ className = '', ...props }) {
  return <input type="checkbox" className={`switch ${className}`} {...props} />;
}
function Radio({ className = '', ...props }) {
  return <input type="radio" className={`radio ${className}`} {...props} />;
}

/* ---------------- Card ---------------- */
function Card({ className = '', children, ...props }) {
  return <div className={`card ${className}`} {...props}>{children}</div>;
}
function CardHeader({ className = '', children, ...props }) {
  return <div className={`card-header ${className}`} {...props}>{children}</div>;
}
function CardTitle({ className = '', children, ...props }) {
  return <div className={`card-title ${className}`} {...props}>{children}</div>;
}
function CardDescription({ className = '', children, ...props }) {
  return <div className={`card-description ${className}`} {...props}>{children}</div>;
}
function CardContent({ className = '', children, ...props }) {
  return <div className={`card-content ${className}`} {...props}>{children}</div>;
}
function CardFooter({ className = '', children, ...props }) {
  return <div className={`card-footer ${className}`} {...props}>{children}</div>;
}

/* ---------------- Alert ---------------- */
function Alert({ variant = 'info', icon, title, children, className = '' }) {
  const iconMap = { info: 'info', success: 'checkCircle', warning: 'alert', destructive: 'alertCircle' };
  return (
    <div className={`alert alert-${variant} ${className}`} role="alert">
      <Icon name={icon || iconMap[variant]} size={18} />
      {title && <div className="alert-title">{title}</div>}
      {children && <div className="alert-description">{children}</div>}
    </div>
  );
}

/* ---------------- Tabs ---------------- */
function Tabs({ value, onValueChange, defaultValue, children }) {
  const [internal, setInternal] = useState(defaultValue);
  const v = value !== undefined ? value : internal;
  const set = onValueChange || setInternal;
  return <TabsCtx.Provider value={{ value: v, set }}>{children}</TabsCtx.Provider>;
}
const TabsCtx = createContext({ value: '', set: () => {} });
function TabsList({ children, className = '' }) {
  return <div className={`tabs-list ${className}`} role="tablist">{children}</div>;
}
function TabsTrigger({ value, children, ...props }) {
  const { value: cur, set } = useContext(TabsCtx);
  return (
    <button
      role="tab"
      data-state={cur === value ? 'active' : 'inactive'}
      className="tabs-trigger"
      onClick={() => set(value)}
      {...props}
    >{children}</button>
  );
}
function TabsContent({ value, children, className = '' }) {
  const { value: cur } = useContext(TabsCtx);
  if (cur !== value) return null;
  return <div className={className} role="tabpanel">{children}</div>;
}

/* ---------------- Avatar ---------------- */
function Avatar({ className = '', children, src, alt, fallback, style = {}, size = 40 }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className={`avatar ${className}`} style={{ width: size, height: size, ...style }}>
      {src && !errored
        ? <img src={src} alt={alt || ''} onError={() => setErrored(true)} />
        : <span>{fallback || children}</span>}
    </div>
  );
}

/* ---------------- Separator ---------------- */
function Separator({ orientation = 'horizontal', className = '' }) {
  return <div className={`${orientation === 'vertical' ? 'separator-v' : 'separator'} ${className}`} role="separator" />;
}

/* ---------------- Progress ---------------- */
function Progress({ value = 0, className = '' }) {
  return <div className={`progress ${className}`}><div style={{ width: `${value}%` }} /></div>;
}

/* ---------------- Slider ---------------- */
function Slider({ value, onChange, min = 0, max = 100, step = 1, className = '' }) {
  return (
    <input type="range" className={`slider ${className}`}
      min={min} max={max} step={step} value={value}
      onChange={(e) => onChange?.(Number(e.target.value))}
    />
  );
}

/* ---------------- Select (native, lightweight) ---------------- */
function Select({ value, onChange, children, className = '', style = {} }) {
  return (
    <div className={`select-trigger ${className}`} style={{ padding: 0, position: 'relative', ...style }}>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          appearance: 'none', WebkitAppearance: 'none',
          width: '100%', height: '100%',
          background: 'transparent', border: 0, color: 'var(--foreground)',
          padding: '0 36px 0 12px',
          fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)',
          outline: 'none', cursor: 'pointer'
        }}
      >{children}</select>
      <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--muted-foreground)' }}>
        <Icon name="chevronDown" size={14} />
      </span>
    </div>
  );
}

/* ---------------- Tooltip (basic) ---------------- */
function Tooltip({ content, children, side = 'top' }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span className="tooltip" style={{
          [side === 'top' ? 'bottom' : 'top']: 'calc(100% + 6px)',
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 50,
        }}>{content}</span>
      )}
    </span>
  );
}

/* ---------------- Dialog (modal) ---------------- */
function Dialog({ open, onOpenChange, title, description, children, footer, size = 'md' }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onOpenChange?.(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);
  if (!open) return null;
  const widthMap = { sm: 380, md: 480, lg: 640, xl: 800 };
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'grid', placeItems: 'center' }}>
      <div onClick={() => onOpenChange?.(false)}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
      <div className="card" style={{
        position: 'relative', width: 'calc(100% - 32px)', maxWidth: widthMap[size],
        background: 'var(--card)', border: '1px solid var(--border-bright)',
        boxShadow: 'var(--shadow-xl)',
      }}>
        <button aria-label="Close" onClick={() => onOpenChange?.(false)}
          style={{
            position: 'absolute', top: 14, right: 14, background: 'transparent', border: 0,
            color: 'var(--muted-foreground)', cursor: 'pointer', padding: 4,
            borderRadius: 6, display: 'inline-flex'
          }}>
          <Icon name="close" size={16} />
        </button>
        {(title || description) && (
          <div className="card-header">
            {title && <div className="card-title">{title}</div>}
            {description && <div className="card-description">{description}</div>}
          </div>
        )}
        <div className="card-content">{children}</div>
        {footer && <div className="card-footer" style={{ justifyContent: 'flex-end', gap: 8 }}>{footer}</div>}
      </div>
    </div>
  );
}

/* ---------------- Skeleton ---------------- */
function Skeleton({ className = '', style = {} }) {
  return <div className={className} style={{
    background: 'linear-gradient(90deg, var(--muted) 0%, color-mix(in srgb, var(--muted) 70%, var(--card)) 50%, var(--muted) 100%)',
    backgroundSize: '200% 100%',
    borderRadius: 6,
    animation: 'cy-skel 1.6s ease-in-out infinite',
    ...style
  }} />;
}

/* ---------------- Toast ---------------- */
const ToastCtx = createContext({ toast: () => {} });
function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const toast = useCallback((opts) => {
    const id = Math.random().toString(36).slice(2);
    setItems((prev) => [...prev, { id, ...opts }]);
    setTimeout(() => setItems((p) => p.filter((t) => t.id !== id)), opts.duration || 3500);
  }, []);
  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div style={{ position: 'fixed', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 200 }}>
        {items.map((t) => (
          <div key={t.id} className="card" style={{
            minWidth: 280, maxWidth: 380,
            border: `1px solid var(--${t.variant === 'destructive' ? 'destructive' : 'border-bright'})`,
            animation: 'cy-toast 0.25s ease-out',
          }}>
            <div className="card-content" style={{ padding: 14, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <Icon name={t.variant === 'destructive' ? 'alertCircle' : t.variant === 'success' ? 'checkCircle' : 'info'} size={18}
                style={{ color: `var(--${t.variant === 'destructive' ? 'destructive' : t.variant === 'success' ? 'success' : 'info'})`, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                {t.title && <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{t.title}</div>}
                {t.description && <div style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)', marginTop: 2 }}>{t.description}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
const useToast = () => useContext(ToastCtx);

/* ---------------- Inject keyframe ---------------- */
if (typeof document !== 'undefined' && !document.getElementById('cy-keyframes')) {
  const s = document.createElement('style');
  s.id = 'cy-keyframes';
  s.textContent = `
    @keyframes cy-skel { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
    @keyframes cy-toast { from { transform: translateY(8px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  `;
  document.head.appendChild(s);
}

Object.assign(window, {
  Button, Badge, Input, Textarea, Label, Checkbox, Switch, Radio,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Alert, Tabs, TabsList, TabsTrigger, TabsContent,
  Avatar, Separator, Progress, Slider, Select, Tooltip, Dialog, Skeleton,
  ToastProvider, useToast,
});
