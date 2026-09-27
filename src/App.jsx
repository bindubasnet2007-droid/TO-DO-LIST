import { useEffect, useState } from 'react'
import './App.css'

import TodoForm from './components/TodoForm'
import SearchBar from './components/SearchBar'
import TodoStats from './components/TodoStats'
import FilterButtons from './components/FilterButtons'
import TodoList from './components/TodoList'

function App() {
  const [task, setTask] = useState('')

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // Add task
  const addTask = (e) => {
    e.preventDefault()

    if (task.trim() === '') return

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    }

    setTasks([...tasks, newTask])
    setTask('')
  }

  // Complete / uncomplete task
  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    )
  }

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id))
  }

  // Start editing
  const startEdit = (item) => {
    setEditId(item.id)
    setEditText(item.text)
  }

  // Save edited task
  const saveEdit = (id) => {
    if (editText.trim() === '') return

    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, text: editText }
          : item
      )
    )

    setEditId(null)
    setEditText('')
  }

  // Filter and search tasks
  const filteredTasks = tasks.filter((item) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !item.completed) ||
      (filter === 'completed' && item.completed)

    const matchesSearch = item.text
      .toLowerCase()
      .includes(search.toLowerCase())

    return matchesFilter && matchesSearch
  })

  // Task statistics
  const totalTasks = tasks.length

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length

  const remainingTasks = totalTasks - completedTasks

  return (
    <div className="todo-container">

      <h1>My To-Do List</h1>

      <TodoForm
        task={task}
        setTask={setTask}
        addTask={addTask}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <TodoStats
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        remainingTasks={remainingTasks}
      />

      <FilterButtons
        filter={filter}
        setFilter={setFilter}
      />

      <TodoList
        filteredTasks={filteredTasks}
        editId={editId}
        editText={editText}
        setEditText={setEditText}
        startEdit={startEdit}
        saveEdit={saveEdit}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />

    </div>
  )
}

export default App