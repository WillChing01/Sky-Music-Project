import { useEffect, useReducer } from "react";
import { getDataByKeys } from "../utility/fetchNapster";

const header = { headers: { apikey: 'NzQ2YmQ5NmUtODM2MS00ZDg2LTg4NzMtZGE0ZDExZmViN2U3' } };

const initialState =  {
    data: {},
    error: {
      statusCode: null,
      statusText: '',
      userMessage: ''
    },
    pendingMsg: '',
    fetchAttemptsLeft: 5
};

const dataReducer = (state, action) => {
    switch (action.type) {
        case 'DATA_LOADING':
            return {
            ...initialState, 
            pendingMsg: 'Loading...'
            };
        case 'NEEDS_RETRY':
            return {
                ...initialState,
                fetchAttemptsLeft: state.fetchAttemptsLeft - 1
            };
        case 'ABOUT_TO_RETRY':
            return {
            ...initialState, 
            pendingMsg: `Fetch failed. ${state.fetchAttemptsLeft} tries left. Retrying in ${action.payload} seconds...`
            };
        case 'DATA_RETRIEVED':
            return {
            ...initialState, 
            data: action.payload
            }
        case 'ERROR':
            return {
            ...initialState,
            error: action.payload
            };
        case 'INITIALISE':
            return initialState;
    }
};


const getUserErrMessage = () => {
    if (err.status >= 500) {
          return 'We couldn\'t connect to the server.';
    } else if (err.status === 404) {
          return 'The resource could not be found.';
    } else {
          return 'There was a problem fetching the data.';
    }
};


const useFetch = (url, keys) => {
    const [state, dispatch] = useReducer(dataReducer, initialState);

    const createAboutToRetry = (resolve, countdown) => {
        if (countdown === 0) {
            resolve();
        } else {
            dispatch({
                type: 'ABOUT_TO_RETRY', 
                payload: countdown
            });
            countdown -= 1000;
        }
        return countdown;
    };

    const waitForRetry = (delay) => {
        return new Promise((resolve) => {
            let countdown = delay;
            countdown = createAboutToRetry(resolve, countdown);
            setInterval(() => {
               countdown = createAboutToRetry(resolve, countdown);
            }, 1000);
        });
    };

    const dispatchErr = (err) => {
        dispatch({
            type: 'ERROR',
            payload: {
            statusCode: err.status,
            statusText: err.statusText,
            userMessage: getUserErrMessage(err)
            }
        });
    };

    const fetchRetry = async (delay, tries)  => {
        const handleFetchError = (err) => {
           if (err.status >= 500) handleRetry(err);
           else dispatchErr(err);
        };

        const handleRetry = (err) => {
            const triesLeft = tries - 1;
            if (triesLeft === 0) {
              dispatchErr(err); 
            } else {
                dispatch({
                    type: 'NEEDS_RETRY'
                });
                waitForRetry(delay)
                .then(() => fetchRetry(url, delay, triesLeft, header));
            }
        };

        const res = await fetch(url, header)
        if (res.ok) {
            const jRes = await res.json();
            const data = getDataByKeys(jRes, keys);
            dispatch({
                type: 'DATA_RETREIVED',
                payload: data
            });
        } else {
            handleFetchError(res)
        }
    };

    useEffect(() => {
        fetchRetry(5000, 5);

        return () => dispatch({type: 'INITIALISE'});
    }, [])

    return state;

}

export default useFetch;      
