import './Dialog.css';

const Dialog = ({children, handleCloseDialog}) => {

    return (
        <div className='dialog'>
            <div className='screen' onClick={handleCloseDialog}></div>
            <div className='dialog-box rounded p-3'>
                <div className='close-banner'>
                    <i className='close-dialog-icon bi bi-x m-auto' onClick={handleCloseDialog}></i>
                    <br/>
                    <hr/>
                </div>
                {children}
            </div>
        </div>
    );
}
 
export default Dialog;