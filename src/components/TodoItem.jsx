export default function TodoItem({
  todo,
  isEditing,
  editText,
  onEditTextChange,
  onToggleComplete,
  onStartEdit,
  onConfirmEdit,
  onCancelEdit,
  onDelete,
}) {
  const { id, text, completed } = todo;

  // keyboard shortcuts: Enter saves, Escape backs out
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onConfirmEdit();
    if (e.key === 'Escape') onCancelEdit();
  };

  if (isEditing) {
    return (
      <div className="todo-item-card todo-item-editing" id={`todo-item-${id}`}>
        <input
          type="text"
          className="edit-todo-input"
          value={editText}
          onChange={(e) => onEditTextChange(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          aria-label="Edit todo description"
        />
        <div className="edit-actions">
          <button
            type="button"
            className="btn btn-cancel"
            onClick={onCancelEdit}
            title="Cancel"
            aria-label="Cancel editing"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-confirm"
            onClick={onConfirmEdit}
            title="Confirm"
            aria-label="Confirm editing"
          >
            Confirm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`todo-item-card ${completed ? 'is-completed' : 'is-pending'}`}
      id={`todo-item-${id}`}
    >
      <span className={`todo-text ${completed ? 'completed-text' : ''}`}>
        {text}
      </span>
      <div className="todo-actions">
        {/* completed items cannot be unmarked per assignment requirements */}
        <button
          type="button"
          className={`btn-action btn-complete ${completed ? 'is-completed' : ''}`}
          onClick={() => onToggleComplete(id)}
          disabled={completed}
          title={completed ? 'Completed' : 'Mark as complete'}
          aria-label={completed ? 'Task completed' : 'Mark task as complete'}
        >
          {completed ? 'Completed' : 'Complete'}
        </button>

        {/* editing is disabled once a task is marked complete */}
        <button
          type="button"
          className="btn-action btn-edit"
          onClick={() => onStartEdit(todo)}
          disabled={completed}
          title="Edit todo"
          aria-label="Edit todo"
        >
          Edit
        </button>

        {/* requirement: only completed items can be deleted */}
        <button
          type="button"
          className="btn-action btn-delete"
          onClick={() => onDelete(id)}
          disabled={!completed}
          title="Delete todo"
          aria-label="Delete todo"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
