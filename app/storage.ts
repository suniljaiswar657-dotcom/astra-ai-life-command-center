import { openDB } from 'idb'

export type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

const database = openDB('astra-local', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('tasks')) {
      db.createObjectStore('tasks', { keyPath: 'id' })
    }
  },
})

export async function getTasks(): Promise<Task[]> {
  const db = await database
  return (await db.getAll('tasks')).sort((a, b) => b.createdAt - a.createdAt)
}

export async function saveTask(task: Task): Promise<void> {
  const db = await database
  await db.put('tasks', task)
}

export async function removeTask(id: string): Promise<void> {
  const db = await database
  await db.delete('tasks', id)
}
