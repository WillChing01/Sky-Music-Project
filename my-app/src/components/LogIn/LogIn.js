import { Link } from 'react-router-dom';

const LogIn = () => {
    return (
        <form action="http://localhost:3001/profile/login" method="POST">
            <label htmlFor="login-username">Username</label>
            <input id="login-username" className='form-label' type='text' name="username"></input>
            
            <label htmlFor="login-password">Password</label>
            <input id="login-password" className='form-label' type='password' name="password"></input>
            
            <button type="submit">Log in</button>
            <div>
                Not a member?
                <Link to='/signup'>Sign up</Link>
            </div>
        </form>
    );
}

export default LogIn;