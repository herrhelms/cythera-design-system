// Cythera showcase sections — tokens, type, color, components, app patterns.
const { useState: uS, useEffect: uE } = React;

/* =================== TOKENS =================== */
function TokensSection() {
  const spacing = [
    ['xs', '0.25rem', '4px'], ['sm', '0.5rem', '8px'], ['md', '1rem', '16px'],
    ['lg', '1.5rem', '24px'], ['xl', '2rem', '32px'], ['2xl', '3rem', '48px'], ['3xl', '4rem', '64px'],
  ];
  const radii = [['sm', '6px'], ['md', '8px'], ['lg', '12px'], ['xl', '16px'], ['full', '9999px']];
  const shadows = ['sm', 'md', 'lg', 'xl', 'glow'];
  return (
    <section id="tokens" style={{ display: 'grid', gap: 24 }}>
      <SectionHeader kicker="01 / Foundations" title="Design Tokens" subtitle="Every visual decision in Cythera resolves to a CSS custom property. Themes swap by toggling a single .dark class on the root." />
      <div className="cy-section-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        <Card>
          <CardHeader><CardTitle>Spacing scale</CardTitle><CardDescription>4 / 8 px rhythm. Stick to the scale.</CardDescription></CardHeader>
          <CardContent style={{ display: 'grid', gap: 10 }}>
            {spacing.map(([k, v, px]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <code style={{ width: 60, fontSize: 12, color: 'var(--muted-foreground)' }}>--spacing-{k}</code>
                <div style={{ height: 8, width: v, background: 'var(--primary)', borderRadius: 4 }} />
                <span style={{ fontSize: 12, color: 'var(--muted-foreground)', marginLeft: 'auto' }}>{px}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Border radius</CardTitle><CardDescription>Soft corners; never sharp.</CardDescription></CardHeader>
          <CardContent style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {radii.map(([k, v]) => (
              <div key={k} style={{ textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, background: 'var(--muted)', border: '1px solid var(--border-bright)', borderRadius: v }} />
                <div style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>--radius-{k}</div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Elevation</CardTitle><CardDescription>Light mode: soft cyan tint. Dark: deep + glow.</CardDescription></CardHeader>
          <CardContent style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: 16 }}>
            {shadows.map((s) => (
              <div key={s} style={{ textAlign: 'center' }}>
                <div style={{ height: 48, background: 'var(--card)', borderRadius: 10, boxShadow: `var(--shadow-${s})`, border: '1px solid var(--border)' }} />
                <div style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 8, fontFamily: 'var(--font-mono)' }}>{s}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

/* =================== TYPOGRAPHY =================== */
function TypographySection() {
  return (
    <section id="type" style={{ display: 'grid', gap: 24 }}>
      <SectionHeader kicker="02 / Foundations" title="Typography" subtitle="Three families with distinct jobs. Display for impact, Sans for everything, Mono for technical data." />
      <div className="cy-section-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        {[
          { fam: 'Orbitron', cssvar: '--font-display', role: 'Display & wordmark', sample: 'CYTHERA', style: { fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '4px', fontSize: 32 } },
          { fam: 'Rajdhani', cssvar: '--font-sans', role: 'UI & body', sample: 'The future of design', style: { fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 24 } },
          { fam: 'Geist Mono', cssvar: '--font-mono', role: 'Code & telemetry', sample: 'const accessible = true', style: { fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 18 } },
        ].map((f) => (
          <Card key={f.fam}>
            <CardHeader>
              <div className="cy-tech-label" style={{ marginBottom: 6 }}>{f.role}</div>
              <CardTitle style={{ fontSize: 22 }}>{f.fam}</CardTitle>
              <CardDescription>var({f.cssvar})</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ ...f.style, color: 'var(--foreground)', marginBottom: 16 }}>{f.sample}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {[300, 400, 500, 600, 700].map((w) => (
                  <Badge key={w} variant="outline">{w}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Type scale</CardTitle><CardDescription>From 12 px caption to 48 px hero. All under <code>--text-*</code>.</CardDescription></CardHeader>
        <CardContent>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              ['5xl', '3rem', 'Hero'], ['4xl', '2.25rem', 'H1 / Display'],
              ['3xl', '1.875rem', 'H2'], ['2xl', '1.5rem', 'H3'],
              ['xl', '1.25rem', 'H4'], ['lg', '1.125rem', 'Lead'],
              ['base', '1rem', 'Body'], ['sm', '0.875rem', 'Helper'], ['xs', '0.75rem', 'Caption / kbd'],
            ].map(([k, v, role]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'baseline', gap: 16, paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>
                <code style={{ width: 80, fontSize: 11, color: 'var(--muted-foreground)' }}>--text-{k}</code>
                <span style={{ fontSize: v, fontFamily: ['5xl', '4xl', '3xl'].includes(k) ? 'var(--font-display)' : 'var(--font-sans)', fontWeight: ['5xl', '4xl'].includes(k) ? 700 : 500 }}>{role}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>{v}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

/* =================== COLORS =================== */
function ColorsSection({ darkMode }) {
  const cyt = darkMode
    ? [
        { name: 'Cyan', val: '#00D9FF', token: '--cythera-cyan', text: '8.2:1' },
        { name: 'Lime', val: '#B3FF6B', token: '--cythera-lime', text: '11.2:1' },
        { name: 'Orange', val: '#FF7A47', token: '--cythera-orange', text: '7.1:1' },
        { name: 'Purple', val: '#C4A3FF', token: '--cythera-purple', text: '8.5:1' },
      ]
    : [
        { name: 'Cyan', val: '#7DD3FC', token: '--cythera-cyan', text: '7.2:1' },
        { name: 'Lime', val: '#BEF264', token: '--cythera-lime', text: '7.5:1' },
        { name: 'Orange', val: '#FDBA74', token: '--cythera-orange', text: '6.8:1' },
        { name: 'Purple', val: '#C4B5FD', token: '--cythera-purple', text: '7.1:1' },
      ];
  const semantic = ['primary', 'secondary', 'accent', 'success', 'warning', 'destructive', 'info', 'muted'];
  return (
    <section id="color" style={{ display: 'grid', gap: 24 }}>
      <SectionHeader kicker="03 / Foundations" title="Color System" subtitle="Two cohesive palettes—neon dark, pastel light. Every token meets WCAG AA+ on its mode." />
      <Card>
        <CardHeader><CardTitle>Cythera signature colors</CardTitle><CardDescription>The four-color brand palette. Contrast ratios shown are for text against the mode background.</CardDescription></CardHeader>
        <CardContent className="cy-color-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
          {cyt.map((c) => (
            <div key={c.name} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <div style={{ height: 80, background: c.val, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, boxShadow: `inset 0 0 30px color-mix(in srgb, ${c.val} 20%, transparent)` }} />
              </div>
              <div style={{ padding: 12, background: 'var(--card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, letterSpacing: 1 }}>{c.name.toUpperCase()}</span>
                  <Badge variant="outline" style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>{c.text}</Badge>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted-foreground)' }}>{c.val}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted-foreground)', marginTop: 2 }}>{c.token}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Semantic tokens</CardTitle><CardDescription>Functional roles—use these instead of literal colors.</CardDescription></CardHeader>
        <CardContent className="cy-semantic-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
          {semantic.map((s) => (
            <div key={s} style={{ borderRadius: 8, padding: 12, background: `var(--${s})`, color: `var(--${s}-foreground)` }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase' }}>{s}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, marginTop: 4, opacity: 0.85 }}>--{s}</div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Surface hierarchy</CardTitle><CardDescription>Background → Card → Input → Border layered for depth.</CardDescription></CardHeader>
        <CardContent>
          <div style={{ background: 'var(--background)', borderRadius: 8, padding: 24, border: '1px solid var(--border)' }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 18, marginBottom: 12 }}>
              <span className="cy-tech-label">card</span>
              <div style={{ background: 'var(--input-background)', border: '1px solid var(--border-bright)', borderRadius: 6, padding: 10, marginTop: 10 }}>
                <span className="cy-tech-label">input-background</span>
              </div>
            </div>
            <span className="cy-tech-label">background</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

/* =================== COMPONENT GALLERY =================== */
function ComponentsSection() {
  const [tab, setTab] = uS('account');
  const [progress, setProgress] = uS(64);
  const [slider, setSlider] = uS(50);
  const [check, setCheck] = uS(true);
  const [sw, setSw] = uS(true);
  const [dialogOpen, setDialogOpen] = uS(false);
  const { toast } = useToast();
  return (
    <section id="components" style={{ display: 'grid', gap: 24 }}>
      <SectionHeader kicker="04 / Library" title="Components" subtitle="Forty-five primitives drawn from shadcn/ui, retuned for Cythera's neon-meets-pastel palette." />

      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>Six variants across four sizes. Primary is reserved for the single most important action on a screen — its high-saturation blue is colorblind-safe against the purple secondary.</CardDescription>
        </CardHeader>
        <CardContent style={{ display: 'grid', gap: 18 }}>
          {/* Variant × size matrix */}
          <div style={{ overflow: 'auto', border: '1px solid var(--border)', borderRadius: 10 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-tech)', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted-foreground)', width: 120 }}>Variant</th>
                  {['sm', 'default', 'lg', 'icon'].map((s) => (
                    <th key={s} style={{ textAlign: 'center', padding: '12px 16px', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-tech)', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                      {s === 'default' ? 'default · md' : s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { v: 'default', label: 'Primary', use: 'Single CTA per view' },
                  { v: 'secondary', label: 'Secondary', use: 'Supporting actions' },
                  { v: 'outline', label: 'Outline', use: 'Tertiary, neutral' },
                  { v: 'ghost', label: 'Ghost', use: 'Inline / toolbar' },
                  { v: 'destructive', label: 'Destructive', use: 'Confirm-once' },
                  { v: 'link', label: 'Link', use: 'Inline navigation' },
                ].map((row) => (
                  <tr key={row.v} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{row.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 2 }}>{row.use}</div>
                    </td>
                    {['sm', 'default', 'lg', 'icon'].map((sz) => (
                      <td key={sz} style={{ padding: '14px 16px', textAlign: 'center', verticalAlign: 'middle' }}>
                        {sz === 'icon'
                          ? <Button variant={row.v} size="icon"><Icon name="zap" size={14} /></Button>
                          : <Button variant={row.v} size={sz === 'default' ? 'default' : sz}>
                              {row.v === 'link' ? 'Link →' : row.label}
                            </Button>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* States row */}
          <div>
            <div className="cy-tech-label" style={{ marginBottom: 10 }}>// states</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
              <Button>Default</Button>
              <Button className="hover-demo" style={{ background: 'var(--primary-hover)', boxShadow: '0 0 0 1px color-mix(in srgb, var(--primary) 60%, transparent), 0 6px 18px -2px color-mix(in srgb, var(--primary) 50%, transparent), 0 0 28px color-mix(in srgb, var(--primary) 45%, transparent)', transform: 'translateY(-1px)' }}>Hover</Button>
              <Button style={{ background: 'var(--primary-active)' }}>Active</Button>
              <Button style={{ boxShadow: '0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent)' }}>Focus</Button>
              <Button disabled>Disabled</Button>
              <Button><Icon name="rocket" size={14} />Leading icon</Button>
              <Button>Trailing icon<Icon name="chevronRight" size={14} /></Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="cy-section-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Filled for status, soft for metadata, outline for neutral tags.</CardDescription>
          </CardHeader>
          <CardContent style={{ display: 'grid', gap: 14 }}>
            <div>
              <div className="cy-tech-label" style={{ marginBottom: 8 }}>// status</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <Badge variant="success"><Icon name="check" size={10} />Live</Badge>
                <Badge variant="info">In review</Badge>
                <Badge variant="warning"><Icon name="alert" size={10} />Beta</Badge>
                <Badge variant="destructive"><Icon name="alertCircle" size={10} />Down</Badge>
              </div>
            </div>
            <div>
              <div className="cy-tech-label" style={{ marginBottom: 8 }}>// emphasis</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                <Badge>Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>
            <div>
              <div className="cy-tech-label" style={{ marginBottom: 8 }}>// inline pairings</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 600 }}>orion-prod</span>
                  <Badge variant="success"><span className="cy-pulse-dot" style={{ width: 6, height: 6 }} />Healthy</Badge>
                  <Badge variant="outline" style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>v2.4.1</Badge>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 600 }}>helios-edge</span>
                  <Badge variant="warning">Degraded</Badge>
                  <Badge variant="outline" style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>v2.4.0</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avatars</CardTitle>
            <CardDescription>Full-saturation brand fills — vivid neon in dark mode, pastel in light. Stacks use layered shadows for depth.</CardDescription>
          </CardHeader>
          <CardContent style={{ display: 'grid', gap: 18 }}>
            {/* Solo avatars — one per brand color */}
            <div>
              <div className="cy-tech-label" style={{ marginBottom: 10 }}>// brand fills</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                {[
                  { fb: 'EM', color: 'cyan',   text: 'Cyan' },
                  { fb: 'AR', color: 'lime',   text: 'Lime' },
                  { fb: 'JD', color: 'orange', text: 'Orange' },
                  { fb: 'PN', color: 'purple', text: 'Purple' },
                ].map((a) => (
                  <div key={a.color} style={{ textAlign: 'center' }}>
                    <div
                      className="avatar"
                      style={{
                        width: 48, height: 48,
                        background: `var(--cythera-${a.color})`,
                        color: 'var(--background)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        boxShadow: `0 0 0 2px var(--card), 0 0 20px color-mix(in srgb, var(--cythera-${a.color}) 50%, transparent), 0 6px 14px -2px color-mix(in srgb, var(--cythera-${a.color}) 35%, transparent)`,
                      }}
                    >{a.fb}</div>
                    <div className="cy-tech-label" style={{ marginTop: 6 }}>{a.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes ramp */}
            <div>
              <div className="cy-tech-label" style={{ marginBottom: 10 }}>// sizes</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                {[
                  { s: 24, fb: 'JD', color: 'cyan' },
                  { s: 32, fb: 'EM', color: 'lime' },
                  { s: 40, fb: 'AR', color: 'orange' },
                  { s: 56, fb: 'PN', color: 'purple' },
                  { s: 72, fb: 'CY', color: 'cyan' },
                ].map((a) => (
                  <div key={a.s} style={{ textAlign: 'center' }}>
                    <div
                      className="avatar"
                      style={{
                        width: a.s, height: a.s,
                        background: `var(--cythera-${a.color})`,
                        color: 'var(--background)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: Math.round(a.s * 0.36),
                        boxShadow: `0 0 0 2px var(--card), 0 4px 12px -2px color-mix(in srgb, var(--cythera-${a.color}) 35%, transparent)`,
                      }}
                    >{a.fb}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted-foreground)', marginTop: 6 }}>{a.s}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stacked group with strong overlapping shadows */}
            <div>
              <div className="cy-tech-label" style={{ marginBottom: 10 }}>// stack — overlapping</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', paddingLeft: 4 }}>
                  {[
                    { fb: 'JD', color: 'cyan' },
                    { fb: 'EM', color: 'lime' },
                    { fb: 'AR', color: 'orange' },
                    { fb: 'PN', color: 'purple' },
                    { fb: 'CY', color: 'cyan' },
                  ].map((a, i, arr) => (
                    <div
                      key={i}
                      className="avatar"
                      style={{
                        width: 40, height: 40,
                        background: `var(--cythera-${a.color})`,
                        color: 'var(--background)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: 13,
                        marginLeft: i ? -14 : 0,
                        zIndex: arr.length - i,
                        position: 'relative',
                        boxShadow: `0 0 0 3px var(--card), -6px 0 12px -4px color-mix(in srgb, var(--cythera-${a.color}) 55%, transparent), 0 6px 14px -3px color-mix(in srgb, var(--cythera-${a.color}) 45%, transparent)`,
                      }}
                    >{a.fb}</div>
                  ))}
                  <div
                    className="avatar"
                    style={{
                      width: 40, height: 40,
                      background: 'var(--muted)',
                      color: 'var(--foreground)',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      fontSize: 12,
                      marginLeft: -14,
                      position: 'relative',
                      boxShadow: '0 0 0 3px var(--card), -6px 0 12px -4px color-mix(in srgb, var(--foreground) 25%, transparent), 0 6px 14px -3px rgba(0,0,0,0.25)',
                    }}
                  >+8</div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--foreground)' }}>13 collaborators</div>
                  <div style={{ fontSize: 12, marginTop: 2 }}>Last active 2m ago</div>
                </div>
              </div>
            </div>

            {/* Variants — image, status, fallback */}
            <div>
              <div className="cy-tech-label" style={{ marginBottom: 10 }}>// variants</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', display: 'inline-flex' }}>
                  <div
                    className="avatar"
                    style={{
                      width: 48, height: 48,
                      background: 'var(--cythera-lime)',
                      color: 'var(--background)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 16,
                      boxShadow: '0 0 0 2px var(--card), 0 0 18px color-mix(in srgb, var(--cythera-lime) 45%, transparent)',
                    }}
                  >EM</div>
                  <span style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: 14, height: 14, borderRadius: '50%',
                    background: 'var(--success)',
                    border: '2px solid var(--card)',
                    boxShadow: '0 0 8px color-mix(in srgb, var(--success) 70%, transparent)',
                  }} />
                </div>
                <div style={{ position: 'relative', display: 'inline-flex' }}>
                  <div
                    className="avatar"
                    style={{
                      width: 48, height: 48,
                      background: 'var(--cythera-purple)',
                      color: 'var(--background)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 16,
                      boxShadow: '0 0 0 2px var(--card), 0 0 18px color-mix(in srgb, var(--cythera-purple) 45%, transparent)',
                    }}
                  >AR</div>
                  <span style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: 14, height: 14, borderRadius: '50%',
                    background: 'var(--warning)',
                    border: '2px solid var(--card)',
                  }} />
                </div>
                <div
                  className="avatar"
                  style={{
                    width: 48, height: 48,
                    background: 'var(--muted)',
                    color: 'var(--muted-foreground)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 16,
                    border: '1px dashed var(--border-bright)',
                  }}
                >?</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Form controls</CardTitle></CardHeader>
          <CardContent style={{ display: 'grid', gap: 12 }}>
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="you@cythera.io" />
              <div className="help">We'll never share your email.</div>
            </div>
            <div>
              <Label>Role</Label>
              <Select value="admin" onChange={() => {}}>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </Select>
            </div>
            <div>
              <Label>Bio</Label>
              <Textarea placeholder="Tell us about yourself…" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Toggles</CardTitle></CardHeader>
          <CardContent style={{ display: 'grid', gap: 14 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Checkbox checked={check} onChange={(e) => setCheck(e.target.checked)} />
              <span>Send me weekly updates</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Switch checked={sw} onChange={(e) => setSw(e.target.checked)} />
              <span>Enable telemetry</span>
            </label>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Radio name="r" defaultChecked /> Free</label>
              <label style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Radio name="r" /> Pro</label>
              <label style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Radio name="r" /> Enterprise</label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Progress & slider</CardTitle></CardHeader>
          <CardContent style={{ display: 'grid', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6, color: 'var(--muted-foreground)' }}>
                <span>Build progress</span><span>{progress}%</span>
              </div>
              <Progress value={progress} />
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                <Button size="sm" variant="outline" onClick={() => setProgress(Math.max(0, progress - 10))}>−10</Button>
                <Button size="sm" variant="outline" onClick={() => setProgress(Math.min(100, progress + 10))}>+10</Button>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6, color: 'var(--muted-foreground)' }}>
                <span>Throughput</span><span>{slider} MB/s</span>
              </div>
              <Slider value={slider} onChange={setSlider} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Tabs</CardTitle></CardHeader>
          <CardContent>
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="card-content" style={{ paddingLeft: 0, paddingRight: 0 }}>
                Settings for your profile, name, and avatar.
              </TabsContent>
              <TabsContent value="security" className="card-content" style={{ paddingLeft: 0, paddingRight: 0 }}>
                Two-factor auth, sessions, recovery codes.
              </TabsContent>
              <TabsContent value="api" className="card-content" style={{ paddingLeft: 0, paddingRight: 0 }}>
                Personal access tokens and webhooks.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Alerts</CardTitle><CardDescription>Four variants for system messages.</CardDescription></CardHeader>
        <CardContent style={{ display: 'grid', gap: 10 }}>
          <Alert variant="info" title="Heads up">Cythera is in public beta. Tokens may shift before v1.</Alert>
          <Alert variant="success" title="Deployment successful">Release <code>v1.4.2</code> is live across all 12 regions.</Alert>
          <Alert variant="warning" title="API quota at 87%">You'll be rate-limited at 100% — upgrade your plan or wait for the window to reset.</Alert>
          <Alert variant="destructive" title="Authentication failed">Your session expired. Sign in again to continue.</Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dialog & toast</CardTitle>
          <CardDescription>Modal overlay and transient feedback.</CardDescription>
        </CardHeader>
        <CardContent style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
          <Button variant="outline" onClick={() => toast({ title: 'Sync started', description: 'Pulling latest from main…', variant: 'info' })}>Show toast</Button>
          <Button variant="outline" onClick={() => toast({ title: 'Build complete', description: 'Deployed in 47s.', variant: 'success' })}>Success toast</Button>
          <Button variant="outline" onClick={() => toast({ title: 'Connection lost', description: 'Retrying in 3s…', variant: 'destructive' })}>Error toast</Button>
        </CardContent>
      </Card>
      <Dialog
        open={dialogOpen} onOpenChange={setDialogOpen}
        title="Delete project?"
        description="This will permanently remove the project and all of its data. This action cannot be undone."
        footer={<>
          <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={() => { setDialogOpen(false); toast({ title: 'Project deleted', variant: 'success' }); }}>Delete project</Button>
        </>}
      >
        <div style={{ display: 'grid', gap: 8 }}>
          <Label>Type the project name to confirm</Label>
          <Input placeholder="orion-prod" />
        </div>
      </Dialog>

      <Card>
        <CardHeader><CardTitle>Skeleton & loading</CardTitle></CardHeader>
        <CardContent style={{ display: 'grid', gap: 10 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Skeleton style={{ width: 40, height: 40, borderRadius: 999 }} />
            <div style={{ flex: 1, display: 'grid', gap: 6 }}>
              <Skeleton style={{ height: 12, width: '60%' }} />
              <Skeleton style={{ height: 10, width: '40%' }} />
            </div>
          </div>
          <Skeleton style={{ height: 80, width: '100%' }} />
        </CardContent>
      </Card>
    </section>
  );
}

/* =================== SECTION HEADER ===================*/
function SectionHeader({ kicker, title, subtitle }) {
  return (
    <div>
      <div className="cy-tech-label" style={{ marginBottom: 8 }}>// {kicker}</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-3xl)', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--hero-text)' }}>{title}</h2>
      {subtitle && <p style={{ color: 'var(--muted-foreground)', maxWidth: 680, marginTop: 6 }}>{subtitle}</p>}
    </div>
  );
}

Object.assign(window, { TokensSection, TypographySection, ColorsSection, ComponentsSection, SectionHeader });
