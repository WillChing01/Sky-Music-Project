import { useState } from 'react';
import { useAuthContext } from "../useAuthContext";

const LOGIN = 'LOGIN';

const useLogin = () => {
    const { dispatch } = useAuthContext();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const proceedLogin = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({type: LOGIN, payload: user});
    };


    const login = async (username, password) => {
            setIsPending(true);
            setError(null);
    
            const fetchOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password })
            }
            const response = await fetch('/api/auth/login', fetchOptions);
            const data = await response.json();
    
            if (!response.ok) {
                setIsPending(false);
                setError(data.error);
            } else {
                proceedLogin(data);
                setIsPending(false)
            }
    };
        
    return { login, isPending, error };
};
 
export default useLogin;
