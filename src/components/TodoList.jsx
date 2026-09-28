function TodoList({
  filteredTasks,
  editId,
  editText,
  setEditText,
  startEdit,
  saveEdit,
  toggleTask,
  deleteTask,
  handleDragStart,
  handleDrop
}) {

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="task-list">

      {filteredTasks.length === 0 ? (
        <p className="no-tasks">
          No tasks found.
        </p>
      ) : (
        filteredTasks.map((item) => {

          const isOverdue =
            item.dueDate &&
            item.dueDate < today &&
            !item.completed

          return (
            <div
              key={item.id}
              className={`task-item ${
                item.completed ? 'completed' : ''
              } ${isOverdue ? 'overdue' : ''}`}
              draggable
              onDragStart={(e) =>
                handleDragStart(e, item.id)
              }
              onDragOver={(e) =>
                e.preventDefault()
              }
              onDrop={(e) =>
                handleDrop(e, item.id)
              }
            >

              {/* Drag Handle */}
              <span className="drag-icon">
                ☰
              </span>

              {/* Checkbox */}
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTask(item.id)}
              />

              {/* Task / Edit Area */}
              {editId === item.id ? (

                <input
                  type="text"
                  value={editText}
                  onChange={(e) =>
                    setEditText(e.target.value)
                  }
                />

              ) : (

                <div className="task-content">

                  <span className="task-text">
                    {item.text}
                  </span>

                  {item.dueDate && (
                    <small
                      className={
                        isOverdue
                          ? 'overdue-text'
                          : 'due-date'
                      }
                    >
                      {isOverdue
                        ? '⚠️ Overdue: '
                        : '📅 Due: '
                      }

                      {item.dueDate}
                    </small>
                  )}

                </div>

              )}

              {/* Edit / Save */}
              {editId === item.id ? (

                <button
                  onClick={() => saveEdit(item.id)}
                >
                  Save
                </button>

              ) : (

                <button
                  onClick={() => startEdit(item)}
                >
                  Edit
                </button>

              )}

              {/* Delete */}
              <button
                onClick={() => deleteTask(item.id)}
              >
                Delete
              </button>

            </div>
          )
        })
      )}

    </div>
  )
}

export default TodoList