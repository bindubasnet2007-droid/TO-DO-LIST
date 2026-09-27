const TodoStats = ({ totalTasks, completedTasks, remainingTasks }) => {
  return (
    <div className="stats">
      <div>
        <strong>{totalTasks}</strong>
        <span>Total</span>
      </div>

      <div>
        <strong>{completedTasks}</strong>
        <span>Completed</span>
      </div>

      <div>
        <strong>{remainingTasks}</strong>
        <span>Remaining</span>
      </div>
    </div>
  )
}

export default TodoStats