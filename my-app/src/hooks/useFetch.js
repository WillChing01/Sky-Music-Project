import { useEffect, useReducer } from "react";
import { getDataByKeys } from "../utility/fetchNapster";

const _header = { headers: { apikey: 'NzQ2YmQ5NmUtODM2MS00ZDg2LTg4NzMtZGE0ZDExZmViN2U3' } };
const header = { headers: { apikey: 'NzQ2YmQ5NmUtODM2MS00ZDg2LTg4NzMtZGE0ZDExZmViNU3' } };

const initialState =  {
    items: [],
    error: {
      statusCode: null,
      statusText: '',
      userMsg: ''
    },
    pendingMsg: '',
    fetchAttemptsLeft: 5
};

const DATA_LOADING = 'DATA_LOADING';
const NEEDS_RETRY = 'NEEDS_RETRY';
const ABOUT_TO_RETRY = 'ABOUT_TO_RETRY';
const DATA_RETRIEVED = 'DATA_RETRIEVED';
const ERROR = 'ERROR';
const INITIALISE = 'INITIALISE';

const dataReducer = (state, action) => {
    switch (action.type) {
        case DATA_LOADING:
            return {
                ...initialState,
                fetchAttemptsLeft: state.fetchAttemptsLeft, // Only needed in strict mode
                pendingMsg: 'Loading...'
            };
        case NEEDS_RETRY:
            return {
                ...initialState,
                fetchAttemptsLeft: action.payload // state.fetchAttemptsLeft - 1
            };
        case ABOUT_TO_RETRY:
            return {
                ...initialState, 
                fetchAttemptsLeft: state.fetchAttemptsLeft,
                pendingMsg: `Fetch failed. ${state.fetchAttemptsLeft} tries left. Retrying in ${action.payload} seconds...`
            };
        case DATA_RETRIEVED:
            return {
                ...initialState, 
                items: action.payload
            }
        case ERROR:
            return {
                ...initialState,
                error: action.payload
            };
        case INITIALISE:
            return initialState;
        default:
            return state;
    }
};


const getUserErrMessage = (err) => {
    if (err.status >= 500) {
          return 'We couldn\'t connect to the server.';
    } else if (err.status === 404) {
          return 'The resource could not be found.';
    } else {
          return 'There was a problem fetching the data.';
    }
};


const useFetch = (url, keys, deps = []) => {
    const [state, dispatch] = useReducer(dataReducer, initialState);

    const createAboutToRetry = (resolve, countdown, id) => {
        if (countdown === 0) {
            clearInterval(id);
            resolve();
        } else {
            dispatch({
                type: ABOUT_TO_RETRY, 
                payload: countdown / 1000
            });
            countdown -= 1000;
        }
        return countdown;
    };

    const waitForRetry = (delay) => {
        return new Promise((resolve) => {
            let countdown = delay;
            countdown = createAboutToRetry(resolve, countdown);
            let id = setInterval(() => {
                countdown = createAboutToRetry(resolve, countdown, id);
            }, 1000);
        });
    };

    const dispatchErr = (err) => {
        dispatch({
            type: ERROR,
            payload: {
                statusCode: err.status,
                statusText: err.statusText,
                userMsg: getUserErrMessage(err)
            }
        });
    };

    const fetchRetry = async (delay, tries)  => {
        const handleFetchError = (err) => {
            // change this ---v
           if (err.status >= 400) handleRetry(err);
           else dispatchErr(err);
        };

        const handleRetry = (err) => {
            const triesLeft = tries - 1;
            if (triesLeft === 0) {
                dispatchErr(err); 
            } else {
                dispatch({
                    type: NEEDS_RETRY,
                    payload: triesLeft
                });
                waitForRetry(delay)
                .then(() => fetchRetry(delay, triesLeft, header))
            }
        };
        dispatch({
            type: DATA_LOADING
        });
        const res = await fetch(url, header)
        if (res.ok) {
            const jRes = await res.json();
            const data = getDataByKeys(jRes, keys);
            dispatch({
                type: DATA_RETRIEVED,
                payload: data
            });
        } else {
            handleFetchError(res)
        }
    };

    useEffect(() => {
        fetchRetry(5000, 5);

        return () => dispatch({type: INITIALISE});
    }, deps)

    return state;
}

export default useFetch;      
