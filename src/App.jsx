import { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';

// mock data matching the prototype assignment screenshot
const SEED_TODOS = [
  { id: 1, text: 'Learn ReactJS basics', completed: true },
  { id: 2, text: 'Practice ReactJS', completed: false },
  { id: 3, text: 'Learn Redux', completed: false },
  { id: 4, text: 'Code portfolio in React', completed: false },
  { id: 5, text: 'Learn React Native', completed: false },
];

export default function App() {
  const [todos, setTodos] = useState(SEED_TODOS);
  const [taskInput, setTaskInput] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // inline editing state
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // target id for delete confirmation modal
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const handleAddTodo = () => {
    const trimmed = taskInput.trim();
    if (!trimmed) return; // avoid adding blank or whitespace-only tasks

    const newTodo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    // requirement: append new tasks to the very end of existing items
    setTodos((prev) => [...prev, newTodo]);
    setTaskInput('');
  };

  const handleToggleComplete = (id) => {
    // requirement says users cannot undo completion once marked
    setTodos((prev) =>
      prev.map((item) => (item.id === id && !item.completed ? { ...item, completed: true } : item))
    );
  };

  const handleStartEdit = (todo) => {
    if (todo.completed) return; // cannot edit completed tasks
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleConfirmEdit = () => {
    if (editingId === null) return;

    const trimmed = editText.trim();
    // if the user cleared the text, cancel out instead of saving an empty item
    if (!trimmed) {
      setEditingId(null);
      setEditText('');
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === editingId ? { ...item, text: trimmed } : item))
    );
    setEditingId(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handlePromptDelete = (id) => {
    // spec: only completed tasks can be deleted
    const target = todos.find((t) => t.id === id);
    if (!target || !target.completed) return;

    setDeleteTargetId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId === null) return;
    setTodos((prev) => prev.filter((item) => item.id !== deleteTargetId));
    setDeleteTargetId(null);
  };

  const handleCancelDelete = () => {
    setDeleteTargetId(null);
  };

  return (
    <main className="app-container">
      <TodoInput
        inputValue={taskInput}
        onInputChange={setTaskInput}
        onAddTodo={handleAddTodo}
      />

      <TodoList
        todos={todos}
        currentFilter={activeFilter}
        onFilterChange={setActiveFilter}
        editingId={editingId}
        editText={editText}
        onEditTextChange={setEditText}
        onToggleComplete={handleToggleComplete}
        onStartEdit={handleStartEdit}
        onConfirmEdit={handleConfirmEdit}
        onCancelEdit={handleCancelEdit}
        onDelete={handlePromptDelete}
      />

      {/* optional confirmation dialog before deleting completed items */}
      {deleteTargetId !== null && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal-dialog">
            <h3 id="modal-title" className="modal-title">
              Delete Task
            </h3>
            <p className="modal-body">
              Are you sure you want to delete this completed task? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-modal-confirm"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
