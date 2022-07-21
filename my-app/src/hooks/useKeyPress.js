import { useEffect } from 'react';

const useKeyPress = (handleKeyPress, deps) => {
    useEffect(() => {
        const subToKeyPress = () => {
            document.addEventListener('keydown', handleKeyPress);
        };
        const unsubFromKeyPress = () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
        subToKeyPress();
        return unsubFromKeyPress;
    }, deps);
};

export default useKeyPress;