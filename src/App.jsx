import { useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  const addTask = (e) => {
    e.preventDefault()

    if (task.trim() === '') {
      return
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    }

    setTasks([...tasks, newTask])
    setTask('')
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
    if (editText.trim() === '') {
      return
    }

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

  return (
    <div className="todo-container">
      <h1>My To-Do List</h1>

      <form onSubmit={addTask} className="todo-form">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.map((item) => (
          <div className="task-item" key={item.id}>

            {editId === item.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <button onClick={() => saveEdit(item.id)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleTask(item.id)}
                  style={{
                    textDecoration: item.completed
                      ? 'line-through'
                      : 'none'
                  }}
                >
                  {item.text}
                </span>

                <button onClick={() => startEdit(item)}>
                  Edit
                </button>

                <button onClick={() => deleteTask(item.id)}>
                  Delete
                </button>
              </>
            )}

          </div>
        ))}
      </div>
    </div>
  )
}

export default App