import { useState, useEffect, useCallback } from 'react';
import { getPlayerAudio, setPlayerAudioCurrentTime } from '../Player/Player';
import { formatTime } from '../../utility/format/formatBarTime';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsPlaying } from '../../state/slices/playerConfig/playerConfigSlice';

import './ProgressBar.css';

const refreshTimePeriod = 10;
const tinyFraction = 0.0001;

const ProgressBar = () => {
    const [songDuration, setSongDuration] = useState(0);
    const [songProgress, setSongProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [didPlayingChange, setDidPlayingChange] = useState(false);

    const isPlaying = useSelector((state) => state.playerConfig.isPlaying);
    const dispatch = useDispatch();

    const updateSongProgress = () => {
        const playerAudio = getPlayerAudio();
        const currentSongTime = playerAudio.currentTime;
        const newSongDuration = playerAudio.duration;
        const isSomeTrackLoaded = !isNaN(newSongDuration);

        if (isSomeTrackLoaded) {
            const newSongProgress = currentSongTime / newSongDuration;
            setSongDuration(newSongDuration);
            setSongProgress(newSongProgress);
        }
    };

    const getProgressBar = () => {
        return document.getElementById('progress-bar');
    };

    const getProgressBarBackground = () => {
        return document.getElementById('progress-bar-background');
    };

    const getFractionIntoProgressBar = (pixelsIn, barWidth) => {
        if (pixelsIn < 0) {
            return 0;
        } else if (pixelsIn > barWidth) {
            return 1 - tinyFraction;
        } else {
            return pixelsIn / barWidth;
        }
    };

    const getProgressBackgroundRect = () => {
        const progressBackground = getProgressBarBackground();
        const backgroundRect = progressBackground.getBoundingClientRect();
        return backgroundRect;
    };

    const getClientRectWidth = (rect) => {
        const width = rect.right - rect.left;
        return width;
    };

    const getPixelsIntoRect = (MouseEvent, rect) => {
        return MouseEvent.clientX - rect.left;
    }

    const setSongPosition = (MouseEvent) => {
        const progBackgrRect = getProgressBackgroundRect();
        const progBackgrWidth = getClientRectWidth(progBackgrRect); 
        
        const pixelsIntoProgrBackgr = getPixelsIntoRect(MouseEvent, progBackgrRect);
        const fractionIntoProgressBar = getFractionIntoProgressBar(pixelsIntoProgrBackgr, 
                                                                   progBackgrWidth);
        
        const isSomeTrackLoaded = songDuration !== 0;
        if (isSomeTrackLoaded) {
            const newTime = fractionIntoProgressBar * songDuration;
            setPlayerAudioCurrentTime(newTime);
        }
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        setSongPosition(e);
        setIsDragging(true);
        toggleTextSelect();
        if (isPlaying) {
            setDidPlayingChange(true);
            dispatch(toggleIsPlaying());
        }
    };

    const toggleTextSelect = () => {
        document
        .getElementById('root')
        .classList
        .toggle('dragging-progress-bar');
    };

    const handleMouseUp = useCallback((e) => {
        setIsDragging(false);
        toggleTextSelect();
        if (didPlayingChange) {
            setDidPlayingChange(false);
            dispatch(toggleIsPlaying());
        }
    }, [didPlayingChange]);

    const handleMouseMove = useCallback((e) => {
        if (isDragging) {
            setSongPosition(e);
        }
    }, [isDragging, songDuration]);

    useEffect(() => {
        const updateMouseEventListeners = () => {
            if (isDragging) {
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
            }
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        };
        
        return updateMouseEventListeners();
    }, [isDragging]);

    useEffect(() => {
        const refreshBarInterval = setInterval(() => {
            updateSongProgress();
        }, refreshTimePeriod);

        return () => clearInterval(refreshBarInterval);
    }, []);

    useEffect(() => {
        const updateProgressBarWidth = () => {
            const progressBar = getProgressBar();
            const songProgressPercentage = songProgress * 100;
            const songProgressPercentageStr = String(songProgressPercentage) + '%';
            progressBar.style.width = songProgressPercentageStr;
        };
        updateProgressBarWidth();
    }, [songProgress]);

    const getStrSongProgress = () => {
        return String(songProgress);
    };

    const getFormattedProgressTime = () => {
        const formattedProgress = formatTime(songDuration, songProgress);
        return formattedProgress;
    };

    const getFormattedRemainingTime = () => {
        const fractionSongRemaining = 1 - songProgress;
        const formattedTimeLeft = formatTime(songDuration, fractionSongRemaining);
        return formattedTimeLeft;
    };

    const getProgressBarBackgrClassName = () => {
        const isSomeTrackLoaded = songDuration !== 0;
        const cursorShouldBePointer = isSomeTrackLoaded && !isDragging;
        const possibleClickableClass = cursorShouldBePointer ? 'progress-clickable'
                                                             : '';
        const defaultClasses = 'progress progress-style';
        return `${defaultClasses} ${possibleClickableClass}`;
    };

    return (
        <div className='spread-bar'>
            <div className='time-format'>{getFormattedProgressTime()}</div>
            <div id='progress-bar-background' className={getProgressBarBackgrClassName()} onMouseDown={handleMouseDown}>
                <div id='progress-bar' className='progress-bar progress-bar-style' aria-valuenow={getStrSongProgress()} aria-valuemin='0' aria-valuemax='100'></div>
            </div>
            <div className='time-format'>{getFormattedRemainingTime()}</div>
        </div>
    );
}

export default ProgressBar;