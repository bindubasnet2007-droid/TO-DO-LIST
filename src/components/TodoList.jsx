const TodoList = ({
  filteredTasks,
  editId,
  editText,
  setEditText,
  startEdit,
  saveEdit,
  toggleTask,
  deleteTask
}) => {
  return (
    <div className="task-list">

      {filteredTasks.map((item) => (
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
  )
}

export default TodoList