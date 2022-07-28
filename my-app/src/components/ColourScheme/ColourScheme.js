import { useState } from 'react';

import './ColourScheme.css';

const ColourScheme = () => {

    //const { isDark } = useSelector((state) => state.playerInfo.darkMode);
    const [ isDark, setIsDark ] = useState(false);

    const getDocumentElement = () => {
        return document.documentElement;
    }

    const toggleDarkMode = () => {
        const doc = getDocumentElement();
        if (isDark) {
            doc.className = '';
        } else {
            doc.className = 'dark-mode-filter';
        }
        setIsDark(!isDark);
    }

    const getColourSchemeClass = () => {
        return isDark === true ? 'bi bi-sun-fill border rounded ms-2 me-2 padded-icon'
                               : 'bi bi-moon-fill border rounded ms-2 me-2 padded-icon';
    }

    return (
        <i className={getColourSchemeClass()} onClick={toggleDarkMode} />
    );
}

export default ColourScheme;