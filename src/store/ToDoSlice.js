import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    editTask: null,
}

const ToDoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.data.push({ id: Date.now(), done: false, task: action.payload.task });
        },
        deleteItem: (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload);
        },
        tickItem: (state, action) => {
            const item = state.data.find(item => item.id === action.payload);
            if (item) {
                item.done = !item.done;
            }
        },
        setEditTask: (state, action) => {
            state.editTask = action.payload;
        },
        updateItem: (state, action) => {
            const { id, task } = action.payload;
            const item = state.data.find(i => i.id === id);
            if (item) {
                item.task = task;
            }
            state.editTask = null;
        }

    },
})

export const { addItem, deleteItem, tickItem, setEditTask, updateItem } = ToDoSlice.actions;
export default ToDoSlice.reducer