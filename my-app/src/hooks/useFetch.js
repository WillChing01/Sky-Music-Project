import { useEffect, useReducer } from "react";
import { getDataByKeys } from "../utility/fetchNapster";

const initialState =  {
    items: [],
    error: {
      statusCode: null,
      statusText: '',
      userMsg: ''
    },
    pendingMsg: ''
};


const getDelay = (attempts) => {
    return Math.floor((2 ** attempts)) * 1000;
};

const DATA_LOADING = 'DATA_LOADING';
const ABOUT_TO_RETRY = 'ABOUT_TO_RETRY';
const DATA_RETRIEVED = 'DATA_RETRIEVED';
const ERROR = 'ERROR';
const INITIALISE = 'INITIALISE';

const dataReducer = (state, action) => {
    switch (action.type) {
        case DATA_LOADING:
            return {
                ...initialState, 
                pendingMsg: 'Loading...'
            };
        case ABOUT_TO_RETRY:
            return {
                ...initialState, 
                pendingMsg: `Fetch failed. ${action.payload.triesLeft} tries left. Retrying in ${action.payload.secsToRetry} seconds...`
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


const useFetch = (url, keys, deps = [], fetchOptions = {}, totalFetchAttempts = 5) => {
    const [state, dispatch] = useReducer(dataReducer, initialState);
    let isCancelled = false;

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) dispatch(action);
    };

    const dispatchAboutToRetry = (triesLeft, countdown) => {
        dispatchIfNotCancelled({
            type: ABOUT_TO_RETRY, 
            payload: {
                triesLeft,
                secsToRetry: countdown / 1000
            }
        });
    };

    const dispatchErr = (err) => {
        dispatchIfNotCancelled({
            type: ERROR,
            payload: {
                statusCode: err.status,
                statusText: err.statusText,
                userMsg: getUserErrMessage(err)
            }
        });
    };

    const dispatchDataRetrieved = (data) => {
        dispatchIfNotCancelled({
            type: DATA_RETRIEVED,
            payload: data
        });
    };


    const waitForRetry = (triesLeft, delay) => {
        return new Promise((resolve) => {
            let countdown = delay;
            dispatchAboutToRetry(triesLeft, countdown);
            const id = setInterval(() => {
                countdown -= 1000;
                if (countdown === 0) {
                    clearInterval(id);
                    resolve();
                }
               dispatchAboutToRetry(triesLeft, countdown);
            }, 1000);
            
        });
    };

    const fetchRetry = async (tries)  => {
        const handleFetchError = (err) => {
           if (err.status >= 500) handleRetry(err);
           else dispatchErr(err);
        };

        const handleRetry = (err) => {
            const triesLeft = tries - 1;
            const attempts = totalFetchAttempts - triesLeft;
            const delay = getDelay(attempts);
            if (triesLeft === 0) {
                dispatchErr(err); 
            } else {
                waitForRetry(triesLeft, delay)
                .then(() => fetchRetry(triesLeft))
            }
        };

        dispatch({
            type: DATA_LOADING
        });
        const res = await fetch(url, fetchOptions);
        if (res.ok) {
            const jRes = await res.json();
            const data = getDataByKeys(jRes, keys);
            dispatchDataRetrieved(data);
        } else {
            handleFetchError(res)
        }
    };

    useEffect(() => { 
        /*
         * The following is inferred from log statements: 
         * Suppose you are in React strict mode. Then, after useFetch has retured, and we have
         * rendered for the first time:
         * - the useEffect fires
         * - the clean up function for this useEffect fires
         * - isCancelled is set to true; and
         * - the useEffect fires _again_ 
         * This second useEffect still reads vars native to the first render. So 
         * without setting isCancelled = false in the useEffect, fetchRetry would see 
         * isCancelled = true in this case, and fail to make its dispatches. 
         */
        isCancelled = false;
        fetchRetry(totalFetchAttempts);

        return () => {
            isCancelled = true;
            dispatch({type: INITIALISE});
        }
    }, deps);

    return state;
}

export default useFetch;      
