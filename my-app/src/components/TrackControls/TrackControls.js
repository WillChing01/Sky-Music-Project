import { useDispatch, useSelector } from 'react-redux';
import { toggleIsShuffle, toggleShouldLoop } from '../../state/slices/configPlayerSlice';
import { toggleIsPlaying } from '../../state/slices/playerInfoSlice';
import { setPlayerAudioLoop, setPlayerAudioCurrentTime, getPlayerAudio } from '../Player/Player';

import useKeyPress from '../../hooks/useKeyPress';

import './TrackControls.css';

const tinyTimeIncrement = 0.0001;
const skipIncrement = 5;

const TrackControls = ({ isPlaying, currentPreviewURL, setNextTrack, setPreviousTrack }) => {

    const { isShuffle, shouldLoop } = useSelector((state) => state.configPlayer);
    const dispatch = useDispatch();

    const givenTrackLoadedIntoPlayer = (effect) => {
        const isTrackLoadedIntoPlayer = !!currentPreviewURL;
        if (isTrackLoadedIntoPlayer) {
            effect();
        }
     };

    const handleToggleShuffleTracks = () => {
        dispatch(toggleIsShuffle());
    };

    const handleToggleLoopTrack = () => {
        setPlayerAudioLoop(!shouldLoop);
        dispatch(toggleShouldLoop());
    };
        
    const handleToggleIsPlaying = () => {
        const effect = () => {
            dispatch(toggleIsPlaying());
        };

        givenTrackLoadedIntoPlayer(effect); 
    };
    
    const handlePreviousTrack = () => {
        const effect = () => {
            //setPlayerAudioCurrentTime(0);
            setPreviousTrack();
        };

        givenTrackLoadedIntoPlayer(effect);
    };

    const handleNextTrack = () => {
        const effect = () => {
            // const playerAudio = getPlayerAudio();
            // const trackDuration = playerAudio.duration;
            // const newPlayerAudioTime = trackDuration - tinyTimeIncrement;
            // setPlayerAudioCurrentTime(newPlayerAudioTime);  
            setNextTrack();
        };

        givenTrackLoadedIntoPlayer(effect);
    };

    const skipBackwards = () => {
        const effect = () => {
            const playerAudio = getPlayerAudio();
            const currentPlayerAudioTime = playerAudio.currentTime;
            const candidatePlayerAudioTime = currentPlayerAudioTime - skipIncrement;
            const newPlayerAudioTime = Math.max(0, candidatePlayerAudioTime);
            setPlayerAudioCurrentTime(newPlayerAudioTime);
        };

        givenTrackLoadedIntoPlayer(effect);
    };

    const skipForwards = () => {
        const effect = () => {
            const playerAudio = getPlayerAudio();
            const currentPlayerAudioTime = playerAudio.currentTime;
            const trackDuration = playerAudio.duration;
            const prePauseDuration = trackDuration - tinyTimeIncrement; 
            const candidatePlayerAudioTime = currentPlayerAudioTime + skipIncrement;
            const newPlayerAudioTime = Math.min(prePauseDuration, candidatePlayerAudioTime);
            setPlayerAudioCurrentTime(newPlayerAudioTime);
        };

        givenTrackLoadedIntoPlayer(effect);
    };

    const handleTrackControlsKeyPress = (e) => {
        if (document.activeElement.type !== 'search') {
            const key = e.key.toLowerCase();
            switch (key) {
                case 'k':
                    handleToggleIsPlaying();
                    break;
                case 'j':
                    handlePreviousTrack();
                    break;
                case 'l':
                    handleNextTrack();
                    break;
                case 'arrowleft':
                    skipBackwards();
                    break;
                case 'arrowright':
                    skipForwards();
                    break;
                default:
                    break;
            }
        }
     };

     useKeyPress(handleTrackControlsKeyPress, [
        currentPreviewURL
     ]);


    const getShuffleIconClass = () => {
        const shuffleIconClass = isShuffle === true ? 'bi bi-shuffle icon-selected'
                                                    : 'bi bi-shuffle icon';
        return shuffleIconClass;
    }

    const getLoopIconClass = () => {
        const loopIconClass = shouldLoop === true ? 'bi bi-arrow-repeat icon-selected'
                                                  : 'bi bi-arrow-repeat icon';
        return loopIconClass;
    }

    const getPlayPauseIconClass = () => {
        const playPauseIconClass = isPlaying === true ? 'bi bi-pause icon'
                                                      : 'bi bi-play icon';
        return playPauseIconClass;
    }

    return (
        <div className='spread'>
            <i className={getShuffleIconClass()} onClick={handleToggleShuffleTracks}></i>
            <i className='bi bi-skip-backward icon' onClick={handlePreviousTrack}></i>
            <i className={getPlayPauseIconClass()} onClick={handleToggleIsPlaying}></i>
            <i className='bi bi-skip-forward icon' onClick={handleNextTrack}></i>
            <i className={getLoopIconClass()} onClick={handleToggleLoopTrack}></i>
        </div>
    );
}
 
export default TrackControls;