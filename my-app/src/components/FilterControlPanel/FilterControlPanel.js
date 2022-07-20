import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleExplicit } from '../../state/slices/filterSlice';  

import GenreSelect from '../GenreSelect/GenreSelect';
import ChannelSelect from '../ChannelSelect/ChannelSelect';

import './FilterControlPanel.css';


const FilterControlPanel = () => {

    const showExplicit = useSelector((state) => state.filter.showExplicit);
    const dispatch = useDispatch()

    useEffect(() => {
        const filterTab = document.querySelector('#filter-tab');
        document.addEventListener('click', (e) => {
            if (!filterTab.contains(e.target)) {
                filterTab.removeAttribute('open');
            } 
          })
    },[]);

    const handleExplicit = () => {
        dispatch(toggleExplicit());
    }

    return (
        <details id="filter-tab">
            <summary>
                <i className='bi bi-filter'></i> Filter
            </summary>
            <div className="border panel p-1">
                <GenreSelect />
                <ChannelSelect />
                <h6>Other</h6>
                <label htmlFor="explicit-checkbox" className='checkbox p-1'>Explicit
                    <span></span>
                    <input type="checkbox" onClick={handleExplicit} id="explicit-checkbox" defaultChecked={showExplicit}/>
                </label>   
            </div>
        </details>
    );
}
 
export default FilterControlPanel;