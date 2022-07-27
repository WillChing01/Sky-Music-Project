import { useState } from 'react';

import './ColourScheme.css';

const ColourScheme = () => {

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
        return isDark === true ? 'bi bi-sun-fill padded-icon'
                               : 'bi bi-moon padded-icon';
    }

    return (
        <i className={getColourSchemeClass()} onClick={toggleDarkMode} />
    );
}

export default ColourScheme;