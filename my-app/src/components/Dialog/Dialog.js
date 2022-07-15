import './Dialog.css';

const Dialog = ({children, handleCloseDialog}) => {

    return (
        <div className='dialog'>
            <div className='screen' onClick={handleCloseDialog}></div>
            <div className='dialog-box p-3'>
                <div className='close-banner'>
                    <i className='close-dialog-icon bi bi-x' onClick={handleCloseDialog}></i>
                </div>
                <hr/>
                {children}
            </div>
        </div>
    );
}
 
export default Dialog;