import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSignUp from '../../../hooks/auth/useSignUp';
import '../ProfileForms.css';

const SignUp = () => {
    const { signup, isPending, error} = useSignUp();
    const [finishedAttempt, setFinishedAttempt] = useState(false);
    const navigate = useNavigate();
    
    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form['username'].value;
        const password = form['password'].value;
        const confirmPassword = form['confirm-password'].value;
        await signup(username, password, confirmPassword);
        setFinishedAttempt(username);
    };

    useEffect(() => {
        if (!error && finishedAttempt) navigate(`/profile/user/${finishedAttempt}`);
        setFinishedAttempt(false);
    }, [error, finishedAttempt]);

    return (
        <div className='center-form'>
            <form className='user-form border' onSubmit={handleSignUp}>
                <h1>Sign Up</h1>
                <div className='form-group'>
                    <label htmlFor='signup-username'>Username</label>
                    <input type="text" className="form-control" id="signup-username" name='username' placeholder="Enter username" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="signup-password">Password</label>
                    <input type="password" className="form-control" id="signup-password" name='password' placeholder="Enter password" required/>
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