import { Link } from 'react-router-dom';

import useLogin from '../../../hooks/auth/useLogin';

import '../ProfileForms.css';

const LogIn = () => {
    const { login, isPending, error } = useLogin();

    console.log(
        error
    )

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form['username'].value;
        const password = form['password'].value;
        await login(username, password);
    };

    return (
        <div className='center-form'>
            <form className='user-form border' onSubmit={handleLogin}>
                <h1>Log In</h1>
                <div className='form-group'>
                    <label htmlFor='login-username'>Username</label>
                    <input type="text" className="form-control" id="login-username" aria-describedby="username-help" name="username" placeholder="Enter username" required/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input type="password" className="form-control" id="login-password" name="password" placeholder="Enter password" required/>
                </div>

                <button type="submit" className="btn btn-primary">{isPending ? 'Loading...': 'Log In'}</button>
                {error && <div className='profile-form-error'>{error}</div>}
                <div>
                    <span>Don't have an account? </span>
                    <Link to='../signup'>Sign Up</Link>
                </div>
            </form>
        </div>
    );
}

export default LogIn;