import { Link, useNavigate } from 'react-router-dom';
import useSignUp from '../../../hooks/auth/useSignUp';
import { useAuthContext } from '../../../hooks/useAuthContext';
import '../ProfileForms.css';

const SignUp = () => {
    const { signup, isPending, error } = useSignUp();
    const navigate = useNavigate();
    
    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form['username'].value;
        const password = form['password'].value;
        const confirmPassword = form['confirm-password'].value;
        await signup(username, password, confirmPassword);
    };

    return (
        <div className='center-form'>
            <form className='user-form border' onSubmit={handleSignUp}>
                <h1>Sign Up</h1>
                <div className='form-group'>
                    <label htmlFor='signup-username'>Username</label>
                    <input type="text" className="form-control" id="signup-username" name='username' placeholder="Enter username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="signup-password">Password</label>
                    <input type="password" className="form-control" id="signup-password" name='password' placeholder="Enter password"/>
                </div>

                <div className="form-group">
                    <label htmlFor="signup-confirm-password">Confirm Password</label>
                    <input type="password" className="form-control" id="signup-confirm-password" name='confirm-password' placeholder="Confirm password"/>
                    <small id="username-help" className="form-text text-muted">Password must be at least 8 characters long.</small>
                </div>
                <button type="submit" className="btn btn-primary">{isPending ? 'Loading': 'Sign Up'}</button>
                {error && <div className='profile-form-error'>{error}</div>}
                <div>
                    <span>Already have an account? </span>
                    <Link to='../login'>Log In</Link>
                </div>
            </form>
        </div>
    );
};

export default SignUp;

/*
<div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
</div>
*/

/*
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
                <Link to='../login'>Log in</Link>
            </div>
        </form> */