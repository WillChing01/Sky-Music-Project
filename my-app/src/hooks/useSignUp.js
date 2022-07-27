import useFetch from "./useFetch";
import { useAuthContext } from "./useAuthContext";

const LOGIN = 'LOGIN';

const useSignUp = () => {
    const { dispatch } = useAuthContext();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const login = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({type: LOGIN, payload: user});
    };

    const signup = async (username, password) => {
        setIsPending(true)
        setError(null)

        const fetchOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        }
        const response = await fetch('/', fetchOptions);
        const data = await response.json();


        if (!response.ok) {
            setIsPending(false);
            setError(data.error);
        } else {
            login(data);
            setIsPending(false)
        }
    };
        
    return { signup, isPending, error };
};
 
export default useSignUp;
