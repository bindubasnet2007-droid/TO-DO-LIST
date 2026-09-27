import { useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

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
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App