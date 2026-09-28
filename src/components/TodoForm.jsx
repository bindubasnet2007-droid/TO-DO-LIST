function TodoForm({
  task,
  setTask,
  dueDate,
  setDueDate,
  addTask
}) {
  return (
    <form onSubmit={addTask} className="todo-form">

      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">
        Add Task
      </button>

    </form>
  )
}

export default TodoForm