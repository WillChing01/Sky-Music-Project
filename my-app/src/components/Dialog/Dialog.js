import { useState } from 'react'; 
import './Dialog.css';

const Dialog = ({children, handleCloseDialog}) => {

    return (
        <div className='dialog'>
            <div className='screen' onClick={handleCloseDialog}></div>
            <div className='dialog-box rounded'>
                <div>
                    <i className='close-dialog-icon bi bi-x' onClick={handleCloseDialog}></i>
                </div>
                {children}
            </div>
        </div>
    );
}
 
export default Dialog;