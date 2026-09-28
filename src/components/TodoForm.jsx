const TodoForm = ({ task, setTask, addTask }) => {
  return (
    <form className="todo-form" onSubmit={addTask}>
      <input
        type="text"
        placeholder="What do you need to do?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  )
}

export default TodoForm