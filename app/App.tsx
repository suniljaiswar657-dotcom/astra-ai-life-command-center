import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Activity, ArrowUpRight, Check, CheckCircle2, Circle, Command, Compass, Plus, Search, ShieldCheck, Sparkles, Target, Trash2 } from 'lucide-react'
import { getTasks, removeTask, saveTask, type Task } from './storage'

type Section = 'Overview' | 'Tasks' | 'Planning' | 'Research'

const sections: { name: Section; icon: typeof Compass }[] = [
  { name: 'Overview', icon: Compass },
  { name: 'Tasks', icon: CheckCircle2 },
  { name: 'Planning', icon: Target },
  { name: 'Research', icon: Search },
]

export default function App() {
  const [section, setSection] = useState<Section>('Overview')
  const [tasks, setTasks] = useState<Task[]>([])
  const [draft, setDraft] = useState('')
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setError('Local storage could not be opened in this browser.'))
      .finally(() => setReady(true))
  }, [])

  const completed = useMemo(() => tasks.filter((task) => task.completed).length, [tasks])
  const pending = tasks.length - completed

  async function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = draft.trim()
    if (!title) return
    const task: Task = { id: crypto.randomUUID(), title, completed: false, createdAt: Date.now() }
    try {
      await saveTask(task)
      setTasks((current) => [task, ...current])
      setDraft('')
      setError('')
    } catch {
      setError('Task save nahi hua. Browser storage check karo.')
    }
  }

  async function toggleTask(task: Task) {
    const updated = { ...task, completed: !task.completed }
    try {
      await saveTask(updated)
      setTasks((current) => current.map((item) => item.id === task.id ? updated : item))
    } catch {
      setError('Task update nahi hua.')
    }
  }

  async function deleteTask(id: string) {
    try {
      await removeTask(id)
      setTasks((current) => current.filter((task) => task.id !== id))
    } catch {
      setError('Task delete nahi hua.')
    }
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" onClick={() => setSection('Overview')}>
          <span className="brand-mark"><Sparkles size={19} /></span>
          <span>ASTRA<small>YOUR LIFE, IN ORBIT</small></span>
        </a>
        <div className="nav-label">WORKSPACE</div>
        <nav aria-label="Main navigation">
          {sections.map(({ name, icon: Icon }) => (
            <button className={section === name ? 'nav-item active' : 'nav-item'} key={name} onClick={() => setSection(name)}>
              <Icon size={17} /> <span>{name}</span>
              {name === 'Tasks' && tasks.length > 0 && <span className="nav-count">{pending}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="privacy-note"><ShieldCheck size={16} /><span>LOCAL-FIRST<br /><small>Your tasks stay on this device</small></span></div>
          <div className="version">ASTRA PREVIEW · 0.1.0</div>
        </div>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <div className="breadcrumb"><Command size={15} /> <span>Command Center</span><span className="slash">/</span><strong>{section}</strong></div>
          <div className="status"><span className="status-dot" /> LOCAL MODE</div>
        </header>

        <div className="content">
          <div className="welcome-row">
            <div>
              <div className="eyebrow">PERSONAL COMMAND CENTER</div>
              <h1>{section === 'Overview' ? 'Make space for what matters.' : section}</h1>
              <p className="subheading">{section === 'Overview' ? 'Your day, priorities, and ideas — in one calm place.' : section === 'Tasks' ? 'Capture the next action. Keep moving.' : 'This workspace is reserved for the next milestone.'}</p>
            </div>
            <div className="date-chip"><Activity size={15} /> ASTRA IS READY</div>
          </div>

          {error && <div className="error-banner" role="alert">{error}</div>}

          {section === 'Overview' && (
            <div className="stats-grid">
              <article className="stat-card"><span>OPEN TASKS</span><strong>{pending}</strong><small>Ready for your focus</small><div className="stat-icon"><Target size={18} /></div></article>
              <article className="stat-card"><span>COMPLETED</span><strong>{completed}</strong><small>Small steps count</small><div className="stat-icon green"><Check size={18} /></div></article>
              <article className="stat-card"><span>TOTAL CAPTURED</span><strong>{tasks.length}</strong><small>Your personal queue</small><div className="stat-icon purple"><Activity size={18} /></div></article>
            </div>
          )}

          {(section === 'Overview' || section === 'Tasks') && (
            <div className="workspace-grid">
              <section className="panel task-panel">
                <div className="panel-heading"><div><div className="eyebrow">YOUR ACTION LIST</div><h2>{section === 'Overview' ? 'Today’s priorities' : 'All tasks'}</h2></div><span className="subtle-count">{pending} OPEN</span></div>
                <form className="task-form" onSubmit={addTask}>
                  <Plus size={18} />
                  <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Add a task or next action..." aria-label="New task" />
                  <button type="submit" disabled={!draft.trim()} aria-label="Add task"><ArrowUpRight size={18} /></button>
                </form>
                {!ready ? <div className="empty-state">Loading your local workspace…</div> : tasks.length === 0 ? (
                  <div className="empty-state"><span className="empty-icon"><Sparkles size={22} /></span><strong>Your space is clear.</strong><p>Add your first task to start building momentum.</p></div>
                ) : (
                  <ul className="task-list">{tasks.map((task) => (
                    <li className={task.completed ? 'task-row done' : 'task-row'} key={task.id}>
                      <button className="task-check" onClick={() => void toggleTask(task)} aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}>{task.completed ? <CheckCircle2 size={19} /> : <Circle size={19} />}</button>
                      <span>{task.title}</span>
                      <button className="delete-task" onClick={() => void deleteTask(task.id)} aria-label="Delete task"><Trash2 size={16} /></button>
                    </li>
                  ))}</ul>
                )}
              </section>
              <aside className="panel focus-panel">
                <div className="eyebrow">FOCUS NOTE</div>
                <div className="focus-orb"><Sparkles size={24} /></div>
                <h2>One thing at a time.</h2>
                <p>Choose one meaningful action. Finish it before adding more noise.</p>
                <div className="focus-divider" />
                <div className="focus-foot"><ShieldCheck size={15} /> Private to this browser</div>
              </aside>
            </div>
          )}

          {section === 'Planning' && <section className="panel coming-panel"><span className="coming-icon"><Target size={22} /></span><div className="eyebrow">NEXT WORKSPACE</div><h2>Planning, without the clutter.</h2><p>Goal breakdowns and daily plans will be added in a later approved milestone.</p></section>}
          {section === 'Research' && <section className="panel coming-panel"><span className="coming-icon"><Search size={22} /></span><div className="eyebrow">NEXT WORKSPACE</div><h2>Think. Collect. Connect.</h2><p>A source-aware research space is planned. No AI or web integration is active yet.</p></section>}

          <footer className="page-footer"><span>ASTRA · BUILT FOR CLARITY</span><span>YOUR DATA STAYS ON THIS DEVICE</span></footer>
        </div>
      </section>
    </main>
  )
}
