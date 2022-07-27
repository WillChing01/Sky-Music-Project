import { Link } from 'react-router-dom';
import '../ProfileForms.css';

const LogIn = () => {
    return (
        <div className='center-form'>
            <form className='user-form border' action="http://localhost:3001/profile/login" method="POST">
                <h1>Log In</h1>
                <div className='form-group'>
                    <label htmlFor='login-username'>Username</label>
                    <input type="email" className="form-control" id="login-username" aria-describedby="username-help" placeholder="Enter username"/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input type="password" className="form-control" id="login-password" placeholder="Enter password"/>
                </div>

                <button type="submit" className="btn btn-primary">Log In</button>

                <div>
                    <span>Don't have an account? </span>
                    <Link to='../signup'>Sign Up</Link>
                </div>
            </form>
        </div>
    );
}

export default LogIn;