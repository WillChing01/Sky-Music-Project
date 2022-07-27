const ArtistSnippet = ({name, bio}) => {
    return (
        <div className='py-2 px-4 border rounded card-view'>
            <h5>{name}</h5>
            <p>{bio}</p>
        </div>
    );
}
 
export default ArtistSnippet;