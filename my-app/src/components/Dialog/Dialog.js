import { useState } from 'react'; 

const Dialog = ({children, handleCloseDialog}) => {

    return (
        <div className='dialog'>
            <div>
                <i className='close-dialog-icon bi bi-x' onClick={handleCloseDialog}></i>
            </div>
            {children}
        </div>
    );
}
 
export default Dialog;