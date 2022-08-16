import { toggleDarkMode } from "../slices/profileInfo/profileInfoSlice";

export const colourSchemeMiddleware = store => next => action => {
    const result = next(action);

    if (action.type === toggleDarkMode.toString()) {
        const darkMode = String(store.getState().profileInfo.darkMode)
        localStorage.setItem('darkMode', darkMode);
    }

    return result;
};