import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import TodoItem from '../components/TodoItem';
import useTodos from '../hooks/useTodos';

export default function HomeScreen() {
  const [value, setValue] = useState('');
  const { todos, add, remove, toggle, error } = useTodos();

  const handleAdd = () => {
    if (add(value)) setValue('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Header title="TaskMaster" />

      <View style={styles.inputRow}>
        <TextInput
          testID="todoInput"
          style={styles.input}
          placeholder="Add a task..."
          placeholderTextColor="#9e9e9e"
          value={value}
          onChangeText={setValue}
          returnKeyType="done"
          onSubmitEditing={handleAdd}
        />
        <TouchableOpacity
          testID="addButton"
          style={styles.addButton}
          onPress={handleAdd}
        >
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      {!!error && (
        <Text testID="validationMessage" style={styles.error}>
          {error}
        </Text>
      )}

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem todo={item} onToggle={toggle} onDelete={remove} />
        )}
        ListEmptyComponent={
          <Text testID="emptyState" style={styles.empty}>
            No tasks yet. Add one above.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  inputRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#212121',
    elevation: 1,
  },
  addButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 8,
    marginLeft: 8,
  },
  addText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  error: {
    color: '#d32f2f',
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontSize: 14,
  },
  list: { flex: 1 },
  listContent: { padding: 16, paddingTop: 0 },
  empty: {
    textAlign: 'center',
    color: '#757575',
    marginTop: 40,
    fontSize: 14,
  },
});
