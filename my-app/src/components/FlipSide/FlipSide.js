import './FlipSide.css'

const FlipSide = ({children, side, handleFlip}) => {

    const getSideClassName = () => {
        const sideClass = `${side}`;
        const sideClassName = `flip-side ${sideClass}`;
        return sideClassName;
    };

    return (
        <div className={getSideClassName()}>
            <div className='wrapped-side'>
                    <i className='bi bi-arrow-left-right' onClick={handleFlip}></i>
                    {children}
               </div>
        </div>
    );
}
 
export default FlipSide;