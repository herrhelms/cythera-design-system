// Cythera app patterns — realistic SaaS scaffolding to prove the system in production contexts.
const { useState: usePat, useMemo: useMemoPat } = React;

/* ---------- Dashboard ---------- */
function PatternDashboard() {
  const stats = [
    { label: 'Active users', value: '12,847', delta: '+8.2%', icon: 'users', color: 'cyan' },
    { label: 'API requests', value: '2.4M', delta: '+12.4%', icon: 'zap', color: 'lime' },
    { label: 'Avg latency', value: '142ms', delta: '−4.1%', icon: 'activity', color: 'purple' },
    { label: 'Error rate', value: '0.03%', delta: '−0.01%', icon: 'shield', color: 'orange' },
  ];
  return (
    <Card>
      <CardHeader><CardTitle>Operations dashboard</CardTitle><CardDescription>Stat tiles + activity feed pattern.</CardDescription></CardHeader>
      <CardContent>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 16 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 14, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -6, right: -6, width: 60, height: 60, background: `radial-gradient(circle, color-mix(in srgb, var(--cythera-${s.color}) 30%, transparent), transparent 70%)` }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: `var(--cythera-${s.color})`, marginBottom: 8 }}>
                <Icon name={s.icon} size={14} />
                <span className="cy-tech-label" style={{ color: 'var(--muted-foreground)' }}>{s.label}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24 }}>{s.value}</div>
              <Badge variant={s.delta.startsWith('+') ? 'success' : 'info'} style={{ marginTop: 6, fontSize: 10 }}>{s.delta}</Badge>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--input-background)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontWeight: 600 }}>Request volume / 24h</span>
            <Badge variant="outline">Last 24h</Badge>
          </div>
          <FakeChart />
        </div>
      </CardContent>
    </Card>
  );
}

function FakeChart() {
  const bars = useMemoPat(() => Array.from({ length: 32 }, (_, i) => 30 + Math.sin(i / 3) * 28 + Math.random() * 30), []);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 100 }}>
      {bars.map((h, i) => (
        <div key={i} style={{
          flex: 1,
          height: `${Math.min(100, Math.max(10, h))}%`,
          background: i === bars.length - 4
            ? 'var(--primary)'
            : 'linear-gradient(180deg, color-mix(in srgb, var(--primary) 60%, transparent), color-mix(in srgb, var(--primary) 20%, transparent))',
          borderRadius: '2px 2px 0 0',
          boxShadow: i === bars.length - 4 ? '0 0 12px color-mix(in srgb, var(--primary) 50%, transparent)' : 'none',
        }} />
      ))}
    </div>
  );
}

/* ---------- Data table ---------- */
function PatternTable() {
  const rows = [
    { id: 'PRJ-1042', name: 'Orion Production', owner: 'Elena M.', env: 'prod', status: 'healthy', latency: 124 },
    { id: 'PRJ-1039', name: 'Atlas Staging', owner: 'James K.', env: 'staging', status: 'degraded', latency: 412 },
    { id: 'PRJ-1038', name: 'Helios Edge', owner: 'Priya N.', env: 'prod', status: 'healthy', latency: 88 },
    { id: 'PRJ-1031', name: 'Vega Analytics', owner: 'Marcus L.', env: 'dev', status: 'down', latency: null },
    { id: 'PRJ-1024', name: 'Lyra Auth', owner: 'Sara D.', env: 'prod', status: 'healthy', latency: 156 },
  ];
  const statusVariant = { healthy: 'success', degraded: 'warning', down: 'destructive' };
  const statusOrder = { healthy: 0, degraded: 1, down: 2 };
  const [q, setQ] = usePat('');
  const [sort, setSort] = usePat({ key: 'id', dir: 'desc' });
  const filtered = rows.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => {
    const k = sort.key;
    let av = a[k], bv = b[k];
    if (k === 'status') { av = statusOrder[av]; bv = statusOrder[bv]; }
    if (av == null) return 1; if (bv == null) return -1;
    if (av < bv) return sort.dir === 'asc' ? -1 : 1;
    if (av > bv) return sort.dir === 'asc' ? 1 : -1;
    return 0;
  });
  function toggleSort(key) {
    setSort((s) => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' });
  }
  function SortableTh({ k, children, align }) {
    const sorted = sort.key === k;
    const cls = `sortable ${sorted ? 'sorted' : ''} ${sorted && sort.dir === 'desc' ? 'sorted-desc' : ''}`;
    return (
      <th className={cls} onClick={() => toggleSort(k)} style={{ textAlign: align || 'left' }}>
        <span className="th-inner">{children}<Icon name="chevronDown" size={11} className="sort-arrow" /></span>
      </th>
    );
  }
  return (
    <Card>
      <CardHeader>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Sortable table with filter, search, and toolbar.</CardDescription>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Icon name="search" size={14} style={{ position: 'absolute', left: 10, top: 11, color: 'var(--muted-foreground)' }} />
              <Input placeholder="Search projects…" value={q} onChange={(e) => setQ(e.target.value)} style={{ paddingLeft: 30, width: 220 }} />
            </div>
            <Button variant="outline"><Icon name="filter" size={14} />Filter</Button>
            <Button><Icon name="plus" size={14} />New project</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent style={{ paddingTop: 36 }}>
        <div style={{ overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 10 }}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 36 }}><Checkbox /></th>
                <SortableTh k="id">ID</SortableTh>
                <SortableTh k="name">Project</SortableTh>
                <SortableTh k="owner">Owner</SortableTh>
                <SortableTh k="env">Env</SortableTh>
                <SortableTh k="status">Status</SortableTh>
                <SortableTh k="latency" align="right">Latency</SortableTh>
                <th style={{ width: 40 }}></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => (
                <tr key={r.id}>
                  <td><Checkbox /></td>
                  <td><code style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{r.id}</code></td>
                  <td style={{ fontWeight: 600 }}>{r.name}</td>
                  <td>{r.owner}</td>
                  <td><Badge variant="outline">{r.env}</Badge></td>
                  <td><Badge variant={statusVariant[r.status]}>{r.status}</Badge></td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textAlign: 'right' }}>{r.latency != null ? `${r.latency}ms` : '—'}</td>
                  <td><Button size="icon" variant="ghost"><Icon name="moreV" size={14} /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, fontSize: 12, color: 'var(--muted-foreground)' }}>
          <span>Showing {sorted.length} of {rows.length}</span>
          <div style={{ display: 'flex', gap: 4 }}>
            <Button size="sm" variant="outline"><Icon name="chevronLeft" size={14} /></Button>
            <Button size="sm" variant="outline"><Icon name="chevronRight" size={14} /></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------- Form ---------- */
