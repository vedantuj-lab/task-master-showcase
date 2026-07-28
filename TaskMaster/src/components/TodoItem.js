import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * TodoItem - single todo row with checkbox and delete button.
 */
export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <View style={styles.row} testID="todoItem">
      <TouchableOpacity
        testID="todoCheckbox"
        accessibilityRole="checkbox"
        accessibilityState={{ checked: todo.completed }}
        style={[styles.checkbox, todo.completed && styles.checkboxChecked]}
        onPress={() => onToggle(todo.id)}
      >
        {todo.completed && <Text style={styles.check}>✓</Text>}
      </TouchableOpacity>

      <Text
        style={[styles.text, todo.completed && styles.textCompleted]}
        numberOfLines={2}
      >
        {todo.text}
      </Text>

      {todo.completed && (
        <Text style={styles.completedLabel} testID="completedLabel">
          Completed
        </Text>
      )}

      <TouchableOpacity
        testID="deleteButton"
        style={styles.deleteBtn}
        onPress={() => onDelete(todo.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#6200ee',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#2e7d32',
    borderColor: '#2e7d32',
  },
  check: { color: '#fff', fontWeight: '700' },
  text: { flex: 1, fontSize: 16, color: '#212121' },
  textCompleted: {
    color: '#2e7d32',
    textDecorationLine: 'line-through',
  },
  completedLabel: {
    fontSize: 12,
    color: '#2e7d32',
    marginHorizontal: 8,
    fontWeight: '600',
  },
  deleteBtn: {
    backgroundColor: '#d32f2f',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  deleteText: { color: '#fff', fontWeight: '600' },
});
