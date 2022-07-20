import { useEffect } from 'react';

const useKeyPress = (handleKeyPress) => {
    useEffect(() => {
        const subToKeyPress = () => {
            document.addEventListener('keydown', handleKeyPress);
        };
        const unsubFromKeyPress = () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
        subToKeyPress();

        return unsubFromKeyPress;
    }, [handleKeyPress]);
};

export default useKeyPress;