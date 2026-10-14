# ReactJS Assignment - Todo List App

A Todo List application built with React and Vite, matching the assignment prototype and requirements.

---

### index.html
* Updated document title to "Todo List App | ReactJS Assignment".
* Added Google Fonts preconnect and link.

### src/App.jsx
* Initialized `todos` state with sample tasks matching the assignment prototype screenshot.
* Implemented state management for new task input, active filter (`All`, `Done`, `Todo`), inline editing and delete confirmation modal.
* Implemented task addition (`handleAddTodo`) appending new items to the end of the list.
* Implemented completion logic (`handleToggleComplete`), preventing completed tasks from being undone per assignment rules.
* Added inline edit handlers (`handleStartEdit`, `handleConfirmEdit`, `handleCancelEdit`) with edge-case validation to prevent blank tasks.
* Added delete handlers (`handlePromptDelete`, `handleConfirmDelete`, `handleCancelDelete`) ensuring only completed tasks can be deleted with a confirmation modal.

### src/components/TodoInput.jsx
* Created the `TodoInput` section with centered title and card box.
* Built the text input field with placeholder "New Todo".
* Added the full-width "Add new task" button that handles form submission on click or Enter key.

### src/components/TodoList.jsx
* Created the `TodoList` section with centered title and filter tabs (`All`, `Done`, `Todo`).
* Filter buttons are conditionally displayed only when tasks exist in the list.
* Implemented display ordering: completed tasks float to the top under the "All" filter, followed by pending tasks.
* Added empty state messaging displaying "No todo is available" when the list has no items.
* Mapped and rendered `TodoItem` components based on the active filter.

### src/components/TodoItem.jsx
* Replaced action icons with dedicated action buttons: "Complete" / "Completed", "Edit" and "Delete".
* Styled completed tasks with strikethrough and red text color.
* Configured button constraints: "Complete" and "Edit" buttons are disabled once a task is completed; "Delete" is disabled on pending tasks.
* Implemented inline editing view with input field, Cancel and Confirm buttons.
* Added keyboard shortcut support (`Enter` to confirm, `Escape` to cancel) while editing.

### src/App.css
* Defined CSS variables for the color palette (`--primary-teal`, `--btn-confirm`, `--btn-delete`, etc.).
* Styled the centered layout, input field and the full-width add button.
* Styled the filter buttons with active state opacity set to `0.6` as specified.
* Styled the action buttons: green for Complete, silver for Edit and red for Delete, along with their respective hover and disabled states.
* Styled the inline edit mode and the delete confirmation modal dialog.

### src/index.css
* Reset styles to a clean, minimal baseline with light background and consistent typography.
