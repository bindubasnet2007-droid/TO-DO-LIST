const TodoForm = ({ task, setTask, addTask }) => {
  return (
    <form className="todo-form" onSubmit={addTask}>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  )
}

export default TodoForm