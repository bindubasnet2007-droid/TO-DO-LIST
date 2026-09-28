import { useEffect, useState } from 'react'
import './App.css'

import TodoForm from './components/TodoForm'
import SearchBar from './components/SearchBar'
import TodoStats from './components/TodoStats'
import FilterButtons from './components/FilterButtons'
import TodoList from './components/TodoList'

function App() {
  const [task, setTask] = useState('')
  const [dueDate, setDueDate] = useState('')

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const addTask = (e) => {
    e.preventDefault()

    if (task.trim() === '') return

    const newTask = {
      id: Date.now(),
      text: task,
      dueDate: dueDate,
      completed: false
    }

    setTasks([...tasks, newTask])
    setTask('')
    setDueDate('')
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id))
  }

  const startEdit = (item) => {
    setEditId(item.id)
    setEditText(item.text)
  }

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

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('taskId', id)
  }

  const handleDrop = (e, targetId) => {
    e.preventDefault()

    const draggedId = Number(e.dataTransfer.getData('taskId'))

    if (draggedId === targetId) return

    const draggedIndex = tasks.findIndex(
      (item) => item.id === draggedId
    )

    const targetIndex = tasks.findIndex(
      (item) => item.id === targetId
    )

    const updatedTasks = [...tasks]

    const [draggedTask] = updatedTasks.splice(draggedIndex, 1)

    updatedTasks.splice(targetIndex, 0, draggedTask)

    setTasks(updatedTasks)
  }

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

  const totalTasks = tasks.length

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length

  const remainingTasks = totalTasks - completedTasks

  return (
    <div className={darkMode ? 'app dark-mode' : 'app'}>

      <div className="todo-container">

        <div className="header">
          <h1>My To-Do List</h1>

          <button
            className="theme-button"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <TodoForm
          task={task}
          setTask={setTask}
          dueDate={dueDate}
          setDueDate={setDueDate}
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
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
        />

      </div>

    </div>
  )
}

export default App