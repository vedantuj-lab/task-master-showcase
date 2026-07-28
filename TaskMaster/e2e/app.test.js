/* global device, element, by, expect, waitFor */

describe('TaskMaster E2E', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('launches the app', async () => {
    await expect(element(by.id('todoInput'))).toBeVisible();
  });

  it('shows input and add button', async () => {
    await expect(element(by.id('todoInput'))).toBeVisible();
    await expect(element(by.id('addButton'))).toBeVisible();
  });

  it('adds a todo', async () => {
    await element(by.id('todoInput')).typeText('Buy groceries');
    await element(by.id('addButton')).tap();
    await expect(element(by.text('Buy groceries'))).toBeVisible();
  });

  it('shows validation message when input is empty', async () => {
    await element(by.id('addButton')).tap();
    await expect(element(by.id('validationMessage'))).toBeVisible();
  });

  it('toggles todo as completed', async () => {
    await element(by.id('todoInput')).typeText('Learn Detox');
    await element(by.id('addButton')).tap();
    await element(by.id('todoCheckbox')).atIndex(0).tap();
    await expect(element(by.id('completedLabel')).atIndex(0)).toBeVisible();
  });

  it('deletes a todo', async () => {
    await element(by.id('todoInput')).typeText('Delete me');
    await element(by.id('addButton')).tap();
    await element(by.id('deleteButton')).atIndex(0).tap();
    await expect(element(by.text('Delete me'))).not.toBeVisible();
  });

  it('handles multiple todos', async () => {
    await element(by.id('todoInput')).typeText('Task 1');
    await element(by.id('addButton')).tap();
    await element(by.id('todoInput')).typeText('Task 2');
    await element(by.id('addButton')).tap();
    await element(by.id('todoInput')).typeText('Task 3');
    await element(by.id('addButton')).tap();
    await expect(element(by.text('Task 1'))).toBeVisible();
    await expect(element(by.text('Task 2'))).toBeVisible();
    await expect(element(by.text('Task 3'))).toBeVisible();
  });

  it('persists todos after app restart', async () => {
    await element(by.id('todoInput')).typeText('Persistent Task');
    await element(by.id('addButton')).tap();
    await device.launchApp({ newInstance: true });
    await expect(element(by.text('Persistent Task'))).toBeVisible();
  });

  it('navigates within Home screen', async () => {
    await expect(element(by.id('appHeader'))).toBeVisible();
  });
});
