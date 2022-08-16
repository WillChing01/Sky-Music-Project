import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../state/slices/profileInfo/profileInfoSlice';

import './ColourScheme.css';

const ColourScheme = () => {

    const { darkMode } = useSelector((state) => (state.profileInfo));
    const dispatch = useDispatch();

    const getDocumentElement = () => {
        return document.documentElement;
    };

    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode());
    };

    useEffect(() => {
        const doc = getDocumentElement();
        doc.className = darkMode === true ? 'dark-mode-filter'
                                          : '';
    },[darkMode]);

    const getColourSchemeClass = () => {
        return darkMode === true ? 'bi bi-sun-fill border rounded ms-2 me-2 padded-icon'
                                 : 'bi bi-moon-fill border rounded ms-2 me-2 padded-icon';
    };

    return (
        <i className={getColourSchemeClass()} onClick={handleToggleDarkMode} />
    );
};

export default ColourScheme;