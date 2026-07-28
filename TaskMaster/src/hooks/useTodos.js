import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addTodo as addTodoUtil,
  deleteTodo as deleteTodoUtil,
  toggleCompleted as toggleCompletedUtil,
  isValidTodo,
} from '../utils/todoUtils';

const STORAGE_KEY = '@taskmaster:todos';

/**
 * useTodos - manages persistent todo list state.
 */
export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState('');

  // Hydrate from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setTodos(JSON.parse(raw));
      } catch (e) {
        // ignore hydration errors
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  // Persist whenever todos change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos)).catch(() => {});
  }, [todos, hydrated]);

  const add = useCallback(
    (text) => {
      if (!isValidTodo(text)) {
        setError('Please enter a task');
        return false;
      }
      const next = addTodoUtil(todos, text);
      if (next.length === todos.length) {
        setError('Task already exists');
        return false;
      }
      setError('');
      setTodos(next);
      return true;
    },
    [todos]
  );

  const remove = useCallback((id) => {
    setTodos((prev) => deleteTodoUtil(prev, id));
  }, []);

  const toggle = useCallback((id) => {
    setTodos((prev) => toggleCompletedUtil(prev, id));
  }, []);

  const clearError = useCallback(() => setError(''), []);

  return { todos, add, remove, toggle, error, clearError, hydrated };
}
