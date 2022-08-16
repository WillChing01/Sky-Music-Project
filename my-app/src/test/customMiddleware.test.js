import { colourSchemeMiddleware } from "../state/middleware/customMiddleware";
import { toggleDarkMode } from "../state/slices/profileInfo/profileInfoSlice";

describe('colourSchemeMiddleware', () => {
    afterEach(() => {
        localStorage.clear();
    });

    it('should pass through action', () => {
        const store = {
            getState: jest.fn(() => ({})),
            dispatch: jest.fn()
        }
        const next = jest.fn();
        const action = { type: 'TEST' };

        colourSchemeMiddleware(store)(next)(action);

        const darkMode = localStorage.getItem('darkMode');
        expect(darkMode).toEqual(null);
        expect(next).toHaveBeenCalledWith(action);
    });

    it('should add darkMode to local storage when toggleDarkMode called', () => {
        const store = {
            getState: jest.fn(() => ({
                profileInfo: {
                    darkMode: false
                }
            })),
            dispatch: jest.fn()
        }
        const next = jest.fn();
        const action = { type: toggleDarkMode.toString() };

        colourSchemeMiddleware(store)(next)(action);

        const darkMode = localStorage.getItem('darkMode');
        expect(darkMode).toEqual('false');
        expect(next).toHaveBeenCalledWith(action);
    });
});