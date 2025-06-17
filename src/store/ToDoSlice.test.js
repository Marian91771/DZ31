import { describe, expect } from 'vitest';
import ToDoReducer, { addItem, deleteItem, tickItem, setEditTask, updateItem } from '../store/ToDoSlice';

describe('ToDoReducer', () => {

    it('create initial state', () => {
        expect(ToDoReducer(undefined, { type: 'unknown' })).toEqual({ data: [], editTask: null, })
    })

    it('add task', () => {
        const action = addItem({ id: Date.now(), done: false, task: 'Test Task' });
        const state = ToDoReducer({ data: [], editTask: null, }, action)
        expect(state.data.length).toBe(1)
        expect(state.data[0].task).toBe('Test Task');
        expect(state.data[0].done).toBe(false)
    })

    it('delete task', () => {
        const initialState = {
            data: [{ id: 1, done: false, task: 'Remove this Task' }],
            editTask: null,
        }
        const state = ToDoReducer(initialState, deleteItem(1))
        expect(state.data.length).toBe(0)
    })

    it('add tick task', () => {
        const initialState = {
            data: [{ id: 1, done: false, task: 'Tick this Task' }],
            editTask: null,
        }
        const state = ToDoReducer(initialState, tickItem(1))
        expect(state.data[0].done).toBe(true)
    })

    it('remove tick task', () => {
        const initialState = {
            data: [{ id: 1, done: true, task: 'Tick this Task' }],
            editTask: null,
        }
        const state = ToDoReducer(initialState, tickItem(1))
        expect(state.data[0].done).toBe(false)
    })

    it('set task to update', () => {
        const initialState = {
            data: [{ id: 1, done: false, task: 'Update this Task' }],
            editTask: null,
        }
        const state = ToDoReducer(initialState, setEditTask({ id: 1, done: false, task: 'Update this Task' }))
        expect(state.editTask).toEqual({ id: 1, done: false, task: 'Update this Task' })
    })

    it('update task', () => {
        const initialState = {
            data: [{ id: 1, done: false, task: 'Update this Task' }],
            editTask: { id: 1, done: false, task: 'Update this Task' },
        }
        
        const updatedTsk = { id: 1, done: false, task: 'New Task' }

        const state = ToDoReducer(initialState, updateItem(updatedTsk))
        expect(state.data.find(i => i.id === 1)?.task).toBe('New Task');
    expect(state.editTask).toBeNull();
    })
})