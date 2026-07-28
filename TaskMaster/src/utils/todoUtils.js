/**
 * Pure helper functions for todo operations.
 * Keeping logic pure makes them trivial to unit-test.
 */

/**
 * Validate a todo text string.
 * @param {string} text
 * @returns {boolean}
 */
export function isValidTodo(text) {
  return typeof text === 'string' && text.trim().length > 0;
}

/**
 * Add a todo to the list (immutable). Rejects invalid and duplicate entries.
 * @param {Array} todos
 * @param {string} text
 * @returns {Array}
 */
export function addTodo(todos, text) {
  if (!isValidTodo(text)) return todos;
  const trimmed = text.trim();
  const exists = todos.some(
    (t) => t.text.toLowerCase() === trimmed.toLowerCase()
  );
  if (exists) return todos;
  const newTodo = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text: trimmed,
    completed: false,
  };
  return [...todos, newTodo];
}

/**
 * Delete a todo by id (immutable).
 * @param {Array} todos
 * @param {string} id
 * @returns {Array}
 */
export function deleteTodo(todos, id) {
  return todos.filter((t) => t.id !== id);
}

/**
 * Toggle the completed flag on a todo (immutable).
 * @param {Array} todos
 * @param {string} id
 * @returns {Array}
 */
export function toggleCompleted(todos, id) {
  return todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
}
