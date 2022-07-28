import { useState } from 'react';
import { useAuthContext } from "../useAuthContext";

const LOGIN = 'LOGIN';

const useSignUp = () => {
    const { dispatch } = useAuthContext();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const proceedLogin = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({type: LOGIN, payload: user});
    };

    const passwordChecksOut = (password, confirmPassword) => {
        const arePasswordsMatching = password === confirmPassword;
        if (!arePasswordsMatching) {
            setError('Your passwords do not match');
            return false;
        }
        const isPasswordLongEnough = password.length >= 8;
        if (!isPasswordLongEnough) {
            setError('Your password is too short.');
            return false;
        } 
        return true;
    };

    const signup = async (username, password, confirmPassword) => {
        setError(null)
        if (passwordChecksOut(password, confirmPassword)) {
            setIsPending(true)
           
            const fetchOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password })
            }

            const response = await fetch('/api/auth/signup', fetchOptions);
            const data = await response.json();
    
            if (!response.ok) {
                setIsPending(false);
                setError(data.error);
            } else {
                proceedLogin(data);
                setIsPending(false)
            }
        }
        return error;
    };

    console.log("error in useSignUp", error);

    return { signup, isPending, error };
};
 
export default useSignUp;
