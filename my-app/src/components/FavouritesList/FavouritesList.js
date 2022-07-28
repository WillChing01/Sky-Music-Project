import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { getIsFetchResolved, getTracksInfo } from "../../utility/fetchNapster";
import { swapPlaylist } from "../../state/slices/playablePlaylist/playablePlaylistSlice";
import { getPlaylistInfo } from "../../utility/parseMusicItem";

import Grid from '../../components/Grid/Grid';
import List from '../../components/List/List';
import { useEffect } from "react";



const apikey = process.env.REACT_APP_NAPSTER_API_KEY;

const FavouritesList = () => {

    const dispatch = useDispatch();

    const favouritesList = useSelector((state) => state.profileInfo.favourites);
    const view = useSelector((state) => state.view.value);
    const fetchOptions = {headers: { apikey }};
    const tracksRes = useFetch(...getTracksInfo(favouritesList), [favouritesList], fetchOptions);
    const channelItems = tracksRes.items;

    useEffect(() => {
        if (channelItems.length) {
            const playlist = getPlaylistInfo(channelItems);
            dispatch(swapPlaylist(playlist));
        }
    }, [channelItems]);

    const getView = () => {
        if (channelItems.length) {
            const favouriteView = view === 'grid' ? <Grid channelItems={channelItems} /> 
                                : <List channelItems={channelItems} />
            return favouriteView;
        } else {
            if (!getIsFetchResolved(tracksRes)) return null;
            return <p className="indent">You haven't favourited any tracks.</p>
        }
    }

    return (
        <div>
            <h1 className="indent">Favourites</h1>
            { getView() }
        </div>
    );
}
 
export default FavouritesList;