import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useKeyPress from '../../hooks/useKeyPress';
import { setCurrentVolume, setCachedVolume, toggleIsMuted } from '../../state/slices/configPlayerSlice';
import { setPlayerAudioVolume } from '../Player/Player';

import './VolumeControl.css';


const volumeIncrement = 0.05;


const VolumeControl = () => {
    const {currentVolume, cachedVolume, isMuted } = useSelector((state) => state.configPlayer);
    const dispatch = useDispatch();

    const handleClickVolumeIcon = () => {
        if (isMuted) {
            dispatch(setCurrentVolume(cachedVolume));
            setPlayerAudioVolume(cachedVolume);
        } else {
            dispatch(setCachedVolume(currentVolume));
            dispatch(setCurrentVolume(0));
            setPlayerAudioVolume(0);
        }
        dispatch(toggleIsMuted());
    }

    const handleUnmuteOnVolumeChange = (newVolume) => {
        const shouldUnmute = isMuted && newVolume !== 0;
        if (shouldUnmute) dispatch(toggleIsMuted());
    };

    const handleVolumeSliderChange = (e) => {
        const newVolume = parseFloat(e.target.value)/100;
        setPlayerAudioVolume(newVolume);
        dispatch(setCurrentVolume(newVolume));
        handleUnmuteOnVolumeChange(newVolume);
    };

    const jumpVolume = (direction) => {
        let newVolume = currentVolume;
        switch (direction) {
            case 'up':
                newVolume = Math.min(newVolume + volumeIncrement, 1);
                break;
            case 'down':
                newVolume = Math.max(newVolume - volumeIncrement, 0);
                break;
            default:
                break;
        }
        setPlayerAudioVolume(newVolume);
        dispatch(setCurrentVolume(newVolume));
    };


    const handleVolumeKeyPress = (e) => {
        if (document.activeElement.type !== 'search') {
            const key = e.key.toLowerCase();
            switch (key) {
                case 'm':
                    handleClickVolumeIcon();
                    break;
                case ']':
                    jumpVolume('up');
                    break;
                case '[':
                    jumpVolume('down');
                    break;
                default:
                    break;
            }
        }
    };
    
    const setInitialPlayerAudioVolume = () => {
        setPlayerAudioVolume(currentVolume);
    };
    
    useEffect(() => {
        setInitialPlayerAudioVolume();
    }, []);
    

    useKeyPress(handleVolumeKeyPress);
    
    const getVolumeIconClass = () => {
        const volumeIconClass = currentVolume === 0 ? 'bi bi-volume-mute icon'
                                                    : 'bi bi-volume-up icon';
        return volumeIconClass;
    };

    return (
        <>
            <i className={getVolumeIconClass()} onClick={handleClickVolumeIcon}></i> 
            <input type='range' min='0' max='100' value={currentVolume*100} onChange={handleVolumeSliderChange}/>
        </>
    );
}

export default VolumeControl;