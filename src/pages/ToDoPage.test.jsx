import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import ToDoPage from './ToDoPage'
import store from '../store/store'
import { expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('ToDoPage Component', () => {
  test('render Edit Task title', () => {
    render(
      <Provider store={store}>
        <ToDoPage />
      </Provider>
    )
    const ToDoPageTitle = screen.getByText('Add Task')
    expect(ToDoPageTitle).toBeInTheDocument()
  })

  test('enter numbers and letters', async () => {
    render(
      <Provider store={store}>
        <ToDoPage />
      </Provider>
    )
    const input = screen.getByPlaceholderText('Task')
    const testValue = 'Task123'
    await userEvent.clear(input)
    await userEvent.type(input, testValue);

    expect(input).toHaveValue(testValue);
  })

  test('input validation with empty input', async () => {
    render(
      <Provider store={store}>
        <ToDoPage />
      </Provider>
    )
    const addButton = screen.getByRole('button', { name: /add/i })
    await userEvent.click(addButton)
    const errorMessage = await screen.findByText('Required')
    expect(errorMessage).toBeInTheDocument();
  })

  test('input validation with less than 5 characters', async () => {
    render(
      <Provider store={store}>
        <ToDoPage />
      </Provider>
    )
    const addButton = screen.getByRole('button', { name: /add/i })
    const input = screen.getByPlaceholderText('Task')
    const testValue = 'task'

    await userEvent.clear(input)
    await userEvent.type(input, testValue);
    await userEvent.click(addButton)

    const errorMessage = await screen.findByText('Must be longer then 5 caracters')
    expect(errorMessage).toBeInTheDocument();
  })

  test('input validation with more than 20 characters', async () => {
    render(
      <Provider store={store}>
        <ToDoPage />
      </Provider>
    )
    const addButton = screen.getByRole('button', { name: /add/i })
    const input = screen.getByPlaceholderText('Task')
    const testValue = 'task 1234567890 hello big text'

    await userEvent.clear(input)
    await userEvent.type(input, testValue);
    await userEvent.click(addButton)

    const errorMessage = await screen.findByText('Must be shorter then 20 caracters')
    expect(errorMessage).toBeInTheDocument();
  })

  test('add task to list', async () => {
    render(
      <Provider store={store}>
        <ToDoPage />
      </Provider>
    )
    const addButton = screen.getByRole('button', { name: /add/i })
    const input = screen.getByPlaceholderText('Task')
    const testValue = 'Task123'

    await userEvent.clear(input)
    await userEvent.type(input, testValue)
    await userEvent.click(addButton)

    const listElement = await screen.findByLabelText(testValue)
    expect(listElement).toBeInTheDocument()
  })

  test('tick checkbox', async () => {
    render(
      <Provider store={store}>
        <ToDoPage />
      </Provider>
    )

    const addButton = screen.getByRole('button', { name: /add/i })
    const input = screen.getByPlaceholderText('Task')
    const testValue = 'Check this task'

    await userEvent.clear(input)
    await userEvent.type(input, testValue)
    await userEvent.click(addButton)

    const checkbox = await screen.findByLabelText(testValue)
    expect(checkbox).not.toBeChecked()

    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked()
  })

  test('update task', async () => {
    render(
      <Provider store={store}>
        <ToDoPage />
      </Provider>
    )

    const addButton = screen.getByRole('button', { name: /add/i })
    const input = screen.getByPlaceholderText('Task')
    const oldText = 'oldText'
    const newText = 'newText'

    await userEvent.clear(input)
    await userEvent.type(input, oldText)
    await userEvent.click(addButton)

    const listItem = await screen.findByText(oldText)
    expect(listItem).toBeInTheDocument()

    const editButton = listItem.closest('li')?.querySelector('button.btn-primary')
    await userEvent.click(editButton)

    expect(input).toHaveValue(oldText)

    await userEvent.clear(input)
    await userEvent.type(input, newText)

    const updateButton = screen.getByRole('button', { name: /update/i })
    await userEvent.click(updateButton)

    expect(screen.queryByLabelText(oldText)).not.toBeInTheDocument()

    const updatedItem = await screen.findByLabelText(newText)
    expect(updatedItem).toBeInTheDocument()
  })

  test('delete task', async () => {
    render(
      <Provider store={store}>
        <ToDoPage />
      </Provider>
    )

    const addButton = screen.getByRole('button', { name: /add/i })
    const input = screen.getByPlaceholderText('Task')
    const text = 'text to delete'

    await userEvent.clear(input)
    await userEvent.type(input, text)
    await userEvent.click(addButton)

    const listItem = await screen.findByText(text)
    expect(listItem).toBeInTheDocument()

    const deleteButton = listItem.closest('li')?.querySelector('button.btn-danger')
    await userEvent.click(deleteButton)

    expect(listItem).not.toBeInTheDocument()
  })
})
