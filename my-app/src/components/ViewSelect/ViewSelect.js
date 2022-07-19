import { useDispatch } from 'react-redux';
import { toggleView } from '../../state/slices/viewSlice';

import './ViewSelect.css';


const ViewSelect = ({}) => {

    const dispatch = useDispatch();

    const handleViewChange = (e) => {
        dispatch(toggleView());
    };
    
    return (
        <div className='view-box border'>
            <input type='radio' id='grid-view-radio' onChange={handleViewChange} name='group' defaultChecked/>
            <label htmlFor='grid-view-radio' className='view-radio p-1'>Grid <i className='bi bi-grid'></i></label>
            <input type='radio' id='list-view-radio' onChange={handleViewChange} name='group'/>
            <label htmlFor='list-view-radio' className='view-radio p-1'>List <i className="bi bi-list"></i></label>   
        </div>
    );
}
 
export default ViewSelect;