function PatternForm() {
  const [plan, setPlan] = usePat('pro');
  return (
    <Card>
      <CardHeader><CardTitle>Settings form</CardTitle><CardDescription>Sectioned form with help text and choice cards.</CardDescription></CardHeader>
      <CardContent>
        <div style={{ display: 'grid', gap: 18, maxWidth: 560 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><Label>First name</Label><Input defaultValue="Elena" /></div>
            <div><Label>Last name</Label><Input defaultValue="Marquez" /></div>
          </div>
          <div><Label>Workspace URL</Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <span style={{ padding: '0 12px', height: 36, display: 'inline-flex', alignItems: 'center', background: 'var(--muted)', border: '1px solid var(--border-bright)', borderRadius: '6px 0 0 6px', borderRight: 0, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted-foreground)' }}>cythera.io/</span>
              <Input defaultValue="orion-team" style={{ borderRadius: '0 6px 6px 0' }} />
            </div>
            <div className="help">Lowercase letters, numbers, and hyphens only.</div>
          </div>
          <div>
            <Label>Plan</Label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {['free', 'pro', 'enterprise'].map((p) => (
                <button key={p} onClick={() => setPlan(p)} style={{
                  textAlign: 'left', padding: 12, borderRadius: 8, cursor: 'pointer',
                  background: plan === p ? 'color-mix(in srgb, var(--primary) 12%, var(--card))' : 'var(--card)',
                  border: `1px solid ${plan === p ? 'var(--primary)' : 'var(--border)'}`,
                  color: 'var(--foreground)',
                  boxShadow: plan === p ? '0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent)' : 'none',
                  fontFamily: 'var(--font-sans)',
                }}>
                  <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{p}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted-foreground)', marginTop: 2 }}>
                    {p === 'free' ? '1 project, 5 GB' : p === 'pro' ? '10 projects, 100 GB' : 'Unlimited everything'}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <Separator />
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Switch defaultChecked />
            <div>
              <div style={{ fontWeight: 500 }}>Email notifications</div>
              <div className="help" style={{ marginTop: 0 }}>Receive a digest of activity once per day.</div>
            </div>
          </label>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="ghost">Cancel</Button>
            <Button>Save changes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------- Command palette mock ---------- */
function PatternCommand() {
  const items = [
    { i: 'rocket', l: 'Deploy to production', s: '⌘ D' },
    { i: 'database', l: 'Run database migration', s: '⌘ M' },
    { i: 'users', l: 'Invite team member', s: '⌘ I' },
    { i: 'file', l: 'Open recent file…', s: '⌘ P' },
    { i: 'terminal', l: 'Toggle terminal', s: '⌘ `' },
  ];
  return (
    <Card>
      <CardHeader><CardTitle>Command palette</CardTitle><CardDescription>Cmd+K pattern with grouped, kbd-tagged actions.</CardDescription></CardHeader>
      <CardContent>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border-bright)', borderRadius: 10, overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
            <Icon name="search" size={16} style={{ color: 'var(--muted-foreground)' }} />
            <input placeholder="Type a command or search…" style={{ flex: 1, background: 'transparent', border: 0, outline: 'none', color: 'var(--foreground)', fontFamily: 'var(--font-sans)', fontSize: 14 }} />
            <span className="kbd">esc</span>
          </div>
          <div style={{ padding: 6 }}>
            <div className="cy-tech-label" style={{ padding: '8px 12px 4px' }}>Actions</div>
            {items.map((x, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 6,
                background: i === 0 ? 'color-mix(in srgb, var(--primary) 10%, transparent)' : 'transparent',
                color: 'var(--foreground)',
              }}>
                <Icon name={x.i} size={15} style={{ color: 'var(--muted-foreground)' }} />
                <span style={{ flex: 1 }}>{x.l}</span>
                <span className="kbd">{x.s}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------- App shell preview ---------- */
function PatternShell() {
  return (
    <Card>
      <CardHeader><CardTitle>App shell</CardTitle><CardDescription>Sidebar + topbar + content. The bones of any Cythera app.</CardDescription></CardHeader>
      <CardContent>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 0, height: 360, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
          <aside style={{ background: 'var(--panel-dark)', borderRight: '1px solid var(--border)', padding: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 12, marginBottom: 8, borderBottom: '1px solid var(--border)' }}>
              <span className="cy-pulse-dot" />
              <span className="cy-wordmark" style={{ fontSize: 14 }}>Cythera</span>
            </div>
            {[
              { i: 'home', l: 'Overview', active: true },
              { i: 'package', l: 'Projects' },
              { i: 'database', l: 'Data' },
              { i: 'chart', l: 'Analytics' },
              { i: 'users', l: 'Team' },
              { i: 'settings', l: 'Settings' },
            ].map((n) => (
              <a key={n.l} href="#" onClick={(e) => e.preventDefault()} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', borderRadius: 6,
                background: n.active ? 'color-mix(in srgb, var(--primary) 14%, transparent)' : 'transparent',
                color: n.active ? 'var(--primary)' : 'var(--foreground)',
                textDecoration: 'none', fontSize: 13, fontWeight: n.active ? 600 : 500,
                border: n.active ? '1px solid color-mix(in srgb, var(--primary) 30%, transparent)' : '1px solid transparent',
              }}>
                <Icon name={n.i} size={14} />{n.l}
              </a>
            ))}
            <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar size={28} fallback="EM" />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>Elena M.</div>
                <div style={{ fontSize: 10, color: 'var(--muted-foreground)' }}>elena@cythera.io</div>
              </div>
            </div>
          </aside>
          <div>
            <header style={{ height: 48, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', background: 'var(--panel)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <span style={{ color: 'var(--muted-foreground)' }}>Projects</span>
                <Icon name="chevronRight" size={12} style={{ color: 'var(--muted-foreground)' }} />
                <span style={{ fontWeight: 600 }}>Orion</span>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <Button size="sm" variant="ghost"><Icon name="bell" size={14} /></Button>
                <Button size="sm" variant="outline"><Icon name="command" size={12} /> ⌘K</Button>
                <Button size="sm"><Icon name="rocket" size={14} /> Deploy</Button>
              </div>
            </header>
            <div style={{ padding: 18, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                { l: 'Uptime', v: '99.98%', c: 'lime' },
                { l: 'Requests/min', v: '8,421', c: 'cyan' },
                { l: 'Active alerts', v: '2', c: 'orange' },
              ].map((t) => (
                <div key={t.l} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 12 }}>
                  <div className="cy-tech-label">{t.l}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: `var(--cythera-${t.c})`, marginTop: 4 }}>{t.v}</div>
                </div>
              ))}
              <div style={{ gridColumn: '1 / -1', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 14 }}>
                <div className="cy-tech-label" style={{ marginBottom: 10 }}>Live throughput</div>
                <FakeChart />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PatternsSection() {
  return (
    <section id="patterns" style={{ display: 'grid', gap: 24 }}>
      <SectionHeader kicker="05 / Patterns" title="Application Patterns" subtitle="Composed views that demonstrate how primitives combine into real software." />
      <PatternShell />
      <PatternDashboard />
      <PatternTable />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 16 }}>
        <PatternForm />
        <PatternCommand />
      </div>
    </section>
  );
}

Object.assign(window, { PatternsSection });
