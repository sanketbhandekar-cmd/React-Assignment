export default function TodoInput({
  inputValue = '',
  onInputChange,
  onAddTodo,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTodo();
  };

  return (
    <section className="todo-input-section" aria-label="Add Todo Section">
      <h2 className="section-title">TodoInput</h2>
      <div className="card-box todo-input-card">
        <form onSubmit={handleSubmit} className="todo-input-form">
          <input
            type="text"
            id="new-todo-input"
            className="todo-text-input"
            placeholder="New Todo"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            aria-label="New Todo description"
          />
          <button
            type="submit"
            id="add-task-btn"
            className="btn btn-primary btn-block add-task-btn"
          >
            Add new task
          </button>
        </form>
      </div>
    </section>
  );
}
