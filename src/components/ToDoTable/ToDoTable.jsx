import { useDispatch, useSelector } from 'react-redux';
import './ToDoTable.css';
import { deleteItem, tickItem, setEditTask } from '../../store/ToDoSlice';
import { useState } from 'react';

export default function ToDoTable() {
    const tasks = useSelector(state => state.ToDos.data);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteItem(id));
    }

    const handleTick = (id) => {
        dispatch(tickItem(id));
    }

    const handleEdit = (task) => {
        dispatch(setEditTask(task));
    };

    return (
        <div>
            {tasks.length === 0 ?
                (<p>no tasks</p>)
                :
                (
                    <ul className="list-group">
                        {tasks.map(task => (
                            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <input
                                        id={`checkbox-${task.id}`}
                                        className="form-check-input me-1"
                                        type="checkbox"
                                        onClick={() => handleTick(task.id)}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`checkbox-${task.id}`}
                                    >
                                        {task.task}
                                    </label>

                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-primary" onClick={() => handleEdit(task)}>Edit</button>
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
        </div>




    );
}
