import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../src/screens/HomeScreen';

beforeEach(async () => {
  await AsyncStorage.clear();
});


const renderScreen = () =>
  render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 320, height: 640 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      <HomeScreen />
    </SafeAreaProvider>
  );

describe('HomeScreen', () => {
  it('renders input and add button', () => {
    const { getByTestId } = renderScreen();
    expect(getByTestId('todoInput')).toBeTruthy();
    expect(getByTestId('addButton')).toBeTruthy();
  });

  it('shows validation message when adding empty todo', async () => {
    const { getByTestId, findByTestId } = renderScreen();
    fireEvent.press(getByTestId('addButton'));
    const msg = await findByTestId('validationMessage');
    expect(msg).toBeTruthy();
  });

  it('adds a todo when input has text', async () => {
    const { getByTestId, findByText } = renderScreen();
    fireEvent.changeText(getByTestId('todoInput'), 'Learn Detox');
    fireEvent.press(getByTestId('addButton'));
    expect(await findByText('Learn Detox')).toBeTruthy();
  });

  it('toggles a todo as completed', async () => {
    const { getByTestId, findByTestId, findByText } = renderScreen();
    fireEvent.changeText(getByTestId('todoInput'), 'Write tests');
    fireEvent.press(getByTestId('addButton'));
    await findByText('Write tests');
    fireEvent.press(getByTestId('todoCheckbox'));
    expect(await findByTestId('completedLabel')).toBeTruthy();
  });

  it('deletes a todo', async () => {
    const { getByTestId, findByText, queryByText } = renderScreen();
    fireEvent.changeText(getByTestId('todoInput'), 'Delete me');
    fireEvent.press(getByTestId('addButton'));
    await findByText('Delete me');
    fireEvent.press(getByTestId('deleteButton'));
    await waitFor(() => expect(queryByText('Delete me')).toBeNull());
  });
});
