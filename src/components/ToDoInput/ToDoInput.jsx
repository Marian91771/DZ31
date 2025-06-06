import { Form, Formik, ErrorMessage, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import './ToDoInput.css'
import { addItem, updateItem } from '../../store/ToDoSlice';

export default function ToDoInput() {

    const editTask = useSelector(state => state.ToDos.editTask);
    const dispatch = useDispatch();

    const onSubmit = (values, { resetForm }) => {
        if (editTask) {
            dispatch(updateItem({ id: editTask.id, task: values.ToDo }));
        } else {
            dispatch(addItem({ task: values.ToDo }));
        }
        resetForm();
    };

    const ToDoSchem = Yup.object({
        ToDo: Yup.string()
            .min(5, 'Must be longer then 5 caracters')
            .max(20, 'Must be shorter then 20 caracters')
            .required('Required'),
    })

    return (
        <Formik
            initialValues={{ ToDo: editTask ? editTask.task : '' }}
            enableReinitialize={true}
            validationSchema={ToDoSchem}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <Form>
                    <p>{editTask ? "Edit Task" : "Add Task"}</p>
                    <div className="input-group">
                        <Field
                            name="ToDo"
                            className={`form-control ${errors.ToDo && touched.ToDo ? 'is-invalid' : ''}`}
                            placeholder="Task"
                        />
                        <button type="submit" className="btn btn-primary">
                            {editTask ? "Update" : "Add"}
                        </button>
                    </div>
                    <ErrorMessage name="ToDo" component="div" className="error-massage" />
                </Form>
            )}
        </Formik>
    )
}