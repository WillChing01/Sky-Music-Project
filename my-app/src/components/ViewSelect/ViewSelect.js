const ViewSelect = ({view, setView}) => {

    const handleViewChange = (e) => {
        if(view === 'grid') {
            setView('list');
        } else {
            setView('grid');
        }
    };
    
    return (
        <div>
            <label htmlFor='gridViewRadio'>Grid</label>
            <input type='radio' id='gridViewRadio' onChange={handleViewChange} name='group' defaultChecked/>
            <label htmlFor='listViewRadio'>List</label>
            <input type='radio' id='listViewRadio' onChange={handleViewChange} name='group'/>
        </div>
    );
}
 
export default ViewSelect;