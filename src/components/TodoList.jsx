import TodoItem from './TodoItem';

const FILTER_TABS = ['All', 'Done', 'Todo'];

export default function TodoList({
  todos = [],
  currentFilter = 'All',
  onFilterChange,
  editingId,
  editText,
  onEditTextChange,
  onToggleComplete,
  onStartEdit,
  onConfirmEdit,
  onCancelEdit,
  onDelete,
}) {
  const hasTodos = todos.length > 0;

  // filter according to selection
  let visibleList = [...todos];
  if (currentFilter === 'Done') {
    visibleList = visibleList.filter((item) => item.completed);
  } else if (currentFilter === 'Todo') {
    visibleList = visibleList.filter((item) => !item.completed);
  } else {
    // spec: completed items float to the top under 'All', followed by pending
    const done = visibleList.filter((item) => item.completed);
    const pending = visibleList.filter((item) => !item.completed);
    visibleList = [...done, ...pending];
  }

  return (
    <section className="todo-list-section" aria-label="Todo List Section">
      <h2 className="section-title">TodoList</h2>

      {/* filter tabs only appear if there is at least one item in the list */}
      {hasTodos && (
        <div className="filter-buttons-group" role="tablist" aria-label="Todo filters">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`btn btn-filter ${currentFilter === tab ? 'active-filter' : ''}`}
              onClick={() => onFilterChange(tab)}
              aria-selected={currentFilter === tab}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <div className="todo-items-container">
        {!hasTodos ? (
          <p className="no-todos-msg">No todo is available</p>
        ) : visibleList.length === 0 ? (
          <p className="no-todos-msg">No {currentFilter.toLowerCase()} todos found</p>
        ) : (
          visibleList.map((item) => (
            <TodoItem
              key={item.id}
              todo={item}
              isEditing={editingId === item.id}
              editText={editText}
              onEditTextChange={onEditTextChange}
              onToggleComplete={onToggleComplete}
              onStartEdit={onStartEdit}
              onConfirmEdit={onConfirmEdit}
              onCancelEdit={onCancelEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}
