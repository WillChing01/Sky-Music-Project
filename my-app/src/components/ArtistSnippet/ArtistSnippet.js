const ArtistSnippet = ({name, bios}) => {
    return (
        <div className='py-2 px-4 border rounded card-view'>
            <h5>{name}</h5>
            {bios.map((bio, i) => <p key={i}>{bio}</p>)}
        </div>
    );
}
 
export default ArtistSnippet;