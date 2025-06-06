import { Form, Formik, ErrorMessage, Field } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import './ToDoInput.css'
// import { addItem } from '../store/ToDoSlice';

export default function ToDoInput() {

    // const ToDo = useSelector(state => state.ToDos.data);
    // const dispatch = useDispatch();

    // const onAdd = (values) => {
    //     dispatch(addItem({value: values.ToDo}));
    // };

    const ToDoSchem = Yup.object({
        ToDo: Yup.string()
            .min(5, 'Must be longer then 5 caracters')
            .max(20, 'Must be shorter then 20 caracters')
            .required('Required'),
    })

    return (
        <Formik
            initialValues={{ ToDo: '' }}
            enableReinitialize={true}
            validationSchema={ToDoSchem}
            onSubmit={(values, { resetForm }) => {
                onAdd(values)
                resetForm()
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <p>Add task</p>
                    <div className="input-group">
                        <Field name='ToDo' placeholder='Task' className={`form-control ${errors.ToDo && touched.ToDo ? 'is-invalid' : ''}`}/>
                        <button type='submit' className="btn btn-primary">Add</button>
                    </div>
                    <ErrorMessage name='ToDo' component='div' className='error-massage' />
                </Form>
            )}
        </Formik>
    )
}