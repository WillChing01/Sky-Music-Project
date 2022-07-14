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
            <div className="panel p-1">
                <GenreSelect filter={filter} setFilter={setFilter} />
                <ChannelSelect filter={filter} setFilter={setFilter}/>
                <label htmlFor="explicit-checkbox">Show Explicit</label>
                <input type="checkbox" onClick={handleExplicit} id="explicit-checkbox" defaultChecked={filter.showExplicit}/>
                {/*  */}
            </div>
            
        </details>
    );
}
 
export default FilterControlPanel;