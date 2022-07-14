import GenreSelect from "../GenreSelect/GenreSelect";
import ChannelSelect from "../ChannelSelect/ChannelSelect";
import './FilterControlPanel.css';

const FilterControlPanel = ({ filter, setFilter }) => {

    const handleExplicit = () => {
        setFilter({...filter, showExplicit: !filter.showExplicit});
    }

    return (
        <details>
            <summary>
                <i className='bi bi-filter'></i> Filter
            </summary>
            <div className="border panel p-1">
                <GenreSelect filter={filter} setFilter={setFilter} />
                <ChannelSelect filter={filter} setFilter={setFilter}/>
                <h6>Other</h6>
                <label htmlFor="explicit-checkbox" className='checkbox p-1'>Explicit
                    <span></span>
                    <input type="checkbox" onClick={handleExplicit} id="explicit-checkbox" defaultChecked={filter.showExplicit}/>
                </label>   
            </div>
            
        </details>
    );
}
 
export default FilterControlPanel;