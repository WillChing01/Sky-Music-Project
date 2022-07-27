import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <form action="http://localhost:3001/profile/signup" method="POST">
            <label htmlFor="signup-username">Username</label>
            <input id="signup-username" className='form-label' type='text' name="username"></input>
            
            <label htmlFor="signup-password">Password</label>
            <input id="signup-password" className='form-label' type='password' name="password"></input>
            
            <label htmlFor="signup-confirm-password">Confirm password</label>
            <input id="signup-confirm-password" className='form-label' type='password' name="password"></input>
            
            <button type="submit">Sign up</button>
            <div>
                Already have an account?
                <Link to='/login'>Log in</Link>
            </div>
        </form>
    );
}

export default SignUp;