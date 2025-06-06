import './ToDoTable.css';

export default function ToDoTable() {
    return (
        <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <input className="form-check-input me-1" type="checkbox"/>
                    <label className="form-check-label" htmlFor="firstCheckboxStretched">First checkbox</label>
                </div>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-primary">Edit</button>
                    <button type="button" className="btn btn-danger">Delete</button>
                </div>
            </li>            
        </ul>
    );
}
