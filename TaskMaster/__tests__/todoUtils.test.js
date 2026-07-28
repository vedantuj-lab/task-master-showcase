import {
  isValidTodo,
  addTodo,
  deleteTodo,
  toggleCompleted,
} from '../src/utils/todoUtils';

describe('todoUtils', () => {
  describe('isValidTodo', () => {
    it('returns true for non-empty string', () => {
      expect(isValidTodo('Buy milk')).toBe(true);
    });
    it('returns false for empty string', () => {
      expect(isValidTodo('')).toBe(false);
    });
    it('returns false for whitespace only', () => {
      expect(isValidTodo('   ')).toBe(false);
    });
    it('returns false for non-string', () => {
      expect(isValidTodo(null)).toBe(false);
      expect(isValidTodo(undefined)).toBe(false);
      expect(isValidTodo(123)).toBe(false);
    });
  });

  describe('addTodo', () => {
    it('adds a new todo', () => {
      const result = addTodo([], 'Task 1');
      expect(result).toHaveLength(1);
      expect(result[0].text).toBe('Task 1');
      expect(result[0].completed).toBe(false);
      expect(result[0].id).toBeDefined();
    });
    it('trims whitespace', () => {
      const result = addTodo([], '  Task  ');
      expect(result[0].text).toBe('Task');
    });
    it('ignores invalid input', () => {
      expect(addTodo([], '')).toEqual([]);
      expect(addTodo([], '   ')).toEqual([]);
    });
    it('rejects duplicates (case-insensitive)', () => {
      const list = addTodo([], 'Task');
      const result = addTodo(list, 'task');
      expect(result).toHaveLength(1);
    });
    it('is immutable', () => {
      const list = [];
      addTodo(list, 'Task');
      expect(list).toHaveLength(0);
    });
  });

  describe('deleteTodo', () => {
    it('removes matching todo', () => {
      const list = addTodo([], 'A');
      const id = list[0].id;
      expect(deleteTodo(list, id)).toEqual([]);
    });
    it('returns unchanged list when id not found', () => {
      const list = addTodo([], 'A');
      expect(deleteTodo(list, 'missing')).toHaveLength(1);
    });
  });

  describe('toggleCompleted', () => {
    it('toggles completed flag', () => {
      const list = addTodo([], 'A');
      const id = list[0].id;
      const toggled = toggleCompleted(list, id);
      expect(toggled[0].completed).toBe(true);
      const back = toggleCompleted(toggled, id);
      expect(back[0].completed).toBe(false);
    });
    it('ignores unknown id', () => {
      const list = addTodo([], 'A');
      const result = toggleCompleted(list, 'missing');
      expect(result[0].completed).toBe(false);
    });
  });
});
