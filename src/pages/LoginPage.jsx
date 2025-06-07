import { useRef } from "react"
import { useDispatch } from "react-redux";
import { signInAsync } from "../store/authSlice";

export default function LoginPage() {

    const loginRef = useRef();
    const passRef = useRef();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(signInAsync({
            username: loginRef.current.value,
            password: passRef.current.value
        }));
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="login" className="form-label">Enter your login</label>
                <input type="text" name="login" ref={loginRef} placeholder="Login" className="form-control" />
                <label htmlFor="password" className="form-label">Enter your password</label>
                <input type="password" name="password" ref={passRef} placeholder="Password" className="form-control" />
                <button type="submit" className="btn btn-primary mb-3">Login</button>
            </form>
        </div>
    )
}